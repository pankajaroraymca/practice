// --------------------------------- What is Hashing --------------------------------------------------

// It takes an input , runs it through hashing fnction and gives the output of same length always.
// It is a technique for faster lookups

// We use hashing techniques for load balancing whether in sharding, partiitoning, server load distributing etc.
// we will reference multiple partitions, server nodes, multiple shards as n here
// Simple modules hashing works best for fixed number of n.

// if we have 3 shards and wants to distribute data evenly on them
// hash(server#1) % 3 = 1 data will go to server A
// hash(server#2) % 3 = 2 data will go to server B
// hash(server#3) % 3 = 3 data will go to server C

// But this is not practical as shards can go up and down, means depend upon the data, shards can go from 3 to 5 or 1.
// So we will have to rebalance the data because now the n is 5 and doing the modulus for the same key will now give different remainder.
// So whole data needs to be rebalance and its an expensive operation
// In good approach, only 1/n % of data needs to be rebalance.
// So consistent hashing is used here.

// -------------------------------------------- Consistent Hashing --------------------------------------------

// It works for system where nodes are dynamic.
// The approach is simple, we take a ring let's say of 100 nodes.
// We place the server ids at each place.
// And we will move in clockwise direction. The data are stored where they meet the nearest server id in clockwise direction

// 0 ---------------- 100 ---------------- 200 ---------------- 360
//       A                 B                   C

// The data from 0 to 50 will go to Server A
// The data from 60 to 120 will go to server B and so on

// But here there is a small problem again, what if servers are not placed correctly.
// Let's suppose server are placed at 20, , 300, 350
// Now all data from 30 to 300 will go toh server B only. HOw to solve this?
// we make virtual nodes of it. Means every servers are placed multiple times in the ring so as data is evely distributed.

const crypto = require("crypto");

class ConsistentHashingWithVirtualNodes {


  constructor(nodes = [], virtualNodes = 3) {
    this.ring = new Map();       // Hash ring (hash -> node)
    this.sortedKeys = [];        // Sorted list of hashes
    this.virtualNodes = virtualNodes;

    nodes.forEach(node => this.addNode(node));
  }

  // Hash function → converts a string into a number
  hash(value) {
    return parseInt(
      crypto.createHash("sha1").update(value).digest("hex").substr(0, 8), 16
    );
  }

  // Add a physical node (with virtual nodes)
  addNode(node) {
    for (let i = 0; i < this.virtualNodes; i++) {
      const virtualNodeId = `${node}#${i}`;
      const hash = this.hash(virtualNodeId);
      this.ring.set(hash, node); // map hash → real node
    }
    this.sortedKeys = [...this.ring.keys()].sort((a, b) => a - b);
  }

  // Remove a physical node (removes its virtual nodes too)
  removeNode(node) {
    for (let i = 0; i < this.virtualNodes; i++) {
      const virtualNodeId = `${node}#${i}`;
      const hash = this.hash(virtualNodeId);
      this.ring.delete(hash);
    }
    this.sortedKeys = [...this.ring.keys()].sort((a, b) => a - b);
  }

  // Find which node a key belongs to
  getNode(key) {
    if (this.ring.size === 0) return null;
    const hash = this.hash(key);

    // Walk clockwise until we find the first bigger hash
    for (let i = 0; i < this.sortedKeys.length; i++) {
      if (hash <= this.sortedKeys[i]) {
        return this.ring.get(this.sortedKeys[i]);
      }
    }
    // If not found, wrap around to first node
    return this.ring.get(this.sortedKeys[0]);
  }
}

// Usage
const chv = new ConsistentHashingWithVirtualNodes(["A", "B", "C"], 5);

console.log("Key1 →", chv.getNode("Key1"));
console.log("Key2 →", chv.getNode("Key2"));
console.log("Key3 →", chv.getNode("Key3"));

chv.addNode("D");
console.log("After adding D, Key1 →", chv.getNode("Key1"));

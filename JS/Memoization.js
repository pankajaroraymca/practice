// Memoization in JavaScript is an optimization technique used to cache the results of expensive function calls so that when the same inputs occur again,
//  the cached result is returned instead of redoing the computation.

// Memoriaztion Techniques -

// 1) Manual Memoization: Using plan js object as cache to store results of expensive function calls.

function memoizedAddTo256() {
  var cache = {};

  return function (num) {
    if (num in cache) {
      console.log("cached value");
      return cache[num];
    } else {
      cache[num] = num + 256;
      return cache[num];
    }
  };
}
var memoizedFunc = memoizedAddTo256();

memoizedFunc(20); // Normal return
memoizedFunc(20); // Cached return

// 2) LRU Cache Memoization: Limited size cache to stop umlimited cache growth. Remove the last used result of expensive function call.
// 3) Map Based Memoization: Useful when keys are non-string e.g number etc.
// 4) Weak Map Based Memoization: when keys are objects and you don't wish to prevent it from gc.
// 5) Recursive memoization: Passing the shared cache in recusrsive functions. E.g fibonacci

// shared cache is passed in recusrive function calls.
function fib(n, cache = {}) {
  if (n in cache) return cache[n];
  if (n <= 1) return n;
  cache[n] = fib(n - 1, cache) + fib(n - 2, cache);
  return cache[n];
}

class LRUCache {
  capacity
  map
  head
  tail
  constructor(capacity) {
    this.capacity = capacity;
    this.map = new Map(); // key -> node
    this.head = new DoubleNode(null, null); // dummy head
    this.tail = new DoubleNode(null, null); // dummy tail
    this.head.next = this.tail;
    this.tail.prev = this.head;
  }

  _remove(node) {
    node.prev.next = node.next
    node.next.prev = node.prev
  }

  // add element right next to head
  _addToFront(node) {

    node.next = this.head.next
    this.head.next.prev = node

    this.head.next = node
    node.prev = this.head
  }

  _printList() {
  let curr = this.head.next;
  const result = [];
  while (curr !== this.tail) {
    result.push(`[${curr.key}:${curr.value}]`);
    curr = curr.next;
  }
  console.log('Cache state: ' + result.join(' <-> '));
}

  get(key) {

    if (!this.map.has(key)) return -1;
    const node = this.map.get(key);

    // Move the accessed node to front
    this._remove(node);
    this._addToFront(node);
    return node.value;
  }

  put(key, value) {
    if (this.map.has(key)) {
      const node = this.map.get(key)
      node.value = value

      this._remove(node)
      this._addToFront(node)
    } else {

      if(this.map.size >= this.capacity){
        const lru = this.tail.prev;
        this._remove(lru);
        this.map.delete(lru?.key);
      }

      const node = new DoubleNode(key, value)
      this.map.set(key, node)
      this._addToFront(node)
    }
  }

}

class DoubleNode {
  key
  value
  next
  prev

  constructor(key, value) {
    this.key = key
    this.value = value
    this.prev = null
    this.next = null
  }
}

const cache = new LRUCache(2);

cache.put(1, 1);
cache.put(2, 2);
cache._printList(); // [2:2] <-> [1:1]

cache.get(1);
cache._printList(); // [1:1] <-> [2:2]

cache.put(3, 3);
cache._printList(); // [3:3] <-> [1:1]



const { Redis } = require('ioredis');

// Here only one redis client is created and exported.
const client = new Redis({
    host: 'localhost',
    port: 6379
})

module.exports = client;

// for horizontal scaling, you can use a cluster of Redis nodes

// we first make a cluster of Redis nodes and then connect to it.

// redis-cli --cluster create \
// 127.0.0.1:7000 \
// 127.0.0.1:7001 \
// 127.0.0.1:7002 \
// 127.0.0.1:7003 \
// 127.0.0.1:7004 \
// 127.0.0.1:7005 \
// --cluster-replicas 1


// then here we just need to provde 2 entry nodes, and ioredis will automatically discover the rest of the nodes in the cluster.
// const cluster = new Redis.Cluster([
//     {
//         host: 'localhost',
//         port: 7000
//     },
//     {
//         host: 'localhost',
//         port: 7001
//     }
// ]);
// module.exports = cluster;

// Note: Make sure to handle errors and connection issues in production code.
// You can use client.on('error', (err) => console.error('Redis error:', err)); to log errors.

// We are using master-replica replication here, minimum 3 master and 3 replica.
// for failover, ioredis will automatically make the replica as master if the master goes down.
// we can also set replica for read operations and master for write operations.
// This is a basic setup, and you can enhance it with more configurations as needed.

// Usage
//  ioredis knows where he has stored the data, so you can use the same client to access the data.
// we do not need to specify the key in which node it is stored.

// ---------------------------------------------- How locking works in multiple instances ----------------------------------------------

// we can use the redlock library to implement distributed locks.

// const Redlock = require('redlock');

// Redlock instance
const redlock = new Redlock(
    [cluster],  // 
    { retryCount: 5, retryDelay: 200 } // ms
  );
  
  (async () => {
    try {
      const lock = await redlock.acquire(["locks:payment"], 10000);
      console.log("Lock acquired");
  
      // Do work...
      await new Promise(res => setTimeout(res, 3000));
  
      await lock.release();
      console.log("Lock released");
    } catch (err) {
      console.error("Failed to acquire lock:", err);
    } finally {
      cluster.disconnect();
    }
  })();

  // The technique is simple: 
  // 1) if we are able to acquire the locking on majority of the redis instances, then we are the leader.
  // 2) the window must be small for acquiring the lock. here we are using 10 seconds.
  
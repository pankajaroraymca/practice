// ------------------------------------- Sql vs Nosql ------------------------------------

// We have to decide between them by balancing between consistency, flexibility, scalability.

// 1) Schema: Sql databses follows fixed schema. While no sql can work with schema less/semi strcutred data.

// 2) Data Relationships: sql offers strong relationship. while in noqsql joins are avoided.
// Final: Prefer sql when we know our data upfront and relations matters to you. Prefer no sql when data is highly varied.

// 3) Scaling: Sql databases are very complex to scale horizontically. While nosql databses have built in/ or easier sharding.
// SQL database are generally scaled vertically and horizontany we can not split data into different shards as they are related to each other

// 4) Consistency, Availability and Partition tolerance ( CAP theorem ):
//  What is cap theorem?
// At a time, databse can guarantee maximum of 2 properties at a time.
// C: Consistency --> All nodes return the same data at the same time.
// A: Availability --> All nodes must be available to response.
// P: Partition tolerance --> The system continues to work despite one of the partiontions being unresponsive.

// In distributed system, partitions are inevitable. So we have to always trade off between consitency and availability.
// Sql databases prefer CP while nosql databases prefer AP. But in Mongodb ( with certain config. ) it can prefer CP.

// SQL Databases follows ACID. NoSql follow BASE ( Badically Available, Soft state, eventual consistency).
// As data is in sharding in Nosql, also it is replicated to N-1 nodes, so it is highly available.
// Soft State --> Even if in distributed system, some data is not replicated to all replica nodes, because of network failure
// But in background, NoSql uses Merkle Tree technique to sync the replicas with data. So State is Safe
// Eventual consistency --> As we said , data is repaired in background or async manner, some reads maybe stale but after sometime, data returned is correct.

// Final: So sql is prefered where considtency is prefered like in banking, inventory based applications.
// While nosql is btter for analytical system.

// 5) Migrations:
// SQL follows fixed schemas so it is complex for data migrations.
// But in nosql databses, there are fixed scturcture and also no/minor relationships, it is very easy to migrate.

// Note: Mongodb offers eventual consistency. It means by making some config. we can achieve consitency but performance will be impacted.
// So we have to trade off consistency with performance.
// But sql databses offeres constistency by default.

// 6) Joins: SQL databases are designed for relationships so they perform better in joining related data. With proper indexing joins give the
// time complexity of logn + logm for m and n tables, while in nosql databses, joining are done through aggreagation lookup technique
// time complexity with good indexing is n*log m. n for left entries and searching for crieteria in m collection.

// --------------------------------------------- MongoDB ------------------------------------------------------------

// Sharding: It is a horizontal scaling mechanism n which data is splitted across multiple servers so that system can handle higher throughput
// and larger datasets.

// It is also known as using this technique we will have multiple servers for writes and reads

// Data is distributed using Shard Key ( A field (or compound key) that determines how data is split. ). There are 3 ways to do it :

// 1) Hashed Shard Key: MongoDB applies a hash function to the key.
// Even distribution, but no range queries.

// 2) Ranged Shard Key: Data is split by key ranges.

// 3) Zone Sharding: Now usually we use different servers for writes and reads. Here we will do the same thing

// Sharded Cluster
// │
// ├── Shard A = ReplicaSet_A (Primary_A + Secondary_A1 + Secondary_A2)
// │     └── Holds chunk of data [X-Y]
// │
// ├── Shard B = ReplicaSet_B (Primary_B + Secondary_B1 + Secondary_B2)
// │     └── Holds chunk of data [Y-Z]
// │
// ├── Shard C = ReplicaSet_C (Primary_C + Secondary_C1 + Secondary_C2)
// │     └── Holds chunk of data [Z-...]
// │
// └── Config Replica Set (metadata only)

// You can see above, sharded A has one primary and 2 replics for it.
// To achieve the consistency, there are certain configurations

// Write Concers
// w: 1 write is successful when primary node acks it ( aka asyncronus replication )
// w: majority, write is successful when majority of the replicas acks it. ( eventual consistency )

// E.g db.orders.insertOne({ orderId: 123 }, { writeConcern: { w: "majority" } })

// Same applies for reads also, you may configure from where to read whether from primary node or replica node

// If readPreference: primary → served from Shard B’s primary.
// If readPreference: secondary → can be served from one of Shard B’s replicas.

// THere are read concers also
// { readConcern: { level: "majority" } }
// { readConcern: { level: "linearizable" } } gets most recent write from primary, best for financial transactions
// E.g db.orders.find({ orderId: 123 },{ readConcern: { level: "majority" } })
// only read data when it is replicated from majority of the nodes.
// same as write majority, if you write majority then read will also be applicable. if you write using w:1, data is only in primary
// and then you try to read with majority you will not get the data.




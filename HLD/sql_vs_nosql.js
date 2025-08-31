// ------------------------------------- Sql vs Nosql ------------------------------------

// We have to decide between them by balancing between consistency, flexibility, scalability.

// 1) Schema: Sql databses follows fixed schema. While no sql can work with schema less/semi strcutred data.

// 2) Data Relationships: sql offers strong relationship. while in noqsql joins are avoided.
// Final: Prefer sql when we know our data upfront and relations matters to you. Prefer no sql when data is highly varied.

// 3) Scaling: Sql databases are very complex to scale horizontically. While nosql databses have built in/ or easier sharding.

// 4) Consistency, Availability and Partition tolerance ( CAP theorem ):
//  What is cap theorem?
// At a time, databse can guarantee maximum of 2 properties at a time.
// C: Consistency --> All nodes return the same data at the same time.
// A: Availability --> All nodes must be available to response.
// P: Partition tolerance --> The system continues to work despite one of the partiontions being unresponsive.

// In distributed system, partitions are inevitable. So we have to always trade off between consitency and availability.
// Sql databases prefer CP while nosql databases prefer AP. But in Mongodb ( with certain config. ) it can prefer CP.

// SQL Databases follows ACID. NoSql follow BASE ( Badically Available, Soft state, eventual consistency).

// Final: So sql is prefered where considtency is prefered like in banking, inventory based applications.
// While nosql is btter for analytical system.

// 5) Migrations:
// SQL follows fixed schemas so it is complex for data migrations.
// But in nosql databses, there are fixed scturcture and also no/minor relationships, it is very easy to migrate.

// Note: Mongodb offers eventual consistency. It means by making some config. we can achieve consitency but performance will be impacted.
// So we have to trade off consistency with performance.
// But sql databses offeres constistency by default.



// ------------------------------------ What do you mean by High Availability System ---------------------------

// It means designing your system such that it should be available to serve even if one of the components will fails.

// How to achieve this?

// 1) Multiple instances of server services. If one fails another takes over.
// As there are multiple server instances, load balancer should be there to distribute traffic.
// Round Robin, weighted strategies. We can use Nginx, AWSLB for loadbalancer. Auto scaling technique should be used. Add/remove nodes based on load.

// 2) Multiple databases of database. There are 2 different ways.
// (a) Master - replica setup. Master is for writes and replica for reads. if master is down, replica will take over.

// Now question comes - how data will be consistent in master and replica ?
// There are basically three ways :
 
// (i) Synchronous Replication
// Every write in databse A is immediately sent to replica B (or others).
// The write is only acknowledged to the client after all replicas confirm.
// It is slow but very consistent with data.

// (ii)) Asynchronous Replication
// Region A acknowledges a write locally and then forwards it in background to Region B.
// Fast response to users

// Semi-Synchronous / Quorum-Based Replication
// The primary waits for at least one replica (but not all) before ack.
// Balance between latency and durability.


// (b) Master - Master: Multiple masters to handle read/writes.
// Now question comes - how data will be consistent in multiple master structure?
// It needs conflict resolution. Conflict resolution strategies:

// (i) Last Write Wins (LWW) → Based on timestamp (simplest, but can overwrite).

// (ii) Version Vectors / Vector Clocks → Each record keeps a vector of counters (one per replica/region).
// If two updates are causally ordered (one happened after another), the later one wins.
// If updates are concurrent → conflict detected, app must resolve.

// (iii) Custom Conflict Resolution → Business logic resolves (e.g., merge shopping carts instead of overwriting)

// 4) Stateless Services: Server should not hold any info. It should fetch info from cache(resis) or db.

// 5) Automatic failover stretegies. Like in multi region, if one region is down, traffic goes to another nearest healthy region.
// And if in only one region. We would be having master and replica nodes for each server and database.

// 6) Regular database and config backups

// 7) Health checks & heartbeats for all services. It will help to automatically remove the dead node and make the new node primary. So that system is highly available.

// Note: In above we were talking about one region high availability. What if whole region id down?

// If you only have one region, you can still achieve High Availability (HA) by building resilience within that region, across multiple Availability Zones (AZs),
// You deploy your system across 2–3 AZs inside the region.
// If one AZ fails, traffic automatically shifts to the healthy AZs.

// ------------------------------------ How multi region deployment works? -------------------------------------------

// 1) Basic 
// Instead of hosting your application in a single data center/region, you deploy it in two or more regions (e.g., AWS us-east-1 + ap-south-1).
// Each region runs a full stack (app servers, databases, caches, storage).
// Users are routed to the nearest healthy region via DNS/load balancing
// If one region goes down, traffic is shifted to another.

// 2) Tools like AWS Route 53 route requests to the closest or available region.

// 3) Data Synchronization
// This is the hardest part. It actually depends upon the requirement. You want your system to be highly available or consistent. Based on CAP theorem, only AP or CP are possible. 

// Now we have discussed two solutions. Master Replica and Master Master for consistency.
// We will have master in one region and replica in other region.
// for data consistency we discussed 3 ways - syncronus, asycronus and quorum
// if we are following master master, then there are different ways to handle conflicts.

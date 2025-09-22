// ---------------------------------------- Tiny URL -----------------------------------------------

// https://pinelabs.udemy.com/course/system_design_lld_hld/learn/lecture/41910210#overview -------->   https://bit.ly/4pamVsg
// How to do it? The main part is the text after the domain ie. 4pamVsg
// This is a 7 length text. And this is a base62 mean chars are from 0-9a-zA-Z

// First let me explain how to get a base62 string from a number
let chars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'
// There are total 62 chars, 0 based indexing
// base62 of 10000 is 

// divide 10000 by 62., remainder 18, quoteient 161 , output = I
// divide 161 by 62, remainder 37, quoteient 2, output = bI
// divide 2 by 62, remainder 2, quoteint 0, output = 2bI

// So 7 length text can have unique 3.5 trillion combinations
// 1 length text can have 62^1 = 62 unique combinations
// 2 length text can have 62^2 = 3844 unique combinations
// 3 length text can have 62^3 = 238328 unique combinations
// 4 length text can have 62^4 = 14776336 unique combinations
// 7 length text can have 62^7 = 3.52 trillion unique combinations

// So in our service we need to have this unique id generation service from 1 to 3.5 trillion number, for distributed system

// Approach 1
// Use a db to get the incremented counter on each request
// But everytime it needs to query DB. Bad Approach

// Approach 2
// We can maintain a counter at redis and use multiple redis instances and data is syncronized to multiple nodes.
// Still everytime a req is made to redis service.

// Approach 3
// Why not each application node generate its own number
// We will assign each node a range i.e from 1 to 1 Million to node A
// 1 Million 1 to 2 Million to node B and so on for every node
// Each node will be reponsible for generating a count from start and end point. It is fast
// There is no collapse of ids, each node is managing their counters
// If A node goes down and another Node D comes up, new node will request its range and based on it, it will generate its ids.
// Now the problem is we have to make sure range is such that our node does not request too frequently to range managing service
// and it should not be too large to give away all unique ids between a range because node goes down, so does their ranges
// Once range is assigned to each node, it is to make sure no other node gets this range
// So, here we need a separate range managing service. we will use zookeper for it.
// ZooKeeper is a distributed coordination service for managing large sets of machines in a reliable and centralized way.

// In zookeper, we create a znode /unique_id_counter and initially its value is 0
// when a reqest comes from node say for 1 million record, we return the start and end range. ANd update the counter to 10000001
// Next time when another node reqs, it gets range from there.

// What if zookeper gets 2 request at the same time
// Zookeeper internally does atomic operation means every update is versioned.
// when a state is updating it checks if the version is same as read, if same successful and if not, then fails and retries.

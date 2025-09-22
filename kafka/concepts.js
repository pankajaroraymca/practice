// ------------------------------------------------set up --------------------------------------------------------

// install zookeper 

// docker run -d \
//   --name zookeeper \
//   -p 2181:2181 \
//   zookeeper:latest

// install kafka

// docker run -d \
//   --name kafka \
//   -p 9092:9092 \
//   --env KAFKA_BROKER_ID=1 \
//   --env KAFKA_ZOOKEEPER_CONNECT=zookeeper:2181 \
//   --env KAFKA_ADVERTISED_LISTENERS=PLAINTEXT://localhost:9092 \
//   --env KAFKA_OFFSETS_TOPIC_REPLICATION_FACTOR=1 \
//   --link zookeeper \
//   bitnami/kafka:latest

// --------------------------------------------------Broker ------------------------------------------------------

// What is a broker?
// A broker is a server (node) that stores messages in Kafka.
// It can handle multiple topics and partitions.
// A Kafka cluster can have multiple brokers for horizontal scaling.

// -------------------------------------------------- Topic -------------------------------------------------------

// What is a topic?
// A topic is a category or feed name to which messages are published.
// Topics can have multiple partitions for parallel processing.


// -------------------------------------------------- Partition ---------------------------------------------------

// What is a partition?
// Topic are divided into partitions for parallel processing.
// Each partition is an ordered. Meaning messages are stored in the order they are received.
// THe order is maintained within a partition, but not across multiple partitions.
// Messages in a partition are assigned a unique offset (ID).
// Partitions allow Kafka to scale horizontally by distributing data across multiple brokers. What does it mean?
// It means that we can have multiple partitions for a topic, and each partition can be stored on a different broker.
// This allows us to read and write messages in parallel, improving performance and throughput. I case of failover, if one broker goes down, the other brokers can still serve the data.
// It means we typically have the replica of the partition on another broker.

// -------------------------------------------------- Producer ----------------------------------------------------

// What is a producer?
// A producer is a process that sends messages to a Kafka topic.
// Producers can send messages to specific partitions or let Kafka decide based on the key or round-robin distribution.

// -------------------------------------------------- Consumer ------------------------------------------------------

// What is a consumer?
// A consumer is a process that reads messages from a Kafka topic.

// if we have 3 partitions and 3 consumers, then all consumers will be consuming the messages in parallel.
// if we have 3 partitions and 2 consumers, then one consumer will consume messages from 2 partitions and the other from 1 partition.
// if we have 3 partitions and 4 consumers, then one consumer will consume messages from 1 partition and the other from 2 partitions. one will remain idle.
// so we can scale horizontally by adding more partitions and consumers.
// SO a partition can only have one consumer, but a consumer can have multiple partitions.

// -------------------------------------------- Consumer Groups -----------------------------------------------

// Multiple consumers in the same consumer group
// Each consumer can listen to only 1 partition of topic
// If you want to listen partition multiple times, then create another consumer group.
// Kafka assigns only one consumer in a group to listen from one partition.
// Even if consumer from the group A consumes it and acks it, the other consumer from group B still has this message. THe offset in manage at each consumer group level,
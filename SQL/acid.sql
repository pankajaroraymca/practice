--------------------------------------------What are ACID properties?----------------------------------------------------------

-- ACID properties are related to the transactions in our databases. It ensures reliable data processing of transactions.

-- A: Atomicity
-- C: Consistency
-- I: Isolation
-- D: Durability

-- Atomicity
-- It says either all operaions will succeed none.
-- If any operation fails, all operations will be rollbacked.

BEGIN;
UPDATE employee SET name = 'Pankaj Arora' where id = '32508b31-1dbe-4d35-989a-7e79ea2d4faf';
UPDATE employee SET age = 26 where id = '32508b31-1dbe-4d35-989a-7e79ea2d4faf';
COMMIT; -- The changes will reflect after commiting

-- CONSISTENCY
-- It ensures that all integrated rules (constraints, foreign keys, etc.) are never voilated.
-- It ensures all operations follow the same schema structure.

-- ISOLATION
-- It ensures each transaction is isolated with another transaction.
-- There are different levels of isolation provided by postgres

-- 1) Read Uncommited: 
-- Would allow reading data from uncommitted transactions (dirty reads). Postgres does not support it.

-- 2) Read Commited: 
-- A query inside your transaction sees only committed data. But if you re-run the same query again, 
-- it might see different results because other transactions may have committed changes in the meantime.
-- By default, postgres uses Read Commited Isolation method.
-- Example 

BEGIN;
SELECT balance FROM accounts WHERE id = 1;
-- Meanwhile, another transaction updates this balance and commits.
SELECT balance FROM accounts WHERE id = 1; -- Might return a new value
COMMIT;

-- 3) Read Repeatable: 
-- Your transaction sees a snapshot of the database as of the moment it started.
-- All queries inside the transaction see consistent data, even if other transactions commit changes.

-- Example
BEGIN ISOLATION LEVEL REPEATABLE READ;
SELECT * FROM accounts WHERE id = 1;
-- Another transaction updates the same account
SELECT * FROM accounts WHERE id = 1;  -- Still shows old data
COMMIT;

-- 4) Serializable (Strictest ): 
-- Ensures complete transaction isolation — as if transactions ran one after another (serially).
-- PostgreSQL uses Serializable Snapshot Isolation (SSI) to detect and prevent anomalies.

BEGIN ISOLATION LEVEL SERIALIZABLE;
-- You try to read and write data
-- If another transaction does something conflicting in parallel,
-- one of the two will be rolled back automatically
COMMIT;


-- DURABILITY
-- It ensures once the transaction is commited, and the data is written to WAL ( Write Ahead log ), it will no longer be rollbacked
-- even the server crasher. The data will persist


----------------------------------------------------What is WAL-----------------------------------------------------------------


-- WAL stands for Write-Ahead Logging — it's a crash recovery and durability mechanism used by PostgreSQL 
-- (and many other databases) to ensure your data is never lost, even if the server crashes.

-- In WAL, changes to data are first written to a log file (WAL) before being written to the actual data files on disk.



---------------------------------------------- What is Multi version concurrency control (MVCC) ? ---------------------------------------



-- This is the technique used by postgres and many other databases to never block the reads if some reading or writing to it.
-- By this technique, it allows concurrent transactions to run with great performance.
-- When ever you write to a row, the row is not directly updated, instead a new version is created of it.
-- Thus you have multiple versions of same row and thus concurrency is acheieved.
-- This means reads never block writes, and writes never block reads.

-- What happens when 100 users try to update the same row and column?

-- 100 users try:

UPDATE users SET age = age + 1 WHERE id = 1;

--  Even if 100 users try to update the same row at the same time, PostgreSQL updates them one by one internally, 
-- using row-level locking to ensure data consistency and integrity.

-- 1) The first transaction that gets the lock on the row proceeds and updates it.
-- 2) Other 99 transactions must wait until the lock is released.
-- 3) As soon as the first transaction commits or rolls back, the next one gets the lock.
-- 4) Before proceeding, each waiting transaction rechecks the row version (MVCC).


---------------------------------------- How many types of Reads ---------------------------------------------------------

-- 1) Dirty Reads
-- If a transaction reads data that is written due to concurrent uncommitted transaction, these reads are called dirty reads.
-- Prevented by Commited Read Isolation or higher

-- 2) Phantom Reads
-- We get different set of row for same transaction criteria. Suppose A user reads the data and inbetween B users inserts/remove
-- a row, then we will get different results for same query if done in a single transaction.

-- 3) Non Repeatable Reads:
-- It is same as phantom reads but the difference is in modification of columns data. For the same query we will get different
-- data of row. But the count of remains same.

-- To avoid, these typs of reads, we have already covered isolation techniques. Read Commited, Repeatable Reads and Serializable.




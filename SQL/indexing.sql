------------------------------------------- What is indexing?-----------------------------------------------------------


-- Indexing is the performance optimization technique in database for faster query results on tables.
-- When you run a SELECT, PostgreSQL can search the index instead of scanning the whole table.

-- Downside of Indexing?
-- Slower Insertion, Updation, Deletion. Why?. Because everytime you do these operations, internally indexing is also
-- created for insertion, indexing is also updated for updaion, and indexing is removed in case of deletion.
--  That's and extra work.

------------------------------------------What Happend when you delete/update


-- In case of delete operation, the row is marked as dead.
-- In case of update operation, the old version marked as dead, while the new version is created.
-- So there are still dead rows present in databases or in your disk
-- Postgres periodically removed the dead data. This process is knows as Vaccumm


------------------------------------------How to create indexes? ---------------------------------------------------------


CREATE INDEX on employee(name);


-----------------------------------------Types of Indexing in Postgres -----------------------------------------------------

-- There are different types of indexing for different use cases
-- 1) B-Tree - Default. Best for =, <, >, comparisons. Balanced Binary Tree
-- 2) Hash - only for =
-- 3) GIN - for full text search, arrays, jsonb
-- 4) BRIN - for huge tables with naturally order rows like logs.

CREATE INDEX ON employee USING GIN (data);


-----------------------------------------How Indexig Internally Works - BTre ----------------------------------------------------

-- Postgres stores data in pages also knows as blocks.
-- There are three types of pages :
-- 1) Heap Page
-- 2) Index Page
-- 3) Toast Page

-- Each Page is by default maximum size of 8kb. Maximum 32Kb can be done but it requires re bulding the whole database.

-- A Heap Page can have multiple rows depending upon the size. Heap Number starts from 0.
-- Inside Heap Page, Row is identified by offset number. It start from 1.
-- Let's suppose I give you the (2,5). It mean go find the 3rd( 0 index based ) heap block in memory and find the 5th row.

-- Now Indexes ( B-tree)

-- The root of the tree is Root Page - points to the internal nodes
-- The left and right leaf nodes of tree are internal nodes
-- The subsequent leaf nodes are the actual Key - TID pairs.

--         [Root Page]
--          /        \
--    [Internal]   [Internal]
--      /   \         /   \
--  [Leaf][Leaf]  [Leaf][Leaf]

-- Now What is Key - TID pairs?
-- This is the leaf index node --> ('John', (2, 5)). And the data inside it is the Key - TID pairs.
-- (2,5) is the TID. Tuple Identifier.
-- 2 is the location for the heap page. And in that Heap Page, 5 is the offset. Means start from the starting and select the 5th row.

-- Time Complexicity for Searching - O(logn)

-- What Happens on a Query
-- Example:

SELECT * FROM employee WHERE name = 'Pankaj';

-- If name is indexed:

-- Steps:

--1) PostgreSQL scans the B-tree index pages.
--2) Finds 'Alice' in a leaf node.
--3) Gets the TID → e.g., (4, 12)
--4) Goes to heap page 4, reads offset 12 → fetches the row.

-- This is much faster than scanning every row!


-----------------------------------------------------How do we know if indexing is working ---------------------------------------------



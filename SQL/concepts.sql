-- --------------------------------------------------- Table sizes ----------------------------------------------------------

-- 1) A table can have a maximum size of upto 32Tb

-- 2) A column can have a maximum data of 1 Gb.

-- 3) A row can have maximum of 1600 columns. Thus a row can have maximum data of 1.6TB. Note: A row stores data in a page.
-- A page has a maximum size of 8Kb and a maximum size of page is 8KB.
-- So how come row has 1.6TB data?. Internally psql uses TOAST ( The Oversized Attribute Based Technique ). Basically large data sets are stored in separate toast table.
-- and only the reference is stored in actual column of that row. So in this way a can have 8Kb size but practically it has 1.6 TB data with toasting.

-- 4) A table can have practically unlimited number of rows unless 32 TB data is reached.
-- 5) A heap Page can have multiple rows. It starts with 0. But the maximum size of heap page is 8Kb. A Heap page is just a memory block in disk


----------------------------------------------------Truncate command ------------------------------------------------------------

-- 1) It is a DDL command. It is used to remove the all rows in a table.
-- 2) It is faster than delete because it does not scan and logs after deletion of rows.
-- 3) It does not require where clause as whole table data is deleted.
-- 4) triggers can not be attached in truncate commands.
-- 5) Table rows can not be truncated if rows have foreign keys. You have to use CASCADE explicitly
-- 6) You can reset the serial keys. RESTART IDENTITY is the keyword.
-- 7) It can be rolled backed unless done in transactions.

-- Syntax 
TRUNCATE TABLE table_name RESTART IDENTITY CASCADE

---------------------------------------------------- Tokens -------------------------------------------------------------------

-- Tokens are the basic unit of sql query. Psql breaks query into token to recognize it before parsing it.
-- There are different types of token:

-- 1) Identifier Token - Table name, column name etc
-- 2) Keyword Token -  where, select, from, etc.
-- 3) Constant Token - string, number, boolean etc values.
-- 4) Operators Token - =, >, < etc.
-- 5) Special Character Token - (, ), %, ;

-- E.g 1
SELECT name, salary FROM employees WHERE salary > 50000;

-- This gets tokenized as:

-- SELECT → keyword
-- name → identifier
-- , → special character
-- salary → identifier
-- FROM → keyword
-- employees → identifier
-- WHERE → keyword
-- salary → identifier
-- > → operator
-- 50000 → constant
-- ; → special character


------------------------------------------------------ SEQUENCE --------------------------------------------------------------

-- A sequence is a object in the database which gives you the functionality of a counter. This sequence runs independently
-- from the table.

CREATE SEQUENCE emp_seq
  START WITH 1
  INCREMENT BY 1
  MINVALUE 1
  MAXVALUE 999999;

-- You can get the latest sequence value
SELECT nextval('emp_seq'); -- it will give you the value as well as increment the counter

SELECT currval('emp_seq'); -- it will give you the last counter VALUES

SELECT setval('emp_seq', 5); -- it wil set the value to that number

-- Note: SERIAL datatype internally uses sequence function
-- SERIAL = INT + sequence + default. SERIAL is just a sugar syntax version for sequence.


----------------------------------------- Case Insensitiv Matching -----------------------------------------------

Select * from employee where name ~* 'panKaj';

----------------------------------------How to take database backup -------------------------------------------------------

sudo -u postgres pg_dump -d your_db_name > backup.sql -- you are logging in with the postgres user and taking the backup of your_db_name database.

sudo -u postgres psql -d your_db_name < backup.sql -- restore the backup. But first make sure your_db_name database exist.


-------------------------------------What are parralel queries? -----------------------------------------------------------

-- This technique is used by many databases to speed up the process of sql queries by leverrging multi core system.
-- Multiple worker process works at the same to complete the single query.

-- When parralel queries initiates?
-- Usually when sql runs, only one process is working. But when complex queries came, then parralel queries come into picture
-- Planner decided whether to use parralel queries or not. There are some factors:
-- 1) Multiple joins on large data sets.
-- 2) Aggragate functions
-- etc

-- Note: Parralel queries works only in select, not in insert, update and delete.


-----------------------------------------------Collation -----------------------------------------------------------------

-- It is the set of rules that determines how text string are compared and sorted.

SELECT 'a' < 'B'; -- result depends on collation. By default en_US collation is applied. So true

SELECT 'a' < 'B' COLLATE "C"; -- Binary Collation. Result is false

-- There are mainly 3 types of collation.

--1) Case sensitive. a!=A
--2) Accent Sensitive 'e' != 'é'
--3) Locale Senstivite : depends upon local cultures. 

-------------------------------------------------OLTP and OLAP--------------------------------------------------------------

-- OLTP 
-- Stands for Online Transaction Processing. It is the system that is responsible for day to day operations in database.
-- E.g purchasing a product.
-- It should support faster read and writes
-- It should follow ACID properties.
-- Follow best normalization techniques

-- OLAP
-- Stands for Online Analytical Processing. As the name suggest it is only for analytics purpose only. It uses for analyzing large historical data.
-- E.g getting the best selling product in the past month.
-- Complex query with multiple joins and aggregate functions.
-- It should support faster reads than OLTP
-- It generally uses denormalize tables for faster reads.
-- Generally follows Star Schema. Star schema includes fact table and dimensions table

--------------------------------------------Constraints ------------------------------------------------------------

-- A constraint set a rules to the rows of data
-- It can be aaplied to multiple columns of the table.
-- Types of Constraints:

--1) Unique
--2) Primary Key
--3) Foreign Key
--4) Default
--5) Not Null
--6) Check
--7) Index


--------------------------------------------Foreign Key ---------------------------------------------------------------

-- It creates the link between two or more tables.
-- It enforces referencial integrity.
-- The referenced table can not have a value in foreign column which is not present in child table.
-- You can not delete the rows from child table unless used CASCASE/ON DELETE

-------------------------------------------- Primary Key --------------------------------------------------------------

-- It is a constraint that is used to uniquely identify rows in table.
-- Primary key can be set on single column as well as group of columns in a table.
-- It adds a unique constraint to rows.
-- A table can have only 1 primary key.
-- Can not contain null values

-- Note: Unique constraint can have null values. In psql, multiple column can have null values but in other databases like mysql, only 
-- one row can have null value.



  





--------------------------------------------------- DDL Commands --------------------------------------------------------------

-- Data Definition Language Commands are used to define or modify the structure of objects like databases, table, scehmas etc.
-- DDL Commands can not rollbacked unless done in transactions in postgres. But in other databases like mysql, sqllite etc. they are non
-- transactional even if they are defined in transaction statements.

-- There are 5 DDL commands -
-- 1) CREATE
-- 2) ALTER
-- 3) TRUNCATE
-- 4) DROP
-- 5) RENAME
-- 6) COMMENT

--------------------------------------------------- How to create a database -----------------------------------------------------

CREATE DATABASE demo_database;

-------------------------------------------------- How to create a table --------------------------------------------------------

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR NOT NULL,
    age INT
);

--------------------------------------------- How to add new column to table --------------------------------------------------

ALTER TABLE users
ADD COLUMN email VARCHAR NOT NULL;

---------------------------------------------- How to change column data type ------------------------------------------------

ALTER TABLE users
ALTER COLUMN email TYPE TEXT

--------------------------------------------- How to remove a column from table ----------------------------------------------

ALTER TABLE users
DROP COLUMN email;

---------------------------------------------- How to rename a column name --------------------------------------------------------

ALTER TABLE users
RENAME COLUMN emails to email;

--------------------------------------------- How to add a constraint to column ---------------------------------------------------

ALTER TABLE users
ALTER COLUMN email SET NOT NULL;

ALTER TABLE users
ADD CONSTRAINT unique_email UNIQUE (email);
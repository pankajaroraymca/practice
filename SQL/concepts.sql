-- --------------------------------------------------- Table sizes ----------------------------------------------------------

-- 1) A table can have a maximum size of upto 32Tb

-- 2) A column can have a maximum data of 1 Gb.

-- 3) A row can have maximum of 1600 columns. Thus a row can have maximum data of 1.6TB. Note: A row stores data in a page. and a maximum size of page is 8KB
-- So how come row has 1.6TB data?. Internally psql uses TOAST ( The Oversized Attribute Based Technique ). Basically large data sets are stored in separate toast table.
-- and onlt rhe reference is stored in actual column of that row. So in this way a can have 8Kb size but practically it has 1.6 TB data with toasting.

-- 4) A table can have practically unlimited number of rows unless 32 TB data is reached.


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





-------------------------------------------------------------DML Commands ---------------------------------------------------------

-- DML stands for Data Manipulation Language. These are the commands which are responsible for only manipulating of data in 
-- existing table. They do not change the structure of tables.
-- List of DML commands: -

-- 1) Insert
-- 2) Select
-- 3) Update
-- 4) Delete

---------------------------------------------Insert a row in table ---------------------------------------------------------

INSERT INTO users (name, age, email)
VALUES ('Pankaj', 25, 'pankaj@gmail.com');


-------------------------------------------- Update a column in table------------------------------------------------------

UPDATE users
SET age=24 where name = 'Pankaj';

-------------------------------------------- Select a row ----------------------------------------------------------------------

Select * from users;

----------------------------------------------- Delete a row ----------------------------------------------------------------

DELETE from users where name ='Pankaj'

-- Use BEGIN and COMMIT/ROLLBACK before any sql commands.

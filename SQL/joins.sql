-----------------------------------------------Create Dummy data with relations ---------------------------------------------
CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    name VARCHAR
);

INSERT INTO department(name)
VALUES ('APPS'),
('HR'),
('DS'),
('DEVOPS'),
('FINANCE');

INSERT INTO department (name)
VALUES (),
(95000, 2),
(90000, 3),
(125000, 4),
(200000, 5);

CREATE TABLE employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR,
    designation VARCHAR,
    department_id INT,
    email VARCHAR,
    dob DATE,
    manager_id INT,
    FOREIGN KEY (department_id) REFERENCES department(id)
);

INSERT INTO employees (name, designation, department_id, email, dob)
VALUES ('Pankaj', 'Senior Software Engineer', 1, 'pankaj@gmail.com', '1999-08-14'),
('Shubham Gupta', 'Software Engineer', 1, 'shubham@gmail.com', '1999-08-30'),
('Riya Paul', 'Software Engineer', 4, 'riya@gmail.com', '2000-05-24'),
('Manav', 'Senior Software Engineer', 3, 'manav@gmail.com', '1997-02-12'),
('Harsh Bhatia', 'Solution Architech', 1, 'harsh@gmail.com', '1991-10-04'),
('Ashish', 'Senior Software Engineer', 3, 'ashish@gmail.com', '1990-07-10')

CREATE TABLE salary (
    id SERIAL PRIMARY KEY,
    amount NUMERIC,
    emp_id INT,
    Foreign Key (emp_id) REFERENCES employees(id)
);

INSERT INTO salary (amount, emp_id)
VALUES (100000, 1),
(95000, 2),
(90000, 3),
(125000, 4),
(200000, 5),
(125000, 6);

-------------------------------------------------------------------JOINS-------------------------------------------------

-- A join is way to combine rows from two or more related tables baed on related columns through the concept of foreign key.
-- There are different types of Joins: 
-- 1) Cross Join
-- 2) Inner Join
-- 3) Left Join = Right Outer Join
-- 4) Right Join = Left Outer Join
-- 5) Full Join = Full Outer Join
-- 6) Self Join

-------------------------------------------------- How joins work ? ---------------------------------------------------

-- Basically for every record in Table A, joins looks for matching condition in all records of Table B
-- Let's suppose you have two tables A and B

-- Table A              Table B
id name                  id  name
1  Pankaj                1   Pankaj
2  Pankaj                2   Pankaj
3  Pankaj
4  Manish

-- Inner Join will give you 6 entries of Pankaj. why? because each record in table A has a matching 2 records in Table B. So 2*3 = 6
-- Left Join will give you 7 entries. 6 Pankaj and 1 Parth
-- Right Join will give you 6 entries of Pankaj
-- Full Join will give you 7 entries , 6 Pankaj and 1 Parth.

--------------------------------------------------Cross Join -----------------------------------------------------------

-- A CROSS JOIN (also called Cartesian Join) returns every possible combination of rows from two tables.
-- If table A has m rows and table B has n rows, the result will have m × n rows.
-- It does not use ON clause

Select * from employees e CROSS JOIN department d;

--------------------------------------------------Inner Join -----------------------------------------------------------

-- It gives you the only matched rows from two tables.
-- You have to use ON clause to define on which column you want your join to return results.

Select * from employees e INNER JOIN department d on e.department_id = d.id;

--------------------------------------------------Left Join -----------------------------------------------------------

-- It gives you the rows from left table and matched rows from right table.

Select * from employees e LEFT JOIN department d on e.department_id = d.id;

--Note: Right now on dummy data, all rows have department id, if there wan any employee whose department id was not there
-- we will still gets it entry.

--------------------------------------------------Right Join -----------------------------------------------------------

--All rows from right table and matched rows from left table

Select * from employees e RIGHT JOIN department d on e.department_id = d.id;

-- Note: The results will have two extra rows because in right table we have HR and finance department.
-- which does not have any employee.

---------------------------------------------Self Join ----------------------------------------------------------

-- A Self Join is a join where a table is joined with itself
-- Best Case: Employee Manager relationship. A manager is also an employee

-- First set the manager hireachy
UPDATE employees
SET manager_id = 5 where id IN (1,2);

SELECT 
  e.name AS employee_name,
  m.name AS manager_name
FROM employees e
LEFT JOIN employees m ON e.manager_id = m.id;

-------------------------------------------Full Join ------------------------------------------------------------

-- A full join return rows from left table, right table and if there's a match between both tables, rows will be combined.
-- There will be null vlaues from both left and right side.
-- ON clause needs to be used.

Select * from employees e FULL JOIN department d on e.department_id = d.id;

--------------------------------------Diff between Cross Join and full Join -------------------------------------

-- Cross Join gives you all combinations m*n. It does not use on clause. so matching will be repeated.
-- While full join gives you all entries from left and right and if matched, rows will be combined.

-------------------------------------------Relationship-------------------------------------------------------

-- There are mainly 4 types of relationship

-- 1) One to One
-- One row in Table A is related to exactly one row in Table B
-- E.g An employee can have only one PF account. 

-- 2) One to Many
-- One row in Table A can be related to many rows in Table B
-- E.g: An employee can have multiple salaries records.

-- 3) Many to One
-- Opp. of One to Many

-- 4) Many to Many
-- Rows in Table A can relate to many rows in Table B, and vice versa
-- E.g A student can be enrolled in multple courses. And a courses can have multiple students

SELECT * from tablea inner join tableb on tablea.name = tableb.name;


-- What is partition table?

-- A Partition table is a special table which is divided into smaller and managable pieces of portions called partitions.
-- A Partition table have a parent table and child portions which is called partitions.
-- A Parent table does not hold data itself whereas it routes to different child partitions based on the criteria.
-- A Primary Key constraint can not be added to the parent table. Why? Because it by defaults add an unique constraint and 
-- uniqueness can not be guarnteed in different child tables grouply. So Solution - either use id as uuid or incremental number.
-- You can add uniqueness in child tables but not in parent tables

-- There are three types of partitioning techniques available in postgres.
-- 1) Partition By Range
-- 2) Partition By List
-- 3) Partition by Hash

--------------------------------------------------PARTITION BY RANGE ---------------------------------------------------------

-- Create a Parent Table 
CREATE TABLE employee (
    id UUID DEFAULT gen_random_uuid(),
    "name" varchar,
    emp_id varchar,
    department varchar,
    age INT,
    dob DATE,
    is_active BOOLEAN
) PARTITION BY RANGE(age);


-- Create Partitions
CREATE TABLE employee_20_30 PARTITION OF employee
  FOR VALUES FROM (20) TO (30);

CREATE TABLE employee_30_40 PARTITION OF employee
  FOR VALUES FROM (30) TO (40);

-- Now When you insert data, it will automatically moves to the child partiotions based on data provided.
-- Note: If you provide the age for which you have not created partition, you will encounter error.
-- Range Partition does not allow any default partition for unknown values
-- Range should not overlap, parent table would not be able to decide which partition to choose.

INSERT INTO employee(name, emp_id, department, age, dob, is_active)
VALUES ('Pankaj', 'E1283', 'APPLICATIONS', 25, '1999-08-14', true), -- will go to employee_20_30
('Shubham', 'E1456', 'APPLICATIONS', 31, '1999-08-30', true) -- will go to employee_30_40


----------------------------------------------------PARTITION BY LIST ----------------------------------------------------------

-- Create a parent table
CREATE TABLE salary (
    id UUID DEFAULT gen_random_uuid(),
    emp_id varchar,
    amount INT,
    month_of_salary varchar
) PARTITION BY LIST(month_of_salary);


-- Create partitons
CREATE TABLE salary_qtr_1 PARTITION OF salary
 FOR VALUES IN('JAN', 'FEB', 'MRH')

 CREATE TABLE salary_qtr_2 PARTITION OF salary
 FOR VALUES IN('APR', 'MAY', 'JUN')


-- Create a default table for the list of data which is unknown
-- Partition by List support creating default tables. So do Hash Tables
 CREATE TABLE salary_qtr_default PARTITION OF salary DEFAULT

 INSERT INTO salary(emp_id, amount, month_of_salary)
VALUES ('E1283', 5000, 'JAN'), -- will go to salary_qtr_1
('E1283', 6000, 'JUN'), -- will go to salary_qtr_2
VALUES ('E1283', 7000, 'AUG'); -- will go to salary_qtr_default


--------------------------------------------------------PARTITION BY HASH-------------------------------------------------------

--When you just want to evenly distribute the load into different partitions.
-- Hash partitioning distributes rows evenly across partitions based on a hash of the partition key 

CREATE TABLE project (
    id UUID DEFAULT gen_random_uuid(),
    name VARCHAR,
    emp_id varchar,
    start_date Date,
    end_date Date
) PARTITION BY HASH(id);

CREATE TABLE project_1 PARTITION OF project
FOR VALUES WITH(MODULUS 2, REMAINDER 0);

CREATE TABLE project_2 PARTITION OF project
FOR VALUES WITH(MODULUS 2, REMAINDER 1);

INSERT INTO project (name, emp_id, start_date, end_date)
VALUES ('rbl', 'E1283', '31-05-2022', '30-08-2024'),
('sherpa', 'E1283', '31-05-2022', '30-08-2024'),
('ortus', 'E1283', '31-05-2022', '30-08-2024');


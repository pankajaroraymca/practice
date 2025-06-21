--------------------------------------------- what is normalization -----------------------------------

-- A normalization is a process in relational database to organize data and reduce redundancy
-- It breaks large table into smaller tables to effectively manage them.

-- Eliminated data redundancy
-- Ensures Data Integrity
-- Organise data logically into related tables

-- Normalization forms:

--------------------------------------------1) 1NF ----------------------------------------------------

-- A table is considered to be 1NF if each field in record must have a atomic value

| StudentID | Name  | Courses       |
| --------- | ----- | ------------- |
| 1         | Alice | Math, Physics |
| 2         | Bob   | Chemistry     |


-- Courses field is not atomic

-- 1NF Version
| StudentID | Name  | Course    |
| --------- | ----- | --------- |
| 1         | Alice | Math      |
| 1         | Alice | Physics   |
| 2         | Bob   | Chemistry |

------------------------------------------2) 2NF -----------------------------------------------------

-- A table is considered to be in 2NF, if its already in 1NF and
-- there should be no partial dependency. What does it mean? 

| StudentID | Name  | Course    |
| --------- | ----- | --------- |
| 1         | Alice | Math      |
| 1         | Alice | Physics   |
| 2         | Bob   | Chemistry |

-- You can see in above table, primary key would be combination of student id and course id.
-- But student name depends on student id. It should depend fully on composite primary key (student id, course)

-- 2NF version
| StudentID | StudentName |
| --------- | ----------- |
| 1         | Alice       |


| StudentID | CourseID |
| --------- | -------- |
| 1         | 101      |
| 1         | 102      |


------------------------------------------3) 3NF -----------------------------------------------

-- A table is considered to be in 3NF, if it already in 2NF and 1NF.
-- And there is no transitive dependency

| StudentID | StudentName | Department | DeptHead  |
| --------- | ----------- | ---------- | --------- |
| 1         | Alice       | CS         | Dr. Smith |

-- Here DeptHead is depending on department and department is dependent on student id.
-- This is a case of transitive dependency.
-- To solve this, break the department table.

-- 3NF version

| StudentID | StudentName | DepartmentID |
| --------- | ----------- | ----------   |
| 1         | Alice       | 1            |



| DepartmentID | DepartmentName | DeptHead  |
| ------------ | -------------- |           |
| 1            |       CS       | Dr. Smith |


-- Now department id dependent on student id
-- and department name and department head is dependent on department id in separate table


----------------------------------------------- BCNF ----------------------------------------

-- A stricter form of 3NF.


---------------------------------------------- Conclusion -----------------------------------

-- By using normalization form, performance is impacted as we have to read from multiple table
-- Sometimes to improve performance, denormalization is also used.



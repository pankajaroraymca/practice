---------------------------------------- What is subquery -------------------------------------

-- A subquery is a query inside another query.
-- It allows you to pass dynamic data
-- It allows you to filter data.

-- There are mainly two types of subqueries :

-- 1) Correlated Subquery
-- 2) Non Correlated Subquery


-------------------------------------------Correlated Subquery ---------------------------------------------------

-- In this subquery, outer query and inner query is linked. They are not independent.
--Ques. For each employee in the employees table, find those who earn more than the average salary of their own department.

SELECT e.name as empname, d.name as depname, s.amount as salary from employees e inner JOIN department d on e.department_id = d.id inner join salary s on e.id = s.emp_id where s.amount > 
(SELECT  AVG(s.amount) as avg from employees e2 inner join salary s on e2.id = s.emp_id where e2.department_id = e.department_id);

-- This is a correlated subquery because inner subquery uses outer parameter like department id.

-------------------------------------------Non Correlated Subquery ---------------------------------------------------

-- In this subquery, each inner sub query is independent of each other.
-- Ques . Get the names of employees who earn more than the average salary of all employees.

SELECT e.name, s.amount from employees e INNER JOIN salary s on e.id = s.emp_id where s.amount > 
(SELECT AVG(amount) as avg from employees e inner join salary s on e.id = s.emp_id);


-- Ques. Find Employees with maximum salaries

SELECT e.name, s.amount from employees e INNER JOIN salary s on e.id = s.emp_id WHERE s.amount =
( SELECT MAX(s.amount) from salary s);

--Note: We can solve this question by using order by and limit but there can be multiple employees with the highest salary.

-- Ques. Show each department’s average salary using a subquery in the FROM clause.

SELECT d.name as dname, subquery.avg from
(SELECT e.department_id as did, AVG(s.amount) as avg FROM employees e INNER JOIN salary s on e.id = s.emp_id GROUP BY e.department_id) as subquery
INNER JOIN department d on subquery.did = d.id;

--Ques. List the name, department, and salary of the highest-paid employee in each department.
SELECT e.name as ename, d.name as dname , s.amount as salary, depmax.salary as maxsalary FROM employees e INNER JOIN salary s on e.id = s.emp_id INNER JOIN department d on e.department_id = d.id inner join
(SELECT MAX(s.amount) as salary, d.id as did FROM employees e INNER JOIN salary s on e.id = s.emp_id INNER JOIN department d on e.department_id = d.id GROUP BY d.id) as depmax on d.id = depmax.did where s.amount = depmax.salary;

-- Note: When subquery is returning multiple rows or multiple columns and criteria is based on using those multiple fields, make sure to use from clause or Join them.

-- Ques. Find the nth highest salary from the salary table.
-- Note: This is a tricky question. There are multiple ways to solve this problem.  

SELECT DISTINCT s.amount from employee e inner JOIN salary s on e.emp_id = s.emp_id  where 2 = ( SELECT count(DISTINCT s2.amount) from employee e2 inner JOIN salary s2 on e2.emp_id = s2.emp_id where s2.amount >= s.amount);

SELECT AMOUNT FROM (SELECT s.amount, DENSE_RANK() over (ORDER BY s.amount DESC) as rnk from employee e inner JOIN salary s on e.emp_id = s.emp_id) ranked where rnk = 2;

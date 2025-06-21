------------------------------- What is a View ? -------------------------------------

-- A view is a virtual table made up from the select sql commands.
-- It does not stores the rows physically. Under the hood, orignal table rows are there.
-- Useful to hide data.
-- Reusability.

-- Syntax

CREATE VIEW employee_salary_view AS
SELECT 
    e.name, 
    d.name AS department_name, 
    s.amount
FROM 
    employees e
JOIN 
    department d ON e.department_id = d.id
JOIN 
    salary s ON e.id = s.emp_id;

SELECT * FROM employee_salary_view;

-- A view can be divided into 2 categories:
-- 1) Updatable View: If the view is created using single table and is not using aggregations.
-- 2) Non Updateable View: If the view is created using complex query which includes any join, aggragation, group by then it is not updatable.

--------------------------------------------------- Materialized View ------------------------------------------------------

-- Unlike regular view, materialized view stores data pysically.
-- Why it is used? To maintain a cache table for faster reads from large table.
-- Materialized views need to refreshed manually.

CREATE MATERIALIZED VIEW employee_summary AS
SELECT 
    d.name AS department_name,
    COUNT(e.id) AS employee_count,
    AVG(s.amount) AS avg_salary
FROM 
    employees e
JOIN 
    department d ON e.department_id = d.id
JOIN 
    salary s ON e.id = s.emp_id
GROUP BY 
    d.name;

SELECT * FROM employee_summary; -- We have a small cache table, so calculations were not performed on whole table, unless view results are shown here

-- If there is new data in the employee or salary table, then view needs to be refreshed
REFRESH MATERIALIZED VIEW employee_summary;

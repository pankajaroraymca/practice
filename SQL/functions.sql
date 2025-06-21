------------------------------------------- Functions ---------------------------------------------------------------------

-- Functions in psql are line any other functions in other languages. It takes parameter and also return values
-- It is mainly used for reusability.
-- It can perform calculation, transfrom data.
-- There are many types of functions in psql

-- 1) Scalar Function
-- It returns single value of any data type.

CREATE FUNCTION get_discount(price INTEGER, discount INTEGER)
RETURNS INTEGER AS $$
BEGIN
RETURN price - (price * discount / 100);
END;
$$ LANGUAGE PLPGSQL;

-- USAGE
SELECT get_discount(100, 20);

-- 2) Tabular Functions
-- It return set of rows just like a view

CREATE OR REPLACE FUNCTION get_active_emps()
RETURNS TABLE(id UUID, name VARCHAR, emp_id VARCHAR) AS $$
BEGIN
    RETURN QUERY 
    SELECT e.id, e.name, e.emp_id 
    FROM employee e 
    WHERE e.is_active = true;
END;
$$ LANGUAGE plpgsql;

-- USAGE
SELECT * from get_active_emps();

-------------------------------------------Stored Procedures ---------------------------------------------------------------

-- It is set of pre compiled sql queries which can be called. If often compares with functions but there's a diff between them
-- Stored Procedures can be called with transaction control. Means they can be commited/rollbacked
-- Also they do not return values while functions can

CREATE PROCEDURE update_salary_2(emp_id_param VARCHAR, new_amount INT)
LANGUAGE plpgsql
AS $$
BEGIN
    UPDATE salary s
    SET amount = amount + new_amount
    WHERE s.emp_id = emp_id_param;
END;
$$;

CALL update_salary_2('E1283', 500);
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
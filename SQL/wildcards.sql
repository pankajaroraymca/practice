-- Wildcards basically used in pattern matching with LIKE, SIMILAR TO, POSIX (~)

-- LIKE : %, _
-- SIMILAR TO: %, _, [], +, *

-- 1) %

SELECT * FROM employee WHERE NAME LIKE '%a' -- It means name should end with a, starting chars could be anything

SELECT * FROM employee WHERE NAME LIKE '%a%' -- It means name should have char a in between. id

SELECT * FROM employee WHERE NAME LIKE 'P%' -- It means name should start with P, case sensitive

-- 2) _ underscore

SELECT * FROM employee WHERE NAME LIKE '_h%' -- It means 2nd char should be h, first can be anything, and ending chars can be anything

SELECT * FROM employee WHERE NAME LIKE '___b%' -- It means 4th char should be b, first four can be anything


--3) []

SELECT * FROM employee WHERE NAME ~ '^.[d-z]' -- [] works with POSIX (~) regular expression or SIMILAR TO, ^. means first char can be anyhting and second char can be from [d-z]
-- ~ This is case sensitive 
-- ~* This is case insenstive
-- !~ This is negated. It will give you the opposite results


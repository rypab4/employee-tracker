use employees;

INSERT INTO department
    (name)
VALUES
    ('Human Resources'),
    ('Molecular Biology'),
    ('Information Technology'),
    ('Accounting');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('HR Manager', 100000, 1),
    ('Director', 200000, 2),
    ('Principal Scientist', 150000, 2),
    ('Scientific Researcher', 100000, 2),
    ('IT Director', 195000, 3),
    ('IT Tech', 100000, 3),
    ('Account Manager', 110000, 4),
    ('Accountant', 90000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Rudolf', 'Reindeer', 1, NULL),
    ('Calvin', 'Kein', 2, 1),
    ('Taylor', 'Swift', 3, NULL),
    ('Brock', 'Lesnar', 4, 3),
    ('Rocky', 'Johnson', 4, 3),
    ('Duane', 'Johnson', 5, NULL),
    ('Jonathan', 'Kuminga', 6, 5),
    ('Stephan', 'Curry', 6, 5),
    ('Thurman', 'Thomas', 7, NULL),
    ('Joe', 'Smith', 7, 8);
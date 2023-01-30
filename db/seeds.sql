USE employee_tracker

INSERT INTO departments (name)
VALUES
('Human Resources'),
('Information Technology'),
('Research Department'),
('Purchasing Department'),
('Manufacturing Department');

INSERT INTO roles (title, salary, department_id)
VALUES
('HR Manager', 150000, 1),
('HR Resources', 85000, 1),
('HR Supervisor', 100000, 1), 
('Scientific Director', 200000, 3),
('Scientific Researcher', 85000, 3),
('IT Manager', 120000, 2),
('IT Specialist', 100000, 2),
('Psycologist', 75000, 1),
('Buyer', 65000, 4),
('Supervising Buyer', 85000, 4),
('Manufacturing Director', 150000, 5),
('Manufacturing Manager', 125000, 5),
('Buyer', 400000, 4);

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
('Jack', 'Black', 1, NULL),
('Black', 'Jack', 1, 1),
('Aces', 'Queen', 2, 1),
('Taylor', 'Swift', 3, 1),
('Kate', 'Spade', 3, 1),
('Maui', 'Jim', 4, NULL),
('Tommy', 'Bahama', 5, 6),
('Pat', 'Mahommes', 6, NULL),
('Travis', 'Kelce', 7, 8),
('James', 'LeBron', 8, 8),
('Stephen', 'Curry', 9, NULL);

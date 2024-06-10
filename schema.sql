DROP DATABASE IF EXISTS business_db;
CREATE DATABASE business_db;

\c business_db;

CREATE TABLE department (
    id SERIAL PRIMARY KEY,
    name VARCHAR(30) UNIQUE NOT NULL
);

CREATE TABLE role (
    id SERIAL PRIMARY KEY,
    title VARCHAR(30) UNIQUE NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER NOT NULL,
    FOREIGN KEY (department_id)
    REFERENCES department(id)
    ON DELETE SET NULL
);

CREATE TABLE employee (
    id SERIAL PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER NOT NULL,
    manager_id INTEGER,
    FOREIGN KEY (role_id)
    REFERENCES role(id)
    ON DELETE SET NULL,
    FOREIGN KEY (manager_id)
    REFERENCES employee(id)
    ON DELETE SET NULL
);

INSERT INTO department (name)
VALUES
('Sales'),
('Engineering'),
('Finance'),
('Legal'),
('Banking');

INSERT INTO role (title, salary, department_id)
VALUES
('Sales Lead', 60000, 1),
('Salesperson', 35000, 1),
('Lead Engineer', 80000, 2),
('Software Engineer', 85000, 2),
('Account Manager', 70000, 3),
('Accountant', 45000, 3),
('Legal Team Lead', 110000, 4),
('Lawyer', 95000, 4),
('Manager', 65000, 5),
('Teller', 35000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
('Mike', 'Brown', 1, null),
('Joe', 'Malone', 2, 1),
('Brian', 'Griffen', 3, null),
('Peter', 'Barker', 4, 3),
('Eric', 'Jones', 5, null),
('Sarah', 'Happy', 6, 5),
('Michelle', 'Brooks', 7, null),
('Mike', 'Williams', 8, 7),
('Tara', 'Reed', 9, null),
('Leslie', 'Perry', 10, 9);
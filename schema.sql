DROP DATABASE IF EXISTS employees_DB;
CREATE DATABASE employees_DB;

USE employees_DB;

CREATE TABLE department (
  id INT NOT NULL AUTO_INCREMENT,
  name VARCHAR(100) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT NOT NULL AUTO_INCREMENT,
  title VARCHAR(30) NOT NULL,
  salary decimal (8,2),
  department_id INT,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT NOT NULL AUTO_INCREMENT,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NOT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO department (name) VALUES ('Dev Ops');
INSERT INTO department (name) VALUES ('Engineering');

INSERT INTO role (title, salary, department_id) VALUES ('Manager', 100000, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Engineer', 60000, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Lead', 80000, 2);
INSERT INTO role (title, salary, department_id) VALUES ('Intern', 50000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Claire', 'Vita', 1, 1);

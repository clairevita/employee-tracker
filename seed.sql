INSERT INTO department (name) VALUES ('Dev Ops');
INSERT INTO department (name) VALUES ('Engineering');

INSERT INTO role (title, salary, department_id) VALUES ('Manager', 100000, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Engineer', 60000, 1);
INSERT INTO role (title, salary, department_id) VALUES ('Lead', 80000, 2);
INSERT INTO role (title, salary, department_id) VALUES ('Intern', 50000, 2);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('Claire', 'Vita', 1, 1);

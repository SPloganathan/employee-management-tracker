-- Dropping the database if already exists
DROP DATABASE IF EXISTS employeetracker_db;
CREATE DATABASE employeetracker_db;

-- selecting the database
USE employeetracker_db;

-- creating tables
CREATE TABLE department
(
    id INT NOT NULL
    AUTO_INCREMENT,
  name VARCHAR
    (30) NOT NULL,
  PRIMARY KEY
    (id)
);

    CREATE TABLE role
    (
        id INT NOT NULL
        AUTO_INCREMENT,
        title VARCHAR
        (30) NOT NULL,
        salary DECIMAL NOT NULL,
        department_id INT ,
        PRIMARY KEY
        (id),
        FOREIGN KEY
        (department_id)
        REFERENCES department
        (id)
        ON
        DELETE
        SET NULL
        );

        CREATE TABLE employee
        (
            id INT NOT NULL
            AUTO_INCREMENT,
        first_name VARCHAR
            (30) NOT NULL,
        last_name VARCHAR
            (30) NOT NULL,
        role_id INT ,
        manager_id INT ,
        PRIMARY KEY
            (id),
        FOREIGN KEY
            (role_id)
        REFERENCES role
            (id)
        ON
            DELETE
            SET NULL
            ,
        FOREIGN KEY
            (manager_id)
        REFERENCES employee
            (id)
        ON
            DELETE
            SET NULL
            );
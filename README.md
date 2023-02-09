# EMPLOYEE MANAGEMENT TRACKER

[![License](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## Table of Contents

* [Description](#description)
* [Usage](#usage)
* [Installation](#installation)
* [License](#license)
* [Deployed](#deployed)
* [Questions](#questions)

## Description 
    
*The what, why, and how:* 
      
Developers frequently have to create interfaces that allow non-developers to easily view and interact with information stored in databases. These interfaces are called content management systems (CMS). In this project I have build a command-line application from scratch to manage a company's employee database, using Node.js, Inquirer, and MySQL.

## Usage

* On starting the application, we are presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, update employee role, update employee manager, view budget utilized by each department, and view employees by manager.
* On choosing 'view all departments', we are presented with a formatted table showing department names and department ids.
* On choosing 'view all roles', we are presented with the job title, role id, the department that role belongs to, and the salary for that role.
* On choosing 'view all employees', we are presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
* On choosing 'add a department', we are prompted to enter the name of the department and that department is added to the database.
* On chooisng 'add a role', we are prompted to enter the name, salary, and department for the role and that role is added to the database.
* On choosing 'add an employee', we are prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database.
* On chooisng 'update an employee role', we are prompted to select an employee to update and their new role and this information is updated in the database.
* On choosing 'update employee manager', we are prompted to select an employee to update and a manager to assign and the information is updated in the database.
* On choosing 'view budget utilized by each department', we are presented with formatted table showing department and budget(the combined salaries of all employees in that department).
* On choosing 'view employees by manager', we are prompted to select a manager and we are presented with a table showing id, first name and last name.

## Installation

  ```npm i```
  
  The application use the Inquirer package, ensure that you install and use Inquirer version 8.2.4. To do so, use the following command in your project folder: npm i inquirer@8.2.4.

## License
  
This project is licensed under The MIT License

## Deployed

The demo video link for this project
## https://drive.google.com/file/d/1iOFLevL768rBo9PKj0OYK4SwFDWsg5AP/view?usp=sharing

## Questions

If you have any questions about this repo, open an issue or contact me directly at sakthiloganathan1127@gmail.com. You can find more of my work at [@sploganathan](https://github.com/sploganathan)

   
---

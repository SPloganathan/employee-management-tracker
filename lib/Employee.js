// importing database file
const db = require("../utils/database");
//creating class Employee
class Employee {
  // constructor
  constructor(
    firstName = "",
    lastName = "",
    roleId = null,
    managerId = null,
    id = null
  ) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.roleId = roleId;
    this.managerId = managerId;
    this.id = id;
  }

  getFirstName() {
    return this.firstName;
  }
  getLastName() {
    return this.lastName;
  }
  getRoleId() {
    return this.roleId;
  }
  getManagerId() {
    return this.managerId;
  }

  // function which will get all the employee details by joining roles and department tables
  async getAllEmployees() {
    let data = [];
    await db
      .promise()
      .query(
        `SELECT employee.id AS id , employee.first_name, employee.last_name, title, name AS department, salary, CONCAT(manager_tb.first_name,' ',manager_tb.last_name) AS manager FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON department.id = role.department_id LEFT JOIN employee manager_tb ON manager_tb.id = employee.manager_id`
      )
      .then(([results]) => {
        data = results;
      })
      .catch(console.log);
    return data;
  }

  // function for creating new employee
  async setEmployee() {
    await db
      .promise()
      .query(
        `INSERT into employee (first_name,last_name,role_id,manager_id) VALUES ('${this.firstName}','${this.lastName}',${this.roleId},${this.managerId})`
      )
      .then(([results]) => {
        console.log("Added new employee");
      })
      .catch(console.log);
  }

  // function for updating the role id of employee
  async updateEmployeeRole() {
    await db
      .promise()
      .query(
        `UPDATE employee SET role_id = ${this.roleId} WHERE id = ${this.id}`
      )
      .then(([results]) => {
        console.log("Updated Successfully");
      })
      .catch(console.log);
  }

  // function for updating the manager id of specific employee
  async updateEmployeeManager() {
    await db
      .promise()
      .query(
        `UPDATE employee SET manager_id = ${this.managerId} WHERE id = ${this.id}`
      )
      .then(([results]) => {
        console.log("Updated Successfully");
      })
      .catch(console.log);
  }

  // function for getting the budget utilized based on the department
  async getBudgetUtilized() {
    let data = [];
    await db
      .promise()
      .query(
        `SELECT name AS department, SUM(salary) AS budget FROM employee INNER JOIN role ON employee.role_id = role.id INNER JOIN department ON department.id = role.department_id GROUP BY department.id`
      )
      .then(([results]) => {
        data = results;
      })
      .catch(console.log);
    return data;
  }

  // function for getting all the manager
  //  DISTINCT will return unique values
  async getAllManagers() {
    let data = [];
    await db
      .promise()
      .query(
        `SELECT DISTINCT employee.id AS id, CONCAT(employee.first_name,' ',employee.last_name) AS name FROM employee manager_tb INNER JOIN employee ON employee.id = manager_tb.manager_id `
      )
      .then(([results]) => {
        data = results;
      })
      .catch(console.log);
    return data;
  }

  // function for getting the employees by manager
  async getEmployeeByManager() {
    let data = [];
    await db
      .promise()
      .query(
        `SELECT id,first_name,last_name FROM employee WHERE manager_id = ${this.managerId} `
      )
      .then(([results]) => {
        data = results;
      })
      .catch(console.log);
    return data;
  }
}

module.exports = Employee;

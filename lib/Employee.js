const db = require("../utils/database");

class Employee {
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
}

module.exports = Employee;

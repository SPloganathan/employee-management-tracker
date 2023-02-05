const db = require("../utils/database");

class Employee {
  constructor(firstName = "", lastName = "", roleId = null, managerId = null) {
    this.firstName = firstName;
    this.lastName = lastName;
    this.roleId = roleId;
    this.managerId = managerId;
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
      .query("SELECT * FROM employee")
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
        console.table(results);
      })
      .catch(console.log);
  }
}

module.exports = Employee;

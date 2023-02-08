// importing database file
const db = require("../config/connection");
//creating class Role
class Role {
  constructor(title = "", salary = "", departmentId = "") {
    // constructor functions
    this.title = title;
    this.salary = salary;
    this.departmentId = departmentId;
  }

  // function for getting all roles
  async getAllRoles() {
    let data = [];
    await db
      .promise()
      .query(
        "SELECT role.id AS id , title, salary , name AS department FROM role INNER JOIN department ON department.id = role.department_id"
      )
      .then(([results]) => {
        data = results;
      })
      .catch(console.log);
    return data;
  }

  // function for creating new roles
  async setRole() {
    await db
      .promise()
      .query(
        `INSERT into role (title,salary,department_id) VALUES ('${this.title}',${this.salary},'${this.departmentId}')`
      )
      .then(([results]) => {
        console.log("Added new role");
      })
      .catch(console.log);
  }
}

module.exports = Role;

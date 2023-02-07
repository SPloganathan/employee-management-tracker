const db = require("../utils/database");

class Role {
  constructor(title = "", salary = "", departmentId = "") {
    this.title = title;
    this.salary = salary;
    this.departmentId = departmentId;
  }

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

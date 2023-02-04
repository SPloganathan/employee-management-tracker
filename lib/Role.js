const db = require("../utils/database");

class Role {
  constructor(title = "", salary = "", departmentId = "") {
    this.title = title;
    this.salary = salary;
    this.departmentId = departmentId;
  }

  async getAllRoles() {
    await db
      .promise()
      .query("SELECT * FROM role")
      .then(([results]) => {
        console.table(results);
      })
      .catch(console.log)
      .then(() => db.end());
  }

  async setRole() {
    await db
      .promise()
      .query(
        `INSERT into role (title,salary,department_id) VALUES ('${this.title}',${this.salary},'${this.departmentId}')`
      )
      .then(([results]) => {
        console.table(results);
      })
      .catch(console.log)
      .then(() => db.end());
  }
}

module.exports = Role;

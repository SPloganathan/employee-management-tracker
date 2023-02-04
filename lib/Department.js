const db = require("../utils/database");

class Department {
  constructor(name = "") {
    this.name = name;
  }

  async getAllDepartment() {
    await db
      .promise()
      .query("SELECT * FROM department")
      .then(([results]) => {
        console.table(results);
      })
      .catch(console.log)
      .then(() => db.end());
  }

  async setDepartment() {
    await db
      .promise()
      .query(`INSERT into department (name) VALUES ('${this.name}')`)
      .then(([results]) => {
        console.table(results);
      })
      .catch(console.log)
      .then(() => db.end());
  }
}

module.exports = Department;

const db = require("../utils/database");

class Department {
  constructor(name = "") {
    this.name = name;
  }

  async getAllDepartment() {
    let data = [];
    await db
      .promise()
      .query("SELECT * FROM department")
      .then(([results]) => {
        data = results;
      })
      .catch(console.log);
    return data;
  }

  async setDepartment() {
    await db
      .promise()
      .query(`INSERT into department (name) VALUES ('${this.name}')`)
      .then(([results]) => {
        console.table(results);
      })
      .catch(console.log);
  }
}

module.exports = Department;

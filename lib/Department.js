// importing database file
const db = require("../config/connection");
// creating class Department
class Department {
  constructor(name = "") {
    this.name = name;
  }

  // function for getting all departments
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

  // function for creating new departments
  async setDepartment() {
    await db
      .promise()
      .query(`INSERT into department (name) VALUES ('${this.name}')`)
      .then(([results]) => {
        console.log("Added new department");
      })
      .catch(console.log);
  }
}

module.exports = Department;

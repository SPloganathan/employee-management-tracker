const inquirer = require("inquirer");

const viewAllEmployees = () => {
  //select query goes here
  console.log("employess");
  initializer();
};

const viewAllRoles = () => {
  //select query goes here
  console.log("roles");
  initializer();
};

const viewAllDepartments = () => {
  // select query goes here
  console.log("departments");
  initializer();
};

const addRole = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the role?",
        name: "roleName",
      },
      {
        type: "input",
        message: "What is the salary of the role?",
        name: "roleSalary",
      },
      {
        type: "list",
        choices: ["Engineering", "Finance", "Legal", "Sales", "Service"],
        message: "Which department does the role belong to?",
        name: "rolesDepartment",
      },
    ])
    .then((response) => {
      // insert query goes here
      console.log("New role added successfully");
      initializer();
    });
};

const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the department?",
        name: "departmentName",
      },
    ])
    .then((response) => {
      // insert query goes here
      console.log("New department added successfully");
      initializer();
    });
};

const addEmployee = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the employee's first name?",
        name: "employeeFirstName",
      },
      {
        type: "input",
        message: "What is the employee's last name?",
        name: "employeeLastName",
      },
      {
        type: "list",
        choices: [
          "Sales Lead",
          "Sales Person",
          "Lead Engineer",
          "Software Engineer",
          "Account Manager",
          "Accountant",
          "Legal Team Lead",
          "Lawyer",
          "Customer Service",
        ],
        message: "What is the employee's role?",
        name: "employeeRole",
      },
      {
        type: "list",
        choices: [
          "John Doe",
          "Mike Chan",
          "Ashley Rodriguez",
          "Kevin Tupik",
          "Kunal Singh",
          "Malia Brown",
          "Sarah Lourd",
          "Tom Allen",
        ],
        message: "Who is the employee's manager?",
        name: "employeeManager",
      },
    ])
    .then((response) => {
      // insert query goes here
      console.log("New employee added successfully");
      initializer();
    });
};

const updateEmployeeRole = () => {
  inquirer
    .prompt([
      {
        type: "list",
        choices: [
          "John Doe",
          "Mike Chan",
          "Ashley Rodriguez",
          "Kevin Tupik",
          "Kunal Singh",
          "Malia Brown",
          "Sarah Lourd",
          "Tom Allen",
        ],
        message: "Which employee's role do you want to update?",
        name: "employeeRoleUpdate",
      },
      {
        type: "list",
        choices: [
          "Sales Lead",
          "Sales Person",
          "Lead Engineer",
          "Software Engineer",
          "Account Manager",
          "Accountant",
          "Legal Team Lead",
          "Lawyer",
          "Customer Service",
        ],
        message: "Which role do you want to assign the selected employee?",
        name: "updateRole",
      },
    ])
    .then((response) => {
      // update query goes here
      console.log("Employee role updated successfully");
      initializer();
    });
};

const initializer = () => {
  inquirer
    .prompt([
      // initial list
      {
        type: "list",
        choices: [
          // no questions for below
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          // view all roles- no questions
          "View All Roles",
          "Add Role",
          // no questions for below
          "View All Departments",
          "Add Department",
          "Quit",
        ],
        message: "What would you like to do?",
        name: "taskPerformer",
      },
    ])
    .then((response) => {
      const responseType = response.taskPerformer;
      switch (responseType) {
        case "View All Employees":
          viewAllEmployees();
          break;
        case "View All Roles":
          viewAllRoles();
          break;
        case "View All Departments":
          viewAllDepartments();
          break;
        case "Add Role":
          addRole();
          break;
        case "Add Department":
          addDepartment();
          break;
        case "Add Employee":
          addEmployee();
          break;
        case "Update Employee Role":
          updateEmployeeRole();
          break;
        case "Quit":
          break;
      }
    });
};

initializer();

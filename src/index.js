// importing all required files
const cTable = require("console.table");
const logo = require("asciiart-logo");
const inquirer = require("inquirer");
const Department = require("../lib/Department");
const Employee = require("../lib/Employee");
const Role = require("../lib/Role");
const db = require("../utils/database");

// logic for viewing all employees
const viewAllEmployees = async () => {
  // initializing the Employee class
  const employee = new Employee();
  // initializing the function getAllEmployee() from the class file Employee
  console.table(await employee.getAllEmployees());
  initializer();
};

// logic for viewing all roles
const viewAllRoles = async () => {
  // initializing the Role class
  const role = new Role();
  // initializing the function getAllRoles() from the class file Role
  console.table(await role.getAllRoles());
  initializer();
};

// logic for viewing all departments
const viewAllDepartments = async () => {
  // initializing the Department class
  const department = new Department();
  // initializing the function getAllDepartment() from the class file Department
  console.table(await department.getAllDepartment());
  initializer();
};

// logic for adding roles
const addRole = async () => {
  const department = new Department();
  const departmentArray = await department.getAllDepartment();
  // Mapping the data.Inquirer's choices key represents a choice and has a name: key to be shown to the user as an option for the choice, and a value: key which will be what inquirer stores as the answer value in the answer object.
  // Assinging the department.id to Value since the department value has to be stored as an ID in the Role table.
  const allDepartments = departmentArray.map((department) => {
    return { value: department.id, name: department.name };
  });
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
        choices: allDepartments,
        message: "Which department does the role belong to?",
        name: "rolesDepartment",
      },
    ])
    .then((response) => {
      // pasing the values into the constructor function
      const role = new Role(
        response.roleName,
        response.roleSalary,
        response.rolesDepartment
      );
      // initializing the function setRole() from the class file Role
      role.setRole();
      console.log("New role added successfully");
      initializer();
    });
};

// logic for adding departments
const addDepartment = () => {
  inquirer
    .prompt([
      {
        type: "input",
        message: "What is the name of the department?",
        name: "departmentName",
      },
    ])
    .then(async (response) => {
      const department = new Department(response.departmentName);
      // initializing the function setDepartment() from the class file Department
      await department.setDepartment();
      console.log("Deparment added");
      initializer();
    });
};

// logic for adding employees
const addEmployee = async () => {
  const role = new Role();
  const roleData = await role.getAllRoles();
  const roleChoices = roleData.map((role) => {
    return { value: role.id, name: role.title };
  });
  const employee = new Employee();
  const employeeData = await employee.getAllEmployees();
  const employeeNameChoices = employeeData.map((employee) => {
    return {
      value: employee.id,
      name: `${employee.first_name} ${employee.last_name}`,
    };
  });
  // pushing none at index 0 since None needs to be shown at top.
  // Splice will mutate the existing array,
  // where 0 - Index in which the new element to be pushed,
  // 0 - Will not delete any element,
  // { value: null, name: "None" } - will be pushed into 0th index
  employeeNameChoices.splice(0, 0, { value: null, name: "None" });
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
        choices: roleChoices,
        message: "What is the employee's role?",
        name: "employeeRole",
      },
      {
        type: "list",
        choices: employeeNameChoices,
        message: "Who is the employee's manager?",
        name: "employeeManager",
      },
    ])
    .then(async (response) => {
      const employee = new Employee(
        response.employeeFirstName,
        response.employeeLastName,
        response.employeeRole,
        response.employeeManager
      );
      // initializing the function setEmployee() from the class file Employee
      await employee.setEmployee();
      console.log("New employee added successfully");
      initializer();
    });
};

// logic for updating employee role
const updateEmployeeRole = async () => {
  const employee = new Employee();
  const employeeData = await employee.getAllEmployees();
  const employeeNameChoices = employeeData.map((employee) => {
    return {
      value: employee.id,
      name: `${employee.first_name} ${employee.last_name}`,
    };
  });
  const role = new Role();
  const roleData = await role.getAllRoles();
  const roleChoices = roleData.map((role) => {
    return { value: role.id, name: role.title };
  });
  inquirer
    .prompt([
      {
        type: "list",
        choices: employeeNameChoices,
        message: "Which employee's role do you want to update?",
        name: "employeeRoleUpdate",
      },
      {
        type: "list",
        choices: roleChoices,
        message: "Which role do you want to assign the selected employee?",
        name: "updateRole",
      },
    ])
    .then((response) => {
      const employee = new Employee(
        "",
        "",
        response.updateRole,
        null,
        response.employeeRoleUpdate
      );
      // initializing the function updateEmployeeRole() from the class file Employee
      employee.updateEmployeeRole();
      console.log("Employee role updated successfully");
      initializer();
    });
};

// writing a function called initializer() which will display the initial list using inquirer.prompt.
// .then is done using a switch case and each case performs a specific logic.
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
    // using switch case logic for displaying the options
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
          db.end();
          break;
        default:
          break;
      }
    });
};

// ASCII-ART Logo
console.log(
  logo({
    name: "EMPLOYEE MANAGEMENT TRACKER",
    font: "Standard",
    lineChars: 10,
    padding: 2,
    margin: 3,
    borderColor: "grey",
    logoColor: "white",
    textColor: "white",
  })
    .emptyLine()
    .render()
);

// initializing the inquirer questions.
initializer();

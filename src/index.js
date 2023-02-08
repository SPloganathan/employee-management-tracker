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
  // calling the fuction getAllEmployee() from the class file Employee
  console.table(await employee.getAllEmployees());
  initializer();
};

// logic for viewing all roles
const viewAllRoles = async () => {
  // initializing the Role class
  const role = new Role();
  // calling the fuction getAllRoles() from the class file Role
  console.table(await role.getAllRoles());
  initializer();
};

// logic for viewing all departments
const viewAllDepartments = async () => {
  // initializing the Department class
  const department = new Department();
  // calling the fuction getAllDepartment() from the class file Department
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
      // calling the fuction setRole() from the class file Role
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
      // calling the fuction setDepartment() from the class file Department
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
      // calling the fuction setEmployee() from the class file Employee
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
      // calling the function updateEmployeeRole() from the class file Employee
      employee.updateEmployeeRole();
      console.log("Employee role updated successfully");
      initializer();
    });
};

// logic for updating employee manager
const updateEmployeeManager = async () => {
  const employee = new Employee();
  const employeeData = await employee.getAllEmployees();
  const employeeNameChoices = employeeData.map((employee) => {
    return {
      value: employee.id,
      name: `${employee.first_name} ${employee.last_name}`,
    };
  });
  inquirer
    .prompt([
      {
        type: "list",
        choices: employeeNameChoices,
        message: "Which employee's manager do you want to update?",
        name: "employeeManagerUpdate",
      },
      {
        type: "list",
        choices: employeeNameChoices,
        message: "Which employee do you want to assign as manager?",
        name: "assignManager",
      },
    ])
    .then((response) => {
      const employee = new Employee(
        "",
        "",
        "",
        response.assignManager,
        response.employeeManagerUpdate
      );
      // calling the function updateEmployeeRole() from the class file Employee
      employee.updateEmployeeManager();
      console.log("Employee manager updated successfully");
      initializer();
    });
};

// logic for viewing budget uitilized by departments
const viewBudgetUtilized = async () => {
  // initializing the Employee class
  const employee = new Employee();
  // calling the function getBudgetUtilized() from the class file Employee
  console.table(await employee.getBudgetUtilized());
  initializer();
};

// logic for view employees by manager
const viewManagersEmployee = async () => {
  const employee = new Employee();
  const managerData = await employee.getAllManagers();

  const managerNameChoices = managerData.map((manager) => {
    return {
      value: manager.id,
      name: manager.name,
    };
  });
  inquirer
    .prompt([
      {
        type: "list",
        choices: managerNameChoices,
        message: "Which manager's employee you wanted to view?",
        name: "managersId",
      },
    ])
    .then(async (response) => {
      const employee = new Employee("", "", "", response.managersId, null);
      // calling the function getEmployeeByManager() from the class file Employee
      console.table(await employee.getEmployeeByManager());
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
          "View All Employees",
          "Add Employee",
          "Update Employee Role",
          "View All Roles",
          "Add Role",
          "View All Departments",
          "Add Department",
          "Update employee manager",
          "View budget utilized by each department",
          "View employees by manager",
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
        case "Update employee manager":
          updateEmployeeManager();
          break;
        case "View budget utilized by each department":
          viewBudgetUtilized();
          break;
        case "View employees by manager":
          viewManagersEmployee();
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

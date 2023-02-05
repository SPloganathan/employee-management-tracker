// importing inquirer
const inquirer = require("inquirer");
const Department = require("../lib/Department");
const Employee = require("../lib/Employee");
const Role = require("../lib/Role");

// logic for viewing all employees
const viewAllEmployees = async () => {
  const employee = new Employee();
  console.log(await employee.getAllEmployees());
  initializer();
};

// logic for viewing all roles
const viewAllRoles = async () => {
  const role = new Role();
  console.log(await role.getAllRoles());
  initializer();
};

// logic for viewing all departments
const viewAllDepartments = async () => {
  const department = new Department();
  console.log(await department.getAllDepartment());
  initializer();
};

// logic for adding roles
const addRole = async () => {
  const department = new Department();
  const departmentArray = await department.getAllDepartment();
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
      const role = new Role(
        response.roleName,
        response.roleSalary,
        response.rolesDepartment
      );
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
      await department.setDepartment();
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
  const choices = [
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
  ];
  if (employeeNameChoices.length > 0) {
    choices.push({
      type: "list",
      choices: employeeNameChoices,
      message: "Who is the employee's manager?",
      name: "employeeManager",
    });
  }
  inquirer.prompt(choices).then(async (response) => {
    const employee = new Employee(
      response.employeeFirstName,
      response.employeeLastName,
      response.employeeRole,
      response.employeeManager
    );
    await employee.setEmployee();
    console.log("New employee added successfully");
    initializer();
  });
};

// logic for updating employee role
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
        default:
          break;
      }
    });
};

initializer();

var mysql = require("mysql");
var inquirer = require("inquirer");
var dotenv = require("dotenv").config();


const addElement = require('./exports/addElement');
const viewElement = require('./exports/viewElement');


var addConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE
});

addConnection.connect(function (err) {
  if (err) throw err;
});

runSearch();

function runSearch() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to do?",
      choices: [
        "Add...",
        "View...",
        "Modify...",
        "Exit"
      ]
    })
    .then(function (answer) {
      switch (answer.action) {
        case "Add...":
          addNew();
          break;

        case "View...":
          viewOld();
          break;

        case "Modify...":
          modifyOld();
          break;

        case "Exit":
          quit();
          break;
      }
    });
}
function quit() {
  console.log("Thanks for using my app! -CV");
  process.exit();
}
function addNew() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to add?",
      choices: [
        "New Department",
        "New Role",
        "New Employee",
        "Return to Main Menu"
      ]
    })
    .then(async function (answer) {
      await addElement(answer);
      runSearch();
    });
}

function viewOld() {
  inquirer
    .prompt({
      name: "action",
      type: "list",
      message: "What would you like to view?",
      choices: [
        "Departments",
        "Roles",
        "Employees",
        "Return to Main Menu"
      ]
    })
    .then(async function (answer) {

      await viewElement(answer);
      runSearch();

    });
}

function modifyOld() {
  inquirer
  .prompt({
    name: "action",
    type: "list",
    message: "What would you like to change?",
    choices: [
      "Employee Roles",
      "Return to Main Menu"
    ]
  })
  .then(async function (answer) {
    if (answer.action != "Employee Roles"){
      runSearch();
    } else {
    var modifyConnection = mysql.createConnection({
      multipleStatements: true,
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_DATABASE
    });

    modifyConnection.connect(function (err) {
      if (err) throw err;
    });
    employees = [];
    modifyConnection.query("SELECT * from employee", function (err, response) {
      if (err) throw err;
      for (let i = 0; i < response.length; i++) {
        let empEl = response[i].id + ". " + response[i].first_name + " " + response[i].last_name;
        employees.push(empEl);
      }
      inquirer.prompt([{
        type: "list",
        name: "employee",
        message: "Which employee would you like to change?",
        choices: employees
      }]).then(function (answer) {
        emp_Arr = answer.employee.split(". ");
        emp_Str = emp_Arr[0];
        emp_Int = parseInt(emp_Str);
        roles = [];
        modifyConnection.query("SELECT * from role", function (err, response) {
          for (let i = 0; i < response.length; i++) {
            let roleEl = response[i].id + ". " + response[i].title + " |  $" + response[i].salary;
            roles.push(roleEl);
          }
          return inquirer.prompt([{
            type: "list",
            name: "roles",
            message: `Select the role you would like to switch the employee to.`,
            choices: roles
          }]).then(function (answer) {
            role_Arr = answer.roles.split(". ");
            role_Str = role_Arr[0];
            role_Int = parseInt(role_Str);
            modifyConnection.query("UPDATE employee SET ? WHERE ?", [
              {
                role_id: role_Int
              },
              {
                id: emp_Int
              }
            ], function (err, response) {
              if (err) throw err;
              console.log("Role change complete!");
              runSearch();
            });

          });

        });
      });

    });
  }
});
}

module.exports = runSearch;
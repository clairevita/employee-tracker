var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
  
    // Your port; if not 3306
    port: 3306,
  
    // Your username
    user: "root",
  
    // Your password
    password: "",
    database: "employee_DB"
  });

  connection.connect(function(err) {
    if (err) throw err;
    runSearch();
  });

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
      .then(function(answer) {
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

        case "exit":
          connection.end();
          break;
        }
      });
  }

  function addNew(){
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
    .then(function(answer) {
      switch (answer.action) {
      case "New Department":
        // addNew();
        break;

      case "New Role":
        // viewOld();
        break;

      case "New Employee":
        // modifyOld();
        break;

      case "Return to Main Menu":
        runSearch();
        break;
      }
    });
  }

  function viewOld(){
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
      .then(function(answer) {
        switch (answer.action) {
        case "Departments":
        //   addNew();
          break;
  
        case "Roles":
        //   viewOld();
          break;
  
        case "Employees":
        //   modifyOld();
          break;

        case "Return to Main Menu":
          runSearch();
          break;
        }
      });
  }

  function modifyOld(){
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "What would you like to change?",
        choices: [
          "Employee Roles",
          "Exit"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "Employee Roles":
        //   addNew();
          break;
          
        case "exit":
          runSearch();
          break;
        }
      });
  }
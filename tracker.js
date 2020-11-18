var mysql = require("mysql");
var inquirer = require("inquirer");
var dotenv  = require("dotenv").config();


const addElement = require('./exports/addElement');

var connection = mysql.createConnection({
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
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
        addElement("New Department");
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
          "Return to Main Menu"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
        case "Employee Roles":
        //   addNew();
          break;

        case "Return to Main Menu":
          runSearch();
          break;
        }
      });
  }
var mysql = require("mysql");
var inquirer = require("inquirer");
var dotenv  = require("dotenv").config();


const addElement = require('./exports/addElement');
const viewElement = require('./exports/viewElement');
// const modifyElement = require('./exports/modifyElement');

var addConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE
});

addConnection.connect(function(err) {
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

        case "Exit":
          quit();
          break;
        }
      });
  }
  function quit(){
    console.log("Thanks for using my app! -CV");
    process.exit();
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
    .then(async function(answer) {
     await addElement(answer);
      runSearch();
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
      .then(async function(answer) {
        
          await viewElement(answer);
          runSearch();
        
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

  module.exports = runSearch;
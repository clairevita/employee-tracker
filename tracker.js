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

  }

  function viewOld(){

  }

  function modifyOld(){
      
  }
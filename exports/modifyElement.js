const mysql = require('mysql');
var dotenv = require("dotenv").config();
var inquirer = require("inquirer");
const cTable = require('console.table');
const runSearch = require('./../tracker');

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

 async function modifyElement(answer){
  selectDep();
 
  // selectDep();
  
}

function selectDep(){
  departments = [];
    modifyConnection.query("SELECT * from department", function(err, response)
    { 
      if (err) throw err;

      for (let i=0; i<response.length; i++){
        let depEl = response[i].id + ". " + response[i].name;
        departments.push(depEl);
      }
      inquirer.prompt([{
        type: "list",
        name: "department",
        message: "What department is the employee you want to change located?",
        choices: departments
      }]).then(function(answer){
        employeeSelect(answer);
      })
    });
}

function employeeSelect(department){
  modifyConnection.query("SELECT * from employee WHERE dep", function(err, response)
    { 

    });
    
}



module.exports = modifyElement;
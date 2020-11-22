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
  selectEmp();
 
  // selectDep();
  
}

function selectEmp(){
  employees = [];
    modifyConnection.query("SELECT * from employee", function(err, response)
    { 
      if (err) throw err;

      for (let i=0; i<response.length; i++){
        let empEl = response[i].id + ". " + response[i].name;
        employees.push(empEl);
      }
    return inquirer.prompt([{
        type: "list",
        name: "department",
        message: "Which employee would you like to change?",
        choices: employees
      }]).then(function(answer){
        selectRole(answer);
      })
    });
}

function selectRole(employee){
  emp_Arr = employee.dept.split(". ");
  emp_Str = emp_Arr[0];
  emp_Int = parseInt(emp_Str);
  roles = [];
  modifyConnection.query("SELECT * from role", function(err, response)
    { 
      for (let i=0; i<response.length; i++){
        let roleEl = response[i].id + ". " + response[i].name;
        roles.push(roleEl);
      }
     return inquirer.prompt([{
        type: "list",
        name: "employees",
        message: `Select the role you would like to switch ${emp_Arr[1]} to.`,
        choices: roles
      }]).then(function(answer){
        role_Arr = answer.dept.split(". ");
        role_Str = role_Arr[0];
        role_Int = parseInt(role_Str);
        


        modifyConnection.query("UPDATE employee SET ? WHERE ?", [
          {
            role_id: role_Int
          },
          {
            id: emp_Int
          }
        ])
      })
    });
    
}



module.exports = modifyElement;
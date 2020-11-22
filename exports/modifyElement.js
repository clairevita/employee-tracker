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
  await selectEmp();
  runSearch;
  
  
  
}

function selectEmp(){
  employees = [];
    modifyConnection.query("SELECT * from employee", function(err, response)
    { 
      if (err) throw err;
      for (let i=0; i<response.length; i++){
        let empEl = response[i].id + ". " + response[i].first_name + " " + response[i].last_name;
        employees.push(empEl);
      }
    return inquirer.prompt([{
        type: "list",
        name: "employee",
        message: "Which employee would you like to change?",
        choices: employees
      }]).then(function(answer){
        emp_Arr = answer.employee.split(". ");
        emp_Str = emp_Arr[0];
        emp_Int = parseInt(emp_Str);
        selectRole(emp_Int);
      })
    });
}

function selectRole(employee){
  roles = [];
  modifyConnection.query("SELECT * from role", function(err, response)
    { 
      for (let i=0; i<response.length; i++){
        let roleEl = response[i].id + ". " + response[i].title + " |  $" + response[i].salary;
        roles.push(roleEl);
      }
     return inquirer.prompt([{
        type: "list",
        name: "roles",
        message: `Select the role you would like to switch the employee to.`,
        choices: roles
      }]).then(function(answer){
        role_Arr = answer.roles.split(". ");
        role_Str = role_Arr[0];
        role_Int = parseInt(role_Str);
        


        modifyConnection.query("UPDATE employee SET ? WHERE ?", [
          {
            role_id: role_Int
          },
          {
            id: employee
          }
        ]);
        console.log(`${answer.title} has been created!`);
        
      });
      
    });
    
}



module.exports = modifyElement;
const mysql = require('mysql');
var dotenv = require("dotenv").config();
const cTable = require('console.table');
const runSearch = require('./../tracker');

var viewConnection = mysql.createConnection({
  multipleStatements: true,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE
});

viewConnection.connect(function (err) {
  if (err) throw err;
});

async function viewElement(what) {

  console.log(what)
  if (what.action == "Departments") {
    await viewDept();
    runSearch;
  } else if (what.action == "Roles") {
    await viewRole();
    runSearch;
  } else if (what.action == "Employees") {
    await viewEmplo();
    runSearch;
  }
};

async function viewDept(){
    await viewConnection.query("SELECT id AS ID, name AS Name from department", function(err, results)
      { 
        return console.table(
            `

            Press Any Key to Return to Menu
            `, results)
      });
}

async function viewRole(){
    await viewConnection.query("SELECT id AS ID, title AS Role, salary as Salary from role", function(err, results)
    { 
      return console.table(
          `

          Press Any Key to Return to Menu
          `, results)
    });
}

async function viewEmplo(){
    await viewConnection.query("SELECT id AS ID, first_name AS First_Name, last_name as Last_Name, role_id as Role_ID from employee", function(err, results)
    { 
      return console.table(
          `

          Press Any Key to Return to Menu
          `, results)
    });
}

module.exports = viewElement;
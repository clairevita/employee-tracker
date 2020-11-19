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

function viewDept(){
    return viewConnection.query("SELECT id AS ID, name AS Name from department", function(err, results)
      { 
        console.table("All Departments", results)
      });
}

function viewRole(){
    viewConnection.query("INSERT INTO role SET ?",
      {
        title: answer.title,
        salary: answer.salary,
        department_id: departmentid_Int
      });
    console.log(`${answer.title} has been created!`);
}

function viewEmplo(){
    viewConnection.query("INSERT INTO role SET ?",
      {
        title: answer.title,
        salary: answer.salary,
        department_id: departmentid_Int
      });
    console.table(`${answer.title} has been created!`);
}

module.exports = viewElement;
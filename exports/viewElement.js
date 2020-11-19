const mysql = require('mysql');
var inquirer = require("inquirer");
var dotenv = require("dotenv").config();

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



module.exports = viewElement;
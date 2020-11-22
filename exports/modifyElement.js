const mysql = require('mysql');
var dotenv = require("dotenv").config();
var inquirer = require("inquirer");

const runSearch = require('./../tracker.js');



function modifyElement(what) {
  
  console.log(what)
  if (what == "Employee Roles") {
    
  selectEmp();
   
  }
}
function selectEmp() {
  
}


module.exports = modifyElement;
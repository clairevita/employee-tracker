const mysql = require('mysql');
var inquirer = require("inquirer");
var dotenv = require("dotenv").config();

const runSearch = require('./../tracker');

var addConnection = mysql.createConnection({
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  user: process.env.DB_USER,
  password: process.env.DB_PASS,
  database: process.env.DB_DATABASE
});

addConnection.connect(function (err) {
  if (err) throw err;
});

async function addElement(what) {

  console.log(what)
  if (what.action == "New Department") {
    await addDept();
    runSearch;
  } else if (what.action == "New Role") {
    await addRole();

  } else if (what.action == "New Employee") {
    addEmplo();

  }
};

function addDept() {
  return inquirer.prompt([{
    type: "input",
    name: "dept",
    message: "What is the name of the Department you would like to add?"
  }]).then(function (answer) {
    addConnection.query("INSERT INTO department SET ?", { name: answer.dept });
    console.log(`${answer.dept} has been created!`);
  });
}

function addRole() {

  let departments = [];

  addConnection.query("SELECT * FROM department", function (err, response) {

    for (let i = 0; i < response.length; i++) {
      let deptEl = response[i].name;
      departments.push(deptEl);
    }
  });

  return inquirer.prompt([{
    type: "input",
    name: "title",
    message: "What is the title of the role you would like to add?"
  },
  {
    type: "input",
    name: "salary",
    message: "What will the salary be for this role?"
  },
  {
    type: "list",
    name: "dept",
    message: "Select a department this role will be placed into",
    choices: departments

  }
  ]).then(function (answer) {
    var departmentid = 0;
    for (let i = 0; i < departments.length; i++) {
      if (answer.dept == departments[i].name) {
        departmentid = departments[i].id;
      }
    }

    addConnection.query("INSERT INTO role SET ?",
      {
        title: answer.title,
        salary: answer.salary,
        department_id: departmentid
      });
    console.log(`${answer.title} has been created!`);

    runSearch;
  });
}

function addEmplo() {

}

module.exports = addElement;
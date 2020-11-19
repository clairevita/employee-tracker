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
    runSearch;
  } else if (what.action == "New Employee") {
    await addEmplo();
    runSearch;
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
      let deptEl = response[i].id + ". " + response[i].name;
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

    departmentid_Arr = answer.dept.split(". ");
    departmentid_Str = departmentid_Arr[0];
    departmentid_Int = parseInt(departmentid_Str);
    
    addConnection.query("INSERT INTO role SET ?",
      {
        title: answer.title,
        salary: answer.salary,
        department_id: departmentid_Int
      });
    console.log(`${answer.title} has been created!`);
  });
}

function addEmplo() {
  toPush = {};
  department = [];
  addConnection.query("SELECT * FROM department", function (err, response) {

    for (let i = 0; i < response.length; i++) {
      let deptEl = response[i].id + ". " + response[i].name;
      departments.push(deptEl);
    }
  });



  return inquirer.prompt([{
    type: "input",
    name: "first_name",
    message: "What is the employee's first name?"
  }, {
    type: "input",
    name: "last_name",
    message: "What is the employee's last name?"
  }, {
    type: "list",
    name: "dept",
    message: "Select the department the employee should be placed into",
    choices: department
  }
]).then(function (answer) {
    toPush = {
      first_name = answer.first_name,
      lat_name = answer.last_name,
      
    }


    role = [];
    addConnection.query("SELECT * FROM role", function (err, response) {
      for (let i = 0; i < response.length; i++) {
        let roleEl = response[i].id + ". " + response[i].title;
        departments.push(roleEl);
      }
    });

    inquirer.prompt([{
      type: "list",
      name: "role"
    }])
  
    
    console.log(`${answer.dept} has been created!`);
  });
}

module.exports = addElement;
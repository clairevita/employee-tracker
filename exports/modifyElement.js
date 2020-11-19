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

async function modifyElement(){
await modifyRole();
runSearch;
}

async function modifyRole(){
    await viewConnection.query("SELECT id AS ID, name AS Name from department", function(err, results)
    { 

    });
}

module.exports = modifyElement;
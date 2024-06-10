const fs = require('fs');
const inquirer = require('inquirer');
const pg = require('pg');
const express = require('express');

const { Pool } = require('pg');


const pool = new Pool(
    {
      user: 'postgres',
      password: 'shoeman',
      host: 'localhost',
      database: 'business_db',
      port: 5432,
    },
    console.log(`Connected to the business_db database.`)
  )
  
  pool.connect();

const options = [
    'View all departments', 'View all rows', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Exit'
  ]

const viewAllDepartments = async() => {
  const connect = await pool.connect();
  try {
    const res = await connect.query('SELECT name FROM department');
    console.table(res.rows);
  } catch (err) {
    console.log(err)
  } finally {
    connect.release();
  }
  };

inquirer.prompt(
  [{
    name: 'Options',
    message: 'Choose an option below:',
    type: "list",
    choices: options
  }
  ]
)
.then((answer) => {
  switch (answer.Options){
    case "View all departments":
      viewAllDepartments();
      break;
      default:
        console.log('Another option chosen');
  }
}
)
  
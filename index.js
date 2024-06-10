const fs = require('fs');
const inquirer = require('inquirer');
const pg = require('pg');
const express = require('express');

const { Pool } = require('pg');

const PORT = process.env.PORT || 5000;
const app = express();

const pool = new Pool(
    {
      user: 'postgres',
      password: 'shoeman',
      host: 'localhost',
      database: 'business_db'
    },
    console.log(`Connected to the movies_db database.`)
  )
  
  pool.connect();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });

  const options = [
    'View all departments', 'View all rows', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Exit'
  ]

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
  console.log(answer.Options)
}
)
  
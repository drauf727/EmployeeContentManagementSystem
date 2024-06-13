const fs = require('fs');
const inquirer = require('inquirer');
const pg = require('pg');

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
    'View all departments', 'View all roles', 'View all employees', 'Add a department', 'Add a role', 'Add an employee', 'Update an employee role', 'Exit'
  ]

  const connectDBView = async(command) => {
    const connect = await pool.connect();
    try {
      const res = await connect.query(command);
      console.table(res.rows);
      prompt();
    } catch (err) {
      console.log(err)
    } finally {
      connect.release();
    }
    };

    const connectDBEdit = async(command) => {
      const connect = await pool.connect();
      try {
        const res = await connect.query(command);
        console.log('Your request was successful');
        prompt();
      } catch (err) {
        console.log(err)
      } finally {
        connect.release();
      }
      };

const prompt = () => {
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
      connectDBView('SELECT * FROM department');
      break;
      case "View all roles":
        connectDBView('SELECT * FROM role');
        break;
        case "View all employees":
          connectDBView('SELECT * FROM employee');
          break;
          case "Add a department":
            inquirer.prompt([
              {
                name: 'department',
                message: "Department's name:",
                type: 'input'
              }
            ]).then((answer) =>{
              let command = `INSERT INTO department (name) VALUES ('${answer.department}')`;
              connectDBEdit(command);
            })
            break;
            case "Add a role":
              inquirer.prompt([
                {
                  name: 'title',
                  message: "Role's name:",
                  type: 'input'
                },
                {
                  name: 'salary',
                  message: "Enter salary",
                  type: 'input',
                },
                {
                  name: 'departmentid',
                  message: "Enter the department ID",
                  type: 'input',
                }
              ]).then((answer) =>{
                let command = `INSERT INTO role (title, salary, department_id) VALUES ('${answer.title}', ${answer.salary}, ${answer.departmentid})`;
                connectDBEdit(command);
              })
              break;
              case "Add an employee":
                inquirer.prompt([
                  {
                    name: 'firstname',
                    message: "Employee's first name:",
                    type: 'input'
                  },
                  {
                    name: 'lastname',
                    message: "Employee's last name:",
                    type: 'input'
                  },
                  {
                    name: 'roleid',
                    message: "Employee's role id:",
                    type: 'input'
                  },
                  {
                    name: 'managerid',
                    message: "Employee's manager id:",
                    type: 'input'
                  },
                ]).then((answer) =>{
                  let command = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ('${answer.firstname}', '${answer.lastname}', ${answer.roleid}, ${answer.managerid})`;
                  connectDBEdit(command);
                })
                break;
                case "Update an employee role":
                  inquirer.prompt([
                    {
                      name: 'employeeid',
                      message: "Enter employee id:",
                      type: 'input'
                    },
                    {
                      name: 'newrole',
                      message: "Enter new role id:",
                      type: 'input',
                    }
                  ]).then((answer) =>{
                    let command = `UPDATE employee SET role_id = ${answer.newrole} WHERE id = ${answer.employeeid} `;
                    connectDBEdit(command);
                  })
                  break;
      default:
        console.log('Press Ctrl C to exit');
  }
}
)
}

prompt();
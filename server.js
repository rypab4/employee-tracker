//requires
const { prompt } = require("inquirer");
const db = require("./db");
require("console.table");

//initialize
init();

// initial function at NPM start
function init() {
    runPrompts();
}

//Begin questions
function runPrompts() {
    prompt([
        {
            // Load these prompts on NPM start
            type: "list",
            name: "choice",
            message: "What would you like to do?",
            choices: [
                {
                    name: "View All Departments",
                    value: "VIEW_DEPARTMENTS"
                },
                {
                    name: "View All Roles",
                    value: "VIEW_ROLES"
                },
                {
                    name: "View All Employees",
                    value: "VIEW_EMPLOYEES"
                },

                {
                    name: "Add a Department",
                    value: "ADD_DEPARTMENT"
                },
                {
                    name: "Add a Role",
                    value: "ADD_ROLE"
                },
                {
                    name: "Add an Employee",
                    value: "ADD_EMPLOYEE"
                },
                {
                    name: "Update Employee Role",
                    value: "UPDATE_EMPLOYEE_ROLE"
                },
                {
                    name: "Quit",
                    value: "QUIT"
                }
            ]
        }

    ]).then(res => {
        let choice = res.choice;
        // Call the functions from what the user selects
        switch (choice) {
            case "VIEW_DEPARTMENTS":
                viewAllDepartments();
                break;
            case "VIEW_ROLES":
                viewAllRoles();
                break;
            case "VIEW_EMPLOYEES":
                viewAllEmployees();
                break;
            case "ADD_DEPARTMENT":
                createDepartment();
                break;
            case "ADD_ROLE":
                createRole();
                break;
            case "ADD_EMPLOYEE":
                createEmployee();
                break;
            case "UPDATE_EMPLOYEE_ROLE":
                updateEmployeeRole();
                break;
            default:
                quit();
        }
    }
    )
}


// View all employees
function viewAllEmployees() {
    db.allEmployees()
        .then(([rows]) => {
            let employees = rows;
            console.log("\n");
            console.table(employees);
        })
        .then(() => runPrompts());
}

// View all roles
function viewAllRoles() {
    db.allRoles()
        .then(([rows]) => {
            let roles = rows;
            console.log("\n");
            console.table(roles);
        })
        .then(() => runPrompts());
}

// View all deparments
function viewAllDepartments() {
    db.allDepartments()
        .then(([rows]) => {
            let departments = rows;
            console.log("\n");
            console.table(departments);
        })
        .then(() => runPrompts());
}

// Add a role
function createRole() {
    db.allDepartments()
        .then(([rows]) => {
            let departments = rows;
            const departmentChoices = departments.map(({ id, name }) => ({
                name: name,
                value: id
            }));

            prompt([
                {
                    name: "title",
                    message: "Enter the role: "
                },
                {
                    name: "salary",
                    message: "Enter the salary: "
                },
                {
                    type: "list",
                    name: "department_id",
                    message: "Enter department for the role: ",
                    choices: departmentChoices
                }
            ])
                .then(role => {
                    db.addRole(role)
                        .then(() => console.log(`Added ${role.title} to the database`))
                        .then(() => runPrompts())
                })
        })
}


// Add a department
function createDepartment() {
    prompt([
        {
            name: "name",
            message: "Enter department Name: "
        }
    ])
        .then(res => {
            let name = res;
            db.addDepartment(name)
                .then(() => console.log(`Added ${name.name} to the database`))
                .then(() => runPrompts())
        })
}

// Add an employee
function createEmployee() {
    prompt([
        {
            name: "first_name",
            message: "Employee's first name: "
        },
        {
            name: "last_name",
            message: "Employee's last name: "
        }
    ])
        .then(res => {
            let firstName = res.first_name;
            let lastName = res.last_name;

            db.allRoles()
                .then(([rows]) => {
                    let roles = rows;
                    const roleChoices = roles.map(({ id, title }) => ({
                        name: title,
                        value: id
                    }));

                    prompt({
                        type: "list",
                        name: "roleId",
                        message: "Employee's role: ",
                        choices: roleChoices
                    })
                        .then(res => {
                            let roleId = res.roleId;

                            db.allEmployees()
                                .then(([rows]) => {
                                    let employees = rows;
                                    const managerChoices = employees.map(({ id, first_name, last_name }) => ({
                                        name: `${first_name} ${last_name}`,
                                        value: id
                                    }));

                                    managerChoices.unshift({ name: "None", value: null });

                                    prompt({
                                        type: "list",
                                        name: "managerId",
                                        message: "Employee's manager ",
                                        choices: managerChoices
                                    })
                                        .then(res => {
                                            let employee = {
                                                manager_id: res.managerId,
                                                role_id: roleId,
                                                first_name: firstName,
                                                last_name: lastName
                                            }

                                            db.addEmployee(employee);
                                        })
                                        .then(() => console.log(
                                            `Added ${firstName} ${lastName} to the database`
                                        ))
                                        .then(() => runPrompts())
                                })
                        })
                })
        })
}



// Update an employee's role
function updateEmployeeRole() {
    db.allEmployees()
        .then(([rows]) => {
            let employees = rows;
            const employeeChoices = employees.map(({ id, first_name, last_name }) => ({
                name: `${first_name} ${last_name}`,
                value: id
            }));

            prompt([
                {
                    type: "list",
                    name: "employeeId",
                    message: "Which employee's role do you want to update?",
                    choices: employeeChoices
                }
            ])
                .then(res => {
                    let employeeId = res.employeeId;
                    db.allRoles()
                        .then(([rows]) => {
                            let roles = rows;
                            const roleChoices = roles.map(({ id, title }) => ({
                                name: title,
                                value: id
                            }));

                            prompt([
                                {
                                    type: "list",
                                    name: "roleId",
                                    message: "Employee's new role: ",
                                    choices: roleChoices
                                }
                            ])
                                .then(res => db.updateEmployeeRole(employeeId, res.roleId))
                                .then(() => console.log("Employee's role is updated"))
                                .then(() => runPrompts())
                        });
                });
        })
}
// Quit the application
function quit() {
    process.exit();
}
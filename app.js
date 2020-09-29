const Manager = require("./lib/Manager");
const Engineer = require("./lib/Engineer");
const Intern = require("./lib/Intern");
const inquirer = require("inquirer");
const path = require("path");
const fs = require("fs");

const OUTPUT_DIR = path.resolve(__dirname, "output");
const outputPath = path.join(OUTPUT_DIR, "team.html");

const render = require("./lib/htmlRenderer");
const { report } = require("process");
const { ADDRGETNETWORKPARAMS } = require("dns");


// Write code to use inquirer to gather information about the development team members,
// and to create objects for each team member (using the correct classes as blueprints!)

const employeeList = [];

function employeePrompt() {
    return inquirer.prompt([
        {
            type: "input",
            message: "What is your name?",
            name: "name"
        },
        {
            type: "input",
            message: "What is your ID number?",
            name: "id"
        },
        {
            type: "input",
            message: "What is your email address?",
            name: "email"
        },
        {
            type: "list",
            message: "What is your role?",
            name: "role",
            choices: [
                "Manager",
                "Engineer",
                "Intern"
            ]
        },
        {
            type: "input",
            message: "What is your office number?",
            name: "officeNumber",
            when: (responses) => responses.role === "Manager"
        },
        {
            type: "input",
            message: "What is your GitHub username?",
            name: "gitHub",
            when: (responses) => responses.role === "Engineer"
        },
        {
            type: "input",
            message: "What school are you studying at?",
            name: "school",
            when: (responses) => responses.role === "Intern"
        }
    ])
    .then((responses) => {
        console.log(responses);
        if (responses.role === "Manager") {
            employeeList.push(
                new Manager(
                    responses.name,
                    responses.id,
                    responses.email,
                    responses.role,
                    responses.officeNumber
                )
            )
            console.log("New Manager successfully added to the team.")
        } else if (responses.role === "Engineer") {
            employeeList.push(
                new Engineer(
                    responses.name,
                    responses.id,
                    responses.email,
                    responses.role,
                    responses.gitHub
                )
            )
            console.log("New Engineer successfully added to the team.")
        } else if (responses.role === "Intern") {
            employeeList.push(
                new Intern(
                    response.name,
                    responses.id,
                    responses.email,
                    responses.role,
                    responses.school
                )
            )
            console.log("New Intern successfully added to the team.")
        }
        console.log(employeeList);
        addNewEmployee();
    })
};

function addNewEmployee() {
    return inquirer.prompt([
        {
            type: "confirm",
            message: "Do you want to add a new employee?",
            name: "addNewEmployee"
        }
    ])
    .then((confirm) => {
        if (confirm.addNewEmployee) {
            employeePrompt();
        }
    })
}

employeePrompt();

// After the user has input all employees desired, call the `render` function (required
// above) and pass in an array containing all employee objects; the `render` function will
// generate and return a block of HTML including templated divs for each employee!

// After you have your html, you're now ready to create an HTML file using the HTML
// returned from the `render` function. Now write it to a file named `team.html` in the
// `output` folder. You can use the variable `outputPath` above target this location.
// Hint: you may need to check if the `output` folder exists and create it if it
// does not.

// HINT: each employee type (manager, engineer, or intern) has slightly different
// information; write your code to ask different questions via inquirer depending on
// employee type.

// HINT: make sure to build out your classes first! Remember that your Manager, Engineer,
// and Intern classes should all extend from a class named Employee; see the directions
// for further information. Be sure to test out each class and verify it generates an
// object with the correct structure and methods. This structure will be crucial in order
// for the provided `render` function to work! ```

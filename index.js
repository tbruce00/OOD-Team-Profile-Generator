const Employee = require('./lib/Employee');
const Manager = require ('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const path = require('path');
const fs = require('fs');
const inquirer = require('inquirer');

const teamMembers = [];
const idArray = [];
const output = path.resolve(__dirname, "output");
const outputPath = path.join(output, "index.html"); 
const genHTML = require('./src/template');


// series of prompts for each type of team member
const init = () => {
    getManager();
    


// will also need switch case to ask questions based on which team member they choose
function getManager(){
    console.log("Please continue to build your team");
    inquirer.prompt([
        {
            name:"managerName",
            type: "input",
            message:"What is the manager's name",
            validate: answer => {
                if (answer !== '') {
                    return true;
                }
                return "Please enter the team manager's name";
            }
        },
        {
            name: "managerId",
            type: "input",
            message:"What is your Id",
            validate: answer => {
                const pass = answer.match(
                    /^[1-9]\d*$/
                );
                if (pass) {
                    return true;
                }
                return "Please enter a number greater than 0.";
            }
        },
        {
            name: "managerEmail",
            type:"input",
            message:"What is your E-mail?",
            validate: answer => {
                const pass = answer.match(
                    /\S+@\S+\.\S+/
                );
                if (pass) {
                    return true;
                }
                return "Please enter a valid email address.";
            }
        },
        {
            name:"managerofficeNumber",
            type:"input",
            message:"What is the manager's office number?",
            validate: answer => {
                const pass = answer.match(
                    /^[1-9]\d*$/
                );
                if (pass) {
                    return true;
                }
                return "Please enter a number greater than 0.";
            }
        }
    ]).then(answers => {
        const manager = new Manager(
            answers.managerName,
            answers.managerId,
            answers.managerEmail,
            answers.managerofficeNumber,
        )
        teamMembers.push(manager);
        idArray.push(answers.managerId);
        makeTeam();
    });
}

function makeTeam() {
    inquirer.prompt([
        {
            name:"chooseMember",
            type:"list",
            message:"What type of team member would you like to add?",
            choices: [
                "Engineer",
                "Intern",
                "I don't need to add any more team members"
            ]
        }
    ]).then(userChoice => {
        switch(userChoice.chooseMember){
            case "Engineer":
                addEngineer();
                break;
            case "Intern":
                addIntern();
                break;
                default:
                createTeam();    
        }
    });
}

function addEngineer() {
    inquirer.prompt([
        {
            name: "engineerName",
            type:"Input",
            message:"What is your engineer's name?",
        },
        {
            name:"engineerId",
            type:"input",
            message:"What is the engineer's ID number?",
        },
        {
            name:"engineerEmail",
            type:"input",
            message:"What is the engineer's E-mail address?",
        },
        {
            name:"engineerGithub",
            type:"input",
            message:"What is the engineer's github username?",
        },
    ]).then(answers => {
        const engineer = new Engineer(
            answers.engineerName,
            answers.engineerId,
            answers.engineerEmail,
            answers.engineerGithub, 
            );
            teamMembers.push(engineer);
            idArray.push(answers.engineerId);
            makeTeam();
    })
};

function addIntern() {
    inquirer.prompt([
        {
            name:"internName",
            type:"input",
            message:"What is your intern's name?"
        },
        {
            name:"internId",
            type:"input",
            message:"What is the intern's ID number?"
        },
        {
            name:"internEmail",
            type:"input",
            message:"What is the intern's E-mail address?"
        },
        {
            name:"internSchool",
            type:"input",
            message:"What school is the intern attending?"
        },
    ]).then(answers => {
        const intern = new Intern(
            answers.internName,
            answers.internId,
            answers.internEmail,
            answers.internSchool
        );
        teamMembers.push(intern);
        idArray.push(answers.internId);
        makeTeam();
    });
}
};

const createTeam = () => {
    fs.writeFileSync(outputPath, genHTML(teamMembers));
}

init();
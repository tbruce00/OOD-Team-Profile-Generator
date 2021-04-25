const Manager = require ('./lib/Manager');
const Engineer = require('./lib/Engineer');
const Intern = require('./lib/Intern');
const Inquirer = require('inquirer');
const path = require('path');
const fs = require('fs');
const util = require('util');
const inquirer = require('inquirer');
const output = path.resolve(__dirname, "dist");
const outputPath = path.join(output, "index.html");


// series of prompts for each type of team member
const questions = []

// will also need switch case to ask questions based on which team member they choose
function getManager(){
    inquirer.prompt([
        {
            name:"managerName",
            type: "input",
            message:"What is the manager's name",
            validate: answer => {
                const pass = answer.match(
                    /\S+@\S+\.\S+/
                );
                if (pass) {
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
            message:"What is the engineer's E-mail address?,
        },
        {
            name:"engineerGithub",
            type:"input",
            message:"What is the engineer's github username?",
        }
    ])
}

const inquirer = require('inquirer');
// const fs = require ("fs");
// const generatePage = require("./src/page-template.js");

// const pageHTML = generatePage(userName,github);


// fs.writeFile('./index.html',pageHTML, err => {
//     if (err) throw err;
//     console.log("Portfolio complete! check the index.html to see output");
// });

    

const promptUser = () => {
    return inquirer
    .prompt ([
        {
            type: "input",
            name: "name",
            message: "What is your name? (required)",
            validate: nameInput => {
                if (nameInput) {
                    return true;
                }
                else 
                {
                    console.log("please enter your name!");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "github",
            message: "What is your Github Username? (reuired)",
            validate: input => {
                if (input) {
                    return true;
                }
                else 
                {
                    console.log("please enter your username!");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "about",
            message: "Please provide some information about yourself"
        }
    ]);
};

const promptProjects = portfolioData => {

    

    if (!portfolioData.projects) {
        portfolioData.projects = [];
    };

    console.log(`
    =================
    Add a New Project
    =================
    `);
    return inquirer.prompt([
        {
            type: "input",
            name: "name",
            message: "What is the name of your project? (required)",
            validate: input => {
                if (input) {
                    return true;
                }
                else 
                {
                    console.log("please enter your project name!");
                    return false;
                }
            }
        },
        {
            type: "input",
            name: "description",
            message: "Provide a description for your project (required)",
            validate: input => {
                if (input) {
                    return true;
                }
                else 
                {
                    console.log("please enter your projects description!");
                    return false;
                }
            }
        },
        {
            type: "checkbox",
            name: "languages",
            message: "What did you build it with?",
            choices: ["JavaScript","HTML","CSS","ES6","jQuerry", "Bootstrap","Node"]
        },
        {
            type: "input",
            name: "link",
            message: "Enter github URL (required)",
            validate: input => {
                if (input) {
                    return true;
                }
                else 
                {
                    console.log("please enter URL!");
                    return false;
                }
            }
        },
        {
            type: "confirm",
            name: "feature",
            message: "Would you like to feature this project?",
            default: false
        },
        {
            type: "confirm",
            name: "confirmAddProject",
            message: "Would you like to enter another project?",
            default: false
        }
    ]).then(projectData => {
        portfolioData.projects.push(projectData);
        if (projectData.confirmAddProject) {
            return promptProjects(portfolioData);
        }
        else
        {
            return portfolioData;
        }
    });
};

promptUser()
            .then(promptProjects)
            .then(portfolioData => {
                console.log(portfolioData);
            });
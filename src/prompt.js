'use strict'

const inquirer    = require('inquirer');
const lib         = require('../src');
const nodes       = require('./nodes.js')

const self = module.exports = {
    ask: branch => {
        inquirer.prompt([
        {
            type: 'list',
            message: 'What do you want to do?',
            name: 'importer',
            choices: [
                {
                    name: 'Prepare Zoo data',
                    value: 'zoo-prepare'
                },
                {
                    name: 'Setup Cloud CMS in order to import Zoo items',
                    value: 'zoo-setup',
                    checked: true
                },
                {
                    name: 'Zoo Import Content',
                    value: 'zoo-content'
                },
                {
                    name: 'Zoo Remove imported content',
                    value: 'zoo-teardown-content'
                },
                {
                    name: 'Zoo Remove Importer Setup',
                    value: 'zoo-teardown-setup'
                }
            ],
            validate: answer => {
            if (answer.length < 1) {
                return 'You must choose at least one answer.';
            }
            return true;
            }
        }
        ]).then(answers => {
            if (answers.importer === 'zoo-prepare'){
                lib.Prepare.process();
            }

            if (['zoo-setup', 'zoo-content'].indexOf(answers.importer) !== -1){
                lib.Setup.setup(branch, nodes[answers.importer.split('-')[1]])
            }

            if (answers.importer.split('-')[1] === 'teardown'){
                lib.Teardown(branch, nodes[answers.importer.split('-')[2]]);
            }
        });
    }
} 
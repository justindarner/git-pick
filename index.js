const path = require('path');
const _ = require('lodash');
const async = require('async');
const inquirer = require('inquirer');
const simpleGit = require('simple-git')(process.cwd());

async.autoInject({
  git: (callback) => {
    simpleGit.branchLocal(callback)
  },
  pick: (git, callback) => {
    debugger;
    const choices = _.values(git.branches).map((branch) => branch.current ? `* ${branch.name}` : branch.name);
    inquirer.prompt({
      name: 'branch',
      type: 'list',
      message: 'Pick Branch',
      choices,
    }).then(({ branch }) => callback(undefined, branch));
  },
  switch: (pick, callback) => {
    if (pick.indexOf('*') === 0) {
      process.exit(0);
    }
    simpleGit.checkout(pick, callback);
  }
})

"use strict"
const inquirer = require('inquirer');
const fs = require('fs');
const _ = require('underscore');

function createWithModel(callback) {
  let models = fs.readdirSync('./models');
  let templateString = "";

  function findVarNameInTpl(tplString) {
      let re = /<%=(.+?)%>/g;
      let str = tplString;
      let m;
      let results = [];

      while ((m = re.exec(str)) !== null) {
          if (m.index === re.lastIndex) {
              re.lastIndex++;
          }
          let varToInsert = m[1].replace(/\s/g, '');
          if(results.indexOf(varToInsert) == -1) results.push(varToInsert);
      }
      return results;
  }

  const choseModel = [{
      type: 'list',
      name: 'model',
      message: 'Quel model à utiliser ?',
      choices: models
  }];

  inquirer.prompt(choseModel)
    .then((answser)=> {
      templateString = fs.readFileSync('./models/'+answser.model, 'UTF-8');
      let tplVarNames = findVarNameInTpl(templateString);
      let varTplQuestions = [];
      for (var i = 0; i < tplVarNames.length; i++) {
        varTplQuestions.push({
          type: 'input',
          name: tplVarNames[i],
          message: `Entrez la valeur pour "${tplVarNames[i]}"`
        });
      }
      return inquirer.prompt(varTplQuestions);
    })
    .then((answer)=>{
      let compiled = _.template(templateString);
      callback(compiled(answer))
    });
}

module.exports.createWithModel = createWithModel;

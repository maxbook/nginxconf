"use strict"
const inquirer = require('inquirer');
const fs = require('fs');
const _ = require('underscore');
const path = require('path');

function createWithModel(callback) {
  let modelsPath = path.join(__dirname, '../lib/models');
  console.log('Models .conf folder : '+modelsPath);
  let models = fs.readdirSync(modelsPath);
  let templateString = "";
  let filename = '';

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

  function getName() {
    const questionName = [{
        type: 'input',
        name: 'filename',
        message: '.conf file name'
    }];
    return inquirer.prompt(questionName);
  }

  function getModel(questionName) {
    filename = questionName.filename;
    const choseModel = [{
        type: 'list',
        name: 'model',
        message: 'Choose model to use',
        choices: models
    }];
    return inquirer.prompt(choseModel);
  }

  function getVarTpl(answserModel) {
    templateString = fs.readFileSync(path.join(__dirname, '../lib/models/'+answserModel.model), 'UTF-8');
    let tplVarNames = findVarNameInTpl(templateString);
    let varTplQuestions = [];
    for (var i = 0; i < tplVarNames.length; i++) {
      varTplQuestions.push({
        type: 'input',
        name: tplVarNames[i],
        message: `Value for "${tplVarNames[i]}"`
      });
    }
    return inquirer.prompt(varTplQuestions);
  }

  getName()
    .then((questionName)=>getModel(questionName))
    .then((answserModel)=>getVarTpl(answserModel))
    .then((answer)=>{
      let compiled = _.template(templateString);
      callback(filename, compiled(answer))
    });

}

module.exports.createWithModel = createWithModel;

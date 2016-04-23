"use strict"
const inquirer = require('inquirer');
const fs = require('fs');
const ncp = require('nginx-config-parser');
const _ = require('underscore');

const model = require('./libs/model.js');

let serveurs_config = require('./serveurs.conf.json');

model.createWithModel(function(compiledModel) {
  console.log(compiledModel);
});

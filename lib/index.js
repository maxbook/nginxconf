#!/usr/bin/env node
"use strict"
const inquirer = require('inquirer');
const fs = require('fs');
const _ = require('underscore');
const exec = require('child_process').exec;
const path = require('path');
const config = {
  siteAvailablePath : '/etc/nginx/site-available',
  siteEnablePath : '/etc/nginx/site-enable'
}

const model = require(path.join('../lib/model.js'));

model.createWithModel(function(filename,compiledModel) {
  let siteAvaiblePath = `${config.siteAvailablePath}/${filename}.conf`;
  let siteEnablePath = `${config.siteEnablePath}/${filename}.conf`;

  fs.writeFile(siteAvaiblePath, compiledModel, function(err) {
    if (err) throw err;
    exec(`ln -s ${siteAvaiblePath} ${siteEnablePath} && service nginx reload`, function(err, stdout, stderr) {
      if (err) throw err;
      console.log('Configuration activée avec succes !');
    });
  });
});

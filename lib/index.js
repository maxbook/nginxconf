#!/usr/bin/env node
"use strict"
const inquirer = require('inquirer');
const fs = require('fs');
const _ = require('underscore');
const exec = require('child_process').exec;
const path = require('path');
const config = {
  sitesAvailablePath : '/etc/nginx/sites-available',
  sitesEnabledPath : '/etc/nginx/sites-enabled'
}

const model = require(path.join('../lib/model.js'));

model.createWithModel(function(filename,compiledModel) {
  let sitesAvaiblePath = `${config.sitesAvailablePath}/${filename}.conf`;
  let sitesEnabledPath = `${config.sitesEnabledPath}/${filename}.conf`;

  fs.writeFile(sitesAvaiblePath, compiledModel, function(err) {
    if (err) throw err;
    exec(`ln -s ${sitesAvaiblePath} ${sitesEnabledPath} && service nginx reload`, function(err, stdout, stderr) {
      if (err) throw err;
      console.log(`Configuration create && nginx reload with success !
        sites-avaible => ${sitesAvaiblePath}
        sites-enabled => ${sitesEnabledPath}`);
    });
  });
});

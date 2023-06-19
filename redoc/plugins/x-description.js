var path = require('path');
var fs = require('fs');
var basedir = 'spec/';

module.exports = {
  pathExpression: '$..["x-description"]',
  init: function (_swagger, options) {
    if (options.verbose) {
      console.log('* x-description plugin: ');
    }
  },
  process: function (parent, name, jsonpath, swagger) {
    var value = parent[name];
    var descDir = basedir + 'descriptions/';
    var res = null;
    if (dirExist(descDir)) {
      var fileName = descDir + value + '.md';
      if (fileExist(fileName)) {
        delete parent['description'];
        var description = fs.readFileSync(fileName, 'utf-8');
        if (!isStringEmpty(description)) {
          parent.description = description;
        }
      } else {
        try {
          fs.writeFileSync(fileName,'');
          console.error("file not exist and created, please commit to git: " + fileName);
        } catch (e) {
          console.log("Cannot write file " + fileName, e);
        }
      }
    }
    delete parent[name];
  },
  finish: function (swagger) {
  },
}
function isStringEmpty(string) {
  return (string.length === 0 || !string.trim());
}
function fileExist(file) {
  try {
    return fs.statSync(file).isFile();
  } catch (err) {
    if (err && err.code === 'ENOENT') {
      return false;
    }
    throw err;
  }
}

function dirExist(path) {
  try {
    return fs.statSync(path).isDirectory();
  } catch (err) {
    if (err && err.code === 'ENOENT') {
      return false;
    }
    throw err;
  }
}
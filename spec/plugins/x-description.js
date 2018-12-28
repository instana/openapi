var jpointer = require('json-pointer');
var mergePatch = require('json-merge-patch');
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
        var descrition = fs.readFileSync(fileName, 'utf-8');
        parent.description = descrition;
      } else {
        console.error("file not exist: " + fileName);
      }
    }
    delete parent[name];
  },
  finish: function (swagger) {
  },
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
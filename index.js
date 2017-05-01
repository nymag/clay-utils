'use strict';

const glob = require('glob'),
  path = require('path');

var req = require;

/**
 * @param {function} value
 */
function setRequire(value) {
  req = value;
}

// filter out tests from globbed files
function noTests(filename) {
  return filename.indexOf('.test.js') === -1;
}


// require each index.js file from each util folder
function requireUtils() {
  const utils = glob.sync(path.resolve(__dirname, 'lib', '**', '*.js')).filter(noTests);

  utils.forEach(function (util) {
    if (path.basename(path.dirname(util)) !== 'lib') {
      module.exports[path.basename(path.dirname(util))] = req(path.resolve(__dirname, 'lib', path.basename(path.dirname(util), '.js'), 'index'));
    }
  });
}

requireUtils();
module.exports.requireUtils = requireUtils;

// for testing
module.exports.setRequire = setRequire;

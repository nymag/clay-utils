'use strict';

const nymagfs = require('nymag-fs'),
  path = require('path');

var req = require;

/**
 * @param {function} value
 */
function setRequire(value) {
  req = value;
}

// require each index.js file from each util folder
module.exports.requireUtils = function () {
  const utils = nymagfs.getFolders('lib');

  utils.forEach(function (util) {
    module.exports[util] = req(path.resolve(__dirname, 'lib', util, 'index.js'));
  });
};

// for testing
module.exports.setRequire = setRequire;

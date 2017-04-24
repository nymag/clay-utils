'use strict';

module.exports.getComponentInstance = require('./lib/getComponentInstance/getComponentInstance');
module.exports.getComponentName = require('./lib/getComponentName/getComponentName');
module.exports.getComponentVersion = require('./lib/getComponentVersion/getComponentVersion');
module.exports.isComponent = require('./lib/isComponent/isComponent');
module.exports.isDefaultComponent = require('./lib/isDefaultComponent/isDefaultComponent');
module.exports.replaceVersion = require('./lib/replaceVersion/replaceVersion');

// const glob = require('glob'),
//   path = require('path');


// // filter out tests from globbed files
// function noTests(filename) {
//   return filename.indexOf('.test.js') === -1;
// }

// module.exports = function () {
//   const utils = glob.sync(path.resolve(__dirname, 'lib', '**', '*.js')).filter(noTests);

//   // ['filea.js', 'fileb.js'];

//   utils.forEach(function (util) {
//     module.exports[util] = require(util);
//   });
// };

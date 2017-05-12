'use strict';

const nymagfs = require('nymag-fs'),
  hbs = require('handlebars'),
  _ = require('lodash'),
  path = require('path'),
  fs = require('fs'),
  chalk = require('chalk');

let tpl, data = {};

function reduceUtils(result, util) {
  const utils = nymagfs.getFolders('lib');

  if (path.extname(util) === '') {
    result.push({
      name: path.basename(util)
    });
  }

  return result;
}
// register utilDoc as a partial to use in repo-readme.hbs
_.each([
  'utilDoc'
], function (basename) {
  hbs.registerPartial(basename, require(`./${basename}.hbs`));
});

data = {
  utils: _.reduce(fs.readdirSync(path.join(__dirname, '..', 'lib')), reduceUtils, [])
};

// compile the template and run it
tpl = hbs.compile(fs.readFileSync(path.join(__dirname, 'repo-readme.hbs'), 'utf8'));
fs.writeFileSync(path.join(__dirname, '..', 'README.md'), tpl(data));
console.log(`${chalk.green('[DONE]')} Generated repo README`);

'use strict';

const nymagfs = require('nymag-fs'),
  hbs = require('handlebars'),
  _ = require('lodash'),
  path = require('path'),
  fs = require('fs'),
  doc = require('documentation'),
  glob = require('glob'),
  chalk = require('chalk');

let tpl, data = {};

function noTests(filename) {
  return filename.indexOf('.test.js') === -1;
}

/**
 * Parse jsdoc descriptions for code blocks and such
 * @param  {object} block
 * @return {string}
 */
function parseDoc(block) {
  if (block.type === 'inlineCode') {
    return '`' + block.value + '`';
  } else if (block.type === 'emphasis') {
    return `_${block.children.map(parseDoc).join(' ')}_`;
  } else if (block.type === 'text') {
    return block.value;
  } else if (block.type === 'link') {
    return `[${block.children.map(parseDoc).join(' ')}](${block.url})`;
  } else {
    // you should tell a dev, because we don't know what we're dealing with here
    throw new Error(`Unknown text block type "${block.type}"!`);
  }
}

/**
 * Parse JSDoc types
 * @param  {object} obj
 * @return {string}
 */
function parseType(obj) {
  if (obj.type === 'NameExpression') {
    // {array}, {string}, {object}, etc
    return obj.name;
  } else if (obj.type === 'AllLiteral') {
    // {*}
    return '*';
  } else if (obj.type === 'OptionalType') {
    // we don't care if something is optional (in this function)
    return parseType(obj.expression);
  } else if (obj.type === 'UnionType') {
    // {string|array}, etc
    return _.map(obj.elements, (el) => parseType(el)).join('|');
  } else {
    // you should tell a dev, because we don't know what we're dealing with here
    throw new Error(`Unknown param type "${obj.type}"!`);
  }
}

function generateDoc(util) {
  const rawDoc = _.find(doc.buildSync([util], { shallow: true }), function (section) {
    // grab the jsdoc for the exported function
    // note: you must do `module.exports = function () {}`,
    // rather than declaring a named function above and referencing it
    // from module.exports
    return section.namespace === path.basename(util, '.js');
  });

  // console.log(rawDoc)
  // console.log(util)
  if (!_.isEmpty(rawDoc)) {
    let desc = _.get(rawDoc, 'description.children[0].children') || [],
      ret = _.get(rawDoc, 'returns[0].description.children[0].children') || [],
      returnType = _.get(rawDoc, 'returns[0].type.name'),
      description = desc.map(parseDoc).join(' ').replace(/\n/g, '<br />'),
      params = _.map(rawDoc.params, function (param) {
        let desc = _.get(param, 'description.children[0].children') || [];

        return {
          name: param.name,
          type: parseType(param.type),
          isOptional: _.get(param, 'type.type') === 'OptionalType',
          description: desc.map(parseDoc).join(' ')
        };
      }),
      returnValue = ret.map(parseDoc).join(' ');

    return {
      description,
      params,
      returnValue,
      returnType
    };
  } else {
    return {};
  }
}

/**
 * Get data for util.
 * @return {function}
 */
function reduceUtils() {
  return function (result, util) {
    // helperDoc contains description, params, and returnValue
    // module.exports.example contains code and result
    const utilDoc = generateDoc(util),
      info = _.assign({
        name: path.basename(util, '.js'),
        hasTestFile: fs.existsSync(util.replace('.js', '.test.js'))
      }, utilDoc, require(util).example || {});

    result.push(info);
    return result;
  };
}

// register utilDoc as a partial to use in repo-readme.hbs
// _.each([
//   'utilDocumentation'
// ], function (basename) {
//   hbs.registerPartial(basename, require(`./${basename}.hbs`));
// });

// data = {
//   utils: _.reduce(fs.readdirSync(path.join(__dirname, '..', 'lib')), reduceUtils, [])
// };
data = {
  util: _.reduce(path.join(__dirname, '..', 'lib', 'getComponentInstance'), reduceUtils, [])
};

// console.log(fs.readdirSync(path.join(__dirname, '..', 'lib')))
// console.log(data)
console.log(path.join(__dirname, '..', 'lib'))

// // compile the template and run it
tpl = hbs.compile(fs.readFileSync(path.join(__dirname, 'util-readme.hbs'), 'utf8'));
fs.writeFileSync(path.join(__dirname, '..', 'lib', 'getComponentInstance', 'README.md'), tpl(data));
// console.log(`${chalk.green('[DONE]')} Generated readme`);

// var utils = nymagfs.getFolders(path.resolve('lib'))
// console.log(nymagfs.getFolders(path.resolve('lib')))
// _.forEach(utils, function (util) {
//   console.log(util)
  // data = {
  //   util: _.reduce(path.join(__dirname, '..', 'lib', util), reduceUtils, [])
  // };
//   console.log(data)

//   tpl = hbs.compile(fs.readFileSync(path.join(__dirname, 'util-readme.hbs'), 'utf8'))
//   fs.writeFileSync(path.join(__dirname, '..', 'lib', util, 'README.md'), tpl(data))
//   console.log(path.join(__dirname, '..', 'lib', util, 'README.md'))
// });

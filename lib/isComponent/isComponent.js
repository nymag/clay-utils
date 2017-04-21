'use strict';

var _includes = require('lodash/includes');

/**
 * Determine if a uri points to a component
 * @param  {string}  uri
 * @return {Boolean}
 */
module.exports = function (uri) {
  return _includes(uri, '/components/');
}

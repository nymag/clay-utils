'use strict';

/**
 * First test if argument is a String. If true, test if '/components/' is in the string. 
 * Otherwise, throw an error.
 * @param  {string}  uri
 * @return {Boolean}
 */
module.exports = function (uri) {
  if (typeof uri === 'string') {
    return uri.toLowerCase().indexOf('/components/') >= 0;
  } else {
    throw new Error('Argument passed in is not a String');
  }
}

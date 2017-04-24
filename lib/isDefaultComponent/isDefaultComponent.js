'use strict';

/**
 * First test if argument passed in is a String. If true, determine if a uri points 
 * to a DEFAULT instance of a component. Otherwise, throw an error.
 * 
 * @param  {string}  uri
 * @return {Boolean}
 */
module.exports = function (uri) {
  if (typeof uri === 'string') {
    return !!uri.match(/\/components\/[A-Za-z0-9\-]+$/);
  } else {
    throw new Error ('Argument passed in is not a String');
  }
}

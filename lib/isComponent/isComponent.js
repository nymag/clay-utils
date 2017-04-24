'use strict';

/**
 * Determine if a uri points to a component
 * @param  {string}  uri
 * @return {Boolean}
 */
module.exports = function (uri) {
  if (typeof uri === 'string') {
    if (uri.toLowerCase().indexOf('/components/') >= 0) {
      return true;
    } else {
      return false;
    }
  }
}

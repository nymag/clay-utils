'use strict';

/**
 * First test if the argument passed in is a String. If true, get component version from uri.
 * Otherwise throw an error.
 * @example /components/foo/instances/bar@published returns published
 * @param  {string} uri
 * @return {string|null}
 */
module.exports = function (uri) {
  if (typeof uri === 'string') {
    const result = /\/components\/.+?@(.+)/.exec(uri);

    return result && result[1];
  } else {
    throw new Error('Argument passed in is not a String');
  }
}

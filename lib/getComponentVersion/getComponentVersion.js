'use strict';

/**
 * get component version from uri
 * @example /components/foo/instances/bar@published returns published
 * @param  {string} uri
 * @return {string|null}
 */
module.exports = function (uri) {
  const result = /\/components\/.+?@(.+)/.exec(uri);

  return result && result[1];
}

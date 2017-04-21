'use strict';

/**
 * get component instance from uri
 * @param  {string} uri
 * @return {string|null}
 */
module.exports = function (uri) {
  const result = /\/components\/.+?\/instances\/([^\.@]+)/.exec(uri);

  return result && result[1];
}

'use strict';

/**
 * Get component instance from uri without the component version
 * @example /components/text/instances/0@published returns 0
 * @param  {string} uri
 * @return {string|null}
 */
module.exports = function (uri) {
  const result = /\/components\/.+?\/instances\/([^\.@]+)/.exec(uri);

  return result && result[1];
}

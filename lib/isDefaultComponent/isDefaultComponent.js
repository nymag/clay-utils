'use strict';

/**
 * Determine if a uri points to a DEFAULT instance of a component
 * @param  {string}  uri
 * @return {Boolean}
 */
module.exports = function (uri) {
  return !!uri.match(/\/components\/[A-Za-z0-9\-]+$/);
}

/**
 * get component name from uri
 * @example /components/base  returns base
 * @example /components/text/instances/0  returns text
 * @example /components/image.html  returns image
 * @param  {string} uri
 * @return {string|null}
 */
module.exports = function (uri) {
  const result = /components\/(.+?)[\/\.]/.exec(uri) || /components\/(.*)/.exec(uri);

  return result && result[1];
}

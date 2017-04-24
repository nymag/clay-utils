'use strict';

// Return true if argument passed in is a string. If not, throw an error.
function strCheck (arg) {
  if (typeof arg === 'string') {
    return true;
  } else {
    throw new Error('Argument must be a string, not ' + typeof arg);
  }
}

module.exports.strCheck = strCheck;

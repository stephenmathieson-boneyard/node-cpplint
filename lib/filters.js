'use strict';

var extend = require('./extend.js');

/**
 * Parse a command-line list of excludes and convert into an object
 *
 * @param  {String} str
 * @return {Object}
 */
function parse(str) {
  var result = {},
    excludes = str.split(',');

  excludes.forEach(function (option) {

    var category, subcategory,
      parts = option.split('-');

    category = parts[0];

    // @todo support `whitespace` without a subcategory to disable all whitespace rules
    subcategory = parts[1];
    if (!subcategory) {
      return;
    }

    if (!result.hasOwnProperty(category)) {
      result[category] = {};
    }

    result[category][subcategory] = false;

  });

  return result;
}

module.exports = {
  'parse': parse
};

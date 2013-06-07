'use strict';

var extend = require('./extend.js');

/**
 * Each possible error, all enabled by default (other than build/include_alpha)
 * @type {Object}
 */
var defaults = {
  'build': {
    'class': true,
    'deprecated': true,
    'endif_comment': true,
    'explicit_make_pair': true,
    'forward_decl': true,
    'header_guard': true,
    'include': true,
    // for whatever reason, by default, cpplint has this turned off by default
    'include_alpha': false,
    'include_order': true,
    'include_what_you_use': true,
    'namespaces': true,
    'printf_format': true,
    'storage_class': true
  },
  'legal': {
    'copyright': true
  },
  'readability': {
    'braces': true,
    'casting': true,
    'check': true,
    'constructors': true,
    'fn_size': true,
    'function': true,
    'multiline_comment': true,
    'multiline_string': true,
    'nolint': true,
    'streams': true,
    'todo': true,
    'utf8': true
  },
  'runtime': {
    'arrays': true,
    'casting': true,
    'explicit': true,
    'int': true,
    'init': true,
    'invalid_increment': true,
    'member_string_references': true,
    'memset': true,
    'operator': true,
    'printf': true,
    'printf_format': true,
    'references': true,
    'rtti': true,
    'sizeof': true,
    'string': true,
    'threadsafe_fn': true,
    'virtual': true
  },
  'whitespace': {
    'blank_line': true,
    'braces': true,
    'comma': true,
    'comments': true,
    'end_of_line': true,
    'ending_newline': true,
    'indent': true,
    'labels': true,
    'line_length': true,
    'newline': true,
    'operators': true,
    'parens': true,
    'semicolon': true,
    'tab': true,
    'todo': true
  }
};

/**
 * Parse a command-line list of excludes and convert into an object
 *
 * @param  {String} str
 * @return {Object}
 */
function parse(str) {
  var result = extend({}, defaults),
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

    // non-supported categories
    if (!result.hasOwnProperty(category)) {
      return;
    }

    result[category][subcategory] = false;

  });

  return result;
}


module.exports = {
  'defaults': defaults,
  'parse': parse
};

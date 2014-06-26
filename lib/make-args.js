'use strict';

var path = require('path');

/*jslint nomen:true*/
var CPPLINT = path.resolve(__dirname, '../cpplint/cpplint.py');
/*jslint nomen:false*/

/**
 * Get the cpplint `verbose` argument
 *
 * @param  {String} type
 * @return {String}
 */
function verbosity(level) {
  return '--verbose=' + level.toString();
}

/**
 * Get the cpplint `counting` argument
 *
 * @param  {String} type
 * @return {String}
 */
function counting(type) {
  return '--counting=' + type;
}

/**
 * Get the cpplint `extensions` argument
 *
 * @param  {String|Array} exts
 * @return {String}
 */
function extensions(exts) {
  var extsType = {}.toString.call(exts);
  if (extsType === '[object Array]') {
    exts = exts.join(',');
  }
  return '--extensions=' + exts;
}

/**
 * Get the cpplint `linelength` argument
 *
 * @param {Number} length
 * @return {String}
 */
function linelength(length) {
  return '--linelength=' + length;
}

/**
 * Get the cpplint `filter` argument
 *
 * @todo   This could use a bit of re-working due to performance...
 * @param  {Object} filters
 * @return {String}
 */
function filter(filters) {
  var categories = Object.keys(filters),
    filterSettings = [];

  categories.forEach(function (categoryName) {

    var index, subcategory, value,
      category = filters[categoryName],
      subcategories = Object.keys(category),
      length = subcategories.length,
      filterSetting = '';

    for (index = 0; index < length; index += 1) {
      subcategory = subcategories[index];
      value = category[subcategory];
      filterSetting = '';

      if (value) {
        filterSetting += '+';
      } else {
        filterSetting += '-';
      }

      filterSetting += categoryName + '/' + subcategory;
      filterSettings.push(filterSetting);
    }

  });

  return '--filter=' + filterSettings.join(',');
}
/*
function filter(excluded) {
  'use strict';

  var index, length, exclude,
    parts, category, subcategory,
    result = '';

  for (index = 0, length = excluded.length; index < length; index += 1) {

    exclude = excluded[index];

    parts = exclude.split('-');
    category = parts[0];
    subcategory = parts[1];

    result += '-' + category + '/' + subcategory;

  }

  return '--filter=';
}
*/

/**
 * Get arguments for cpplint
 *
 * @param {Object} conf
 * @param {Function} next
 * @return {Array}
 */
function makeArgs(conf, next) {
  var args = [ CPPLINT ];

  // set verbosity
  args.push(verbosity(conf.verbosity));

  // set counting
  args.push(counting(conf.counting));

  if (conf.filters) {
    // set filters
    args.push(filter(conf.filters));
  }

  if (conf.extensions) {
    // set filters
    args.push(extensions(conf.extensions));
  }

  //set linelength
  if (conf.linelength) {
    args.push(linelength(conf.linelength));
  }

  // set files
  args.push(conf.files.join(' '));

  if (typeof next === 'function') {
    return next(null, args);
  }

  return args;
}

module.exports = {
  'makeArgs': makeArgs,
  'linelength': linelength,
  'filter': filter,
  'counting': counting,
  'verbosity': verbosity,
  'extensions': extensions
};

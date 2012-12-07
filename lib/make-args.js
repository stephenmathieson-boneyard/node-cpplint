/*jslint node:true*/

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
	'use strict';

	return '--verbose=' + level.toString();
}

/**
 * Get the cpplint `counting` argument
 *
 * @param  {String} type
 * @return {String}
 */
function counting(type) {
	'use strict';

	return '--counting=' + type;
}

/**
 * Get the cpplint `filter` argument
 *
 * @todo   This could use a bit of re-working due to performance...
 * @param  {Object} filters
 * @return {String}
 */
function filter(filters) {
	'use strict';

	var categories = Object.keys(filters),
		result = '';

	categories.forEach(function (categoryName) {

		var index, subcategory, value,
			category = filters[categoryName],
			subcategories = Object.keys(category),
			length = subcategories.length;

		for (index = 0; index < length; index += 1) {
			subcategory = subcategories[index];
			value = category[subcategory];

			if (value) {
				result += '+';
			} else {
				result += '-';
			}

			result += categoryName + '/' + subcategory;

			if (index !== (length - 1)) {
				result += ',';
			}

		}

	});

	return '--filter=' + result;
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
	'use strict';

	var args = [ CPPLINT ];

	// set verbosity
	args.push(verbosity(conf.verbosity));

	// set counting
	args.push(counting(conf.counting));

	if (conf.filters) {
		// set filters
		args.push(filter(conf.filters));
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
	'filter': filter,
	'counting': counting,
	'verbosity': verbosity
};

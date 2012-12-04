/*jslint node:true*/

var path = require('path');

/*jslint nomen:true*/
var CPPLINT = path.resolve(__dirname, '../cpplint/cpplint.py');
/*jslint nomen:false*/

/**
 * [verbosity description]
 *
 * @param  {String} type
 * @return {String}
 */
function verbosity(level) {
	'use strict';

	return '--verbose=' + level.toString();
}

/**
 * [counting description]
 *
 * @param  {String} type
 * @return {String}
 */
function counting(type) {
	'use strict';

	return '--counting=' + type;
}

/**
 * [makeArgs description]
 *
 * @param {Object} conf
 * @param {Function} next
 * @return {Array}
 */
function makeArgs(conf, next) {
	'use strict';

	var args = [ CPPLINT ];

	args.push(verbosity(conf.verbosity));
	args.push(counting(conf.counting));

	args.push(conf.files.join(' '));

	if (typeof next === 'function') {
		return next(null, args);
	}

	return args;
}

module.exports = makeArgs;

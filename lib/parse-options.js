/*jslint node:true*/

var extend = require('./extend.js');

/**
 * Supported counting (`--counting=`) types
 * @type {Array}
 */
var COUNTING_TYPES = [
	'total',
	'toplevel',
	'detailed'
];

// verbosity requirements
var MAX_VERBOSITY = 5;
var MIN_VERBOSITY = 0;

/**
 * The default _cpplint_ options
 * @type {Object}
 */
var defaults = {};
defaults.verbosity = 1;
defaults.counting = 'total';


/**
 * [parseOptions description]
 *
 * @async
 * @param  {Object} options
 * @param  {Function} next
 */
function parseOptions(options, next) {
	'use strict';

	var conf = extend(options, defaults);

	if (!conf.files || !conf.files.length) {
		next(new Error('must provide some files'));
	}

	if (conf.verbosity > MAX_VERBOSITY || conf.verbosity < MIN_VERBOSITY) {
		next(new Error('invalid verbosity level (0-5)'));
	}

	if (COUNTING_TYPES.indexOf(conf.counting) === -1) {
		next(new Error('invalid counting type (' + COUNTING_TYPES.join(', ') + ')'));
	}

	next(null, conf);
}

module.exports.defaults = defaults;
module.exports.parseOptions = parseOptions;

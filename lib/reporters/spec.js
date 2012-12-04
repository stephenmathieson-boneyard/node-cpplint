/*jslint node:true*/

require('colors');

var out = require('../out.js');

/**
 * A reporter for node-cpplint.  Based off of vowsjs' `spec` reporter.
 *
 * @param  {Error} err
 * @param  {Object} report
 */
function reporter(err, report) {
	'use strict';

	var files = Object.keys(report);

	files.forEach(function (filename) {
		var errors = report[filename];

		if (!errors.length) {
			out(' ✓ '.green + filename + '\n');

		} else {
			out(' ✗ '.red + filename + '\n');

			errors.forEach(function (error) {

				out('   ');
				out(error.linenumber.toString().yellow);
				out(': ');
				out(error.reason);
				out('\n');
			});

		}

	});

}

module.exports = reporter;


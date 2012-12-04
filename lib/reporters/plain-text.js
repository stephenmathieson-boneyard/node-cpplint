/*jslint node:true*/

/**
 * A reporter for node-cpplint.  Outputs cpplint-style errors in plain-text.
 *
 * @param  {Error} err
 * @param  {Object} report
 */
function reporter(err, report) {
	'use strict';

	if (err) {
		throw err;
	}

	var files = Object.keys(report);

	files.forEach(function (filename) {
		var errors = report[filename];

		if (!errors.length) {
			console.log('PASS\t' + filename);

		} else {
			console.log('FAIL\t' + filename + ' (' + errors.length.toString() + ')');

			errors.forEach(function (error) {
				console.log(error.toString());
			});

		}

	});
}

module.exports = reporter;
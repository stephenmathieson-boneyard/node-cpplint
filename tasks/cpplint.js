/*jslint node:true*/

var cpplint = require('../lib/index.js');

var reporters = require('../lib/reporters/index.js');

module.exports = function (grunt) {
	'use strict';

	/**
	 * Grabs a config option from the jslint namespace
	 *
	 * @param  {String} option The option/configuration key
	 * @return {Mixed|Any}     The key's value
	 */
	function conf(option) {
		return grunt.config('cpplint.' + option);
	}

	grunt.registerTask('cpplint', 'Validate CPP files with cpplint', function () {

		var done = this.async(),
			options = {},
			reporter = conf('reporter') || 'spec';

		if (!reporters[reporter]) {
			grunt.log.error('Invalid/unsupported reporter');
			return false;
		}

		options.files = grunt.file.expandFiles(conf('files'));
		options.verbosity = conf('verbosity') || 1;
		options.counting = conf('counting') || 'toplevel';

		cpplint(options, function (err, report) {

			var failed = false;

			if (err) {
				grunt.log.error(err);
				return done(false);
			}

			reporters[reporter](null, report);

			// hack
			(function () {

				var index, count, fileReport,
					filenames = Object.keys(report);

				for (index = 0, count = filenames.length; index < count; index += 1) {
					if (report[filenames[index]].length) {
						failed = true;
						break;
					}
				}

				done(!failed);

			}());

		});

	});
};
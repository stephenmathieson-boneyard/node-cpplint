/*jslint node:true*/

require('colors');

var spawn = require('child_process').spawn;

var exec = require('child_process').exec;

var parseOptions = require('./parse-options.js').parseOptions;

var makeArgs = require('./make-args.js');

var parseOutput = require('./parse-output.js');

function runner(options, next) {
	'use strict';

	var cpplint;

	parseOptions(options, function (err, config) {

		if (err) {
			return next(err);
		}

		var args = makeArgs(config);

		cpplint = exec(args.join(' ').trim(), function (err, stdout, stderr) {

			return parseOutput(stderr, next);

		});

	});

}

module.exports = runner;

/*

runner({
	'files': [
		'/Users/stephenmathieson/work/amaze/signing/amaze-cpp-signing-extension-stephen/src/signing.cc',
		'/Users/stephenmathieson/work/amaze/signing/amaze-cpp-signing-extension-stephen/CPPSigningExtension.cc'
	]
}, function (err, report) {
	'use strict';

	var files = Object.keys(report);

	files.forEach(function (filename) {
		var errors = report[filename];

		if (!errors.length) {
			console.log('PASS\t'.green + filename);

		} else {
			console.log('FAIL\t'.red + filename + ' (' + errors.length.toString() + ')');

			errors.forEach(function (error) {
				console.log(error.toString());
			});

		}

	});

});

*/
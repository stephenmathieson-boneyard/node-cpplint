/*jslint node:true*/

require('colors');

var exec = require('child_process').exec;

var parseOptions = require('./parse-options.js').parseOptions;

var makeArgs = require('./make-args.js').makeArgs;

var parseOutput = require('./parse-output.js');

function runner(options, next) {
	'use strict';

	var cpplint;

	parseOptions(options, function (err, config) {

		if (err) {
			return next(err);
		}

		var args = makeArgs(config);

		/*jslint unparam:true*/
		cpplint = exec(args.join(' ').trim(), function (err, stdout, stderr) {

			return parseOutput(stderr, next);

		});
		/*jslint unparam:false*/

	});

}

module.exports = runner;

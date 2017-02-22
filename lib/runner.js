/*jslint node:true*/

'use strict';

require('colors');

var exec = require('child_process').exec;

var parseOptions = require('./parse-options.js').parseOptions;

var makeArgs = require('./make-args.js').makeArgs;

var parseOutput = require('./parse-output.js');

function runner(options, next) {
  parseOptions(options, function (err, config) {
    if (err) {
      return next(err);
    }

    var args = makeArgs(config);

    /*jslint unparam:true*/
    exec(args.join(' ').trim(), function (err, stdout, stderr) {
      return parseOutput(stderr, next);
    }).on('exit', function (exitCode) {
      process.exitCode = exitCode;
    });
    /*jslint unparam:false*/
  });
}

process.on('exit', function () {
  process.exit(process.exitCode);
});

module.exports = runner;

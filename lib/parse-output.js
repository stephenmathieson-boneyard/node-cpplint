'use strict';

var LintError = require('./lint-error.js');

/*jslint regexp:true*/
var expressions = {
  // Done processing /Users/stephenmathieson/work/node-cpplint/test/fixtures/somefile.cc
  'done': {
    'is': /Done processing [\/a-z\-\_\.\d]+/i,
    'file': / ([\/a-z\-\_\.\d]+)$/i
  },
  // /Users/stephenmathieson/work/node-cpplint/test/fixtures/somefile.cc:302:  Blank line at the end of a code block.  Is this needed?  [whitespace/blank_line] [3]
  'error': {
    'is': /[\/a-z-_\.]+\:[\d]+\:[ ]{2}.*\[[1-5]\]/i
  }
};

/**
 * [parseOutput description]
 *
 * @param  {String} output
 * @param  {Function} next
 * @return {[type]}
 */
function parseOutput(output, next) {
  var error,
    report = {},
    lines = output.split('\n').filter(function (line) {
      if (line) {
        return true;
      }

      return false;
    });

  lines.forEach(function (line) {

    var filename;

    if (line.match(expressions.done.is)) {

      filename = line.match(expressions.done.file)[1];

      if (!report.hasOwnProperty(filename)) {
        report[filename] = [];
      }

    }

    if (line.match(expressions.error.is)) {
      error = new LintError(line);
      filename = error.file;

      if (!report.hasOwnProperty(filename)) {
        report[filename] = [];
      }

      report[filename].push(error);

    }

  });

  return next(null, report);
}

module.exports = parseOutput;

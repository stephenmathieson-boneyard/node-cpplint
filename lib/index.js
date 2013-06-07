'use strict';

var runner = require('./runner.js');

/**
 * [cpplint description]
 *
 * @async
 * @param  {Object} options
 * @param  {Function} reporter
 */
function cpplint(options, reporter) {
  return runner(options, reporter);
}

module.exports = cpplint;

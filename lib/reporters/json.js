/*jslint node:true*/

var out = require('../out.js');

/**
 * A reporter for node-cpplint.  Outputs JSON.
 *
 * @param  {Error} err
 * @param  {Object} report
 */
function reporter(err, report) {
  'use strict';

  if (err) {
    throw err;
  }

  out(JSON.stringify(report));

}

module.exports = reporter;


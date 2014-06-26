/*jslint node:true*/

var cpplint = require('../lib/index.js');

var reporters = require('../lib/reporters/index.js');

var filters = require('../lib/filters.js');

var extend = require('../lib/extend.js');

module.exports = function (grunt) {
  'use strict';

  /**
   * Grabs a config option from the cpplint namespace
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
      gruntFilters = conf('filters') || {},
      reporter = conf('reporter') || 'spec';

    if (!reporters[reporter]) {
      grunt.log.error('Invalid/unsupported reporter');
      return false;
    }

    options.filters = gruntFilters;

    options.extensions = conf('extensions');

    options.files = grunt.file.expand(conf('files'));
    options.verbosity = conf('verbosity') || 1;
    options.counting = conf('counting') || 'toplevel';
    options.linelength = conf('linelength');

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

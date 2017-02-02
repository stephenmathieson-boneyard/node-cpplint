/* eslint-disable no-unused-vars */
'use strict';

var vows = require('vows');
var assert = require('assert');
var extend = require('../lib/extend.js');
var runner = require('../lib/runner.js');

var suite = vows.describe('runner');

suite.addBatch({
  'sanity': {
    topic: function () {
      this.callback(null, runner);
    },
    'should be a function': function (err, mod) {
      assert.isFunction(mod);
    }
  }
});

/**
 * Batch of tests for verbosity levels 0-4 on node-cpp-hello.cpp
 * @type {Object}
 */
var verbosityLevel0 = {
  'should not error': function (err, report) {
    assert.isNull(err);
  },
  'should pass an object': function (err, report) {
    assert.isObject(report);
  },
  'should report 5 errors': function (err, report) {
    report = report[Object.keys(report)[0]];
    assert.equal(report.length, 5);
  },
  'should report errors in sequential order (based on line numbers)':
  function (err, report) {
    report = report[Object.keys(report)[0]];
    assert.equal(report[0].linenumber, '0');
    assert.equal(report[1].linenumber, '5');
    assert.equal(report[2].linenumber, '6');
    assert.equal(report[3].linenumber, '9');
    assert.equal(report[4].linenumber, '14');
  },
  'should report on line [legal/copyright] [5] at line #0':
  function (err, report) {
    var error = report[Object.keys(report)[0]][0];

    assert.equal(error.reason, 'No copyright message found.  You should have a'
        + ' line: "Copyright [year] <Copyright Owner>"');
    assert.equal(error.category, 'legal');
    assert.equal(error.sub_category, 'copyright');
    assert.equal(error.linenumber, '0');
  },
  'should report on line [build/namespaces] [5] at line #5':
  function (err, report) {
    var error = report[Object.keys(report)[0]][1];
    assert.equal(error.reason, 'Do not use namespace using-directives.'
        + ' Use using-declarations instead.');
    assert.equal(error.category, 'build');
    assert.equal(error.sub_category, 'namespaces');
    assert.equal(error.linenumber, '5');
  },
  'should report on line [build/namespaces] [5] at line #6':
  function (err, report) {
    var error = report[Object.keys(report)[0]][2];

    assert.equal(error.reason, 'Do not use namespace using-directives.'
        + ' Use using-declarations instead.');
    assert.equal(error.category, 'build');
    assert.equal(error.sub_category, 'namespaces');
    assert.equal(error.linenumber, '6');
  },
  'should report on line [whitespace/braces] [4] at line #9':
  function (err, report) {
    var error = report[Object.keys(report)[0]][3];

    assert.equal(error.reason, '{ should almost always be at the end of the'
        + ' previous line');
    assert.equal(error.category, 'whitespace');
    assert.equal(error.sub_category, 'braces');
    assert.equal(error.linenumber, '9');
  },
  'should report on line [whitespace/braces] [4] at line #14':
  function (err, report) {
    var error = report[Object.keys(report)[0]][4];

    assert.equal(error.reason, '{ should almost always be at the end of the'
        + ' previous line');
    assert.equal(error.category, 'whitespace');
    assert.equal(error.sub_category, 'braces');
    assert.equal(error.linenumber, '14');
  }
};

var levels = [0, 1, 2, 3, 4];

// create an identical batch for each level, incrementing the verbosity level
// per batch
levels.forEach(function (level) {
  var name = 'verbosity:' + level.toString() + ' (node-cpp-hello.cpp)',
    batch = {};

  batch[name] = {
    topic: function () {
      var options = {
        files: [],
        verbosity: level
      };

      options.files.push(__dirname + '/fixtures/node-cpp-hello.cpp');

      runner(options, this.callback);
    }
  };

  batch[name] = extend(batch[name], verbosityLevel0);

  suite.addBatch(batch);
});

suite.addBatch({
  // raw output
  'verbosity:5 (node-cpp-hello.cpp)': {
    topic: function () {
      var options = {
        files: [],
        verbosity: 5
      };

      options.files.push(__dirname + '/fixtures/node-cpp-hello.cpp');

      runner(options, this.callback);
    },
    'should not error': function (err, report) {
      assert.isNull(err);
    },
    'should pass an object': function (err, report) {
      assert.isObject(report);
    },
    'should report 3 errors': function (err, report) {
      report = report[Object.keys(report)[0]];
      assert.equal(report.length, 3);
    },
    'should report errors in sequential order (based on line numbers)':
    function (err, report) {
      report = report[Object.keys(report)[0]];
      assert.equal(report[0].linenumber, '0');
      assert.equal(report[1].linenumber, '5');
      assert.equal(report[2].linenumber, '6');
    },
    'should report on line [legal/copyright] [5] at line #0':
    function (err, report) {
      var error = report[Object.keys(report)[0]][0];

      assert.equal(error.reason, 'No copyright message found.  You should have'
          + ' a line: "Copyright [year] <Copyright Owner>"');
      assert.equal(error.category, 'legal');
      assert.equal(error.sub_category, 'copyright');
      assert.equal(error.linenumber, '0');
    },
    'should report on line [build/namespaces] [5] at line #5':
    function (err, report) {
      var error = report[Object.keys(report)[0]][1];

      assert.equal(error.reason, 'Do not use namespace using-directives.'
          + ' Use using-declarations instead.');
      assert.equal(error.category, 'build');
      assert.equal(error.sub_category, 'namespaces');
      assert.equal(error.linenumber, '5');
    },
    'should report on line [build/namespaces] [5] at line #6':
    function (err, report) {
      var error = report[Object.keys(report)[0]][2];

      assert.equal(error.reason, 'Do not use namespace using-directives.'
          + ' Use using-declarations instead.');
      assert.equal(error.category, 'build');
      assert.equal(error.sub_category, 'namespaces');
      assert.equal(error.linenumber, '6');
    }
  }
});

suite.export(module);

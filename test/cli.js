/*jslint node:true, unparam:true, nomen: true*/

'use strict';

var vows = require('vows');

var assert = require('assert');

var path = require('path');

var execFile = require('child_process').execFile;

var exec = require('child_process').exec;

var suite = vows.describe('cli');

suite.addBatch({
  'defaults': {
    topic: function () {
      execFile(path.join(__dirname, '..', 'bin', 'cpplint'), [
        path.join(__dirname, 'fixtures', 'node-cpp-hello.cpp')
      ], null, this.callback);
    },

    'should run successfully': function (err, stdout, stderr) {
      assert.isNull(err);
      assert.isString(stdout);
      assert.isEmpty(stderr);
    },

    'default verbosity is 1': function (err, stdout, stderr) {
      var lines = stdout.split('\n');
      assert.lengthOf(lines, 7);
    },

    'default reporter is spec': function (err, stdout, stderr) {
      var lines = stdout.split('\n');
      assert.match(lines[0], /✗/);
      assert.match(lines[0], /node\-cpp\-hello\.cpp/);
    },

    'default filters is no filters': function (err, stdout, stderr) {
      var lines = stdout.split('\n');
      assert.lengthOf(lines, 7);
    },

    'default extensions is no extensions': function (err, stdout, stderr) {
      var lines = stdout.split('\n');
      assert.lengthOf(lines, 7);
    }
  },

  'filters': {
    topic: function () {
      exec(path.join(__dirname, '..', 'bin', 'cpplint') + ' --filters legal-copyright,' +
          'build-namespaces,whitespace-braces ' + path.join(__dirname, 'fixtures', 'node-cpp-hello.cpp'),
          this.callback);
    },

    'should exclude the filters': function (err, stdout, stderr) {
      var lines = stdout.split('\n');
      assert.lengthOf(lines, 2);
      assert.match(lines[0], /✓/);
    }
  }
});

suite.export(module);

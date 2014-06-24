/*jslint node:true, unparam:true*/

'use strict';

var vows = require('vows');

var assert = require('assert');

var parseOptions = require('../lib/parse-options.js').parseOptions;

var suite = vows.describe('parse-options');

suite.addBatch({
  'valid options': {
    topic: function () {
      parseOptions({
        'verbosity': 1,
        'counting': 'total',
        'files': [
          '/path/to/file1',
          '/path/to/file2'
        ]
      }, this.callback);
    },
    'should not error': function (err, result) {
      assert.isNull(err);
    },
    'should pass an object': function (err, result) {
      assert.isObject(result);
    },
    'should set correct values': function (err, result) {
      assert.deepEqual(result.files, [
        '/path/to/file1',
        '/path/to/file2'
      ]);

      assert.equal(result.verbosity, 1);

      assert.equal(result.counting, 'total');
    }
  },

  'invalid options': {
    topic: function () {
      this.callback(null, parseOptions);
    },
    'should throw on bad verbosity level': function (err, fn) {
      assert.throws(function () {
        fn({
          'verbosity': 1000,
          'counting': 'total',
          'files': [
            '/path/to/file1',
            '/path/to/file2'
          ]
        });
      });
    },
    'should throw on bad counting type': function (err, fn) {
      assert.throws(function () {
        fn({
          'verbosity': 1,
          'counting': 'cats',
          'files': [
            '/path/to/file1',
            '/path/to/file2'
          ]
        });
      });
    },
    'should throw on bad files': function (err, fn) {
      assert.throws(function () {
        fn({
          'verbosity': 1,
          'counting': 'total',
          'files': []
        });
      });
    }
  }
});

suite.export(module);

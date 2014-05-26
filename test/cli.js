/*jslint node:true, es5:true, unparam:true, nomen: true*/

'use strict';

var vows = require('vows');

var assert = require('assert');

var path = require('path');

var execFile = require('child_process').execFile;

var suite = vows.describe('cli');

suite.addBatch({
  'sanity': {
    topic: function () {
      execFile(path.join(__dirname, '..', 'bin', 'cpplint'), [
        path.join(__dirname, 'fixtures', 'node-cpp-hello.cpp')
      ], null, this.callback);
    },

    'should run successfully': function (error, stdout, stderr) {
      assert.isNull(error);
      assert.isString(stdout);
      assert.isEmpty(stderr);
    }
  }
});

suite.export(module);

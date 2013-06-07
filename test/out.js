/*jslint node:true, es5:true, unparam:true*/

var vows = require('vows');
var assert = require('assert');
var out = require('../lib/out');

var suite = vows.describe('out');

suite.addBatch({
  'when calling `out()`': {
    topic: this.callback,

    'an exception should be thrown': function () {
      'use strict';

      assert.throws(function () {
        out();
      });
    }
  },

  'providing a custom stream': {
    topic: this.callback,

    'should pass the `str` along': function () {
      'use strict';

      var expected = 'cats',
        stream = {
          write: function (actual) {
            assert.equal(actual, expected);
          }
        };

      out(expected, {
        stream: stream
      });
    }

  }
});

suite.export(module);

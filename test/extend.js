'use strict';

var vows = require('vows');

var assert = require('assert');

var extend = require('../lib/extend.js');

var suite = vows.describe('extend');

suite.addBatch({
  'extend two objects': {
    topic: function () {
      var a = {
          'foo': 'bar',
          '1': 2,
          'false': true,
          'cats': 'cats'
        },
        b = {
          'foo': 'bar',
          '1': 2,
          '2': 2,
          'false': false
        };

      this.callback(null, extend(a, b));
    },

    'should return an object': function (err, result) {
      assert.isObject(result);
    },

    'should favor the second': function (err, result) {
      assert.equal(result.false, false);
    },

    'should keep custom first properties': function (err, result) {
      assert.equal(result.cats, 'cats');
    },

    'should keep custom second properties': function (err, result) {
      assert.equal(result['2'], 2);
    }
  }
});

suite.addBatch({
  'deep-extend two objects': {
    topic: function () {
      var first = {},
        second = {};

      first.the_letter_h = false;
      first.first_specific = 'hi';
      first.an_empty_object = {};
      first.blah = {
        'stuff': true,
        'things': false,
        'apples': 34
      };

      second.the_letter_h = true;
      second.second_specific = 'bye';
      second.an_empty_object = {};
      second.blah = {
        'stuff': true,
        'things': true
      };

      this.callback(null, extend(first, second, true));
    },
    'should return an object': function (err, result) {
      assert.isObject(result);
    },
    'should favor the second': function (err, result) {
      assert.isTrue(result.the_letter_h);
    },
    'should keep custom properties': function (err, result) {
      assert.equal(result.first_specific, 'hi');
      assert.equal(result.second_specific, 'bye');
    },
    'should merge inner-object properties': function (err, result) {
      assert.equal(result.blah.apples, 34);
      assert.isTrue(result.blah.stuff);
      assert.isTrue(result.blah.things);
    }
  }
});

suite.export(module);

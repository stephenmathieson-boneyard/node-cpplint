/*jslint node:true, es5:true, unparam:true*/

'use strict';

var vows = require('vows');

var assert = require('assert');

var extend = require('../lib/extend.js');

var suite = vows.describe('extend');

suite.addBatch({
	'two objects': {
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

suite.export(module);

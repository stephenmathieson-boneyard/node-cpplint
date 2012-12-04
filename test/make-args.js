/*jslint node:true, es5:true, unparam:true*/

'use strict';

var vows = require('vows');

var assert = require('assert');

var makeArgs = require('../lib/make-args.js');

var suite = vows.describe('make args');

suite.addBatch({
	'sanity': {
		topic: function () {
			this.callback(null, makeArgs);
		},

		'should be a function': function (err, result) {
			assert.isFunction(result);
		}
	}
});

suite.addBatch({
	'should fire callback when provided': {
		topic: function () {
			makeArgs({
				'verbosity': 1,
				'counting': 'total',
				'files': []
			}, this.callback);
		},
		'should not error': function (err, args) {
			assert.isNull(err);
		},
		'should pass an Array': function (err, args) {
			assert.isArray(args);
		}
	}
});

suite.addBatch({
	'should return without provided callback': {
		topic: makeArgs({
			'verbosity': 1,
			'counting': 'total',
			'files': []
		}),
		'should not error': function (err, args) {
			assert.isNull(err);
		},
		'should pass an Array': function (err, args) {
			assert.isArray(args);
		}
	}
});


suite.addBatch({
	'values': {
		topic: makeArgs({
			'verbosity': 1,
			'counting': 'total',
			'files': [
				'/path/to/file1',
				'/path/to/file2'
			]
		}),
		'should set correct verbosity level': function (err, args) {
			assert.includes(args, '--verbose=1');
		},
		'should set correct counting type': function (err, args) {
			assert.includes(args, '--counting=total');
		},
		'should pass correct files': function (err, args) {
			assert.includes(args, '/path/to/file1 /path/to/file2');
		},
	}
});

suite.export(module);

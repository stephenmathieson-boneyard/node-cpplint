/*jslint node:true, es5:true*/

var vows = require('vows');
var assert = require('assert');
var cpplint = require('../lib/index.js');

var suite = vows.describe('cpplint');

suite.addBatch({

	'sanity': {
		topic: function () {
			'use strict';

			this.callback(null, cpplint);
		},

		'should be a function': function (err, mod) {
			'use strict';

			assert.isFunction(mod);
		}
	}

});

suite.export(module);
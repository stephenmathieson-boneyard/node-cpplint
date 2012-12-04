/*jslint node:true*/

require('colors');

var path = require('path');

var extend = require('./extend.js');

// [whitespace/blank_line] [3]
var category = /\[([a-z]+)\/([a-z_]+)\] \[([1-5])\]/i;

function LintError(line) {
	'use strict';

	var temp,
		parts = line.split('  ');

	this.line = line;

	// hack to handle reasons like this:
	// "Blank line at the end of a code block.  Is this needed?"
	if (parts.length === 4) {
		temp = [];
		temp.push(parts[0]);
		temp.push([parts[1], parts[2]].join('  '));
		temp.push(parts[3]);
		parts = temp;
	}

	temp = parts[0].split(':');
	this.file = temp[0];
	this.linenumber = temp[1];

	this.reason = parts[1];

	temp = parts[2].match(category);
	this.category = temp[1];
	this.sub_category = temp[2];
	this.level = temp[3];
}

/**
 * @return {String} this.line
 */
LintError.prototype.toString = function () {
	'use strict';

	return this.line;
};

/**
 * Creates a plain Object based on properties of the LintError
 *
 * @return {Object}
 */
LintError.prototype.toObject = function () {
	'use strict';

	var obj = extend({}, this);

	return obj;
};

module.exports = LintError;

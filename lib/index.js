/*jslint node:true*/

var runner = require('./runner.js');

var reporters = require('./reporters/index.js');

/**
 * [cpplint description]
 *
 * @async
 * @param  {Object} options
 * @param  {Function} reporter
 */
function cpplint(options, reporter) {
	'use strict';

	return runner(options, reporter);
}

module.exports = cpplint;


cpplint({
	'files': [
		'/Users/stephenmathieson/work/amaze/signing/amaze-cpp-signing-extension-stephen/src/signing.cc',
		'/Users/stephenmathieson/work/amaze/signing/amaze-cpp-signing-extension-stephen/CPPSigningExtension.cc'
	]
}, reporters.spec);
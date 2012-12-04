/*jslint node:true*/

var commander = require('commander');

var cpplint = require('./index.js');

var reporters = require('./reporters/index.js');

var cli = commander
	.option('-v, --verbose [verbosity]', 'Set the verbosity level', Number, 1)
	.option('-r, --reporter [reporter]', 'Set the reporter', String, 'spec')
	.parse(process.argv);

var options = {};

// mirror `--reporter plain-text` to `--reporter plainText`
if (cli.reporter === 'plain-text') {
	options.reporter = reporters.plainText;

} else {
	options.reporter = reporters[cli.reporter];

}

if (!options.reporter) {
	cli.outputHelp();
	process.exit(1);
}

// set the verbosity level
options.verbose = cli.verbose;

// set the remainging options (assume we should lint them)
options.files = cli.args;

cpplint(options, options.reporter);

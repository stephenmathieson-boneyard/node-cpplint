'use strict';

var commander = require('commander');

var cpplint = require('./index.js');

var filters = require('./filters.js');

var reporters = require('./reporters/index.js');

var cli = commander
  .option('-v, --verbose [verbosity]', 'Set the verbosity level', Number, 1)
  .option('-r, --reporter [reporter]', 'Set the reporter', String, 'spec')
  .option('-filters, --filters [filters]', 'Set a list of ignored errors')
  .option('-extensions, --extensions [extensions]', 'Set The allowed file extensions that cpplint will check')
  .option('-l, --linelength [linelength]', 'Set the allowed line length', Number)
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
options.verbosity = cli.verbose;

// set the ignored errors
if (cli.filters) {
  options.filters = filters.parse(cli.filters);
}

// set the extensions
if (cli.extensions) {
  options.extensions = cli.extensions;
}

// set the linelength
if (cli.linelength) {
  options.linelength = cli.linelength;
}

// set the remainging options (assume they're files and we should lint them)
options.files = cli.args;

// run this thingy
cpplint(options, options.reporter);

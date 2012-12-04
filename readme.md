# node-cpplint

Validates CPP files with Google's [cpplint](http://google-styleguide.googlecode.com/svn/trunk/cpplint/cpplint.py)

## Usage

This module has been built for usage with Node scripts, to run from the command
line, and to be used as a Grunt task.

### Options

All methods of using this module allow for three specific configuration options:

- **reporter** The reporter to use ( *spec* | *json* | *plain-text* ); defaults
to *spec*.
- **counting** The counting-type ( *total* | *toplevel* | *detailed* ); defaults
to *total*.  The total number of errors found is always printed. If *toplevel*
is provided, then the count of errors in each of the top-level categories like
`build` and `whitespace` will also be printed. If *detailed* is provided, then
a count is provided for each category like `build/class`.
- **verbose** The verbosity level; defaults to *1*.  A number *0-5* to restrict
errors to certain verbosity levels.

A list of files is also expected.


### CLI usage

```bash
bin/cpplint --verbose (1-5) --reporter (spec|json|plain-text) --counting (total|toplevel|detailed) file1 file2 ...
```

### JavaScript usage

Using the `spec` reporter

```javascript
var cpplint = require('lib/index.js');
var reporter = require('lib/reporters').spec;
var options = {
	files: [
		'/path/to/some/files.cc'
	]
};

cpplint(options, reporter);
```

Using a custom reporter

```javascript
var cpplint = require('lib/index');
var options = {
	files: [
		'/path/to/some/files.cc'
	]
};

cpplint(options, function (err, report) {
	// your reporting logic
});
```

### Grunt Task

```javascript
grunt.initConfig({
	cpplint: {
		files: [
			'src/**/*.cc',
			'src/**/*.cpp'
		],
		reporter: 'spec',
		verbosity: 1
	}
});
```

## TODO

Future plans (in no perticular order):
- better test coverage
- support for `filters`
- JUnit-xml reporter


## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding
style.  Add unit tests (using [vows](https://github.com/cloudhead/vows)) for
any new or changed functionality.  Lint and test your code using `grunt jslint`
and verify that all unit tests are passing with `grunt vows`.

## Revision History

### 0.1.1
- added simple grunt task


### 0.1.0

- first public version
- provides a few simple options for validating CPP files

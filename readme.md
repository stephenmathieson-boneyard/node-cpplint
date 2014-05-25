# node-cpplint [![Build Status](https://secure.travis-ci.org/stephenmathieson/node-cpplint.svg?branch=master)](http://travis-ci.org/stephenmathieson/node-cpplint) [![Dependency Status](https://david-dm.org/stephenmathieson/node-cpplint.svg)](https://david-dm.org/stephenmathieson/node-cpplint) [![devDependency Status](https://david-dm.org/stephenmathieson/node-cpplint/dev-status.svg)](https://david-dm.org/stephenmathieson/node-cpplint#info=devDependencies)

Validates CPP files with Google's [cpplint](http://google-styleguide.googlecode.com/svn/trunk/cpplint/cpplint.py)

## Usage

This module has been built for usage with Node scripts, to run from the command
line, and to be used as a Grunt task.

### Options

All methods of using this module allow for four specific configuration options:

- **reporter** The reporter to use ( *spec* | *json* | *plain-text* ); defaults
to *spec*.
- **counting** The counting-type ( *total* | *toplevel* | *detailed* ); defaults
to *total*.  The total number of errors found is always printed. If *toplevel*
is provided, then the count of errors in each of the top-level categories like
`build` and `whitespace` will also be printed. If *detailed* is provided, then
a count is provided for each category like `build/class`.
- **verbose** The verbosity level; defaults to *1*.  A number *0-5* to restrict
errors to certain verbosity levels.
- **filters** Enable/disable filtering for specific errors.
- **extensions** List of file extensions to lint.


A list of files is also expected.


### CLI usage

Using the `spec` reporter, disabling *whitespace/braces* errors and linting *file1*.

```bash
bin/cpplint --reporter spec --filter whitespace-braces file1
```

Setting verbosity to `3` and the counting-type to `detailed` while linting *file1* and *file2*.

```bash
bin/cpplint --verbose 3 --counting detailed file2 file3
```

Using the `plain-text` reporter, ignoring *build/deprecated* errors and linting *file1*.

```bash
bin/cpplint --filter build-deprecated --reporter plain-text file1
```

Using the `cc` and `hpp` extensions and linting *source1.cc* and *source1.hpp*.

```bash
bin/cpplint --extensions cc,hpp source1.cc source1.hpp
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

Using a custom reporter, disabling *whitespace/braces* and enabling *whitespace/include_alpha*

```javascript
var cpplint = require('lib/index');
var options = {
  files: [
    '/path/to/some/files.cc'
  ],
  filters: {
    'whitespace': {
      'braces': false,
      'include_alpha': true
    }
  },
  // This could be an array of strings or a comma separated string
  extensions: [
    'cc',
    'hpp'
  ]
};

cpplint(options, function (err, report) {
  // your reporting logic
});
```

### Grunt Task

```javascript
grunt.loadNpmTasks('node-cpplint');

grunt.initConfig({
  cpplint: {
    files: [
      'src/**/*.cc',
      'src/**/*.cpp'
    ],
    reporter: 'spec',
    verbosity: 1
  },
  filters: {
    'whitespace': {
      'braces': false,
      'include_alpha': true
    }
  },
  // This could be an array of strings or a comma separated string
  extensions: [
    'cc',
    'hpp'
  ]
});
```

## TODO

Future plans (in no particular order):
- better test coverage
- xunit-xml reporter


## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding
style.  Add unit tests (using [vows](https://github.com/cloudhead/vows)) for
any new or changed functionality.  Lint and test your code using `grunt jslint`
and verify that all unit tests are passing with `grunt vows`.

## Revision History

### 0.2.0

- update cpplint
- added extensions option for overriding what file extensions to lint

### 0.1.5

- more windows compability fixes (line-endings) (@zcbenz)

### 0.1.4

- bug fix in filters support (@kevinsawicki)

### 0.1.3

- update grunt task to work with grunt 0.4 (@kevinsawicki)
- update dev dependencies (grunt-jslint, vows, ...)
- added `npm test` support

### 0.1.2
- added support for ignoring certain errors (filters)

### 0.1.1
- added simple grunt task


### 0.1.0

- first public version
- provides a few simple options for validating CPP files

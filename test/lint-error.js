/*jslint node:true, unparam:true*/

'use strict';

var vows = require('vows');
var assert = require('assert');
var LintError = require('../lib/lint-error.js');

var suite = vows.describe('LintError');

suite.addBatch({

  'sanity': {
    topic: function () {
      this.callback(null, LintError);
    },
    'should be a function': function (err, mod) {
      assert.isFunction(mod);
    }
  },

  'missing line': {
    topic: function () {
      this.callback(null, LintError);
    },

    'should error': function (err, ErrorConstructor) {
      assert.throws(function () {
        return new ErrorConstructor();
      });
    }
  }

});

/**
 *
 * @todo  Coverage
 *
 */

suite.addBatch({

  'whitespace/blank_line (3)': {
    topic: function () {
      var error = new LintError('somefile0.cc:1234  Blank line at the end of a code block.  Is this needed?  [whitespace/blank_line] [3]');
      this.callback(null, error);
    },
    'should have correct filename': function (err, lintError) {
      assert.equal(lintError.file, 'somefile0.cc');
    },
    'should have correct line number': function (err, lintError) {
      assert.equal(lintError.linenumber, '1234');
    },
    'should have correct reason': function (err, lintError) {
      assert.equal(lintError.reason, 'Blank line at the end of a code block.  Is this needed?');
    },
    'should have correct category': function (err, lintError) {
      assert.equal(lintError.category, 'whitespace');
    },
    'should have correct sub-category': function (err, lintError) {
      assert.equal(lintError.sub_category, 'blank_line');
    },
    'should have correct level': function (err, lintError) {
      assert.equal(lintError.level, '3');
    }
  },

  'whitespace/blank_line (3) again': {
    topic: function () {
      var error = new LintError('somefile3.cpp:123  Do not leave a blank line after "public:"  [whitespace/blank_line] [3]');
      this.callback(null, error);
    },
    'should have correct filename': function (err, lintError) {
      assert.equal(lintError.file, 'somefile3.cpp');
    },
    'should have correct line number': function (err, lintError) {
      assert.equal(lintError.linenumber, '123');
    },
    'should have correct reason': function (err, lintError) {
      assert.equal(lintError.reason, 'Do not leave a blank line after "public:"');
    },
    'should have correct category': function (err, lintError) {
      assert.equal(lintError.category, 'whitespace');
    },
    'should have correct sub-category': function (err, lintError) {
      assert.equal(lintError.sub_category, 'blank_line');
    },
    'should have correct level': function (err, lintError) {
      assert.equal(lintError.level, '3');
    }
  },

  'whitespace/blank_line (2)': {
    topic: function () {
      var error = new LintError('somefile1.cc:134  Blank line at the start of a code block.  Is this needed?  [whitespace/blank_line] [2]');
      this.callback(null, error);
    },
    'should have correct filename': function (err, lintError) {
      assert.equal(lintError.file, 'somefile1.cc');
    },
    'should have correct line number': function (err, lintError) {
      assert.equal(lintError.linenumber, '134');
    },
    'should have correct reason': function (err, lintError) {
      assert.equal(lintError.reason, 'Blank line at the start of a code block.  Is this needed?');
    },
    'should have correct category': function (err, lintError) {
      assert.equal(lintError.category, 'whitespace');
    },
    'should have correct sub-category': function (err, lintError) {
      assert.equal(lintError.sub_category, 'blank_line');
    },
    'should have correct level': function (err, lintError) {
      assert.equal(lintError.level, '2');
    }
  },

  'runtime/threadsafe_fn (2)': {
    topic: function () {
      var error = new LintError('somefile2.cc:124  Consider using rand_r(...) instead of rand(...) for improved thread safety.  [runtime/threadsafe_fn] [2]');
      this.callback(null, error);
    },
    'should have correct filename': function (err, lintError) {
      assert.equal(lintError.file, 'somefile2.cc');
    },
    'should have correct line number': function (err, lintError) {
      assert.equal(lintError.linenumber, '124');
    },
    'should have correct reason': function (err, lintError) {
      assert.equal(lintError.reason, 'Consider using rand_r(...) instead of rand(...) for improved thread safety.');
    },
    'should have correct category': function (err, lintError) {
      assert.equal(lintError.category, 'runtime');
    },
    'should have correct sub-category': function (err, lintError) {
      assert.equal(lintError.sub_category, 'threadsafe_fn');
    },
    'should have correct level': function (err, lintError) {
      assert.equal(lintError.level, '2');
    }
  },

  'whitespace/parens (4)': {
    topic: function () {
      var error = new LintError('somefile4:234  Extra space before ( in function call  [whitespace/parens] [4]');
      this.callback(null, error);
    },
    'should have correct filename': function (err, lintError) {
      assert.equal(lintError.file, 'somefile4');
    },
    'should have correct line number': function (err, lintError) {
      assert.equal(lintError.linenumber, '234');
    },
    'should have correct reason': function (err, lintError) {
      assert.equal(lintError.reason, 'Extra space before ( in function call');
    },
    'should have correct category': function (err, lintError) {
      assert.equal(lintError.category, 'whitespace');
    },
    'should have correct sub-category': function (err, lintError) {
      assert.equal(lintError.sub_category, 'parens');
    },
    'should have correct level': function (err, lintError) {
      assert.equal(lintError.level, '4');
    }
  },

  'whitespace/braces (5)': {
    topic: function () {
      var error = new LintError('somefile5.whatever:14  Extra space before [  [whitespace/braces] [5]');
      this.callback(null, error);
    },
    'should have correct filename': function (err, lintError) {
      assert.equal(lintError.file, 'somefile5.whatever');
    },
    'should have correct line number': function (err, lintError) {
      assert.equal(lintError.linenumber, '14');
    },
    'should have correct reason': function (err, lintError) {
      assert.equal(lintError.reason, 'Extra space before [');
    },
    'should have correct category': function (err, lintError) {
      assert.equal(lintError.category, 'whitespace');
    },
    'should have correct sub-category': function (err, lintError) {
      assert.equal(lintError.sub_category, 'braces');
    },
    'should have correct level': function (err, lintError) {
      assert.equal(lintError.level, '5');
    }
  },

  'whitespace/parens (5)': {
    topic: function () {
      var error = new LintError('somefile7.cats:34  Missing space before ( in if(  [whitespace/parens] [5]');
      this.callback(null, error);
    },
    'should have correct filename': function (err, lintError) {
      assert.equal(lintError.file, 'somefile7.cats');
    },
    'should have correct line number': function (err, lintError) {
      assert.equal(lintError.linenumber, '34');
    },
    'should have correct reason': function (err, lintError) {
      assert.equal(lintError.reason, 'Missing space before ( in if(');
    },
    'should have correct category': function (err, lintError) {
      assert.equal(lintError.category, 'whitespace');
    },
    'should have correct sub-category': function (err, lintError) {
      assert.equal(lintError.sub_category, 'parens');
    },
    'should have correct level': function (err, lintError) {
      assert.equal(lintError.level, '5');
    }
  },

  'build/c++11 (5)': {
    topic: function () {
      var error = new LintError('src/channel.cpp:1:  <future> is an unapproved C++11 header.  [build/c++11] [5]');
      this.callback(null, error);
    },
    'should have correct filename': function (err, lintError) {
      assert.equal(lintError.file, 'src/channel.cpp');
    },
    'should have correct line number': function (err, lintError) {
      assert.equal(lintError.linenumber, '1');
    },
    'should have correct reason': function (err, lintError) {
      assert.equal(lintError.reason, '<future> is an unapproved C++11 header.');
    },
    'should have correct category': function (err, lintError) {
      assert.equal(lintError.category, 'build');
    },
    'should have correct sub-category': function (err, lintError) {
      assert.equal(lintError.sub_category, 'c++11');
    },
    'should have correct level': function (err, lintError) {
      assert.equal(lintError.level, '5');
    }
  }
});

suite.export(module);

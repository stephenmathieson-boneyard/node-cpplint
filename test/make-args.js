/*jslint node:true, es5:true, unparam:true*/

'use strict';

var vows = require('vows');

var assert = require('assert');

var makeArgs = require('../lib/make-args.js').makeArgs;

var filter = require('../lib/make-args.js').filter;

var counting = require('../lib/make-args.js').counting;

var verbosity = require('../lib/make-args.js').verbosity;

var suite = vows.describe('make args');

suite.addBatch({
  'sanity': {
    topic: function () {
      return makeArgs;
    },

    'should be a function': function (fn) {
      assert.isFunction(fn);
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
      ],
      'filters': {
        'category1': {
          'subcat1': true,
          'subcat2': false,
          'subcat3': true
        },
        'category2': {
          'subcat1': true,
          'subcat2': false,
          'subcat3': true,
          'subcat4': true,
          'subcat5': false,
          'subcat6': true
        }
      }
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
    'should pass the correct filters': function (err, args) {
      assert.includes(args, '--filter=+category1/subcat1,-category1/subcat2,+category1/subcat3,+category2/subcat1,-category2/subcat2,+category2/subcat3,+category2/subcat4,-category2/subcat5,+category2/subcat6');
    }

  },
  'values (without filters)': {
    topic: makeArgs({
      'verbosity': 1,
      'counting': 'total',
      'files': [
        '/path/to/file1',
        '/path/to/file2'
      ]
    }),
    'first arg should contain "cpplint/cpplint.py"': function (err, args) {
      assert.includes(args[0], 'cpplint/cpplint.py');
    },
    'should pass the correct verbose value': function (err, args) {
      assert.includes(args, '--verbose=1');
    },
    'should pass the correct counting value': function (err, args) {
      assert.includes(args, '--counting=total');
    },
    'should pass the correct files value': function (err, args) {
      assert.includes(args, '/path/to/file1 /path/to/file2');
    },
    'should not pass a filter value': function (err, args) {
      assert.equal(args.length, 4); // not quite good enough...
    }
  }
});

suite.addBatch({
  'filter': {
    topic: filter({
      'category1': {
        'subcat1': true,
        'subcat2': false,
        'subcat3': true
      },
      'category2': {
        'subcat1': true,
        'subcat2': false,
        'subcat3': true,
        'subcat4': true,
        'subcat5': false,
        'subcat6': true
      },
      'category3': {
        'subcat1': true
      }
    }),
    'should return a string': function (filters) {
      assert.isString(filters);
    },
    'should start with "--filter="': function (filters) {
      assert.ok(filters.indexOf('--filter=') === 0);
    },
    'should not end with a comma': function (filters) {
      assert.notEqual(filters[filters.length - 1], ',');
    },
    'should disable "category1/subcat2"': function (filters) {
      assert.includes(filters, '-category1/subcat2');
    },
    'should enable subcats 1 and 3 in category1': function (filters) {
      assert.includes(filters, '+category1/subcat1');
      assert.includes(filters, '+category1/subcat3');
    },
    'should enable subcats 1, 3, 4, and 6 in category2': function (filters) {
      assert.includes(filters, '+category2/subcat1');
      assert.includes(filters, '+category2/subcat3');
      assert.includes(filters, '+category2/subcat4');
      assert.includes(filters, '+category2/subcat6');
    },
    'should disable subcats 2 and 5 in category2': function (filters) {
      assert.includes(filters, '-category2/subcat2');
      assert.includes(filters, '-category2/subcat5');
    },
    'should include a comma between filters': function (filters) {
      assert.include(filters.split(','), '+category3/subcat1');
    }
  }
});

suite.export(module);

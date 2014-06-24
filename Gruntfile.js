'use strict';

module.exports = function (grunt) {
  grunt.loadNpmTasks('grunt-jslint');
  grunt.loadNpmTasks("grunt-vows");
  grunt.loadTasks('./tasks');

  // Project configuration.
  grunt.initConfig({

    vows: {
      src: [
        'test/*.js'
      ],
      options: {
        reporter: "spec"
      }
    },

    jslint: {
      all: {
        src: [
          'lib/**/*.js',
          'test/**/*.js',
          'Gruntfile.js'
        ],
        directives: {
          node: true,
          todo: true,
          indent: 2
        }
      }
    },

    cpplint: {
      files: [
        'test/fixtures/**/*.cc',
        'test/fixtures/**/*.cpp'
      ],
      reporter: 'spec',
      verbosity: 1,
      counting: 'toplevel',
      filters: {
        // by default, everything is true
        'build': {
          'class': false,
          'deprecated': true,
          'endif_comment': false,
          'explicit_make_pair': true,
          'forward_decl': false,
          'header_guard': true,
          'include': false,
          'include_alpha': true,
          'include_order': false,
          'include_what_you_use': true,
          'namespaces': false,
          'printf_format': true,
          'storage_class': false
        },
        'legal': {
          'copyright': true
        },
        'readability': {
          'braces': false,
          'casting': true,
          'check': false,
          'constructors': true,
          'fn_size': false,
          'function': true,
          'multiline_comment': false,
          'multiline_string': true,
          'nolint': false,
          'streams': true,
          'todo': false,
          'utf8': true
        },
        'runtime': {
          'arrays': false,
          'casting': true,
          'explicit': false,
          'int': true,
          'init': false,
          'invalid_increment': true,
          'member_string_references': false,
          'memset': true,
          'operator': false,
          'printf': true,
          'printf_format': false,
          'references': true,
          'rtti': false,
          'sizeof': true,
          'string': false,
          'threadsafe_fn': true,
          'virtual': false
        },
        'whitespace': {
          'blank_line': true,
          'braces': false,
          'comma': true,
          'comments': false,
          'end_of_line': true,
          'ending_newline': false,
          'indent': true,
          'labels': false,
          'line_length': true,
          'newline': false,
          'operators': true,
          'parens': false,
          'semicolon': true,
          'tab': false,
          'todo': true
        }
      }
    }

  });

  grunt.registerTask('default', 'jslint');

  grunt.registerTask('travis', [
    'jslint', 'vows'
  ]);
};

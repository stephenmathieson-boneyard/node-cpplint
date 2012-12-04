/*jslint node:true*/

module.exports = function (grunt) {
	'use strict';

	grunt.loadNpmTasks('grunt-jslint');
	grunt.loadNpmTasks('grunt-vows');

	grunt.loadTasks('./tasks');

	// Project configuration.
	grunt.initConfig({

		jslint: {
			files: [
				'lib/**/*.js',
				'test/**/*.js',
				'grunt.js'
			],
			directives: {
				node: true,
				todo: true
			}
		},

		vows: {
			all: {
				files: [
					'test/*.js'
				],
				reporter: 'spec',
				colors: true
			}
		},

		watch: {
			files: '<config:jslint.files>',
			tasks: 'jslint'
		},

		cpplint: {
			files: [
				'test/fixtures/**/*.cc',
				'test/fixtures/**/*.cpp'
			],
			reporter: 'spec',
			verbosity: 1,
			counting: 'toplevel'
		}

	});

	grunt.registerTask('validate', 'jslint vows');
	grunt.registerTask('default', 'validate');

};

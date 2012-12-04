/*jslint node:true*/

module.exports = function (grunt) {
	'use strict';

	grunt.loadNpmTasks('grunt-jslint');
	grunt.loadNpmTasks('grunt-vows');

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
		}

	});

	grunt.registerTask('validate', 'jslint vows');
	grunt.registerTask('default', 'validate');

};

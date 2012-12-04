/*jslint node:true*/

module.exports = function (grunt) {
	'use strict';

	grunt.loadNpmTasks('grunt-jslint');

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

		watch: {
			files: '<config:jslint.files>',
			tasks: 'jslint'
		}
	});

};

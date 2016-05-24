
module.exports = function(grunt){
	'use strict';

	require('load-grunt-tasks')(grunt);

	/**
	 * Grunt config
	 */
	grunt.initConfig({

		/***************************
		 * Settings
		 ***************************/
		settings: {
			dev: 'src',
			dist: 'dist'
		},

		/***************************
		 * Connect
		 ***************************/
		connect: {
			options:{
				livereload: 35729
			},
			livereload: {
				options: {
					port: 9000,
					hostname: '*',
					base: '<%= settings.dist %>'
				}
			}
		},

		/***************************
		 * Watch
		 ***************************/
		watch: {
			options: {
		    	livereload: '<%= connect.options.livereload %>'
			},
			html: {
				files: ['<%= settings.dev %>/index.html']
			},
			scripts:{
				files: ['<%= settings.dev %>/*.js']
			}
		},

		/***************************
		 * Browserify
		 ***************************/
		browserify: {
			options: {
				browserifyOptions: {
					debug: true
				},
				plugin: [
				],
				transform: [
					['babelify', {
						presets: ['es2015']
					}]
				]
			},
			dev: {
				options: {
					watch: true
				},
				files: [{
					src: ['<%= settings.dev %>/app.js'],
					dest: '<%= settings.dist %>/app.js'
				}]
			}
		}
	});

	grunt.registerTask('dev', [
		'browserify:dev'
	]);

	grunt.registerTask('server', [
		'connect',
		'dev',
		'watch'
	]);	

	//
	// Default
	//
	grunt.registerTask('default', 'server');
};
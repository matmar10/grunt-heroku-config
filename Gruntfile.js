/*
 * grunt-heroku-config
 * https://github.com/matmar10/grunt-heroku-config
 *
 * Copyright (c) 2015 Matthew J. Martin
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function (grunt) {

  // load all grunt tasks listed in package.json
  require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({

    // enforce code style guideline
    jsbeautifier: {
      options: {
        config: '.jsbeautifyrc'
      },
      dev: {
        options: {
          mode: 'VERIFY_AND_WRITE'
        },
        src: [
          'Gruntfile.js',
          'tasks/*.js',
          '<%= nodeunit.tests %>'
        ]
      },
      test: {
        options: {
          mode: 'VERIFY_ONLY'
        },
        src: [
          'Gruntfile.js',
          'tasks/*.js',
          '<%= nodeunit.tests %>'
        ]
      }
    },

    // enforce code quality best practices
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    herokuConfig: {
      defaultOptions: {
        options: {},
        files: {
          'tmp/production.json': 'test/fixtures/production.json'
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*test.js']
    }

  });

  grunt.loadTasks('tasks');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['jsbeautifier:test', 'jshint', 'clean', 'herokuConfig', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jsbeautifier:dev', 'jshint', 'test']);

};

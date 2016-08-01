'use strict';

const istanbul = require('browserify-istanbul');
const isparta  = require('isparta');

const karmaBaseConfig = {

  basePath: './',

  singleRun: true,

  frameworks: ['jasmine', 'browserify'],

  preprocessors: {
    // 'client/**/*.js': ['browserify', 'coverage']
    'client/**/*.js': ['browserify']
  },

  browsers: ['PhantomJS'],

  // reporters: ['progress', 'coverage'],
  reporters: ['progress'],

  autoWatch: true,

  browserify: {
    debug: true,
    extensions: ['.js'],
    transform: [
      'babelify',
      'browserify-ngannotate',
      'bulkify',
      istanbul({
        instrumenter: isparta,
        ignore: ['**/node_modules/**', 'client/**/test/**']
      })
    ]
  },

  proxies: {
    '/': 'http://localhost:9876/'
  },

  urlRoot: '/__karma__/',

  files: [
    // 3rd-party resources
    'bower_components/angular/angular.js',
    'bower_components/angular-animate/angular-animate.js',
    'bower_components/angular-sanitize/angular-sanitize.js',
    'bower_components/angular-ui-router/release/angular-ui-router.js',
    'bower_components/es5-shim/es5-shim.js',
    'bower_components/angular-loading-bar/build/loading-bar.js',
    'bower_components/angular-mocks/angular-mocks.js',
    'bower_components/lodash/lodash.js',
    'bower_components/angular-aria/angular-aria.js',
    'bower_components/angular-messages/angular-messages.js',
    'bower_components/angular-material/angular-material.js',
    'bower_components/moment/moment.js',

    // app-specific code
    'client/main.mdl.js',

    // Templates
    'temp/js/templates.js',

    // test files
    'client/**/tests/unit/**/*.js',
    'client/**/tests/mocks/**/*.js'
  ]

};

const customLaunchers = {
  chrome: {
    browserName: 'chrome'
  }
};

const ciAdditions = {
  sauceLabs: {
    testName: 'Karma Unit Tests',
    startConnect: false,
    build: process.env.TRAVIS_BUILD_NUMBER,
    tunnelIdentifier: process.env.TRAVIS_JOB_NUMBER
  },
  browsers: Object.keys(customLaunchers),
  customLaunchers: customLaunchers,
  reporters: ['progress', 'coverage']
};

module.exports = function(config) {
  const isCI = process.env.CI;
  config.set(isCI ? Object.assign(karmaBaseConfig, ciAdditions) : karmaBaseConfig);
};

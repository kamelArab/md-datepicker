// Karma configuration
// Generated on Thu Apr 23 2015 17:24:10 GMT+0200 (CEST)

module.exports = function(config) {
  config.set({

    // base path that will be used to resolve all patterns (eg. files, exclude)
    basePath: '',


    // frameworks to use
    // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
    frameworks: ['jasmine'],


    // list of files / patterns to load in the browser
    files: [

        '../bower_components/angular/*min.js',
        '../bower_components/angular-i18n/angular-locale_fr.js',
        '../bower_components/angular-material/*min.js',
        '../src/datePicker.js',
        '../bower_components/angular-mocks/angular-mocks.js',
        '../test/spec/**/*.js'
    ],


    // list of files to exclude
    exclude: [
    ],


    // preprocess matching files before serving them to the browser
    // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
    preprocessors: {
    },


    // test results reporter to use
    // possible values: 'dots', 'progress'
    // available reporters: https://npmjs.org/browse/keyword/karma-reporter
      reporters: [/*'spec', 'html', 'coverage'*/ 'progress'],



    // web server port
    port: 9876,


    // enable / disable colors in the output (reporters and logs)
    colors: true,


    // level of logging
    // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
    logLevel: config.LOG_DEBUG,


    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,


    // start these browsers
    // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
    browsers: ['Chrome'/*, 'Firefox', 'PhantomJS'*/],
      coverageReporter: {
          reporters:[
              {type: 'html', dir:'reports/coverage'},
              {type: 'text-summary'}
          ]
      },

      htmlReporter: {
          outputDir: 'test/reports/karma'
      },


    // Continuous Integration mode
    // if true, Karma captures browsers, runs the tests and exits
    singleRun: false
  });
};

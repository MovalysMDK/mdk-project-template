// Karma configuration
// Generated on Fri Nov 27 2015 11:22:53 GMT+0100 (Paris, Madrid)

module.exports = function (config) {
    config.set({

        // base path that will be used to resolve all patterns (eg. files, exclude)
        basePath: '',


        // frameworks to use
        // available frameworks: https://npmjs.org/browse/keyword/karma-adapter
        frameworks: ['jasmine', 'browserify'],


        // list of files / patterns to load in the browser
        files: [

            'build/vendor/angular/angular.js',
            'build/vendor/angular-mocks/angular-mocks.js',
            'build/vendor/angular-loading-bar/build/loading-bar.min.js',
            'build/vendor/angular-translate/angular-translate.js',
            'build/vendor/angular-growl-v2/build/angular-growl.min.js',
            'build/vendor/angular-bootstrap/ui-bootstrap.js',
            'build/vendor/angular-ui-router/release/angular-ui-router.min.js',
            'build/vendor/angular-snap/angular-snap.min.js',
            'build/vendor/angular-animate/angular-animate.min.js',
            'build/vendor/angular-cookies/angular-cookies.min.js',
            'build/vendor/angular-touch/angular-touch.min.js',
            'build/vendor/angular-route/angular-route.min.js',
            'build/vendor/ngCordova/dist/ng-cordova.min.js',
            {pattern: 'build/vendor/mdk-html5-core/lib/mfcoreModule.js', watched: false},
            {pattern: 'build/vendor/mdk-html5-ui/lib/mfuiModule.js', watched: false},
            'build/vendor/mdk-html5-ui/lib/**.js',
            'build/vendor/mdk-html5-ui/lib/**/*.js',
            'build/vendor/mdk-html5-core/lib/**.js',
            'build/vendor/mdk-html5-core/lib/**/*.js',

            'src/app/modules.js',
            'src/app/app.js',
            'src/app/**/*.js',
            'src/test/unit/**/*.js'
        ],


        // list of files to exclude
        exclude: [
            'src/test/e2e/**/*.js',
            'src/assets/**/*.js'
        ],


        // preprocess matching files before serving them to the browser
        // available preprocessors: https://npmjs.org/browse/keyword/karma-preprocessor
        preprocessors: {
            'src/test/unit/**/*.js': [ 'browserify' ]
        },


        // test results reporter to use
        // possible values: 'dots', 'progress'
        // available reporters: https://npmjs.org/browse/keyword/karma-reporter
        reporters: ['progress'],


        // web server port
        port: 9876,


        // enable / disable colors in the output (reporters and logs)
        colors: true,


        // level of logging
        // possible values: config.LOG_DISABLE || config.LOG_ERROR || config.LOG_WARN || config.LOG_INFO || config.LOG_DEBUG
        logLevel: config.LOG_INFO,


        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,


        // start these browsers
        // available browser launchers: https://npmjs.org/browse/keyword/karma-launcher
        browsers: ['Chrome'],


        // Continuous Integration mode
        // if true, Karma captures browsers, runs the tests and exits
        singleRun: false,

        plugins: [
            'karma-chrome-launcher',
            'karma-jasmine',
            'karma-browserify'],

        // Concurrency level
        // how many browser should be started simultanous
        concurrency: Infinity
    })
}

'use strict';
// angular.module is a global place for creating, registering and retrieving Angular modules
// 'app' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('MFApplication')

.config(['$stateProvider', '$urlRouterProvider', '$translateProvider', '$httpProvider', '$compileProvider',
    function($stateProvider, $urlRouterProvider, $translateProvider, $httpProvider, $compileProvider) {

        //@generated-start[compile-provider-config][X]
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|tel|maps|geo|http|bingmaps):/);
        //@generated-end

        $translateProvider.useLoader('$translateMDKLoader', {
            path: 'assets/i18n',
            prefixes: ['fwk_', 'messages_'],
            suffix: '.json'
        });
        // get the navigator language (or the device language)
        var userLang = navigator.language || navigator.userLanguage;
        // remove region tail
        userLang = userLang.split('-')[0];
        $translateProvider.preferredLanguage(userLang);
        $translateProvider.fallbackLanguage('en');
        $translateProvider.useLocalStorage();
        //$translateProvider.useMissingTranslationHandlerLog();

        //Register the HTTP interceptor for global HTTP management (security, pretreatment and post-treatment
//        $httpProvider.interceptors.push('SyncInterceptorHttp');

        // The app uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        $stateProvider

        //@generated-start[app-modulable-state][X]
        .state('<SCREEN-NAME>', {
            url: '',
            templateUrl: 'views/<SCREEN-NAME>/<SCREEN-NAME>.html',
            controller: '<SCREEN-NAME>Ctrl'
        })
        //@generated-end
        .state('config', {
            url: '/config',
            templateUrl: 'views/configScreen/config.html',
            controller: 'ConfigCtrl'
        })
        .state('splashscreen', {
            url: '',
            templateUrl: 'views/splashscreen/splashscreen.html',
            controller: 'SplashScreenCtrl'
        });

        // if none of the above states are matched, use this as the fallback

        //@generated-start[app-urlRouterProvider][X]
        $urlRouterProvider.otherwise('/<ROOT_SCREEN>/');
        //@generated-end
	}])

.run(['$rootScope', 'MFInitScheduler', 'MFInitConfiguration', 'MFInitCordova', 'MFInitOpenDataBase', 'MFInitFillInMDKTables', 'MFInitCreateMDKTables', 'MFInitFillInUserTables', 'MFInitCreateUserTables',
    function($rootScope, MFInitScheduler, MFInitConfiguration, MFInitCordova, MFInitOpenDataBase, MFInitFillInMDKTables, MFInitCreateMDKTables, MFInitFillInUserTables, MFInitCreateUserTables) {

        $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {
            console.log('[STATE CHANGE] "'+fromState.name+'" '+JSON.stringify(fromParams)+'   ==>   "'+toState.name+'" '+JSON.stringify(toParams)+' ');
        });

        MFInitCordova.register('MFInitCordova');
        MFInitConfiguration.register('MFInitConfiguration');
        MFInitOpenDataBase.register('MFInitOpenDataBase', ['MFInitConfiguration']);
        MFInitCreateMDKTables.register('MFInitCreateMDKTables', ['MFInitOpenDataBase', 'MFInitConfiguration']);
        MFInitFillInMDKTables.register('MFInitFillInMDKTables', ['MFInitCreateMDKTables', 'MFInitConfiguration']);
        MFInitCreateUserTables.register('MFInitCreateUserTables', ['MFInitCreateMDKTables']);
        MFInitFillInUserTables.register('MFInitFillInUserTables', ['MFInitCreateUserTables', 'MFInitConfiguration']);
        MFInitScheduler.start();
        //FastClick.attach(document.body); : replaced by https://docs.angularjs.org/api/ngTouch
    }
])
// The "stacktrace" library that we included in the Scripts
// is now in the Global scope; but, we don't want to reference
// global objects inside the AngularJS components - that's
// not how AngularJS rolls; as such, we want to wrap the
// stacktrace feature in a proper AngularJS service that
// formally exposes the print method.
.factory(
    'stacktraceService',
    function() {
        // "printStackTrace" is a global object.
        return ({
            print: printStackTrace
        });
    }
)
// By default, AngularJS will catch errors and log them to
// the Console. We want to keep that behavior; however, we
// want to intercept it so that we can also log the errors
// to the server for later analysis.
.provider(
    '$exceptionHandler', {
        $get: function(errorLogService) {
            return (errorLogService);
        }
    }
)
// The error log service is our wrapper around the core error
// handling ability of AngularJS. Notice that we pass off to
// the native "$log" method and then handle our additional
// server-side logging.
.factory(
    'errorLogService',
    function($log, $window, stacktraceService) {

        // I log the given error to the remote server.
        function log(exception) {
            // Pass off the error to the default error handler
            // on the AngualrJS logger. This will output the
            // error to the console (and let the application
            // keep running normally for the user).
            $log.error.apply($log, arguments);
        }

        // Return the logging function.
        return (log);
    });

'use strict';

var gulp                = require('gulp-help')(require("gulp")),
    connect             = require('gulp-connect'),
    sass                = require('gulp-sass'),
    rename              = require('gulp-rename'),
    jshint              = require('gulp-jshint'),
    del                 = require('del'),
    concat              = require('gulp-concat'),
    stripJsonComments   = require('gulp-strip-json-comments'),
    inject              = require('gulp-inject'),
    runSequence         = require('run-sequence'),
    ngHtml2Js           = require('gulp-ng-html2js'),
    flatten             = require('gulp-flatten'),
    gutil               = require('gulp-util'),
    argv                = require('yargs').argv,
    uglify              = require('gulp-uglify'),
    protractor          = require("gulp-protractor").protractor,
    chug                = require('gulp-chug'),
    Server              = require('karma').Server,
    open                = require('gulp-open'),
    wiredep             = require('wiredep').stream,
	ngConfig  			= require('gulp-ng-config'),
    replaceTask         = require('gulp-replace-task');

/**
 * Load in our build configuration file.
 */
var userConfig = require('./build.config.js');

var pkg = require('./package.json');

if (argv.prod) {
    gutil.log('**************************************************');
    gutil.log('*****GULP TASK LAUNCHED IN PRODUCTION MODE********');
    gutil.log('**************************************************');

} else {
    gutil.log('**************************************************');
    gutil.log('*********GULP TASK LAUNCHED IN DEV MODE***********');
    gutil.log('**************************************************');
    gutil.log('  use --prod on gulp command line, to launch the task in production mode \n');


}

/**
 * Retrieve environment argv
 */
var dev = argv.dev;
var qualif = argv.qualif;
var recette = argv.recette;
var prod = argv.prod;
var mock = argv.mock;

if (!dev && !qualif && !recette && !prod){
	dev = true;
}

var getEnvironment = function(){
	var environmentName = 'dev';

	if (dev){
			environmentName = 'dev';
	}
	else if (qualif){
			environmentName = 'qualif';
	}
	else if (recette){
			environmentName = 'recette';
	}
	else if (prod){
		environmentName = 'prod';
	}

	return environmentName;
};

/**
 * sets the mock environment if necessary
 */
var bootstrapModule = 'MFApplication';

if (mock) {
    bootstrapModule = 'mockModule';
}

// *****************************************************************************
// ******************* PUBLIC **************************************************
// *****************************************************************************

// Default task, if no parameter given
gulp.task('default', 'Execute gulp build', ['build']);

/**
 * gulp-connect is a plugin to run a webserver (with LiveReload)
 */
gulp.task('connect', false, function () {
    return connect.server({
        root: 'build',
        port: 8000,
        livereload: true
    });

});

/**
 * Compile Sass files to one CSS file
 */
gulp.task('sass', 'Compile Sass files to one CSS file',function () {
    return gulp.src(userConfig.app_files.sass)
        .pipe(sass({includePaths: [userConfig.build_dir +  '/vendor/bootstrap-sass-official/assets/stylesheets']}).on('error', sass.logError))
        .pipe(rename(pkg.name + '-' + pkg.version + '.css'))
        .pipe(gulp.dest(userConfig.build_dir +  '/assets/styles/'));
});

/**
 * The directories to delete when `gulp clean` is executed.
 */
gulp.task('clean', 'Clean the directory build', function () {
    return del([userConfig.build_dir +  '/assets',
		userConfig.build_dir +  '/src',
		userConfig.build_dir +  '/index.html',
		userConfig.build_dir +  '/templates-app.js']);
});

/**
 * The directories to delete when `gulp cleanAll` is executed.
 */
gulp.task('cleanAll', 'Clean the directory build', function () {
    return del([userConfig.build_dir +  '/']);
});

/**
 * converting AngularJS templates to JavaScript
 */
gulp.task('html2js', false, function () {
    gulp.src(userConfig.app_files.tpl)
        .pipe(ngHtml2Js({
            moduleName: 'templates-app'
        }))
        .pipe(concat('templates-app.js'))
        .pipe(uglify())
        .pipe(gulp.dest(userConfig.build_dir));

    return gulp.src(userConfig.fwk_files.tpl)
        .pipe(ngHtml2Js({
            moduleName: 'templates-fwk',
            prefix: 'mfui/'
        }))
        .pipe(concat('templates-fwk.js'))
        .pipe(gulp.dest(userConfig.build_dir));

});

/**
 * copy mock data
 */
gulp.task('mockData', function() {
    return gulp.src(['src/assets/mock/*.json'])
        .pipe(gulp.dest(userConfig.build_dir + '/assets/mock'));
});

/**
 * does nothing
 */
gulp.task('noop', function() {return this;});

// =======================================================
// ========  JSHINT ======================================
// =======================================================

/**
 * `jshint` defines the rules of our linter as well as which files we
 * should check. This file, all javascript sources, and all our unit tests
 * are linted based on the policies listed in `options`. But we can also
 * specify exclusionary patterns by prefixing them with an exclamation
 * point (!); this is useful when code comes from a third party but is
 * nonetheless inside `src/`.
 */

var jshintFilesToInspect;

gulp.task('jshint', 'Execute Jshint to detect errors and potential problems in code', function () {
    if (jshintFilesToInspect === undefined) {
        jshintFilesToInspect = userConfig.app_files.js;
    }

    return gulp.src(jshintFilesToInspect)
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('jshint:report', 'Execute Jshint to detect errors and potential problems in code', function () {
    if (jshintFilesToInspect === undefined) {
        jshintFilesToInspect = userConfig.app_files.js;
        gulp.src('./gulpfile.js')
            .pipe(jshint('.jshintrc'))
            .pipe(jshint.reporter('jshint-stylish'));
    }

    return gulp.src(jshintFilesToInspect)
        .pipe(jshint('.jshintrc'))
        .pipe(checkstyleReporter())
        .pipe(gulp.dest(userConfig.reports_dir.checkstyle));
});

/**
 * Wire Bower dependencies to the source code.
 */
gulp.task('bowerDepToHtml', false, function () {
    return gulp.src(userConfig.build_dir + '/index.html')
        .pipe(wiredep({
        }))
        .pipe(gulp.dest(userConfig.build_dir));
});

/**
 * This task permits to inject file references into index.html.
 * Once the injection is done , we do a connect.reload in order to perform a livereload.
 */
gulp.task('injectToHtml', false, function () {
    var target = gulp.src(userConfig.build_dir + '/index.html');
    // It's not necessary to read the files (will speed up things), we're only after their paths:
    var sources = gulp.src([
        userConfig.build_dir + '/src/app/modules.js',
        userConfig.build_dir + '/src/app/app.js',
        userConfig.build_dir + '/templates-app.js',
        userConfig.build_dir + '/templates-fwk.js',
        userConfig.build_dir + '/src/app/**/*.js',
        userConfig.build_dir + '/assets/styles/' + pkg.name + '-' + pkg.version + '.css',
    ], {read: false});

    return target.pipe(inject(sources, {addRootSlash: false, ignorePath: userConfig.build_dir}))
    	.pipe(replaceTask({patterns: [{match: 'moduleName', replacement: bootstrapModule}]}))
        .pipe(gulp.dest(userConfig.build_dir))
        .pipe(connect.reload());


});

// =======================================================
// ========  COPY into build_dir   =======================
// =======================================================

/**
 * The `copy` task just copies files from A to B. We use it here to copy
 * our project assets (images, fonts, etc.) and javascripts into
 * `build_dir`.
 */
gulp.task('copy:buildAppAssets', false, function () {
    gulp.src(userConfig.build_dir +  '/vendor/**/fonts/**')
        .pipe(flatten())
        .pipe(gulp.dest(userConfig.build_dir + '/assets/fonts'));
    gulp.src(['src/assets/**',
                '!**/*.scss',
                '!**/*.md',
                '!**/debug/*',
                '!**/*mock*'])
        .pipe(gulp.dest(userConfig.build_dir + '/assets'));
    gulp.src([userConfig.build_dir +  '/vendor/mdk-html5-lib-core/assets/**',
                '!' + userConfig.build_dir +  '/vendor/**/*.css',
                '!**/*.scss',
                '!**/*.md',
                '!**/debug/*'])
        .pipe(gulp.dest(userConfig.build_dir + '/assets'));
    gulp.src([userConfig.build_dir +  '/vendor/mdk-html5-lib-ui/assets/**',
                '!' + userConfig.build_dir +  '/vendor/**/*.css',
                '!**/*.scss',
                '!**/*.md',
                '!**/debug/*'])
        .pipe(gulp.dest(userConfig.build_dir + '/assets'));
    return gulp.src(['src/index.html', 'src/cordovaLoader.html'])
        .pipe(gulp.dest(userConfig.build_dir));
});

gulp.task('copy:buildAppjs', false, function () {
    return gulp.src(userConfig.app_files.js)
        .pipe(gulp.dest(userConfig.build_dir + '/src/app'));
});

/**
 * Remove comments from JSON files
 */
gulp.task('removeComments', false, function () {
    return gulp.src([userConfig.build_dir + '/assets/**/*.json', userConfig.build_dir + '/src/**/*.json'], {base: './'})
        .pipe(stripJsonComments())
        .pipe(gulp.dest('.'));
});


// =======================================================
// ========  BUILD =======================================
// =======================================================
gulp.task('build', 'Build the webapp project', function (callback) {
    jshintFilesToInspect = userConfig.app_files.js;
    runSequence(
        ['html2js', 'jshint', 'copy:buildAppAssets'],
        'sass',
        'config',
        mock ? 'mockData' : 'noop',
        'copy:buildAppjs',
        ['removeComments', 'bowerDepToHtml'],
        'injectToHtml',
        callback);
});

gulp.task('delta', false, function () {
    gulp.watch(userConfig.app_files.js).on('change', function (file) {
        jshintFilesToInspect = file.path;
        runSequence(
            ['jshint', 'copy:buildAppAssets', 'copy:buildAppjs'],
            'bowerDepToHtml',
            'injectToHtml');
    });

    gulp.watch(['build/vendor/mdk-html5-lib-core/lib/**/*',
        'build/vendor/mdk-html5-lib-ui/lib/**/*']).on('change', function (file) {
        runSequence(
            ['html2js', 'sass', 'copy:buildAppAssets', 'copy:buildAppjs'],
            'bowerDepToHtml',
            'injectToHtml');
    });

    gulp.watch([
        'src/assets/**/*',
        userConfig.build_dir +  '/vendor/mdk-html5-lib-core/assets/**/*',
        userConfig.build_dir +  '/vendor/mdk-html5-lib-ui/assets/**/*'
    ]).on('change', function () {
        runSequence(
            ['sass', 'copy:buildAppAssets'],
            'bowerDepToHtml',
            'injectToHtml');
    });

    gulp.watch(userConfig.app_files.html).on('change', function () {
        runSequence(
            'copy:buildAppAssets',
            'bowerDepToHtml',
            'injectToHtml');
    });

    gulp.watch(userConfig.app_files.tpl).on('change', function () {
        runSequence(
            ['html2js', 'sass', 'copy:buildAppAssets'],
            'bowerDepToHtml',
            'injectToHtml');
    });

    gulp.watch('gulpfile.js', function(){
        jshintFilesToInspect= 'gulpfile.js';
        jshint()
    });

});

/**
 * In order to make it safe to just compile or copy *only* what was changed,
 * we need to ensure we are starting from a clean, fresh build. So the real
 * `watch` task is called `delta` and then add a new task called `watch`
 * that does a clean build before watching for changes.
 */
gulp.task('watch', 'Build the project and connect the application to localhost:8000', function (callback) {
    runSequence(
        'build',
        'connect',
        'delta',
        callback);
});


/**
 * gulp-chug is used to run external gulpfiles as part of a gulp task inside another gulpfile
 * build:fwk permits to launched the gulpfile of mdk-html5-core and mdk-html5-lib-ui.
 */
gulp.task('build:fwk', false, function () {
    gulp.src([userConfig.build_dir + '/vendor/mdk-html5-lib-core/gulpfile.js', userConfig.build_dir + '/vendor/mdk-html5-lib-ui/gulpfile.js'])
        .pipe(chug())
});

/**
 * Run test once and exit
 */
gulp.task('test', 'Run test once and exit', function (done) {
    new Server({
        configFile: __dirname + '/karma.conf.js',
        singleRun: true
    }, done).start();
});


/**
 * Run Tests "end-to-end". Protractor is an end-to-end test framework for AngularJS applications.
 * Protractor runs tests against your application running in a real browser, interacting with it as a user would.
 * see at https://docs.angularjs.org/guide/e2e-testing
 */
gulp.task('protractor', 'Run tests "end-to-end"', function () {
    gulp.src(["./src/tests/e2e/*.js"])
        .pipe(protractor({
            configFile: "protractor.conf.js",
            args: ['--baseUrl', 'http://127.0.0.1:8000']
        }))
        .on('error', function (e) {
            throw e
        });
});

/**
 * Creates an EnvironmentConfig module with constants built from the EnvironmentConfig.json file.
 */
gulp.task('config', function () {
    gulp.src('./src/app/init/EnvironmentConfig.json')
        .pipe(ngConfig('EnvironmentConfig', {
            environment: 'env.' + getEnvironment(),
            wrap: '\"use strict\";\n\n<%= module %>'
        }))
        .pipe(gulp.dest(userConfig.build_dir + '/src/app/config/'))
        .on('error', function (e) {
            gutil.log('erreur');
        });
});


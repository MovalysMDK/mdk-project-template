var gulp = require('gulp'),
    debug = require('gulp-debug'),
    gulpWatch = require('gulp-watch'),
    del = require('del'),
    runSequence = require('run-sequence'),
    vfs = require('vinyl-fs'),
    argv = process.argv,
    sass = require('gulp-sass'),
    glob = require('glob'),
    findFolder = require('node-find-folder'),
    rename = require('gulp-rename'),
    cmd=require('node-cmd');


/**
 * Ionic hooks
 * Add ':before' or ':after' to any Ionic project command name to run the specified
 * tasks before or after the command.
 */
gulp.task('serve:before', ['watch']);

// we want to 'watch' when livereloading
var shouldWatch = argv.indexOf('-l') > -1 || argv.indexOf('--livereload') > -1;
gulp.task('run:before', [shouldWatch ? 'watch' : 'build']);

/**
 * Ionic Gulp tasks, for more information on each see
 * https://github.com/driftyco/ionic-gulp-tasks
 *
 * Using these will allow you to stay up to date if the default Ionic 2 build
 * changes, but you are of course welcome (and encouraged) to customize your
 * build however you see fit.
 */
var copyHTML = require('ionic-gulp-html-copy');
var tslint = require('ionic-gulp-tslint');
var sassBuild = require('ionic-gulp-sass-build');

var isRelease = argv.indexOf('--release') > -1;

gulp.task('build', ['clean'], function(){
  runSequence('lint',
    ['sass', 'html', 'fonts', 'config', 'project-ts', 'local-dependencies', 'dependencies']
  );
});

gulp.task('watch', ['clean'], function(done){
  runSequence('lint',
    ['sass', 'html', 'fonts', 'config', 'project-ts', 'local-dependencies', 'dependencies'],
    function(){
      gulpWatch('app/**/*.scss', {read: false},function(){ gulp.start('sass'); });
      gulpWatch('app/**/*.html', {read: false},function(){ gulp.start('html'); });
      gulpWatch('app/**/*.ts', {read: false},function(){ gulp.start('project-ts'); });
      // Problem with underneath library Chokidar that doesn't follow Symlinks under Win32
      // gulpWatch('jspm_packages/local/**/*.ts', {followSymlinks: true}, function(){ gulp.start('local-dependencies'); });
      done();
    }
  );
});

gulp.task('sass', function() {
  includePaths = [];
  includePaths = includePaths.concat(new findFolder('ionicons*/dist/scss'));
  includePaths = includePaths.concat(new findFolder('ionic-angular*/'));

  return sassBuild({
    dest: 'www/build/css',
    sassOptions: {
      includePaths: includePaths
    }
  });

    
});
gulp.task('html', copyHTML);
gulp.task('fonts', function() {
  return gulp.src('jspm_packages/npm/ionic-angular*/fonts/**/*.+(ttf|woff|woff2)')
    .pipe(rename({dirname: ''}))
    .pipe(gulp.dest('www/build/fonts/'));
});

gulp.task('clean', function(){
  return del('www/build');
});

gulp.task('project-ts', function(){
  // Copy Project typescript files
  return gulp.src('app/**/*.ts').pipe(gulp.dest('www/build/app'));
});

gulp.task('config', function(){
  // Copy configuration files
  gulp.src('jspm.*.js').pipe(gulp.dest('www/build'));
  return gulp.src('tsconfig.json').pipe(gulp.dest('www/build'));
});

gulp.task('dependencies', function() {  
   // Copy SystemJS files
  gulp.src('jspm_packages/*').pipe(gulp.dest('www/build/jspm_packages'));

  // Copy bundled dependencies (See jspm.config.js)
  gulp.src('bundles/dep.js').pipe(gulp.dest('www/build'));
  return gulp.src('bundles/dep.js.map').pipe(gulp.dest('www/build'));
});

gulp.task('local-dependencies', function() {
  // Create a symlink to local dependencies  
  vfs.src(['jspm_packages/local/**/*', 'jspm_packages/local/**/*/**/*', '!jspm_packages/local/**/{jspm_packages,jspm_packages/**}'],
     {followSymlinks: true}).pipe(vfs.dest('www/build/jspm_packages/local/'));

  // Copy MDK dependencies
  return gulp.src(['jspm_packages/mdk/**/*']).pipe(gulp.dest('www/build/jspm_packages/mdk'));
});


gulp.task('lint', tslint);

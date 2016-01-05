"use strict";

var gulp 		= require('gulp-help')(require('gulp')),
    shell 		= require('gulp-shell'),
    debug		= require('gulp-debug'),
    gulpIf 		= require('gulp-if'),
    gulpData 	= require('gulp-data'),
    stripDebug	= require('gulp-strip-debug'),
    processHTML = require('gulp-processhtml'),
    lazypipe 	= require('lazypipe'),
    through		= require('through2'),
    runSequence = require('run-sequence'),
    cordova 	= require('cordova-lib').cordova,
    vfs 		= require('vinyl-fs'),
    async 		= require('async'),
    fs 			= require('fs'),
    path 		= require('path'),
    del        = require('del');

var config 		= require('./build.config.js');
var packageNPM	= require('./package.json');

// Initiating package.json['cordovaPlugins'] if it does not exist
packageNPM.cordovaPlugins = packageNPM.cordovaPlugins || [];


// Check and delete ios if windows platform
var iOS = true;
if ( packageNPM.platforms.indexOf("ios") != -1 && process.platform != 'darwin' ){
    iOS = false;
    packageNPM.platforms.splice( packageNPM.platforms.indexOf("ios"), 1 );
}


// *****************************************************************************
// ******************* PUBLIC **************************************************
// *****************************************************************************

// Default task, if no parameter given
gulp.task('default', 'Executes gulp build', ['build']);

// Inits a project
gulp.task('init', 'Inits the Cordova project: install NPM modules, and updates plugins and platforms', function(cb){
    runSequence(
        'npm:install',
        'files:permissions:hooks',
        'rename:ios:resources',
        'cordova:init',
        cb);
});

// Builds the project for every platforms added
gulp.task('build', 'Build the cordova project', function(cb){
    runSequence(
        'build:prepare',
        'cordova:build',
        cb);
});

// Run Android
gulp.task('run:android', 'Run your project on Android. Platform must be running,\
	and application already built.', function(cb){
    cordova.run('android', function(err){
        return cb(err);
    });
});

if ( iOS ){
    // iOS
    gulp.task('run:ios', 'Run your project on iOS. Platform must be running,\
	and application already built.', function(cb){
        cordova.run('ios', function(err){
            return cb(err);
        });
    });
}

// Init cordova plugins
gulp.task('cordova:plugin:update', 'Update installed plugins in Cordova based on the content of the package.json file', function(cb){
    // cordova.plugin('add', packageNPM.cordovaPlugins, function(err){
    // 	return cb(err);
    // });

    cordova.plugin('list', function(err, list){

        if (err){
            return cb(err);
        }

        var toUninstall = list.filter(function(current_list){
            return packageNPM.cordovaPlugins.filter(function(current_package){
                    return current_package.match( current_list ) !== null;
                }).length == 0
        });

        var addPlugins = function(){
            // Updating listed plugins
            console.log('Updating listed plugins')
            if (packageNPM.cordovaPlugins.length > 0){
                cordova.plugin('add', packageNPM.cordovaPlugins, function(err){
                    return cb(err);
                });
            }else{
                console.log('No plugin specified in package.json, property cordovaPlugins');
                return cb();
            }
        }


        // Uninstall unused plugins
        console.log(toUninstall);
        if (toUninstall.length > 0){
            console.log ('Unistalling plugins : ' + toUninstall.join(', '));
            cordova.plugin('rm', toUninstall, function(err){

                if (err){
                    return cb(err);
                }

                // Updating listed plugins
                addPlugins();

            });
        }else{
            // Updating listed plugins
            addPlugins();
        }
    });

});





// *****************************************************************************
// ******************* NPM *****************************************************
// *****************************************************************************

// Install node modules
gulp.task('npm:install', false, shell.task('npm install'));



// *****************************************************************************
// ******************* CORDOVA *************************************************
// *****************************************************************************

if ( iOS ){
    // Run cordova build for iOS
    gulp.task('cordova:build:ios', false, function(cb){
        cordova.build('ios', function(err){
            return cb(err);
        });
    });
}

// Run cordova build for Android
gulp.task('cordova:build:android', false, function(cb){
    cordova.build('android', function(err){
        return cb(err);
    });
});

// Run cordova build
gulp.task('cordova:build', false, function(cb){
    cordova.build(packageNPM.platforms, function(err){
        return cb(err);
    });
});

// Init platforms for crdova project
gulp.task('cordova:platform:update', false, function(cb){
    cordova.platforms('remove', packageNPM.platforms, function(errRm){
        if (errRm){
            return cb(errRm);
        }
        cordova.platforms('add', packageNPM.platforms, function(errAdd){
            return cb(errAdd);
        });
    });
});

// Cordova part of init task
gulp.task('cordova:init', false, function(cb){
    runSequence(
        'cordova:platform:update',
        'cordova:plugin:update',
        cb);
});



// *****************************************************************************
// ******************* CLEAN ***************************************************
// *****************************************************************************

// Cleans www cordova folder
gulp.task('clean:cordova', false, function(){
    return del(["www/**/*"]);
});

// Removes every logging debug instructions from JS files
gulp.task('clean:debug', false, function(){
    return gulp.src('./www/src/**/*.js', {base: './www/src'})
        .pipe( stripDebug() )
        .pipe( gulp.dest('./www/src') )
});



// *****************************************************************************
// ******************* COPY ****************************************************
// *****************************************************************************

// Prepare build by copying files from webapp/ to cordova/
gulp.task('build:prepare', false, function(cb){
    runSequence(
        'clean:cordova',
        ['copy:webapp', 'copy:pictures', 'copy:cordovafork'],
        'copy:vendor',
        'copy:overrides',
        'processhtml',
        'clean:debug',
        cb);
});

// Copy JS files from overrides (into bower.json) to cordova www
gulp.task('copy:overrides', false, function(){
    var base = '../webapp/build/vendor';
    gulp.src( getOverrides('../webapp/bower.json', base), {base: base} )
        .pipe( gulp.dest( './www/vendor' ) );
});

// Copy only JS files for every vendors to cordova www
gulp.task('copy:vendor', false, function(){

    // Copy JS files described in the main section of bower file
    var copyFromBowerMain = lazypipe()
        .pipe( readBower )
        .pipe( gulp.dest, './www/vendor/' );

    // Copy Bower data & check if main section exists
    var handleBower = lazypipe()
        // get content of bower.js to file.data property
        .pipe(
            function(){
				return gulpData( function(f){
					return require( path.join(f.path, getBowerFile(f)) );
				});
			}
        )
        // If has main property, copy JS from it, else do nothing it'll be copied in overrides
        .pipe( function(){
            return gulpIf(	function(f){return "main" in f.data;},
                copyFromBowerMain());
        }
    );

    // Copy every JS file contained in the folder
    var copyEveryJS = lazypipe()
        .pipe( getAllJS )
        .pipe( gulp.dest, './www/vendor/' );

    // Main Stream without MDK (because using symlink won't work)
    gulp.src(['../webapp/build/vendor/*/', '!../webapp/build/vendor/mdk*'])
        .pipe(gulpIf( getBowerFile, handleBower(), copyEveryJS() ) );

    // Add mdk libs
    return	gulp.src([
        fs.realpathSync('../webapp/build/vendor/mdk-html5-lib-core/'),
        fs.realpathSync('../webapp/build/vendor/mdk-html5-lib-ui')])
        .pipe(gulpIf( getBowerFile, handleBower(), copyEveryJS() ) );

	});

// Copy the whole webapp folder except vendors/ to cordova www
gulp.task('copy:webapp', false, function(){
    return gulp.src(['../webapp/build/**/*', '!../webapp/build/vendor/**', '!../webapp/build/vendor', 'config.xml'])
        .pipe( gulp.dest('./www/') );
});

// Copy the whole pictures folder
gulp.task('copy:pictures', false, function(){
    return gulp.src( packageNPM.platforms.map( function(p){return './pictures/' + p + '/**/*';} ),
        {
            base: './pictures'
        })
        .pipe( gulp.dest('./platforms/') );
});

// Copy the cordovafork/ folder
gulp.task('copy:cordovafork', false, function(){
    return gulp.src(packageNPM.platforms.map( function(p){return './cordovafork/' + p + '/**/*';} ),
        {
            base: './cordovafork'
        })
        .pipe( gulp.dest('./platforms/') );
});



// *****************************************************************************
// ********************* MISC **************************************************
// *****************************************************************************

// Process HTML depending on build configuration : specific comments are replaced
// to modify html for build
gulp.task('processhtml', false, function(){
    return gulp.src('../webapp/build/index.html')
        .pipe( processHTML() )
        .pipe( gulp.dest('./www/') );
});



// *****************************************************************************
// ********************* FIX ***************************************************
// *****************************************************************************


// Fixes iOS ressource folders name, while waiting for mvn archetype:generate to
// update it on generation
gulp.task('rename:ios:resources', false, function(){

    // Pictures
    try{
        fs.renameSync( './pictures/ios/${artifactId}', './pictures/ios/' + config.project_name );
    }catch(e){
        if ( e.code != 'ENOENT' ){
            console.log("WARN: pictures/ios/${artifactId} folder could not be renamed");
        }
    }

});

// Fixes Cordova hooks permissions (overwritten by Maven when deploying)
gulp.task('files:permissions:hooks', false, function(){

    try{
        fs.chmodSync('./hooks/after_plugin_add/010_register_plugin.js', '755');
    }catch(e){}

    try{
        fs.chmodSync('./hooks/after_plugin_rm/010_deregister_plugin.js', '755');
    }catch(e){}

});



// =============================================================================
// =================== PLUGINS =================================================
// =============================================================================

/**
 * Returns 'globs' pointing to JS overrides in bower.json
 *
 * @param {string} bowerfileURL URL of the bower file to load
 * @param {string} vendorRoot Root folder for source vendors to override
 */
function getOverrides(bowerfileURL, vendorRoot){
    try{
        fs.accessSync( bowerfileURL, fs.R_OK );
        var bower = JSON.parse( fs.readFileSync(bowerfileURL).toString() );
    }catch(e){
        console.log("Bower file can't be read.");
        return [];
    }
    if ( ! ("overrides" in bower) ){
        return [];
    }

    var files = [];

    for( var vendor in bower.overrides ){
        if ( bower.overrides.hasOwnProperty( vendor ) ){
            var mainFiles = bower.overrides[vendor].main;
            if ( ! (mainFiles instanceof Array) ){
                mainFiles = [ mainFiles ];
            }

            mainFiles.forEach(function(file){
                files.push( path.join( vendorRoot, vendor, file ) );
            });
        }
    }
    return files;
}


/**
 * Returns the bower.json or .bower.json name if it exists for a
 * vedor, false otherwise
 *
 * @param {File} file  Vinyl file from a gulp stream, pointing towards a vendor folder
 */
function getBowerFile(file){
    try{
        fs.accessSync( path.join(file.path, 'bower.json'), fs.R_OK );
    }catch(e){
        try{
            fs.accessSync( path.join(file.path, '.bower.json'), fs.R_OK );
        }catch(e){
            return false;
        }
        return '.bower.json';
    }
    return 'bower.json';
}


/**
 * Using vinyl-fs that provides a Read stream of Vinyl Files.
 * On each new File received, we push it to the "main" stream
 */
function getAllJS(){
    return through.obj(function(file, enc, cb){

        var self = this;

        vfs.src( file.path + "/**/*.js", {cwd:"", base: path.dirname(file.path)} )
            .on('end', function(){
                cb();
            })
            .on('error', function(e){
                cb(e);
            })
            .on('data', function(f){
                self.push(f);
            });

    });
}


/**
 * Streams every JS file in the main section of bower file
 */
function readBower(){
    return through.obj(function(file, enc, cb){

        var JS;
        var self = this;
        var main = file.data.main;

        if ( ! (main instanceof Array) ){
            main = [ file.data.main ];
        }

        async.each( main, function(item, cbMain){

            vfs.src( path.join(file.path, item), {cwd:"", base: path.dirname(file.path)} )
                .on('end', function(){
                    cbMain();
                })
                .on('error', function(e){
                    cb(e);
                })
                .on('data', function(f){
                    self.push(f);
                });

        }, function(err){
            cb(err);
        });

    });
}
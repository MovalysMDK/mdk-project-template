'use strict';

module.exports = function(grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);


    /**
     * Load in our build configuration file.
     */
    var userConfig = require('./grunt.config.js');


    userConfig.platformsDir = [];

    userConfig.platforms.forEach(function(element,index,array){
        userConfig.platformsDir.push(element+'/**');
    });

    grunt.log.writeln('Platforms selected: '+userConfig.platforms);

    // ##################################################################################
    // ########## GRUNT CONFIGURATION  ##################################################
    // ##################################################################################

    /**
     * This is the configuration object Grunt uses to give each plugin its
     * instructions.
     */
    var taskConfig = {
        /**
         * We read in our `package.json` file so we can access the package name and
         * version. It's already there, so we don't repeat ourselves here.
         */
        pkg: grunt.file.readJSON('package.json'),

        // =======================================================
        // ========  CLEAN  ======================================
        // =======================================================

        /**
         * The directories to delete when `grunt clean` is executed.
         */
        clean: {
            cordova: {
                src: ['www']
            },
            options: {
                'no-write': true
            }
        },

        // =======================================================
        // ========  COPY into build_dir   =======================
        // =======================================================

        /**
         * The `copy` task just copies files from A to B. We use it here to copy
         * our project assets (images, fonts, etc.) and javascripts into
         * `build_dir`, and then to copy the assets to `compile_dir`.
         */
        copy: {
            webapp: {
                files: [{
                    cwd: '../webapp/build/', src: ['**','!vendor/**'],
                    dest: 'www/',
                    expand: true
                }, {
                    src: ['config.xml'],
                    dest: 'www/',
                    expand: true
                }]
            },
            pictures: {
                files: [{
                    cwd: 'pictures', src: ['<%= platformsDir %>'],
                    dest: 'platforms/',
                    expand: true,
                    rename: function(dest, src) {
                        return dest + src.replace(/\${artifactId}/, '<%= project_name %>');
                    }
                }]
            },
            cordovafork: {
                files: [{
                    cwd: 'cordovafork', src: ['<%= platformsDir %>'],
                    dest: 'platforms/',
                    expand: true
                }]
            }
        },

        copyVendorFiles:{
            files:{
                cwd:'../webapp/build/',
                vendors:['vendor/*'],
                dest:'www/',
                bowerFile:'../webapp/bower.json'
            }
        },

        // =======================================================
        // ========  INDEX.HTML ==================================
        // =======================================================

        'processhtml': {
            'buildCordova': {
                files: {
                    'www/index.html' : ['../webapp/build/index.html']
                }
            }
        },

        // =======================================================
        // ========  REMOVE CONSOLE JS ===========================
        // =======================================================
        removeLoggingCalls: {
            files: 'www/src/**/*.js',
            options:{
                methods:['info','debug'],
                strategy: function(statement){
                    return '/* ' +statement+' */';
                }
            }
        },

        // =======================================================
        // ========  RUN CORDOVA CLI ===========================
        // =======================================================


        cordovacli: {
            options: {
                path: '.'
            },
            init: {
                options: {
                    command: ['platform','plugin','build'],
                    platforms: '<%= platforms %>',
                    plugins: '<%= plugins %>',
                    path: '.',
                    id: '<%= project_name %>',
                    name: '<%= project_name %>'
                }
            },
            initPlugins: {
                options: {
                    command: ['plugin'],
                    action: 'add',
                    plugins: '<%= plugins %>',
                    path: '.',
                    id: '<%= project_name %>',
                    name: '<%= project_name %>'
                }
            },
            run_ios: {
                options: {
                    command: ['build','run'],
                    platforms: ['ios']
                }
            },
            run_android: {
                options: {
                    command: ['build','run'],
                    platforms: ['android']
                }
            },
            build: {
                options: {
                    command: 'build',
                    platforms: '<%= platforms %>'
                }
            }

//            add_platforms: {
//                options: {
//                    command: 'platform',
//                    action: 'add',
//                    platforms: ['ios', 'android']
//                }
//            },
//            add_plugins: {
//                options: {
//                    command: 'plugin',
//                    action: 'add',
//                    plugins: [
//                        'battery-status',
//                        'camera',
//                        'console',
//                        'contacts',
//                        'device',
//                        'device-motion',
//                        'device-orientation',
//                        'dialogs',
//                        'file',
//                        'geolocation',
//                        'globalization',
//                        'inappbrowser',
//                        'media',
//                        'media-capture',
//                        'network-information',
//                        'splashscreen',
//                        'vibration'
//                    ]
//                }
//            },
//            build_ios: {
//                options: {
//                    command: 'build',
//                    platforms: ['ios']
//                }
//            },
//            build_android: {
//                options: {
//                    command: 'build',
//                    platforms: ['android']
//                }
//            },
//            emulate_android: {
//                options: {
//                    command: 'emulate',
//                    platforms: ['android'],
//                    args: ['--target','Nexus5']
//                }
//            }
        }

    };

    grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));


    // ##################################################################################
    // ########## GRUNT TASKS  ##########################################################
    // ##################################################################################



    // =======================================================
    // ========  BUILD =======================================
    // =======================================================


    /**
     * The default task is to build and compile.
     */
    grunt.registerTask('default', ['build']);

    grunt.registerTask('init', [
        'npm-install',
        'cordovacli:init',
        'build'
    ]);

    grunt.registerTask('initPlugins', [
        'cordovacli:initPlugins'
    ]);

    grunt.registerTask('prepareBuild', [
        'clean:cordova',
        'copy:cordovafork',
        'copy:webapp',
        'copy:pictures',
        'copyVendorFiles',
        'processhtml:buildCordova',
        'removeLoggingCalls'
    ]);

    /**
     * The `build` task gets your app ready to run for development and testing.
     */
    grunt.registerTask('build', [
        'prepareBuild',
        'cordovacli:build'
    ]);

    grunt.registerTask('run-android', [
        'build',
        'cordovacli:run_android'
    ]);

//    grunt.registerTask('cordova', function(target) {
////        if (target === 'compile') {
////            return grunt.task.run([
////                'clean:cordova',
////                'compile',
////                'copy:compileCordova',
//////                'bowercopy:buildCordova',
////                'processhtml:buildCordova'
////            ]);
////        }
//        grunt.task.run([
//            'clean:cordova',
//            'copy:cordova',
//            'copyVendorFiles',
//            'processhtml:buildCordova',
//            'removeLoggingCalls'
//        ]);
//    });


    // =======================================================
    // ========  COPY ONLY JS VENDOR FILES ==========
    // =======================================================
    grunt.registerMultiTask('copyVendorFiles', 'Copy main vendor files', function() {

        var self = this;
        grunt.log.writeln(this.data.cwd);

        grunt.file.expand({cwd:self.data.cwd,matchBase:true},self.data.vendors).forEach(function(filepath) {
//          this.files.vendors.forEach(function(filepath) {
            var bowerFile = self.data.cwd+'/'+filepath+'/bower.json';
            if (!grunt.file.exists(bowerFile)) {
                bowerFile = self.data.cwd+'/'+filepath+'/.bower.json';
            }
            var dependencyFound = false;

            if (grunt.file.exists(bowerFile)) {
                grunt.log.writeln('Reading '+bowerFile);
                var mainPart = grunt.file.readJSON(bowerFile).main;
//                grunt.log.writeln('Reading done');
                if(mainPart instanceof Array){
                    mainPart.forEach(function(JSFile){
                        var destination = self.data.dest+'/'+filepath+'/'+JSFile;
                        var origin = self.data.cwd+'/'+filepath+'/'+JSFile;
                        grunt.log.writeln('Copying ' + origin+' into '+destination);
                        grunt.file.copy(origin, destination);
                        dependencyFound=true;
                    });
                }
                else if(mainPart){
                    var destination = self.data.dest+'/'+filepath+'/'+mainPart;
                    var origin = self.data.cwd+'/'+filepath+'/'+mainPart;
                    grunt.log.writeln('Copying ' + origin+' into '+destination);
                    grunt.file.copy(origin, destination);
                    dependencyFound = true;
                }
            }
            
            if(!dependencyFound){
            	//include all JS
            	grunt.log.writeln("will copy all the files matching "+filepath+"/*.js");
                grunt.file.expand({cwd:self.data.cwd,matchBase:true},filepath+"/*.js").forEach(function(jsfilepath) {
                    var jsdestination = self.data.dest+'/'+jsfilepath;
                    var jsorigin = self.data.cwd+'/'+jsfilepath;
                    grunt.log.writeln('Copying ' + jsorigin+' into '+jsdestination);
                    grunt.file.copy(jsorigin, jsdestination);
                    dependencyFound = true;
                });
            }
        });

        grunt.log.writeln('Will check overrides...');

        grunt.file.expand(self.data.bowerFile).forEach(function(filepath) {
            grunt.log.writeln('Reading BOWER FILE:'+filepath);
            var overridesList = grunt.file.readJSON(filepath).overrides;

            if (overridesList) {
                for (var key in overridesList) {
                    if (overridesList.hasOwnProperty(key)) {
                        var jsFile = overridesList[key].main;
                        if (jsFile instanceof Array) {
                            jsFile.forEach(function (currFile) {
                                var destination = self.data.dest + '/vendor/' + key + '/' + currFile;
                                var origin = self.data.cwd + '/vendor/' + key + '/' + currFile;
                                grunt.log.writeln('Copying ' + origin + ' into ' + destination);
                                grunt.file.copy(origin, destination);
                            });
                        }
                        else {
                            var destination = self.data.dest + '/vendor/' + key + '/' + jsFile;
                            var origin = self.data.cwd + '/vendor/' + key + '/' + jsFile;
                            grunt.log.writeln('Copying ' + origin + ' into ' + destination);
                            grunt.file.copy(origin, destination);
                        }
                    }
                }
            }
        });
    });
};

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
        // ========  CALL SUB GRUNTFILES =========================
        // =======================================================


        run_grunt: {
            options: {
            },
            initWebapp: {
                options: {
                    task: ['init'],

                    // log child console output
                    log: true,

                    // indent child console output with this string
                    indentLog: '  |  ',

                    process: function(res){
                        if (res.fail){
                            grunt.log.error(res.file+' failed...');
                            grunt.log.error(res.error);
                        }
                    }
                },
                src: ['webapp/Gruntfile.js']
            },
            buildWebapp: {
                options: {
                    task: ['build'],

                    // log child console output
                    log: true,

                    // indent child console output with this string
                    indentLog: '  |  ',

                    process: function(res){
                        if (res.fail){
                            grunt.log.error(res.file+' failed...');
                            grunt.log.error(res.error);
                        }
                    }
                },
                src: ['webapp/Gruntfile.js']
            },
            runWebapp: {
                options: {
                    task: ['watch'],

                    // log child console output
                    log: true,

                    // indent child console output with this string
                    // indentLog: '  |  ',

                    process: function(res){
                        if (res.fail){
                            grunt.log.error(res.file+' failed...');
                            grunt.log.error(res.error);
                        }
                    }
                },
                src: ['webapp/Gruntfile.js']
            },
            initCordova: {
                options: {
                    task: ['init'],

                    // log child console output
                    log: true,

                    // indent child console output with this string
                    indentLog: '  |  ',

                    process: function(res){
                        if (res.fail){
                            grunt.log.error(res.file+' failed...');
                            grunt.log.error(res.error);
                        }
                    }
                },
                src: ['cordova/Gruntfile.js']
            },
            buildCordova: {
                options: {
                    task: ['build'],

                    // log child console output
                    log: true,

                    // indent child console output with this string
                    indentLog: '  |  ',

                    process: function(res){
                        if (res.fail){
                            grunt.log.error(res.file+' failed...');
                            grunt.log.error(res.error);
                        }
                    }
                },
                src: ['cordova/Gruntfile.js']
            }
        },
        runAndroid: {
            options: {
                task: ['run-android'],

                // log child console output
                log: true,

                // indent child console output with this string
                indentLog: '  |  ',

                process: function(res){
                    if (res.fail){
                        grunt.log.error(res.file+' failed...');
                        grunt.log.error(res.error);
                    }
                }
            },
            src: ['cordova/Gruntfile.js']
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

    grunt.registerTask('init', [
        'npm-install',
        'run_grunt:initWebapp',
        'run_grunt:initCordova'
    ]);

    /**
     * The `build` task gets your app ready to run for development and testing.
     */
    grunt.registerTask('build', [
        'run_grunt:buildWebapp',
        'run_grunt:buildCordova'
    ]);

    grunt.registerTask('run-web', [
        'run_grunt:runWebapp'
    ]);
    grunt.registerTask('run-android', [
        'build',
        'run_grunt:runAndroid'
    ]);

};

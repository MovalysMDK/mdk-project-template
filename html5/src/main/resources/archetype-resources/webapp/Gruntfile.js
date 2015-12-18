'use strict';

module.exports = function(grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Time how long tasks take. Can help when optimizing build times
    require('time-grunt')(grunt);

    /**
     * Load in our build configuration file.
     */
    var userConfig = require('./build.config.js');

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
            web:{
                src: ['<%= build_dir %>/*','!<%= build_dir %>/vendor/**']
            },
            options: {
                'no-write': true
            }
        },

        // =======================================================
        // ========  HTML files ==> Angular templates  ===========
        // =======================================================

        /**
         * HTML2JS is a Grunt plugin that takes all of your template files and
         * places them into JavaScript files as strings that are added to
         * AngularJS's template cache. This means that the templates too become
         * part of the initial payload as one JavaScript file. Neat!
         */
        html2js: {
            /**
             * These are the templates from `src/app`.
             */
            app: {
                options: {
                    base: 'src/app'
                },
                src: ['<%= app_files.tpl %>'],
                dest: '<%= build_dir %>/templates-app.js'
            },
            fwk: {
                options: {
                    base: 'build/vendor/mdk-html5-lib-ui/lib',
                    rename: function (moduleName) {
                        return 'mfui/' + moduleName;
                    }
                },
                src: ['<%= fwk_files.tpl %>'],
                dest: '<%= build_dir %>/templates-fwk.js'
            }
        },

        // =======================================================
        // ========  SCSS files ==> 1 CSS file ===================
        // =======================================================
        // @see https://github.com/gruntjs/grunt-contrib-sass

        sass: {
            build: {
                src: ['<%= app_files.sass %>'],
                dest: '<%= build_dir %>/assets/styles/<%= pkg.name %>-<%= pkg.version %>.css',
                options: {
                    style: 'expanded',
                    loadPath: ['build/vendor/bootstrap-sass-official/assets/stylesheets']
                }
            },
            compile: {
                src: ['<%= app_files.sass %>'],
                dest: '<%= compile_dir %>/assets/styles/<%= pkg.name %>-<%= pkg.version %>.css',
                options: {
                    style: 'compressed',
                    loadPath: ['build/vendor/bootstrap-sass-official/assets/stylesheets']
                }
            }
        },


        // =======================================================
        // ========  add BOWER dependencies   ====================
        // =======================================================


//  https://www.npmjs.org/package/grunt-bower
//        bower: {
//            dev: {
//                dest: '<%= build_dir %>',
//                js_dest: '<%= build_dir %>/src/vendor',
//                css_dest: '<%= build_dir %>/assets/styles/vendor',
//                options: {
//                    /*                    packageSpecific: {
//                     sass-bootstrap: {
//                     dest: 'public/fonts',
//                     css_dest: 'public/css/bootstrap',
//
//                     }
//                     }
//                     */
//                    ignorePackages: ['sass-bootstrap']
//                }
//            }
//        },

//  https://github.com/yatskevich/grunt-bower-task
//        bower:{
//          install:{
//              options: {
//                  targetDir: '<%= build_dir %>/vendor',
//                  install: true,
//                  cleanTargetDir: false,
//                  cleanBowerDir: false,
//                  copy: true,
//                  verbose: true
//              }
//          }
//        },

//

        wiredep: {

            target: {

                src: [
                    // Point to the files that should be updated when you run `grunt wiredep`
                    '<%= build_dir %>/index.html'
                ],
                directory:'<%= build_dir %>/vendor',

                cwd: '',
                dependencies: true,
                devDependencies: true,
                exclude: ['<%= vendor_files.ignore %>'],
                fileTypes: {},
                ignorePath: '',
                overrides: {}
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
            buildAppAssets: {
                files: [
                    {
                        cwd: '<%= wiredep.target.directory %>', src: ['**/fonts/**'],
                        dest: '<%= build_dir %>/assets/fonts/',
                        expand: true,
                        flatten: true,
                        filter: 'isFile'
                    }, {
                        cwd: 'src/assets', src: ['**','!**/*.scss','!**/*.css'],
                        dest: '<%= build_dir %>/assets/',
                        expand: true
                    }, {
                        cwd: 'build/vendor/mdk-html5-lib-core/assets', src: ['**','!**/*.scss','!**/*.css'],
                        dest: '<%= build_dir %>/assets/',
                        expand: true
                    }, {
                        cwd: 'build/vendor/mdk-html5-lib-ui/assets', src: ['**','!**/*.scss','!**/*.css'],
                        dest: '<%= build_dir %>/assets/',
                        expand: true
                    },
                    {
                        cwd: 'src', src: ['index.html'],
                        dest: '<%= build_dir %>',
                        expand: true
                    }
                ]
            },
            buildAppjs: {
                files: [{
                    cwd: '.', src: ['<%= app_files.js %>'],
                    dest: '<%= build_dir %>/',
                    expand: true
                }]
            },
            compileAssets: {
                files: [{
                    cwd: '<%= build_dir %>/assets', src: ['**'],
                    dest: '<%= compile_dir %>/assets',
                    expand: true
                }]
            }
        },



//        copyVendorFiles:{
//            files:{
//                cwd:'<%= build_dir %>',
//                vendors:['vendor/**'],
//                dest:'<%= cordova_files.www %>'
//            }
//        },

        // =======================================================
        // ========  INDEX.HTML ==================================
        // =======================================================

        /**
         * The `index` task compiles the `index.html` file as a Grunt template. CSS
         * and JS files co-exist here but they get split apart later.
         */

        injector: {
            // build:{
            options: {
                //bowerPrefix:'bower',
                ignorePath:'<%= build_dir %>/',
                template: '<%= build_dir %>/index.html',
                addRootSlash:false
            },
            local_dependencies: {
                files: {
                    '<%= build_dir %>/index.html': [
                        '<%= build_dir %>/src/app/modules.js',
                        '<%= build_dir %>/src/app/app.js',
                        '<%= html2js.fwk.dest %>', //templates
                        '<%= html2js.app.dest %>', //templates
                        '<%= build_dir %>/src/app/**/*.js',
                        '<%= sass.build.dest %>'
                    ]
                }
            }/*,
             bower_dependencies: {
             files: {
             '<%= build_dir %>/index.html': ['bower.json']
             }
             }*/
//            },
//            buildCordova:{
//                options: {
//                    //bowerPrefix:'bower',
//                    ignorePath:'<%= cordova_files.www %>',
//                    starttag:'cordova',
//                    template: '<%= build_dir %>/index.html'
//                },
//                local_dependencies: {
//                    files: {
//                        '<%= cordova_files.www %>/index.html': [
//                            '<%= cordova_files.www %>/cordova.js'
//                        ]
//                    }
//                }
//             }
        },

        // =======================================================
        // ========  CONCAT css and js  ==========================
        // =======================================================

        /**
         * `grunt concat` concatenates multiple source files into a single file.
         */
        concat: {
            /**
             * The `build_css` target concatenates compiled CSS and vendor CSS
             * together.
             */
            compileCss: {
                src: [
//                    '<%= bower.dev.css_dest %>',
                    '<%= wiredep.target.directory %>/**/*.css',
                    '<%= sass.build.dest %>'
                ],
                dest: '<%= sass.compile.dest %>'
            },
            /**
             * The `compile_js` target is the concatenation of our application source
             * code and all specified vendor source code into a single file.
             */
            compileJs: {
                src: [
//                    '<%= bower.dev.js_dest %>',
                    '<%= wiredep.target.directory %>/**/*.js',
                    'module.prefix',
                    '<%= build_dir %>/src/app/app.js', '<%= build_dir %>/src/app/modules.js', '<%= build_dir %>/src/app/**/*.js',
                    '<%= html2js.app.dest %>',
                    '<%= html2js.fwk.dest %>',
                    'module.suffix'
                ],
                dest: '<%= compile_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.js'
            }
        },


        // =======================================================
        // ========  NG-MIN prepares for minify ==================
        // =======================================================

        /**
         * `ng-min` annotates the sources before minifying. That is, it allows us
         * to code without the array syntax.
         */
        ngmin: {
            compile: {
                files: [{
                    cwd: '<%= build_dir %>', src: ['<%= app_files.js %>'],
                    dest: '<%= build_dir %>',
                    expand: true
                }]
            }
        },

        // =======================================================
        // ========  MINIFY ======================================
        // =======================================================

        /**
         * Minify the sources!
         */
        uglify: {
            compile: {
                files: {
                    '<%= concat.compileJs.dest %>': '<%= concat.compileJs.dest %>'
                }
            }
        },

        // =======================================================
        // ========  REMOVE COMMENTS FROM JSON ===================
        // =======================================================

        removeComments: {
            files: {
                src: ['<%= build_dir %>/assets/**/*.json', '<%= build_dir %>/src/**/*.json']
            }
        },

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
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            src: [
                '<%= app_files.js %>',
                '<%= app_files.ignore %>'
            ],
            test: {
                options: {
                    jshintrc: 'src/test/.jshintrc'
                },
                src: [
                    '<%= app_files.jsunit %>'
                ]
            },
            gruntfile: {
                src: './Gruntfile.js'
            }
        },

        // =======================================================
        // ========  REMOVE CONSOLE JS ===========================
        // =======================================================
        removeLoggingCalls: {
            files: '<%= build_dir %>/src/**/*.js',
            options:{
                methods:['info','debug','warn','assert'],
                strategy: function(statement){
                    return '/* ' +statement+' */';
                }
            }
        },

        // =======================================================
        // ========  TESTS  ======================================
        // =======================================================

        /**
         * The Karma configurations.
         */
//        karma: {
//            options: {
//                configFile: '<%= build_dir %>/karma-unit.js',
//                logLevel: 'INFO'
//            },
//            unit: {
//                background: true
//            },
//            continuous: {
//                singleRun: true,
//                coverageReporter: {
//                    type: 'html',
//                    dir: 'coverage/'
//                }
//            }
//        },

        /**
         * This task compiles the karma template so that changes to its file array
         * don't have to be managed manually.
         */
//        karmaconfig: {
//            unit: {
//                src: [
//                    '<%= build_dir %>/**/*.js',
//                    '<%= html2js.app.dest %>',
//                    '<%= html2js.fwk.dest %>',
//                    '<%= test_files.js %>'
//                ]
//            }
//        },
//
//        shell: {
//            options: {
//                stdout: true
//            },
//            selenium: {
//                command: './selenium/start',
//                options: {
//                    stdout: false,
//                    async: true
//                }
//            },
//            protractorInstall: {
//                command: 'node ./node_modules/protractor/bin/webdriver-manager update'
//            },
//            npmInstall: {
//                command: 'npm install'
//            }
//        },
//
//        protractor: {
//            options: {
//                keepAlive: true,
//                configFile: './protractor.conf.js'
//            },
//            singlerun: {},
//            auto: {
//                keepAlive: true,
//                options: {
//                    args: {
//                        seleniumPort: 4444
//                    }
//                }
//            }
//        },


        // =======================================================
        // ========  SERVER and grunt watch  =====================
        // =======================================================

        /**
         * And for rapid development, we have a watch set up that checks to see if
         * any of the files listed below change, and then to execute the listed
         * tasks when they do. This just saves us from having to type "grunt" into
         * the command-line every time we want to see what we're working on; we can
         * instead just leave "grunt watch" running in a background terminal. Set it
         * and forget it, as Ron Popeil used to tell us.
         *
         * But we don't need the same thing to happen for all the files.
         */
        delta: {
            /**
             * By default, we want the Live Reload to work for all tasks; this is
             * overridden in some tasks (like this file) where browser resources are
             * unaffected. It runs by default on port 35729, which your browser
             * plugin should auto-detect.
             */
            options: {
                livereload: true
            },

            /**
             * When the Gruntfile changes, we just want to lint it. In fact, when
             * your Gruntfile changes, it will automatically be reloaded!
             */
            gruntfile: {
                files: 'Gruntfile.js',
                tasks: ['jshint:gruntfile'],
                options: {
                    livereload: false
                }
            },

            /**
             * When our JavaScript source files change, we want to run lint them and
             * run our unit tests.
             */
            jssrc: {
                files: [
                    '<%= app_files.js %>'
                ],
                tasks: [
                    'jshint',
                    'copy:buildAppjs',
                    'bowerDepToHtml',
                    'injector'
                ]
            },

            /**
             * When assets are changed, copy them. Note that this will *not* copy new
             * files, so this is probably not very useful.
             */
            assets: {
                files: [
                    'src/assets/**/*',
                    'build/vendor/mdk-html5-lib-core/assets/**/*',
                    'build/vendor/mdk-html5-lib-ui/assets/**/*'
                ],
                tasks: [
                    'jshint',
                    'sass:build',
                    'copy:buildAppAssets',
                    'bowerDepToHtml',
                    'injector'
                ]
            },
            /**
             * When assets are changed, copy them. Note that this will *not* copy new
             * files, so this is probably not very useful.
             */
            framework: {
                files: [
                    'build/vendor/mdk-html5-lib-core/lib/**/*',
                    'build/vendor/mdk-html5-lib-ui/lib/**/*'
                ],
                tasks: [
                    'jshint',
                    'run_grunt:build_mdk',
                    'sass:build',
                    'bowerDepToHtml',
                    'injector'
                ]
            },
            /**
             * When index.html changes, we need to compile it.
             */
            html: {
                files: ['<%= app_files.html %>'],
                tasks: [
                    'bowerDepToHtml',
                    'injector'
                ]
            },

            /**
             * When our templates change, we only rewrite the template cache.
             */
            tpls: {
                files: [
                    '<%= app_files.tpl %>'
                ],
                tasks: [
                    'clean:web',
                    'html2js',
                    'jshint',
                    'sass:build',
                    'copy:buildAppAssets',
                    'copy:buildAppjs',
                    'bowerDepToHtml',
                    'injector'
                ]
            }

            /**
             * When a JavaScript unit test file changes, we only want to lint it and
             * run the unit tests. We don't want to do any live reloading.
             */
//            jsunit: {
//                files: [
//                    '<%= app_files.jsunit %>'
//                ],
//                tasks: ['jshint:test', 'karma:unit:run'], //'karma:unit:run'
//                options: {
//                    livereload: false
//                }
//            }
        },

        /**
         * Run the app in a webserver to test it
         */
        connect: {
            devbuildserver: {
                options: {
                    port: 8000,
                    hostname: '0.0.0.0',
                    base: './build',
                    keepalive: false,
                    middleware: function(connect, options) {
                        return [
                            connect.static(String(options.base)),
                            connect.directory(String(options.base))
                        ];
                    }
                }
            },
            devcompileserver: {
                options: {
                    port: 8000,
                    hostname: '0.0.0.0',
                    base: './bin',
                    keepalive: false,
                    middleware: function(connect, options) {
                        return [
                            connect.static(String(options.base)),
                            connect.directory(String(options.base))
                        ];
                    }
                }
            },
            testserver: {
                options: {
                    port: 9999,
                    hostname: '0.0.0.0',
                    base: './bin'
                }
            }
        },


        // =======================================================
        // ========  Build MFCore and MFUI  =====================
        // =======================================================

        run_grunt: {
            options: {
            },
            build_mdk: {
                options: {
                    task: ['default'],

                    // log child console output
                    log: true,

                    // indent child console output with this string
                    indentLog: '  |  ',

                    process: function (res) {
                        if (res.fail) {
                            grunt.log.error(res.file + ' failed...');
                            grunt.log.error(res.error);
                        }
                    }
                },
                src: ['build/vendor/mdk-html5-lib-core/Gruntfile.js', 'build/vendor/mdk-html5-lib-ui/Gruntfile.js']
            }
        }

    };

    grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));


    // ##################################################################################
    // ########## GRUNT TASKS  ##########################################################
    // ##################################################################################



    // =======================================================
    // ========  BUILD =======================================
    // =======================================================


    grunt.registerTask('bowerDepToHtml', function() {
        grunt.log.write('Injecting bower dependencies into index.html ...\nIf "wiredep" fails, run "bower install" and try again.');
        return grunt.task.run(['wiredep']);
    });


    /**
     * The default task is to build and compile.
     */
    grunt.registerTask('default', ['build']);

    /**
     * The `build` task gets your app ready to run for development and testing.
     */
    grunt.registerTask('build-dev', [
        'run_grunt:build_mdk',
        'build'
    ]);

    grunt.registerTask('build', [
        'clean:web',
        'html2js',
        'jshint',
        'sass:build',
        'copy:buildAppAssets',
        'copy:buildAppjs',
        'removeComments',
        'bowerDepToHtml',
        'injector'
    ]);
    /**
     * The `webserver` task build the app and run it in a webserver
     */
    grunt.registerTask('webserver-build', [
        'build',
        'connect:devbuildserver:keepalive'
    ]);

    grunt.registerTask('init', ['npm-install','build']);


    // =======================================================
    // ========  WATCH  ======================================
    // =======================================================

    /**
     * In order to make it safe to just compile or copy *only* what was changed,
     * we need to ensure we are starting from a clean, fresh build. So we rename
     * the `watch` task to `delta` (that's why the configuration var above is
     * `delta`) and then add a new task called `watch` that does a clean build
     * before watching for changes.
     */
    grunt.renameTask('watch', 'delta');
    grunt.registerTask('watch', [
        'build',
//        'karmaconfig',
//        'karma:unit:start',
        'connect:devbuildserver',
        'delta'
    ]);
    grunt.registerTask('watch-dev', [
         'build-dev',
//       'karmaconfig',
//       'karma:unit:start',
         'connect:devbuildserver',
         'delta'
     ]);


    // =======================================================
    // ========  COMPILE  ======================================
    // =======================================================

    /**
     * The `compile` task gets your app ready for deployment by concatenating and
     * minifying your code.
     */
    grunt.registerTask('compile', [
        'build',
        'removeLoggingCalls'
//        'test:unit',
//        'copy:compileAssets', //TODO to debug
//        'sass:compile',
//        'ngmin',
//        'concat:compileCss',
//        'concat:compileJs',
//        'uglify',
//        'injector'
    ]);//TODO debug this Grunt task

    /**
     * The `webserver` task build the app and run it in a webserver
     */
    grunt.registerTask('webserver-compile', [
        'compile',
        'connect:devbuildserver:keepalive'
    ]);

    // =======================================================
    // ========  TESTS  ======================================
    // =======================================================

    /**
     * The 'test' task runs the unit tests and closes browsers
     */
//    grunt.registerTask('test', [
//        'build',
//        'karmaconfig',
//        'karma:unit:start',
//        'connect:devbuildserver'
////        'karma:continuous'
//    ]);

    /**
     * The 'test' task runs the unit tests and closes browsers
     */
//    grunt.registerTask('test:unit', [
//        'karmaconfig',
//        'karma:continuous'
//    ]);

    /**
     * The `test:2e2` task compile and run e2e test.
     */
//    grunt.registerTask('test:e2e', [
//        'compile',
//        'shell:protractorInstall',
//        'connect:testserver',
//        'protractor:singlerun'
//    ]);
//

    /**
     * In order to avoid having to specify manually the files needed for karma to
     * run, we use grunt to manage the list for us. The `karma/*` files are
     * compiled as grunt templates for use by Karma. Yay!
     */
//    grunt.registerMultiTask('karmaconfig', 'Process karma config templates', function() {
//        var jsFiles = filterForJS(this.filesSrc);
//
//        grunt.file.copy('./karma-unit.tpl.js', grunt.config('build_dir') + '/karma-unit.js', {
//            process: function(contents) {
//                return grunt.template.process(contents, {
//                    data: {
//                        scripts: jsFiles
//                    }
//                });
//            }
//        });
//    });



    /**
     * A utility function to get all app JavaScript sources.
     */
//    var filterForJS = function filterForJS(files) {
//        return files.filter(function(file) {
//            return file.match(/\.js$/);
//        });
//    };



        // =======================================================
        // ========  COPY ONLY JS VENDOR FILES ==========
        // =======================================================
    grunt.registerMultiTask('copyVendorFiles', 'Copy main vendor files', function() {

        var self = this;
        grunt.log.writeln(this.data.cwd);

        grunt.file.expand({cwd:self.data.cwd,matchBase:true},self.data.vendors).forEach(function(filepath) {
//          this.files.vendors.forEach(function(filepath) {
            var bowerFile = self.data.cwd+'/'+filepath+'/.bower.json';
            if (!grunt.file.exists(bowerFile)) {
                bowerFile = self.data.cwd+'/'+filepath+'/bower.json';
            }

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
                    });
                }
                else if(mainPart){
                    var destination = self.data.dest+'/'+filepath+'/'+mainPart;
                    var origin = self.data.cwd+'/'+filepath+'/'+mainPart;
                    grunt.log.writeln('Copying ' + origin+' into '+destination);
                    grunt.file.copy(origin, destination);
                }
            }
        });

    });



    // =======================================================
    // ========  CUSTOM TASK: remove JSON comments  ==========
    // =======================================================


    grunt.registerMultiTask('removeComments', 'Remove comments from JSON files', function() {
        var removeComments = function(json) {

            var tokenizer = /"|(\/\*)|(\*\/)|(\/\/)|\n|\r/g,
                in_string = false,
                in_multiline_comment = false,
                in_singleline_comment = false,
                tmp, tmp2, new_str = [], ns = 0, from = 0, lc, rc
                ;

            tokenizer.lastIndex = 0;

            while ((tmp = tokenizer.exec(json)) !== null) {
                lc = RegExp.leftContext;
                rc = RegExp.rightContext;
                if (!in_multiline_comment && !in_singleline_comment) {
                    tmp2 = lc.substring(from);
                    if (!in_string) {
                        tmp2 = tmp2.replace(/(\n|\r|\s)*/g,'');
                    }
                    new_str[ns++] = tmp2;
                }
                from = tokenizer.lastIndex;

                if (tmp[0] === '\"' && !in_multiline_comment && !in_singleline_comment) {
                    tmp2 = lc.match(/(\\)*$/);
                    if (!in_string || !tmp2 || (tmp2[0].length % 2) === 0) { // start of string with ", or unescaped " character found to end string
                        in_string = !in_string;
                    }
                    from--; // include " character in next catch
                    rc = json.substring(from);
                }
                else if (tmp[0] === '/*' && !in_string && !in_multiline_comment && !in_singleline_comment) {
                    in_multiline_comment = true;
                }
                else if (tmp[0] === '*/' && !in_string && in_multiline_comment && !in_singleline_comment) {
                    in_multiline_comment = false;
                }
                else if (tmp[0] === '//' && !in_string && !in_multiline_comment && !in_singleline_comment) {
                    in_singleline_comment = true;
                }
                else if ((tmp[0] === '\n' || tmp[0] === '\r') && !in_string && !in_multiline_comment && in_singleline_comment) {
                    in_singleline_comment = false;
                }
                else if (!in_multiline_comment && !in_singleline_comment && !(/\n|\r|\s/.test(tmp[0]))) {
                    new_str[ns++] = tmp[0];
                }
            }
            new_str[ns++] = rc;
            return new_str.join('');
        };

        this.files.forEach(function(file) {
            file.src.filter(function(filepath) {
                // Remove nonexistent files (it's up to you to filter or warn here).
                if (!grunt.file.exists(filepath)) {
                    grunt.log.warn('Source file "' + filepath + '" not found.');
                    return false;
                } else {
                    return true;
                }
            }).forEach(function(filepath) {
                // Read and return the file's source.
                grunt.log.writeln('File ' + filepath);
                var jsonContent = grunt.file.read(filepath);
                grunt.file.write(filepath, removeComments(jsonContent));
            });
        });
    });

};

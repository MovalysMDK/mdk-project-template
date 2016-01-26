/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
    /**
     * The `build_dir` folder is where our projects are compiled during
     * development.
     */
    build_dir: 'build',

    /**
     * This is a collection of file patterns that refer to our app code (the
     * stuff in `src/`). These file paths are used in the configuration of
     * build tasks. `js` is all project javascript, less tests. `ctpl` contains
     * our reusable components' (`src/common`) template HTML files, while
     * `atpl` contains the same, but for our app's code. `html` is just our
     * main HTML file, `less` is our main stylesheet, and `unit` contains our
     * app's unit tests.
     */
    app_files: {
        js: ['src/app/app.js', 'src/app/modules.js', 'src/app/**/*.js'],
        tpl: ['src/app/**/*.html'],
        html: ['src/index.html'],
        sass: ['src/assets/styles/main.scss']
    },

    fwk_files: {
        tpl: ['build/vendor/mdk-html5-lib-ui/lib/**/*.html'],
        js: ['build/vendor/mdk-html5-lib-ui/lib/**/*.js', 'build/vendor/mdk-html5-lib-core/lib/**/*.js']
    }
};
/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
    project_name:'${artifactId}',
    platforms:['ios','android'],
    plugins: [
		'cordova-plugin-device@1.0.1',
        'cordova-plugin-file@3.0.0',
        'cordova-plugin-network-information@1.0.1',
        'cordova-plugin-geolocation@1.0.1',
        'cordova-plugin-splashscreen@2.1.0',
        'cordova-plugin-dialogs@1.1.1',
        'cordova-plugin-camera@1.2.0',
        'cordova-plugin-statusbar@1.0.1',
        'cordova-plugin-console@1.0.1',
        'cordova-plugin-inappbrowser@1.0.1',
        'cordova-plugin-vibration@1.2.0',
        'cordova-plugin-media-capture@1.0.1'
    ]
};
/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
    project_name:'${artifactId}',
    platforms:['ios','android'],
    plugins: [
		'https://github.com/apache/cordova-plugin-device.git',
        'https://github.com/apache/cordova-plugin-file.git',
        'https://github.com/apache/cordova-plugin-network-information.git',
        'https://github.com/apache/cordova-plugin-geolocation.git',
        'https://github.com/apache/cordova-plugin-splashscreen.git',
        'https://github.com/apache/cordova-plugin-dialogs.git',
        'https://git-wip-us.apache.org/repos/asf/cordova-plugin-console.git',
        'https://github.com/apache/cordova-plugin-camera.git',
        'https://github.com/apache/cordova-plugin-statusbar.git',
        'https://github.com/apache/cordova-plugin-console.git',
        'https://github.com/apache/cordova-plugin-inappbrowser.git',
        'https://github.com/apache/cordova-plugin-vibration.git',
        'https://github.com/apache/cordova-plugin-media-capture.git'
    ]
};
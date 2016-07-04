This directory is here to store two files used to generate a release version of your Android application:
0. the *.keystore file used during the Android compilation to sign the application
1. a release-signing.properties file used by cordova to communicate with the Android tools during the signing process

To create the *.keystore file, please follow the procedure given here:
https://developer.android.com/studio/publish/app-signing.html#signing-manually
You may then rename the release-signing.properties.example file found in this directory to release-signing.properties, and modify it to fit your *.keystore file.
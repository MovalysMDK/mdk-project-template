# Cordova project #
===================


## What is in this dir ##
-------------------------

*Location: <project>/cordova/README.md*

This directory <project>/cordova contains Apache Cordova project.


## What is Cordova ##
---------------------

Apache Cordova is a set of device APIs that allow a mobile app developer to access native device function such as the camera or accelerometer from JavaScript.
Combined with a UI framework such as Bootstrap, this allows a smartphone app to be developed with just HTML, CSS, and JavaScript.

When using the Cordova APIs, an app can be built without any native code (Java, Objective-C, etc) from the app developer.
Instead, web technologies are used, and they are hosted in the app itself locally (generally not on a remote http server).

And because these JavaScript APIs are consistent across multiple device platforms and built on web standards,
the app should be portable to other device platforms with minimal to no changes.

Apps using Cordova are still packaged as apps using the platform SDKs, and can be made available for installation from each device's app store.

Cordova provides a set of uniform JavaScript libraries that can be invoked, with device-specific native backing code for those JavaScript libraries.
Cordova is available for the following platforms: iOS, Android, Blackberry, Windows Phone, Palm WebOS, Bada, and Symbian.



To run the app (into a WebView) in a mobile device (real or emulator) see the next link: https://cordova.apache.org/docs/en/5.4.0/guide/cli/index.html



## Quick Start  ##
-------------------------

BEFORE STARTING : Cordova works well on any device, and a Cordova project initialised on a mac can be copied and used
                  on a windows platform without any issue.
                  HOWEVER it is deeply recommended to use a mac for iOs testing, and windows8 for windows8 & wp8 testing,
                  simply because iOs debugging requires xCode & Safari, and because wp8 debug requires visual
                  studio 2013 or higher.




### STEP 0 : install needed software ###
----------------------------------------

You will need npm & bower installed.

0. Install [Node.js] (http://nodejs.org/)

1. `$ sudo npm install -g cordova`

2. `$ npm install -g plugman`

### STEP 1 : config the project script ###
-------------------------------------------------------

1. `$ cd <project>/cordova`

2. update the file build.config.js


### STEP 2 : initialize the platform needed and its plugins ###
-----------------------------------------------

`$ gulp init`


#### for iOs ####
-----------------

    requires installation of XCode




#### for android ####
---------------------

- requires installation of Android SDK

    `$ export PATH=${PATH}:xxxx/adt-bundle/sdk/platform-tools:xxx/adt-bundle/sdk/tools`

    `$ echo 'export PATH=xxxx/adt-bundle/sdk/platform-tools:xxx/adt-bundle/sdk/tools:"$PATH"' >> ~/.profile `


- requires installation of Ant and addition to $PATH

    `ant -version                                                # Demonstrate builtin version`

    ` cd ~/Downloads                                              # Let's get into your downloads folder.`

    ` tar -xvzf apache-ant-xxx-bin.tar.gz                         # Extract the folder`

    ` sudo mkdir -p /usr/local                                    # Ensure that /usr/local exists`

    ` sudo cp -rf apache-ant-xxx-bin /usr/local/apache-ant        # Copy it into /usr/local`

    ` export PATH=/usr/local/apache-ant/bin:"$PATH"               # Add the new version of Ant to current terminal session`

    ` echo 'export PATH=/usr/local/apache-ant/bin:"$PATH"' >> ~/.profile  # Add the new version of Ant to future terminal sessions`

    ` ant -version                                                # Demonstrate new version of ant`


#### for windows 8 and windows phone 8 ####
----------------------

if one of these errors occurs: 
	'check_reqs.js' not found
	'create.js' not found
	'update.js' not found

Check if the file exists in : 
- for windows 8 app => C:\Users\<MyUser>\.cordova\lib\windows8\cordova\3.5.0\windows8\bin
- for windows phone 8 app => C:\Users\<MyUser>\.cordova\lib\wp\cordova\3.5.0\wp8\bin

1. if the files do not exist remove the windows folder, it will be downloaded again by the cordova cli
2. if the files exist then you may have a space in your path :
	=> please edit the files [ check_reqs.bat, create.bat, update.bat ] and put quotes around the tested FILEPATH
	
	IF EXIST "%full_path%create.js"
	IF EXIST "%full_path%check_reqs.js"
	IF EXIST "%full_path%update.js


#### about Cordova plugins ####
---------------------------------------


#### plugin-device (required) ####
-----------------------

- `$ cordova plugin add https://github.com/apache/cordova-plugin-device.git`
- to get information about the device, with the properties:
    - `device.cordova`
    - `device.model`
    - `device.name`
    - `device.platform`
    - `device.uuid`
    - `device.version`


#### file (required) ####
---------------------

- `$ cordova plugin add https://github.com/apache/cordova-plugin-file.git`



#### SQLite ####
----------------

- for Android and iOS : `$ cordova plugin add https://github.com/brodysoft/Cordova-SQLitePlugin.git`
- for WP8 : `$ cordova plugin add https://github.com/brodybits/Cordova-SQLitePlugin-WP-2014.01.git`


#### network-information ####
-----------------------------

- `$ cordova plugin add https://github.com/apache/cordova-plugin-network-information.git`
- to get network information, with the property `connection.type`



#### geolocation ####
---------------------

- `$ cordova plugin add https://github.com/apache/cordova-plugin-geolocation.git`
- available methods:
    - `navigator.geolocation.getCurrentPosition()`
    - `navigator.geolocation.watchPosition()`
    - `navigator.geolocation.clearWatch()`


#### splashscreen ####
---------------------

- displays and hides a splash screen during application launch
- `$ cordova plugin add https://github.com/apache/cordova-plugin-splashscreen.git`
- available methods:
    - `splashscreen.show()`
    - `splashscreen.hide()`


#### dialogs ####
---------------------

- `$ cordova plugin add https://github.com/apache/cordova-plugin-dialogs.git`


#### console ####
------------------

- `$ cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-console.git`


#### camera ####
-----------------

- `$ cordova plugin add https://github.com/apache/cordova-plugin-camera.git`


#### inappbrowser ####
-----------------

- `$ cordova plugin add https://github.com/apache/cordova-plugin-inappbrowser.git`

#### status bar ####
-----------------------

- `$ cordova plugin add https://github.com/apache/cordova-plugin-statusbar.git`


### STEP 3 : build ###
----------------------

`$ cordova build`



### STEP 4 : Emulate and debug application ###
----------------------------------------------

#### for android ####
----------------------

- via command line:
    - `$ cordova emulate android`  or  `$ cordova run android`
    - to get the logs: `$ adb logcat`

- to run via Eclipse:
    1. Launch Eclipse
    2. File > New > Project...
    3. Android Project from Existing Code
    4. select `<project>/cordova/platforms/android`
    5. to get the logs: open the perspective "DDMS" and see the view "LogCat"


#### for iOS ####
-----------------

- via command line:
    - `$ cordova emulate ios`    or    `$ cordova run ios`
    - to get the logs: `$ tail -f "./platforms/ios/cordova/console.log"`

- from xCode:
    - open the file `<project>/cordova/platforms/ios/<project>.xcodeproj`

- TIP: [get javascript logs via "Safari's Web Inspector"](http://phonegap-tips.com/articles/debugging-ios-phonegap-apps-with-safaris-web-inspector.html)


#### for windows8 ####
-----------------

- via command line:
    - `$ cordova emulate windows8`    or    `$ cordova run windows8`

- via Visual Studio: open in visual studio the project `<project>\cordova\platforms\windows8`
    - Only available on Windows 8 OS
    - requires installation of Visual Studio 2013 (or higher)
    - requires for the project to be on a local disk (not in a shared space, even in a VM)


#### for windows phone 8 ####
-----------------------------

- via command line:
    - `$ ccordova emulate wp8`    or    `cordova run wp8`

- via Visual Studio:
    - open the file `<project>\cordova\platforms\wp8\CordovaWP8AppProj`

1. open in visual studio `<project>\cordova\platforms\wp8` as a C# project
    - Only available on Windows 8 os
    - requires installation of Visual Studio 2013 (or higher)
    - requires for the project to be on a local disk (not in a shared space, even in a VM)
2. debugging can be made difficult on this mobile platform. 
    To enable the possibility to log your javascript / html code, you may use Weinre tool 
        http://people.apache.org/~pmuellr/weinre-docs/latest/
    Follow these steps to setup the tool:
    - install it with npm
        npm install weinre -g
    - start the server
        weinre --boundHost -all- --debug -true
    - enable your application with the tool by adding this line in the head section of the index.html of you application
         <script src="http://[the server ip]:8080/target/target-script-min.js#anonymous"></script>
    - you will then have access to a set of tools at the address 127.0.0.1:8080 on your server.

# Web configuration project #
===========================

## What is in this dir ##
-------------------------

*Location: <project>/webapp/src/assets/config/README.md*

### Use the config in the app ###
-----------------

` MFInitConfiguration.onSuccess(function(){`
`     var myValue = MFConfigurationService.getValue('key_name','Default value if not found in config');`
` });`


### Selecting the database ###
-----------------

The configuration file, you can select a base type depending on the platform and version.

#### Directive Info ####
-----------------

The configuration is done with the JSON object `databasetype`. If selector identical with MDK configuration, an overload occurs. Priority is also applied to the operators (see description of arguments).

#### Usage ####
-----------------

`"dataBaseType":{
        "platform":[
            {
                "version": "[numberVersion]",
                "comparator":"operator",
                "database":"databaseType"
            },
…
        ],
	…
}`


#### Arguments ####
-----------------

- `platform`: android, ios, wp8, windows8, web, label target platforms


- `version`: (optional for * operator) version is an integer or a decimal. The separator is the point.


- `comparator`
    - `=` Rule applies if the version is equal
    - `<` Rule applies if the version is less
    - `>` Rule applies if the version is higher
    - `>=` Rule applies if the version is greater than or equal operator
    - `<=` Rule applies if the version is less than or equal
    - `*` Rule applies in all cases

    Priority is applied to the operators. The priority ranges from 1 to 3, level 1 is the highest level.

    - Level 1 : `=`
    - Level 2 : `<`, `>`, `<=`, `<=`
    - Level 3 : `*`

    Note: If there are two operators at the same level the last replaces the previous


- `database`: databaseType can have three different values

    - `WEBSQL` uses the internal database of the Webview
    - `SQLITE` uses a third-party database
    - `NOSQL` uses the indexedDB database internal of the webview

    ##### Storage technologies Compatibility

    This project uses WebSQL and SQLite, and will use IndexedDB soon.
    Here is a recap of the compatibility of all these storage technologies :

   |                 	| Indexed DB(Webview) 	| WebSQL \* (Webview) 	|  SQLite 	|
   |                :	|:                   :	|:                  :	|:  (OS) :	|
   |-----------------	|---------------------	|--------------------	|---------	|
   | iOS             	|                     	| YES                	| YES(1)   	|
   | Android v2-4.3  	|                     	| YES                	| YES(1)   	|
   | Android v4.4+   	| YES                 	| YES                	| NO    	|
   | Windows Phone 8 	| YES                 	|                    	| YES (2) 	|
   | Windows 8       	| YES                 	|                    	| YES (3) 	|

    (*) : WebSQL is implemented in browsers using SQLite
    (1) : A Cordova plugin is available (see https://github.com/brodysoft/Cordova-SQLitePlugin.git)
    (2) : Thanks to a Cordova plugin (Cordova-SQLitePlugin-WP-2013.12.git, see "DAO DAL Project" below or https://github.com/lite4cordova/Cordova-SQLitePlugin-WP-2013.12)
    (3) : Thanks to a WinRT component and a JS namespace (SQLite3-WinRT, see "DAO DAL Project" below or https://github.com/tommck/SQLite3-WinRT)

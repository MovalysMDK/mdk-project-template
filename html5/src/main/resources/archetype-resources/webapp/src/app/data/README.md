## Storage technologies Compatibility

See: *<project>/webapp/src/assets/config/README.md*

Section: *Storage technologies Compatibility*

## DAO DAL Project:

In Cordova, install plugins:
	cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-device.git
	cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-console.git
	cordova plugin add https://github.com/lite4cordova/Cordova-SQLitePlugin-WP-2013.12.git


For Android and iOS:
		Do not Use the plugin SQLite, you must deleted this plugin or modified the link in this file:
		platforms\android\.staging\www\cordova_plugins.js

For WP8:
	Problem detection requirements:
		Problem:
			cordova platform add wp8
				Checking wp8 requirements...

				C:\Users\Cabelguen\AppData\Roaming\npm\node_modules\cordova\node_modules\q\q.js:126
									throw e;
										  ^
				Error: Requirements check failed: Please install the .NET Framwork v4.0.30319 (in the latest windows phone SDK's).
				Make sure the "msbuild" command in your path is pointing to  v4.0.30319 of msbuild as well (inside C:\Windows\Microsoft.NET\Framework\v4.0.30319).
					at C:\Users\Cabelguen\AppData\Roaming\npm\node_modules\cordova\src\metadata\
				wp8_parser.js:62:22
					at ChildProcess.exithandler (child_process.js:641:7)
					at ChildProcess.EventEmitter.emit (events.js:98:17)
					at maybeClose (child_process.js:735:16)
					at Process.ChildProcess._handle.onexit (child_process.js:802:5)
		Fix:
		You must change the test .NET in the file UserHome\.cordova\lib\wp\cordova\3.3.0\wp8\bin\check_reqs.js
			Replace:
				var msversion = output.match(/Microsoft\s\(R\)\s+Build\sEngine\s[a-z]+\s4\.0\.30319/i);
				to
				var msversion = output.match(/.NET\sFramework\,\s\w*\s4.0/);

	Slow transaction, it takes 1 minute to 60 actions:
		Problem:
			Une exception de type 'System.Security.SecurityException' s'est produite dans mscorlib.ni.dll et n'a pas ÈtÈ traitÈe avant une limite managÈe/native
			Une exception de premiËre chance de type 'System.IO.IsolatedStorage.IsolatedStorageException' s'est produite dans mscorlib.ni.dll
			Une exception de type 'System.IO.IsolatedStorage.IsolatedStorageException' s'est produite dans mscorlib.ni.dll et n'a pas ÈtÈ traitÈe avant une limite managÈe/native
			---- DEBUG ASSERTION FAILED ----
			---- Assert Short Message ----

			---- Assert Long Message ----


				at Sqlite3.winOpen(sqlite3_vfs pVfs, String zName, sqlite3_file pFile, Int32 flags, Int32& pOutFlags)
				at Sqlite3.winOpen(sqlite3_vfs pVfs, String zName, sqlite3_file pFile, Int32 flags, Int32& pOutFlags)
				at Sqlite3.sqlite3OsOpen(sqlite3_vfs pVfs, String zPath, sqlite3_file pFile, Int32 flags, Int32& pFlagsOut)
				at Sqlite3.pagerOpentemp(Pager pPager, sqlite3_file& pFile, Int32 vfsFlags)
				at Sqlite3.openSubJournal(Pager pPager)
				at Sqlite3.subjournalPage(PgHdr pPg)
				at Sqlite3.pager_write(PgHdr pPg)
				at Sqlite3.sqlite3PagerWrite(PgHdr pDbPage)
				at Sqlite3.sqlite3BtreeInsert(BtCursor pCur, Byte[] pKey, Int64 nKey, Byte[] pData, Int32 nData, Int32 nZero, Int32 appendBias, Int32 seekResult)
				at Sqlite3.sqlite3VdbeExec(Vdbe p)
				at Sqlite3.sqlite3Step(Vdbe p)
				at Sqlite3.sqlite3_step(Vdbe pStmt)
				at SQLite3.Step(Vdbe stmt)
				at <ExecuteDeferredQuery>d__0.MoveNext()
				at List`1..ctor(IEnumerable`1 collection)
				at Enumerable.ToList(IEnumerable`1 source)
				at SQLiteCommand.ExecuteQuery()
				at SQLiteConnection.Query2(String query, Object[] args)
				at <>c__DisplayClass2.<executeSqlBatch>b__0()
				at SQLiteConnection.RunInTransaction(Action action)
				at SQLitePlugin.executeSqlBatch(String options)
				at RuntimeMethodHandle.InvokeMethod(Object target, Object[] arguments, Signature sig, Boolean constructor)
				at RuntimeMethodInfo.UnsafeInvokeInternal(Object obj, Object[] parameters, Object[] arguments)
				at RuntimeMethodInfo.Invoke(Object obj, BindingFlags invokeAttr, Binder binder, Object[] parameters, CultureInfo culture)
				at MethodBase.Invoke(Object obj, Object[] parameters)
				at BaseCommand.InvokeMethodNamed(String methodName, Object[] args)
				at BaseCommand.InvokeMethodNamed(String callbackId, String methodName, Object[] args)
				at <>c__DisplayClass6.<ProcessCommand>b__2()
				at ThreadHelper.ThreadStart_Context(Object state)
				at ExecutionContext.RunInternal(ExecutionContext executionContext, ContextCallback callback, Object state, Boolean preserveSyncCtx)
				at ExecutionContext.Run(ExecutionContext executionContext, ContextCallback callback, Object state, Boolean preserveSyncCtx)
				at ExecutionContext.Run(ExecutionContext executionContext, ContextCallback callback, Object state)
				at ThreadHelper.ThreadStart()


For Windows8:
	VS 2012 Express to install the Windows SDK: http://msdn.microsoft.com/en-us/windows/desktop/hh852363.aspx
	SQLite Installation following the link: https://github.com/tommck/SQLite3-WinRT
	Warning: You must add a reference to the SQLite3Component cordova project and define the dependency between the two projects. Cordova <- SQLite3Component.
	Problem dynamic insertion of HTML is not permitted:
		Problem:

		Fix:
			In angularjs, replace all references: "div.innerHTML" and encapsulate: "MSApp.execUnsafeLocalFunction(function(){ ... )};"


Adding cordova.js in the index.html file is not ok. must override the file with the merge cordova.
Problem in build with "grunt build" and "grunt cordova", I use a JS file only for this windows8 so jsHint test does not work.
I added a file copy in Gruntfile.js for initdao

----------------------------------------------------------------------------------------------------------------------------------------------------------------
OLD NOTE:

Global:
	Ajouter le plugin console, nÈcessaire pour la remontÈ de log pour iOS dans Xcode
	Ajouter le plugin device et file pour la gestion Database dans Cordova

	cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-device.git
	cordova plugin add https://git-wip-us.apache.org/repos/asf/cordova-plugin-console.git


Android:
	Status: OK
	La compilation en ligne de cordova ne supporte pas le plugin SQLite nÈcessaire pour WP8.
	VÈrifier la prÈsence du plugin:
		cordova plugin list
	Si il exite:
		cordova plugin remove org.lite4cordova.sqlitePlugin
	Modifier le fichier www/js/services.js
		db = window.openDatabase("test", data.data.version, data.data.description, 10000);

		if(db) success();

		// db = sqlitePlugin.openDatabase("test", '', '', '', success(), console.log("Test Error 2"));

iOS:
	Status: NOK
	Pas testÈ sous l'environnement. plateforme iOS non disponible. En thÈorie aucun changement par rapport ‡ Android, le code est identique.

WP8
	Status: OK
	Un problËme est prÈsent lors de la crÈation wp8 via le CLI
		cordova platform add wp8
			Checking wp8 requirements...

			C:\Users\Cabelguen\AppData\Roaming\npm\node_modules\cordova\node_modules\q\q.js:126
								throw e;
									  ^
			Error: Requirements check failed: Please install the .NET Framwork v4.0.30319 (in the latest windows phone SDK's).
			Make sure the "msbuild" command in your path is pointing to  v4.0.30319 of msbuild as well (inside C:\Windows\Microsoft.NET\Framework\v4.0.30319).
				at C:\Users\Cabelguen\AppData\Roaming\npm\node_modules\cordova\src\metadata\
			wp8_parser.js:62:22
				at ChildProcess.exithandler (child_process.js:641:7)
				at ChildProcess.EventEmitter.emit (events.js:98:17)
				at maybeClose (child_process.js:735:16)
				at Process.ChildProcess._handle.onexit (child_process.js:802:5)

		Vous devez modifier le test du .NET dans le fichier C:\Users\Cabelguen\.cordova\lib\wp\cordova\3.3.0\wp8\bin\check_reqs.js
			Remplacer:
				var msversion = output.match(/Microsoft\s\(R\)\s+Build\sEngine\s[a-z]+\s4\.0\.30319/i);
				par
				var msversion = output.match(/.NET\sFramework\,\s\w*\s4.0/);

	Installation du plugin SQLite
		cordova plugin add https://github.com/lite4cordova/Cordova-SQLitePlugin-WP-2013.12.git
	plus recent cordova plugin add https://github.com/huserben/Cordova-WP-SqlitePlugin
	modifier le fichier www/js/services.js
		//db = window.openDatabase("test", data.data.version, data.data.description, 10000);

		//if(db) success();

		 db = sqlitePlugin.openDatabase("test", '', '', '', success(), console.log("Test Error 2"));
	Inspiration: http://tol8.blogspot.fr/2013/11/support-sqlite-on-cordova-320-android.html


Windows 8:
	Status: NOK
	Un problËme est prÈsent avec Angular sous environnement Windows 8 Store (Exception ms-apps: angular.js)
	Il faut modifier la ligne ci-dessous dans le fichier angular.js
		div.innerHTML = '<div>&#160;</div>' + element; // IE insanity to make NoScope elements work!
		par
		MSApp.execUnsafeLocalFunction(function(){ div.innerHTML = '<div>&#160;</div>' + element}); // IE insanity to make NoScope elements work!
		Il faut le faire pour tous les div.innerHTML sinon y a plantage sur les appels. Il faut encapsuler la commande.
	Pour l'installation de la base SQLite suivre la procÈdure ci-dessous:
		Inspiration: http://ismaeldoesphonegap.blogspot.fr/2013/08/creating-sqlite-driven-app-for-windows.html
		source plus rÈcente: https://github.com/tommck/SQLite3-WinRT
	BUG lors de la compilation sous VS 2012 Express: https://github.com/doo/SQLite3-WinRT/pull/52
	Pour VS 2012 Express installer le Windows SDK: http://msdn.microsoft.com/en-us/windows/desktop/hh852363.aspx
	Ne pas oublier d'ajouter une rÈfÈrence sur le projet cordova dans VS2012, il faut ajouter dans zone projet de ajouter une rÈfÈrence le SQLite3Component
----------------------------------------------------------------------------------------------------------------------------------------------------------------






## Cordova

The directory cordova contains PhoneGap (aka Apache Cordova) project.

To run the app (into a WebView) in a mobile device (real or emulator) see the next link: http://docs.phonegap.com/en/3.3.0/guide_cli_index.md.html

While it is not necessary to modify the projects mobile platforms, do not need to upload them to the repository. To generate them, execute:

    cd cordova
    phonegap create ios (necessary have iOS SDK - Xcode)
    phonegap create android (necessary have Android SDK)

## Webapp

The directory webapp is a fork of [ng-boilerplate] (https://github.com/ngbp/ng-boilerplate) at commit 83801dc2ca32e4ae09c4b0fc4566f116a7803874

With the next changes:

* Add task connect to run app in a webserver
* Add Cordova config file (config.xml)
* Update project info in the package.json file
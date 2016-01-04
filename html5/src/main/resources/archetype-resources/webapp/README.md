# Web application project #
===========================

## What is in this dir ##
-------------------------

*Location: <project>/webapp/README.md*

This directory webapp is a fork of [ng-boilerplate] (https://github.com/ngbp/ng-boilerplate) at commit 83801dc2ca32e4ae09c4b0fc4566f116a7803874,
with the next changes:

* Add task connect to run app in a webserver
* Add Cordova config file (config.xml)
* Update project info in the package.json file



## Quick Start ##
-----------------

0. Install [Node.js] (http://nodejs.org/)
1. `$ cd <project>`
2. `$ npm config set registry http://registry.npmjs.org`  (only if first MDK project)
3. `$ sudo npm -g install grunt-cli karma bower`  (only if first MDK project)
4. `$ sudo gem install --http-proxy http://ntes.proxy.corp.sopra:8080 sass`  (only if first MDK project)
5. `$ cd <project>/webapp`
6. `$ sudo npm update`
7. `$ bower update`
8. `$ grunt watch`


If problems occur at step 6 `$ sudo npm update` with the grunt script, try: 
    1. `$ sudo rm -r node_modules`
    2. `$ sudo npm cache clean`
    3. `$ sudo npm update`.


If problems occur at step 7 `$ bower update`, check that you have in the file '~/.bowerrc' :
```js
{
  "analytics": false,
  "proxy" : "http://ntes.proxy.corp.sopra:8080",
  "https-proxy" : "http://ntes.proxy.corp.sopra:8080",
  "strict-ssl": false,
  "registry": {
        "search": ["http://nansrvintc2.ntes.fr.sopra:8000/","https://bower.herokuapp.com/"]
  }
}
```

Finally, open `http://localhost:8000` in your browser.



### Overall Directory Structure ###
-----------------

At a high level, the structure looks roughly like this:

```
webapp
  |- src
  |  |- app
  |  |  |- <app logic in JS files>
  |  |- assets
  |  |  |- <static files>
  |  |- test
  |  |  |- <unit testing scripts>
  |
  |- build
  |  |- vendor
  |  |  |- angular
  |  |  |- angular-bootstrap  (directives to easy the use of Bootstrap whithin AngularJS)
  |  |  |- bootstrap-sass-official
  |  |  |- mdk-html5-lib-core
  |  |  |- mdk-html5-lib-ui
  |
  |- .bowerrc
  |- bower.json
  |
  |- build.config.js
  |- gulpfile.js
  |
  |- package.json
```

What follows is a brief description of each entry, but most directories contain
their own `README.md` file with additional documentation, so browse around to
learn more.

- `src/` - application javascript sources. [Read more &raquo;](src/README.md)
- `build/vendor` - third-party libraries. [Bower](http://bower.io) will install
  packages here.
- `.bowerrc` - the Bower configuration file. This tells Bower to install
  components into the `build/vendor` directory.
- `bower.json` - this is our project configuration for Bower and it contains the
  list of Bower dependencies we need.
- `build.config.js` - our customizable build settings used by gulpfile.js script; see "The Build System"
  below.
- `gulpfile.js` - our build script;

- `node_modules` - NodeJS plugins (including Grunt, Karma, JSHint, ...) installed by the command `$ sudo npm update`
- `package.json` - metadata about the app, used by NPM and our build script. Our
  NPM dependencies are listed here.

- `module.prefix` and `module.suffix` - our compiled application script is
  wrapped in these, which by default are used to place the application inside a
  self-executing anonymous function to ensure no clashes with other libraries.
- `karma-unit.tpl.js` - template of karma-unit.js, configuration file used in
   unit testing with Karma
- `protactor.conf.js` - configuration of Protactor (tests e2e using Selenium)


### Detailed Installation ###
-----------------

This section provides a little more detailed understanding of what goes into
getting `ngBoilerplate` up and running. Though `ngBoilerplate` is really simple
to use, it might help to have an understanding of the tools involved here, like
Node.js and Grunt and Bower. If you're completely new to highly organized,
modern JavaScript development, take a few short minutes to read [this overview
of the tools](tools.md) before continuing with this section.

Okay, ready to go? Here it is:

`ngBoilerplate` uses [Grunt](http://gruntjs.org) as its build system, so
[Node.js](http://nodejs.org) is required. Also, Grunt by default no longer comes
with a command-line utility and Karma and Bower must end up in your global path
for the build system to find it, so they must be installed independently. Once
you have Node.js installed, you can simply use `npm` to make it all happen:

```sh
$ npm -g install grunt-cli karma bower
```

If you're on Linux (like I am) then throw `sudo` in front of that command.  If
you're on Windows, then you're on your own.

Next, you can either clone this repository using Git, download it as a zip file
from GitHub, or merge the branch into your existing repository. Assuming you're
starting from scratch, simply clone this repository using git:

```sh
$ git clone git://github.com/joshdmiller/ng-boilerplate my-project-name
$ cd my-project-name
```

And then install the remaining build dependencies locally:

```sh
$ npm install
```

This will read the `dependencies` (empty by default) and the `devDependencies`
(which contains our build requirements) from `package.json` and install
everything needed into a folder called `node_modules/`.

There are many Bower packages used by `ngBoilerplate`, like Twitter Bootstrap
and Angular UI, which are listed in `bower.js`. To install them into the
`vendor/` directory, simply run:

```sh
$ bower install
```

In the future, should you want to add a new Bower package to your app, run the
`install` command:

```sh
$ bower install packagename --save-dev
```

The `--save-dev` flag tells Bower to add the package at its current version to
our project's `bower.js` file so should another developer download our
application (or we download it from a different computer), we can simply run the
`bower install` command as above and all our dependencies will be installed for
us. Neat!

Technically, `ngBoilerplate` is now ready to go.

However, prior to hacking on your application, you will want to modify the
`package.json` file to contain your project's information. Do not remove any
items from the `devDependencies` array as all are needed for the build process
to work.

To ensure your setup works, launch grunt:

```sh
$ grunt watch
```

The built files are placed in the `build/` directory by default. Open the
`build/index.html` file in your browser and check it out! Because everything is
compiled, no XHR requests are needed to retrieve templates, so until this needs
to communicate with your backend there is no need to run it from a web server.

`watch` is actually an alias of the `grunt-contrib-watch` that will first run a
partial build before watching for file changes. With this setup, any file that
changes will trigger only those build tasks necessary to bring the app up to
date. For example, when a template file changes, the templates are recompiled
and concatenated, but when a test/spec file changes, only the tests are run.
This allows the watch command to complete in a fraction of the time it would
ordinarily take.

In addition, if you're running a Live Reload plugin in your browser (see below),
you won't even have to refresh to see the changes! When the `watch` task detects
a file change, it will reload the page for you. Sweet.

When you're ready to push your app into production, just run the `compile`
command:

```sh
$ grunt compile
```

This will concatenate and minify your sources and place them by default into the
`bin/` directory. There will only be three files: `index.html`,
`your-app-name.js`, and `your-app-name.css`. All of the vendor dependencies like
Bootstrap styles and AngularJS itself have been added to them for super-easy
deploying. If you use any assets (`src/assets/`) then they will be copied to
`bin/` as is.

Lastly, a complete build is always available by simply running the default
task, which runs `build` and then `compile`:

```sh
$ grunt
```

### Build vs. Compile ###
-----------------


To make the build even faster, tasks are placed into two categories: build and
compile. The build tasks (like those we've been discussing) are the minimal
tasks required to run your app during development.

Compile tasks, however, get your app ready for production. The compile tasks
include concatenation, minification, compression, etc. These tasks take a little
bit longer to run and are not at all necessary for development so are not called
automatically during build or watch.

To initiate a full compile, you simply run the default task:

```sh
$ grunt
```

This will perform a build and then a compile. The compiled site - ready for
uploading to the server! - is located in `bin/`, taking a cue from
traditional software development. To test that your full site works as
expected, open the `bin/index.html` file in your browser. Voila!

### Live Reload! ###
-----------------


`ngBoilerplate` also includes [Live Reload](http://livereload.com/), so you no
longer have to refresh your page after making changes! You need a Live Reload
browser plugin for this:

- Chrome - [Chrome Webstore](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei)
- Firefox - [Download from Live Reload](http://download.livereload.com/2.0.8/LiveReload-2.0.8.xpi)
- Safari - [Download from Live Reload](http://download.livereload.com/2.0.9/LiveReload-2.0.9.safariextz)
- Internet Explorer - Surely you jest.

Note that if you're using the Chrome version with `file://` URLs (as is the
default with `ngBoilerplate`) you need to tell Live Reload to allow it. Go to
`Menu -> Tools -> Extensions` and check the "Allow access to file URLs" box next
to the Live Reload plugin.

When you load your page, click the Live Reload icon in your toolbar and
everything should work magically. w00t!

If you'd prefer to not install a browser extension, then you must add the
following to the end of the `body` tag in `index.html`:

```html
<script src="http://localhost:35729/livereload.js"></script>
```


### Angular Plugin ###

See http://ng-inspector.org/
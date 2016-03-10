#!/usr/bin/env node

module.exports = function(context) {
  // make sure windows platform is part of build
  if (context.opts.platforms.indexOf('windows') < 0) {
    return;
  }

  var exec = require('child_process').exec;

  exec("cordova plugin add cordova-sqlite-legacy@0.7.17");

}

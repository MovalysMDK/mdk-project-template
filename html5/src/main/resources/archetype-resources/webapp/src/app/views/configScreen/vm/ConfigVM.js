'use strict';

angular.module('mfui').factory('ConfigVM', ['MFAbstractViewModel','MFUtils', function (MFAbstractViewModel, MFUtils) {

    var ConfigVM = function ConfigVM() {

        ConfigVM._Parent.call(this);


        var _username = null;
        var _password = null;
        var _serverUrl = null;
        var _workspaceColumns = null;

        Object.defineProperties(this, {
            username: {
                get: function() { return _username; },
                set: function(val) { _username = val; },
                configurable: false,
                enumerable: true
            },
            password: {
                get: function() { return _password; },
                set: function(val) { _password = val; },
                configurable: false,
                enumerable: true
            },
            serverUrl: {
                get: function() { return _serverUrl; },
                set: function(val) { _serverUrl = val; },
                configurable: false,
                enumerable: true
            },
            workspaceColumns: {
                get: function() { return _workspaceColumns; },
                set: function(val) { _workspaceColumns = val; },
                configurable: false,
                enumerable: true
            }
        });
    };
    MFUtils.extend(ConfigVM, MFAbstractViewModel);
    return ConfigVM;
}]);
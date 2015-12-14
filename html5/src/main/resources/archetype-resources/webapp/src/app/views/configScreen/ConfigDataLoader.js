'use strict';

/**
 *
 * Created by Sergio Contreras on 6/03/14.
 */
angular.module('mfui').factory('ConfigDataLoader', [ '$q', 'MFAbstractDataLoader', 'MFUtils', 'MFConfigurationService',
                                                     function( $q, MFAbstractDataLoader, MFUtils, MFConfigurationService) {

    var ConfigDataLoader = function ConfigDataLoader() {
        ConfigDataLoader._Parent.call(this);
    };

    MFUtils.extendFromInstance(ConfigDataLoader, MFAbstractDataLoader);

    ConfigDataLoader.prototype.reload = function( mfContext ) {
        var deferred = $q.defer();
        var data = {
                id: 0,
                username: MFConfigurationService.getValue('username', ''),
                password: MFConfigurationService.getValue('password', ''),
                serverUrl: MFConfigurationService.getValue('server_url', ''),
                workspaceColumns: MFConfigurationService.getValue('ws_columns', 2)
        };

        this.dataModel = data;
        var that = this;
        deferred.resolve({
            data: that.dataModel
        });
        return deferred.promise;
    };

    return new ConfigDataLoader();
}]);
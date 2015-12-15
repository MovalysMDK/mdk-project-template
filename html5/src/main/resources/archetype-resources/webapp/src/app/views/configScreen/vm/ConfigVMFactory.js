'use strict';

angular.module('mfui').factory('ConfigVMFactory', ['MFUtils', 'MFAbstractViewModelFactory', 'ConfigVM', function (MFUtils, MFAbstractViewModelFactory, ConfigVM) {

    var ConfigVMFactory = function ConfigVMFactory() {};

    MFUtils.extendFromInstance(ConfigVMFactory, MFAbstractViewModelFactory);

    ConfigVMFactory.prototype.createInstance = function() {
        var result = new ConfigVM();
        result.username = '';
        result.password = '';
        result.serverUrl = '';
        result.workspaceColumns = 2;
        return result;
    };

    ConfigVMFactory.singletonScope = true;

    ConfigVMFactory.prototype.updateViewModelWithDataLoader = function(viewModel, dataLoader) {
        var entity = dataLoader.dataModel;
        if (!entity) {
            entity = this.createInstance();
        }
        this.updateViewModelWithEntity(viewModel, entity);
    };

    ConfigVMFactory.prototype.updateEntityWithViewModel = function(entity, viewModel) {
        entity.username = viewModel.username;
        entity.password = viewModel.password;
        entity.serverUrl = viewModel.serverUrl;
        entity.workspaceColumns = viewModel.workspaceColumns;
    };

    //var modelEntity = AnimalDaoProxy.saveOrUpdateClient();
    ConfigVMFactory.prototype.updateViewModelWithEntity = function(viewModel, entity) {
        viewModel.username = entity.username;
        viewModel.password = entity.password;
        viewModel.serverUrl = entity.serverUrl;
        viewModel.workspaceColumns = entity.workspaceColumns;
    };

    return new ConfigVMFactory();
}]);
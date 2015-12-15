'use strict';

angular.module('mfui').controller('ConfigCtrl', ['$scope', 'ConfigVMFactory', 'MFFormScopeBuilder', 'ConfigDataLoader', 'SaveConfigAction',
                                                 function ($scope, ConfigVMFactory, MFFormScopeBuilder, ConfigDataLoader, SaveConfigAction) {

    $scope.viewConfig = {
            viewModelFactory: ConfigVMFactory,
            dataLoader: ConfigDataLoader,
            formName: 'configurationForm',
            cancelable: false,
            hasSubControlBar: false,
            saveAction: SaveConfigAction,
            viewName:'config',
            screenConfig: {
                //@generated-start[config-ctrl-exitState][X]
                exitState: null,
                //@generated-end
                exitOnSave: true,
                exitOnCancel: false,
                exitWithoutSaving: false,
                controlBarTitle: 'Config',
                hideControlBar: false
            }
    };

    MFFormScopeBuilder.init($scope).then(function(success){
        $scope.rootActions.goInEditionMode();
    },
    function(error){

    });
}]);
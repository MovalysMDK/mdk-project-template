/**
 * SaveDataAction
 * Created by Sergio Contreras on 02/04/14.
 */

'use strict';
angular.module('mfui').factory('SaveConfigAction', ['ConfigVMFactory', 'ConfigDataLoader', 'MFBaseAction', 'MFConfigurationService', '$injector',
    function(ConfigVMFactory, ConfigDataLoader, MFBaseAction, MFConfigurationService, $injector) {
        return {
            createInstance: function() {

                var action = MFBaseAction.createInstance({
                    atomic: true,
                    database: false,
                    type: 'SaveConfigAction'
                });

                /**
                 * Execute operations
                 **/
                action.doAction = function(context, params) {

                    try {
                        var viewModel = params.viewModel;
                        var entity = ConfigDataLoader.dataModel;
                        ConfigVMFactory.updateEntityWithViewModel(entity, viewModel);
                        MFConfigurationService.setValue('username', entity.username);
                        MFConfigurationService.setValue('password', entity.password);
                        MFConfigurationService.setValue('server_url', entity.serverUrl);
                        MFConfigurationService.setValue('ws_columns', entity.workspaceColumns);

                        ConfigVMFactory.updateViewModelWithEntity(viewModel, ConfigDataLoader.dataModel);
                        action.resolvePromise('data', context);

                    } catch (error) {
                        //Add error message to the context
                        context.addError('Error saving data: '+error.message);
                        action.rejectPromise(error, context);
                    }
                    return action;
                };

                return action;
            }

        };

    }
]);

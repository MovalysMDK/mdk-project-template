'use strict';

angular.module('view_splashscreen').controller('SplashScreenCtrl', ['$scope', '$location', 'MFControllerLauncher', 'MFViewScopeBuilder',  'MFConfigurationService',
    function ($scope, $location, MFControllerLauncher, MFViewScopeBuilder, MFConfigurationService) {

        $scope.initProgress = 0;
        $scope.maxInitProgress = 100;
        $scope.type = 'info';
        $scope.brieves = {};

        $scope.viewConfig = {
            viewName:'splashscreen',
            hasSubControlBar: false,
            screenConfig: {
                exitWithoutSaving: false,
                //@generated-start[splashscreen-exitState][X]
                exitState: null,
                //@generated-end
                hideControlBar: true
            }
        };

        var initListener = function (event) {
            var updateProgress = function() {
                $scope.initProgress = event.progress;
                if (event.task) {
                    if (event.type === event.constructor.Type.TASK_STARTED) {
                        $scope.brieves[event.task.taskName] = event.task.brief + '...';
                    } else if (event.type === event.constructor.Type.TASK_SUCCEEDED) {
                        $scope.brieves[event.task.taskName] = event.task.brief + ' (OK)';
                    } else if (event.type === event.constructor.Type.TASK_ABORTED) {
                        $scope.brieves[event.task.taskName] = event.task.brief + ' (aborted)';
                    } else if (event.type === event.constructor.Type.TASK_FAILED) {
                        $scope.brieves[event.task.taskName] = event.task.brief + ' (failed)';
                    }
                }
            };

            if($scope.$$phase) {
                updateProgress();
            } else {
                $scope.$apply(updateProgress);
            }
            return true;
        };

        MFViewScopeBuilder.init($scope, initListener).then(function() {
            setTimeout(function() {
                $scope.$apply(function() {
                    if (MFConfigurationService.userConfigIsValid()) {
                        $scope.rootActions.goExitState();
                    } else {
                        $scope.rootActions.go('config');
                    }
                });}, 0);
        }, function (event) {
            $scope.actions.rootActions.showNotifications(event.context.messages);
        });
    }]);

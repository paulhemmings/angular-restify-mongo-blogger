'use strict';

angular
    .module('MainApplicationModule')
    .controller('LoginController', ['$scope', '$rootScope', 'userService',
        function($scope, $rootScope, userService) {

            function login(user) {
                userService.login(user).then(function(response) {
                    if (response.success) {
                        // redirect to blogger.
                    };
                });
            }

            function create(user) {
                userService.create(user).then(function(response) {
                    if (response.success) {
                        // redirect to blogger.
                    };
                });
            }

            function exposeMethods(scope) {
                scope.login = login;
                scope.create = create;
            }

            function initialize() {
                exposeMethods($scope);
            }

            initialize();

            /*
             * How do you unit test private methods?
             * Expose them via a 'test' property
             */

            $scope.__test__ = {
              initialize: initialize,
              exposeMethods: exposeMethods
            };

        }]);

'use strict';

angular
    .module('MainApplicationModule')
    .controller('LoginController', ['$scope', '$rootScope', '$location', 'userService',
        function($scope, $rootScope, $location, userService) {

            function login(user) {
                userService.login(user).then(function(response) {
                    $location.path( "/blogger" );
                }, function(error) {
                    $scope.error = error.error;
                });
            }

            function create(user) {
                userService.create(user).then(function(response) {
                    if (response.success) {

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

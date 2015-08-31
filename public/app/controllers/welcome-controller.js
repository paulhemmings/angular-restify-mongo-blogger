'use strict';

angular
    .module('MainApplicationModule')
    .controller('WelcomeController', ['$scope', '$rootScope', '$location', 'userManager',
        function($scope, $rootScope, $location, userManager) {

            function handleEvents(root) {
                root.$on('users-loaded', function() {
                    $scope.users = userManager.users;
                });
                root.$on('user-authenticated', function() {
                    $location.path('/blogger');
                });
                root.$on('user-not-authenticated', function() {
                    userManager.loadUsers();
                });
            }

            function initialize() {
                handleEvents($rootScope);
                userManager.authenticateUser();
            }

            initialize();

            /*
             * How do you unit test private methods?
             * Expose them via a 'test' property
             */

            $scope.__test__ = {
              initialize: initialize
            };

        }]);

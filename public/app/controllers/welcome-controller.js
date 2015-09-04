'use strict';

angular
    .module('MainApplicationModule')
    .controller('WelcomeController', ['$scope', '$rootScope', '$location', 'userManager',
        function($scope, $rootScope, $location, userManager) {

            $scope.users = getUsers;

            function getUsers() {
                return userManager.users;
            }

            function handleAuthentication() {
                if (userManager.isAuthenticated()) {
                    $location.path('/blogger');
                } else {
                    userManager.loadUsers();
                }
            }

            function initialize() {
                userManager.authenticateUser().then(handleAuthentication);
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

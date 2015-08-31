'use strict';

angular
    .module('MainApplicationModule')
    .controller('LogoutController', ['$scope', '$rootScope', 'userManager', // '$cookies',
        function($scope, $rootScope, userManager /* ,$cookies */) {

            $scope.logout = logout;

            function logout() {
                // delete the cookie.
                // $cookies.remove('BloggerAuthenticationToken');
                // redirect to home page
                userManager.authenticateUser();
            }

            function handleEvents(root) {
                root.$on('user-not-authenticated', function() {
                    $location.path('/welcome');
                });
            }

            function initialize() {
                handleEvents($rootScope)
            }

            initialize();

            /*
             * How do you unit test private methods?
             * Expose them via a 'test' property
             */

            $scope.__test__ = {
              logout: logout
            };

        }]);

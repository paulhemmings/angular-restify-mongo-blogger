'use strict';

angular
    .module('MainApplicationModule')
    .controller('NavigationController', ['$scope', '$rootScope', '$location', 'userManager',
        function($scope, $rootScope, $location, userManager) {

            $scope.options = [];

            function buildOptions(authenticated) {
                $scope.options.length = 0;
                $scope.options.push({ key:"Home", url:"#/welcome", selected : false });
                if (authenticated) {
                  $scope.options.push({ key:"Logout", url:"#/logout", selected : false });
                } else {
                  $scope.options.push({ key:"Login", url:"#/login", selected : false });
                }
            }

            function handleEvents(root) {
                root.$on('user-authenticated', function() {
                    buildOptions(true);
                });
                root.$on('user-not-authenticated', function() {
                    buildOptions(false);
                });
                root.$on('page-reloaded', function() {
                    $scope.options.forEach(function(option) {
                      option.selected = (document.URL.indexOf(option.url) > 0);
                    })
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

'use strict';

angular
    .module('MainApplicationModule')
    .controller('WelcomeController', ['$scope', '$rootScope', '$location', 'userService',
        function($scope, $rootScope, $location, userService) {

            function initialize() {
                userService.get().then(function() {
                    $location.path( '/blogger');
                }, function() {
                    $location.path( '/login');
                });
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

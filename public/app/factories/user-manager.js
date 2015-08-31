'use strict';

/*
 * User Model manager.
 */

angular
    .module('MainApplicationModule')
    .factory('userManager', [ '$http', '$rootScope', 'userService', function($http, $rootScope, userService) {

      var manager = {
        users: [],
        authenticated: null
      };

      manager.loadUsers = function() {
          userService.all().then(function(response) {
              manager.users = response.data.users;
              $rootScope.$broadcast('users-loaded');
          });
      };

      manager.authenticateUser = function() {
          userService.get().then(function(response) {
              manager.authenticated = response.data;
              $rootScope.$broadcast('user-authenticated');
          }, function(error) {
              manager.authenticated = null;
              $rootScope.$broadcast('user-not-authenticated');
          });
      };

      return manager;

    }]);

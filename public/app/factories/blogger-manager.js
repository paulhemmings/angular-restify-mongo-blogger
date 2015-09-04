'use strict';

/*
 * Blogger Model manager.
 * Used to encapsulate all blogger model specific methods into single object
 * so they can be shared across the two controllers: main, and sidebar.
 * http://viralpatel.net/blogs/angularjs-service-factory-tutorial/
 */

angular
    .module('MainApplicationModule')
    .factory('bloggerManager', [ '$http', '$q', 'bloggerService', function($http, $q, bloggerService) {

      var manager = {
        blogs: [],
        selectedBlogs: []
      };


      manager.loadBlogs = function(username) {
          var deferred = $q.defer();
          bloggerService.listBlogs(username).then(function(response) {
              manager.blogs = response.data;
              deferred.resolve();
          });
          return deferred.promise;
      };

      manager.updateBlog = function(blog) {
        var deferred = $q.defer();
          bloggerService.updateBlog(blog).then(function() {
              manager.loadBlogs();
              deferred.resolve();
          });
          return deferred.promise;
      };

      manager.selectBlogs = function(blogs) {
          manager.selectedBlogs = blogs;
      };

      return manager;

    }]);

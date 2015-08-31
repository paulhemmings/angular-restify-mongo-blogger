'use strict';

/*
 * Blogger Model manager.
 * Used to encapsulate all blogger model specific methods into single object
 * so they can be shared across the two controllers: main, and sidebar.
 * http://viralpatel.net/blogs/angularjs-service-factory-tutorial/
 */

angular
    .module('MainApplicationModule')
    .factory('bloggerManager', [ '$http', '$rootScope', 'bloggerService', function($http, $rootScope, bloggerService) {

      var manager = {
        blogs: [],
        selectedBlogs: []
      };


      manager.loadBlogs = function(username) {
          bloggerService.listBlogs(username).then(function(response) {
              manager.blogs = response.data;
              $rootScope.$broadcast('blogs-loaded');
          });
      };

      manager.updateBlog = function(blog) {
          bloggerService.updateBlog(blog).then(function() {
              $rootScope.$broadcast('blog-created');
              manager.loadBlogs();
          });
      };

      manager.selectBlogs = function(blogs) {
          manager.selectedBlogs = blogs;
          $rootScope.$broadcast('blogs-selected');
      };

      return manager;

    }]);

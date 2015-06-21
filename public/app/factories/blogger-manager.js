'use strict';

/*
 * Model manager.
 * Used to encapsulate all model specific methods into single object
 * http://viralpatel.net/blogs/angularjs-service-factory-tutorial/
 */

angular
    .module('MainApplicationModule')
    .factory('bloggerManager', [ '$http', '$rootScope', 'bloggerService', function($http, $rootScope, bloggerService) {

      var manager = {
        blogs: [],
        selectedBlogs: []
      };


      manager.loadBlogs = function() {
          bloggerService.listBlogs().then(function(response) {
              manager.blogs = response.data;
              $rootScope.$broadcast('blogs-loaded');
          });
      };

      manager.updateBlog = function(blog) {
          bloggerService.updateBlog(blog).then(function(response) {
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

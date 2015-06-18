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
              if (response.data.success) {
                $rootScope.$broadcast('blog-created');  
              }
              manager.blogs = response.data.content;
              if (manager.blogs.length > 0) {
                  manager.selectedBlogs = [ manager.blogs[0] ];
              }
              $rootScope.$broadcast('blogs-loaded');
          });
      };

      manager.updateBlog = function(blog) {
          bloggerService.updateBlog(blog).then(function() {
            manager.loadBlogs();
          });
      };

      manager.selectBlogs = function(blogs) {
          manager.selectedBlogs = blogs;
          $rootScope.$broadcast('blogs-selected');
      }

      return manager;

    }]);

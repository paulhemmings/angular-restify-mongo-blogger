'use strict';

angular
    .module('MainApplicationModule')
    .controller('BloggerSidebarController', ['$scope', '$stateParams', 'bloggerManager', 'userManager',
        function($scope, $stateParams, bloggerManager, userManager) {

            $scope.blogs = blogs;
            $scope.selectBlog = selectBlog;
            $scope.userAuthenticated = userAuthenticated;

            function userAuthenticated() {
                return userManager.authenticated != null;
            }

            function selectBlog(blog) {
                if (blog == null || bloggerManager.selectedBlogs.indexOf(blog) !== -1) {
                    return bloggerManager.selectBlogs([]);
                }
                bloggerManager.selectBlogs([blog]);
            }

            function blogs() {
                return bloggerManager.blogs;
            }

            function initialize() {
                bloggerManager.loadBlogs($stateParams.username);
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

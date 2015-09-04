'use strict';

angular
    .module('MainApplicationModule')
    .controller('BloggerController', ['$scope', '$stateParams', 'bloggerManager', 'userManager',
        function($scope, $stateParams, bloggerManager, userManager) {

            $scope.selectedBlogs = [];

            $scope.updateBlog = updateBlog;
            $scope.userAuthenticated = userAuthenticated;
            $scope.blogSelected = blogSelected;
            $scope.selectedBlogs = selectedBlogs;

            function userAuthenticated() {
                return userManager.authenticated != null;
            }

            function blogSelected() {
                return bloggerManager.selectedBlogs && bloggerManager.selectedBlogs.length > 0;
            }

            function selectedBlogs() {
                return bloggerManager.selectedBlogs;
            }

            function updateBlog(blog) {
                bloggerManager.updateBlog(blog).then(function() {
                    $scope.newBlog = {};
                });
            }

            function initialize() {
                userManager.authenticateUser();
                bloggerManager.selectedBlogs.length = 0;
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

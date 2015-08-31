'use strict';

angular
    .module('MainApplicationModule')
    .controller('BloggerController', ['$scope', '$rootScope', '$stateParams', 'bloggerManager', 'userManager',
        function($scope, $rootScope, $stateParams, bloggerManager, userManager) {

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
                bloggerManager.updateBlog(blog);
            }

            function handleEvents(root) {
                root.$on('blog-created', function() {
                    $scope.newBlog = {};
                });
            }

            function initialize() {
                handleEvents($rootScope);
                userManager.authenticateUser();
                bloggerManager.selectedBlogs.length = 0;
            }

            initialize();

            /*
             * How do you unit test private methods?
             * Expose them via a 'test' property
             */

            $scope.__test__ = {
                handleEvents: handleEvents,
                initialize: initialize
            };

        }]);

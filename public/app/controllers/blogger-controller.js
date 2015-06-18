'use strict';

angular
    .module('MainApplicationModule')
    .controller('BloggerController', ['$scope', '$rootScope', 'bloggerManager',
        function($scope, $rootScope, bloggerManager) {

            $scope.selectedBlogs = [];

            function updateBlog(blog) {
                bloggerManager.updateBlog(blog);
            }

            function handleEvents(root) {
                root.$on('blog-created', function() {
                    $scope.newBlog = {};
                });
                root.$on('blogs-selected', function() {
                    $scope.selectedBlogs = bloggerManager.selectedBlogs;
                });
            }

            function exposeMethods(scope) {
                scope.updateBlog = updateBlog;
            }

            function initialize() {
                handleEvents($rootScope);
                exposeMethods($scope);
            }

            initialize();

            /*
             * How do you unit test private methods?
             * Expose them via a 'test' property
             */

            $scope.__test__ = {
                handleEvents: handleEvents,
                exposeMethods: exposeMethods,
                initialize: initialize
            };

        }]);

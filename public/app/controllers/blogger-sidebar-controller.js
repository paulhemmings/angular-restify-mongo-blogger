'use strict';

angular
    .module('MainApplicationModule')
    .controller('BloggerSidebarController', ['$scope', '$rootScope', 'bloggerManager',
        function($scope, $rootScope, bloggerManager) {

            $scope.blogs = [];

            function selectBlog(blog) {
                bloggerManager.selectBlogs([blog]);
            }

            function handleEvents(root) {
                root.$on('blogs-loaded', function() {
                    $scope.blogs = bloggerManager.blogs;
                });
            }

            function exposeMethods(scope) {
                scope.selectBlog = selectBlog;
            }

            function initialize() {
                bloggerManager.loadBlogs();
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

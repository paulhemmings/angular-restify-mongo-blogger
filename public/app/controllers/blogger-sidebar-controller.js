'use strict';

angular
    .module('MainApplicationModule')
    .controller('BloggerSidebarController', ['$scope', '$rootScope', '$stateParams', 'bloggerManager',
        function($scope, $rootScope, $stateParams, bloggerManager) {

            $scope.blogs = [];
            $scope.selectBlog = selectBlog;

            function selectBlog(blog) {
                if (bloggerManager.selectedBlogs.indexOf(blog) !== -1) {
                    return bloggerManager.selectBlogs([]);
                }
                bloggerManager.selectBlogs([blog]);
            }

            function handleEvents(root) {
                root.$on('blogs-loaded', function() {
                    $scope.blogs = bloggerManager.blogs;
                });
            }

            function initialize() {
                handleEvents($rootScope);
                bloggerManager.loadBlogs($stateParams.username);
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

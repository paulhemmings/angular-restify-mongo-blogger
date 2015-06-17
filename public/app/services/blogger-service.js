
/*
 * Data provider service.
 * Used to retrieve data from external service
 *
 * Style guide:
 * avoid using a variable and instead use chaining with the getter syntax
 * produces more readable code and avoids variable collisions or leaks.
 *
 */

angular
    .module('MainApplicationModule')
    .service('bloggerService', function($http) {

        function listBlogs() {
            return $http({
                url: '/blogs',
                method: "GET"
            });
        }

        function updateBlog(blog) {
            return $http({
                url: '/blog',
                data: blog,
                method: "PUT"
            });
        }

        function getBlog(blog) {
            return $http({
                url: '/blog/' + blog.id,
                data: blog,
                method: "GET"
            });
        }

        return {
            listBlogs: listBlogs,
            updateBlog: updateBlog,
            getBlog: getBlog
        };

    });
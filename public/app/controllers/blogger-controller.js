angular
    .module('MainApplicationModule')
    .controller('BloggerController', ['$scope', 'fileUpload', 'bloggerService',
        function($scope, fileUpload, bloggerService) {

            $scope.uploadFile = uploadFile;
            $scope.responseData = [];

            $scope.blogs = [];
            $scope.selectedBlog = [];


            $scope.updateBlog = updateBlog;
            $scope.selectBlog = selectBlog;

            function updateBlog(blog) {
                bloggerService.updateBlog(blog).then(function(response) {
                    bloggerService.listBlogs().then(loadBlogs);
                });
            }

            function selectBlog(blog) {
                bloggerService.getBlog(blog).then(loadSelected);
            }

            function handleUploadResponse(response) {
                // show response
                $scope.responseData.push(response.data);
                // re-load selected blog.
                bloggerService.listBlogs().then(loadBlogs);
            }

            function uploadFile() {
                fileUpload.uploadFileToUrl($scope.selectedFile, "/upload", {
                    'blog': $scope.selectedBlog
                }).then(handleUploadResponse);
            }

            function loadSelected(response) {
                $scope.selectedBlog = [response.data];
            }

            function loadBlogs(response) {
                $scope.blogs = response.data;
                $scope.selectedBlog = $scope.blogs;
            }

            function initialize() {
                bloggerService.listBlogs().then(loadBlogs);
            }

            initialize();

            /*
             * How do you unit test private methods?
             * Expose them via a "test" property
             */

            $scope['__test__'] = {
                handleUploadResponse: handleUploadResponse,
                loadBlogs: loadBlogs,
                uploadFile: uploadFile
            }

        }]);

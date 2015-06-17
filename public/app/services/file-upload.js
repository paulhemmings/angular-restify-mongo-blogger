/*
 * Upload a file
 *
 * Style Guide:
 *  service should return the original promise
 *  http://terussell85.github.io/blog/2013/12/23/the-angularjs-promise-anti-pattern-that-makes-me-cry/
 */

angular
    .module('MainApplicationModule')
    .service('fileUpload', ['$http', function ($http) {

        function uploadFileToUrl(files, uploadUrl, metatadata) {
            var fd = new FormData();
            if(files){
                for(var i =0; i < files.length; i++ ){
                    fd.append('file', files[i]);
                }
            }
            fd.append('meta', JSON.stringify(metatadata));
            return $http.post("/api/v1" + uploadUrl, fd, {
                transformRequest: angular.identity,
                headers: {'enctype': "multipart/form-data" , 'Content-Type': undefined}
            });
        }

        return {
            uploadFileToUrl : uploadFileToUrl
        }
    }]);
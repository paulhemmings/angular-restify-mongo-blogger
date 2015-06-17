describe('MainApplicationModule', function () {

    var service,
        mockHttp = {
        };

    beforeEach(function () {
        module('MainApplicationModule');
    });

    describe('bloggerService', function () {

        beforeEach(inject(function (_bloggerService_, $http) {
            service = _bloggerService_,
                mockHttp = $http;
        }));
    });
});

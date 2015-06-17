describe('MainApplicationModule', function () {

    var service,
        mockHttp = {
        };

    beforeEach(function () {
        module('MainApplicationModule');
    });

    describe('presentationService', function () {

        beforeEach(inject(function (_presentationService_, $http) {
            service = _presentationService_,
                mockHttp = $http;
        }));
    });
});
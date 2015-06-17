describe('MainApplicationModule', function () {

    var scope,
        controller;

    beforeEach(function () {
        module('MainApplicationModule');
    });

    describe('BloggerController', function () {

        beforeEach(inject(function ($rootScope, $controller) {
            scope = $rootScope.$new();
            controller = $controller('BloggerController', {
                '$scope': scope
            });
        }));

        it ("should load blogs", function() {
            expect(scope.blogs.length).toBe(0);
            scope['__test__'].loadBlogs({
                data: [
                    {"title": "one"},
                    {"title": "two"}
                ]
            });
            expect(scope.blogs.length).toBe(2);
        });

    });

});

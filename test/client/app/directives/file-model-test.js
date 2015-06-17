'use-strict';

describe('Directive: fileModel', function(){
    var $compile, $rootScope, element;

    beforeEach(module('MainApplicationModule'));

    beforeEach(inject(function(_$compile_, _$rootScope_){
        $compile = _$compile_;
        $rootScope = _$rootScope_;

        element = angular.element("<input type='file' file-model='myFile' accept='application/mib'/>");

        $compile(element)($rootScope);
        $rootScope.$digest();
    }));

    it('Should add file model definition to scope', function(){
        expect('myFile' in  $rootScope).toBe(false);
        element.triggerHandler('change');
        expect('myFile' in  $rootScope).toBe(true);
    });
});

angular
    .module('MainApplicationModule')
    .directive('autoSize', ['$timeout', function ($timeout) {
        return {
            restrict: 'A',
            link: function(scope, element, attrs) {

                var height = element[0].offsetHeight;
                var diff = parseInt(element.css('paddingBottom')) +
                           parseInt(element.css('paddingTop')) || 0;

                element.bind('input', function(){
                  element.css('height', element[0].scrollHeight - diff + 'px');
                });

            }
        };
    }]);

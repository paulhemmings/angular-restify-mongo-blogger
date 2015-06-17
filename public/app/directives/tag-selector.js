angular
    .module('MainApplicationModule')
    .directive('tagSelector', function () {
      return {
          restrict: 'A',
          link: function(scope, element, attrs) {
              var model = $parse(attrs.tagSelector);
              var modelSetter = model.assign;
              var velge = new Velge(element, {
                placeholder: 'Choose'
              });
              scope.$apply(function() {
                  modelSetter(scope, velge);
              });
          }
      };
  }]);

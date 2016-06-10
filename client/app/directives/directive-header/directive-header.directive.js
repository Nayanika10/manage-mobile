'use strict';

angular.module('uiGenApp')
  .directive('directiveHeader', function () {
    return {
      templateUrl: 'app/directives/directive-header/directive-header.html',
      scope:{
        viewdata: "=",
        app: "=",
        buttons: "=",
      },
      restrict: 'EA',
      link: function (scope, element, attrs) {
        console.log(scope)
        scope.App = scope.app
      }
    };
  });

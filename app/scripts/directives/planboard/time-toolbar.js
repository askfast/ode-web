define(['directives/directives'], function (directives) {
  'use strict';

  directives.directive('timeToolbar', function () {
    return {
      restrict: 'EA',
      templateUrl: 'views/planboard/time-toolbar.html',
      link: function (scope, element, attr) {
      }
    };
  });
});
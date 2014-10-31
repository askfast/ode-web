define(['directives/directives'], function (directives) {
  'use strict';

  directives.directive('timeLegends', function () {
    return {
      restrict: 'EA',
      templateUrl: 'views/planboard/time-legends.html',
      link: function (scope, element, attr) {
      }
    };
  });
});
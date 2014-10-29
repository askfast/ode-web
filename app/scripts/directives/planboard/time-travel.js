define(['directives/directives'], function (directives) {
  'use strict';

  directives.directive('timeTravel', function () {
    return {
      restrict: 'EA',
      templateUrl: 'views/planboard/time-travel.html',
      link: function (scope, element, attr) {
      }
    };
  });
});
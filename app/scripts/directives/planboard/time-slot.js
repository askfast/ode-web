define(['directives/directives'], function (directives) {
  'use strict';

  directives.directive('timeSlot', function () {
    return {
      restrict: 'EA',
      templateUrl: 'views/planboard/time-slot.html',
      link: function (scope, element, attr) {
      }
    };
  });
});
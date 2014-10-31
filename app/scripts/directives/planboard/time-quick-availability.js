define(['directives/directives'], function (directives) {
  'use strict';

  directives.directive('timeQuickAvailability', function () {
    return {
      restrict: 'EA',
      templateUrl: 'views/planboard/time-quick-availability.html',
      link: function (scope, element, attr) {
      }
    };
  });
});
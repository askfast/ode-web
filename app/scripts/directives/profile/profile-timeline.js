define(['directives/directives'], function (directives) {
  'use strict';

  directives.directive('profileTimeline', function () {
    return {
      restrict: 'EA',
      templateUrl: 'views/profile/profile-timeline.html',
      link: function (scope, element, attr) {
      }
    };
  });
});
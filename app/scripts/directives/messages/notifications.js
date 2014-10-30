define(['directives/directives'], function (directives) {
  'use strict';

  directives.directive('notifications', function () {
    return {
      restrict: 'EA',
      templateUrl: 'views/messages/notifications.html',
      link: function (scope, element, attr) {
      }
    };
  });
});
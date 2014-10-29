define(['directives/directives'], function (directives) {
  'use strict';

  directives.directive('outbox', function () {
    return {
      restrict: 'EA',
      templateUrl: 'views/messages/outbox.html',
      link: function (scope, element, attr) {
      }
    };
  });
});
define(['directives/directives'], function (directives) {
  'use strict';

  directives.directive('compose', function () {
    return {
      restrict: 'EA',
      templateUrl: 'views/messages/compose.html',
      link: function (scope, element, attr) {
      }
    };
  });
});
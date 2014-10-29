define(['directives/directives'], function (directives) {
  'use strict';

  directives.directive('trash', function () {
    return {
      restrict: 'EA',
      templateUrl: 'views/messages/trash.html',
      link: function (scope, element, attr) {
      }
    };
  });
});
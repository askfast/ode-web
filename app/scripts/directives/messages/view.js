define(['directives/directives'], function (directives) {
  'use strict';

  directives.directive('view', function () {
    return {
      restrict: 'EA',
      templateUrl: 'views/messages/view.html',
      link: function (scope, element, attr) {
      }
    };
  });
});
define(['directives/directives'], function (directives) {
  'use strict';

  directives.directive('inbox', function () {
    return {
      restrict: 'EA',
      templateUrl: 'views/messages/inbox.html',
      link: function (scope, element, attr) {
      }
    };
  });
});
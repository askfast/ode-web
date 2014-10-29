define(['directives/directives'], function (directives) {
  'use strict';

  directives.directive('preloaded', function () {
    return {
      restrict: 'EA',
      templateUrl: 'views/login/preloaded.html',
      link: function (scope, element, attr) {
      }
    };
  });
});
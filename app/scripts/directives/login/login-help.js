define(['directives/directives'], function (directives) {
  'use strict';

  directives.directive('loginHelp', function () {
    return {
      restrict: 'EA',
      templateUrl: 'views/login/login-help.html',
      link: function (scope, element, attr) {
      }
    };
  });
});
define(['directives/directives'], function (directives) {
  'use strict';

  directives.directive('forgotPassword', function () {
    return {
      restrict: 'EA',
      templateUrl: 'views/login/forgot-password.html',
      link: function (scope, element, attr) {
      }
    };
  });
});
define(['directives/directives'], function (directives) {
  'use strict';

  directives.directive('loginForm', function () {
    return {
      restrict: 'EA',
      templateUrl: 'views/login/login-form.html',
      link: function (scope, element, attr) {
      }
    };
  });
});
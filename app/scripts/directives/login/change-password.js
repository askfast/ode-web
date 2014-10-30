define(['directives/directives'], function (directives) {
  'use strict';

  directives.directive('changePassword', function () {
    return {
      restrict: 'EA',
      templateUrl: 'views/login/change-password.html',
      link: function (scope, element, attr) {
      }
    };
  });
});
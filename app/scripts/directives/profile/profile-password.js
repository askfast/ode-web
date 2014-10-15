define(['directives/directives'], function (directives) {
  'use strict';

  directives.directive('profilePassword', function () {
    return {
      restrict: 'EA',
      templateUrl: 'views/profile/profile-password.html',
      link: function (scope, element, attr) {
      }
    };
  });
});
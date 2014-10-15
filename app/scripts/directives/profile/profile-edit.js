define(['directives/directives'], function (directives) {
  'use strict';

  directives.directive('profileEdit', function () {
    return {
      restrict: 'EA',
      templateUrl: 'views/profile/profile-edit.html',
      link: function (scope, element, attr) {
      }
    };
  });
});
define(['directives/directives'], function (directives) {
  'use strict';

  directives.directive('profileView', function () {
    return {
      restrict: 'EA',
      templateUrl: 'views/profile/profile-view.html',
      link: function (scope, element, attr) {
      }
    };
  });
});
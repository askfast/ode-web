define(['directives/directives'], function (directives) {
  'use strict';

  directives.directive('settingsUser', function () {
    return {
      restrict: 'EA',
      templateUrl: 'views/settings/settings-user.html',
      link: function (scope, element, attr) {
      }
    };
  });
});
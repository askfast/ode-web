define(['directives/directives'], function (directives) {
  'use strict';

  directives.directive('settingsApp', function () {
    return {
      restrict: 'EA',
      templateUrl: 'views/settings/settings-app.html',
      link: function (scope, element, attr) {
      }
    };
  });
});
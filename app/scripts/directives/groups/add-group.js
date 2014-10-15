define(['directives/directives'], function (directives) {
  'use strict';

  directives.directive('addGroup', function () {
    return {
      restrict: 'EA',
      templateUrl: 'views/groups/add-group.html',
      link: function (scope, element, attr) {
      }
    };
  });
});
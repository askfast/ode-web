define(['directives/directives'], function (directives) {
  'use strict';

  directives.directive('editGroup', function () {
    return {
      restrict: 'EA',
      templateUrl: 'views/groups/edit-group.html',
      link: function (scope, element, attr) {
      }
    };
  });
});
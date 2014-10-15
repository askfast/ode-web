define(['directives/directives'], function (directives) {
  'use strict';

  directives.directive('newMember', function () {
    return {
      restrict: 'EA',
      templateUrl: 'views/groups/new-member.html',
      link: function (scope, element, attr) {
      }
    };
  });
});
define(['directives/directives'], function (directives) {
  'use strict';

  directives.directive('memberSearch', function () {
    return {
      restrict: 'EA',
      templateUrl: 'views/groups/member-search.html',
      link: function (scope, element, attr) {
      }
    };
  });
});
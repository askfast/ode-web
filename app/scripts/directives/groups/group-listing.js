define(['directives/directives'], function (directives) {
  'use strict';

  directives.directive('groupListing', function () {
    return {
      restrict: 'EA',
      templateUrl: 'views/groups/group-listing.html',
      link: function (scope, element, attr) {
      }
    };
  });
});
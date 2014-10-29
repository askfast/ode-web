define(
  ['directives/directives'],
  function (directives) {
    'use strict';

    directives.directive(
      'logos',
      function() {
        return {
          restrict: 'E',
          templateUrl: 'views/logos.html'
        };
      });
  }
);

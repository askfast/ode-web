define(
  ['directives/directives'],
  function (directives) {
    'use strict';

    directives.directive(
      'profileImg',
      function () {
        return {
          restrict: 'A',
          link: function (scope, element, attrs) {
            var url = attrs.profileImg;
            element.css({
              'background-image': 'url(' + url + ')',
              'background-size': 'cover'
            });
          }
        };
      });
  }
);

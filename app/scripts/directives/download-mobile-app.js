define(
  ['directives/directives'],
  function (directives)
  {
    'use strict';

    directives.directive(
      'downloadMobileApp',
      function ()
      {
        return {
          restrict: 'E',
          rep1ace: true,
          templateUrl: 'dist/views/download-mobile-app.html',
          link: function (scope, element, attrs)
          {
            scope.upwards = $.browser.mobile && $.browser.screen.width < 768;

            if ($.browser.mozilla && $.browser.version == '11.0')
            {
              angular.element('.download-button')
                .css(
                {
                  paddingLeft: '25px'
                }
              );
            }
          }
        };

      });
  }
);

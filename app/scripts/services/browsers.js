define(['services/services'], function (services) {
  'use strict';

  services.factory('Browsers', [
    '$rootScope', '$window',
    function ($rootScope, $window) {
      $rootScope.browser = $.browser;

      angular.extend(
        $rootScope.browser, {
          screen: $window.screen
        }
      );

      // TODO: Is this for all?
      if ($.os.windows) {
        angular.element('#loading p')
          .css(
          {
            paddingTop: '130px'
          }
        );
      }

      if ($rootScope.browser.ios) {
        angular.extend(
          $rootScope.browser, {
            landscape: Math.abs($window.orientation) == 90 ? true : false,
            portrait: Math.abs($window.orientation) != 90 ? true : false
          }
        );
      }
      else {
        angular.extend(
          $rootScope.browser, {
            landscape: Math.abs($window.orientation) != 90 ? true : false,
            portrait: Math.abs($window.orientation) == 90 ? true : false
          }
        );
      }

      $window.onresize = function () {
        $rootScope.browser.screen = $window.screen
      };

      $window.onorientationchange = function () {
        $rootScope.$apply(
          function () {
            if ($rootScope.browser.ios) {
              angular.extend(
                $rootScope.browser, {
                  landscape: Math.abs($window.orientation) == 90 ? true : false,
                  portrait: Math.abs($window.orientation) != 90 ? true : false
                }
              );
            }
            else {
              angular.extend(
                $rootScope.browser, {
                  landscape: Math.abs($window.orientation) != 90 ? true : false,
                  portrait: Math.abs($window.orientation) == 90 ? true : false
                }
              );
            }
          }
        );
      };

      if ($.os.windows) {
        $('#loading p').css({ paddingTop: '130px' });
      }

      if ($.browser.msie && $.browser.version == '8.0') {
        document.title = $rootScope.StandBy.config.profile.title;
      }
    }
  ]);
});
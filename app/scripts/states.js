define(['services/services'], function (services) {
  'use strict';

  services.factory('States', [
    '$location', '$rootScope', 'Session',
    function ($location, $rootScope, Session) {

      $rootScope.$on('$routeChangeStart', function () {
        function resetLoaders() {
          $rootScope.loaderIcons = {
            general: false,
            dashboard: false,
            planboard: false,
            messages: false,
            groups: false,
            profile: false,
            settings: false
          };
        }

        resetLoaders();

        switch ($location.path()) {
          case '/dashboard':
            $rootScope.loaderIcons.dashboard = true;

            $rootScope.location = 'dashboard';
            break;

          case '/planboard':
            $rootScope.loaderIcons.planboard = true;

            $rootScope.location = 'planboard';
            break;

          case '/messages':
            $rootScope.loaderIcons.messages = true;

            $rootScope.location = 'messages';
            break;

          case '/groups':
            $rootScope.loaderIcons.groups = true;

            $rootScope.location = 'groups';
            break;

          case '/settings':
            $rootScope.loaderIcons.settings = true;

            $rootScope.location = 'settings';
            break;

          default:
            if ($location.path().match(/profile/)) {
              $rootScope.loaderIcons.profile = true;

              $rootScope.location = 'profile';
            }
            else {
              $rootScope.loaderIcons.general = true;
            }
        }

        if ($location.path().match(/logout/)) {
          $rootScope.location = 'logout';

          $('#watermark').hide();
        }

        if (!$rootScope.location) {
          try {
            ga('send', 'Undefined Page', $location.path());
          }
          catch (e) {
            console.log('something wrong with passing location to google analytics ->');
          }
        }

        try {
          ga('send', 'pageview', {
            'page': '/index.html#/' + $rootScope.location || 'login',
            'title': $rootScope.location || 'login'
          });
        }
        catch (e) {
          console.warn('Google analytics tracking error ->', e);
        }

        if ($location.path() != '/tv') {
          if (!Session.check()) {
            $location.path("/login");
          }
        }

        $rootScope.loadingBig = true;

        $rootScope.statusBar.display('Aan het laden...');

        $('div[ng-view]').hide();
      });

      $rootScope.$on('$routeChangeSuccess', function () {
        $rootScope.newLocation = $location.path();

        $rootScope.loadingBig = false;

        $rootScope.statusBar.off();

        $('div[ng-view]').show();
      });

      $rootScope.$on('$routeChangeError', function (event, current, previous, rejection) {
        $rootScope.notifier.error(rejection)
      });
    }
  ]);
});
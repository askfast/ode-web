define(['services/services'], function (services) {
  'use strict';

  services.factory('Notifications', [
    '$rootScope',
    function ($rootScope) {
      $rootScope.app = $rootScope.app || {};

      $rootScope.statusBar = {
        init: function () {
          $rootScope.loading = {
            status: false,
            message: 'Aan het laden..'
          };

          $rootScope.app.preloader = {
            status: false,
            total: 0,
            count: 0
          };
        },
        display: function (message) {
          $rootScope.app.preloader.status = false;

          $rootScope.loading = {
            status: true,
            message: message
          };
        },
        off: function () {
          $rootScope.loading.status = false
        }
      };

      $rootScope.statusBar.init();

      $rootScope.notification = {
        status: false,
        type: '',
        message: ''
      };

      $rootScope.notifier =
      {
        init: function (status, type, message, confirm, options) {
          $rootScope.notification.status = true;

          if ($rootScope.browser.mobile && status == true) {
            $window.alert(message);
          } else {
            $rootScope.notification = {
              status: status,
              type: type,
              message: message,
              confirm: confirm,
              options: options
            };
          }
        },
        success: function (message, permanent) {
          this.init(true, 'alert-success', message);

          if (!permanent) {
            this.destroy();
          }
        },
        error: function (message, permanent) {
          this.init(true, 'alert-danger', message);

          if (!permanent) {
            this.destroy();
          }
        },
        alert: function (message, permanent, confirm, options) {
          this.init(true, '', message, confirm, options);

          if (!permanent) {
            this.destroy();
          }
        },
        destroy: function () {
          setTimeout(
            function () {
              $rootScope.notification.status = false;
            }, $rootScope.config.timers.NOTIFICATION_DELAY);
        }
      };

      $rootScope.notifier.init(false, '', '');


    }
  ]);
});
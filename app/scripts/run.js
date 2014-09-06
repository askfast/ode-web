define(['app', 'config', 'locals'], function (app, config, locals) {
  'use strict';

  app.run([
    '$rootScope', '$location', '$timeout', 'Session', 'Dater', 'Storage', 'Messages', '$window', 'States', 'Browsers',
    function ($rootScope, $location, $timeout, Session, Dater, Storage, Messages, $window, States, Browsers) {
      $rootScope.config = config;
      $rootScope.config.init();

      Session.check();

      $('#notification').removeClass('ng-cloak');

      $rootScope.changeLanguage = function (lang) {
        $rootScope.ui = locals.ui[lang]
      };

      $rootScope.ui = locals.ui[$rootScope.config.lang];

      if (!Storage.get('periods')) {
        Dater.registerPeriods();
      }

      $rootScope.app = $rootScope.app || {};

      $rootScope.app.resources = angular.fromJson(Storage.get('resources'));

      $rootScope.app.domain = angular.fromJson(Storage.get('domain'));

      $rootScope.config.timeline.config.divisions = angular.fromJson(Storage.get('divisions'));

      angular.forEach(
        angular.fromJson(Storage.get('states')),
        function (state) {
          $rootScope.config.timeline.config.states[state] = $rootScope.config.statesall[state]
        }
      );

      var registeredNotifications = angular.fromJson(Storage.get('registeredNotifications'));

      if (registeredNotifications) {
        $rootScope.registeredNotifications = registeredNotifications;
      } else {
        Storage.add('registeredNotifications', angular.toJson({ timeLineDragging: true }));
      }

      $rootScope.registerNotification = function (setting, value) {
        $rootScope.registeredNotifications[setting] = value;

        Storage.add('registeredNotifications', angular.toJson($rootScope.registeredNotifications));
      };

      if (!$rootScope.app.unreadMessages) {
        Messages.unreadCount();
      }

      if (angular.fromJson(Storage.get('guard'))) {
        $rootScope.app.guard = angular.fromJson(Storage.get('guard'));
      } else {
        // TODO: Some changes in the constructor. Review this later on
        $rootScope.app.guard = {
          monitor: '',
          role: '',
          currentState: '',
          currentStateClass: ''
        };
      }

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

      $rootScope.fireDeleteRequest = function (options) {
        switch (options.section) {
          case 'groups':
            $rootScope.$broadcast('fireGroupDelete', { id: options.id });
            break;
        }
      };

      $rootScope.fixStyles = function () {
        $rootScope.timelineLoaded = false;

        var tabHeight = $('.tabs-left .nav-tabs').height();

        $.each(
          $('.tab-content').children(), function () {
            var $parent = $(this),
              $this = $(this).attr('id'),
              contentHeight = $('.tabs-left .tab-content #' + $this).height();

            if (tabHeight > contentHeight) {
              $('.tabs-left .tab-content #' + $this).css(
                {
                  height: $('.tabs-left .nav-tabs').height() - 41
                }
              );
            }
          }
        );

        if ($.os.mac || $.os.linux) {
          $('.nav-tabs-app li a span').css(
            {
              paddingTop: '10px',
              marginBottom: '0px'
            });
        }
      };

      $rootScope.fullScreen = function () {
        screenfull.toggle($('html')[0])
      };

      if ($.os.windows) {
        $('#loading p').css({ paddingTop: '130px' });
      }

      if ($.browser.msie && $.browser.version == '8.0') {
        document.title = $rootScope.config.profile.title;
      }

      if (!config.profile.mobileApp.status) {
        $('#copyrights span.muted').css({ right: 0 });
      }

      $rootScope.downloadMobileApp = function (type) {
        $rootScope.statusBar.display($rootScope.ui.downloads.inAction);

        Messages.email(type)
          .then(
          function () {
            $rootScope.notifier.success($rootScope.ui.downloads.success);

            $rootScope.statusBar.off();
          }
        );
      };

      $rootScope.resetPhoneNumberChecker = function () {
        $rootScope.phoneNumberParsed = {};

        $rootScope.phoneNumberParsed.result = false;
      };

      $rootScope.resetPhoneNumberChecker();

      $rootScope.phoneNumberParser = function (checked) {
        if (checked != '') {
          if (checked && checked.length > 0) {
            var result, all;

            result = all = phoneNumberParser(checked, 'NL');

            $rootScope.phoneNumberParsed.result = true;

            if (result) {
              var error = $rootScope.ui.errors.phone.notValid,
                invalidCountry = $rootScope.ui.errors.phone.invalidCountry,
                message;

              if (result.error) {
                $rootScope.phoneNumberParsed = {
                  result: false,
                  message: error
                };
              } else {
                if (!result.validation.isPossibleNumber) {
                  switch (result.validation.isPossibleNumberWithReason) {
                    case 'INVALID_COUNTRY_CODE':
                      message = invalidCountry;
                      break;
                    case 'TOO_SHORT':
                      message = error + $rootScope.ui.errors.phone.tooShort;
                      break;
                    case 'TOO_LONG':
                      message = error + $rootScope.ui.errors.phone.tooLong;
                      break;
                  }

                  $rootScope.phoneNumberParsed = {
                    result: false,
                    message: message
                  };
                } else {
                  if (!result.validation.isValidNumber) {
                    $rootScope.phoneNumberParsed = {
                      result: false,
                      message: error
                    };
                  } else {
                    if (!result.validation.isValidNumberForRegion) {
                      $rootScope.phoneNumberParsed = {
                        result: false,
                        message: invalidCountry
                      };
                    } else {
                      $rootScope.phoneNumberParsed = {
                        result: true,
                        message: $rootScope.ui.success.phone.message +
                          result.validation.phoneNumberRegion +
                          $rootScope.ui.success.phone.as +
                          result.validation.getNumberType
                      };

                      $('#inputPhoneNumber').removeClass('error');
                    }
                  }
                }
              }
            }

            $rootScope.phoneNumberParsed.all = all;
          }
          else {
            $rootScope.phoneNumberParsed.result = true;

            delete $rootScope.phoneNumberParsed.message;

            $('#inputPhoneNumber').removeClass('error');
          }
        }
      };

      $('.nav a').on('click', function () {
        $('.btn-navbar').click()
      });

      $rootScope.unite = function (chunks) {
        var text = '';

        _.each(chunks, function (chunk) {
          text += chunk;
        });

        return text;
      }
    }
  ]);
});
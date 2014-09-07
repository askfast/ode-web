define(['app', 'config', 'locals'], function (app, config, locals) {
  'use strict';

  app.run([
    '$rootScope', '$location', '$timeout', 'Session', 'Dater', 'Storage', 'Messages', '$window', 'States', 'Browsers', 'Notifications',
    function ($rootScope, $location, $timeout, Session, Dater, Storage, Messages, $window, States, Browsers, Notifications) {
      Session.check();

      if (!Storage.get('periods'))
        Dater.registerPeriods();

      // ----------------------------------------------------------

      $rootScope.app = $rootScope.app || {};
      $rootScope.app.resources = angular.fromJson(Storage.get('resources'));
      $rootScope.app.domain = angular.fromJson(Storage.get('domain'));

      var settings = angular.fromJson(Storage.get('settings'));
      if (settings) {
        $rootScope.app.settings = settings;
      } else {
        $rootScope.app.settings = {
          language: config.lang
        };

        Storage.add('settings', angular.toJson($rootScope.app.settings));
      }

      // ----------------------------------------------------------

      $rootScope.config = config;
      $rootScope.config.init();
      $rootScope.config.timeline.config.divisions = angular.fromJson(Storage.get('divisions'));

      _.each(angular.fromJson(Storage.get('states')), function (state) {
        $rootScope.config.timeline.config.states[state] = $rootScope.config.statesall[state]
      });

      // ----------------------------------------------------------

      $rootScope.changeLanguage = function (lang) {
        $rootScope.ui = locals.ui[lang];

        $rootScope.app.settings.language = lang;
      };

      $rootScope.ui = locals.ui[$rootScope.config.lang];

      // ----------------------------------------------------------

      // TODO: Make a general service called reminders for these kind of messages

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

      // ----------------------------------------------------------

      // TODO: Fired in login as well?

      if (!$rootScope.app.unreadMessages)
        Messages.unreadCount();

      // ----------------------------------------------------------

      if (angular.fromJson(Storage.get('guard'))) {
        $rootScope.app.guard = angular.fromJson(Storage.get('guard'));
      } else {
        $rootScope.app.guard = {
          monitor: '',
          role: '',
          currentState: '',
          currentStateClass: ''
        };
      }

      // ----------------------------------------------------------

      // TODO: Investigate whether is still in use?

      $rootScope.fireDeleteRequest = function (options) {
        if (options.section == 'groups')
          $rootScope.$broadcast('fireGroupDelete', { id: options.id });
      };

      // ----------------------------------------------------------

      // TODO: Make a general directive for styling fixes

      $('#notification').removeClass('ng-cloak');

      $rootScope.fixStyles = function () {
        $rootScope.timelineLoaded = false;

        var tabHeight = $('.tabs-left .nav-tabs').height();

        $.each($('.tab-content').children(), function () {
          var $parent = $(this),
            $this = $(this).attr('id'),
            contentHeight = $('.tabs-left .tab-content #' + $this).height();

          if (tabHeight > contentHeight) {
            $('.tabs-left .tab-content #' + $this).css({
              height: $('.tabs-left .nav-tabs').height() - 41
            });
          }
        });

        if ($.os.mac || $.os.linux) {
          $('.nav-tabs-app li a span').css({
            paddingTop: '10px',
            marginBottom: '0px'
          });
        }
      };

      $rootScope.fullScreen = function () {
        screenfull.toggle($('html')[0])
      };

      if (!config.profile.mobileApp.status)
        $('#copyrights span.muted').css({ right: 0 });

      $('.nav a').on('click', function () {
        $('.btn-navbar').click()
      });

      // ----------------------------------------------------------

      // TODO: Depreciated function. Keep emailing functionality in messages

//      $rootScope.downloadMobileApp = function (type) {
//        $rootScope.statusBar.display($rootScope.ui.downloads.inAction);
//
//        Messages.email(type).then(function () {
//          $rootScope.notifier.success($rootScope.ui.downloads.success);
//
//          $rootScope.statusBar.off();
//        });
//      };

      // ----------------------------------------------------------

      // TODO: Move to a service

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
          } else {
            $rootScope.phoneNumberParsed.result = true;

            delete $rootScope.phoneNumberParsed.message;

            $('#inputPhoneNumber').removeClass('error');
          }
        }
      };

      // ----------------------------------------------------------

      // TODO: Make a utilities service for sharing

      $rootScope.unite = function (chunks) {
        var text = '';

        _.each(chunks, function (chunk) {
          text += chunk
        });

        return text;
      };

      // ----------------------------------------------------------

      $rootScope.app2 = $rootScope.app2 || {
        config: config,
        session: {},
        resources: {},
        environment: {
          domain: '',
          states: [],
          divisions: []
        },
        preloaded: {
          ratio: 0,
          missioned: 0,
          accomplished: 1
        }
      };

      $rootScope.missioned = function (missioned) {
        $rootScope.app.preloaded = {
          ratio: 0,
          missioned: missioned,
          accomplished: 1
        };
      };

      $rootScope.ticked = function () {
        $rootScope.app.preloaded.ratio = Math.ceil(
          Math.abs(
              $rootScope.app.preloaded.accomplished++ * 100 /
              $rootScope.app.preloaded.missioned)
        );
      };
    }
  ]);
});
define(['app', 'config', 'locals'], function (app, config, locals) {
  'use strict';

  app.run(function ($rootScope, $location, $timeout, Session, Dater, Messages, $window, States, Browsers, Notifications, Store) {
//    if (Session.check())
//      $location.path('/dashboard');

    // ----------------------------------------------------------

    // TODO: Lose this later onw with VisJS/MomentJS navigation
    if (Store('app').get('periods')==null || Store('app').get('periods').value==null)
      Dater.registerPeriods();

    // ----------------------------------------------------------

    $rootScope.StandBy = $rootScope.StandBy ||
    {
      config: config,
      session: {},
      resources: {},
      environment: {
        domain: '',
        states: [],
        divisions: []
      },
      settings: {}
    };

    // TODO: Create this only if there is a correct setting for it
    $rootScope.StandBy.guard = {};

    if (!_.isUndefined($rootScope.StandBy.session) && Session.check()) {
      $rootScope.StandBy.session = angular.fromJson(sessionStorage.getItem('session'));
    }

    if (!_.isUndefined($rootScope.StandBy.resources) && Store('user').get('resources') != '') {
      $rootScope.StandBy.resources = Store('user').get('resources');
    }

    if (!_.isUndefined($rootScope.StandBy.environment.domain) && Store('environment').get('domain') != '') {
      $rootScope.StandBy.environment.domain = Store('environment').get('domain');
    }

    if (!_.isUndefined($rootScope.StandBy.environment.states) && Store('environment').get('states') != '') {
      $rootScope.StandBy.environment.states = Store('environment').get('states');

      _.each(Store('environment').get('states'), function (state) {
        $rootScope.StandBy.config.timeline.config.states[state] = $rootScope.StandBy.config.statesall[state]
      });
    }

    if (!_.isUndefined($rootScope.StandBy.environment.divisions) && Store('environment').get('divisions') != '') {
      $rootScope.StandBy.environment.divisions = Store('environment').get('divisions');
    }

    if (Store('smartAlarm').get('guard')) {
      $rootScope.StandBy.guard = Store('smartAlarm').get('guard');
    } else {
      $rootScope.StandBy.guard = {
        monitor: '',
        role: '',
        currentState: '',
        currentStateClass: ''
      };
    }

    console.log('StandBy ->', $rootScope.StandBy);

    var settings = Store('settings').get('mine');
    if (settings) {
      $rootScope.app.settings = settings;
    } else {
      $rootScope.app.settings = {
        language: config.lang
      };

      Store('settings').save('mine', $rootScope.app.settings);
      //Storage.add('settings', angular.toJson($rootScope.app.settings));
    }

    // ----------------------------------------------------------

    $rootScope.StandBy.config = config;
    $rootScope.StandBy.config.init();
    // $rootScope.StandBy.config.timeline.config.divisions = angular.fromJson(Storage.get('divisions'));

//    _.each(angular.fromJson(Storage.get('states')), function (state) {
//      $rootScope.StandBy.config.timeline.config.states[state] = $rootScope.StandBy.config.statesall[state]
//    });

    // ----------------------------------------------------------

    $rootScope.changeLanguage = function (lang) {
      $rootScope.ui = locals.ui[lang];

      $rootScope.app.settings.language = lang;
    };

    $rootScope.ui = locals.ui[$rootScope.StandBy.config.lang];

    // ----------------------------------------------------------

    // TODO: Make a general service called reminders for these kind of messages

    var registeredNotifications = Store('notifications').get('registeredNotifications');

    if (registeredNotifications) {
      $rootScope.registeredNotifications = registeredNotifications;
    } else {
      Store('notifications').save('registeredNotifications', { timeLineDragging: true });
    }

    $rootScope.registerNotification = function (setting, value) {
      $rootScope.registeredNotifications[setting] = value;

      Store('notifications').save('registeredNotifications', $rootScope.registeredNotifications);
    };

    // ----------------------------------------------------------

    // TODO: Fired in login as well?

    if (!$rootScope.app.unreadMessages)
      Messages.unreadCount();

    // ----------------------------------------------------------

    // ----------------------------------------------------------

    // TODO: Investigate whether is still in use?

    $rootScope.fireDeleteRequest = function (options) {
      if (options.section == 'groups')
        $rootScope.$broadcast('fireGroupDelete', { id: options.id });
    };

    // ----------------------------------------------------------

    // TODO: Make a general directive for styling fixes

    $('#notification').removeClass('ng-cloak');

    $('#watermark').css({
      'backgroundImage': 'url(../scripts/profiles/' + $rootScope.StandBy.config.profile.meta  + '/img/watermark.png)',
      'backgroundRepeat': 'no-repeat'
    });
    if ($.browser.mobile) $('#watermark').css({ bottom: '-10px' });

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
        text += chunk;
      });

      return text;
    };
  });
});
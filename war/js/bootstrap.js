/*jslint node: true */
/*global angular */
/*global $ */
/*global ui */
/*global screenfull */
'use strict';


/**
 * Initial run functions
 */
angular.module('WebPaige')
  .run(
  [
    '$rootScope',
    '$location',
    '$timeout',
    'Session',
    'Dater',
    'Storage',
    'Messages',
    '$config',
    '$window',
    '$http',
    function ($rootScope, $location, $timeout, Session, Dater, Storage, Messages, $config, $window, $http)
    {
      /**
       * Pass config and init dynamic config values
       */
      $rootScope.config = $config;

      $rootScope.config.init();


      /**
       * Turn off the display of notification on refresh @ login page
       */
      $('#notification').removeClass('ng-cloak');


      /**
       * TODO: Move these checks to jquery.browser
       * Pass Jquery browser data to angular
       */
      $rootScope.browser = $.browser;

      angular.extend($rootScope.browser, { screen: $window.screen });

      if ($rootScope.browser.ios)
      {
        angular.extend(
          $rootScope.browser, {
            landscape: ! ! (Math.abs($window.orientation) == 90),
            portrait: ! ! (Math.abs($window.orientation) != 90)
          });
      }
      else
      {
        angular.extend(
          $rootScope.browser, {
            landscape: ! ! (Math.abs($window.orientation) != 90),
            portrait: ! ! (Math.abs($window.orientation) == 90)
          });
      }

      $window.onresize = function () { $rootScope.browser.screen = $window.screen };

      $window.onorientationchange = function ()
      {
        $rootScope.$apply(
          function ()
          {
            if ($rootScope.browser.ios)
            {
              angular.extend(
                $rootScope.browser, {
                  landscape: ! ! (Math.abs($window.orientation) == 90),
                  portrait: ! ! (Math.abs($window.orientation) != 90)
                });
            }
            else
            {
              angular.extend(
                $rootScope.browser, {
                  landscape: ! ! (Math.abs($window.orientation) != 90),
                  portrait: ! ! (Math.abs($window.orientation) == 90)
                });
            }
          });
      };


      /**
       * Default language and change language
       */
      $rootScope.changeLanguage = function (lang) { $rootScope.ui = ui[lang] };

      $rootScope.ui = ui[$rootScope.config.lang];


      /**
       * If periods are not present calculate them
       */
      if (! Storage.get('periods'))
      {
        Dater.registerPeriods();
      }


      /**
       * Set important info back if refreshed
       */
      $rootScope.app = $rootScope.app || {};


      /**
       * Set up resources
       */
      $rootScope.app.resources = angular.fromJson(Storage.get('resources'));

      $rootScope.app.domain = angular.fromJson(Storage.get('domain'));

      $rootScope.config.timeline.config.divisions = angular.fromJson(Storage.get('divisions'));

      angular.forEach(
        angular.fromJson(Storage.get('states')),
        function (state) { $rootScope.config.timeline.config.states[state] = $rootScope.config.statesall[state] }
      );

      var registeredNotifications = angular.fromJson(Storage.get('registeredNotifications'));

      if (registeredNotifications)
      {
        $rootScope.registeredNotifications = registeredNotifications;
      }
      else
      {
        Storage.add('registeredNotifications', angular.toJson({ timeLineDragging: true }));
      }

      $rootScope.registerNotification = function (setting, value)
      {
        $rootScope.registeredNotifications[setting] = value;

        Storage.add('registeredNotifications', angular.toJson($rootScope.registeredNotifications));
      };


      /**
       * Count unread messages
       */
      if (! $rootScope.app.unreadMessages)
      {
        Messages.unreadCount();
      }

      /**
       * Initialize empty guard data container for smart alarming
       */
      if (angular.fromJson(Storage.get('guard')))
      {
        $rootScope.app.guard = angular.fromJson(Storage.get('guard'));
      }
      else
      {
        // TODO: Some changes in the constructor. Review this later on
        $rootScope.app.guard = {
          monitor: '',
          role: '',
          currentState: '',
          currentStateClass: ''
        };
      }


      /**
       * Show action loading messages
       */
      $rootScope.statusBar =
      {
        init: function ()
        {
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

        display: function (message)
        {
          $rootScope.app.preloader.status = false;

          $rootScope.loading = {
            status: true,
            message: message
          };
        },

        off: function () { $rootScope.loading.status = false }
      };

      $rootScope.statusBar.init();


      $rootScope.notification = {
        status: false,
        type: '',
        message: ''
      };


      /**
       * Show notifications
       */
      $rootScope.notifier =
      {
        init: function (status, type, message, confirm, options)
        {
          $rootScope.notification.status = true;

          if ($rootScope.browser.mobile && status == true)
          {
            $window.alert(message);
          }
          else
          {
            $rootScope.notification = {
              status: status,
              type: type,
              message: message,
              confirm: confirm,
              options: options
            };
          }
        },

        success: function (message, permanent)
        {
          this.init(true, 'alert-success', message);

          if (! permanent)
          {
            this.destroy();
          }
        },

        error: function (message, permanent)
        {
          this.init(true, 'alert-danger', message);

          if (! permanent)
          {
            this.destroy();
          }
        },

        alert: function (message, permanent, confirm, options)
        {
          this.init(true, '', message, confirm, options);

          if (! permanent)
          {
            this.destroy();
          }
        },

        destroy: function ()
        {
          setTimeout(
            function ()
            {
              $rootScope.notification.status = false;
            }, $rootScope.config.timers.NOTIFICATION_DELAY);
        }
      };

      $rootScope.notifier.init(false, '', '');


      /**
       * Fire delete requests
       */
      $rootScope.fireDeleteRequest = function (options)
      {
        switch (options.section)
        {
          case 'groups':
            $rootScope.$broadcast('fireGroupDelete', { id: options.id });
            break;
        }
      };


      /**
       * Detect route change start
       * Callback function accepts <event, next, current>
       */
      $rootScope.$on(
        '$routeChangeStart',
        function ()
        {
          function resetLoaders ()
          {
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

          switch ($location.path())
          {
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
              if ($location.path().match(/profile/))
              {
                $rootScope.loaderIcons.profile = true;

                $rootScope.location = 'profile';
              }
              else
              {
                $rootScope.loaderIcons.general = true;
              }
          }

          if ($location.path().match(/logout/))
          {
            $rootScope.location = 'logout';

            $('#watermark').hide();
          }

          if (! $rootScope.location)
          {
            try
            {
              ga('send', 'Undefined Page', $location.path());
            }
            catch (e)
            {
              console.log('something wrong with passing location to google analytics ->');
            }
          }

          // console.log('$rootScope.location ->', $rootScope.location || 'login');

          try {
            ga(
              'send', 'pageview',
              {
                'page': '/index.html#/' + $rootScope.location || 'login',
                'title': $rootScope.location || 'login'
              }
            );
          }
          catch (e)
          {
            // console.warn('Google analytics tracking error ->', e);
          }

//          $timeout(
//            function ()
//            {
//              var root = $rootScope.$new();
//
//              ga(
//                'send', 'pageview',
//                {
//                  'page': '/index.html#/' + root.location || 'login',
//                  'title': root.location || 'login'
//                }
//              );
//            }
//          );

          //Prevent deep linking
          if ($location.path() != '/tv')
          {
            if (! Session.check())
            {
              $location.path("/login");
            }
          }

          $rootScope.loadingBig = true;

          $rootScope.statusBar.display('Aan het laden...');

          $('div[ng-view]').hide();
        }
      );


      /**
       * Route change successful
       * Callback function accepts <event, current, previous>
       */
      $rootScope.$on(
        '$routeChangeSuccess',
        function ()
        {
          $rootScope.newLocation = $location.path();

          $rootScope.loadingBig = false;

          $rootScope.statusBar.off();

          $('div[ng-view]').show();
        }
      );


      /**
       * TODO: A better way of dealing with this error!
       * Route change is failed!
       */
      $rootScope.$on(
        '$routeChangeError',
        function (event, current, previous, rejection) { $rootScope.notifier.error(rejection) }
      );


      // TODO: Fix styles
      $rootScope.fixStyles = function ()
      {
        $rootScope.timelineLoaded = false;

        var tabHeight = $('.tabs-left .nav-tabs').height();

        $.each(
          $('.tab-content').children(), function ()
          {
            var $parent = $(this),
                $this = $(this).attr('id'),
                contentHeight = $('.tabs-left .tab-content #' + $this).height();

            // Check if one is bigger than another
            if (tabHeight > contentHeight)
            {
              $('.tabs-left .tab-content #' + $this).css(
                {
                  height: $('.tabs-left .nav-tabs').height() - 41
                }
              );
            }
          }
        );

        /**
         * Correct icon-font-library icons for mac and linux
         */
        if ($.os.mac || $.os.linux)
        {
          $('.nav-tabs-app li a span').css(
            {
              paddingTop: '10px',
              marginBottom: '0px'
            });
        }
      };


      /**
       * Experimental full screen ability
       */
      $rootScope.fullScreen = function () { screenfull.toggle($('html')[0]) };


      /**
       * Detect OS for some specific styling issues
       */
      if ($.os.windows)
      {
        $('#loading p').css({ paddingTop: '130px' });
      }


      /**
       * IE8 fix for inability of - not ready for angular by loading
       * especially for index.html
       */
      if ($.browser.msie && $.browser.version == '8.0')
      {
        document.title = $rootScope.config.profile.title;
      }


      /**
       * TODO (Still functioning since there is a second download button?)
       */
      if (! $config.profile.mobileApp.status)
      {
        $('#copyrights span.muted').css({ right: 0 });
      }


      /**
       * Download mobile app button
       */
      $rootScope.downloadMobileApp = function (type)
      {
        $rootScope.statusBar.display($rootScope.ui.downloads.inAction);

        Messages.email(type)
          .then(
          function ()
          {
            $rootScope.notifier.success($rootScope.ui.downloads.success);

            $rootScope.statusBar.off();
          }
        );
      };


      $rootScope.resetPhoneNumberChecker = function ()
      {
        $rootScope.phoneNumberParsed = {};

        $rootScope.phoneNumberParsed.result = false;
      };

      $rootScope.resetPhoneNumberChecker();

      $rootScope.phoneNumberParser = function (checked)
      {
        if (checked != '')
        {
          if (checked && checked.length > 0)
          {
            var result, all;

            result = all = phoneNumberParser(checked, 'NL');

            $rootScope.phoneNumberParsed.result = true;

            if (result)
            {
              var error = $rootScope.ui.errors.phone.notValid,
                  invalidCountry = $rootScope.ui.errors.phone.invalidCountry,
                  message;

              if (result.error)
              {
                $rootScope.phoneNumberParsed = {
                  result: false,
                  message: error
                };
              }
              else
              {
                if (! result.validation.isPossibleNumber)
                {
                  switch (result.validation.isPossibleNumberWithReason)
                  {
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
                }
                else
                {
                  if (! result.validation.isValidNumber)
                  {
                    $rootScope.phoneNumberParsed = {
                      result: false,
                      message: error
                    };
                  }
                  else
                  {
                    if (! result.validation.isValidNumberForRegion)
                    {
                      $rootScope.phoneNumberParsed = {
                        result: false,
                        message: invalidCountry
                      };
                    }
                    else
                    {
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
          else
          {
            $rootScope.phoneNumberParsed.result = true;

            delete $rootScope.phoneNumberParsed.message;

            $('#inputPhoneNumber').removeClass('error');
          }
        }
      };

      $('.nav a').on('click', function () { $('.btn-navbar').click() });
    }
  ]);
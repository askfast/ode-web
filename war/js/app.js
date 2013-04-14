'use strict';


/**
 * Declare app level module which depends on filters, and services
 */
angular.module('WebPaige', 
[
  '$strap.directives', 
  'ngResource',
  'WebPaige.Controllers',
  'WebPaige.Directives',
  'WebPaige.Filters',
  'WebPaige.Modals',
  'WebPaige.Services'
])



/**
 * Providers & Routes
 */
.config(
[
  '$locationProvider', '$routeProvider', '$httpProvider',
  function ($locationProvider, $routeProvider, $httpProvider) 
  {
    /**
     * Login router
     */
    $routeProvider
    .when('/login',
    {
      templateUrl: 'js/views/login.html',
      controller: 'login' 
    })

    /**
     * Logout router
     */
    .when('/logout',
    { 
      templateUrl: 'js/views/logout.html',
      controller: 'logout'
    })

    /**
     * Dashboard router
     */
    .when('/dashboard', 
    { 
      templateUrl: 'js/views/dashboard.html',
      controller: 'dashboard'
    })

    /**
     * Planboard router
     */
    .when('/planboard', 
    { 
      templateUrl: 'js/views/planboard.html',
      controller: 'planboard',
      resolve: {
        data: 
        [
          '$route', 'Slots', 'Storage', 'Dater',
          function ($route, Slots, Storage, Dater) 
          {
            var periods = Storage.local.periods(),
                current = Dater.current.week(),
                initial = periods.weeks[current],
                groups  = Storage.local.groups(),
                settings = Storage.local.settings();

            return  Slots.all({
                      groupId:  settings.app.group,
                      division: 'all',
                      stamps: {
                        start:  initial.first.timeStamp,
                        end:    initial.last.timeStamp
                      },
                      month: Dater.current.month(),
                      layouts: {
                        user:     true,
                        group:    true,
                        members:  false
                      }
                    });
          }
        ]
      }
    })

    /**
     * Messages router
     */
    .when('/messages', 
    { 
      templateUrl: 'js/views/messages.html',    
      controller: 'messages',   
      resolve: {
        data: [
          '$route', 'Messages',
          function ($route, Messages) 
          {
            return Messages.query();
          }
        ]
      }, 
      reloadOnSearch: false
    })

    /**
     * Groups router
     */
    .when('/groups',
    {
      templateUrl: 'js/views/groups.html',
      controller: 'groups',
      resolve: {
        data: [
          'Groups',
          function (Groups) 
          {
            return Groups.query();
          }
        ]
      },
      reloadOnSearch: false
    })

    /**
     * Profile (user specific) router
     */
    .when('/profile/:userId', 
    { 
      templateUrl: 'js/views/profile.html',
      controller: 'profile',
      resolve: {
        data: [
          '$rootScope', 'Profile', '$route', '$location', 'Dater',
          function ($rootScope, Profile, $route, $location, Dater) 
          {
            if ($route.current.params.userId != $rootScope.app.resources.uuid)
            {
              var periods = Dater.getPeriods(),
                  current = Dater.current.week(),
                  ranges  = {
                    start:  periods.weeks[current].first.timeStamp / 1000,
                    end:    periods.weeks[current].last.timeStamp / 1000,
                  };

              return Profile.getWithSlots($route.current.params.userId, false, ranges);
            }
            else
            {
              return Profile.get($route.current.params.userId, false);
            };
          }
        ]
      },
      reloadOnSearch: false
    })

    /**
     * Profile (user hiself) router
     */
    .when('/profile', 
    { 
      templateUrl: 'js/views/profile.html', 
      controller: 'profile',
      resolve: {
        data: [
          '$rootScope', '$route', '$location',
          function ($rootScope, $route, $location) 
          {
            if (!$route.current.params.userId || !$location.hash())
              $location.path('/profile/' + $rootScope.app.resources.uuid).hash('profile');
          }
        ]
      }
    })

    /**
     * Settings router
     */
    .when('/settings',
    { 
      templateUrl: 'js/views/settings.html',
      controller: 'settings',
      resolve: {
        data: [
          'Settings',
          function (Settings) 
          {
            return angular.fromJson(Settings.get());
          }
        ]
      }
    })

    /**
     * Help router
     */
    .when('/help',
    {
      templateUrl: 'js/views/help.html',
      controller: 'help'
    })

    /**
     * Router fallback
     */
    .otherwise({ 
      redirectTo: '/login' 
    });

    /**
     * Define interceptor
     */
    $httpProvider.responseInterceptors.push('Interceptor');
  }
])


/**
 * Initial run functions
 */
.run(
[
  '$rootScope', '$location', '$timeout', 'Session', 'Dater', 'Storage', 'Messages', '$config', '$window',
  function ($rootScope, $location, $timeout, Session, Dater, Storage, Messages, $config, $window) 
  {
    /**
     * Pass config and init dynamic config values
     */
    $rootScope.config = $config;

    $rootScope.config.init();


    /**
     * TODO
     * Move these checks to jquery.browser
     * 
     * Pass Jquery browser data to angular
     */
    $rootScope.browser = $.browser;

    angular.extend($rootScope.browser, {
      screen: $window.screen
    });

    if ($rootScope.browser.ios)
    {
      angular.extend($rootScope.browser, {
        landscape:    Math.abs($window.orientation) == 90 ? true : false,
        portrait:     Math.abs($window.orientation) != 90 ? true : false
      });
    }
    else
    {
      angular.extend($rootScope.browser, {
        landscape:    Math.abs($window.orientation) != 90 ? true : false,
        portrait:     Math.abs($window.orientation) == 90 ? true : false
      });
    };

    $window.onresize = function () { $rootScope.browser.screen = $window.screen };

    $window.onorientationchange = function ()
    {
      $rootScope.$apply(function ()
      {
        if ($rootScope.browser.ios)
        {
          angular.extend($rootScope.browser, {
            landscape:    Math.abs($window.orientation) == 90 ? true : false,
            portrait:     Math.abs($window.orientation) != 90 ? true : false
          });
        }
        else
        {
          angular.extend($rootScope.browser, {
            landscape:    Math.abs($window.orientation) != 90 ? true : false,
            portrait:     Math.abs($window.orientation) == 90 ? true : false
          });
        };
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
    if (!Storage.get('periods')) Dater.registerPeriods();


    /**
     * Set important info back if refreshed
     */
    $rootScope.app = $rootScope.app || {};


    /**
     * Set up resources
     */
    $rootScope.app.resources = angular.fromJson(Storage.get('resources'));


    /**
     * Count unread messages
     */
    if (!$rootScope.app.unreadMessages) Messages.unreadCount();


    /**
     * Show action loading messages
     */
    $rootScope.statusBar = 
    {
      init: function ()
      {
        $rootScope.loading = {
          status: false,
          message: 'Loading..'
        };
      },

      display: function (message)
      {
        $rootScope.loading = {
          status:   true,
          message:  message
        };
      },

      off: function ()
      {
        $rootScope.loading.status = false;
      }
    };

    $rootScope.statusBar.init();


    /**
     * Show notifications
     */
    $rootScope.notifier = 
    {
      init: function (status, type, message)
      {
        if ($rootScope.browser.mobile && status == true)
        {
          $window.alert(message);
        }
        else
        {
          $rootScope.notification = {
            status: status,
            type: type,
            message: message
          };
        };
      },

      success: function (message, permanent)
      {
        this.init(true, 'alert-success', message);

        if (!permanent) this.destroy();
      },

      error: function (message, permanent)
      {
        this.init(true, 'alert-danger', message);

        if (!permanent) this.destroy();
      },

      destroy: function ()
      {
        setTimeout(function ()
        {
          $rootScope.notification.status = false;
        }, 5000);
      }
    };

    $rootScope.notifier.init(false, '', '');


    /**
     * Detect route change start
     */
    $rootScope.$on("$routeChangeStart", function (event, next, current)
    {
      if (!Session.check()) $location.path("/login");

      $rootScope.loadingBig = true;

      $rootScope.statusBar.display('Loading..');

      $('div[ng-view]').hide();
    });


    /**
     * Route change successfull
     */
    $rootScope.$on("$routeChangeSuccess", function (event, current, previous)
    {
      $rootScope.newLocation = $location.path();

      $rootScope.loadingBig = false;

      $rootScope.statusBar.off();

      $('div[ng-view]').show();
    });


    /**
     * TODO
     * A better way of dealing with this error!
     * 
     * Route change is failed!
     */
    $rootScope.$on("$routeChangeError", function (event, current, previous, rejection)
    {
      $rootScope.notifier.error("ROUTE CHANGE ERROR: " + rejection);
    });


    /**
     * Fix styles
     */
    $rootScope.fixStyles = function () 
    {    
      // var tabHeight = $('.tabs-left .nav-tabs').height();

      // $.each($('.tab-content').children(), function () 
      // {
      //   var $parent = $(this),
      //       $this = $(this).attr('id'),
      //       contentHeight = $('.tabs-left .tab-content #' + $this).height();

      //   /**
      //    * TODO
      //    * 
      //    * Append left border fix
      //    */
      //   // $parent.append('<div class="left-border-fix"></div>');
      //   // console.log('parent ->', $parent);
      //   // $('#' + $this + ' .left-border-fix').css({
      //   //   height: contentHeight
      //   // });
      //   /**
      //    * Check if one is bigger than another
      //    */
        
      //   if (tabHeight > contentHeight)
      //   {
      //     // console.log('tab is taller than content ->', $this);
      //     $('.tabs-left .tab-content #' + $this).css({
      //       height: $('.tabs-left .nav-tabs').height() - 41
      //     });
      //   }
      //   else if (contentHeight > tabHeight)
      //   {
      //     // console.log('content is taller than tabs ->', $this);
      //     // $('.tabs-left .nav-tabs').css( { height: contentHeight } );
      //   };
      // });

      /**
       * Correct icon-font-library icons for mac and linux
       */
      if ($.os.mac || $.os.linux)
      {
        $('.nav-tabs-app li a span').css({
          paddingTop: '10px', 
          marginBottom: '0px'
        });
        // $('#loading').css({
        //   //marginTop: '-160px'
        //   display: 'none'
        // });
      };
    };

  }
]);


/**
 * Avoid `console` errors in browsers that lack a console
 */
(function ()
{
  var method,
      noop = function() {},
      methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
      ],
      length = methods.length,
      console = (window.console = window.console || {});

  while (length--)
  {
    method = methods[length];

    if (!console[method]) console[method] = noop;
  };
}());


/**
 * Detect IE version for blocking IE6 and IE7
 */
if ($.browser.msie)
{
  var ver = $.browser.version || $.browser.version[0];

  if (ver == '6.0' || ver == '7.0') window.location = 'browsers.html';
};


/**
 * Sticky timeline header
 */
// $('#mainTimeline .timeline-frame div:first div:first').css({'top': '0px'})

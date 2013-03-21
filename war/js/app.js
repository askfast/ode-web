'use strict';


/**
 * TODO
 * Are all dependencies are still needed?
 *
 * Declare app level module which depends on filters, and services
 */
var WebPaige = angular.module('WebPaige', [
  'WebPaige.filters',
  // Still needed?
  'StorageModule',
  // Still needed?
  'timerModule',
  '$strap.directives',
  'ngResource'
]);


/**
 * TODO
 * Finish all the config items and move from other config file
 * Dynamically creating config items??
 *
 * App configuration
 */
WebPaige.
value('$config', config)


/**
 * Configure app
 * There is also configuration tree defined in services
 * for default values
 */
.config(function ($locationProvider, $routeProvider) 
{
  /**
   * Failed attempt to init html5 mode for routes
   */
  // $locationProvider.html5Mode(true);
  // 
  /**
   * Routes
   */
  $routeProvider
  /**
   * Login
   */
  .when('/login', {
    templateUrl: 'js/views/login.html',
    controller: loginCtrl
  })
  /**
   * Logout
   */
  .when('/logout', {
    templateUrl: 'js/views/logout.html',
    controller: loginCtrl.logout
  })
  /**
   * Dashboard
   */
  .when('/dashboard', {
    templateUrl: 'js/views/dashboard.html',
    controller: dashboardCtrl,
    resolve: dashboardCtrl.resolve
  })
  /**
   * Planboard
   */
  .when('/planboard', {
    templateUrl: 'js/views/planboard.html',
    controller: planboardCtrl,
    resolve: planboardCtrl.resolve
  })
  /**
   * Messages
   */
  .when('/messages', {
    templateUrl: 'js/views/messages.html',
    controller: messagesCtrl,
    resolve: messagesCtrl.resolve,
    reloadOnSearch: false
  })
  /**
   * Groups
   */
  .when('/groups', {
    templateUrl: 'js/views/groups.html',
    controller: groupsCtrl,
    resolve: groupsCtrl.resolve,
    reloadOnSearch: false
  })
  /**
   * Profile
   */
  .when('/profile/:userId', {
    templateUrl: 'js/views/profile.html',
    controller: profileCtrl,
    resolve: profileCtrl.resolve,
    reloadOnSearch: false
  })
  /**
   * If no user is given
   */
  .when('/profile', {
    templateUrl: 'js/views/profile.html',
    controller: profileCtrl,
    resolve: profileCtrl.setAccount
  })
  /**
   * Settings
   */
  .when('/settings', {
    templateUrl: 'js/views/settings.html',
    controller: settingsCtrl,
    resolve: settingsCtrl.resolve
  })
  /**
   * Help
   */
  .when('/help', {
    templateUrl: 'js/views/help.html',
    controller: helpCtrl
  })
  /**
   * Redirect
   */
  .otherwise({
    redirectTo: '/login'
  });

})


/**
 * Initial run functions
 */
.run(
['$rootScope', '$location', '$timeout', 'Session', 'Dater', 'Storage', 'Messages', '$config',
function ($rootScope, $location, $timeout, Session, Dater, Storage, Messages, $config) 
{
  /**
   * Default language and change language
   */
  $rootScope.changeLanguage = function (lang)
  {
    $rootScope.ui = ui[lang];
  };
  $rootScope.ui = ui[$config.lang];


  /**
   * Defaults for loading
   */
  $rootScope.loading = {
    status: false,
    message: 'Loading..'
  };


  /**
   * Defaults for notifications
   */
  $rootScope.notification = {
    status: false,
    type: '',
    message: ''
  };


  /**
   * Show notifications
   */
  $rootScope.notify = function (options)
  {
    /**
     * Set notification data
     */
    $rootScope.notification = {
      status: options.status,
      type: options.type,
      message: options.message
    };
    /**
     * Check if is a permanent notification
     */
    if (!options.permanent)
    {
      /**
       * Run timer for fade out
       * on 5 seconds
       */
      setTimeout(function() {
        /**
         * Fade-out with 1 second transition
         */
        $('#notification').fadeOut(1000);
      }, 5000);
    };
  };


  /**
   * If periods are not present calculate them
   */
  if (!Storage.get('periods')) {
    Dater.registerPeriods();
  };


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
  if (!$rootScope.app.unreadMessages) {
    Messages.unreadCount();
  };


  /**
   * TODO
   * Control session mechanism later on!
   *
   * Check for valid session
   */
  if (!Session.check())
  {
    $location.path("/login");
  };


  /**
   * Detect route change start
   */
  $rootScope.$on("$routeChangeStart", function (event, next, current)
  {
    /**
     * TODO
     * !!!!!!!!!!!!!!!!!!!!!!!!!!!
     * A BIG TODO FINISH THIS !!!!
     * !!!!!!!!!!!!!!!!!!!!!!!!!!!
     * Prevent Deep Linking
     */
    if (!Session.check()) $location.path("/login");
    /**
     * Default routing
     */
    $rootScope.loadingBig = true;
    $rootScope.loading = true;
    $('div[ng-view]').hide();
  });


  /**
   * Route change successfull
   */
  $rootScope.$on("$routeChangeSuccess", function (event, current, previous)
  {
    $rootScope.newLocation = $location.path();
    $rootScope.loadingBig = false;
    $rootScope.loading = false;
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
    alert("ROUTE CHANGE ERROR: " + rejection);
  });


  /**
   * Fix styles
   */
  $rootScope.fixStyles = function () 
  {
    /**
     * Fix tab heights
     *
     * Get hieght of the current nav-tabs
     */
    var tabHeight = $('.tabs-left .nav-tabs').height();
    /**
     * Loop through tab-contents
     */
    $.each($('.tab-content').children(), function () 
    {
      /**
       * Extract id
       */
      var $parent = $(this),
          $this = $(this).attr('id'),
          contentHeight = $('.tabs-left .tab-content #' + $this).height();

      /**
       * TODO
       * 
       * Append left border fix
       */
      // $parent.append('<div class="left-border-fix"></div>');
      // console.log('parent ->', $parent);
      // $('#' + $this + ' .left-border-fix').css({
      //   height: contentHeight
      // });

      /**
       * Check if one is bigger than another
       */
      if (tabHeight > contentHeight)
      {
        console.log('tab is taller than content ->', $this);

        $('.tabs-left .tab-content #' + $this).css({
          height: $('.tabs-left .nav-tabs').height() - 41
        });
      }
      else if (contentHeight > tabHeight)
      {
        // console.log('content is taller than tabs ->', $this);
        // $('.tabs-left .nav-tabs').css( { height: contentHeight } );
      };
    });
    /**
     * Correct icon-font-library icons for mac and linux
     */
    if ($.os.mac || $.os.linux)
    {
      /**
       * Nav tans icons
       */
      $('.nav-tabs-app li a span').css({
        paddingTop: '10px', 
        marginBottom: '0px'
      });
      /**
       * TODO
       * Maybe not needed since we dont display text under the icon
       * 
       * Loading big
       */
      $('#loading').css({
        //marginTop: '-160px'
        display: 'none'
      });
    };
  };


}]);
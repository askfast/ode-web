'use strict';

/**
 * TODO
 * Look for ways to implement this into config itself.
 *
 * Change host based on browser
 */
if ($.browser.msie) {
  // IE proxy url
  var host = '/proxy/ns_knrmtest';
} else {
  // Development
  var host = 'http://3rc2.ask-services.appspot.com/ns_knrmtest';
  // Erik
  // return 'http://10.200.200.100\\:8888/ns_knrmtest',
  // Micheal
  // return 'http://10.200.200.201\\:8888/ns_knrmtest',
  // Production
  // return 'http://3rc2.ask-services.appspot.com/ns_knrm',
  // Test
  // return 'http://knrm.ask-static.appspot.com/ns_knrm',
};


/**
 * TODO
 * Are all dependencies are still needed?
 *
 * Declare app level module which depends on filters, and services
 */
var WebPaige = angular.module('WebPaige', [
  'WebPaige.filters',
  'StorageModule',
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
value('$config', 
{
  /**
   * App version
   */
  version: '2.0.0',
  /**
   * Default language
   */
  lang: 'nl',
  /**
   * Real users
   */
  demo_users: true,
  /**
   * Blacklisted browsers
   */
  blacklisted: ['msie'],
  /**
   * Data source host
   */
  host: host,
  /**
   * TODO
   * All date time related values into one place!
   */
  date: {
    format: 'dd-M-yyyy'
  },
  time: {
    format: 'HH:mm tt'
  },
  datetime: {
    format: 'dd-M-yyyy HH:mm tt'
  },
  /**
   * Roles
   */
  roles: [{
    id: 1,
    label: 'Planner'
  }, {
    id: 2,
    label: 'Schipper'
  }, {
    id: 3,
    label: 'Opstapper'
  }],
  /**
   * Timeline options
   */
  timeline: {
    /**
     * Plugin options
     */
    options: {
      axisOnTop: true,
      width: '100%',
      height: 'auto',
      selectable: true,
      editable: true,
      style: 'box',
      groupsWidth: '150px',
      eventMarginAxis: 0,
      showCustomTime: true,
      groupsChangeable: false,
      showNavigation: false,
      intervalMin: 1000 * 60 * 60 * 1
    },
    /**
     * Timeline app settings
     */
    config: {
      /**
       * Zoom value
       */
      zoomValue: '0.4',
      /**
       * Bar charts for group agg. data
       */
      bar: false,
      /**
       * Group wishes setting
       */
      wishes: false,
      /**
       * Timeline legenda settings
       */
      legenda: {},
      legendarer: false,
      /**
       * TODO
       * Take out KNRM stuff out of app config
       *
       * Availability states
       */
      states: {
        'com.ask-cs.State.Available': {
          'className': 'state-available',
          'label': 'Beschikbaar',
          'color': '#4f824f',
          'type': 'Beschikbaar'
        },
        'com.ask-cs.State.KNRM.BeschikbaarNoord': {
          'className': 'state-available-north',
          'label': 'Beschikbaar voor Noord',
          'color': '#000',
          'type': 'Beschikbaar'
        },
        'com.ask-cs.State.KNRM.BeschikbaarZuid': {
          'className': 'state-available-south',
          'label': 'Beschikbaar voor Zuid',
          'color': '#e08a0c',
          'type': 'Beschikbaar'
        },
        'com.ask-cs.State.Unavailable': {
          'className': 'state-unavailable',
          'label': 'Niet Beschikbaar',
          'color': '#a93232',
          'type': 'Niet Beschikbaar'
        },
        'com.ask-cs.State.KNRM.SchipperVanDienst': {
          'className': 'state-schipper-service',
          'label': 'Schipper van Dienst',
          'color': '#e0c100',
          'type': 'Beschikbaar'
        },
        'com.ask-cs.State.Unreached': {
          'className': 'state-unreached',
          'label': 'Niet Bereikt',
          'color': '#65619b',
          'type': 'Niet Beschikbaar'
        }
      },
      /**
       * TODO
       * Take out KNRM stuff out of app config
       *
       * Any given divisions
       */
      divisions: [{
        id: 'all',
        label: 'All divisions'
      }, {
        id: 'knrm.StateGroup.BeschikbaarNoord',
        label: 'Noord'
      }, {
        id: 'knrm.StateGroup.BeschikbaarZuid',
        label: 'Zuid'
      }],
      /**
       * Density based colors for group aggs.
       */
      densities: {
        less: '#a0a0a0',
        even: '#ba6a24',
        one: '#415e6b',
        two: '#3d5865',
        three: '#344c58',
        four: '#2f4550',
        five: '#2c424c',
        six: '#253943',
        more: '#486877'
      }
    }
  },
  pie: {
    colors: ['#415e6b', '#ba6a24', '#a0a0a0']
  }
})


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
  //$locationProvider.html5Mode(true);
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
  $rootScope.changeLanguage = function(lang) {
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
  $rootScope.notify = function(options) {
    console.warn('notification inited');

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
    if (!options.permanent) {
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

  if (!Session.check()) {
    $location.path("/login");
  };


  /**
   * Detect route change start
   */
  $rootScope.$on("$routeChangeStart", function(event, next, current) {
    /**
     * TODO
     *
     * !!!!!!!!!!!!!!!!!!!!!!!!!!!
     * A BIG TODO FINISH THIS !!!!
     * !!!!!!!!!!!!!!!!!!!!!!!!!!!
     *
     * Prevent Deep Linking
     * @type {String}
     */
    if (!Session.check()) $location.path("/login");

    $rootScope.loadingBig = true;
    $rootScope.loading = true;
    $('div[ng-view]').hide();
  });


  /**
   * Route change successfull
   */
  $rootScope.$on("$routeChangeSuccess", function(event, current, previous) {
    $rootScope.newLocation = $location.path();
    $rootScope.loadingBig = false;
    $rootScope.loading = false;
    $('div[ng-view]').show();
  });


  /**
   * Route change is failed!
   */
  $rootScope.$on("$routeChangeError", function(event, current, previous, rejection) {
    alert("ROUTE CHANGE ERROR: " + rejection);
  });



  $rootScope.fixCss = function ()
  {
    /**
     * Correct icon-font-library icons for mac and linux
     */
    if ($.os.mac || $.os.linux)
    {
      $('.nav-tabs-app li a span').css({paddingTop: '10px', marginBottom: '0px'});
    }
  };



  /**
   * TODO
   * Should be finished!
   * Fix left border issue as well!
   *
   * Manually fix the height of content tab
   */
  $rootScope.fixTabHeight = function(uuid) {
    var tabHeight = $('.tabs-left .nav-tabs').height();
    var contentHeight = $('.tabs-left .tab-content #' + uuid).height();
    if (tabHeight > contentHeight) {
      $('.tabs-left .tab-content #' + uuid).css({
        height: $('.tabs-left .nav-tabs').height() - 41
      });
    }
    // else if (contentHeight > tabHeight)
    // {
    //   //console.warn('content is bigger than tabs ->', contentHeight);
    //   $('.tabs-left .nav-tabs').css( { height: contentHeight } );
    // };
  };


}]);
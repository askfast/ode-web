'use strict';

/**
 * Declare app level module which depends on filters, and services
 */
var WebPaige = angular.module('WebPaige', 
  [ 'WebPaige.filters', 
    'StorageModule',
    'timerModule', 
    '$strap.directives',
    'ngResource']);


/**
 * TODO
 * Finish all the config items and move from other config file
 * Dynamically creating config items??
 * 
 * App configuration
 */
WebPaige.
  value('$config', {
    /**
     * App version
     */
    version: '2.0.0',
    /**
     * Blacklisted browsers
     */
    blacklisted: ['msie'],
    /**
     * Data source host
     */
    host: 'http://3rc2.ask-services.appspot.com/ns_knrmtest',
    //host: 'http://10.200.200.100\\:8888/ns_knrmtest',
    //host: 'http://3rc2.ask-services.appspot.com/ns_knrm',
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
    roles: [
      {
        id: 1,
        label: 'Planner'
      },
      {
        id: 2,
        label: 'Schipper'
      },
      {
        id: 3,
        label: 'Opstapper'
      }
    ],
    /**
     * Timeline options
     */
    timeline: {
      /**
       * REMOVE
       * Still needed?
       */
      period: {
        bstart: (parseInt((new Date()).getTime() / 1000) - 86400 * 7 * 1),
        bend:   (parseInt((new Date()).getTime() / 1000) + 86400 * 7 * 1),
        start:  Date.today().add({ days: -2 }),
        end:    Date.today().add({ days: 12 })
      },
      /**
       * TODO
       * setting properties dynamically is not working yet!!
       */
      settings: {
        /**
         * REMOVE
         * Still needed?
         */
        ranges: {
          period: this.period,
          reset: this.period
        },
        /**
         * Zoom value
         */
        zoomValue: '0.4' 
      },
      /**
       * TODO 
       * Combine options with settings
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
        // showNavigation: true,
        // periods
        // start: Date.today().add({ days: -2 }),
        // end: Date.today().add({ days: 12 }),
        // end periods
        // min: "2013-01-01T00:00:00.000Z",
        // max: "2013-12-31T00:00:00.000Z",
        // intervals
        intervalMin: 1000 * 60 * 60 * 1,
        // intervalMax: 1000 * 60 * 60 * 24 * 7 * 2
      },
      config: {
        /**
         * Bar charts for group agg. data
         */
        bar: true,
        /**
         * Group wishes setting
         */
        wishes: true,
        /**
         * Timeline legenda settings
         */
        legenda: {},
        legendarer: false,
        /**
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
         * Any given divisions
         */
        divisions: [
          {
            id: 'all',
            label: 'All divisions'
          },
          {
            id: 'knrm.StateGroup.BeschikbaarNoord',
            label: 'Noord'
          },
          {
            id: 'knrm.StateGroup.BeschikbaarZuid',
            label: 'Zuid'
          }
        ],
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
  }
)


/**
 * Configure app
 * There is also configuration tree defined in services
 * for default values
 */
.config(function($locationProvider, $routeProvider)
  {
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
       * Message
       */
      .when('/messages/:messageId', {
          templateUrl: 'js/views/messages.html', 
          controller: messagesCtrl,
          resolve: messagesCtrl.resolve   
      })
      /**
       * Messages
       */
      .when('/messages', {
          templateUrl: 'js/views/messages.html', 
          controller: messagesCtrl,
          resolve: messagesCtrl.resolve   
      })
      /**
       * Groups
       */
      .when('/groups', {
          templateUrl: 'js/views/groups.html', 
          controller: groupsCtrl,
          resolve: groupsCtrl.resolve
      })
      /**
       * Profile :: view
       */
      .when('/profile/:userId/:action', {
          templateUrl: 'js/views/profile.html', 
          controller: profileCtrl,
          resolve: profileCtrl.resolve
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
['$rootScope', '$location', '$timeout', 'Session', 'Dater', 'Storage', 'Messages', 
function($rootScope, $location, $timeout, Session, Dater, Storage, Messages)
{
  /**
   * If periods are not present calculate them
   */
  if (!Storage.get('periods'))
  {
    Dater.registerPeriods();
  };


  /**
   * Set important info back if refreshed
   */
  $rootScope.app = $rootScope.app || {};
   // if (!$rootScope.app.resources)
   // {
     $rootScope.app.resources = angular.fromJson(Storage.get('resources'));
   // };
   if (!$rootScope.app.unreadMessages)
   {
     $rootScope.app.unreadMessages = Messages.unreadCount();
   };


  /**
   * TODO
   * Control session mechanism later on!
   * 
   * Check for valid session
   */
  Session.check();


  /**
   * TODO
   */
  $rootScope.page = new Object;


  /**
   * Detect route change start
   */
  $rootScope.$on("$routeChangeStart", function (event, next, current) 
  {
    /**
     * TODO
     * Define a dynamic way for page titles
     */
    $rootScope.page.title = $location.url();

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
    //if (!Session.check()) window.location = "#/login";

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
   * Route change is failed!
   */
  $rootScope.$on("$routeChangeError", function (event, current, previous, rejection) 
  {
    alert("ROUTE CHANGE ERROR: " + rejection);
  });





  $rootScope.fixTabHeight = function(uuid)
  {
    var tabHeight = $('.tabs-left .nav-tabs').height();
    var contentHeight = $('.tabs-left .tab-content #' + uuid).height();
    if (tabHeight > contentHeight)
    {
      $('.tabs-left .tab-content #' + uuid).css({ height: $('.tabs-left .nav-tabs').height() - 41 });
    }
    // else if (contentHeight > tabHeight)
    // {
    //   //console.warn('content is bigger than tabs ->', contentHeight);
    //   $('.tabs-left .nav-tabs').css( { height: contentHeight } );
    // };
  };


}]);
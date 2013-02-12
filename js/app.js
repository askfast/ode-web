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
    version: '0.2.0',
    /**
     * Blacklisted browsers
     */
    blacklisted: ['msie'],
    /**
     * Data source host
     */
    host: 'http://3rc2.ask-services.appspot.com/ns_knrmtest',
    //host: 'http://10.200.200.201\\:8888/ns_knrmtest',
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
        //showNavigation: true,
        groupsChangeable: true,
        // periods
        //start: Date.today().add({ days: -2 }),
        //end: Date.today().add({ days: 12 }),
        // end periods
        //min: "2013-01-01T00:00:00.000Z",
        //max: "2013-12-31T00:00:00.000Z",
        // intervals
        intervalMin: 1000 * 60 * 60 * 1,
        //intervalMax: 1000 * 60 * 60 * 24 * 7 * 2
      },
      config: {
        /**
         * Bar charts for group agg. data
         */
        bar: false,
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
        //densities: ['#294929', '#4f824f', '#477547', '#436f43', '#3d673d', '#396039', '#335833', '#305330'] 
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
        templateUrl: 'partials/login.html', 
        controller: loginCtrl
      })
      /**
       * Logout
       */
      .when('/logout', {
        templateUrl: 'partials/login.html', 
        controller: loginCtrl.logout
      })
      /**
       * Dashboard
       */
      .when('/dashboard', {
        templateUrl: 'partials/dashboard.html', 
        controller: dashboardCtrl,
        resolve: dashboardCtrl.resolve   
      })
      /**
       * Planboard
       */
      // .when('/planboard/:layouts/:groupId/:division/:month', {
      //     templateUrl: 'partials/planboard.html', 
      //     controller: planboardCtrl,
      //     resolve: planboardCtrl.resolve    
      // })
      /**
       * Planboard
       */
      .when('/planboard/', {
          templateUrl: 'partials/planboard.html', 
          controller: planboardCtrl,
          resolve: planboardCtrl.resolve    
      })
      /**
       * Messages
       */
      .when('/messages', {
          templateUrl: 'partials/messages.html', 
          controller: messagesCtrl,
          resolve: messagesCtrl.resolve   
      })
      /**
       * Groups
       */
      .when('/groups', {
          templateUrl: 'partials/groups.html', 
          controller: groupsCtrl,
          resolve: groupsCtrl.resolve
      })
      /**
       * Groups :: view
       */
      // .when('/groups/:groupId/:action', {
      //     templateUrl: 'partials/groups.html', 
      //     controller: groupsCtrl,
      //     resolve: groupsCtrl.resolve
      // })
      /**
       * Profile :: view
       */
      .when('/profile/:userId/view', {
          templateUrl: 'partials/profile.html', 
          controller: profileCtrl,
          resolve: profileCtrl.resolve
      })
      /**
       * Profile :: edit [userId]
       */
      .when('/profile/:userId/edit', {
          templateUrl: 'partials/profile-edit.html', 
          controller: profileCtrl,
          resolve: profileCtrl.resolve
      })
      /**
       * Profile :: change password [userId]
       */
      .when('/profile/:userId/password', {
          templateUrl: 'partials/profile-password.html', 
          controller: profileCtrl,
          resolve: profileCtrl.resolve
      })
      /**
       * Settings
       */
      .when('/settings', {
          templateUrl: 'partials/settings.html', 
          controller: settingsCtrl,
          resolve: settingsCtrl.resolve   
      })
      /**
       * Angular-Strap
       */
      // .when('/angular-strap', {
      //     templateUrl: 'partials/angular-strap.html', 
      //     controller: StrapCtrl
      // })
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
['$rootScope', '$location', '$timeout', 'Session', 'Dater', 'Storage',
function($rootScope, $location, $timeout, Session, Dater, Storage)
{
  /**
   * If periods are not present calculate them
   */
  if (!Storage.get('periods'))
  {
    Dater.registerPeriods();
  };


  /**
   * Cehck for valid session
   */
  Session.check();


  /**
   * REMOVE
   * This part is only needed for by-passing login
   * only for testing and development
   */
  $rootScope.sessionID = localStorage.getItem('sessionID');


  /**
   * REMOVE
   * Still needed?
   */
  $rootScope.saveSession = function(sessionID)
  {
    localStorage.setItem('sessionID', sessionID);
    $rootScope.notify( { message: 'New sessionID is set.' } );
  };


  /**
   * REMOVE
   * Still needed?
   */
  $rootScope.clearLocalSlots = function()
  {
    var sessionID = localStorage.getItem('sessionID');    
    for (var i in localStorage)
    {
      localStorage.removeItem(i);
    };
    localStorage.setItem('sessionID', sessionID);
    $rootScope.notify(
      {
        message: 'Cache is deleted.' 
      }
    );
    $rootScope.notify(
      {
        message: 'Please refresh to get fresh data from back-end.' 
      }
    );
  };


  /**
   * TODO
   * This values should be originating from
   * resource call data just after login
   */
  $rootScope.user = {
    name: 'AppTest KNRM',
    uuid: 'apptestknrm'
  };
  //$rootScope.user = angular.fromJson((localStorage.getItem('resources') || {}));


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


    $rootScope.alertType = "";
    $rootScope.alertMessage = "Loading...";
    $rootScope.active = "progress-striped active progress-warning";
  });
  

  /**
   * Route change successfull
   */
  $rootScope.$on("$routeChangeSuccess", function (event, current, previous) 
  {
    $rootScope.alertType = "alert-success";
    $rootScope.alertMessage = "Successfully loaded :]";
    $rootScope.active = "progress-success";

    $rootScope.newLocation = $location.path();
  });


  /**
   * Route change is failed!
   */
  $rootScope.$on("$routeChangeError", function (event, current, previous, rejection) 
  {
    alert("ROUTE CHANGE ERROR: " + rejection);
    $rootScope.alertType = "alert-error";
    $rootScope.alertMessage = "Failed to load data :[";
    $rootScope.active = "";
  });


  /**
   * General status messages
   */
  $rootScope.alertType = "alert-info";
  $rootScope.alertMessage = "Welcome to the resolve demo";


  /**
   * TODO
   * Make a service out of this!
   * @type {Object}
   */
  jQuery.fn.notify.defaults = {
    type: config.notifier.type,
    closable: config.notifier.closable,
    transition: config.notifier.transition,
    fadeOut: {
      enabled: config.notifier.fadeOut.enabled,
      delay: config.notifier.fadeOut.delay
    },
    message: config.notifier.message,
    onClose: function () {},
    onClosed: function () {}
  };

  $rootScope.notify = function(options)
  {
    //$('.notifications').notify(options).show();
  };


}]);
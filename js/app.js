'use strict';

/**
 * Declare app level module which depends on filters, and services
 */
var WebPaige = angular.module('WebPaige', 
  [ 'WebPaige.settings', 
    'WebPaige.filters', 
    'StorageModule',
    'timerModule',
    'WebPaige.directives', 
    '$strap.directives', 
    'SlotServices']);


/**
 * Configure app
 * There is also configuration tree defined in services
 * for default values
 */
WebPaige.config(function($locationProvider, $routeProvider, $httpProvider)
  {
    /**
     * Set custom session header
     */
    $httpProvider.defaults.headers.common['X-SESSION_ID'] = localStorage.getItem('sessionID');

    $routeProvider
    	/**
    	 * Dashboard
    	 */
    	.when('/dashboard', {
	    	templateUrl: 'partials/dashboard.html', 
	    	controller: dashboardCtrl
	    })
      /**
       * Planboard
       */
      .when('/planboard', {
          templateUrl: 'partials/planboard.html', 
          controller: planboardCtrl,
          resolve: planboardCtrl.resolve    
      })
      /**
       * Messages
       */
      .when('/messages', {
          templateUrl: 'partials/messages.html', 
          controller: messagesCtrl
      })
      /**
       * Groups&Users
       */
      .when('/groups', {
          templateUrl: 'partials/groups.html', 
          controller: groupsCtrl
      })
      /**
       * Profile
       */
      .when('/profile', {
          templateUrl: 'partials/profile.html', 
          controller: profileCtrl
      })
      /**
       * Settings
       */
      .when('/settings', {
          templateUrl: 'partials/settings.html', 
          controller: settingsCtrl
      })
      /**
       * Angular-Strap
       */
      .when('/angular-strap', {
          templateUrl: 'partials/angular-strap.html', 
          controller: StrapCtrl
      })
    /**
     * Redirect
     */
  	.otherwise({
    	redirectTo: '/dashboard'
    });

  });



/**
 * Initial run functions
 */
WebPaige.run(
['$rootScope', '$location', '$timeout', 
function($rootScope, $location, $timeout)
{
  /**
   * REMOVE
   * This part is only needed for by-passing login
   * only for testing and development
   */
  $rootScope.sessionID = localStorage.getItem('sessionID');
  $rootScope.saveSession = function(sessionID)
  {
    localStorage.setItem('sessionID', sessionID);
    $rootScope.notify( { message: 'New sessionID is set.' } );
  }
  $rootScope.clearLocalSlots = function()
  {
    localStorage.removeItem('WebPaige.slots');
    $rootScope.notify(
      {
        message: 'Slots cache deleted. Please refresh to get fresh data from back-end.' 
      }
    );
  }
  

  /**
   * TODO
   * This values should be originating from
   * resource call data just after login
   */
  $rootScope.user = {
    uuid: 'apptestknrm'
  };

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
    $rootScope.alertMessage = "Successfully changed routes :]";
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
    $rootScope.alertMessage = "Failed to change routes :[";
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
    $('.notifications').notify(options).show();
  };


}]);

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


WebPaige.config(function($locationProvider, $routeProvider, $httpProvider)
  {
    $httpProvider.defaults.headers.common['X-SESSION_ID'] ='e574dea4f3d76b3d0d2047d5a77d2fbe8f3b01b075800771076ac3410aa70899';

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



//
// Run initialers
WebPaige.run(
['$rootScope', '$location', '$timeout', 
function($rootScope, $location, $timeout)
{
  
  $rootScope.user = {
    uuid: 'apptestknrm'
  };

  $rootScope.page = new Object;

  $rootScope.$on("$routeChangeStart", function (event, next, current) 
  {
    /**
     * TODO
     */
    $rootScope.page.title = $location.url();

    $rootScope.alertType = "";
    $rootScope.alertMessage = "Loading...";
    $rootScope.active = "progress-striped active progress-warning";
  });
  
  $rootScope.$on("$routeChangeSuccess", function (event, current, previous) 
  {
    $rootScope.alertType = "alert-success";
    $rootScope.alertMessage = "Successfully changed routes :]";
    $rootScope.active = "progress-success";

    $rootScope.newLocation = $location.path();
  });

  $rootScope.$on("$routeChangeError", function (event, current, previous, rejection) 
  {
    alert("ROUTE CHANGE ERROR: " + rejection);
    $rootScope.alertType = "alert-error";
    $rootScope.alertMessage = "Failed to change routes :[";
    $rootScope.active = "";
  });

  $rootScope.alertType = "alert-info";
  $rootScope.alertMessage = "Welcome to the resolve demo";





  

  

}]);








/**
 * Avoid `console` errors in browsers that lack a console.
 */
/*
(function() {
    var method;
    var noop = function noop() {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());
*/
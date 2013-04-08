'use strict';


/**
 * Declare app level module which depends on filters, and services
 */
var WebPaige = angular.module('WebPaige', ['StorageModule', '$strap.directives', 'ngResource']);


/**
 * App configuration
 */
WebPaige
.value('$config', 
{
  version: '2.0.2',

  lang: 'nl',

  // REMOVE
  demo_users: false,

  profile: {
    meta: profile.meta,
    title: profile.title,
    logos: {
      login: 'profiles/' + profile.meta + '/img/login_logo.png',
      app: ''
    },
    background: 'profiles/' + profile.meta + '/img/login_bg.jpg', // jpg for smaller size,
    p2000: profile.p2000
  },

  statesall: {
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

  host: profile.host(),

  formats: {
    date:     'dd-M-yyyy',
    time:     'hh:mm',
    datetime: 'dd-MM-yyyy HH:mm',
    datetimefull: 'dd-MM-yyyy HH:mm'
    // time:     'hh:mm tt',
    // datetime: 'dd-M-yyyy HH:mm tt'
  },

  roles: profile.roles,

  timeline: {
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
    config: {
      zoom: '0.4',
      bar: false,
      wishes: false,
      legenda: {},
      legendarer: false,
      states: {},
      divisions: profile.divisions,
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

  pie: { colors: ['#415e6b', '#ba6a24', '#a0a0a0'] },

  defaults: {
    settingsWebPaige: {
      user: {
        language: 'nl'
      },
      app: {
        widgets: {
          groups: {}
        }
      }
    }
  },

  init: function ()
  {
    var _this = this;

    angular.forEach(profile.states, function (state, index)
    {
      _this.timeline.config.states[state] = _this.statesall[state];
    });
  }
})


/**
 * Providers
 */
.config(function ($locationProvider, $routeProvider, $httpProvider) 
{
  /**
   * Routes
   */
  $routeProvider
  .when('/login',     { templateUrl: 'js/views/login.html',       controller: loginCtrl })
  .when('/logout',    { templateUrl: 'js/views/logout.html',      controller: loginCtrl.logout })
  .when('/dashboard', { templateUrl: 'js/views/dashboard.html',   controller: dashboardCtrl })
  .when('/planboard', { templateUrl: 'js/views/planboard.html',   controller: planboardCtrl,  resolve: planboardCtrl.resolve })
  .when('/messages',  { templateUrl: 'js/views/messages.html',    controller: messagesCtrl,   resolve: messagesCtrl.resolve,  reloadOnSearch: false})
  .when('/groups',    { templateUrl: 'js/views/groups.html',      controller: groupsCtrl,     resolve: groupsCtrl.resolve,    reloadOnSearch: false})
  .when('/profile/:userId', { templateUrl: 'js/views/profile.html', controller: profileCtrl,  resolve: profileCtrl.resolve,   reloadOnSearch: false})
  .when('/profile',   { templateUrl: 'js/views/profile.html',     controller: profileCtrl,    resolve: profileCtrl.setAccount })
  .when('/settings',  { templateUrl: 'js/views/settings.html',    controller: settingsCtrl,   resolve: settingsCtrl.resolve })
  .when('/help',      { templateUrl: 'js/views/help.html',        controller: helpCtrl })
  .otherwise({ redirectTo: '/login' });

  /**
   * Define interceptor
   */
  $httpProvider.responseInterceptors.push('Interceptor');
})


/**
 * Initial run functions
 */
.run(['$rootScope', '$location', '$timeout', 'Session', 'Dater', 'Storage', 'Messages', '$config',
function ($rootScope, $location, $timeout, Session, Dater, Storage, Messages, $config) 
{
  /**
   * Pass config and init dynamic config values
   */
  $rootScope.config = $config;

  $rootScope.config.init();


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
      $rootScope.notification = {
        status: status,
        type: type,
        message: message
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

    $rootScope.statusBar.display('');

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
    alert("ROUTE CHANGE ERROR: " + rejection);
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

}]);
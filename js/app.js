'use strict';

/**
 * TODO
 * Are all dependencies are still needed?
 * 
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
    // Development
    // host: 'http://3rc2.ask-services.appspot.com/ns_knrmtest',
    // Erik
    // host: 'http://10.200.200.100\\:8888/ns_knrmtest',
    // Micheal
    // host: 'http://10.200.200.201\\:8888/ns_knrmtest',
    // // Production
    host: 'http://3rc2.ask-services.appspot.com/ns_knrm',
    // // Test
    // host: 'http://knrm.ask-static.appspot.com/ns_knrm',
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
    pie: {
      colors: ['#415e6b', '#ba6a24', '#a0a0a0']
    }
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
['$rootScope', '$location', '$timeout', 'Session', 'Dater', 'Storage', 'Messages', 
function($rootScope, $location, $timeout, Session, Dater, Storage, Messages)
{
  /**
   * Check for os
   */
  if (navigator.appVersion.indexOf("Mac") != -1 || 
      navigator.appVersion.indexOf("X11") != -1 || 
      navigator.appVersion.indexOf("Linux") != -1)
  {
    console.log('not windows');
  };


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
  

  /**
   * Set up resources
   */
  $rootScope.app.resources = angular.fromJson(Storage.get('resources'));


  /**
   * Count unread messages
   */
  if (!$rootScope.app.unreadMessages)
  {
    Messages.unreadCount();
  };


  /**
   * TODO
   * Control session mechanism later on!
   * 
   * Check for valid session
   */
   
  if(!Session.check())
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


  /**
   * TODO
   * Should be finished!
   * Fix left border issue as well!
   * 
   * Manually fix the height of content tab
   */
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


  // /**
  //  * TODO
  //  * Find better ways of doing this!
  //  *
  //  * Position footer always at the bottom
  //  */
  // $(window).scroll(function()
  // {
  //   $('#footer').css({
  //     position: 'absolute',
  //     bottom: 0
  //   });
  // });


}]);































/**
 * OLD CONFIG REMOVE NOT NEEDED ONES OR MOVE TO app.config
 */


var config = {

  validator: {
    errorClass: "label label-important", // "error"
    validClass: "valid",
    errorElement: "label", // "span"
    focusInvalid: true,
    errorContainer: [],
    errorLabelContainer: [],
    onsubmit: true,
    ignore: ":hidden",
    ignoreTitle: false,
  },

  notifier: {
    type: 'bangTidy',
    closable: true,
    transition: 'fade',
    fadeOut: {
      enabled: true,
      delay: 6000
    },
    message: null,    
  },

  data: {
    planboard: {
      syncInterval: 60000 * 2
    }
  }
  
}





// TODO
// Language settings

var ui = {
    en: {
      login: {
        title: "Login",
        header: "Login",
        label_username: "Please enter your username",
        placeholder_username: "Username",
        label_password: "Your password",
        placeholder_password: "Password",
        label_rememberMe: "Remember Me",
        button_login: "Login",
        button_loggingIn: "Logging.."
      },
      error: {
        required: "This field is required.",
        remote: "Please fix this field.",
        email: "Please enter a valid email address.",
        url: "Please enter a valid URL.",
        date: "Please enter a valid date.",
        dateISO: "Please enter a valid date (ISO).",
        number: "Please enter a valid number.",
        digits: "Please enter only digits.",
        creditcard: "Please enter a valid credit card number.",
        equalTo: "Please enter the same value again.",
        maxlength: "Please enter no more than {0} characters.",
        minlength: "Please enter at least {0} characters.",
        rangelength: "Please enter a value between {0} and {1} characters long.",
        range: "Please enter a value between {0} and {1}.",
        max: "Please enter a value less than or equal to {0}.",
        min: "Please enter a value greater than or equal to {0}.",

        messages: {
          login: "<strong>Login failed!</strong><br>Wrong username or password."
        },

        ajax: {
          noConnection: "Not connected! Verify your network.",
          badRequest: "Bad request!",
          notFound: "Requested page not found!",
          serverError: "Internal server error",
          parserError: "Requested JSON parse failed",
          timeout: "Timeout error!",
          abort: "Ajax request aborted.",
          uncaughtError: "Uncaught Error. "
        }
      }
    },
    nl: {
      login: {
        title: "Login",
        header: "Login",
        label_username: "Vul uw gebruikersnaam in",
        placeholder_username: "Gebruikersnaam",
        label_password: "Vul uw wachtwoord in",
        placeholder_password: "Wachtwoord",
        label_rememberMe: "Onthoud mij",
        button_login: "Login",
        button_loggingIn: "Inloggen.."
      },
      error: {
        required: "Dit is een verplicht veld.",
        remote: "Controleer dit veld.",
        email: "Vul hier een geldig e-mailadres in.",
        url: "Vul hier een geldige URL in.",
        date: "Vul hier een geldige datum in.",
        dateISO: "Vul hier een geldige datum in (ISO-formaat).",
        number: "Vul hier een geldig getal in.",
        digits: "Vul hier alleen getallen in.",
        creditcard: "Vul hier een geldig creditcardnummer in.",
        equalTo: "Vul hier dezelfde waarde in.",
        accept: "Vul hier een waarde in met een geldige extensie.",
        maxlength: "Vul hier maximaal {0} tekens in.",
        minlength: "Vul hier minimaal {0} tekens in.",
        rangelength: "Vul hier een waarde in van minimaal {0} en maximaal {1} tekens.",
        range: "Vul hier een waarde in van minimaal {0} en maximaal {1}.",
        max: "Vul hier een waarde in kleiner dan of gelijk aan {0}.",
        min: "Vul hier een waarde in groter dan of gelijk aan {0}.",

        messages: {
          login: "<strong>Inloggen is mislukt!</strong><br>Onjuiste gebruikersnaam of wachtwoord."
        },

        ajax: {
          noConnection: "Niet verbonden met Internet! Controleer uw netwerk instellingen.",
          badRequest: "Ongeldig verzoek!",
          notFound: "De verzochte pagina wordt niet gevonden!",
          serverError: "Interne server foutmelding!",
          parserError: "Het is niet lukt om de verzochte JSON te ontleden!",
          timeout: "Timeout foutmelding!",
          abort: "Ajax verzoek is afgebroken!",
          uncaughtError: "De oorzak van de foutmelding is onbekend. "
        }
      }         
    }
}




  var knrm_users = [
    {
        "config": {},
        "name": "Chris  2Aldewereld",
        "personalAgentUrl": "http://sven.ask-services.appspot.com/eveagents/personalagent/4780aldewereld/",
        "rate": 1,
        "resources": {
            "id": "4780aldewereld",
            "askPass": "d9a6c9bad827746190792cf6f30d5271",
            "name": "Chris  2Aldewereld",
            "PhoneAddress": "+31648204528",
            "role": "3"
        },
        "state": "com.ask-cs.State.NoPlanning",
        "uuid": "4780aldewereld"
    },
    {
        "config": {},
        "name": "Joost  1 Smits",
        "personalAgentUrl": "http://sven.ask-services.appspot.com/eveagents/personalagent/4781smits/",
        "rate": 1,
        "resources": {
            "id": "4781smits",
            "askPass": "2d648681d9352378a5e567f08eaf9677",
            "name": "Joost  1 Smits",
            "PhoneAddress": "+31634458934",
            "role": "3"
        },
        "state": "com.ask-cs.State.NoPlanning",
        "uuid": "4781smits"
    },
    {
        "config": {},
        "name": "Mario  Vroon",
        "personalAgentUrl": "http://sven.ask-services.appspot.com/eveagents/personalagent/4783vroon/",
        "rate": 1,
        "resources": {
            "id": "4783vroon",
            "askPass": "d3745e9ed55d046445dda6ed33d0b660",
            "name": "Mario  Vroon",
            "PhoneAddress": "+31642479178",
            "role": "2"
        },
        "state": "com.ask-cs.State.NoPlanning",
        "uuid": "4783vroon"
    },
    {
        "config": {},
        "name": "Robert  1 Faase",
        "personalAgentUrl": "http://sven.ask-services.appspot.com/eveagents/personalagent/4782faase/",
        "rate": 1,
        "resources": {
            "id": "4782faase",
            "askPass": "29530e3085d6b3df773b4e1090605053",
            "name": "Robert  1 Faase",
            "PhoneAddress": "+31652588740",
            "role": "3"
        },
        "state": "com.ask-cs.State.NoPlanning",
        "uuid": "4782faase"
    },
    {
        "config": {},
        "name": "Michiel  1 Wondergem",
        "personalAgentUrl": "http://sven.ask-services.appspot.com/eveagents/personalagent/4534wondergem/",
        "rate": 1,
        "resources": {
            "id": "4534wondergem",
            "askPass": "8efb377daa5134ddbf895c1bdaf99415",
            "name": "Michiel  1 Wondergem",
            "PhoneAddress": "+31650909756",
            "role": "3"
        },
        "state": "com.ask-cs.State.NoPlanning",
        "uuid": "4534wondergem"
    },
    {
        "config": {},
        "name": "apptest  knrm",
        "personalAgentUrl": "http://sven.ask-services.appspot.com/eveagents/personalagent/apptestknrm/",
        "rate": 1,
        "resources": {
            "id": "apptestknrm",
            "askPass": "eadeb77d8fba90b42b32b7de13e8aaa6",
            "name": "apptest  knrm",
            "EmailAddress": "dferro@ask-cs.com",
            "PhoneAddress": "+31627033823",
            "role": "1"
        },
        "state": "com.ask-cs.State.NoPlanning",
        "uuid": "apptestknrm"
    },
    {
        "config": {},
        "name": "Joris  2Rietveld",
        "personalAgentUrl": "http://sven.ask-services.appspot.com/eveagents/personalagent/4641rietveld/",
        "rate": 1,
        "resources": {
            "id": "4641rietveld",
            "askPass": "8aafe6da6bfdda3ea926d60d0fcb612b",
            "name": "Joris  2Rietveld",
            "PhoneAddress": "+31681539352",
            "role": "3"
        },
        "state": "com.ask-cs.State.NoPlanning",
        "uuid": "4641rietveld"
    },
    {
        "config": {},
        "name": "Peter  Kuiphof",
        "personalAgentUrl": "http://sven.ask-services.appspot.com/eveagents/personalagent/4640kuiphof/",
        "rate": 1,
        "resources": {
            "id": "4640kuiphof",
            "askPass": "8b9d6e5c2cab60fb8b044c7bf1acb9a9",
            "name": "Peter  Kuiphof",
            "PhoneAddress": "+31651262411",
            "role": "3"
        },
        "state": "com.ask-cs.State.NoPlanning",
        "uuid": "4640kuiphof"
    },
    /*
    {
        "config": {},
        "name": "Schippers  GSM",
        "personalAgentUrl": "http://sven.ask-services.appspot.com/eveagents/personalagent//",
        "rate": 1,
        "resources": {
            "id": "",
            "name": "Schippers  GSM",
            "PhoneAddress": "+31646140402",
            "role": "3"
        },
        "state": "com.ask-cs.State.NoPlanning",
        "uuid": ""
    },
    */
    {
        "config": {},
        "name": "Gerben  1Hop",
        "personalAgentUrl": "http://sven.ask-services.appspot.com/eveagents/personalagent/4350hop/",
        "rate": 1,
        "resources": {
            "id": "4350hop",
            "askPass": "d2247713b3faf06b07f4c69e8850c8b6",
            "name": "Gerben  1Hop",
            "PhoneAddress": "+31651313950",
            "role": "3"
        },
        "state": "com.ask-cs.State.NoPlanning",
        "uuid": "4350hop"
    },
    {
        "config": {},
        "name": "Rolph  2 Herks",
        "personalAgentUrl": "http://sven.ask-services.appspot.com/eveagents/personalagent/4173herks/",
        "rate": 1,
        "resources": {
            "id": "4173herks",
            "askPass": "61fb6976d8b0a5356760ab666d5d62c6",
            "name": "Rolph  2 Herks",
            "PhoneAddress": "+31611225522",
            "role": "2"
        },
        "state": "com.ask-cs.State.NoPlanning",
        "uuid": "4173herks"
    },
    {
        "config": {},
        "name": "Floris  1Visser",
        "personalAgentUrl": "http://sven.ask-services.appspot.com/eveagents/personalagent/4056visser/",
        "rate": 1,
        "resources": {
            "id": "4056visser",
            "askPass": "92a091ddab4daf576643bd29a50b1603",
            "name": "Floris  1Visser",
            "PhoneAddress": "+31613573885",
            "role": "2"
        },
        "state": "com.ask-cs.State.NoPlanning",
        "uuid": "4056visser"
    },
    {
        "config": {},
        "name": "Remco  2Verwaal",
        "personalAgentUrl": "http://sven.ask-services.appspot.com/eveagents/personalagent/4179verwaal/",
        "rate": 1,
        "resources": {
            "id": "4179verwaal",
            "askPass": "80975550806eb4c9abaf7bb3d6cd4868",
            "name": "Remco  2Verwaal",
            "PhoneAddress": "+31652052024",
            "role": "2"
        },
        "state": "com.ask-cs.State.NoPlanning",
        "uuid": "4179verwaal"
    },
    {
        "config": {},
        "name": "Lennard  2Theunisse",
        "personalAgentUrl": "http://sven.ask-services.appspot.com/eveagents/personalagent/4059theunisse/",
        "rate": 1,
        "resources": {
            "id": "4059theunisse",
            "askPass": "f5212ff3f9bac5439368462f2e791558",
            "name": "Lennard  2Theunisse",
            "PhoneAddress": "+31619348536",
            "role": "3"
        },
        "state": "com.ask-cs.State.NoPlanning",
        "uuid": "4059theunisse"
    },
    {
        "config": {},
        "name": "Johan  1Schouwenaar",
        "personalAgentUrl": "http://sven.ask-services.appspot.com/eveagents/personalagent/4171schouwenaar/",
        "rate": 1,
        "resources": {
            "id": "4171schouwenaar",
            "askPass": "b48406b7c7d88252468b62a54ccfa3ad",
            "name": "Johan  1Schouwenaar",
            "PhoneAddress": "+31620300692",
            "role": "1"
        },
        "state": "com.ask-cs.State.NoPlanning",
        "uuid": "4171schouwenaar"
    },
    {
        "config": {},
        "name": "Marco  1Prins",
        "personalAgentUrl": "http://sven.ask-services.appspot.com/eveagents/personalagent/4176prins/",
        "rate": 1,
        "resources": {
            "id": "4176prins",
            "askPass": "a5e10524dda9887ddb4efcee847e3a71",
            "name": "Marco  1Prins",
            "PhoneAddress": "+31651325066",
            "role": "3"
        },
        "state": "com.ask-cs.State.NoPlanning",
        "uuid": "4176prins"
    },
    {
        "config": {},
        "name": "Erik  2 van den Oever",
        "personalAgentUrl": "http://sven.ask-services.appspot.com/eveagents/personalagent/4057oever/",
        "rate": 1,
        "resources": {
            "id": "4057oever",
            "askPass": "fb0d51f344ff62db41260f958d320e63",
            "name": "Erik  2 van den Oever",
            "PhoneAddress": "+31653131607",
            "role": "2"
        },
        "state": "com.ask-cs.State.NoPlanning",
        "uuid": "4057oever"
    },
    {
        "config": {},
        "name": "Henk  2van der Meij",
        "personalAgentUrl": "http://sven.ask-services.appspot.com/eveagents/personalagent/4085meij/",
        "rate": 1,
        "resources": {
            "id": "4085meij",
            "askPass": "62d611788f7e38472db2c6836612e1c3",
            "name": "Henk  2van der Meij",
            "PhoneAddress": "+31648270131",
            "role": "3"
        },
        "state": "com.ask-cs.State.NoPlanning",
        "uuid": "4085meij"
    },
    {
        "config": {},
        "name": "Michael  2Hooijschuur",
        "personalAgentUrl": "http://sven.ask-services.appspot.com/eveagents/personalagent/4178hooijschuur/",
        "rate": 1,
        "resources": {
            "id": "4178hooijschuur",
            "askPass": "00c84a18619700858ebfd435e47de17e",
            "name": "Michael  2Hooijschuur",
            "PhoneAddress": "+31621243519",
            "role": "3"
        },
        "state": "com.ask-cs.State.NoPlanning",
        "uuid": "4178hooijschuur"
    },
    {
        "config": {},
        "name": "Robert  1 Herks",
        "personalAgentUrl": "http://sven.ask-services.appspot.com/eveagents/personalagent/4129herks/",
        "rate": 1,
        "resources": {
            "id": "4129herks",
            "askPass": "f5212ff3f9bac5439368462f2e791558",
            "name": "Robert  1 Herks",
            "PhoneAddress": "+31625321827",
            "role": "2"
        },
        "state": "com.ask-cs.State.NoPlanning",
        "uuid": "4129herks"
    },
    {
        "config": {},
        "name": "Jeroen  2Fok",
        "personalAgentUrl": "http://sven.ask-services.appspot.com/eveagents/personalagent/4058fok/",
        "rate": 1,
        "resources": {
            "id": "4058fok",
            "askPass": "288116504f5e303e4be4ff1765b81f5d",
            "name": "Jeroen  2Fok",
            "PhoneAddress": "+31653508293",
            "role": "2"
        },
        "state": "com.ask-cs.State.NoPlanning",
        "uuid": "4058fok"
    },
    {
        "config": {},
        "name": "Wim  1Durinck",
        "personalAgentUrl": "http://sven.ask-services.appspot.com/eveagents/personalagent/4170durinck/",
        "rate": 1,
        "resources": {
            "id": "4170durinck",
            "askPass": "f5212ff3f9bac5439368462f2e791558",
            "name": "Wim  1Durinck",
            "PhoneAddress": " 31653239466",
            "role": "3"
        },
        "state": "com.ask-cs.State.NoPlanning",
        "uuid": "4170durinck"
    },
    {
        "config": {},
        "name": "Arjen  1 de Bruin",
        "personalAgentUrl": "http://sven.ask-services.appspot.com/eveagents/personalagent/4125bruin/",
        "rate": 1,
        "resources": {
            "id": "4125bruin",
            "askPass": "a6988b18b93b884a8bb9aecef6b939c3",
            "name": "Arjen  1 de Bruin",
            "PhoneAddress": "+31654745489",
            "role": "3"
        },
        "state": "com.ask-cs.State.NoPlanning",
        "uuid": "4125bruin"
    },
    {
        "config": {},
        "name": "Andries  1Boneschansker",
        "personalAgentUrl": "http://sven.ask-services.appspot.com/eveagents/personalagent/4128boneschansker/",
        "rate": 1,
        "resources": {
            "id": "4128boneschansker",
            "askPass": "bbe207afad476fb61826071780defea9",
            "name": "Andries  1Boneschansker",
            "PhoneAddress": "+31681795624",
            "role": "3"
        },
        "state": "com.ask-cs.State.NoPlanning",
        "uuid": "4128boneschansker"
    }
];













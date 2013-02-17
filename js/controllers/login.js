'use strict';

/**
 * Login Controller
 */
var loginCtrl = function($rootScope, $config, $location, $q, $scope, Session, User, $md5, Groups, Messages, Storage)
{
	var self = this;


  /**
   * Init rootScope app info container
   */
  // $rootScope.app = {};
  if (!Storage.session.get('app'))
  {
    Storage.session.add('app', '{}');
  };

  /**
   * TODO
   * Lose this jQuery stuff later on!
   * 
   * Jquery solution of toggling between login and app view
   */
  $('.navbar').hide();
  $('#footer').hide();
  $('body').css({
    'background': 'url(../img/login_bg.jpg) no-repeat center center fixed',
    'backgroundSize': 'cover'
  });


  /**
   * TODO
   * Remove all those jQuery selectors and use ng's
   * 
   * Check browser if blacklisted
   */
  // if (self.checkBrowser($config.blacklisted))
  // {
  //   $('#loginForm').hide();
  //   $('#browseHappy').show();
  // };


  /**
   * TODO
   * use native JSON functions of angular and Store service
   * 
   * @type {[type]}
   */
  var logindata = angular.fromJson(Storage.get('logindata'));
  if (logindata)
  {
    /**
     * If remember is on
     */
    if (logindata.remember)
    {
      $scope.logindata = logindata;
    };
  };



  /**
   * Real KNRM users for testing
   */
  $scope.knrms = knrm_users;
  $scope.loginAsKNRM = function(uuid, pass)
  {
    $('#login button[type=submit]')
      .text('Login..')
      .attr('disabled', 'disabled');

    self.auth(uuid, pass);
  };



  /**
   * TODO
   * Remove unneccessary DOM manipulation
   * Use cookies for user credentials
   * 
   * Login trigger
   * 
   * @return {[type]} [description]
   */
  $scope.login = function()
  {
    /**
     * Reset alerts
     */
    $('#alertDiv').hide();

    /**
     * Checks
     */
    if (!$scope.logindata ||
        !$scope.logindata.username || 
        !$scope.logindata.password)
    {
      return false;     
    };

    /**
     * Change button state
     */
    $('#login button[type=submit]')
      .text('Login..')
      .attr('disabled', 'disabled');

    /**
     * Save login to localStorage
     */
    Storage.add('logindata', angular.toJson({
      username: $scope.logindata.username,
      password: $scope.logindata.password,
      remember: $scope.logindata.remember
    }));

    /**
     * Authorize
     */
    self.auth( $scope.logindata.username, $md5.process($scope.logindata.password ));
  };



  /**
   * Authorize user
   */
  self.auth = function(uuid, pass)
  {
    /**
     * Backend login
     */
    User.login(uuid, pass)
    .then(function(result)
	  {
      /**
       * Set session
       */
	  	Session.set(result["X-SESSION_ID"]);
      /**
       * Init preloader
       */
	  	self.preloader();
	  });
  };




  /**
   * TODO
   * Optimize preloader and messages
   * Use local caceh for returned data
   * 
   * Initialize preloader
   */
  self.preloader = function()
  {
    /**
     * Presentations
     */
    $('#login').hide();
    $('#preloader').show();

    /**
     * Preloader
     */
    self.progress(20, 'Loading user information..');

    /**
     * Get user resources
     */
    User.resources()
    .then(function(resources)
    {
      /**
       * Fill app info container
       */
      $rootScope.app.resources = resources;

      /**
       * Preloader
       */
      self.progress(40, 'Loading messages..');

      /**
       * Get messages
       */
      Messages.query()
      .then(function(messages)
      {
        /**
         * Fill app info container for unread messages
         */
        $rootScope.app.unreadMessages = Messages.unread();
        Storage.session.unreadMessages = Messages.unread();

        /**
         * Preloader
         */
        self.progress(60, 'Loading groups..');

        /**
         * Get groups
         */
        Groups.query()
        .then(function(groups)
        {

          /**
           * Preloader
           */
          self.progress(80, 'Loading members..');

          /**
           * Compile member calls into one pool
           */
          var calls = [];
          angular.forEach(groups, function(group, index)
          {
            calls.push(Groups.get(group.uuid));
          });

          /**
           * Loop through member calls pool
           */
          $q.all(calls)
          .then(function(result)
          {

            /**
             * Preloader
             */
            self.progress(100, 'Everything loaded!');

            /**
             * Make unique list of members
             */
            Groups.uniqueMembers();
            
            /**
             * Presentations
             */
            $('.navbar').show();
            $('#footer').show();
            $('body').css({
              'background': 'url(../img/bg.jpg) repeat'
            });

            /**
             * Redirect to dashboard
             */
            $location.path('/dashboard');
          });
        });
      })
    });
  };




  /**
   * Progress bar
   */
  self.progress = function(ratio , message)
  {
    $('#preloader .progress .bar').css({ width: ratio + '%' }); 
    $('#preloader span').text(message);    
  };










  // authorize login
  // 
  // DEPRECIATED !!!!!!
  // 
  // $scope.auth = function(uuid, pass)
  // {
  //   $.ajax(
  //   {
  //     url: host   + '/login' 
  //                 + '?uuid='
  //                 + uuid
  //                 + '&pass=' 
  //                 + pass
  //   })
  //   .success(function(data)
  //   {
  //     // save cookie
  //     //$scope.setSession(data["X-SESSION_ID"]);
  //     $rootScope.session = Session.set(data["X-SESSION_ID"]);

  //     $.ajaxSetup(
  //     {
  //       headers: {
  //         'X-SESSION_ID': Session.get($rootScope.session)
  //       } 
  //     })

  //     // presentation
  //     $('#loginForm').hide();
  //     $('#preloader').show();
      
  //     // start preloading
  //     //$scope.fetchDependencies();

  //     // resources

  //   })
  //   .fail(function(jqXHR, exception, options)
  //   {
  //     // check whether wrong credentials
  //     if (jqXHR.status == 400 && 
  //         jqXHR.responseText.split('<title>')[1].split('</title>')[0] === '400 bad credentials')
  //     {
  //       $("#alertDiv").show();
  //       $("#alertMessage").html( $scope.ui.error.messages.login );
  //     }
  //     else
  //     {
  //       $scope.ajaxErrorHandler(jqXHR, exception, options)
  //     }
  //     // reset button state
  //     $('#loginForm button[type=submit]')
  //       .text($scope.ui.login.button_login)
  //       .removeAttr('disabled')
  //   })    
  // }



};





/**
 * TODO
 * Remove unneccessary dependencies
 * 
 * Logout from app
 */
loginCtrl.logout = function($rootScope, $config, $scope, $window, Session, User, Storage)
{
  /**
   * Presentation
   */
  $('.navbar').hide();
  $('#footer').hide();

  /**
   * Get logindata
   */
  var logindata = angular.fromJson(Storage.get('logindata'));

  /**
   * Log user out
   */
	User.logout()
	.then(function()
	{
		//Session.clear();
    
    /**
     * Clear localStorage
     */
		Storage.clearAll();

    /**
     * Clear sessionStorage
     */
    Storage.session.clearAll();

    /**
     * Set logindata back
     */
    Storage.add('logindata', angular.toJson(logindata));

    /**
     * Rediret back to login
     */
    $window.location.href = 'logout.html';
	});
};





/**
 * Login prototypes
 */
loginCtrl.prototype = {

  constructor: loginCtrl,

  /**
   * TODO
   * Add browser version detection as well..
   * Still issues with targeting some versions of IE!
   * 
   * Needs fixing!
   * 
   * Check browser
   * @param  {[type]} blacklisted [description]
   * @return {[type]}             [description]
   */
  checkBrowser: function(blacklisted)
  {
    var N = navigator.appName,
        ua = navigator.userAgent,
        tem;
    var browser = ua.match( /(opera|chrome|safari|firefox|msie)\/?\s*(\.?\d+(\.\d+)*)/i );
    if (browser && ( tem = ua.match(/version\/([\.\d]+)/i)) != null )
    {
      browser[2] = tem[1];
    }
    browser = browser ? [ browser[1], browser[2] ] : [ N, navigator.appVersion, '-?' ];
    browser = browser[0].toLowerCase();

    /**
     * TODO
     * 
     * REMOVE
     * Remove underscore library dependency here!!
     * 
     * @type {Boolean}
     */
    return ( _.contains(blacklisted, browser) ) ? true : false;

    /*
     * Underscore contains function
     */    
    // // Determine if the array or object contains a given value (using `===`).
    // // Aliased as `include`.
    // _.contains = _.include = function(obj, target) {
    //   if (obj == null) return false;
    //   if (nativeIndexOf && obj.indexOf === nativeIndexOf) return obj.indexOf(target) != -1;
    //   return any(obj, function(value) {
    //     return value === target;
    //   });
    // };

  }

};

loginCtrl.$inject = [ '$rootScope', 
                      '$config', 
                      '$location',
                      '$q', 
                      '$scope', 
                      'Session', 
                      'User', 
                      '$md5', 
                      'Groups', 
                      'Messages',
                      'Storage'];


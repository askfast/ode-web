'use strict';
/* Login controller */

var loginCtrl = function($rootScope, $config, $q, $scope, Session, User, $md5, Group, Messages)
{
	var self = this;


  /**
   * Check browser if blacklisted
   */
  if ( self.checkBrowser($config.blacklisted) )
  {
    $('#loginForm').hide();
    $('#browseHappy').show();
  };


  /**
   * TODO
   * use native JSON functions of angular and Store service
   * 
   * @type {[type]}
   */
  var logindata = localStorage.getItem('logindata');
  if (logindata)
  {
    if ((JSON.parse(logindata)).remember)
    {
      $scope.logindata = JSON.parse(logindata);
    };
  };


  // real knrm users for testing
  $scope.knrms = knrm_users;

  // knrm users login
  $scope.loginAsKNRM = function(uuid, pass)
  {
    $('#loginForm button[type=submit]')
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
    // reset alerts
    $('#alertDiv').hide();


    // check
    if (!$scope.logindata ||
        !$scope.logindata.username || 
        !$scope.logindata.password)
    {
      return false;     
    };


    // button state
    $('#loginForm button[type=submit]')
      .text('Login..')
      .attr('disabled', 'disabled');


    // save login
    localStorage.setItem('logindata', JSON.stringify({
      username: $scope.logindata.username,
      password: $scope.logindata.password,
      remember: $scope.logindata.remember
    }));

    self.auth( $scope.logindata.username, $md5.process($scope.logindata.password ));
  };


  /**
   * Authorize user
   * 
   * @param  {[type]} uuid [description]
   * @param  {[type]} pass [description]
   * @return {[type]}      [description]
   */
  self.auth = function(uuid, pass)
  {    
    User.login(uuid, pass)
    .then(function(result)
	  {
	  	Session.set(result["X-SESSION_ID"]);

	  	self.preloader();
	  });
  };




  /**
   * TODO
   * Optimize preloader and messages
   * Use local caceh for returned data
   * 
   * Initialize preloader
   * @return {[type]} [description]
   */
  self.preloader = function()
  {
    // presentation
    $('#loginForm').hide();
    $('#preloader').show();

    self.progress(20, 'Loading user information..');

    User.resources()
    .then(function(resources)
    {
      console.log('user resources ->', resources);
      self.progress(40, 'Loading messages..');

      Messages.query()
      .then(function()
      {
        console.log('messages count ->', Messages.unread());
        self.progress(60, 'Loading groups..');

        Group.query()
        .then(function(groups)
        {
          console.log('user groups ->', groups);
          self.progress(80, 'Loading members..');

          var calls = [];
          angular.forEach(groups, function(group, index)
          {
            calls.push(Group.get(group.uuid));
          });

          $q.all(calls)
          .then(function(result)
          {
            console.log('all member calls went well ->', result);
            self.progress(100, 'Everything loaded!');

            document.location = "#/planboard";
          });

        });


      })
      
    });








    // Load resources
    // .then -> Load messages
    // .then -> Load network
    // .then -> Load group members
    // 						Unify those members in one unique list
    // Redirect to Planboard
    //document.location = "#/planboard";
    
  };



  /**
   * Progress bar
   * 
   * @param  {[type]} ratio   [description]
   * @param  {[type]} message [description]
   * @return {[type]}         [description]
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
 * 
 * @param  {[type]} $rootScope [description]
 * @param  {[type]} $config    [description]
 * @param  {[type]} $scope     [description]
 * @param  {[type]} Session    [description]
 * @param  {[type]} User       [description]
 * @param  {[type]} Storage    [description]
 * @return {[type]}            [description]
 */
loginCtrl.logout = function($rootScope, $config, $scope, Session, User, Storage)
{
	User.logout()
	.then(function()
	{
		//Session.clear();
		Storage.clearAll();
		//console.log('user logged out successfully! Goodbye!', $rootScope);
    document.location = "logout.html";
	});
};




/**
 * Login prototypes
 * 
 * @type {Object}
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

  }

};

loginCtrl.$inject = ['$rootScope', '$config', '$q', '$scope', 'Session', 'User', '$md5', 'Group', 'Messages'];


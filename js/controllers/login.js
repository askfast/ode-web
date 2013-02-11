'use strict';





/**
 * TODO
 * Clear list of dependencies
 * 
 * TimeSlots Service
 */
WebPaige.
factory('User', function ($resource, $config, $q, $route, $timeout, Storage, $rootScope) 
{
  var self = this;


  var User = $resource();


  var Login = $resource(
    $config.host + '/login',
    {
    },
    {
      process: {
        method: 'GET',
        params: {uuid:'', pass:''}
      }
    }
  );


  User.prototype.login = function (uuid, pass) 
  {    
    var deferred = $q.defer();
    Login.process({uuid: uuid, pass: pass}, function (result) 
    {
      if (angular.equals(result, [])) 
      {
        deferred.reject("Something went wrong with login!");
      }
      else 
      {
        deferred.resolve(result);
      }
    });
    return deferred.promise;
  };


  var Logout = $resource(
    $config.host + '/logout',
    {
    },
    {
      process: {
        method: 'GET',
        params: {}
      }
    }
  );


  User.prototype.logout = function () 
  {    
    var deferred = $q.defer();
    Logout.process(null, function (result) 
    {
      // if (angular.equals(result, [])) 
      // {
      //   deferred.reject("Something went wrong with logout!");
      // }
      // else 
      // {

        deferred.resolve(result);
      // }
    });
    return deferred.promise;
  };


  var Resources = $resource(
    $config.host + '/resources',
    {
    },
    {
      get: {
        method: 'GET',
        params: {}
      }
    }
  );


  User.prototype.resources = function () 
  {    
    var deferred = $q.defer();
    Resources.get(null, function (result) 
    {
      if (angular.equals(result, [])) 
      {
        deferred.reject("User has no resources!");
      }
      else 
      {
        Storage.add('resources', angular.toJson(result));
        deferred.resolve(result);
      }
    });
    return deferred.promise;
  };


  return new User;

});





/**
 * ************************************************************************************************
 * ************************************************************************************************
 * ************************************************************************************************
 * ************************************************************************************************
 */






/**
 * Login Controller
 */
var loginCtrl = function($rootScope, $config, $q, $scope, Session, User, $md5, Groups, Messages, Storage)
{
	var self = this;


  /**
   * TODO
   * Remove all those jQuery selectors and use ng's
   * 
   * Check browser if blacklisted
   */
  if (self.checkBrowser($config.blacklisted))
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



  /**
   * Real KNRM users for testing
   * 
   * @type {[type]}
   */
  $scope.knrms = knrm_users;
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

    //Storage.add('members', angular.toJson({}));

    self.progress(20, 'Loading user information..');
    User.resources()
    .then(function(resources)
    {
      self.progress(40, 'Loading messages..');
      Messages.query()
      .then(function(messages)
      {
        self.progress(60, 'Loading groups..');
        Groups.query()
        .then(function(groups)
        {
          self.progress(80, 'Loading members..');
          var calls = [];
          angular.forEach(groups, function(group, index)
          {
            calls.push(Groups.get(group.uuid));
          });
          $q.all(calls)
          .then(function(result)
          {
            self.progress(100, 'Everything loaded!');
            Groups.uniqueMembers();

            /**
             * Set first group and current month for the planboard link
             */

            //$rootScope.firstGroup = angular.fromJson(Storage.get('groups'))[0].uuid;
            $rootScope.firstGroup = groups[0].uuid;
            
            console.log('groups are present', $rootScope.firstGroup);

            $rootScope.currentDivision = 'all';
            $rootScope.currentMonth = new Date().toString('M');
            $rootScope.layouts = "1:1:0";

            document.location = "#/dashboard";
          });
        });
      })
    });
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

loginCtrl.$inject = [ '$rootScope', 
                      '$config', 
                      '$q', 
                      '$scope', 
                      'Session', 
                      'User', 
                      '$md5', 
                      'Groups', 
                      'Messages',
                      'Storage'];


'use strict';

/**
 * Login Controller
 */
var loginCtrl = function($rootScope, $config, $location, $q, $scope, Session, User, $md5, Groups, Messages, Storage,$routeParams)
{
  /**
   * Self this
   */
	var self = this;


  /**
   * Set default views
   */
	if ($routeParams.uuid && $routeParams.key)
  {
		$scope.views = {
			changePass : true,
		};
		$scope.changepass = {
			uuid : $routeParams.uuid,
			key :  $routeParams.key,
		}
	}
  else
  {
		$scope.views = {
			login : true,
			forgot : false
		};
	};


  /**
   * KNRM users for testing
   */
  if ($config.demo_users)
  {
    $scope.demo_users = demo_users;
  };


  /**
   * Real KNRM users for testing
   */
   $scope.knrmLogin = function(user)
   {
     $('#login button[type=submit]')
       .text('Login..')
       .attr('disabled', 'disabled');

    self.auth(user.uuid, user.resources.askPass);
   };

  
  /**
   * Set default alerts
   */
  $scope.alert = {
    login: {
      display: false,
      type: '',
      message: ''
    },
    forgot: {
      display: false,
      type: '',
      message: ''
    }
  };


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
   * use native JSON functions of angular and Store service
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
   * TODO
   * Remove unneccessary DOM manipulation
   * Use cookies for user credentials
   * 
   * Login trigger
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
      /**
       * Inform user
       */
      $scope.alert = {
        login: {
          display: true,
          type: 'alert-error',
          message: $rootScope.ui.login.alert_fillfiled
        }
      };
      /**
       * Put button state back to default
       */
      $('#login button[type=submit]')
        .text('Login')
        .removeAttr('disabled');
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
       * Check if bad credentials
       */
      if (result.status == 400)
      {      
        /**
         * Inform user
         */
        $scope.alert = {
          login: {
            display: true,
            type: 'alert-error',
            message: $rootScope.ui.login.alert_wrongUserPass
          }
        };
        /**
         * Put button state back to default
         */
        $('#login button[type=submit]')
          .text('Login')
          .removeAttr('disabled');
        return false;
      }
      /**
       * Successful login
       */
      else
      {
        /**
         * Set session
         */
        Session.set(result["X-SESSION_ID"]);
        /**
         * Init preloader
         */
        self.preloader();
      };
	  });
  };


  /**
   * TODO
   * 
   * What happens if preloader stucks?
   * 
   * Optimize preloader and messages
   * 
   * Initialize preloader
   */
  self.preloader = function()
  {
    /**
     * Presentations
     */
    $('#login').hide();
    $('#download').hide();
    $('#preloader').show();
    /**
     * Preloader
     */
    self.progress(20, $rootScope.ui.login.loading_User);
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
       * Set user language settings
       */
      if (resources.settingsWebPaige != null || 
          resources.settingsWebPaige != undefined)
      {
        $rootScope.changeLanguage(angular.fromJson(resources.settingsWebPaige).user.language);
      }
      else
      {
        $rootScope.changeLanguage($config.defaults.settingsWebPaige.user.language);
      }
      /**
       * Preloader
       */
      self.progress(40, $rootScope.ui.login.loading_Message);
      /**
       * Get messages
       */
      Messages.query()
      .then(function(messages)
      {
        /**
         * Fill app info container for unread messages
         */
        $rootScope.app.unreadMessages = Messages.unreadCount();
        Storage.session.unreadMessages = Messages.unreadCount();
        /**
         * Preloader
         */
        self.progress(60, $rootScope.ui.login.loading_Group);
        /**
         * Get groups
         */
        Groups.query()
        .then(function(groups)
        {
          /**
           * Preloader
           */
          self.progress(80, $rootScope.ui.login.loading_Members);
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
            self.progress(100, $rootScope.ui.login.loading_everything);
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


  /**
   * RE-FACTORY
   * 
   * TODO
   * 
   * Make button state change!
   * Finish it!
   * 
   * Forgot password
   */
	$scope.forgot = function() {
		$('#forgot button[type=submit]').text('setting ...').attr('disabled', 'disabled');
		User.password($scope.remember.id).then(function(result) {
			console.log("res?? ", result);
			
			if(result == "ok") {
				$scope.alert = {
					forget : {
						display : true,
						type : 'alert-success',
						message : 'Please check your email to reset your password!'
					}
				};
			} else {
				$scope.alert = {
					forget : {
						display : true,
						type : 'alert-error',
						message : 'Error, we can not find this account !'
					}
				};
			}
			$('#forgot button[type=submit]').text('change password').removeAttr('disabled');
		});
	};



  /**
   * RE-FACTORY
   *
   * Change password
   */
	self.changePass =  function(uuid, newpass, key){
		User.changePass(uuid, newpass, key).then(function(result){
			if(result.status == 400 || result.status == 500 || result.status == 409){
				$scope.alert = {
					changePass : {
						display : true,
						type : 'alert-error',
						message : 'Something wrong with password changing!'
					}
				};
				
			}else { // successfully changed
				$scope.alert = {
					changePass : {
						display : true,
						type : 'alert-success',
						message : 'Password changed!'
					}
				}; 
				
				$location.path( "/message" );
			}
			$('#changePass button[type=submit]').text('change password').removeAttr('disabled');
		})
	}


  /**
   * RE-FACTORY
   *
   * Change password
   */
	$scope.changePass = function() {
		/**
		 * Reset alerts
		 */
		$('#alertDiv').hide();
		/**
		 * Checks
		 */
		if(!$scope.changeData || !$scope.changeData.newPass || !$scope.changeData.retypePass)
    {
			/**
			 * Inform user
			 */
			$scope.alert = {
				changePass : {
					display : true,
					type : 'alert-error',
					message : 'Please fill all fields!'
				}
			};
			/**
			 * Put button state back to default
			 */
			$('#changePass button[type=submit]').text('change password').removeAttr('disabled');

			return false;
		}
    else if($scope.changeData.newPass != $scope.changeData.retypePass)
    {
			$scope.alert = {
				changePass : {
					display : true,
					type : 'alert-error',
					message : 'Please make the reType password is indentical !'
				}
			};
			$('#changePass button[type=submit]').text('change password').removeAttr('disabled');
			return false;
		};
		/**
		 * Change button state
		 */
		$('#changePass button[type=submit]').text('changing ...').attr('disabled', 'disabled');
		/**
		 * Save login to localStorage
		 */
		// Storage.add('logindata', angular.toJson({
		// 	username : $scope.logindata.username,
		// 	password : $scope.logindata.password,
		// 	remember : $scope.logindata.remember
		// }));
		/**
		 * Authorize
		 */
		self.changePass($scope.changepass.uuid, $md5.process($scope.changeData.newPass), $scope.changepass.key);
	};

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
                      'Storage',
                      '$routeParams'];


                      'use strict';

/**
 * TODO
 * Clear list of dependencies
 * 
 * TimeSlots Service
 */
WebPaige.
factory('User', function ($resource, $config, $q, $location, $timeout, Storage, $rootScope) 
{
  var self = this;

  /**
   * User resource (general)
   */
  var User = $resource();


  /**
   * Login resource
   */
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


  /**
   * Resources resource
   */
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


  /**
   * Reset resource
   */
  var Reset = $resource(
    $config.host + '/passwordReset',
    {
    },
    {
      password: {
        method: 'GET',
        params: {uuid: '', path:''}
      }
    }
  );
  
  

  /**
   * User login
   */
  User.prototype.password = function(uuid) {
    var deferred = $q.defer();
    Reset.password({
      uuid : uuid.toLowerCase(),
      path : $location.absUrl()
    }, function(result) {
        console.log("success resolve ",result);
        if (angular.equals(result, [])){
            deferred.resolve("ok");
        }else{
            deferred.resolve(result);
        }
    },function(error){
        deferred.resolve(error);
    });
    return deferred.promise;
  };


  /**
   * User login
   */
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
    },
    function (error)
    {
      deferred.resolve(error);
    });
    return deferred.promise;
  };
  
  /**
   * change user password
   */
  User.prototype.changePass = function(uuid, newpass, key){
      var deferred = $q.defer();
      var changePassword = $resource($config.host+'/passwordReset', 
        {uuid: uuid,
         pass: newpass,
         key: key});
      
      changePassword.get(function(res){ // success
        console.log("change pass result : ", res);
        deferred.resolve(res);
      },function(error){ // error
        deferred.resolve(error);
      })
    
    return deferred.promise;
  }
  
  /**
   * Logout resource
   */
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


  /**
   * User logout
   */
  User.prototype.logout = function () 
  {    
    var deferred = $q.defer();
    Logout.process(null, function (result) 
    {
      deferred.resolve(result);
    });
    return deferred.promise;
  };


  /**
   * Get user resources
   */
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

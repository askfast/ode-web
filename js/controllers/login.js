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
  
	// console.log($routeParams);
	
	if($routeParams.uuid && $routeParams.key) {
		$scope.views = {
			changePass : true,
		};
		$scope.changepass = {
			uuid : $routeParams.uuid,
			key :  $routeParams.key,
		}
	} else {
		$scope.views = {
			login : true,
			forgot : false
		};
	}

  
  


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
      /**
       * Inform user
       */
      $scope.alert = {
        login: {
          display: true,
          type: 'alert-error',
          message: 'Please fill all fields!'
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
            message: 'Wrong username or password!'
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
    $('#download').hide();
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
        $rootScope.app.unreadMessages = Messages.unreadCount();
        Storage.session.unreadMessages = Messages.unreadCount();

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


  /**
   * TODO
   * Make button state change!
   * Finish it!
   * 
   * Forgot password
   */
  $scope.forgot = function()
  {
    User.password($scope.remember.id).then(function(result){
    	console.log("res?? " , result);
    	if(result == "ok"){
    		$scope.alert = {
				forget : {
					display : true,
					type : 'alert-success',
					message : 'Please check your email to reset your password!'
				}
			};
    	}else{
    		$scope.alert = {
				forget : {
					display : true,
					type : 'alert-error',
					message : 'Error, we can not find this account !'
				}
			};
    	}
    });
  };

	self.changePass =  function(uuid, newpass, key){
		User.changePass(uuid, newpass, key).then(function(result){
			if(result.status == 400 || result.status == 500){
				$scope.alert = {
					changePass : {
						display : true,
						type : 'alert-error',
						message : 'Something wrong with password changing!'
					}
				};
				
				$('#changePass button[type=submit]').text('change password').removeAttr('disabled');
			}else { // successfully changed
				$scope.alert = {
					changePass : {
						display : true,
						type : 'alert-success',
						message : 'Password changed!'
					}
				}; 
				
				// $location.path( "/login" );
			}
		})
	}

	$scope.changePass = function() {
		/**
		 * Reset alerts
		 */
		$('#alertDiv').hide();
		/**
		 * Checks
		 */
		if(!$scope.changeData || !$scope.changeData.newPass || !$scope.changeData.retypePass) {
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
		}else if($scope.changeData.newPass != $scope.changeData.retypePass){
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
			// username : $scope.logindata.username,
			// password : $scope.logindata.password,
			// remember : $scope.logindata.remember
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
                      'Storage',
                      '$routeParams'];





  /**
   * Failed attempt to initialize meny plugin
   */
  // // Create an instance of Meny
  // var meny = Meny.create({
  //   // The element that will be animated in from off screen
  //   menuElement: document.querySelector( '.meny' ),

  //   // The contents that gets pushed aside while Meny is active
  //   contentsElement: document.querySelector( '.contents' ),

  //   // [optional] The alignment of the menu (top/right/bottom/left)
  //   position: Meny.getQuery().p || 'left',

  //   // [optional] The height of the menu (when using top/bottom position)
  //   height: 200,

  //   // [optional] The width of the menu (when using left/right position)
  //   width: 260,

  //   // [optional] Distance from mouse (in pixels) when menu should open
  //   threshold: 40
  // });

  // // API Methods:
  // // meny.open();
  // // meny.close();
  // // meny.isOpen();
  
  // // Events:
  // // meny.addEventListener( 'open', function(){ console.log( 'open' ); } );
  // // meny.addEventListener( 'close', function(){ console.log( 'close' ); } );

  // // Embed an iframe if a URL is passed in
  // if( Meny.getQuery().u && Meny.getQuery().u.match( /^http/gi ) ) {
  //   var contents = document.querySelector( '.contents' );
  //   contents.style.padding = '0px';
  //   contents.innerHTML = '<div class="cover"></div><iframe src="'+ 
  //                        Meny.getQuery().u + 
  //                        '" style="width: 100%; height: 100%; border: 0; position: absolute;"></iframe>';
  // }


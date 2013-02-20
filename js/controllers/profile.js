'use strict';

/**
 * Profile Controller
 */
function profileCtrl($rootScope, $scope, $config, $q, $md5, data, Profile, $route, Storage, Groups)
{
  /**
   * Self this
   */
	var self = this;


  /**
   * Back-end returned data
   */
  $scope.resources = data;


  /**
   * Extract view action from url
   */
  if ($route.current.params.action)
  {
    switch ($route.current.params.action)
    {
      case 'view':
        $scope.views = {
          view:     true,
          edit:     false,
          password: false,
          timeline: false,
        };
      break;
      case 'edit':
        $scope.views = {
          view:     false,
          edit:     true,
          password: false,
          timeline: false
        };
      break;
      case 'password':
        $scope.views = {
          view:     false,
          edit:     false,
          password: true,
          timeline: false
        };
      break;
      case 'timeline':
        $scope.views = {
          view:     false,
          edit:     false,
          password: false,
          timeline: true
        };
      break;  
    };
  }
  else
  {  
    /**
     * Set default views (profile view)
     */
    $scope.views = {
      view:     true,
      edit:     false,
      password: false,
      timeline: false
    };
  };


  /**
   * Check if it is user
   */
  $scope.views.user = ($rootScope.app.resources.uuid == $route.current.params.userId) ? true : false;


  /**
   * Set user
   */
  $scope.user = {
    id: $route.current.params.userId
  };


  /**
   * Get groups of user
   */
  $scope.groups = Groups.getMemberGroups($route.current.params.userId);


  /**
   * Set default alerts
   */
  $scope.alert = {
    edit: {
      display: false,
      type: '',
      message: ''
    },
    password: {
      display: false,
      type: '',
      message: ''
    },
    timeline: {
      display: false,
      type: '',
      message: ''
    }
  };


  /**
   * Default values for passwords
   */
  $scope.passwords = {
    current: '',
    new1: '',
    new2: ''
  };


  /**
   * Save user
   */
  $scope.save = function(resources)
  {
    /**
     * Set preloader
     */
    $rootScope.loading = true;
    /**
     * Save profile
     */
    Profile.save($route.current.params.userId, resources)
    .then(function(result)
    {
      console.log('result of registration ->', result);

      /**
       * Determine if it is user
       */
      var flag = ($route.current.params.userId == $rootScope.app.resources.uuid) ? true : false;
      /**
       * Get fresh profile data
       */
      Profile.get($route.current.params.userId, flag)
      .then(function(resources)
      {
        /**
         * Reload resources
         */
        $scope.resources = resources;
        /**
         * Set preloader
         */
        $rootScope.loading = false;
        /**
         * Inform user
         */
        $scope.alert = {
          edit: {
            display: true,
            type: 'alert-success',
            message: 'Profile data is succesfully changed.'
          }
        };
      });
    });
  };


  /**
   * Change passwords
   */
  $scope.change = function(passwords)
  {
    /**
     * Checks on given passwords
     */
    if (passwords.new1 == '' || 
        passwords.new2 == '')
    {
      /**
       * Inform user for providing empty inputs
       */
      $scope.alert = {
        password: {
          display: true,
          type: 'alert-error',
          message: 'Please fill all fields!'
        }
      };
      return false;
    }
    if (passwords.new1 != passwords.new2)
    {
      /**
       * Inform user for providing empty inputs
       */
      $scope.alert = {
        password: {
          display: true,
          type: 'alert-error',
          message: 'Provided passwords do not match! Please try it again.'
        }
      };
      return false;
    }
    /**
     * Check if current password is correct
     */
    else if ($rootScope.app.resources.askPass == $md5.process(passwords.current))
    {
      /**
       * Set preloader
       */
      $rootScope.loading = true;
      /**
       * Save profile
       */
      Profile.changePassword(passwords)
      .then(function(result)
      {
        /**
         * Get fresh profile data
         */
        Profile.get($rootScope.app.resources.uuid, true)
        .then(function(resources)
        {
          /**
           * Reload resources
           */
          $scope.resources = resources;
          /**
           * Set preloader
           */
          $rootScope.loading = false;
          /**
           * Inform user
           */
          $scope.alert = {
            password: {
              display: true,
              type: 'alert-success',
              message: 'Password is succesfully changed.'
            }
          };
        });
      });
    }
    /**
     * Current password is wrong
     */
    else
    {
      /**
       * Inform user
       */
      $scope.alert = {
        password: {
          display: true,
          type: 'alert-error',
          message: 'Given current password is wrong! Please try it again.'
        }
      };
    };
  };



};



/**
 * Profile resolver
 */
profileCtrl.resolve = {
  data: function ($rootScope, $config, Profile, $route) 
  {
    return Profile.get($route.current.params.userId, false);
  }
};


/**
 * Profile prototypes
 */
profileCtrl.prototype = {
  constructor: profileCtrl
};



profileCtrl.$inject = ['$rootScope', '$scope', '$config', '$q', 
                      '$md5', 'data', 'Profile', '$route', 'Storage', 'Groups'];
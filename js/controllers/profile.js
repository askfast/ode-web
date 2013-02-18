'use strict';

/**
 * Profile Controller
 */
function profileCtrl($rootScope, $scope, $config, $q, data, Profile, $route, Storage)
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
   * Get resources
   */
  //var resources = angular.fromJson(Storage.get('resources'));
  /**
   * Check if it is user
   */
  if ($rootScope.app.resources.uuid == $route.current.params.userId)
  {
    $scope.views.user = true;
  }
  else
  {
    $scope.views.user = false;
  };


  /**
   * Set user
   */
  $scope.user = {
    id: $route.current.params.userId
  };


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
    Profile.save(resources)
    .then(function(result)
    {
      /**
       * Get fresh profile data
       */
      Profile.get()
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
    };

    // /**
    //  * Set preloader
    //  */
    // $rootScope.loading = true;
    // /**
    //  * Save profile
    //  */
    // Profile.save(resources)
    // .then(function(result)
    // {
    //   /**
    //    * Get fresh profile data
    //    */
    //   Profile.get()
    //   .then(function(resources)
    //   {
    //     /**
    //      * Reload resources
    //      */
    //     $scope.resources = resources;
    //     /**
    //      * Set preloader
    //      */
    //     $rootScope.loading = false;
    //     /**
    //      * Inform user
    //      */
    //     $scope.alert = {
    //       edit: {
    //         display: true,
    //         type: 'alert-success',
    //         message: 'Profile data is succesfully changed.'
    //       }
    //     };
    //   });
    // });
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



profileCtrl.$inject = ['$rootScope', '$scope', '$config', '$q', 'data', 'Profile', '$route', 'Storage'];
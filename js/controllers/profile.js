'use strict';

/**
 * Profile Controller
 */
function profileCtrl($rootScope, $scope, $config, data, Profile, $route)
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
          timeline: false
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
   * Set user
   */
  $scope.user = {
    id: $route.current.params.userId
  };

  /**
   * Save user
   */
  $scope.save = function(resources)
  {
    Profile.save(resources);
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



profileCtrl.$inject = ['$rootScope', '$scope', '$config', 'data', 'Profile', '$route'];
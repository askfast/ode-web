'use strict';

/**
 * Profile Controller
 */
function profileCtrl($rootScope, $scope, $config, resources, Profile, $route, $routeParams)
{

	var self = this;

  $scope.resources = resources;

  $scope.user = {
    id: $route.current.params.userId
  };


  $scope.save = function(resources)
  {
    Profile.save(resources);
  };

	
  timerService.start('profileTimer', function()
  { 
    Profile.get();
  }, 60 * 30);

};



/**
 * Profile resolver
 */
profileCtrl.resolve = {
  resources: function ($rootScope, $config, Profile, $route) 
  {
    return Profile.get($route.current.params.userId);
  }
};


/**
 * Profile prototypes
 */
profileCtrl.prototype = {
  constructor: profileCtrl
};



profileCtrl.$inject = [ '$rootScope', 
                        '$scope', 
                        '$config', 
                        'resources', 
                        'Profile', 
                        '$route', 
                        '$routeParams'];
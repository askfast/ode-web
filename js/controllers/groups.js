function groupsCtrl($scope)
{
	
}
groupsCtrl.$inject = ['$scope'];



/*

function groupsCtrl($rootScope, $scope, $config, resources, Profile, timerService, $route, $routeParams)
{
	var self = this;

	
  timerService.start('groupsTimer', function()
  { 
    Groups.query();
  }, 60 * 30);

};


profileCtrl.resolve = {
  resources: function ($rootScope, $config, Profile, $route) 
  {
    return Profile.get($route.current.params.userId);
  }
};


profileCtrl.prototype = {
  constructor: profileCtrl
};



profileCtrl.$inject = ['$rootScope', '$scope', '$config', 'resources', 'Profile', 'timerService', '$route', '$routeParams'];







angular.module('ProfileServices', ['ngResource']).
factory('Profile', function ($resource, $config, $q, $route, $timeout, Storage, $rootScope) 
{

  var Profile = $resource(
    $config.host + '/resources',
    {
      user: $rootScope.user.uuid
    },
    {
      get: {
        method: 'GET',
        params: {}
      },
      save: {
        method: 'POST',
        params: {}
      }
    }
  );
  

  Profile.prototype.get = function (userId) 
  {    

    console.log('user asked to be rendered ->', userId);

    var deferred = $q.defer(), 
        localProfile = Storage.get('resources');

    // if (localProfile)
    // {
    //   deferred.resolve(angular.fromJson(localSlots));
    //   return deferred.promise;
    // }
    // else
    // {
      var successCb = function (result) 
      {

        if (angular.equals(result, [])) 
        {
          deferred.reject("There is no record!");
        }
        else 
        {
          $rootScope.notify( { message: 'Profile data downloaded from back-end.' } );

          Storage.add('resources', angular.toJson(result));
          $rootScope.notify( { message: 'Profile data added to localStorage.' } );

          deferred.resolve(result);
        }
      };

      Profile.get(successCb);

      return deferred.promise;
    // }
  };


  Profile.prototype.local = function()
  {
    return angular.fromJson(Storage.get('resources'));
  };


  Profile.prototype.save = function (resources) 
  {    

    var localResources = angular.fromJson(Storage.get('resources'));

    localResources['name'] = resources.name;
    localResources['EmailAddress'] = resources.EmailAddress;
    localResources['PhoneAddress'] = resources.PhoneAddress;
    localResources['PostAddress'] = resources.PostAddress;
    localResources['PostZip'] = resources.PostZip;
    localResources['PostCity'] = resources.PostCity;

    Storage.add('slots', angular.toJson(localResources));

    $rootScope.notify( { message: 'Profile saved in localStorage.' } );

    Profile.save(null, resources, function()
    {
      $rootScope.notify( { message: 'Profile saved in back-end.' } );
    });
  };



  return new Profile;
});
*/
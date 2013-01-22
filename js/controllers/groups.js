function groupsCtrl($rootScope, $scope, $config, groups, Group, timerService, $route, $routeParams)
{
	var self = this;

	$scope.groups = groups;
	$scope.params = $route.current.params;

	switch($scope.params.action)
	{
		case 'members':
			$scope.members = Group.get($scope.params.groupId);
		break;
		case 'edit':
		break;
	}
	
  timerService.start('groupsTimer', function()
  { 
    Group.query();
  }, 60 * 30);


  //$('.tabs-left .tab-content').css({ height: $('.tabs-left .nav-tabs').height() - 24 });

};


groupsCtrl.resolve = {
  groups: function ($rootScope, $config, Group, $route) 
  {
    return Group.query();
  }
};


groupsCtrl.prototype = {
  constructor: groupsCtrl
};



groupsCtrl.$inject = ['$rootScope', '$scope', '$config', 'groups', 'Group', 'timerService', '$route', '$routeParams'];






// function membersCtrl($rootScope, $scope, $config, members, Group, timerService, $route, $routeParams)
// {
//   var self = this;

//   $scope.members = members;

//   console.log('--> members:', $scope.members);

// };


// membersCtrl.resolve = {
//   members: function ($rootScope, $config, Group, $route) 
//   {
//     return Group.get($route.current.params.groupId);
//   }
// };

// membersCtrl.$inject = ['$rootScope', '$scope', '$config', 'members', 'Group', 'timerService', '$route', '$routeParams'];







angular.module('GroupServices', ['ngResource']).
factory('Group', function ($resource, $config, $q, $route, $timeout, Storage, $rootScope) 
{

  var Group = $resource(
    $config.host + '/network/:groupId',
    {
    },
    {
      query: {
        method: 'GET',
        params: {},
        isArray: true
      },
      get: {
        method: 'GET',
        params: {groupId:''}
      },
      save: {
        method: 'POST',
        params: {}
      }
    }
  );

  var Members = $resource(
    $config.host + '/network/:groupId/members',
    {
    },
    {
      query: {
        method: 'GET',
        params: {groupId:''},
        isArray: true
      },
      get: {
        method: 'GET',
        params: {groupId:''}
      },
      save: {
        method: 'POST',
        params: {}
      }
    }
  );
  

  Group.prototype.query = function () 
  {    

    var deferred = $q.defer(), 
        localProfile = Storage.get('groups');

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
          deferred.reject("There is no groups!");
        }
        else 
        {
          $rootScope.notify( { message: 'Groups downloaded from back-end.' } );

          Storage.add('resources', angular.toJson(result));
          $rootScope.notify( { message: 'Groups data added to localStorage.' } );

          deferred.resolve(result);
        }
      };

      Group.query(successCb);

      return deferred.promise;
    // }
  };
  

  Group.prototype.get = function (groupId) 
  {    

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

      Members.query({groupId: groupId}, successCb);

      return deferred.promise;
    // }
  };


  Group.prototype.local = function()
  {
    return angular.fromJson(Storage.get('groups'));
  };


  Group.prototype.save = function (group) 
  {
    // var localResources = angular.fromJson(Storage.get('resources'));

    // localResources['name'] = resources.name;
    // localResources['EmailAddress'] = resources.EmailAddress;
    // localResources['PhoneAddress'] = resources.PhoneAddress;
    // localResources['PostAddress'] = resources.PostAddress;
    // localResources['PostZip'] = resources.PostZip;
    // localResources['PostCity'] = resources.PostCity;

    // Storage.add('slots', angular.toJson(localResources));

    // $rootScope.notify( { message: 'Profile saved in localStorage.' } );

    // Profile.save(null, resources, function()
    // {
    //   $rootScope.notify( { message: 'Profile saved in back-end.' } );
    // });
  };



  return new Group;
});
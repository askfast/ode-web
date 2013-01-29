'use strict';








WebPaige.
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
        params: {groupId:'', fields: '[role]'},
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


  Group.prototype.all = function()
  {
    Group.prototype.query()
    .then(function(groups)
    {
      var calls = [];
      angular.forEach(groups, function(group, index)
      {
        calls.push(Group.prototype.get(group.uuid));
      });
      $q.all(calls)
      .then(function(result)
      {
        Group.prototype.uniqueMembers();
        return {
          list: groups,
          members: calls
        }
      });
    });
  };
  

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
          //$rootScope.notify( { message: 'Groups downloaded from back-end.' } );

          Storage.add('groups', angular.toJson(result));

          //$rootScope.notify( { message: 'Groups data added to localStorage.' } );

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

        // if (angular.equals(result, [])) 
        // {
        //   deferred.reject("There is no record!");
        // }
        // else 
        // {
          //$rootScope.notify( { message: 'Profile data downloaded from back-end.' } );

          Storage.add(groupId, angular.toJson(result));

          //$rootScope.notify( { message: 'Profile data added to localStorage.' } );

          deferred.resolve({
            id: groupId,
            data: result
          });
        // }
      };

      Members.query({groupId: groupId}, successCb);

      return deferred.promise;
    // }
  };




  Group.prototype.uniqueMembers = function()
  {
    angular.forEach(angular.fromJson(Storage.get('groups')), function(group, index)
    {
      var members = angular.fromJson(Storage.get('members')) || {};

      angular.forEach(angular.fromJson(Storage.get(group.uuid)), function(member, index)
      {
        members[member.uuid] = member;
      });

      Storage.add('members', angular.toJson(members));
      
    });
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





/**
 * ************************************************************************************************
 * ************************************************************************************************
 * ************************************************************************************************
 * ************************************************************************************************
 */







/**
 * Groups Controller
 */
function groupsCtrl($rootScope, $scope, $config, groups, Group, timerService, $route, $routeParams, Storage)
{

	var self = this;

	$scope.groups = groups;

  $scope.members = {};

  angular.forEach(angular.fromJson(Storage.get('groups')), function(group, gindex)
  {
    $scope.members[group.uuid] = [];
    angular.forEach(angular.fromJson(Storage.get(group.uuid)), function (member, mindex)
    {
      $scope.members[group.uuid].push(member);
    });
  });
	
  // timerService.start('groupsTimer', function()
  // { 
  //   Group.query();
  // }, 60 * 30);

  $scope.fixTabHeight = function(uuid)
  {
    $('.tabs-left .tab-content #grp-' + uuid).css({ height: $('.tabs-left .nav-tabs').height() });
  };

};


/**
 * Groups resolver
 */
groupsCtrl.resolve = {
  groups: function ($rootScope, $config, Group, $route) 
  {
    return Group.query();
  }
};


/**
 * Groups prototypes
 */
groupsCtrl.prototype = {
  constructor: groupsCtrl
};



groupsCtrl.$inject = [  '$rootScope', 
                        '$scope', 
                        '$config', 
                        'groups', 
                        'Group', 
                        'timerService', 
                        '$route', 
                        '$routeParams',
                        'Storage'];
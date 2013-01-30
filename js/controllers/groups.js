'use strict';








WebPaige.
factory('Groups', function ($resource, $config, $q, $route, $timeout, Storage, $rootScope) 
{


  var Groups = $resource(
    $config.host + '/network/:action/:id',
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
        params: {id:''}
      },
      save: {
        method: 'POST',
        params: {id:''}
      },
      edit: {
        method: 'PUT',
        params: {id:''}
      },
      delete: {
        method: 'DELETE',
        params: {id:''}
      },
      search: {
        method: 'POST',
        params: {id:'', action:'searchPaigeUser'},
        isArray: true
      }
    }
  );


  var Members = $resource(
    $config.host + '/network/:id/members/:mid',
    {
    },
    {
      query: {
        method: 'GET',
        params: {id:'', fields: '[role]'},
        isArray: true
      },
      get: {
        method: 'GET',
        params: {id:''}
      },
      save: {
        method: 'POST',
        params: {}
      },
      add: {
        method: 'POST',
        params: {id:'', mid:''} 
      }
    }
  );




  Groups.prototype.addMember = function(candidate)
  {
    console.log('candidate from resource ->', candidate);

    var deferred = $q.defer();
    var successCb = function (result) 
    {
      deferred.resolve(result);
    };

    console.log('params ->', { id: candidate.group.uuid, mid: candidate.id });

    Members.add({ id: candidate.group.uuid, mid: candidate.id }, {}, successCb);
    return deferred.promise;    
  };




  // Groups.prototype.all_ = function()
  // {
  //   Groups.prototype.query()
  //   .then(function(groups)
  //   {
  //     var calls = [];
  //     angular.forEach(groups, function(group, index)
  //     {
  //       calls.push(Groups.prototype.get(group.uuid));
  //     });
  //     $q.all(calls)
  //     .then(function(result)
  //     {
  //       Groups.prototype.uniqueMembers();

  //       console.log('results ->', {
  //         list: groups,
  //         members: calls
  //       });

  //       return groups;
  //     });
  //   });
  // };


  Groups.prototype.query = function()
  {
    var deferred = $q.defer();
    var successCb = function (groups) 
    {
      var calls = [];
      angular.forEach(groups, function(group, index)
      {
        calls.push(Groups.prototype.get(group.uuid));
      });
      $q.all(calls)
      .then(function(result)
      {
        Groups.prototype.uniqueMembers();
        
        Storage.add('groups', angular.toJson(groups));
        deferred.resolve(groups);
      });
    };
    Groups.query(successCb);
    return deferred.promise;
  };
  


  // Groups.prototype.query = function () 
  // {    
  //   var deferred = $q.defer();
  //   var successCb = function (result) 
  //   {
  //     if (angular.equals(result, [])) 
  //     {
  //       deferred.reject("There are no groups!");
  //     }
  //     else 
  //     {
  //       Storage.add('groups', angular.toJson(result));
  //       deferred.resolve(result);
  //     }
  //   };
  //   Groups.query(successCb);
  //   return deferred.promise;
  // };


  // Groups.prototype.query = function()
  // {
  //   var deferred = $q.defer();
  //   var successCb = function (groups) 
  //   {
  //     var calls = [];
  //     angular.forEach(groups, function(group, index)
  //     {
  //       calls.push(Groups.prototype.get(group.uuid));
  //     });
  //     $q.all(calls)
  //     .then(function(result)
  //     {
  //       Groups.prototype.uniqueMembers();
  //     });

  //     Storage.add('groups', angular.toJson(groups));
  //     deferred.resolve(groups);
  //   };
  //   Groups.query(successCb);
  //   return deferred.promise;
  // };
  

  Groups.prototype.get = function (id) 
  {   
    var deferred = $q.defer(); 
    var successCb = function (result) 
    {
      Storage.add(id, angular.toJson(result));
      deferred.resolve({
        id: id,
        data: result
      });
    };
    Members.query({id: id}, successCb);
    return deferred.promise;
  };



  Groups.prototype.uniqueMembers = function()
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




  Groups.prototype.local = function()
  {
    return angular.fromJson(Storage.get('groups'));
  };



  Groups.prototype.save = function (group) 
  {
    var deferred = $q.defer();
    var successCb = function (result) 
    {
      deferred.resolve(result);
    };

    if (group.id)
    {
      Groups.edit({id: group.id}, {
        name: group.name
      }, successCb);
    }
    else
    {
      var resources = angular.fromJson(Storage.get('resources'));
      Groups.save({id: resources.uuid}, group, successCb); 
    };    

    return deferred.promise;
  };



  Groups.prototype.delete = function (id) 
  {
    var deferred = $q.defer();
    var successCb = function (result) 
    {
      deferred.resolve(result);
    };
    Groups.delete({id: id}, successCb);
    return deferred.promise;
  };



  Groups.prototype.search = function (query) 
  {
    var deferred = $q.defer();
    var successCb = function (result) 
    {
      deferred.resolve(result);
    };
    Groups.search(null, {key: query}, successCb);
    return deferred.promise;
  };


  return new Groups;
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
function groupsCtrl($rootScope, $scope, $config, groups, Groups, timerService, $route, $routeParams, Storage)
{

	var self = this;



  $scope.searchMembers = function(q)
  {
    Groups.search(q).
    then(function(results)
    {
      $scope.searchView = true;
      $scope.candidates = results;
    });
  };

  //$scope.search = {q : 'ce'};
  //$scope.searchMembers('ce');


  $scope.addMember = function(candidate)
  {
    console.log('candidate from controller ->', candidate);

    Groups.addMember(candidate).
    then(function(result)
    {
      $scope.candidateAddedView[candidate.id] = true;
    });
  };



  $scope.groupSubmit = function(group)
  {
    Groups.save(group).
    then(function()
    {
      $scope.groups = Groups.query();

      if ($scope.groupFormView.add)
      {
        $scope.groupFormView.add = false;
      }
      else if ($scope.groupFormView.edit)
      {
        $scope.groupFormView.edit = false;
      };

    });
  };


  $scope.editGroup = function(group)
  {
    $scope.groupFormView.edit = true;
    $scope.groupForm = {
      id: group.uuid,
      name: group.name
    };  
  };



  $scope.deleteGroup = function(id)
  {
    Groups.delete(id).
    then(function()
    {
      $scope.groups = Groups.query();
    });
  };



	
  // timerService.start('groupsTimer', function()
  // { 
  //   Group.query();
  // }, 60 * 30);

  $scope.fixTabHeight = function(uuid)
  {
    $('.tabs-left .tab-content #grp-' + uuid).css({ height: $('.tabs-left .nav-tabs').height() });
  };








  render(groups);


  function render(groups)
  {
    $scope.groupFormView = {
      add: false,
      edit: false
    };

    $scope.searchView = false;

    /**
     * TODO
     * Put these ones in rendering function
     * @type {[type]}
     */
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
  };

};


/**
 * Groups resolver
 */
groupsCtrl.resolve = {
  groups: function ($rootScope, $config, Groups, $route) 
  {
    return Groups.query();
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
                        'Groups', 
                        'timerService', 
                        '$route', 
                        '$routeParams',
                        'Storage'];




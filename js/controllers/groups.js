'use strict';


WebPaige.
factory('Groups', function ($resource, $config, $q, $route, $timeout, Storage, $rootScope) 
{

  /**
   * Groups resource
   * @type {[type]}
   */
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

  /**
   * Members resource
   * @type {[type]}
   */
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
      },
      remove: {
        method: 'DELETE',
        params: {id:'', mid:''} 
      }
    }
  );

  /**
   * Add Member to a group
   * @param {[type]} candidate [description]
   */
  Groups.prototype.addMember = function(candidate)
  {
    var deferred = $q.defer();
    var successCb = function (result) 
    {
      deferred.resolve(result);
    };
    Members.add({ id: candidate.group.uuid, mid: candidate.id }, {}, successCb);
    return deferred.promise;    
  };

  /**
   * Remove member from group
   * @param  {[type]} memberId [description]
   * @param  {[type]} groupId  [description]
   * @return {[type]}          [description]
   */
  Groups.prototype.removeMember = function(memberId, groupId)
  {
    var deferred = $q.defer();
    var successCb = function (result) 
    {
      deferred.resolve(result);
    };
    Members.remove({ id: groupId, mid: memberId }, successCb);
    return deferred.promise;    
  };

  /**
   * Remove members from a group (bulk action)
   * @param  {[type]} selection [description]
   * @param  {[type]} group     [description]
   * @return {[type]}           [description]
   */
  Groups.prototype.removeMembers = function(selection, group)
  {
    var deferred = $q.defer();
    var calls = [];
    angular.forEach(selection, function(value, id)
    {
      if (id)
      {
        calls.push(Groups.prototype.removeMember(id, group.uuid));
      }
    });
    $q.all(calls)
    .then(function(result)
    {
      deferred.resolve(result);
    });
    return deferred.promise; 
  };

  /**
   * General query function from groups and their members
   * @return {[type]} [description]
   */
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

  /**
   * Get group data
   * @param  {[type]} id [description]
   * @return {[type]}    [description]
   */
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

  /**
   * Make an inuque list of members
   * @return {[type]} [description]
   */
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

  /**
   * Save group
   * @param  {[type]} group [description]
   * @return {[type]}       [description]
   */
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

  /**
   * Save group
   * @param  {[type]} id [description]
   * @return {[type]}    [description]
   */
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

  /**
   * Search candidate mambers
   * @param  {[type]} query [description]
   * @return {[type]}       [description]
   */
  Groups.prototype.search = function (query) 
  {
    var deferred = $q.defer();
    var successCb = function (results) 
    {
      var processed = [];
      angular.forEach(results, function(result, index)
      {
        processed.push({
          id: result.id,
          name: result.name,
          groups: Groups.prototype.getMemberGroups(result.id)
        });
      });
      deferred.resolve(processed);
    };
    Groups.search(null, {key: query}, successCb);
    return deferred.promise;
  };

  Groups.prototype.getMemberGroups = function(id)
  {
    var groups = angular.fromJson(Storage.get('groups')),
        memberGroups = [];
    angular.forEach(groups, function(group, index)
    {
      var localGroup = angular.fromJson(Storage.get(group.uuid));
      angular.forEach(localGroup, function(member, index)
      {
        if (member.uuid === id)
        {
          memberGroups.push(group.name);
        }
      });
    });
    return memberGroups;
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
    Groups.addMember(candidate).
    then(function(result)
    {
      Groups.query().
      then(function(groups)
      {
        render(groups);
      });
    });
  };


  $scope.removeMember = function(member, group)
  {
    Groups.removeMember(member, group).
    then(function(result)
    {
      Groups.query().
      then(function(groups)
      {
        render(groups);
      });
    });
  };



  $scope.removeMembers = function(selection, group)
  {
    Groups.removeMembers(selection, group).
    then(function(result)
    {
      $scope.selection = {};
      Groups.query().
      then(function(groups)
      {
        render(groups);
      });
    });

    /**
     * TODO
     * not working to reset master checkbox!
     */
    //$scope.selectionMaster = {};
  };


  $scope.toggleSelection = function(group, master)
  {
    var flag = (master) ? true : false;    
    var members = angular.fromJson(Storage.get(group.uuid));
    angular.forEach(members, function(member, index)
    {
      $scope.selection[member.uuid] = flag;
    });
  };



  $scope.groupSubmit = function(group)
  {
    Groups.save(group).
    then(function()
    {
      //$scope.groups = Groups.query();

      if ($scope.groupFormView.add)
      {
        $scope.groupFormView.add = false;
      }
      else if ($scope.groupFormView.edit)
      {
        $scope.groupFormView.edit = false;
      };

      Groups.query().
      then(function(groups)
      {
        render(groups);
      });

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
      //$scope.groups = Groups.query();
      Groups.query().
      then(function(groups)
      {
        render(groups);
      });
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

    $scope.selection = {};

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




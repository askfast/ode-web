'use strict';

/**
 * Groups Controller
 */
function groupsCtrl($rootScope, $scope, $config, groups, Groups, $route, $routeParams, Storage)
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
                        '$route', 
                        '$routeParams',
                        'Storage'];




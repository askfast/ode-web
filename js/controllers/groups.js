'use strict';

/**
 * Groups Controller
 */
function groupsCtrl($rootScope, $scope, $config, data, Groups, $route, $routeParams, Storage)
{
  /**
   * Self this
   */
	var self = this;


  $scope.groupFormView = {
    add: false,
    edit: false
  };

  $scope.searchView = false;


  /**
   * Reset selection
   */
  $scope.selection = {};


  /**
   * Set groups
   */
  $scope.groups = data;


  /**
   * Render groups
   */
  render(data);


  /**
   * Search for members
   */
  $scope.searchMembers = function(q)
  {
    /**
     * Set preloader
     */
    $rootScope.loading = true;
    /**
     * Search
     */
    Groups.search(q).
    then(function(results)
    {
      // ????
      $scope.searchView = true;

      /**
       * Show results
       */
      $scope.candidates = results;
      /**
       * Set preloader
       */
      $rootScope.loading = false;
    });
  };


  /**
   * Add member to a group
   */
  $scope.addMember = function(candidate)
  {
    /**
     * Set preloader
     */
    $rootScope.loading = true;
    /**
     * Add a member
     */
    Groups.addMember(candidate).
    then(function(result)
    {
      /**
       * Query fresh data
       */
      Groups.query().
      then(function(groups)
      {
        /**
         * Re-render
         */
        render(groups);
        /**
         * Set preloader
         */
        $rootScope.loading = false;
      });
    });
  };


  /**
   * Remove member from a group
   */
  $scope.removeMember = function(member, group)
  {
    /**
     * Set preloader
     */
    $rootScope.loading = true;
    /**
     * Remove from group
     */
    Groups.removeMember(member, group).
    then(function(result)
    {
      /**
       * Query fresh data
       */
      Groups.query().
      then(function(groups)
      {
        /**
         * Re-render
         */
        render(groups);
        /**
         * Set preloader
         */
        $rootScope.loading = false;
      });
    });
  };


  /**
   * Remove members
   */
  $scope.removeMembers = function(selection, group)
  {
    /**
     * Set preloader
     */
    $rootScope.loading = true;
    /**
     * Remove members
     */
    Groups.removeMembers(selection, group).
    then(function(result)
    {
      /**
       * Reset selection
       */
      $scope.selection = {};
      /**
       * Query fresh data
       */
      Groups.query().
      then(function(groups)
      {
        /**
         * Re-render
         */
        render(groups);
        /**
         * Set preloader
         */
        $rootScope.loading = false;
      });
    });

    /**
     * TODO
     * not working to reset master checkbox!
     */
    //$scope.selectionMaster = {};
  };


  /**
   * Save a group
   */
  $scope.groupSubmit = function(group)
  {
    /**
     * Set preloader
     */
    $rootScope.loading = true;
    /**
     * Save group
     */
    Groups.save(group).
    then(function()
    {
      //$scope.groups = Groups.query();


      // ???
      if ($scope.groupFormView.add)
      {
        $scope.groupFormView.add = false;
      }
      else if ($scope.groupFormView.edit)
      {
        $scope.groupFormView.edit = false;
      };


      /**
       * Query fresh data
       */
      Groups.query().
      then(function(groups)
      {
        /**
         * Re-render
         */
        render(groups);
        /**
         * Set preloader
         */
        $rootScope.loading = false;
      });

    });
  };


  /**
   * Edit a group
   */
  $scope.editGroup = function(group)
  {
    // ???
    $scope.groupFormView.edit = true;


    $scope.groupForm = {
      id: group.uuid,
      name: group.name
    };  
  };


  /**
   * Delete a group
   */
  $scope.deleteGroup = function(id)
  {
    /**
     * Set preloader
     */
    $rootScope.loading = true;
    /**
     * Delete group
     */
    Groups.delete(id).
    then(function()
    {
      /**
       * Query fresh data
       */
      Groups.query().
      then(function(groups)
      {
        /**
         * Re-render
         */
        render(groups);
        /**
         * Set preloader
         */
        $rootScope.loading = false;
      });
    });
  };


  /**
   * Render groups
   */
  function render(groups)
  {
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


  /**
   * Selection toggler
   */
  $scope.toggleSelection = function(group, master)
  {
    var flag = (master) ? true : false;    
    var members = angular.fromJson(Storage.get(group.uuid));
    angular.forEach(members, function(member, index)
    {
      $scope.selection[member.uuid] = flag;
    });
  };



};


/**
 * Groups resolver
 */
groupsCtrl.resolve = {
  data: function ($rootScope, $config, Groups, $route) 
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



groupsCtrl.$inject = ['$rootScope', '$scope', '$config', 'data', 'Groups', '$route', '$routeParams', 'Storage'];
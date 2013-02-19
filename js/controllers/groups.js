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


  // $scope.groupFormView = {
  //   add: false,
  //   edit: false
  // };

  // $scope.searchView = false;


  /**
   * Default view settings
   */
  $scope.views = {
    add: false,
    edit: false,
    search: false
  };


  /**
   * Toggle new group button
   */
  $scope.toggleForm = function ()
  {
    /**
     * TODO
     * If no other actions needed make this compact
     * 
     * Check on status
     */
    if ($scope.views.add)
    {
      $scope.views.add = false;
    }
    else
    {
      /**
       * TODO
       * Maybe outside of the if check?
       * 
       * Reset inline form value
       */
      $scope.groupForm = {};
      $scope.views.add = true;
    };
  };


  /**
   * Close inline form
   */
  $scope.closeForm = function ()
  {
    $scope.views = {
      add: false,
      edit: false,
      search: false
    };
  };


  /**
   * Reset selection
   */
  $scope.selection = {};


  /**
   * Set groups
   */
  $scope.data = data;


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
      /**
       * Show results
       */
      $scope.candidates = results;
      /**
       * Set search view on
       */
      $scope.views.search = true;
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
      then(function(data)
      {
        /**
         * Set returned data
         */
        $scope.data = data;
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
      then(function(data)
      {
        /**
         * Set returned data
         */
        $scope.data = data;
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
      then(function(data)
      {
        /**
         * Set returned data
         */
        $scope.data = data;
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
      then(function(data)
      {
        /**
         * Close form if its still open
         */
        $scope.closeForm();
        /**
         * Set returned data
         */
        $scope.data = data;
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
    // $scope.groupFormView.edit = true;

    /**
     * Set view on edit mode
     */
    $scope.views = {
      add: false,
      edit: true,
      search: $scope.views.search
    };

    /**
     * Set values for group edit form
     */
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
      then(function(data)
      {
        /**
         * Set returned data
         */
        $scope.data = data;
        /**
         * Set preloader
         */
        $rootScope.loading = false;
      });
    });
  };


  /**
   * Selection toggler
   */
  $scope.toggleSelection = function(group, master)
  {
    /**
     * Set the flag
     */
    var flag = (master) ? true : false;
    /**
     * Get members
     */
    var members = angular.fromJson(Storage.get(group.uuid));
    /**
     * Loop through members and set flags
     */
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
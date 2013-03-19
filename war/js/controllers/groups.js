'use strict';

/**
 * Groups Controller
 */
function groupsCtrl($rootScope, $scope, $config, $location, data, Groups, Profile, $route, $routeParams, Storage)
{
  /**
   * Fix styles
   */
  $rootScope.fixStyles();

  
  /**
   * Self this
   */
	var self = this;


  /**
   * Init search query
   */
  $scope.search = {
    query: ''
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
   * Grab and set roles for view
   */
  $scope.roles = $config.roles;


  /**
   * Groups for dropdown
   */
  $scope.groups = data.groups;


  /**
   * Extract view action from url and set view
   */
  var params = $location.search();


  /**
   * If no params or hashes given in url
   */
  if (!params.uuid && !$location.hash())
  {
    /**
     * Set param and hash
     */
    var uuid = data.groups[0].uuid;
    var view = 'view';
    /**
     * Adjust url
     */
    $location.search({
      uuid: data.groups[0].uuid
    }).hash('view');
  }
  else
  {
    /**
     * If given use what's supplied
     */
    var uuid = params.uuid;
    var view = $location.hash();
  };


  /**
   * Set group
   */
  setGroupView(uuid);


  /**
   * Set view
   */
  setView(view);


  /**
   * Set given group for view
   */
  function setGroupView (id)
  {  
    /**
     * Loop through groups and set current group
     */
    angular.forEach(data.groups, function (group, index)
    {
      if (group.uuid == id)
      {
        $scope.group = group;
      };
    });
    /**
     * Set members
     */
    $scope.members = data.members[id];
    /**
     * Set current
     */
    $scope.current = id;
  };


  /**
   * Request for a group
   */
  $scope.requestGroup = function (current)
  {
    /**
     * Set selected group for view
     */
    setGroupView(current);
    /**
     * Let angular know things are changing
     */
    $scope.$watch($location.search(), function()
    {
      /**
       * Set hash
       */
      $location.search({
        uuid: current
      });
    });
  };


  /**
   * View setter
   */
  function setView (hash)
  {
    /**
     * Default view settings
     */
    $scope.views = {
      view:   false,
      add:    false,
      edit:   false,
      search: false,
      member: false
    };
    /**
     * Set correct one true
     */
    $scope.views[hash] = true;
  };


  /**
   * Switch between the views and set hash accordingly
   */
  $scope.setViewTo = function (hash)
  {
    /**
     * Let angular know things are changing
     */
    $scope.$watch(hash, function()
    {
      /**
       * Set hash
       */
      $location.hash(hash);
      /**
       * Set view intern
       */
      setView(hash);
    });
  };


  /**
   * Toggle new group button
   */
  $scope.addGroupForm = function ()
  {
    /** 
     * Check on status
     */
    if ($scope.views.add)
    {
      /**
       * Close all
       */
      $scope.closeTabs();
    }
    else
    {
      /**
       * Reset inline form value
       */
      $scope.groupForm = {};
      /**
       * Set views
       */
      $scope.setViewTo('add');
    };
  };


  /**
   * New member
   */
  $scope.newMemberForm = function ()
  {
    /** 
     * Check on status
     */
    if ($scope.views.member)
    {
      /**
       * Close all
       */
      $scope.closeTabs();
    }
    else
    {
      /**
       * Reset inline form value
       */
      $scope.memberForm = {};
      /**
       * Set views
       */
      $scope.setViewTo('member');
    };
  };


  /**
   * Edit a group
   */
  $scope.editGroup = function (group)
  {
    /**
     * Set view on edit mode
     */
    $scope.setViewTo('edit');
    /**
     * Set values for group edit form
     */
    $scope.groupForm = {
      id: group.uuid,
      name: group.name
    }; 
  };


  /**
   * Close inline form
   */
  $scope.closeTabs = function ()
  {
    /**
     * Clean forms
     */
    $scope.groupForm = {};
    $scope.memberForm = {};
    /**
     * Set views
     */
    $scope.setViewTo('view');
  };


  /**
   * Search for members
   */
  $scope.searchMembers = function (query)
  {
    /**
     * Set preloader
     */
    $rootScope.loading = {
      status: true,
      message: $rootScope.ui.groups.searchingMembers
    };
    /**
     * Search
     */
    Groups.search(query).
    then(function(results)
    {
      /**
       * Set query string for view
       */
      $scope.search = {
        query: '',
        queried: query
      };
      /**
       * Show results
       */
      $scope.candidates = results;
      /**
       * Set search view on
       */
      $scope.setViewTo('search');
      /**
       * Fix height of the content tab
       */
      $rootScope.fixTabHeight('searchTab');
      /**
       * Turn off preloader
       */
      $rootScope.loading = {
        status: true
      };
    });
  };


  /**
   * Add member to a group
   */
  $scope.addMember = function (candidate)
  {
    /**
     * Set preloader
     */
    $rootScope.loading = {
      status: true,
      message: $rootScope.ui.groups.addingNewMember
    };
    /**
     * Add a member
     */
    Groups.addMember(candidate).
    then(function(result)
    {
      /**
       * Inform user
       */
      $rootScope.notify({
        status: true,
        type: 'alert-success',
        message: $rootScope.ui.groups.memberAdded
      });
      /**
       * Refresh groups list message
       */
      $rootScope.loading = {
        status: true,
        message: $rootScope.ui.groups.refreshingGroupMember
      };
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
         * Turn off preloader
         */
        $rootScope.loading = {
          status: false
        };
      });
    });
  };


  /**
   * Remove member from a group
   */
  $scope.removeMember = function (member, group)
  {
    /**
     * Set preloader
     */
    $rootScope.loading = {
      status: true,
      message: $rootScope.ui.groups.removingMember
    };
    /**
     * Remove from group
     */
    Groups.removeMember(member, group).
    then(function(result)
    {
      /**
       * Inform user
       */
      $rootScope.notify({
        status: true,
        type: 'alert-success',
        message: $rootScope.ui.groups.memberRemoved
      });
      /**
       * Refresh groups list message
       */
      $rootScope.loading = {
        status: true,
        message: $rootScope.ui.groups.refreshingGroupMember
      };
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
         * Turn off preloader
         */
        $rootScope.loading = {
          status: false
        };
      });
    });
  };


  /**
   * Remove members
   */
  $scope.removeMembers = function (selection, group)
  {
    /**
     * Set preloader
     */
    $rootScope.loading = {
      status: true,
      message: $rootScope.ui.groups.removingSelected
    };
    /**
     * Remove members
     */
    Groups.removeMembers(selection, group).
    then(function(result)
    {
      /**
       * Inform user
       */
      $rootScope.notify({
        status: true,
        type: 'alert-success',
        message: $rootScope.ui.groups.removed
      });
      /**
       * Refresh groups list message
       */
      $rootScope.loading = {
        status: true,
        message: $rootScope.ui.groups.refreshingGroupMember
      };
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
         * Turn off preloader
         */
        $rootScope.loading = {
          status: false
        };
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
  $scope.groupSubmit = function (group)
  {
    /**
     * Set preloader
     */
    $rootScope.loading = {
      status: true,
      message: $rootScope.ui.groups.saving
    };
    /**
     * Save group
     */
    Groups.save(group).
    then(function(returned)
    {
      /**
       * Inform user
       */
      $rootScope.notify({
        status: true,
        type: 'alert-success',
        message: $rootScope.ui.groups.groupSaved
      });
      /**
       * Refresh groups list message
       */
      $rootScope.loading = {
        status: true,
        message: $rootScope.ui.groups.refreshingGroupMember
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
        $scope.closeTabs();
        /**
         * Set returned data
         */
        $scope.data = data;
        /**
         * Redirect to group view
         */
        angular.forEach(data.groups, function (group, index)
        {
          if (group.uuid == returned)
          {
            /**
             * Reset groups drop down
             */
            $scope.groups = data.groups;
            /**
             * Loop through groups and set current group
             */
            angular.forEach(data.groups, function (g, index)
            {
              if (g.uuid == group.uuid)
              {
                $scope.group = g;
              };
            });
            /**
             * Set members
             */
            $scope.members = data.members[group.uuid];
            /**
             * Set current
             */
            $scope.current = group.uuid;
            /**
             * Adjust params
             */
            $scope.$watch($location.search(), function()
            {
              /**
               * Set hash
               */
              $location.search({
                uuid: group.uuid
              });
            });
            // end of watch
          };
          // end of if
        });
        // end of foreach
        /**
         * Turn off loading
         */
        $rootScope.loading = {
          status: false
        };
      });

    });
  };


  /**
   * Save a member
   */
  $scope.memberSubmit = function (member)
  {
    /**
     * Set preloader
     */
    $rootScope.loading = {
      status: true,
      message: $rootScope.ui.groups.registerNew
    };
    /**
     * Register a new member
     */
    Profile.register(member).
    then(function()
    {
      /**
       * Inform user
       */
      $rootScope.notify({
        status: true,
        type: 'alert-success',
        message: $rootScope.ui.groups.memberRegstered
      });
      /**
       * Refresh groups list message
       */
      $rootScope.loading = {
        status: true,
        message: $rootScope.ui.groups.refreshingGroupMember
      };
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
         * Redirect to profile of new user
         */
        $location.path('/profile/' + member.username).hash('profile');
        /**
         * Turn off preloader
         */
        $rootScope.loading = {
          status: false
        };
      });
    });
  };


  /**
   * Delete a group
   */
  $scope.deleteGroup = function (id)
  {
    /**
     * Set preloader
     */
    $rootScope.loading = {
      status: true,
      message: $rootScope.ui.groups.deleting
    };
    /**
     * Delete group
     */
    Groups.remove(id).
    then(function()
    {
      /**
       * Inform user
       */
      $rootScope.notify({
        status: true,
        type: 'alert-success',
        message: $rootScope.ui.groups.deleted
      });
      /**
       * Refresh groups list message
       */
      $rootScope.loading = {
        status: true,
        message: $rootScope.ui.groups.refreshingGroupMember
      };
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
         * Redirect to group view
         */
        angular.forEach(data.groups, function (group, index)
        {
          /**
           * Reset groups drop down
           */
          $scope.groups = data.groups;
          /**
           * Set first group to be displayed
           * @type {[type]}
           */
          $scope.group = data.groups[0];
          /**
           * Set members
           */
          $scope.members = data.members[data.groups[0].uuid];
          /**
           * Set current
           */
          $scope.current = data.groups[0].uuid;
          /**
           * Adjust params
           */
          $scope.$watch($location.search(), function()
          {
            /**
             * Set hash
             */
            $location.search({
              uuid: data.groups[0].uuid
            });
          });
          // end of watch
        });
        // end of foreach
        /**
         * Turn off loading
         */
        $rootScope.loading = {
          status: false
        };
      });
    });
  };


  /**
   * Selection toggler
   */
  $scope.toggleSelection = function (group, master)
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



groupsCtrl.$inject = ['$rootScope', '$scope', '$config', '$location', 'data', 'Groups', 'Profile', 
                      '$route', '$routeParams', 'Storage'];
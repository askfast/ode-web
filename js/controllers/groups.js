'use strict';

/**
 * Groups Controller
 */
function groupsCtrl($rootScope, $scope, $config, $location, data, Groups, Profile, $route, $routeParams, Storage)
{
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
   * Default view settings
   */
  $scope.views = {
    addGroup: false,
    editGroup: false,
    search: false,
    newMember: false
  };


  /**
   * Toggle new group button
   */
  $scope.addGroupForm = function ()
  {
    /** 
     * Check on status
     */
    if ($scope.views.addGroup)
    {
      /**
       * Close all
       */
      $scope.closeTabs();
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
      $scope.views = {
        addGroup: true,
        editGroup: false,
        search: false,
        newMember: false
      };
      /**
       * Reset tabs
       */
      $scope.resetTabs();
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
    if ($scope.views.newMember)
    {
      /**
       * Close all
       */
      $scope.closeTabs();
    }
    else
    {
      /**
       * TODO
       * Maybe outside of the if check?
       * 
       * Reset inline form value
       */
      $scope.memberForm = {};
      $scope.views = {
        addGroup: false,
        editGroup: false,
        search: false,
        newMember: true
      };
      /**
       * Reset tabs
       */
      $scope.resetTabs();
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
    $scope.views = {
      addGroup: false,
      editGroup: true,
      search: false,
      newMember: false
    };
    /**
     * Set values for group edit form
     */
    $scope.groupForm = {
      id: group.uuid,
      name: group.name
    }; 
    /**
     * Reset tabs
     */
    $scope.resetTabs(); 
  };


  /**
   * Reset tabs
   */
  $scope.resetTabs = function ()
  {    
    /**
     * Remove active classes of group tabs
     */
    angular.forEach(data.groups, function (group, index)
    {
      $('#grpl-' + group.uuid).removeClass('active');
      $('#grp-' + group.uuid).removeClass('active');
    });
  };


  /**
   * Set first group tab active
   */
  $scope.setFirstGroupTab = function ()
  {
    $('#grpl-' + data.groups[0].uuid).addClass('active');
    $('#grp-' + data.groups[0].uuid).addClass('active');
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
    $scope.views = {
      addGroup: false,
      editGroup: false,
      search: false,
      newMember: false
    };
    /**
     * Set back first group tab active
     */
    $scope.setFirstGroupTab();
  };


  /**
   * Search for members
   */
  $scope.searchMembers = function (query)
  {
    /**
     * Set preloader
     */
    $rootScope.loading = true;
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
      $scope.views = {
        addGroup: false,
        editGroup: false,
        search: true,
        newMember: false
      };
      /**
       * Set preloader
       */
      $rootScope.loading = false;
      /**
       * Reset tabs
       */
      $scope.resetTabs();
      /**
       * Fix height of the content tab
       */
      $rootScope.fixTabHeight('searchTab');
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
  $scope.removeMember = function (member, group)
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
  $scope.removeMembers = function (selection, group)
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
  $scope.groupSubmit = function (group)
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
         * Set preloader
         */
        $rootScope.loading = false;
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
    $rootScope.loading = true;
    /**
     * Register a new member
     */
    Profile.register(member).
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
        /**
         * Redirect to profile of new user
         */
        $location.path('/profile/' + member.username + '/view');
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
    // return ''
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
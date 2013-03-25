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




  $scope.fetchParents = function (id)
  {
    return "fetching user groups";

    // Groups.parents(id)
    // .then(function(result)
    // {
    //   return 'groups -> ' + result;
    // })
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



WebPaige.
factory('Groups', function ($resource, $config, $q, $route, $timeout, Storage, $rootScope) 
{

  /**
   * Groups resource
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
      remove: {
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
   * Parent resource
   */
  var Parents = $resource(
    $config.host + '/node/:id/container',
    {
    },
    {
      get: {
        method: 'GET',
        params: {id:''}
      }
    }
  );

  /**
   * Members resource
   */
  var Members = $resource(
    $config.host + '/network/:id/members/:mid',
    {
    },
    {
      query: {
        method: 'GET',
        params: {id:'', fields: '[role, latlong, latlong_final, settingsWebPaige]'},
        //params: {id:'', fields: '[role]'},
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
   */
  Groups.prototype.addMember = function(candidate)
  {
    var deferred = $q.defer();

    /**
     * Add member to group
     */
    Members.add({ 
      id: candidate.group.uuid, 
      mid: candidate.id 
    }, {}, function (result) 
    {
      deferred.resolve(result);
    });

    return deferred.promise;    
  };


  /**
   * Remove member from group
   */
  Groups.prototype.removeMember = function(memberId, groupId)
  {
    var deferred = $q.defer();

    /**
     * Remove member
     */
    Members.remove({ 
      id: groupId, 
      mid: memberId 
    }, function (result) 
    {
      deferred.resolve(result);
    });

    return deferred.promise;    
  };


  /**
   * Remove members from a group (bulk action)
   */
  Groups.prototype.removeMembers = function(selection, group)
  {
    var deferred = $q.defer(),
        calls = [];

    /**
     * Push selection into a calls pool
     */
    angular.forEach(selection, function(value, id)
    {
      if (id)
      {
        calls.push(Groups.prototype.removeMember(id, group.uuid));
      }
    });

    /**
     * Loop through and make calls
     */
    $q.all(calls)
    .then(function(result)
    {
      deferred.resolve(result);
    });

    return deferred.promise; 
  };


  /**
   * General query function from groups and their members
   */
  Groups.prototype.query = function()
  {
    var deferred = $q.defer();

    /**
     * Query groups
     */
    Groups.query(function (groups) 
    {
      /**
       * Add data to localStorage
       */
      Storage.add('groups', angular.toJson(groups));

      /**
       * Make pool of calls of groups for member list calls
       */
      var calls = [];
      angular.forEach(groups, function(group, index)
      {
        calls.push(Groups.prototype.get(group.uuid));
      });

      /**
       * Loop through the members listing calls in pool
       */
      $q.all(calls)
      .then(function(results)
      {
        /**
         * Make | Update unique members list
         */
        Groups.prototype.uniqueMembers();

        /**
         * Init containers
         */
        var data = {};
        data.members = {};

        /**
         * Loop through groups
         */
        angular.forEach(groups, function(group, gindex)
        {
          data.groups = groups;

          /**
           * Init containers
           */
          data.members[group.uuid] = [];

          /**
           * Loop through members
           */
          angular.forEach(results, function (result, mindex)
          {
            if (result.id == group.uuid)
            {
              data.members[group.uuid] = result.data;
            };
          });
        });

        deferred.resolve(data);
      });

    });

    return deferred.promise;
  };


  /**
   * Get group data
   */
  Groups.prototype.get = function (id) 
  {   
    var deferred = $q.defer();

    /**
     * Query members list
     */
    Members.query({id: id}, function (result) 
    {
      /**
       * DIRTY CHECK!
       * 
       * Check for 'null' return from back-end
       * if group is empty
       */
      var returned;
      if (result.length == 4 && 
          result[0][0] == 'n' && 
          result[1][0] == 'u')
      {
        returned = [];
      }
      else
      {
        returned = result;
      };
      
      /**
       * Add members list to localStorage
       */
      Storage.add(id, angular.toJson(returned));
      /**
       * Return it baby!
       */
      deferred.resolve({
        id: id,
        data: returned
      });
    });

    return deferred.promise;
  };


  /**
   * TODO
   * Extract only the groups which are in the local list
   * 
   * Get parent group data
   */
  Groups.prototype.parents = function (id) 
  {   
    var deferred = $q.defer();
    /**
     * Query members list
     */
    Parents.get({id: id}, function (result) 
    {
      /**
       * Return it baby!
       */
      deferred.resolve({
        data: returned
      });
    });
    return deferred.promise;
  };


  /**
   * Make an inuque list of members
   */
  Groups.prototype.uniqueMembers = function()
  {
    /**
     * Loop through local groups
     */
    angular.forEach(angular.fromJson(Storage.get('groups')), function(group, index)
    {
      /**
       * Init members list
       */
      var members = angular.fromJson(Storage.get('members')) || {};
      /**
       * Loop through members
       */
      angular.forEach(angular.fromJson(Storage.get(group.uuid)), function(member, index)
      {
        members[member.uuid] = member;
      });
      /**
       * Add members to localStorage
       */
      Storage.add('members', angular.toJson(members));
    });
  };


  /**
   * Save group
   */
  Groups.prototype.save = function (group) 
  {
    var deferred = $q.defer();

    /**
     * Check if group id supplied
     * if save submitted from add / edit form
     */
    if (group.id)
    {
      /**
       * Edit group
       */
      Groups.edit({
        id: group.id
      }, {
        name: group.name
      }, function (result) 
      {
        deferred.resolve(group.id);
      });
    }
    else
    {
      /**
       * Save group
       */
      Groups.save({
        id: $rootScope.app.resources.uuid
      }, group, function (result) 
      {
        /**
         * Group save call returns only uuid and that is parsed as json
         * by angular, this is a fix for converting returned object to plain string
         */
        var returned = '';
        angular.forEach(result, function (chr, i)
        {
          returned += chr;
        });
        deferred.resolve(returned);
      }); 
    };

    return deferred.promise;
  };


  /**
   * Delete group
   */
  Groups.prototype.remove = function (id) 
  {
    var deferred = $q.defer();

    /**
     * Delete group
     */
    Groups.remove({id: id}, function (result) 
    {
      deferred.resolve(result);
    });

    return deferred.promise;
  };


  /**
   * Search candidate mambers
   */
  Groups.prototype.search = function (query) 
  {
    var deferred = $q.defer();
    
    /**
     * Search action
     */
    Groups.search(null, {key: query}, function (results) 
    {
      var processed = [];
      /**
       * Loop through results
       */
      angular.forEach(results, function(result, index)
      {
        /**
         * Push in pool
         */
        processed.push({
          id: result.id,
          name: result.name,
          groups: Groups.prototype.getMemberGroups(result.id)
        });
      });

      deferred.resolve(processed);
    });

    return deferred.promise;
  };


  /**
   * Get groups of given member
   */
  Groups.prototype.getMemberGroups = function(id)
  {
    /**
     * Get local groups and init members container
     */
    var groups = angular.fromJson(Storage.get('groups')),
        memberGroups = [];

    /**
     * Loop through local groups
     */
    angular.forEach(groups, function(group, index)
    {
      /**
       * Set local group
       */
      var localGroup = angular.fromJson(Storage.get(group.uuid));
      /**
       * Loop through found local group
       */
      angular.forEach(localGroup, function(member, index)
      {
        /**
         * If found any add into basket
         */
        if (member.uuid === id)
        {
          memberGroups.push({
            uuid: group.uuid,
            name: group.name
          });
        }
      });
    });

    return memberGroups;
  };


  return new Groups;
});
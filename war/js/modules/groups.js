'use strict';

/**
 * Groups Controller
 */
function groupsCtrl($rootScope, $scope, $location, data, Groups, Profile, $route, $routeParams, Storage, Slots)
{
  /**
   * Fix styles
   */
  $rootScope.fixStyles();

  
  /**
   * Self this
   */
	var self = this,
      params = $location.search();


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
  $scope.roles = $rootScope.config.roles;


  /**
   * Groups for dropdown
   */
  $scope.groups = data.groups;


  /**
   * If no params or hashes given in url
   */
  if (!params.uuid && !$location.hash())
  {
    var uuid = data.groups[0].uuid,
        view = 'view';

    $location.search({uuid: data.groups[0].uuid}).hash('view');
  }
  else
  {
    var uuid = params.uuid,
        view = $location.hash();
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
    angular.forEach(data.groups, function (group, index)
    {
      if (group.uuid == id) $scope.group = group;
    });

    $scope.members = data.members[id];

    $scope.current = id;

    wisher(id);
  };


  function wisher (id)
  {
    $scope.wished = false;

    Groups.wish(id)
    .then(function (wish)
    {
      $scope.wished = true;

      $scope.wish = wish.count;

      $scope.popover = {
        id: id,
        wish: wish.count
      }
    });
  }


  /**
   * Set wish for the group
   */
  $scope.saveWish = function (id, wish)
  {
    console.warn('setting the wish:' + wish + ' for the group:', id);
    
    $rootScope.statusBar.display($rootScope.ui.planboard.changingWish);

    Slots.setWish(
    {
      id:     id,
      start:  255600,
      end:    860400,
      recursive:  true,
      wish:   wish
    })
    .then(
      function (result)
      {
        if (result.error)
        {
          $rootScope.notifier.error('Error with changing wish value.');
          console.warn('error ->', result);
        }
        else
        {
          $rootScope.notifier.success($rootScope.ui.planboard.wishChanged);
        };

        wisher(id);
      }
    );

  };


  /**
   * Request for a group
   */
  $scope.requestGroup = function (current, switched)
  {
    setGroupView(current);

    $scope.$watch($location.search(), function ()
    {
      $location.search({uuid: current});
    });

    if (switched)
    {
      if ($location.hash() != 'view') $location.hash('view');

      setView('view');
    };
  };
  

  /**
   * View setter
   */
  function setView (hash)
  {
    $scope.views = {
      view:   false,
      add:    false,
      edit:   false,
      search: false,
      member: false
    };

    $scope.views[hash] = true;
  };


  /**
   * Switch between the views and set hash accordingly
   */
  $scope.setViewTo = function (hash)
  {
    $scope.$watch(hash, function ()
    {
      $location.hash(hash);

      setView(hash);
    });
  };


  /**
   * Toggle new group button
   */
  $scope.addGroupForm = function ()
  {
    if ($scope.views.add)
    {
      $scope.closeTabs();
    }
    else
    {
      $scope.groupForm = {};

      $scope.setViewTo('add');
    };
  };


  /**
   * New member
   */
  $scope.newMemberForm = function ()
  {
    if ($scope.views.member)
    {
      $scope.closeTabs();
    }
    else
    {
      $scope.memberForm = {};

      $scope.setViewTo('member');
    };
  };


  /**
   * Edit a group
   */
  $scope.editGroup = function (group)
  {
    $scope.setViewTo('edit');

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
    $scope.groupForm = {};

    $scope.memberForm = {};

    $scope.setViewTo('view');
  };


  /**
   * Search for members
   */
  $scope.searchMembers = function (query)
  {
    $rootScope.statusBar.display($rootScope.ui.groups.searchingMembers);

    Groups.search(query).
    then(function (result)
    {
      if (result.error)
      {
        $rootScope.notifier.error('Error with search.');
        console.warn('error ->', result);
      }
      else
      {
        $scope.search = {
          query: '',
          queried: query
        };

        $scope.candidates = result;

        $scope.setViewTo('search');

        $rootScope.statusBar.off();
      };
    });
  };


  /**
   * Add member to a group
   */
  $scope.addMember = function (candidate)
  {
    $rootScope.statusBar.display($rootScope.ui.groups.addingNewMember);

    Groups.addMember(candidate).
    then(function (result)
    {
      if (result.error)
      {
        $rootScope.notifier.error('Error with adding a member.');
        console.warn('error ->', result);
      }
      else
      {
        $rootScope.notifier.success($rootScope.ui.groups.memberAdded);

        $rootScope.statusBar.display($rootScope.ui.groups.refreshingGroupMember);

        Groups.query().
        then(function (data)
        {
          if (data.error)
          {
            $rootScope.notifier.error('Error with getting groups and users.');
            console.warn('error ->', data);
          }
          else
          {
            $scope.data = data;

            $rootScope.statusBar.off();
          };
        });
      };
    });
  };


  /**
   * Remove member from a group
   */
  $scope.removeMember = function (member, group)
  {
    $rootScope.statusBar.display($rootScope.ui.groups.removingMember);

    Groups.removeMember(member, group).
    then(function (result)
    {
      if (result.error)
      {
        $rootScope.notifier.error('Error with removing a member.');
        console.warn('error ->', result);
      }
      else
      {
        $rootScope.notifier.success($rootScope.ui.groups.memberRemoved);

        $rootScope.statusBar.display($rootScope.ui.groups.refreshingGroupMember);

        Groups.query().
        then(function (data)
        {
          if (data.error)
          {
            $rootScope.notifier.error('Error with getting groups and users.');
            console.warn('error ->', data);
          }
          else
          {
            $scope.data = data;

            $rootScope.statusBar.off();
          };
        });
      };
    });
  };


  /**
   * Remove members
   */
  $scope.removeMembers = function (selection, group)
  {
    $rootScope.statusBar.display($rootScope.ui.groups.removingSelected);

    Groups.removeMembers(selection, group).
    then(function (result)
    {
      if (result.error)
      {
        $rootScope.notifier.error('Error with removing members.');
        console.warn('error ->', result);
      }
      else
      {
        $rootScope.notifier.success($rootScope.ui.groups.removed);

        $rootScope.statusBar.display($rootScope.ui.groups.refreshingGroupMember);

        $scope.selection = {};

        Groups.query().
        then(function (data)
        {
          if (data.error)
          {
            $rootScope.notifier.error('Error with getting groups and users.');
            console.warn('error ->', data);
          }
          else
          {
            $scope.data = data;

            $rootScope.statusBar.off();
          };
        });
      };
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
    $rootScope.statusBar.display($rootScope.ui.groups.saving);

    Groups.save(group).
    then(function (returned)
    {
      if (returned.error)
      {
        $rootScope.notifier.error('Error with saving group.');
        console.warn('error ->', returned);
      }
      else
      {
        $rootScope.notifier.success($rootScope.ui.groups.groupSaved);

        $rootScope.statusBar.display($rootScope.ui.groups.refreshingGroupMember);

        Groups.query().
        then(function (data)
        {
          if (data.error)
          {
            $rootScope.notifier.error('Error with getting groups and users.');
            console.warn('error ->', data);
          }
          else
          {
            $scope.closeTabs();

            $scope.data = data;

            angular.forEach(data.groups, function (group, index)
            {
              if (group.uuid == returned)
              {
                $scope.groups = data.groups;

                angular.forEach(data.groups, function (g, index)
                {
                  if (g.uuid == group.uuid) $scope.group = g;
                });

                $scope.members = data.members[group.uuid];

                $scope.current = group.uuid;

                $scope.$watch($location.search(), function ()
                {
                  $location.search({uuid: group.uuid});
                }); // end of watch

              }; // end of if

            }); // end of foreach

            $rootScope.statusBar.off();
          };
        });
      };
    });
  };


  /**
   * Save a member
   */
  $scope.memberSubmit = function (member)
  {
    $rootScope.statusBar.display($rootScope.ui.groups.registerNew);

    Profile.register(member).
    then(function (result)
    {
      if (result.error)
      {
        $rootScope.notifier.error('Error with registering a member.');
        console.warn('error ->', result);
      }
      else
      {
        $rootScope.notifier.success($rootScope.ui.groups.memberRegstered);

        $rootScope.statusBar.display($rootScope.ui.groups.refreshingGroupMember);

        Groups.query().
        then(function (data)
        {
          if (data.error)
          {
            $rootScope.notifier.error('Error with getting groups and users.');
            console.warn('error ->', data);
          }
          else
          {
            $scope.data = data;

            $location.path('/profile/' + member.username).hash('profile');

            $rootScope.statusBar.off();
          };
        });
      };
    });
  };


  /**
   * Delete a group
   */
  $scope.deleteGroup = function (id)
  {
    $rootScope.statusBar.display($rootScope.ui.groups.deleting);

    Groups.remove(id).
    then(function (result)
    {
      if (result.error)
      {
        $rootScope.notifier.error('Error with deleting a group.');
        console.warn('error ->', result);
      }
      else
      {
        $rootScope.notifier.success($rootScope.ui.groups.deleted);

        $rootScope.statusBar.display($rootScope.ui.groups.refreshingGroupMember);

        Groups.query().
        then(function (data)
        {
          if (data.error)
          {
            $rootScope.notifier.error('Error with getting groups and users.');
            console.warn('error ->', data);
          }
          else
          {
            $scope.data = data;

            angular.forEach(data.groups, function (group, index)
            {
              $scope.groups = data.groups;

              $scope.group = data.groups[0];

              $scope.members = data.members[data.groups[0].uuid];

              $scope.current = data.groups[0].uuid;

              $scope.$watch($location.search(), function ()
              {
                $location.search({uuid: data.groups[0].uuid});
              }); // end of watch
            }); // end of foreach

            $rootScope.statusBar.off();
          };
        });
      };

    });
  };


  /**
   * Selection toggler
   */
  $scope.toggleSelection = function (group, master)
  {
    var flag = (master) ? true : false,
        members = angular.fromJson(Storage.get(group.uuid));

    angular.forEach(members, function (member, index)
    {
      $scope.selection[member.uuid] = flag;
    });
  };


  /**
   * Not used in groups yet but login uses modal call..
   * 
   * Fetch parent groups
   */
  $scope.fetchParent = function ()
  {
    Groups.parents()
    .then(function (result)
    {
      console.warn('parent -> ', result);
    });
  };

  /**
   * Not used in groups yet..
   * 
   * Fetch parent groups
   */
  $scope.fetchContainers = function (id)
  {
    Groups.containers(id)
    .then(function (result)
    {
      console.warn('containers -> ', result);
    });
  };


};


/**
 * Groups resolver
 */
groupsCtrl.resolve = {
  data: function (Groups) 
  {
    return Groups.query();
  }
};


groupsCtrl.$inject = ['$rootScope', '$scope', '$location', 'data', 'Groups', 'Profile', '$route', '$routeParams', 'Storage', 'Slots'];


/**
 * Groups modal
 */
WebPaige.
factory('Groups', function ($resource, $config, $q, $route, $timeout, Storage, $rootScope, Slots) 
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


  var Containers = $resource(
    $config.host + '/node/:id/container',
    {
    },
    {
      get: {
        method: 'GET',
        params: {id:''},
        isArray: true
      }
    }
  );


  var Parents = $resource(
    $config.host + '/parent',
    {
    },
    {
      get: {
        method: 'GET',
        params: {},
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
        params: {id:'', fields: '[role, latlong, latlong_final, settingsWebPaige]'},
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
   * Get parent group data
   */
  Groups.prototype.parents = function (all) 
  {   
    var deferred = $q.defer();

    Parents.get(
      null, 
      function (result) 
      {
        if (!all)
        {
          // console.warn('returned ===>', result.length);

          if (result.length == 0)
          {
            deferred.resolve(null);
          }
          else
          {
            deferred.resolve(result[0].uuid);
          }
        }
        else
        {
          deferred.resolve(result);
        }
      },
      function (error)
      {
        deferred.resolve({error: error});
      }
    );

    return deferred.promise;
  };


  /**
   * TODO
   * Extract only the groups which are in the local list
   * 
   * Get container (parent) group data
   */
  Groups.prototype.containers = function (id) 
  {   
    var deferred  = $q.defer(),
        cons      = [];

    Containers.get(
      {id: id}, 
      function (result) 
      {
        /**
         * Group save call returns only uuid and that is parsed as json
         * by angular, this is a fix for converting returned object to plain string
         */
        angular.forEach(result, function (_r, _i)
        {
          var returned = [];

          angular.forEach(_r, function (chr, i) { returned += chr });

          cons.push(returned);
        });
        
        deferred.resolve(cons);
      },
      function (error)
      {
        deferred.resolve({error: error});
      }
    );

    return deferred.promise;
  };


  /**
   * Add Member to a group
   */
  Groups.prototype.addMember = function (candidate)
  {
    var deferred = $q.defer();

    Members.add(
      { 
        id: candidate.group.uuid, 
        mid: candidate.id 
      }, 
      {}, 
      function (result) 
      {
        deferred.resolve(result);
      },
      function (error)
      {
        deferred.resolve({error: error});
      }
    );

    return deferred.promise;    
  };


  /**
   * Remove member from group
   */
  Groups.prototype.removeMember = function (memberId, groupId)
  {
    var deferred = $q.defer();

    Members.remove(
      { 
        id: groupId, 
        mid: memberId 
      }, 
      function (result) 
      {
        deferred.resolve(result);
      },
      function (error)
      {
        deferred.resolve({error: error});
      }
    );

    return deferred.promise;    
  };


  /**
   * Remove members from a group (bulk action)
   */
  Groups.prototype.removeMembers = function (selection, group)
  {
    var deferred = $q.defer(),
        calls = [];

    angular.forEach(selection, function (value, id)
    {
      if (id) calls.push(Groups.prototype.removeMember(id, group.uuid));
    });

    $q.all(calls)
    .then(function (result)
    {
      deferred.resolve(result);
    });

    return deferred.promise; 
  };


  Groups.prototype.wish = function (id)
  {
    var deferred  = $q.defer(),
        count     = 0;

    Slots.wishes({
      id: id,
      start:  255600,
      end:    860400
    }).then(function (results)
    {
      angular.forEach(results, function (slot, index)
      {
        if (slot.start == 255600 && slot.end == 860400 && slot.count != null) count = slot.count;
      });

      deferred.resolve({
        count: count
      });
    });

    return deferred.promise; 
  }


  /**
   * General query function from groups and their members
   */
  Groups.prototype.query = function (only)
  {
    var deferred = $q.defer();

    Groups.query(
      function (groups) 
      {
        Storage.add('groups', angular.toJson(groups));

        if (!only)
        {
          var calls = [];

          angular.forEach(groups, function (group, index)
          {
            calls.push(Groups.prototype.get(group.uuid));
          });

          $q.all(calls)
          .then(function (results)
          {
            Groups.prototype.uniqueMembers();

            var data = {};

            data.members = {};

            angular.forEach(groups, function (group, gindex)
            {
              data.groups = groups;

              data.members[group.uuid] = [];

              angular.forEach(results, function (result, mindex)
              {
                if (result.id == group.uuid) data.members[group.uuid] = result.data;
              });
            });

            deferred.resolve(data);
          });
        }
        else
        {
          deferred.resolve(groups);
        };
      },
      function (error)
      {
        deferred.resolve({error: error});
      }
    );

    return deferred.promise;
  };


  /**
   * Get group data
   */
  Groups.prototype.get = function (id) 
  {   
    var deferred = $q.defer();

    Members.query(
      {id: id}, 
      function (result) 
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

        Storage.add(id, angular.toJson(returned));

        deferred.resolve({
          id: id,
          data: returned
        });
      },
      function (error)
      {
        deferred.resolve({error: error});
      }
    );

    return deferred.promise;
  };


  /**
   * Make an inuque list of members
   */
  Groups.prototype.uniqueMembers = function ()
  {
    angular.forEach(angular.fromJson(Storage.get('groups')), function (group, index)
    {
      var members = angular.fromJson(Storage.get('members')) || {};

      angular.forEach(angular.fromJson(Storage.get(group.uuid)), function (member, index)
      {
        members[member.uuid] = member;
      });

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
      Groups.edit({id: group.id}, {name: group.name}, function (result) 
      {
        deferred.resolve(group.id);
      });
    }
    else
    {
      Groups.save(
        { id: $rootScope.app.resources.uuid }, 
        group, 
        function (result) 
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
        },
        function (error)
        {
          deferred.resolve({error: error});
        }
      ); 
    };

    return deferred.promise;
  };


  /**
   * Delete group
   */
  Groups.prototype.remove = function (id) 
  {
    var deferred = $q.defer();

    Groups.remove(
      {id: id}, 
      function (result) 
      {
        deferred.resolve(result);
      },
      function (error)
      {
        deferred.resolve({error: error});
      }
    );

    return deferred.promise;
  };


  /**
   * Search candidate mambers
   */
  Groups.prototype.search = function (query) 
  {
    var deferred = $q.defer();

    Groups.search(
      null, 
      {key: query}, 
      function (results) 
      {
        var processed = [];

        angular.forEach(results, function (result, index)
        {
          processed.push({
            id: result.id,
            name: result.name,
            groups: Groups.prototype.getMemberGroups(result.id)
          });
        });

        deferred.resolve(processed);
      },
      function (error)
      {
        deferred.resolve({error: error});
      }
    );

    return deferred.promise;
  };


  /**
   * Get groups of given member
   */
  Groups.prototype.getMemberGroups = function (id)
  {
    var groups = angular.fromJson(Storage.get('groups')),
        memberGroups = [];

    angular.forEach(groups, function (group, index)
    {
      var localGroup = angular.fromJson(Storage.get(group.uuid));

      angular.forEach(localGroup, function (member, index)
      {
        if (member.uuid === id)
          memberGroups.push({
            uuid: group.uuid,
            name: group.name
          });
      });
    });

    return memberGroups;
  };


  return new Groups;
});
'use strict';


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
  Groups.prototype.delete = function (id) 
  {
    var deferred = $q.defer();

    /**
     * Delete group
     */
    Groups.delete({id: id}, function (result) 
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
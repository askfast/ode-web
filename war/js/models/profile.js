'use strict';

WebPaige.
factory('Profile', function ($resource, $config, $q, $route, $md5, Storage, $rootScope, Groups, Slots) 
{

  /**
   * Profile resource
   */
  var Profile = $resource(
    $config.host + '/node/:id/:section',
    {
    },
    {
      get: {
        method: 'GET',
        params: {id: '', section: 'resource'}
      },
      save: {
        method: 'PUT',
        params: {section: 'resource'}
      },
      role: {
        method: 'PUT',
        params: {section: 'role'}
      }
    }
  );


  /**
   * Register resource
   */
  var Register = $resource(
    $config.host + '/register',
    {
      direct: 'true',
      module: 'default'
    },
    {
      profile: {
        method: 'GET',
        params: {uuid: '', pass: '', name: '', phone: ''}
      }
    }
  );


  /**
   * Resources resource
   */
  var Resources = $resource(
    $config.host + '/resources',
    {
    },
    {
      get: {
        method: 'GET',
        params: {}
      },
      save: {
        method: 'POST',
        params: {
          /**
           * It seems like backend accepts data in request payload as body as well
           */
          //tags: ''
        }
      }
    }
  );


  /**
   * Change password for user
   */
  Profile.prototype.register = function (profile) 
  {    
    var deferred = $q.defer();

    /**
     * Register user
     */
    Register.profile({
      uuid: profile.username,
      pass: $md5.process(profile.password),
      name: profile.name,
      phone: profile.PhoneAddress
    }, function (registered) 
    {
      console.log('registered ->', registered);
      
      /**
       * Give user a role
       */
      Profile.prototype.role(profile.username, profile.role.id)
      .then(function(roled)
      {
        /**
         * Add missing resources to the account of user
         */
        Profile.prototype.save(profile.username, {
          EmailAddress: profile.EmailAddress,
          PostAddress: profile.PostAddress,
          PostZip: profile.PostZip,
          PostCity: profile.PostCity
        }).then(function(resourced)
        {
          /**
           * Add user to given groups
           */
          var calls = [];
          /**
           * Push selection into a calls pool
           */
          angular.forEach(profile.groups, function(group, index)
          {
            calls.push(Groups.addMember({
              id: profile.username,
              group: group
            }));
          });
          /**
           * Loop through and make calls
           */
          $q.all(calls)
          .then(function(grouped)
          {
            deferred.resolve({
              registered: registered,
              roled: roled,
              resourced: resourced,
              grouped: grouped
            });
          });
        });
      });
    });
   
    return deferred.promise;
  };


  /**
   * Set role of given user
   */
  Profile.prototype.role = function (id, role) 
  {    
    var deferred = $q.defer();
    /**
     * Set role
     */
    Profile.role({id: id}, role, function (result) 
    {
      deferred.resolve(result);
    });

    return deferred.promise;
  };


  /**
   * Change password for user
   */
  Profile.prototype.changePassword = function (passwords) 
  {    
    var deferred = $q.defer();
    /**
     * Change passwords
     */
    Resources.save(null, {
      askPass: $md5.process(passwords.new1)
    }, function (result) 
    {
      deferred.resolve(result);
    });

    return deferred.promise;
  };


  /**
   * Get profile of given user
   */
  Profile.prototype.get = function (id, localize) 
  {    
    var deferred = $q.defer();
    /**
     * Get profile data
     */
    Profile.get({id: id}, function (result) 
    {
      /**
       * If localize is true save it to localStorage
       */
      if (localize)
      {
        Storage.add('resources', angular.toJson(result));
      };
      /**
       * Return promised
       */
      deferred.resolve({
        resources: result
      });
    });

    return deferred.promise;
  };


  /**
   * Get profile of given user with slots
   */
  Profile.prototype.getWithSlots = function (id, localize, params) 
  {
    var deferred = $q.defer();

    /**
     * Get profile data
     */
    Profile.prototype.get(id, localize)
    .then(function (resources)
    {
      /**
       * Get user slots
       */
      Slots.user({
        user: id,
        start: params.start,
        end: params.end
      }).then(function (slots)
      {
        /**
         * Return promised baby!
         * Extend resources with slots
         */
        deferred.resolve(angular.extend(resources, {
          slots: slots,
          synced: new Date().getTime()
        }));        
      });
    });

    return deferred.promise;
  };


  /**
   * Get user slots
   */
  Profile.prototype.getSlots = function (id, params) 
  {
    var deferred = $q.defer();

    /**
     * Get user slots
     */
    Slots.user({
      user: id,
      start: params.start / 1000,
      end: params.end / 1000
    }).then(function (slots)
    {
      /**
       * Return promised baby!
       * Extend resources with slots
       */
      deferred.resolve({
        slots: slots,
        synced: new Date().getTime()
      });        
    });

    return deferred.promise;
  };


  /**
   * Get local resource data
   */
  Profile.prototype.local = function()
  {
    return angular.fromJson(Storage.get('resources'));
  };


  /**
   * Save profile
   */
  Profile.prototype.save = function (id, resources) 
  {
    var deferred = $q.defer();

    /**
     * Save profile data
     */
    Profile.save({id: id}, resources, function(result) 
    {
      /**
       * Return result
       */
      deferred.resolve(result);
    });
    /**
     * Return promise
     */
    return deferred.promise;
  };





  /**
   * Create settings resources for user if it is missing
   */
  Profile.prototype.createSettings_ = function (id) 
  {    
    var deferred = $q.defer();
        // /**
        //  * WebPaige settings defaults
        //  */
        // defaults = {
        //   settingsWebPaige: {
        //     lang: 'nl'
        //   }
        // };

    /**
     * Get profile data
     */
    Profile.prototype.get(id, false)
    .then(function (result) 
    {
      console.log('result ->', result.resources.uuid, 'settings ->', $config.defaults.settingsWebPaige);

      /**
       * If user has no default settings give settings
       */
      if (result.settingsWebPaige == undefined || result.settingsWebPaige == null)
      {
        Profile.save({id: result.resources.uuid}, angular.toJson({
          settingsWebPaige: $config.defaults.settingsWebPaige
        }), function(result)
        {
          /**
           * Return promised
           */
          deferred.resolve({
            status: 'modified',
            resources: result
          });
        })
      }
      else
      {
        /**
         * Return promised
         */
        deferred.resolve({
          status: 'full',
          resources: result
        });
      }

    });

    return deferred.promise;
  };



  return new Profile;
});
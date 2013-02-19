'use strict';

WebPaige.
factory('Profile', function ($resource, $config, $q, $route, $md5, Storage, $rootScope) 
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

    console.warn('register user ->', profile);

    /**
     * Register user
     */
    Register.profile({
      uuid: profile.username,
      pass: $md5.process(profile.password),
      name: profile.name,
      phone: profile.PhoneAddress
    }, {}, function (result) 
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
      deferred.resolve(result);
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



  return new Profile;
});
'use strict';

WebPaige.
factory('Profile', function ($resource, $config, $q, $route, $timeout, Storage, $rootScope) 
{

  /**
   * TODO
   * lose route parameter later on from here
   * 
   * Profile resource
   */
  var Profile = $resource(
    $config.host + '/node/:user/resource',
    {
      user: $route.current.params.userId
    },
    {
      get: {
        method: 'GET',
        params: {}
      },
      save: {
        method: 'PUT',
        params: {}
      }
    }
  );


  /**
   * Get profile of given user
   */
  Profile.prototype.get = function (localize) 
  {    
    var deferred = $q.defer(), 
        localProfile = Storage.get('resources');
    /**
     * Get profile data
     */
    Profile.get(function (result) 
    {
      /**
       * No profile found with that given user id
       */
      if (angular.equals(result, [])) 
      {
        deferred.reject("There is no record!");
      }
      else 
      {
        /**
         * If localize is true save it to localStorage
         */
        if (localize)
        {
          Storage.add('resources', angular.toJson(result));
        };
        deferred.resolve(result);
      }
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
  Profile.prototype.save = function (resources) 
  {    
    /**
     * Local resources
     */
    var localResources = angular.fromJson(Storage.get('resources'));

    /**
     * Set values
     */
    localResources['name'] = resources.name;
    localResources['EmailAddress'] = resources.EmailAddress;
    localResources['PhoneAddress'] = resources.PhoneAddress;
    localResources['PostAddress'] = resources.PostAddress;
    localResources['PostZip'] = resources.PostZip;
    localResources['PostCity'] = resources.PostCity;

    /**
     * Add to storage
     */
    Storage.add('slots', angular.toJson(localResources));

    // $rootScope.notify( { message: 'Profile saved in localStorage.' } );

    Profile.save(null, resources, function()
    {
      // $rootScope.notify( { message: 'Profile saved in back-end.' } );
    });
  };



  return new Profile;
});
'use strict';

WebPaige.
factory('Settings', function ($resource, $config, $q, $route, $timeout, Storage, $rootScope, Profile) 
{

  /**
   * Define an empty resource for settings
   */
  var Settings = $resource();


  /**
   * Get local settings data
   */
  Settings.prototype.local = function ()
  {
    return angular.fromJson(Storage.get('resources')).settingsWebPaige || {};
    // return angular.fromJson(Storage.get('resources'));
  };


  /**
   * Get settings from localStorage
   */
  Settings.prototype.get = function ()
  {
    return angular.fromJson(Storage.get('resources')).settingsWebPaige || {};
  };


  /**
   * Save settings
   */
  Settings.prototype.save = function (id, settings) 
  {
    var deferred = $q.defer();
    /**
     * Save settings
     */
    Profile.save(id, {
      settingsWebPaige: angular.toJson(settings)
    })
    .then(function(result)
    {
      /**
       * Return promised
       */
      deferred.resolve({
        saved: true
      });
    });
    return deferred.promise;
  };






  /**
   * DASHBOARD
   * 
   * Settings builder for users missing settings resource
   */
  Settings.prototype.buildSettingsForUsers = function ()
  {
    var deferred = $q.defer(),
        calls = [];

    /**
     * Push selection into a calls pool
     */
    angular.forEach(demo_users, function(user, index)
    {
      if (user.uuid)
      {
        calls.push(Profile.createSettings(user.uuid));
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
  }
  // buildSettingsForUsers :: Dashboard


  return new Settings;
});

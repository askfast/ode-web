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
  Settings.prototype.local = function()
  {
    return angular.fromJson(Storage.get('resources')).settingsWebPaige || {};
    // return angular.fromJson(Storage.get('resources'));
  };


  return new Settings;
});

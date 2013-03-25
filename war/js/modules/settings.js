'use strict';


/**
 * Settings Controller
 */
function settingsCtrl ($rootScope, $scope, $config, data, Settings, Profile)
{
	/**
	 * Fix styles
	 */
	$rootScope.fixStyles();


	/**
	 * Check whether settings has been defined 
   * for the user otherwise display a message
	 */
  if (!angular.equals({}, data))
  {
    $scope.settings = angular.fromJson(data);
  }
  else
  {
    /**
     * Set selected user language
     */
    $scope.settings = {
      user: {
        language: $rootScope.ui.meta.name
      }
    };
  }


  /**
   * User settings: Languages
   */
  var languages = {};
  angular.forEach(ui, function(lang, index)
  {
    languages[lang.meta.name] = lang.meta.label;
  });
  $scope.languages = languages;



  /**
   * Save user settings
   */
  $scope.save = function (settings)
  {
    /**
     * Set preloader
     */
    $rootScope.loading = {
      status: true,
      message: $rootScope.ui.settings.saving
    };
    /**
     * Save settings
     */
    Settings.save($rootScope.app.resources.uuid, settings)
    .then(function(saved)
    {
      /**
       * Inform user
       */
      $rootScope.notify({
        status: true,
        type: 'alert-success',
        message: $rootScope.ui.settings.saved
      });
      /**
       * Set preloader
       */
      $rootScope.loading = {
        status: true,
        message: $rootScope.ui.settings.refreshing
      };
      /**
       * Refresh profile data
       */
      Profile.get($rootScope.app.resources.uuid, true)
      .then(function(result)
      {
        /**
         * Set view
         */
        $scope.settings = angular.fromJson(result.resources.settingsWebPaige);
        /**
         * Change language
         */
        $rootScope.changeLanguage(angular.fromJson(result.resources.settingsWebPaige).user.language);
        /**
         * Turn off preloader
         */
        $rootScope.loading = {
          status: false
        };
      })
    });
  };






  /**
   * DASHBOARD
   * 
   * Build settings
   */
  $scope.buildSettingsForUsers = function ()
  {
  	Settings.buildSettingsForUsers()
  	.then(function(results)
  	{
  		// console.log('results ->', results);
  	});
  }
  // buildSettingsForUsers :: Dashboard

};


/** 
 * Settings resolver
 */
settingsCtrl.resolve = {
  data: function ($rootScope, $config, Settings) 
  {
  	return angular.fromJson(Settings.get());
  }
};


settingsCtrl.$inject = ['$rootScope', '$scope', '$config', 'data', 'Settings', 'Profile'];


'use strict';

WebPaige.
factory('Settings', function ($resource, $config, $q, $route, $timeout, Storage, $rootScope, Profile) 
{

  /**
   * Define an empty resource for settings
   */
  var Settings = $resource();


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

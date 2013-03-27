'use strict';


/**
 * Settings Controller
 */
function settingsCtrl ($rootScope, $scope, data, Settings, Profile)
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
    $scope.settings = {
      user: {
        language: $rootScope.ui.meta.name
      }
    };
  };


  /**
   * User settings: Languages
   */
  var languages = {};

  angular.forEach(ui, function (lang, index) { languages[lang.meta.name] = lang.meta.label; });

  $scope.languages = languages;



  /**
   * Save user settings
   */
  $scope.save = function (settings)
  {
    $rootScope.statusBar.display($rootScope.ui.settings.saving);

    Settings.save($rootScope.app.resources.uuid, settings)
    .then(function (saved)
    {
      $rootScope.notifier.success($rootScope.ui.settings.saved);

      $rootScope.statusBar.display($rootScope.ui.settings.refreshing);

      Profile.get($rootScope.app.resources.uuid, true)
      .then(function(result)
      {
        $scope.settings = angular.fromJson(result.resources.settingsWebPaige);

        $rootScope.changeLanguage(angular.fromJson(result.resources.settingsWebPaige).user.language);

        $rootScope.statusBar.off();
      })
    });
  };

};


/** 
 * Settings resolver
 */
settingsCtrl.resolve = {
  data: function (Settings) 
  {
  	return angular.fromJson(Settings.get());
  }
};


settingsCtrl.$inject = ['$rootScope', '$scope', 'data', 'Settings', 'Profile'];


/**
 * Settings module
 */
WebPaige.
factory('Settings', function ($rootScope, $config, $resource, $q, Storage, Profile) 
{
  /**
   * Define settings resource
   * In this case it empty :)
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

    Profile.save(id, {
      settingsWebPaige: angular.toJson(settings)
    })
    .then(function(result)
    {
      deferred.resolve({
        saved: true
      });
    });

    return deferred.promise;
  };


  return new Settings;
});
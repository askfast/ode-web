'use strict';


/**
 * Settings Controller
 */
function settingsCtrl($rootScope, $scope, $config, data, Settings, Profile)
{
	/**
	 * Fix styles
	 */
	$rootScope.fixStyles();


	/**
	 * Check whether settings has been defined for the user otherwise display a message
	 */
  if (!angular.equals({}, data))
  {
    $scope.settings = angular.fromJson(data);
  }
  else
  {
    /**
     * TODO
     * Give user the ability to select a language in login window
     * after getting resources look for language settings and change
     * it accordingly
     * 
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
      /**
       * TODO
       * Move to local
       */
      message: 'Saving settings!'
    };
    /**
     * Save settings
     */
    Settings.save($rootScope.app.resources.uuid, settings)
    .then(function(saved)
    {
      console.log('result save ->', saved);

      /**
       * Inform user
       */
      $rootScope.notify({
        status: true,
        type: 'alert-success',
        /**
         * TODO
         * Move to local
         */
        message: 'Settings saved!'
      });

      /**
       * Set preloader
       */
      $rootScope.loading = {
        status: true,
        /**
         * TODO
         * Move to local
         */
        message: 'Refreshing profile data!'
      };
        
      Profile.get($rootScope.app.resources.uuid, true)
      .then(function(result)
      {
        console.warn('returned resources ->', result.resources);

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
 * TODO
 * Is it really needed because settings is already
 * fetched in the beginning with resources?
 *
 * Maybe only grabbing from localhost??
 * 
 * Settings resolver
 */
settingsCtrl.resolve = {
  data: function ($rootScope, $config, Settings) 
  {
  	return Settings.get();
  }
};


settingsCtrl.$inject = ['$rootScope', '$scope', '$config', 'data', 'Settings', 'Profile'];
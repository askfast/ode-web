'use strict';


/**
 * Settings Controller
 */
function settingsCtrl($rootScope, $scope, $config, data, Settings)
{
	/**
	 * Fix styles
	 */
	$rootScope.fixStyles();


	/**
	 * Check whether settings has been defined for the user otherwise display a message
	 */
	$scope.data = data;
	console.warn('data ->', angular.equals({}, data));


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
   * Build settings
   */
  $scope.build = function ()
  {
  	return {
	  	settings: function ()
	  	{
	  		angular.forEach(demo_users, function (user, index)
	  		{
		  		console.log('-> ', user.name)
		  	});
	  	}
  	}
  }

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
  	return Settings.local();
  }
};


settingsCtrl.$inject = ['$rootScope', '$scope', '$config', 'data', 'Settings'];
'use strict';


/**
 * Settings Controller
 */
function settingsCtrl($rootScope, $scope, $config)
{
	/**
	 * Attempt to fix tab height for user settings tab
	 */
	$rootScope.fixTabHeight('userSettingsTab');


};


/**
 * Settings resolver
 */
settingsCtrl.resolve = {
  settings: function ($rootScope, $config) 
  {
  }
};


settingsCtrl.$inject = ['$rootScope', '$scope', '$config'];
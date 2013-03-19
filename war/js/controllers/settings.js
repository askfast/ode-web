'use strict';


/**
 * Settings Controller
 */
function settingsCtrl($rootScope, $scope, $config)
{
	/**
	 * Fix styles
	 */
	$rootScope.fixStyles();

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
'use strict';


/**
 * Settings Controller
 */
function settingsCtrl($rootScope, $scope)
{
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


settingsCtrl.$inject = ['$rootScope', '$scope'];
'use strict';


/**
 * Dashboard Controller
 */
function dashboardCtrl($scope, $rootScope, data)
{
	$scope.messages = data;
};


/**
 * Dashboard resolver
 */
dashboardCtrl.resolve = {
  data: function ($rootScope, $config, Messages) 
  {
  	return Messages.unread();
  }
}


dashboardCtrl.$inject = ['$scope', '$rootScope', 'data'];
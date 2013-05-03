/*jslint node: true */
/*global angular */
'use strict';


angular.module('WebPaige.Controllers.Help', [])


/**
 * Help controller
 */
.controller('help',
[
	'$rootScope', '$scope',
	function ($rootScope, $scope)
	{
		/**
		 * Fix styles
		 */
		$rootScope.fixStyles();
	}
]);
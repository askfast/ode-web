/*jslint node: true */
/*global angular */
'use strict';


angular.module('WebPaige.Controllers.Scheaduler', [])


/**
 * Scheadule controller
 */
.controller('scheaduler', 
[
	'$scope', '$rootScope', '$q', '$location', '$route', 'Messages', 'Storage', 'Timer',
	function ($scope, $rootScope, $q, $location, $route, Messages, Storage, Timer) 
	{
    /**
     * Add a new offset
     */
    $scope.addNewOffset = function ()
    {
    	if ($scope.offsets[0])
    	{
	  		var hour    = 1000 * 60 * 60,
		        minute  = 1000 * 60,
		        time 		= $scope.offsets[0].time.split(':'),
		        exact 	= (time[0] * hour) + (time[1] * minute);

		   	$scope.offsets[exact] = $scope.offsets[0];

		   	$scope.offsets[exact].exact = exact;
    	}

    	$scope.offsets[0] = {
        mon: 		true,
        tue: 		false,
        wed: 		false,
        thu: 		false,
        fri: 		false,
        sat: 		false,
        sun: 		false,
	      hour: 	0,
	      minute: 0,
	      time: 	'00:00',
	      exact: 	0
    	};

    	$scope.scheaduleCount();
    };


  	/**
  	 * Remove a scheadule
  	 */
  	$scope.remover = function (key)
  	{
  		delete $scope.offsets[key];

  		$scope.scheaduleCount();
  	};


  	/**
  	 * Count the scheadules
  	 */
  	$scope.scheaduleCount = function ()
  	{
  		var count = 0;

  		angular.forEach($scope.offsets, function (offset, index) { count++; });

	  	$scope.scheaduleCount = count;
  	}
		
		$scope.scheaduleCount();

		/**
		 * Watch offsets
		 */
		$scope.$watch(function ()
		{
  		angular.forEach($scope.offsets, function (offset, index)
	  	{
				/**
				 * If all the days are unchecked make monday checked as default
				 */
	  		if (offset.mon == false && 
	  				offset.tue == false && 
	  				offset.wed == false && 
	  				offset.thu == false && 
	  				offset.fri == false && 
	  				offset.sat == false && 
	  				offset.sun == false)
	  		{
	  			offset.mon = true;
	  		}

	  		var hour    = 1000 * 60 * 60,
		        minute  = 1000 * 60,
		        time 		= offset.time.split(':'),
		        exact 	= (time[0] * hour) + (time[1] * minute);

	  		if (time[0] != offset.hour) offset.hour = time[0];
	  		if (time[1] != offset.minute) offset.minute = time[1];

	  		if (offset.exact != exact) { offset.exact = exact; }

	  	});
		});
	}
]);
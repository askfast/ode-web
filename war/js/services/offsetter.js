/*jslint node: true */
/*global angular */
'use strict';


angular.module('WebPaige.Services.Offsetter', ['ngResource'])


/**
 * Offsetter Service
 */
.factory('Offsetter', 
[
  '$rootScope', 
  function ($rootScope)
  {
    var constructor = {
	    factory: function (data)
	    {
		    var offsets = [];

		    angular.forEach(data, function (offset, index)
		  	{
		  		var max     = 1000 * 60 * 60 * 24 * 7,
			        day     = 1000 * 60 * 60 * 24,
			        hour    = 1000 * 60 * 60,
			        minute  = 1000 * 60,
			        days    = 0,
			        hours   = 0,
			        minutes = 0,
			        stamp   = offset * 1000,
			        hours   = offset % day,
			        days    = offset - hours,
			        minutes = offset % hour,
			        total   = {
			          days:     Math.floor(days / day),
			          hours:    Math.floor(hours / hour),
			          minutes:  Math.floor(minutes / minute)
			        },
			        offset_tmp;

			    offset_tmp = {
			    	value: offset,
			    	exact: offset % day,
		        mon: false,
		        tue: false,
		        wed: false,
		        thu: false,
		        fri: false,
		        sat: false,
		        sun: false,
			      hour: 	total.hours,
			      minute: total.minutes
			    };

		      if (total.hours < 10) total.hours = '0' + total.hours;
		      if (total.minutes < 10) total.minutes = '0' + total.minutes;

		      offset_tmp.time = total.hours + ':' + total.minutes;

			    switch (total.days)
			    {
			      case 0:   offset_tmp.mon = true;   break;
			      case 1:   offset_tmp.tue = true;   break;
			      case 2:   offset_tmp.wed = true;   break;
			      case 3:   offset_tmp.thu = true;   break;
			      case 4:   offset_tmp.fri = true;   break;
			      case 5:   offset_tmp.sat = true;   break;
			      case 6:   offset_tmp.sun = true;   break;
			    }

			    offsets.push(offset_tmp);
		  	});


		  	var noffs = {};

		  	angular.forEach(offsets, function (offset, index)
		  	{
		  		noffs[offset.exact] = noffs[offset.exact] || {};

		  		noffs[offset.exact].hour 		=	offset.hour;
		  		noffs[offset.exact].minute 	= offset.minute;
		  		noffs[offset.exact].time 		= offset.time;

		  		noffs[offset.exact].exact 	= offset.exact;

		  		noffs[offset.exact].mon 		= (noffs[offset.exact].mon) ? noffs[offset.exact].mon : offset.mon;
		  		noffs[offset.exact].tue 		= (noffs[offset.exact].tue) ? noffs[offset.exact].tue : offset.tue;
		  		noffs[offset.exact].wed 		= (noffs[offset.exact].wed) ? noffs[offset.exact].wed : offset.wed;
		  		noffs[offset.exact].thu 		= (noffs[offset.exact].thu) ? noffs[offset.exact].thu : offset.thu;
		  		noffs[offset.exact].fri 		= (noffs[offset.exact].fri) ? noffs[offset.exact].fri : offset.fri;
		  		noffs[offset.exact].sat 		= (noffs[offset.exact].sat) ? noffs[offset.exact].sat : offset.sat;
		  		noffs[offset.exact].sun 		= (noffs[offset.exact].sun) ? noffs[offset.exact].sun : offset.sun;

		  	});

		  	// console.log('produced offsets -->', noffs);

		  	return noffs;    	
	    }
	  };

	  return {
	  	factory: constructor.factory
	  }
  }
]);
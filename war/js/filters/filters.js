'use strict';

/* Filters */
angular.module('WebPaige.filters', [])


/**
 * Translate roles
 */
.filter('translateRole', function()
{
	return function (role)
	{
		switch (role)
		{
			case '1':
				return 'Planner';
			break;
			case '2':
			    return 'Schipper';
			break;
			case '3':
				return 'Opstapper';
			break;
		};
	}
})


/**
 * Main range filter
 */
.filter('rangeMainFilter', ['Dater', 'Storage', function (Dater, Storage)
{
	/**
	 * Get periods
	 */
	var periods = Dater.getPeriods();
	/**
	 * Return constructor
	 */
	return function (dates)
	{
		/**
		 * Does this work always?
		 * Time will tell :]
		 * One milisecond fix
		 */
		if ((new Date(dates.end).getTime() - new Date(dates.start).getTime()) == 86401000)
		{
			dates.start = new Date(dates.end).addDays(-1);
		};
		/**
		 * Process the variables
		 */
		var dates = {
			start: {
				real: new Date(dates.start).toString('dddd, MMMM d'),
				month: new Date(dates.start).toString('MMMM'),
				day: new Date(dates.start).toString('d')
			},
			end: {
				real: new Date(dates.end).toString('dddd, MMMM d'),
				month: new Date(dates.end).toString('MMMM'),
				day: new Date(dates.end).toString('d')
			}
		};
		/**
		 * Get the current month
		 */
		var monthNumber = Date.getMonthNumberFromName(dates.start.month);
		/**
		 * if a day is selected
		 */
		if ((((Math.round(dates.start.day) + 1) == dates.end.day && 
						dates.start.hour == dates.end.hour) || 
						dates.start.day == dates.end.day) && 
						dates.start.month == dates.end.month)
		{
			return 	dates.start.real + 
							', ' + 
							Dater.getThisYear();
		}
		/**
		 * if a month selected
		 */
		else if(dates.start.day == 1 && 
						dates.end.day == periods.months[monthNumber + 1].totalDays)
		{
			/**
			 * Return values
			 */
			return 	dates.start.month + 
							', ' + 
							Dater.getThisYear();
		}
		/**
		 * if a week or any other range is selected
		 */
		else
		{
			/**
			 * Return values
			 */
			return 	dates.start.real + 
							' / ' + 
							dates.end.real + 
							', ' + 
							Dater.getThisYear();
		};

	}
}])


/**
 * Main range week filter
 */
.filter('rangeMainWeekFilter', ['Dater', 'Storage', function (Dater, Storage)
{
	/**
	 * Get periods
	 */
	var periods = Dater.getPeriods();
	/**
	 * Return constructor
	 */
	return function (dates)
	{
		/**
		 * This is needed because view is loaded even there
		 * is an another tab active, if no checks made, console
		 * will throw errors
		 */
		if (dates)
		{
			/**
			 * Process the variables
			 */
			var dates = {
				start: new Date(dates.start).toString('dddd, MMMM d'),
				end: new Date(dates.end).toString('dddd, MMMM d')
			};
			/**
			 * Return values
			 */
			return 	dates.start + 
							' / ' + 
							dates.end + 
							', ' + 
							Dater.getThisYear();
		};
	}
}])


/**
 * Range info filter
 */
.filter('rangeInfoFilter', ['Dater', 'Storage', function (Dater, Storage)
{
	/**
	 * Get periods
	 */
	var periods = Dater.getPeriods();
	/**
	 * Return values
	 */
	return function (timeline)
	{
		/**
		 * Calculate difference
		 */
		var diff = new Date(timeline.range.end).getTime() - new Date(timeline.range.start).getTime();
		/**
		 * Custom range is more than 4 weeks
		 * show total days
		 */
		if (diff > (2419200000 + 259200000))
		{
			return 'Total selected days: ' + Math.round(diff / 86400000);
		}
		else
		{
			/**
			 * Day
			 */
			if (timeline.scope.day)
			{
				/**
				 * Process hours
				 */
				var hours = {
					start: new Date(timeline.range.start).toString('HH:mm'),
					end: new Date(timeline.range.end).toString('HH:mm')
				};
				/**
				 *  00:00 fix => 24:00
				 */
				if (hours.end == '00:00')
				{
					hours.end = '24:00';
				};
				/**
				 * Returns values
				 */
				return 	'Time: ' + 
								hours.start + 
								' / ' + 
								hours.end;
			}
			/**
			 * Week
			 */
			else if (timeline.scope.week)
			{
				return 	'Week number: ' + 
								timeline.current.week;
			}
			/**
			 * Month
			 */
			else if (timeline.scope.month)
			{
				return 	'Month number: ' + 
								timeline.current.month + 
								', Total days: ' + 
								periods.months[timeline.current.month].totalDays;
			};
		};
	};
}])


/**
 * Range info week filter
 */
.filter('rangeInfoWeekFilter', ['Dater', 'Storage', function (Dater, Storage)
{
	/**
	 * Get periods
	 */
	var periods = Dater.getPeriods();
	/**
	 * Return values
	 */
	return function (timeline)
	{
		/**
		 * This is needed because view is loaded even there
		 * is an another tab active, if no checks made, console
		 * will throw errors
		 */
		if (timeline)
		{
			return 'Week number: ' + timeline.current.week;
		};
	};
}])


/**
 * Convert timeStamp to readable date and time
 */
.filter('convertTimeStamp', function()
{
	return function (stamp)
	{
		return Date(stamp).toString('dd-M-yyyy HH:mm');
	};
})


/**
 * BUG!
 * Maybe not replace bar- ?
 * 
 * TODO
 * Implement state conversion from config later on!
 * 
 * Convert ratios to readable formats
 */
.filter('convertRatios', ['$config', function($config)
{
	return function (stats)
	{
		var ratios = '';
		angular.forEach(stats, function(stat, index)
		{
			ratios += stat.ratio.toFixed(1) + '% ' + stat.state.replace(/^bar-+/, '') + ', ';
		})
		return ratios.substring(0, ratios.length - 2);
	};
}])


/** 
 * Calculate time in days
 */
.filter('calculateTimeInDays', function()
{
	return function (stamp)
	{
		var day 		= 1000 * 60 * 60 * 24,
				hour		=	1000 * 60 * 60,
				days 		= 0,
				hours 	= 0,
				stamp 	= stamp * 1000;
		/**
		 * Calculate durations
		 */
		var hours 	= stamp % day;
		var days 		= stamp - hours;
		/**
		 * Return
		 */
		return 	Math.floor(days / day);
	};
})


/**
 * Calculate time in hours
 */
.filter('calculateTimeInHours', function()
{
	return function (stamp)
	{
		var day 		= 1000 * 60 * 60 * 24,
				hour		=	1000 * 60 * 60,
				days 		= 0,
				hours 	= 0,
				stamp 	= stamp * 1000;
		/**
		 * Calculate durations
		 */
		var hours 	= stamp % day;
		var days 		= stamp - hours;
		/**
		 * Return
		 */
		return 	Math.floor(hours / hour);
	};
})


/**
 * Calculate time in minutes
 */
.filter('calculateTimeInMinutes', function()
{
	return function (stamp)
	{
		var day 		= 1000 * 60 * 60 * 24,
				hour		=	1000 * 60 * 60,
				minute 	= 1000 * 60,
				days 		= 0,
				hours 	= 0,
				minutes = 0,
				stamp 	= stamp * 1000;
		/**
		 * Calculate durations
		 */
		var hours 	= stamp % day;
		var days 		= stamp - hours;
		var minutes = stamp % hour;
		/**
		 * Return
		 */
		return 	Math.floor(minutes / minute);
	};
})


/**
 * Convert eve urls to ids
 */
.filter('convertEve', function()
{
  return function (url)
  {
  	var eve = url;
  	if (typeof url != "undefined")
  	{
  		eve = url.split("/");
  	}
  	else
  	{
  		eve = ["",url,""];
  	}
    return eve[eve.length-2];
  };
})


/** 
 * Convert user uuid to name
 */
.filter('convertUserIdToName', ['Storage', function(Storage)
{
	var members = angular.fromJson(Storage.get('members'));
	return function (id)
	{	
    if (members == null || typeof members[id] == "undefined")
    {
      return id;
    }
    else
    {
      return members[id].name;
    };
	};
}])


/**
 * Convert timeStamps to dates
 */
.filter('nicelyDate', ['Dater', function(Dater)
{
 	return function (date)
 	{
 	  var cov_date = Dater.readableDate(date);
 		if (cov_date == "Invalid Date")
 		{
	    /**
	     * Could be unix time stamp
	     */
	    date = Math.round(date);
 		};
 		return new Date(date).toString('dd-MM-yyyy HH:mm');
 	};
}])
 

/**
 * No title filter
 */
.filter('noTitle',function()
{
	return function (title)
	{
		if (title == "")
		{
			return "- No Title -";
		}
		else
		{
			return title;
		}
	}
})


/**
 * TODO
 * Finish it!
 * 
 * Strip span tags
 */
.filter('stripSpan', function()
{
  return function (string)
  {
    return string.match(/<span class="label">(.*)<\/span>/);
  }
})


/**
 * Strip html tags
 */
.filter('stripHtml', function()
{
  return function (string)
  {
  	if (string)
  	{
    	return string.split('>')[1].split('<')[0];
  	};
  }
})


/**
 * Convert group id to name
 */
.filter('groupIdToName', ['Storage', function (Storage)
{
  return function(id)
  {
  	var groups = angular.fromJson(Storage.get('groups'));
  	for (var i in groups)
  	{
  		if (groups[i].uuid == id)
  		{
  			return groups[i].name;
  		};	
  	};
  }
}])

.filter('i18n_spec',['$rootScope', function ($rootScope)
{
	return function (string, type)
	{
		
		var types = type.split(".");
		var ret = $rootScope.ui[types[0]][types[1]];
		ret = ret.replace('$v',string);
		
		return ret;
	}
}])


/**
 * Truncate group titles for dashboard pie widget
 */
.filter('truncateGroupTitle', ['Strings', function (Strings) 
{
	return function (title)
	{
     return Strings.truncate(title, 20, true);
  }
}]);





 

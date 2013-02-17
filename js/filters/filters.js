'use strict';

/* Filters */
angular.module('WebPaige.filters', [])
/**
 * Translate roles
 */
.filter('translateRole', function()
{
	return function(role)
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
		}
	}
})
/**
 * Main range filter
 */
.filter('rangeMainFilter', ['Dater', 'Storage', function(Dater, Storage)
{
	/**
	 * Get periods
	 */
	var periods = Dater.getPeriods();
	/**
	 * Return constructor
	 */
	return function(dates)
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
 * Range info filter
 */
.filter('rangeInfoFilter', ['Dater', 'Storage', function(Dater, Storage)
{
	/**
	 * Get periods
	 */
	var periods = Dater.getPeriods();
	/**
	 * Return values
	 */
	return function(timeline)
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
 * Convert timeStamp to readable date and time
 */
.filter('convertTimeStamp', function()
{
	return function(stamp)
	{
		return Date(stamp).toString('dd-M-yyyy HH:mm');
	};
})

/**
 * TODO
 * Implement state conversion from config later on!
 * 
 * Convert ratios to readable formats
 */
.filter('convertRatios', ['$config', function($config)
{
	return function(stats)
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
 * Convert user uuid to name
 */
.filter('convertUserIdToName', ['Storage', function(Storage)
{
	var members = angular.fromJson(Storage.get('members'));
	return function(id)
	{
		return members[id].name;
	};
}])





.filter('eveURL2Id', function()
{
    return function(url)
    {
        var uuidArray = url.split("/");
        var uuid = uuidArray[uuidArray.length-2];
        return uuid;
    }
})

.filter('nicelyDate', ['Dater', function(Dater)
{
	return function(date)
	{
	    var cov_date = Dater.readableDate(date);
		if(cov_date == "Invalid Date"){
		    // could be unix time stamp 
		    date =  Math.round(date);
		}
		return new Date(date).toString('dddd MMMM d, yyyy');
	}
}])






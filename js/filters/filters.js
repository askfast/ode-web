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
		if ((new Date(dates.till).getTime() - new Date(dates.from).getTime()) == 86401000)
		{
			dates.from = new Date(dates.till).addDays(-1);
		};
		/**
		 * Process the variables
		 */
		var dates = {
			from: {
				real: new Date(dates.from).toString('dddd, MMMM d'),
				month: new Date(dates.from).toString('MMMM'),
				day: new Date(dates.from).toString('d')
			},
			till: {
				real: new Date(dates.till).toString('dddd, MMMM d'),
				month: new Date(dates.till).toString('MMMM'),
				day: new Date(dates.till).toString('d')
			}
		};
		/**
		 * Get the current month
		 */
		var monthNumber = Date.getMonthNumberFromName(dates.from.month);
		/**
		 * if a day is selected
		 */
		if ((((Math.round(dates.from.day) + 1) == dates.till.day && 
						dates.from.hour == dates.till.hour) || 
						dates.from.day == dates.till.day) && 
						dates.from.month == dates.till.month)
		{
			return 	dates.from.real + 
							', ' + 
							Dater.getThisYear();
		}
		/**
		 * if a month selected
		 */
		else if(dates.from.day == 1 && 
						dates.till.day == periods.months[monthNumber + 1].totalDays)
		{
			/**
			 * Return values
			 */
			return 	dates.from.month + 
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
			return 	dates.from.real + 
							' / ' + 
							dates.till.real + 
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
		var diff = new Date(timeline.range.till).getTime() - new Date(timeline.range.from).getTime();
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
					from: new Date(timeline.range.from).toString('HH:mm'),
					till: new Date(timeline.range.till).toString('HH:mm')
				};
				/**
				 *  00:00 fix => 24:00
				 */
				if (hours.till == '00:00')
				{
					hours.till = '24:00';
				};
				/**
				 * Returns values
				 */
				return 	'Time: ' + 
								hours.from + 
								' / ' + 
								hours.till;
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
}]);






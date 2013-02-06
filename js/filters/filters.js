'use strict';

/* Filters */

angular.module('WebPaige.filters', [])

.filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  }])

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

.filter('niceRange', ['Dater', 'Storage', function(Dater, Storage)
{
	var periods = angular.fromJson(Storage.get('periods'));
	return function(dates)
	{
		var dates = {
			from: {
				real: new Date(dates.from).toString('dddd, MMMM d'),
				month: new Date(dates.from).toString('MMMM'),
				day: new Date(dates.from).toString('d'),
				hour: new Date(dates.from).toString('HH:mm')
			},
			till: {
				real: new Date(dates.till).toString('dddd, MMMM d'),
				month: new Date(dates.till).toString('MMMM'),
				day: new Date(dates.till).toString('d'),
				hour: new Date(dates.till).toString('HH:mm')
			}
		};

		var monthNumber = Date.getMonthNumberFromName(dates.from.month);

		/**
		 * if a day is selected
		 */
		if ((((Math.round(dates.from.day) + 1) == dates.till.day && 
				dates.from.hour == dates.till.hour) ||
				dates.from.day == dates.till.day) && 
				dates.from.month == dates.till.month)
		{
			return dates.from.real + ', ' + Dater.getThisYear();
		}
		/**
		 * if a month selected
		 */
		else if(dates.from.day == 1 && 
						dates.till.day == periods.months[monthNumber + 1].totalDays)
		{
			return dates.from.month + ', ' + Dater.getThisYear();
		}
		/**
		 * if a week or any other range is selected
		 */
		else
		{
			return dates.from.real + ' / ' + dates.till.real;
		};

	}
}]);
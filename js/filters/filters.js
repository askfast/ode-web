'use strict';

/* Filters */

angular.module('WebPaige.filters', [])

// .filter('interpolate', ['version', function(version) {
//     return function(text) {
//       return String(text).replace(/\%VERSION\%/mg, version);
//     }
//   }])

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

.filter('rangeMainFilter', ['Dater', 'Storage', function(Dater, Storage)
{
	var periods = Dater.getPeriods();

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
			return 	dates.from.month + 
							', ' + 
							Dater.getThisYear();
		}
		/**
		 * if a week or any other range is selected
		 */
		else
		{
			return 	dates.from.real + 
							' / ' + 
							dates.till.real + 
							', ' + 
							Dater.getThisYear();
		};

	}
}])

.filter('rangeInfoFilter', ['Dater', 'Storage', function(Dater, Storage)
{
	var periods = Dater.getPeriods();

	return function(timeline)
	{
		if (timeline.scope.day)
		{
			var hours = {
				from: new Date(timeline.range.from).toString('HH:mm'),
				till: new Date(timeline.range.till).toString('HH:mm')
			};
			return 	hours.from + 
							' / ' + 
							hours.till;
		}
		else if (timeline.scope.week)
		{
			return 	'Week number: ' + 
							timeline.current.week;
		}
		else if (timeline.scope.month)
		{
			return 	'Month number: ' + 
							timeline.current.month + 
							', Total days: ' + 
							periods.months[timeline.current.month].totalDays;
		}

		// /**
		//  * Does this work always?
		//  * Time will tell :]
		//  * One milisecond fix
		//  */
		// if ((new Date(dates.till).getTime() - new Date(dates.from).getTime()) == 86401000)
		// {
		// 	dates.from = new Date(dates.till).addDays(-1);
		// };

		// /**
		//  * Process the variables
		//  */
		// var dates = {
		// 	from: {
		// 		real: new Date(dates.from).toString('dddd, MMMM d'),
		// 		month: new Date(dates.from).toString('MMMM'),
		// 		day: new Date(dates.from).toString('d'),
		// 		hour: new Date(dates.from).toString('HH:mm')
		// 	},
		// 	till: {
		// 		real: new Date(dates.till).toString('dddd, MMMM d'),
		// 		month: new Date(dates.till).toString('MMMM'),
		// 		day: new Date(dates.till).toString('d'),
		// 		hour: new Date(dates.till).toString('HH:mm')
		// 	}
		// };

		// /**
		//  * Get the current month
		//  */
		// var monthNumber = Date.getMonthNumberFromName(dates.from.month);

		// /**
		//  * if a day is selected
		//  */
		// if ((((Math.round(dates.from.day) + 1) == dates.till.day && 
		// 				dates.from.hour == dates.till.hour) || 
		// 				dates.from.day == dates.till.day) && 
		// 				dates.from.month == dates.till.month)
		// {
		// 	return dates.from.real + 
		// 					', ' + 
		// 					Dater.getThisYear() + 
		// 					', ' +
		// 					dates.from.hour + 
		// 					' / ' + 
		// 					dates.till.hour;
		// }
		// /**
		//  * if a month selected
		//  */
		// else if(dates.from.day == 1 && 
		// 				dates.till.day == periods.months[monthNumber + 1].totalDays)
		// {
		// 	return dates.from.month + 
		// 					', ' + 
		// 					Dater.getThisYear();
		// }
		// /**
		//  * if a week or any other range is selected
		//  */
		// else
		// {
		// 	return dates.from.real + 
		// 					' / ' + 
		// 					dates.till.real;
		// };

	}
}])






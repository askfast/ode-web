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

.filter('niceRange', ['Dater', function(Dater)
{
	return function(dates)
	{
		var dates = {
			from: new Date(dates.from).toString('dddd, MMMM d'),
			till: new Date(dates.till).toString('dddd, MMMM d')
		};
		if (dates.from == dates.till)
		{
			return dates.from;
		}
		else
		{
			return dates.from + ' / ' + dates.till;
		};
	}
}]);
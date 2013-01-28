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
});
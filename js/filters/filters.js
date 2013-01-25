'use strict';

/* Filters */

angular.module('WebPaige.filters', [])

.filter('interpolate', ['version', function(version) {
    return function(text) {
      return String(text).replace(/\%VERSION\%/mg, version);
    }
  }])

/*
.filter('boxer', function()
{
	return function(messages, box)
	{
		console.log('boxer called for', messages, box);
		return true;
	}
});
*/

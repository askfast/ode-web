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

.filter('eveURL2Id', function()
{
    return function(url)
    {
        var uuidArray = url.split("/");
        var uuid = uuidArray[uuidArray.length-2];
        return uuid;
    }
});
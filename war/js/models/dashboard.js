'use strict';

WebPaige.
factory('Dashboard', function ($resource, $config, $q, $route, $timeout, Storage, $rootScope, Slots, Dater) 
{

  /**
   * Define an empty resource for dashboard
   */
  var Dashboard = $resource(
    'http://knrm.myask.me/rpc/client/p2000.php',
    {
    },
    {
      p2000: {
        method: 'GET',
        params: {}
      }
    }
  );

  /**
   * Get group aggs for pie charts
   */
  Dashboard.prototype.pies = function () 
  {
    /**
     * Default params
     */
    var deferred = $q.defer(),
        groups = angular.fromJson(Storage.get('groups')),
        periods = Dater.getPeriods(),
        current = new Date().getWeek(),
        week = {
          start:  periods.weeks[current].first.timeStamp / 1000,
          end:    periods.weeks[current].last.timeStamp / 1000
        };

    /**
     * Reset calls
     */
    var calls = [];

    /**
     * Loop through the groups
     */
    angular.forEach(groups, function(group, index)
    {
      /**
       * Push groups in calls pool
       */
      calls.push(Slots.pie({
        id: group.uuid,
        name: group.name,
        start: week.start,
        end: week.end
      }));
    });

    /**
     * Run pool of calls
     */
    $q.all(calls)
    .then(function (results)
    {
      /**
       * Return promised values
       */
      deferred.resolve(results);
    });

    return deferred.promise;
  };

  /**
   * Get p2000 announcements
   */
  Dashboard.prototype.p2000 = function () 
  {
    var deferred = $q.defer();

    /**
     * Grab p2000 feed
     */
    $.ajax({
       url:"http://knrm.myask.me/rpc/client/p2000.php",
       dataType: 'jsonp',
       success: function(results)
       {
         deferred.resolve(results);
       },
       error: function()
       {
         deferred.reject('Something bad happened with fetching p2000 messages');
       },
    });

    return deferred.promise;
  };

  return new Dashboard;
});

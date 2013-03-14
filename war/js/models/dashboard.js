'use strict';

WebPaige.
factory('Dashboard', function ($resource, $config, $q, $route, $timeout, Storage, $rootScope, Slots, Dater) 
{

  /**
   * Define an empty resource for dashboard
   */
  var Dashboard = $resource();

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

  return new Dashboard;
});

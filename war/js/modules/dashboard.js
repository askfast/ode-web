'use strict';

/**
 * Dashboard Controller
 */
function dashboardCtrl($scope, $rootScope, $config, $q, data, Dashboard, Slots)
{
  /**
   * Fix styles
   */
  $rootScope.fixStyles();

  
  /**
   * Get unread messages
   */
	$scope.messages = data;


  /**
   * Set loader for pies
   */
  $rootScope.loading = {
    message: $rootScope.ui.dashboard.loadingPie,
    status: true,
  };

  /**
   * Produce pie charts for groups
   * for current week
   */
  Dashboard.pies()
  .then(function (pies)
  {
    /**
     * Turn off loader
     */
    $rootScope.loading = {
      status: false,
    };
    /**
     * Set pies data
     */
    $scope.pies = pies;
  })
  /**
   * Second then for making sure that first process is done
   */
  .then( function (result)
  {
    /**
     * TODO 
     * Look for a better way to handle with it
     * Wait a bit for angular to produce dom
     */
    setTimeout( function() 
    {
      /**
       * Loop through pie statistics data
       */
      angular.forEach($scope.pies, function (pie, index)
      {
        /**
         * Clean group pie chart holder
         */
        document.getElementById('weeklyPie-' + pie.id).innerHTML = '';
        /**
         * Quick fix. If ratio is 0 than pie chart is not displayed at all
         */
        var ratios = [];
        if (pie.ratios.more != 0) ratios.push(pie.ratios.more);
        if (pie.ratios.even != 0) ratios.push(pie.ratios.even);
        if (pie.ratios.less != 0) ratios.push(pie.ratios.less);
        /**
         * Pie chart it baby!
         */
        var r = Raphael('weeklyPie-' + pie.id),
            pie = r.piechart(40, 40, 40, ratios, {
              colors: $config.pie.colors
            });
      });
    }, 100);
  });


  /**
   * P2000 annnouncements
   */
  Dashboard.p2000().
  then(function(results)
  {
    var alarms = [];
    angular.forEach(results, function (alarm, index)
    {
      if (alarm.body)
      {
        if (alarm.body.match(/Prio 1/))
        {
          alarm.body = alarm.body.replace('Prio 1 ', '');
          alarm.prio = {
            1: true
          }
        }
        if (alarm.body.match(/Prio 2/))
        {
          alarm.body = alarm.body.replace('Prio 2 ', '');
          alarm.prio = {
            2: true
          }
        }
        if (alarm.body.match(/Prio 3/))
        {
          alarm.body = alarm.body.replace('Prio 3 ', '');
          alarm.prio = {
            3: true
          }
        }
        alarms.push(alarm);
      }
    });

    $scope.alarms = alarms;
  })
	
};


/**
 * Dashboard resolver
 */
dashboardCtrl.resolve = {
  data: function ($rootScope, $config, Messages) 
  {
    return Messages.unread();
  }
}


dashboardCtrl.$inject = ['$scope', '$rootScope', '$config', '$q', 'data', 'Dashboard', 'Slots'];


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

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
    $rootScope.loading = {
      status: false,
    };

    $scope.pies = pies;
  })
  .then( function (result)
  {
    setTimeout( function() 
    {
      angular.forEach($scope.pies, function (pie, index)
      {
        document.getElementById('weeklyPie-' + pie.id).innerHTML = '';

        var ratios = [];

        if (pie.ratios.more != 0) ratios.push(pie.ratios.more);
        if (pie.ratios.even != 0) ratios.push(pie.ratios.even);
        if (pie.ratios.less != 0) ratios.push(pie.ratios.less);

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
        };

        if (alarm.body.match(/Prio 2/))
        {
          alarm.body = alarm.body.replace('Prio 2 ', '');
          alarm.prio = {
            2: true
          }
        };

        if (alarm.body.match(/Prio 3/))
        {
          alarm.body = alarm.body.replace('Prio 3 ', '');
          alarm.prio = {
            3: true
          }
        };

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
};


dashboardCtrl.$inject = ['$scope', '$rootScope', '$config', '$q', 'data', 'Dashboard', 'Slots'];


/**
 * Dashboard modal
 */
WebPaige.
factory('Dashboard', function ($resource, $config, $q, $route, $timeout, Storage, $rootScope, Slots, Dater) 
{
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
    var deferred = $q.defer(),
        groups = angular.fromJson(Storage.get('groups')),
        periods = Dater.getPeriods(),
        current = new Date().getWeek(),
        week = {
          start:  periods.weeks[current].first.timeStamp / 1000,
          end:    periods.weeks[current].last.timeStamp / 1000
        };

    var calls = [];

    angular.forEach(groups, function(group, index)
    {
      calls.push(Slots.pie({
        id: group.uuid,
        name: group.name,
        start: week.start,
        end: week.end
      }));
    });

    $q.all(calls)
    .then(function (results)
    {
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

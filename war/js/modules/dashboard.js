'use strict';

/**
 * Dashboard Controller
 */
function dashboardCtrl($scope, $rootScope, $q, data, Dashboard, Slots)
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
    setTimeout( function () 
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
              colors: $rootScope.config.pie.colors
            });
      });
    }, 100);
  });


  /**
   * P2000 annnouncements
   */
  Dashboard.p2000().
  then(function (results)
  {
    // var alarms = [];

    // angular.forEach(results, function (alarm, index)
    // {
    //   if (alarm.body)
    //   {
    //     if (alarm.body.match(/Prio 1/))
    //     {
    //       alarm.body = alarm.body.replace('Prio 1 ', '');
    //       alarm.prio = {
    //         1: true
    //       }
    //     };

    //     if (alarm.body.match(/Prio 2/))
    //     {
    //       alarm.body = alarm.body.replace('Prio 2 ', '');
    //       alarm.prio = {
    //         2: true
    //       }
    //     };

    //     if (alarm.body.match(/Prio 3/))
    //     {
    //       alarm.body = alarm.body.replace('Prio 3 ', '');
    //       alarm.prio = {
    //         3: true
    //       }
    //     };

    //     alarms.push(alarm);
    //   }
    // });

    $scope.alarms = results;
  })
	
};


/**
 * Dashboard resolver
 */
dashboardCtrl.resolve = {
  data: function (Messages) 
  {
    return Messages.unread();
  }
};


dashboardCtrl.$inject = ['$scope', '$rootScope', '$q', 'data', 'Dashboard', 'Slots'];


/**
 * Dashboard modal
 */
WebPaige.
factory('Dashboard', function ($rootScope, $resource, $config, $q, $route, $timeout, Storage, Slots, Dater) 
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

    angular.forEach(groups, function (group, index)
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
       success: function (results)
       {
         deferred.resolve( proP2000(results) );
       },
       error: function ()
       {
         deferred.reject('Something bad happened with fetching p2000 messages');
       },
    });

    return deferred.promise;
  };


  /**
   * TODO
   * Modify p2000 script in ask70 for date conversions!!
   *
   * p2000 messages processor
   */
  function proP2000 (results)
  {
    var alarms  = [],
        limit   = 4,
        count   = 0;

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

        // var dates     = alarm.day.split('-'),
        //     swap      = dates[0] + 
        //                 '-' + 
        //                 dates[1] + 
        //                 '-' + 
        //                 dates[2],
        //     dstr      = swap + ' ' + alarm.time,
        //     datetime  = new Date(alarm.day + ' ' + alarm.time).toString('dd-MM-yy HH:mm:ss'),
        //     timeStamp = new Date(datetime).getTime();
        // alarm.datetime = datetime;
        // alarm.timeStamp = timeStamp;

        if (count < 4) alarms.push(alarm);

        count++;
      }
    });

    return alarms;

  };

  return new Dashboard;
});






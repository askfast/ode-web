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
  $rootScope.statusBar.display($rootScope.ui.dashboard.loadingPie);

  /**
   * Produce pie charts for groups
   * for current week
   */
  Dashboard.pies()
  .then(function (pies)
  {
    $rootScope.statusBar.off();

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
    $scope.alarms = results;
    $scope.alarms.list = $scope.alarms.short;
  });
	

  $scope.more = {
    status: false,
    text:   'show more' 
  };

  /**
   * Show more alarms
   */
  $scope.toggle = function (more)
  {
    $scope.alarms.list = (more) ? $scope.alarms.short :  $scope.alarms.long;

    $scope.more.text = (more) ? 'show more' : 'show less';

    $scope.more.status = !$scope.more.status;
  };

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
factory('Dashboard', function ($rootScope, $resource, $config, $q, $route, $timeout, Storage, Slots, Dater, Announcer) 
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
         deferred.resolve( Announcer.process(results) );
       },
       error: function ()
       {
         deferred.reject('Something bad happened with fetching p2000 messages');
       },
    });

    return deferred.promise;
  };


  return new Dashboard;
});


/**
 * Process alarms
 */
WebPaige.
factory('Announcer', function () 
{
  return {
    /**
     * TODO
     * Modify p2000 script in ask70 for date conversions!!
     *
     * p2000 messages processor
     */
    process: function (results)
    {
      var alarms  = {
            short:  [],
            long:   [] 
          },
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
              1:    true,
              test: false
            };
          };

          if (alarm.body.match(/Prio 2/))
          {
            alarm.body = alarm.body.replace('Prio 2 ', '');
            alarm.prio = {
              2:    true,
              test: false
            };
          };

          if (alarm.body.match(/Prio 3/))
          {
            alarm.body = alarm.body.replace('Prio 3 ', '');
            alarm.prio = {
              3:    true,
              test: false
            }
          };

          if (alarm.body.match(/PROEFALARM/))
          {
            alarm.prio = {
              test: true
            };
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

          if (count < 4) alarms.short.push(alarm);

          alarms.long.push(alarm);

          count++;
        }
      });

      return alarms;
    }
  }
});



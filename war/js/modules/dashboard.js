'use strict';

/**
 * Dashboard Controller
 */
function dashboardCtrl($scope, $rootScope, $q, Dashboard, Slots, Dater, Storage)
{  
  /**
   * Fix styles
   */
  $rootScope.fixStyles();


  /**
   * Defaults for loaders
   */
  $scope.loading = {
    pies:   true,
    alerts: true
  };
  

  /**
   * Defaults for toggler
   */
  $scope.more = {
    status: false,
    text:   'show more' 
  };


  /**
   * Get pies
   */
  Dashboard.pies()
  .then(function (pies)
  {
    if (pies.error)
    {
      $rootScope.notifier.error('Error with getting group overviews.');
      console.warn('error ->', result);
    }
    else
    {
      $scope.shortageHolders = {};

      $scope.loading.pies = false;

      $scope.periods = {
        start:  pies[0].weeks.current.start.date,
        end:    pies[0].weeks.next.end.date
      };

      angular.forEach(pies, function (pie, index)
      {
        if (pie.weeks.current.state.diff == null) pie.weeks.current.state.diff = 0;
        if (pie.weeks.current.state.wish == null) pie.weeks.current.state.wish = 0;
            
        if (pie.weeks.current.state.diff > 0)
        {
          pie.weeks.current.state.cls = 'more';
        }
        else if (pie.weeks.current.state.diff == 0)
        {
          pie.weeks.current.state.cls = 'even';
        }
        else if (pie.weeks.current.state.diff < 0)
        {
          pie.weeks.current.state.cls = 'less';
        };

        pie.weeks.current.state.start = (pie.weeks.current.state.start != undefined) 
                                        ? new Date(pie.weeks.current.state.start * 1000).toString($rootScope.config.formats.datetime)
                                        : 'undefined';

        pie.weeks.current.state.end   = (pie.weeks.current.state.end != undefined)
                                        ? new Date(pie.weeks.current.state.end * 1000).toString($rootScope.config.formats.datetime)
                                        : 'undefined';
        
        pie.shortages = {
          current:  pie.weeks.current.shortages,
          next:     pie.weeks.next.shortages,
          total:    pie.weeks.current.shortages.length + pie.weeks.next.shortages.length
        };

        pie.state = pie.weeks.current.state;

        delete(pie.weeks.current.shortages);
        delete(pie.weeks.current.state);

        $scope.shortageHolders['shortages-' + pie.id] = false;
      });

      $scope.pies = pies;
    };
  })
  .then( function (result)
  {
    angular.forEach($scope.pies, function (pie, index)
    {
      pieMaker('weeklyPieCurrent-', pie.id, pie.name, pie.weeks.current.ratios);
      pieMaker('weeklyPieNext-', pie.id, pie.name, pie.weeks.next.ratios);
    });

    function pieMaker ($id, id, name, _ratios)
    {    
      setTimeout( function () 
      {
        document.getElementById($id + id).innerHTML = '';

        var ratios    = [],
            colorMap  = {
              more: '#415e6b',
              even: '#ba6a24',
              less: '#a0a0a0'
            },
            colors    = [],
            xratios   = [];

        angular.forEach(_ratios, function (ratio, index)
        {
          if (ratio != 0)
          {
            ratios.push({
              ratio: ratio, 
              color: colorMap[index]
            });
          };
        });

        ratios = ratios.sort(function (a, b) { return b.ratio - a.ratio });

        angular.forEach(ratios, function (ratio, index)
        {
          colors.push(ratio.color);
          xratios.push(ratio.ratio);
        });

        var r   = Raphael($id + id),
            pie = r.piechart(40, 40, 40, xratios, { colors: colors });

      }, 100);
    };
  });


  /**
   * P2000 annnouncements
   */
  Dashboard.p2000().
  then(function (result)
  {
    if (result.error)
    {
      $rootScope.notifier.error('Error with getting p2000 alarm messages.');
      console.warn('error ->', result);
    }
    else
    {
      $scope.loading.alerts = false;

      $scope.alarms = result;

      $scope.alarms.list = $scope.alarms.short;
    };
  });


  /**
   * Show more or less alarms
   */
  $scope.toggle = function (more)
  {
    $scope.alarms.list = (more) ? $scope.alarms.short :  $scope.alarms.long;

    $scope.more.text = (more) ? 'show more' : 'show less';

    $scope.more.status = !$scope.more.status;
  };





  var groups = Storage.local.groups(),
      selection = {};

  angular.forEach(groups, function (group, index)
  {
    selection[group.uuid] = true;
  });

  $scope.popover = {
    groups: groups,
    selection: selection
  };

  $scope.saveOverviewWidget = function (selection)
  {
    console.warn('selection ->', selection);
  }





};


dashboardCtrl.$inject = ['$scope', '$rootScope', '$q', 'Dashboard', 'Slots', 'Dater', 'Storage'];


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
        params: {},
        isArray: true
      }
    }
  );


  /**
   * Get group aggs for pie charts
   */
  Dashboard.prototype.pies = function () 
  {
    var deferred  = $q.defer(),
        groups    = angular.fromJson(Storage.get('groups')),
        now       = new Date.now().getTime(),
        calls     = [];

    angular.forEach(groups, function (group, index)
    {
      calls.push(Slots.pie({
        id:     group.uuid,
        name:   group.name
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

    // Dashboard.p2000(null, 
    //    function (result) 
    //    {
    //      deferred.resolve(result);

    //      console.log('result ->', result);
    //    },
    //    function (error)
    //    {
    //      deferred.resolve({error: error});
    //    }
    //  );

    $.ajax({
      url: $config.profile.p2000.url,
      dataType: 'jsonp',
      success: function (results)
      {
        deferred.resolve( Announcer.process(results) );
      },
      error: function ()
      {
        deferred.resolve({error: error});
      }
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
          if (alarm.body.match(/Prio 1/) || alarm.body.match(/PRIO 1/))
          {
            alarm.body = alarm.body.replace('Prio 1 ', '');
            alarm.prio = {
              1:    true,
              test: false
            };
          };

          if (alarm.body.match(/Prio 2/) || alarm.body.match(/PRIO 2/))
          {
            alarm.body = alarm.body.replace('Prio 2 ', '');
            alarm.prio = {
              2:    true,
              test: false
            };
          };

          if (alarm.body.match(/Prio 3/) || alarm.body.match(/PRIO 3/))
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
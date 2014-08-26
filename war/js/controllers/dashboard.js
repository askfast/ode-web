/*jslint node: true */
/*global angular */
/*global Raphael */
'use strict';


angular.module('WebPaige.Controllers.Dashboard', [])


/**
 * Dashboard controller
 */
  .controller(
  'dashboard',
  [
    '$scope',
    '$rootScope',
    '$q',
    '$window',
    '$location',
    'Dashboard',
    'Slots',
    'Dater',
    'Storage',
    'Settings',
    'Profile',
    'Groups',
    'Announcer',
    '$timeout',
    function ($scope, $rootScope, $q, $window, $location, Dashboard, Slots, Dater, Storage,
              Settings, Profile, Groups, Announcer, $timeout)
    {
      $rootScope.notification.status = false;

      /**
       * Fix styles
       */
      $rootScope.fixStyles();


      /**
       * Defaults for loaders
       */
      $scope.loading = {
        pies: true,
        alerts: true,
        smartAlarm: true
      };


      /**
       * Defaults for toggle
       */
      $scope.more = {
        status: false,
        text: $rootScope.ui.dashboard.showMore
      };


      /**
       * Default values for synced pointer values
       */
      $scope.synced = {
        alarms: new Date().getTime(),
        pies: new Date().getTime()
      };


      /**
       * TODO: Check somewhere that user-settings widget-groups are synced with the
       * real groups list and if a group is missing in settings-groups add by default!
       */
      var groups = Storage.local.groups();

      var selection = {};

      angular.forEach(
        Storage.local.settings().app.widgets.groups,
        function (value, group) { selection[group] = value }
      );

      angular.forEach(
        groups,
        function (group)
        {
          if (! selection[group.uuid])
          {
            selection[group.uuid] = {
              divisions: ($rootScope.config.timeline.config.divisions.length > 0),
              status: false
            };
          }
        }
      );

      var filteredGroups = [];

      angular.forEach(
        groups,
        function (group)
        {
          if (group.uuid != 'all')
          {
            filteredGroups.push(group);
          }
        }
      );

      $scope.popover = {
        groups: filteredGroups,
        selection: selection,
        divisions: ($rootScope.config.timeline.config.divisions.length > 0)
      };

      $scope.checkAnyPies = function ()
      {
        var ret = true;

        $scope.loading.pies = false;

        angular.forEach(
          Storage.local.settings().app.widgets.groups,
          function (group)
          {
            if (group.status === true)
            {
              ret = false;
            }
          }
        );

        return ret;
      };


      $scope.loadingPies = true;


      /**
       * Get group overviews
       */
      function getOverviews ()
      {
        $scope.loadingPies = true;

        if (! $scope.checkAnyPies())
        {
          Dashboard.pies()
            .then(
            function (pies)
            {
              $scope.loadingPies = false;

              if (pies.error)
              {
                $rootScope.notifier.error($rootScope.ui.errors.dashboard.getOverviews);
                console.warn('error ->', pies.error);
              }
              else
              {
                $scope.shortageHolders = {};

                $scope.loading.pies = false;

                $scope.periods = {
                  start: pies[0].weeks.current.start.date,
                  end: pies[0].weeks.next.end.date
                };

                angular.forEach(
                  pies,
                  function (pie)
                  {
                    // Check whether if it is an array what data processor gives back
                    if (pie.weeks.current.state instanceof Array)
                    {
                      pie.weeks.current.state = pie.weeks.current.state[0];
                    }

                    if (pie.weeks.current.state.diff === null) pie.weeks.current.state.diff = 0;
                    if (pie.weeks.current.state.wish === null) pie.weeks.current.state.wish = 0;

                    if (pie.weeks.current.state.wish == 0)
                    {
                      pie.weeks.current.state.cls = 'disabled';
                    }
                    else
                    {
                      if (pie.weeks.current.state.diff > 0)
                      {
                        pie.weeks.current.state.cls = 'more';
                      }
                      else if (pie.weeks.current.state.diff === 0)
                      {
                        pie.weeks.current.state.cls = 'even';
                      }
                      else if (pie.weeks.current.state.diff < 0)
                      {
                        pie.weeks.current.state.cls = 'less';
                      }
                    }

                    pie.weeks.current.state.start = (pie.weeks.current.state.start !== undefined) ?
                                                    new Date(pie.weeks.current.state.start * 1000)
                                                      .toString($rootScope.config.formats.datetime) :
                                                    $rootScope.ui.dashboard.possiblyAvailable;

                    pie.weeks.current.state.end = (pie.weeks.current.state.end !== undefined) ?
                                                  new Date(pie.weeks.current.state.end * 1000)
                                                    .toString($rootScope.config.formats.datetime) :
                                                  $rootScope.ui.dashboard.possiblyAvailable;

                    pie.shortages = {
                      current: pie.weeks.current.shortages,
                      next: pie.weeks.next.shortages,
                      total: pie.weeks.current.shortages.length + pie.weeks.next.shortages.length
                    };

                    pie.state = pie.weeks.current.state;

                    delete(pie.weeks.current.shortages);
                    delete(pie.weeks.current.state);

                    $scope.shortageHolders['shortages-' + pie.id] = false;
                  }
                );

                $scope.pies = pies;
              }
            })
            .then(
            function ()
            {
              angular.forEach(
                $scope.pies,
                function (pie)
                {
                  pieMaker('weeklyPieCurrent-', pie.id + '-' + pie.division, pie.weeks.current.ratios);
                  pieMaker('weeklyPieNext-', pie.id + '-' + pie.division, pie.weeks.next.ratios);
                }
              );

              function pieMaker ($id, id, _ratios)
              {
                $timeout(
                  function ()
                  {
                    if ($.browser.msie && $.browser.version == '8.0')
                    {
                      $('#' + $id + id).html('');
                    }
                    else
                    {
                      if (document.getElementById($id + id))
                      {
                        document.getElementById($id + id).innerHTML = '';
                      }
                    }

                    var ratios = [],
                        colorMap = {
                          more: '#6cad6c',
                          // more: '#415e6b',
                          even: '#e09131',
                          // even: '#ba6a24',
                          less: '#d34545'
                          // less: '#a0a0a0'
                        },
                        colors = [],
                        xratios = [];

                    angular.forEach(
                      _ratios,
                      function (ratio, index)
                      {
                        if (ratio !== 0)
                        {
                          ratios.push(
                            {
                              ratio: ratio,
                              color: colorMap[index]
                            }
                          );
                        }
                      }
                    );

                    ratios = ratios.sort(
                      function (a, b) { return b.ratio - a.ratio }
                    );

                    angular.forEach(
                      ratios,
                      function (ratio)
                      {
                        colors.push(ratio.color);
                        xratios.push(ratio.ratio);
                      }
                    );

                    try {
                      new Raphael($id + id)
                        .piechart(
                        40, 40, 40,
                        xratios,
                        {
                          colors: colors,
                          stroke: 'white'
                        }
                      );
                    }
                    catch (e)
                    {
                      // console.warn(' Raphael error ->', e);
                    }

                  }, $rootScope.config.timers.TICKER);
              }
            }
          );
        }
        else
        {
          $rootScope.statusBar.off();
        }
      }


      /**
       * Get pie overviews
       */
      $timeout(function () { getOverviews() }, 25);


      var members = Storage.local.members();

      angular.forEach(
        groups,
        function (group)
        {
          group.name = group.name.replace(
            /\w\S*/g,
            function (name)
            {
              return name.charAt(0).toUpperCase() + name.substr(1).toLowerCase();
            }
          );
        }
      );

      var initGroup;

      groups.unshift(
        {
          'name': $rootScope.ui.dashboard.everyone,
          'uuid': 'all'
        }
      );

      initGroup = 'all';

      $scope.groups = groups;

      $scope.states = $rootScope.config.timeline.config.states;

      $scope.states['no-state'] = {
        className: 'no-state',
        label: $rootScope.ui.dashboard.possiblyAvailable,
        color: '#ececec',
        type: $rootScope.ui.dashboard.noPlanning,
        display: false
      };

      $scope.divisions = $rootScope.config.timeline.config.divisions;

      if ($rootScope.config.timeline.config.divisions.length > 0)
      {
        if ($scope.divisions[0].id !== 'all')
        {
          $scope.divisions.unshift(
            {
              id: 'all',
              label: $rootScope.ui.dashboard.allDivisions
            }
          );
        }
      }

      $scope.current = {
        group: initGroup,
        division: 'all'
      };

      $scope.loadingAvailability = true;

      /**
       * Get availability
       */
      $scope.getAvailability = function (groupID, divisionID)
      {
        if (! groupID)
        {
          groupID = $scope.current.group;
        }

        if (! divisionID)
        {
          divisionID = $scope.current.division;
        }

        Slots.getMemberAvailabilities(
          groupID,
          divisionID
        ).then(
          function (results)
          {
            var ordered = {};

            angular.forEach(
              angular.fromJson(angular.toJson(results.members)),
              function (slots, id)
              {
                if (members[id] &&
                    (members[id].resources.role != 0 && members[id].resources.role != 4))
                {
                  var _member = {
                    id: id,
                    state: (slots.length > 0) ? slots[0].state : 'no-state',
                    label: (slots.length > 0) ? $scope.states[slots[0].state].label[0] : '',
                    end: (slots.length > 0 && slots[0].end !== undefined) ?
                         slots[0].end * 1000 :
                         $rootScope.ui.dashboard.possiblyAvailable,
                    name: (members && members[id]) ?
                          members[id].resources.firstName + ' ' + members[id].resources.lastName :
                          id
                  };

                  if (slots.length > 0)
                  {
                    if (! ordered.available)
                    {
                      ordered.available = [];
                    }

                    if (! ordered.unavailable)
                    {
                      ordered.unavailable = [];
                    }

                    if (slots[0].state == 'com.ask-cs.State.Unreached')
                    {
                      ordered.unavailable.push(_member);
                    }
                    else if (slots[0].state == 'com.ask-cs.State.Unavailable')
                    {
                      ordered.unavailable.push(_member);
                    }
                    else
                    {
                      if (slots[0].state == 'com.ask-cs.State.Available')
                      {
                        _member.style = 'sa-icon-reserve-available';
                      }

                      if (slots[0].state == 'com.ask-cs.State.KNRM.BeschikbaarNoord')
                      {
                        _member.style = 'sa-icon-reserve-available-north';
                      }

                      if (slots[0].state == 'com.ask-cs.State.KNRM.BeschikbaarZuid')
                      {
                        _member.style = 'sa-icon-reserve-available-south';
                      }

                      if (slots[0].state == 'com.ask-cs.State.KNRM.SchipperVanDienst')
                      {
                        _member.style = 'sa-icon-reserve-available-schipper';
                      }

                      ordered.available.push(_member);
                    }
                  }
                  else
                  {
                    if (! ordered.possible)
                    {
                      ordered.possible = [];
                    }

                    ordered.possible.push(_member);
                  }
                }
              }
            );

            $scope.loadingAvailability = false;

            var sortByEnd = function (a, b)
            {
              if (a.end < b.end)
              {
                return - 1;
              }

              if (a.end > b.end)
              {
                return 1;
              }

              return 0;
            };

            if (ordered.hasOwnProperty('available'))
            {
              ordered.available.sort(sortByEnd);
            }

            if (ordered.hasOwnProperty('unavailable'))
            {
              ordered.unavailable.sort(sortByEnd);
            }

            var _availables = [];

            angular.forEach(
              ordered.available,
              function (available)
              {
                if (available.state == 'com.ask-cs.State.KNRM.SchipperVanDienst')
                {
                  _availables.push(available);
                }
              }
            );

            angular.forEach(
              ordered.available,
              function (available)
              {
                if (available.state == 'com.ask-cs.State.Available')
                {
                  _availables.push(available);
                }
              }
            );

            angular.forEach(
              ordered.available,
              function (available)
              {
                if (available.state == 'com.ask-cs.State.KNRM.BeschikbaarNoord')
                {
                  _availables.push(available);
                }
              }
            );

            angular.forEach(
              ordered.available,
              function (available)
              {
                if (available.state == 'com.ask-cs.State.KNRM.BeschikbaarZuid')
                {
                  _availables.push(available);
                }
              }
            );

            ordered.available = _availables;

            $scope.availability = {
              members: ordered,
              synced: results.synced * 1000
            };
          }
        );
      };

      $scope.getGroupAvailability = function ()
      {
        $scope.current.division = 'all';

        $scope.getAvailability($scope.current.group, $scope.current.division);
      };

      $scope.getDivisionAvailability = function ()
      {
        $scope.getAvailability($scope.current.group, $scope.current.division);
      };

      $scope.getGroupAvailability();

      /**
       * Save widget settings
       */
      $scope.saveOverviewWidget = function (selection)
      {
        $rootScope.statusBar.display($rootScope.ui.settings.saving);

        angular.forEach(
          selection,
          function (selected)
          {
            if (! selected.status)
            {
              selected.divisions = false;
            }
          }
        );

        Settings.save(
          $rootScope.app.resources.uuid,
          {
            user: Storage.local.settings().user,
            app: {
              group: Storage.local.settings().app.group,
              widgets: {
                groups: selection
              }
            }
          }).then(
          function ()
          {
            $rootScope.statusBar.display($rootScope.ui.dashboard.refreshGroupOverviews);

            Profile.get($rootScope.app.resources.uuid, true)
              .then(
              function () { getOverviews() }
            );
          }
        );
      };


      /**
       * Alarm sync
       */
      $rootScope.alarmSync = {
        start: function ()
        {
          $window.planboardSync = $window.setInterval(
            function ()
            {
              if ($location.path() == '/dashboard')
              {
                $scope.$apply()
                {
                  $scope.getAvailability($scope.current.group);
                }
              }
            }, $rootScope.config.timers.ALARM_SYNC);
        },
        clear: function () { $window.clearInterval($window.alarmSync) }
      };


      /**
       * Init the sync process
       */
      $rootScope.alarmSync.start();


      /**
       * Fix popover position
       */
      $scope.fixPopoverPos = function ()
      {
        setTimeout(
          function ()
          {
            var spanWidth = $('#dashboard .span9').css('width'),
                popWidth = $('#dashboard .popover').css('width');

            $('.popover').css(
              {
                top: $('#dashboardPopoverBtn').css('top'),
                left: ((spanWidth.substring(0, spanWidth.length - 2) - popWidth.substring(0, popWidth.length - 2) / 2) + 4)
                  + 'px'
              }
            );
          }, $rootScope.config.timers.TICKER);
      };


      /**
       * Broadcast fireSetPrefixedAvailability calls
       */
      $scope.setPrefixedAvailability = function (availability, period)
      {
        Storage.session.add(
          'setPrefixedAvailability',
          angular.toJson(
            {
              availability: availability,
              period: period
            }
          )
        );

        $location.path('/planboard').search({ setPrefixedAvailability: true });
      }
    }
  ]);
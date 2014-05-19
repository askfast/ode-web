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
    function ($scope, $rootScope, $q, $window, $location, Dashboard, Slots, Dater, Storage, Settings, Profile, Groups, Announcer)
    {
      $rootScope.notification.status = false;

      var possiblyAvailable = 'Mogelijk inzetbaar';

      /**
       * Fix styles
       */
      $rootScope.fixStyles();


      /**
       * Defaults for loaders
       */
      $scope.loading = {
        pies:       true,
        alerts:     true,
        smartAlarm: true
      };


      /**
       * Defaults for toggle
       */
      $scope.more = {
        status: false,
        text:   $rootScope.ui.dashboard.showMore
      };


      /**
       * Default values for synced pointer values
       */
      $scope.synced = {
        alarms: new Date().getTime(),
        pies:   new Date().getTime()
      };


      /**
       * TODO: Check somewhere that user-settings widget-groups are synced with the
       * real groups list and if a group is missing in settings-groups add by default!
       */
      var groups = Storage.local.groups(),
      selection = {};

      angular.forEach(
        Storage.local.settings().app.widgets.groups, function (value, group)
        {
          selection[group] = value;
        });

      angular.forEach(
        groups, function (group)
        {
          if (! selection[group.uuid])
          {
            selection[group.uuid] = {
              divisions: ! ! ($rootScope.config.timeline.config.divisions.length > 0),
              status:    false
            };
          }
        });

      $scope.popover = {
        groups:    groups,
        selection: selection,
        divisions: ! ! ($rootScope.config.timeline.config.divisions.length > 0)
      };

      $scope.checkAnyPies = function ()
      {
        var ret = true;

        $scope.loading.pies = false;

        angular.forEach(
          Storage.local.settings().app.widgets.groups, function (group)
          {
            if (group.status === true)
            {
              ret = false;
            }
          });

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
                  end:   pies[0].weeks.next.end.date
                };

                angular.forEach(
                  pies, function (pie)
                  {
                    // Check whether if it is an array what data processor gives back
                    if (pie.weeks.current.state instanceof Array)
                    {
                      pie.weeks.current.state = pie.weeks.current.state[0];
                    }

                    if (pie.weeks.current.state.diff === null) pie.weeks.current.state.diff = 0;
                    if (pie.weeks.current.state.wish === null) pie.weeks.current.state.wish = 0;

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

                    pie.weeks.current.state.start = (pie.weeks.current.state.start !== undefined) ?
                                                    new Date(pie.weeks.current.state.start * 1000)
                                                      .toString($rootScope.config.formats.datetime) :
                                                    possiblyAvailable;

                    pie.weeks.current.state.end = (pie.weeks.current.state.end !== undefined) ?
                                                  new Date(pie.weeks.current.state.end * 1000)
                                                    .toString($rootScope.config.formats.datetime) :
                                                  possiblyAvailable;

                    pie.shortages = {
                      current: pie.weeks.current.shortages,
                      next:    pie.weeks.next.shortages,
                      total: pie.weeks.current.shortages.length + pie.weeks.next.shortages.length
                    };

                    pie.state = pie.weeks.current.state;

                    delete(pie.weeks.current.shortages);
                    delete(pie.weeks.current.state);

                    $scope.shortageHolders['shortages-' + pie.id] = false;
                  });

                $scope.pies = pies;
              }
            })
            .then(
            function ()
            {
              angular.forEach(
                $scope.pies, function (pie)
                {
                  pieMaker('weeklyPieCurrent-', pie.id + '-' + pie.division, pie.weeks.current.ratios);
                  pieMaker('weeklyPieNext-', pie.id + '-' + pie.division, pie.weeks.next.ratios);
                });

              function pieMaker ($id, id, _ratios)
              {
                setTimeout(
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
                          more: '#415e6b',
                          even: '#ba6a24',
                          less: '#a0a0a0'
                        },
                        colors = [],
                        xratios = [];

                    angular.forEach(
                      _ratios, function (ratio, index)
                      {
                        if (ratio !== 0)
                        {
                          ratios.push(
                            {
                              ratio: ratio,
                              color: colorMap[index]
                            });
                        }
                      });

                    ratios = ratios.sort(
                      function (a, b)
                      {
                        return b.ratio - a.ratio;
                      });

                    angular.forEach(
                      ratios, function (ratio)
                      {
                        colors.push(ratio.color);
                        xratios.push(ratio.ratio);
                      });

                    var r = new Raphael($id + id),
                        pie = r.piechart(40, 40, 40, xratios, { colors: colors, stroke: 'white' });

                  }, $rootScope.config.timers.TICKER);
              }
            });
        }
        else
        {
          $rootScope.statusBar.off();
        }
      }


      /**
       * Get pie overviews
       */
      getOverviews();


      /**
       * Process Smart Alarm team members for view
       */
      function prepareSaMembers (setup)
      {
        var cached = angular.fromJson(Storage.get('guard'));

        $scope.saMembers = {
          truck:    [],
          reserves: []
        };

        $scope.saSynced = cached.synced;

        angular.forEach(
          setup.selection, function (selection)
          {
            function translateName (user)
            {
              return (user !== null) ? setup.users[user].name : 'Niet ingedeeld'
            }

            switch (selection.role)
            {
              case 'bevelvoerder':
                $scope.saMembers.truck.push(
                  {
                    rank:  1,
                    icon:  'B',
                    role:  'Bevelvoerder',
                    class: 'sa-icon-commander',
                    name:  translateName(selection.user)
                  });
                break;

              case 'chauffeur':
                $scope.saMembers.truck.push(
                  {
                    rank:  0,
                    icon:  'C',
                    role:  'Chauffeur',
                    class: 'sa-icon-driver',
                    name:  translateName(selection.user)
                  });
                break;

              case 'manschap.1':
                $scope.saMembers.truck.push(
                  {
                    rank: 2,
                    icon: 'M1',
                    role: 'Manschap 1',
                    name: translateName(selection.user)
                  });
                break;

              case 'manschap.2':
                $scope.saMembers.truck.push(
                  {
                    rank: 3,
                    icon: 'M2',
                    role: 'Manschap 2',
                    name: translateName(selection.user)
                  });
                break;

              case 'manschap.3':
                $scope.saMembers.truck.push(
                  {
                    rank: 4,
                    icon: 'M3',
                    role: 'Manschap 3',
                    name: translateName(selection.user)
                  });
                break;

              case 'manschap.4':
                $scope.saMembers.truck.push(
                  {
                    rank: 5,
                    icon: 'M4',
                    role: 'Manschap 4',
                    name: translateName(selection.user)
                  });
                break;
            }

            $rootScope.app.guard.role = setup.role;

            if (setup.users[$rootScope.app.resources.uuid])
            {
              $rootScope.app.guard.currentState = setup.users[$rootScope.app.resources.uuid].state;
            }
            else
            {
              Slots.currentState()
                .then(
                function (state)
                {
                  $rootScope.app.guard.currentState = state.label;
                }
              );
            }

            var reserves = {};

            // TODO: Kind of duplicate purpose with states
            var states = ['available', 'unavailable', 'noplanning'];

            angular.forEach(
              states, function (state)
              {
                reserves[state] = [];

                angular.forEach(
                  setup.reserves[state], function (member)
                  {
                    angular.forEach(
                      member, function (meta, userID)
                      {
                        reserves[state].push(
                          {
                            id:    userID,
                            name:  meta.name,
                            state: meta.state
                          }
                        );
                      });
                  });
              });

            $scope.saMembers.reserves = reserves;

            $scope.loading.smartAlarm = false;
          });
      }


      /**
       * Fetch smartAlarm information
       */
      if ($rootScope.config.profile.smartAlarm)
      {
        if (angular.fromJson(Storage.get('guard')).selection)
        {
          $scope.loading.smartAlarm = false;

          prepareSaMembers(angular.fromJson(Storage.get('guard')));
        }

        Groups.guardMonitor()
          .then(
          function ()
          {
            Groups.guardRole()
              .then(
              function (setup)
              {
                prepareSaMembers(setup);
              });
          });
      }


      var groups = Storage.local.groups(),
          settings = Storage.local.settings(),
          members = Storage.local.members();

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

      if ($rootScope.config.profile.meta != 'knrm')
      {
        groups.unshift(
          {
            'name': 'Iedereen',
            'uuid': 'all'
          }
        );

        initGroup = 'all';
      }
      else
      {
        initGroup = settings.app.group;
      }

      $scope.groups = groups;

      $scope.states = $rootScope.config.timeline.config.states;

      $scope.states['no-state'] = {
        className: 'no-state',
        label:     possiblyAvailable,
        color:     '#a0a0a0',
        type:      'Geen Planning',
        display:   false
      };

      $scope.divisions = $rootScope.config.timeline.config.divisions;

      if ($rootScope.config.timeline.config.divisions.length > 0)
      {
        if ($scope.divisions[0].id !== 'all')
        {
          $scope.divisions.unshift(
            {
              id:    'all',
              label: 'Alle divisies'
            }
          );
        }
      }

      $scope.current = {
        group:    initGroup,
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

        Slots.getMemberAvailabilities(groupID, divisionID)
          .then(
          function (results)
          {
            var ordered = {};

            angular.forEach(
              results.members,
              function (slots, id)
              {
                var _member = {
                  id: id,
                  state: (slots.length > 0) ? slots[0].state : 'no-state',
                  label: (slots.length > 0) ? $scope.states[slots[0].state].label[0] : '',
                  end: (slots.length > 0 && slots[0].end !== undefined) ?
                       slots[0].end * 1000 :
                       possiblyAvailable,
                  name: (members && members[id]) ? members[id].name : id
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

                  if (slots[0].state == 'com.ask-cs.State.Available' ||
                      slots[0].state == 'com.ask-cs.State.KNRM.BeschikbaarNoord' ||
                      slots[0].state == 'com.ask-cs.State.KNRM.BeschikbaarZuid' ||
                      slots[0].state == 'com.ask-cs.State.KNRM.SchipperVanDienst')
                  {
                    ordered.available.push(_member);
                  }
                  else if (slots[0].state == 'com.ask-cs.State.Unavailable' ||
                           slots[0].state == 'com.ask-cs.State.Unreached')
                  {
                    ordered.unavailable.push(_member);
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

            if (ordered.hasOwnProperty('available')) { ordered.available.sort(sortByEnd) }
            if (ordered.hasOwnProperty('unavailable')) { ordered.unavailable.sort(sortByEnd) }

            var _availables = [];

            angular.forEach(
              ordered.available,
              function (available)
              {
                if (available.state == 'com.ask-cs.State.KNRM.SchipperVanDienst') { _availables.push(available) }
              }
            );

            angular.forEach(
              ordered.available,
              function (available)
              {
                if (available.state == 'com.ask-cs.State.Available') { _availables.push(available) }
              }
            );

            angular.forEach(
              ordered.available,
              function (available)
              {
                if (available.state == 'com.ask-cs.State.KNRM.BeschikbaarNoord') { _availables.push(available) }
              }
            );

            angular.forEach(
              ordered.available,
              function (available)
              {
                if (available.state == 'com.ask-cs.State.KNRM.BeschikbaarZuid') { _availables.push(available) }
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
          selection, function (selected)
          {
            if (! selected.status)
            {
              selected.divisions = false;
            }
          });

        Settings.save(
          $rootScope.app.resources.uuid, {
            user: Storage.local.settings().user,
            app:  {
              group:   Storage.local.settings().app.group,
              widgets: {
                groups: selection
              }
            }
          })
          .then(
          function ()
          {
            $rootScope.statusBar.display($rootScope.ui.dashboard.refreshGroupOverviews);

            Profile.get($rootScope.app.resources.uuid, true)
              .then(
              function ()
              {
                getOverviews();
              });
          });
      };


      /**
       * Fetcher for p2000 alarm messages
       */
      $scope.getP2000 = function ()
      {
        Dashboard.p2000().
          then(
          function (result)
          {
            $scope.loading.alerts = false;

            $scope.alarms = result.alarms;

            $scope.alarms.list = $scope.alarms.short;

            $scope.synced.alarms = result.synced;
          });
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
                  $scope.getP2000();

                  if ($rootScope.config.profile.smartAlarm)
                  {
                    if (angular.fromJson(Storage.get('guard').selection))
                    {
                      prepareSaMembers(angular.fromJson(Storage.get('guard')));
                    }

                    Groups.guardRole()
                      .then(
                      function (setup)
                      {
                        prepareSaMembers(setup);
                      }
                    );
                  }
                  else
                  {
                    $scope.getAvailability($scope.current.group);
                  }
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
       * Show more or less alarms
       */
      $scope.toggle = function (more)
      {
        $scope.alarms.list = (more) ? $scope.alarms.short : $scope.alarms.long;

        $scope.more.text = (more) ? $rootScope.ui.dashboard.showMore : $rootScope.ui.dashboard.showLess;

        $scope.more.status = ! $scope.more.status;
      };


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
              });
          }, $rootScope.config.timers.TICKER);
      };


      /**
       * Get alarms for the first time
       */
      if ($rootScope.config.profile.smartAlarm)
      {
        $.ajax(
          {
            url:      $rootScope.config.profile.p2000.url,
            dataType: 'json',
            success:  function (results)
            {
              $rootScope.statusBar.off();

              var processed = Announcer.process(results, true);

              var result = {
                alarms: processed,
                synced: new Date().getTime()
              };

              $scope.$apply(
                function ()
                {
                  $scope.loading.alerts = false;

                  $scope.alarms = result.alarms;

                  $scope.alarms.list = $scope.alarms.short;

                  $scope.synced.alarms = result.synced;
                });
            },
            error:    function ()
            {
              console.log('ERROR with getting p2000 for the first time!');
            }
          });
      }
      else
      {

        Dashboard.getCapcodes().
          then(
          function (capcodes)
          {
            var _capcodes = '';

            capcodes = capcodes.sort();

            angular.forEach(
              capcodes, function (code)
              {
                _capcodes += code + ', ';
              });

            $scope.capcodes = _capcodes.substring(0, _capcodes.length - 2);

            $.ajax(
              {
                url: $rootScope.config.profile.p2000.url + '?code=' + capcodes,
                dataType: 'jsonp',
                success:  function (results)
                {
                  $rootScope.statusBar.off();

                  var processed = Announcer.process(results);

                  var result = {
                    alarms: processed,
                    synced: new Date().getTime()
                  };

                  $scope.$apply(
                    function ()
                    {
                      $scope.loading.alerts = false;

                      $scope.alarms = result.alarms;

                      $scope.alarms.list = $scope.alarms.short;

                      $scope.synced.alarms = result.synced;
                    });
                },
                error:    function ()
                {
                  console.log('ERROR with getting p2000 for the first time!');
                }
              });
          });
      }


      /**
       * Broadcast fireSetPrefixedAvailability calls
       */
      $scope.setPrefixedAvailability = function (availability, period)
      {
        Storage.session.add(
          'setPrefixedAvailability', angular.toJson(
            {
              availability: availability,
              period:       period
            }));

        $location.path('/planboard').search({ setPrefixedAvailability: true });
      }
    }
  ]);
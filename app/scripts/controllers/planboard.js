define(
  ['controllers/controllers', 'config'],
  function (controllers, config) {
    'use strict';

    controllers.controller(
      'planboard',
      [
        '$rootScope',
        '$scope',
        '$q',
        '$window',
        '$location',
        'data',
        'Slots',
        'Dater',
        'Storage',
        '$timeout',
        function ($rootScope, $scope, $q, $window, $location, data, Slots, Dater, Storage, $timeout) {
          $rootScope.notification.status = false;

          /**
           * Fix styles
           */
          $rootScope.fixStyles();


          /**
           * Pass the self
           */
          $scope.self = this;


          /**
           * Pass time slots data
           */
          $scope.data = data;


          /**
           * Get groups and settings
           */
          var groups = Storage.local.groups(),
            settings = Storage.local.settings(),
            groupId,
            validGroup = false;

          angular.forEach(
            groups,
            function (_group) {
              if (_group.uuid == settings.app.group) {
                validGroup = true
              }
            }
          );

          groupId = (validGroup) ? settings.app.group : groups[0].uuid;

          /**
           * Pass current
           */
          $scope.current = {
            layouts: {
              user: true,
              group: true,
              members: false
            },
            /**
             * Fix for timeline scope to day
             */
            day: Dater.current.today() + 1,
            week: Dater.current.week(),
            month: Dater.current.month(),
            year: Dater.current.year(),
            group: groupId,
            division: 'all'
          };


          /**
           * Pass periods
           */
          $scope.periods = Dater.getPeriods();
          $scope.periodsNext = Dater.getPeriods(true);


          /**
           * Reset and init slot container which
           * is used for adding or changing slots
           */
          $scope.slot = {};


          /**
           * Hot fix for breaking timeline for the end of the year
           */
          var stamps = {};

          if (Dater.current.today() > 360) {
            stamps = {
              start: $scope.periods.days[358].last.timeStamp,
              end: $scope.periods.days[365].last.timeStamp
            }
          }
          else {
            stamps = {
              start: $scope.periods.days[Dater.current.today() - 1].last.timeStamp,
              end: $scope.periods.days[Dater.current.today() + 6].last.timeStamp
            }
          }


          /**
           * Set defaults for timeline
           */
          $scope.timeline = {
            id: 'mainTimeline',
            main: true,
            user: {
              id: $rootScope.app.resources.uuid,
              role: $rootScope.app.resources.role
            },
            current: $scope.current,
            /**
             * Initial start up is next 7 days
             */
            options: {
              start: stamps.start,
              end: stamps.end,
              min: stamps.start,
              max: stamps.end
            },
            range: {
              start: stamps.start,
              end: stamps.end
              // start:  $scope.periods.days[Dater.current.today()].last.day,
              // end:    $scope.periods.days[Dater.current.today() + 7].last.day
            },
            scope: {
              day: false,
              week: true,
              month: false
            },
            config: {
              bar: $rootScope.config.timeline.config.bar,
              layouts: $rootScope.config.timeline.config.layouts,
              wishes: $rootScope.config.timeline.config.wishes,
              legenda: {},
              legendarer: $rootScope.config.timeline.config.legendarer,
              states: $rootScope.config.timeline.config.states,
              divisions: $rootScope.config.timeline.config.divisions,
              densities: $rootScope.config.timeline.config.densities
            }
          };


          /**
           * IE8 fix for inability of - signs in date object
           */
          if ($.browser.msie && $.browser.version == '8.0') {
            $scope.timeline.options = {
              start: $scope.periods.days[Dater.current.today()].last.timeStamp,
              end: $scope.periods.days[Dater.current.today() + 7].last.timeStamp,
              min: $scope.periods.days[Dater.current.today()].last.timeStamp,
              max: $scope.periods.days[Dater.current.today() + 7].last.timeStamp
            };
          }


          /**
           * Legend defaults
           */
          angular.forEach(
            $rootScope.config.timeline.config.states,
            function (state, index) {
              $scope.timeline.config.legenda[index] = true
            }
          );


          /**
           * Timeline group legend default configuration
           */
          $scope.timeline.config.legenda.groups = {
            more: true,
            even: true,
            less: true
          };


          /**
           * Prepare timeline range for date ranger widget
           */
          $scope.daterange = Dater.readable.date($scope.timeline.range.start) + ' / ' +
            Dater.readable.date($scope.timeline.range.end);


          $timeout(
            function () {
              /**
               * States for drop down
               */
              var states = {};

              //      angular.extend($scope.timeline.config.states, {
              //        // TODO: Remove these properties afterwards
              //        'com.ask-cs.State.Planner':
              //        {
              //          className:'state-unreached',
              //          label:    '- Planner state',
              //          color:    '#65619b',
              //          type:     'Niet Beschikbaar',
              //          display:  true,
              //          minRole:  1
              //        },
              //        'com.ask-cs.State.TeamLeader':
              //        {
              //          className:'state-unreached',
              //          label:    '- Team leader state',
              //          color:    '#65619b',
              //          type:     'Niet Beschikbaar',
              //          display:  true,
              //          minRole:  2
              //        },
              //        'com.ask-cs.State.Standard':
              //        {
              //          className:'state-unreached',
              //          label:    '- Standard state',
              //          color:    '#65619b',
              //          type:     'Niet Beschikbaar',
              //          display:  true,
              //          minRole:  3
              //        },
              //        'com.ask-cs.State.Viewer':
              //        {
              //          className:'state-unreached',
              //          label:    '- Viewer state',
              //          color:    '#65619b',
              //          type:     'Niet Beschikbaar',
              //          display:  true,
              //          minRole:  4
              //        }
              //      });

              angular.forEach(
                $scope.timeline.config.states,
                function (state, key) {
                  // show only user editable states
                  if (state.display && $rootScope.app.resources.role <= state.minRole) {
                    states[key] = state.label;
                  }
                }
              );

              $scope.states = states;
            }
          );


          /**
           * Groups for drop down
           */
          $scope.groups = groups;


          /**
           * Groups for drop down
           */
          $scope.divisions = $scope.timeline.config.divisions;

          if ($scope.timeline.config.divisions.length > 0) {
            if ($scope.divisions[0].id !== 'all') {
              $scope.divisions.unshift(
                {
                  id: 'all',
                  label: 'Alle divisies'
                }
              );
            }

            $scope.groupPieHide = {};

            angular.forEach(
              $scope.divisions,
              function (division) {
                $scope.groupPieHide[division.id] = false
              }
            );
          }


          /**
           * Reset views for default views
           */
          $scope.resetViews = function () {
            $scope.views = {
              slot: {
                add: false,
                edit: false
              },
              group: false,
              wish: false,
              member: false
            };
          };

          $scope.resetViews();


          /**
           * Reset planboard views
           */
          $rootScope.$on(
            'resetPlanboardViews',
            function () {
              $scope.resetViews()
            }
          );


          /**
           * Slot form toggle
           */
          $scope.toggleSlotForm = function () {
            if ($scope.views.slot.add) {
              $rootScope.planboardSync.start();

              $scope.resetInlineForms();
            }
            else {
              $rootScope.planboardSync.clear();

              /**
               * Broadcast for slot initials
               */
              $rootScope.$broadcast('slotInitials');

              $scope.resetViews();

              $scope.views.slot.add = true;
            }
          };


          /**
           * Reset inline forms
           */
          $scope.resetInlineForms = function () {
            $scope.slot = {};

            $scope.original = {};

            $scope.resetViews();
          };


          /**
           * Send shortage message
           */
          $scope.sendShortageMessage = function (slot) {
            $rootScope.statusBar.display($rootScope.ui.planboard.preCompilingStortageMessage);

            Storage.session.add(
              'escalation',
              angular.toJson(
                {
                  group: slot.group,
                  start: {
                    date: slot.start.date,
                    time: slot.start.time
                  },
                  end: {
                    date: slot.end.date,
                    time: slot.end.time
                  },
                  diff: slot.diff
                }
              )
            );

            $location.path('/messages').search({ escalate: true }).hash('compose');
          };

        }
      ]);


  }
);
define(['controllers/controllers'], function (controllers) {
  'use strict';

  controllers.controller('planboard', function ($rootScope, $scope, $q, $window, $location, data, Slots, Dater, $timeout, Store) {
    $rootScope.notification.status = false;

    $rootScope.fixStyles();

    $scope.self = this;

    $scope.data = data;

    var groups = Store('network').get('groups'),
      settings = angular.fromJson(Store('user').get('resources').settingsWebPaige),
      groupId,
      validGroup = false;

    _.each(groups, function (_group) {
      if (_group.uuid == settings.app.group) {
        validGroup = true
      }
    });

    groupId = (validGroup) ? settings.app.group : groups[0].uuid;

    $scope.current = {
      layouts: {
        user: true,
        group: true,
        members: false
      },
      day: Dater.current.today() + 1,
      week: Dater.current.week(),
      month: Dater.current.month(),
      year: Dater.current.year(),
      group: groupId,
      division: 'all'
    };

    $scope.periods = Dater.getPeriods();
    $scope.periodsNext = Dater.getPeriods(true);

    $scope.slot = {};


    var stamps = (Dater.current.today() > 360) ? {
      start: $scope.periods.days[358].last.timeStamp,
      end: $scope.periods.days[365].last.timeStamp
    } : {
      start: $scope.periods.days[Dater.current.today() - 1].last.timeStamp,
      end: $scope.periods.days[Dater.current.today() + 6].last.timeStamp
    };

    $scope.timeline = {
      id: 'mainTimeline',
      main: true,
      user: {
        id: $rootScope.StandBy.resources.uuid,
        role: $rootScope.StandBy.resources.role
      },
      current: $scope.current,
      options: {
        start: stamps.start,
        end: stamps.end,
        min: stamps.start,
        max: stamps.end
      },
      range: {
        start: stamps.start,
        end: stamps.end
      },
      scope: {
        day: false,
        week: true,
        month: false
      },
      config: {
        bar: $rootScope.StandBy.config.timeline.config.bar,
        layouts: $rootScope.StandBy.config.timeline.config.layouts,
        wishes: $rootScope.StandBy.config.timeline.config.wishes,
        legenda: {},
        legendarer: $rootScope.StandBy.config.timeline.config.legendarer,
        states: $rootScope.StandBy.config.timeline.config.states,
        divisions: $rootScope.StandBy.config.timeline.config.divisions,
        densities: $rootScope.StandBy.config.timeline.config.densities
      }
    };

    if ($.browser.msie && $.browser.version == '8.0') {
      $scope.timeline.options = {
        start: $scope.periods.days[Dater.current.today()].last.timeStamp,
        end: $scope.periods.days[Dater.current.today() + 7].last.timeStamp,
        min: $scope.periods.days[Dater.current.today()].last.timeStamp,
        max: $scope.periods.days[Dater.current.today() + 7].last.timeStamp
      };
    }

    _.each($rootScope.StandBy.config.timeline.config.states, function (state, index) {
      $scope.timeline.config.legenda[index] = true
    });

    $scope.timeline.config.legenda.groups = {
      more: true,
      even: true,
      less: true
    };

    $scope.daterange = Dater.readable.date($scope.timeline.range.start) + ' / ' +
      Dater.readable.date($scope.timeline.range.end);


    $timeout(function () {
      var states = {};

      _.each($scope.timeline.config.states, function (state, key) {
        // show only user editable states
        if (state && state.display && $rootScope.StandBy.resources.role <= state.minRole) {
          states[key] = state.label;
        }
      });

      $scope.states = states;
    });

    $scope.groups = groups;

    $scope.divisions = $scope.timeline.config.divisions;

    if ($scope.timeline.config.divisions.length > 0) {
      if ($scope.divisions[0].id !== 'all') {
        $scope.divisions.unshift({
          id: 'all',
          label: 'Alle divisies'
        });
      }

      $scope.groupPieHide = {};

      _.each($scope.divisions, function (division) {
        $scope.groupPieHide[division.id] = false
      });
    }

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

    $rootScope.$on('resetPlanboardViews', function () {
      $scope.resetViews()
    });

    $scope.toggleSlotForm = function () {
      if ($scope.views.slot.add) {
        $rootScope.planboardSync.start();

        $scope.resetInlineForms();
      } else {
        $rootScope.planboardSync.clear();

        $rootScope.$broadcast('slotInitials');

        $scope.resetViews();

        $scope.views.slot.add = true;
      }
    };

    $scope.resetInlineForms = function () {
      $scope.slot = {};

      $scope.original = {};

      $scope.resetViews();
    };

    $scope.sendShortageMessage = function (slot) {
      $rootScope.statusBar.display($rootScope.ui.planboard.preCompilingStortageMessage);

      Store('environment').save('escalation', {
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
      });

      $location.path('/messages').search({ escalate: true }).hash('compose');
    };

  });
});
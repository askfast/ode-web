define(
  ['controllers/controllers', 'config'],
  function (controllers, config) {
    'use strict';

    controllers.controller(
      'presence', function ($scope, $rootScope, $q, $window, $location, $timeout, Dashboard, Dater, Settings, Profile, Groups, Announcer, Network, Slots, Store, $http) {
          $rootScope.notifier.destroy();

          if (!$http.defaults.headers.common['X-SESSION_ID']) {
            var session = Store('session').get('sessionId');

            $http.defaults.headers.common['X-SESSION_ID'] = session.id;
          }

          /**
           * Fix styles
           */
          $rootScope.fixStyles();

          $('.navbar').hide();
          $('#footer').hide();

          $('#watermark').css({ bottom: '-10px' });

          var groups = Store('network').get('groups');

          var settings = angular.fromJson(Store('user').get('resources').settingsWebPaige);

          var filteredGroups = [];

          var groupOrder = ["Hoofd BHV","BHV Ploegleider","BHV'er","EHBO'er"];

          $scope.loadingPresence = true;

          _.each(groups, function (group) {
            if (group.uuid != 'all') {
              filteredGroups.push(group);
            }
          });

          var members = Store('network').get('unique');

          var presencePerGroup = function (present) {
            var presentGroups = {};
            var sortedGroups = [];
            var otherGroups = [];

            _.each(present, function (member){
              if (!member.resources.groups) {
                  if (typeof presentGroups["ungrouped"] == 'undefined'){
                    presentGroups["ungrouped"] = [];
                  }

                  presentGroups["ungrouped"].push(member);
              }
              else {
                _.each(groups, function (group){
                  if (member.resources.groups[0].uuid === group.uuid){
                    if (typeof presentGroups[group.name] == 'undefined'){
                      presentGroups[group.name] = [];
                    }

                    member.resources.groups[0].name = group.name;

                    presentGroups[group.name].push(member);
                  }
                });
              }
            });

            _.each(presentGroups, function (group, name){
              if (groupOrder.indexOf(name) !== -1) {
                sortedGroups[groupOrder.indexOf(name)] = group;
              }
              else {
                otherGroups.push(group);
              }
            });

            otherGroups.sort();

            _.each(otherGroups, function (group){
              sortedGroups.push(group);
            });

            sortedGroups = _.compact(sortedGroups);

            return sortedGroups;
          }

          $scope.checkPresence = function () {
            var _members = Store('network').get('unique');
            var members = $scope.availability.members.available;
            var present = [];

            _.each(members, function(member){
              _.each(_members,function(_member){
                if (member.uuid === _member.uuid) {
                  member.resources = _member.resources;
                }
              });
              if (member.resources){
              // if (member.resources && member.resources.currentPresence){
                // console.log(member.name + " is present");
                // console.log("Presence = " + member.resources.currentPresence.toString());
                if (member.resources.groups && member.resources.groups.length > 1) {
                  member.resources.groups = member.resources.groups.slice(0,1);
                }

                present.push(member);
              }
            });

            $scope.loadingPresence = false;
            $scope.present = presencePerGroup(present);
          };

          // $scope.checkPresence();

          $window.setInterval(
            function () {
              // console.log($scope.availability.members.available);
              // console.log($scope.present);
              // Network.population().then(function(result){
              $scope.getGroupAvailability()
              .then($scope.checkPresence(), function(){});
              // });
          }, 5000);
          // }, $rootScope.StandBy.config.timers.TV_SYNC);

          $window.setInterval(
            function () {
              Network.population();
          }, 7500);
          // Remove below after FALCK DEMO
          //=============================================

          var initGroup;

          groups.unshift({
            'name': $rootScope.ui.dashboard.everyone,
            'uuid': 'all'
          });

          initGroup = 'all';

          $scope.groups = groups;

          $scope.states = $rootScope.StandBy.config.timeline.config.states;

          $scope.states['no-state'] = {
            className: 'no-state',
            label: $rootScope.ui.dashboard.possiblyAvailable,
            color: '#ececec',
            type: $rootScope.ui.dashboard.noPlanning,
            display: false
          };

          $scope.divisions = $rootScope.StandBy.environment.divisions || [];

          if ($scope.divisions.length > 0) {
            if ($scope.divisions[0].id !== 'all') {
              $scope.divisions.unshift({
                id: 'all',
                label: $rootScope.ui.dashboard.allDivisions
              });
            }
          }

          $scope.current = {
            group: initGroup,
            division: 'all'
          };

          $scope.loadingAvailability = true;

          $scope.getAvailability = function (groupID, divisionID) {
            if (!groupID) {
              groupID = $scope.current.group;
            }

            if (!divisionID) {
              divisionID = $scope.current.division;
            }

            var deferred = $q.defer();

            Slots.getMemberAvailabilities(groupID, divisionID).then(function (results) {
              var ordered = {};

              _.each(angular.fromJson(angular.toJson(results.members)), function (slots, id) {
                if (members[id] &&
                  (members[id].resources.role != 0 && members[id].resources.role != 4)) {
                  var _member = {
                    id: id,
                    uuid: id,
                    state: (slots.length > 0) ? slots[0].state : 'no-state',
                    label: (slots.length > 0) ? $scope.states[slots[0].state].label[0] : '',
                    end: (slots.length > 0 && slots[0].end !== undefined) ?
                      slots[0].end * 1000 :
                      $rootScope.ui.dashboard.possiblyAvailable,
                    name: (members && members[id]) ?
                      members[id].resources.firstName + ' ' + members[id].resources.lastName :
                      id,
                    resources: members[id].resources
                  };

                  if (slots.length > 0) {
                    if (!ordered.available)
                      ordered.available = [];

                    if (!ordered.unavailable)
                      ordered.unavailable = [];

                    if (slots[0].state == 'com.ask-cs.State.Unreached') {
                      ordered.unavailable.push(_member);
                    } else if (slots[0].state == 'com.ask-cs.State.Unavailable') {
                      ordered.unavailable.push(_member);
                    } else {
                      if (slots[0].state == 'com.ask-cs.State.Available') {
                        _member.style = 'sa-icon-reserve-available';
                      }

                      if (slots[0].state == 'com.ask-cs.State.KNRM.BeschikbaarNoord') {
                        _member.style = 'sa-icon-reserve-available-north';
                      }

                      if (slots[0].state == 'com.ask-cs.State.KNRM.BeschikbaarZuid') {
                        _member.style = 'sa-icon-reserve-available-south';
                      }

                      if (slots[0].state == 'com.ask-cs.State.KNRM.SchipperVanDienst') {
                        _member.style = 'sa-icon-reserve-available-schipper';
                      }

                      ordered.available.push(_member);
                    }
                  } else {
                    if (!ordered.possible) {
                      ordered.possible = [];
                    }

                    ordered.possible.push(_member);
                  }
                }
              });

              $scope.loadingAvailability = false;

              var sortByEnd = function (a, b) {
                if (a.end < b.end) {
                  return -1;
                }

                if (a.end > b.end) {
                  return 1;
                }

                return 0;
              };

              if (ordered.hasOwnProperty('available')) {
                ordered.available.sort(sortByEnd);
              }

              if (ordered.hasOwnProperty('unavailable')) {
                ordered.unavailable.sort(sortByEnd);
              }

              var _availables = [];

              _.each(ordered.available, function (available) {
                if (available.state == 'com.ask-cs.State.KNRM.SchipperVanDienst') {
                  _availables.push(available);
                }
              });

              _.each(ordered.available, function (available) {
                if (available.state == 'com.ask-cs.State.Available') {
                  _availables.push(available);
                }
              });

              _.each(ordered.available, function (available) {
                if (available.state == 'com.ask-cs.State.KNRM.BeschikbaarNoord') {
                  _availables.push(available);
                }
              });

              _.each(ordered.available, function (available) {
                if (available.state == 'com.ask-cs.State.KNRM.BeschikbaarZuid') {
                  _availables.push(available);
                }
              });

              ordered.available = _availables;
              $scope.availability = {
                members: ordered,
                synced: results.synced * 1000
              };

              deferred.resolve();
            }, function(result) {
              //Bad request, don't do anything
              deferred.reject
            });

            return deferred.promise;
          };

          $scope.getGroupAvailability = function () {
            $scope.current.division = 'all';

            var deferred = $q.defer();

            $scope.getAvailability($scope.current.group, $scope.current.division)
            .then(function(){deferred.resolve()}, function(){deferred.reject()});

            return deferred.promise;
          };

          $scope.getDivisionAvailability = function () {
            $scope.getAvailability($scope.current.group, $scope.current.division);
          };

          $scope.getGroupAvailability();
        }
      );
  }
);
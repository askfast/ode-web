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

          $scope.loadingPresence = true;

          _.each(groups, function (group) {
            if (group.uuid != 'all') {
              filteredGroups.push(group);
            }
          });

          var members;

          var presencePerGroup = function (present) {
            var presentGroups = {};

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
                    if (typeof presentGroups[group.uuid] == 'undefined'){
                      presentGroups[group.uuid] = [];
                    }

                    member.resources.groups[0].name = group.name;

                    presentGroups[group.uuid].push(member);
                  }
                });
              }

            });

            return presentGroups;
          }

          $scope.checkPresence = function () {
            members = Store('network').get('unique');
            var present = [];
            _.each(members, function(member){
              if (member.resources && member.resources.currentPresence){
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

          $scope.checkPresence();

          $window.setInterval(
            function () {
              Network.population().then(function(result){
                $scope.checkPresence();
              });
          // }, 15000);
          }, $rootScope.StandBy.config.timers.TV_SYNC);


        }
      );
  }
);
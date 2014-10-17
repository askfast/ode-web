define(
  ['controllers/controllers', 'config'],
  function (controllers, config) {
    'use strict';

    controllers.controller(
      'tv',
      [
        '$scope',
        '$rootScope',
        '$q',
        '$window',
        '$location',
        'Dashboard',
        'Dater',
        'Settings',
        'Profile',
        'Groups',
        'Announcer',
        'Store',
        '$http',
        function ($scope, $rootScope, $q, $window, $location, Dashboard, Dater, Settings, Profile, Groups, Announcer, Store, $http) {
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

          /**
           * Defaults for loaders
           */
          $scope.loading = {
            alerts: true,
            smartAlarm: true
          };

          /**
           * Default values for synced pointer values
           */
          $scope.synced = {
            alarms: new Date().getTime()
          };


          /**
           * Process Smart Alarm team members for view
           */
          function prepareSaMembers(setup) {
            var cached = Store('smartAlarm').get('guard');

            $scope.saMembers = {
              truck: [],
              reserves: []
            };

            $scope.saSynced = cached.synced;

            _.each(
              setup.selection, function (selection) {
                function translateName(user) {
                  return (user !== null) ? setup.users[user].name : 'Niet ingedeeld'
                }

                var saClass = (selection.user==null ? 'sa-icon-not-assigned' : null);

                switch (selection.role) {
                  case 'bevelvoerder':
                    $scope.saMembers.truck.push(
                      {
                        rank: 1,
                        icon: 'B',
                        role: 'Bevelvoerder',
                        class: (selection.user==null ? 'sa-icon-not-assigned' : 'sa-icon-commander'),
                        name: translateName(selection.user)
                      });
                    break;

                  case 'chauffeur':
                    $scope.saMembers.truck.push(
                      {
                        rank: 0,
                        icon: 'C',
                        role: 'Chauffeur',
                        class: (selection.user==null ? 'sa-icon-not-assigned' : 'sa-icon-driver'),
                        name: translateName(selection.user)
                      });
                    break;

                  case 'manschap.1':
                    $scope.saMembers.truck.push(
                      {
                        rank: 2,
                        icon: 'M1',
                        role: 'Manschap 1',
                        name: translateName(selection.user),
                        class : saClass
                      });
                    break;

                  case 'manschap.2':
                    $scope.saMembers.truck.push(
                      {
                        rank: 3,
                        icon: 'M2',
                        role: 'Manschap 2',
                        name: translateName(selection.user),
                        class : saClass
                      });
                    break;

                  case 'manschap.3':
                    $scope.saMembers.truck.push(
                      {
                        rank: 4,
                        icon: 'M3',
                        role: 'Manschap 3',
                        name: translateName(selection.user),
                        class : saClass
                      });
                    break;

                  case 'manschap.4':
                    $scope.saMembers.truck.push(
                      {
                        rank: 5,
                        icon: 'M4',
                        role: 'Manschap 4',
                        name: translateName(selection.user),
                        class : saClass
                      });
                    break;
                }

                var reserves = {};

                var states = ['available', 'unavailable', 'noplanning'];

                _.each(
                  states, function (state) {
                    reserves[state] = [];

                    _.each(
                      setup.reserves[state], function (member) {
                        _.each(
                          member, function (meta, userID) {
                            reserves[state].push(
                              {
                                id: userID,
                                name: meta.name,
                                state: meta.state
                              });
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
          Groups.query()
            .then(
            function (groups) {
              var calls = [];

              _.each(
                groups, function (group) {
                  calls.push(Groups.get(group.uuid));
                });

              $q.all(calls)
                .then(
                function () {
                  Groups.uniqueMembers();

                  var guard = Store('smartAlarm').get('guard');

                  if (guard && guard.selection) {
                    $scope.loading.smartAlarm = false;

                    prepareSaMembers(Store('smartAlarm').get('guard'));
                  }


                  Groups.guardMonitor()
                    .then(
                    function () {
                      Groups.guardRole()
                        .then(
                        function (setup) {
                          prepareSaMembers(setup);
                        });
                    });
                });
            });


          /**
           * Fetcher for p2000 alarm messages
           */
          $scope.getP2000 = function () {
            Dashboard.p2000().
              then(
              function (result) {
                $scope.loading.alerts = false;

                $scope.alarms = result.alarms;

                $scope.alarms.list = $scope.alarms.short;

                $scope.synced.alarms = result.synced;
              });
          };


          $window.setInterval(
            function () {
              $scope.$apply()
              {
                $scope.getP2000();

                var guard = Store('smartAlarm').get('guard');

                if (guard && guard.selection) {
                  prepareSaMembers(Store('smartAlarm').get('guard'));
                }

                Groups.guardRole()
                  .then(
                  function (setup) {
                    prepareSaMembers(setup);
                  });
              }
            }, $rootScope.StandBy.config.timers.TV_SYNC);


          /**
           * Get alarms for the first time
           */
          $.ajax(
            {
              url: $rootScope.StandBy.config.profile.p2000.url,
              dataType: 'json',
              success: function (results) {
                $rootScope.statusBar.off();

                var processed = Announcer.process(results, true);

                var result = {
                  alarms: processed,
                  synced: new Date().getTime()
                };

                $scope.$apply(
                  function () {
                    $scope.loading.alerts = false;

                    $scope.alarms = result.alarms;

                    $scope.alarms.list = $scope.alarms.short;

                    $scope.synced.alarms = result.synced;
                  });
              },
              error: function () {
                console.log('ERROR with getting p2000 for the first time!');
              }
            });

        }
      ]);
  }
);
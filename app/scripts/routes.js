define(['app'], function (app) {
  'use strict';

  app.config(function ($locationProvider, $routeProvider, $httpProvider) {

    $routeProvider
      .when('/login', {
        templateUrl: 'views/login.html',
        controller: 'login'
      })

      .when('/logout', {
        templateUrl: 'views/logout.html',
        controller: 'logout'
      })

      .when('/dashboard', {
        templateUrl: 'views/dashboard.html',
        controller: 'dashboard'
      })

      .when('/tv', {
        templateUrl: 'views/tv.html',
        controller: 'tv',
        resolve: {
          data: function ($route, $http) {
            if ($route.current.params.sessionID) {
              $http.defaults.headers.common['X-SESSION_ID'] = $route.current.params.sessionID;
            }
          }
        }
      })

      .when('/planboard', {
        templateUrl: 'views/planboard.html',
        controller: 'planboard',
        resolve: {
          data: function ($route, Slots, Storage, Dater, Store) {
            var periods = Store('app').get('periods'),
              settings = angular.fromJson(Store('user').get('resources').settingsWebPaige),
              groups = Store('network').get('groups'),
              groupId,
              validGroup = false;

            _.each(groups, function (_group) {
              if (_group.uuid == settings.app.group)
                validGroup = true;
            });

            groupId = (validGroup) ? settings.app.group : groups[0].uuid;

            return  Slots.all({
              groupId: groupId,
              stamps: (Dater.current.today() > 360) ? {
                start: periods.days[358].last.timeStamp,
                end: periods.days[365].last.timeStamp
              } : {
                start: periods.days[Dater.current.today() - 1].last.timeStamp,
                end: periods.days[Dater.current.today() + 6].last.timeStamp
              },
              month: Dater.current.month(),
              layouts: {
                user: true,
                group: true,
                members: false
              }
            });
          }
        },
        reloadOnSearch: false
      })

      .when('/messages', {
        templateUrl: 'views/messages.html',
        controller: 'messages',
        resolve: {
          data: function (Messages) {
            return Messages.query();
          }
        },
        reloadOnSearch: false
      })

      .when('/groups', {
        templateUrl: 'views/groups.html',
        controller: 'groups',
        resolve: {
          data: function (Groups) {
            return Groups.query();
          }
        },
        reloadOnSearch: false
      })

      .when('/profile/:userId', {
        templateUrl: 'views/profile.html',
        controller: 'profile',
        resolve: {
          data: function ($rootScope, Profile, $route, Dater, Store) {
            if ($route.current.params.userId.toLowerCase() != $rootScope.StandBy.resources.uuid) {
              var periods = Store('app').get('periods');
              //var periods = angular.fromJson(localStorage.getItem('WebPaige.periods'));

              return Profile.getWithSlots($route.current.params.userId.toLowerCase(), false, {
                start: periods.weeks[Dater.current.week()].first.timeStamp / 1000,
                end: periods.weeks[Dater.current.week()].last.timeStamp / 1000
              });
            } else {
              return Profile.get($route.current.params.userId.toLowerCase(), false);
            }
          }
        },
        reloadOnSearch: false
      })

      .when('/profile', {
        templateUrl: 'views/profile.html',
        controller: 'profile',
        resolve: {
          data: function ($rootScope, $route, $location) {
            if (!$route.current.params.userId || !$location.hash())
              $location.path('/profile/' + $rootScope.StandBy.resources.uuid).hash('profile');
          }
        }
      })

      .when('/settings', {
        templateUrl: 'views/settings.html',
        controller: 'settings',
        resolve: {
          data: function (Settings) {
            return angular.fromJson(Settings.get());
          }
        }
      })

      .when('/faq', {
        templateUrl: 'views/faq.html',
        controller: 'faq'
      })

      .when('/help', {
        templateUrl: 'views/help.html',
        controller: 'help'
      })

      .otherwise({ redirectTo: '/login' });


    $httpProvider.interceptors.push(function ($q, Log, $location, Store) {
      return {
        request: function (config) {
          return config || $q.when(config);
        },
        requestError: function (rejection) {
          return $q.reject(rejection);
        },
        response: function (response) {
          return response || $q.when(response);
        },
        responseError: function (rejection) {
              if (rejection.status == 403) {
                Store('environment').remove('sessionTimeout');
                //localStorage.setItem('sessionTimeout', '');
                $location.path('/logout');
                window.location.href = 'logout.html';
              }
          return $q.reject(rejection);
        }
      };
    });
  });
});
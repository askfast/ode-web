/*jslint node: true */
/*global angular */
'use strict';


/**
 * Providers & Routes
 */
angular.module('WebPaige')
  .config(
  [
    '$locationProvider', '$routeProvider', '$httpProvider',
    function ($locationProvider, $routeProvider, $httpProvider)
    {
      /**
       * Login router
       */
      $routeProvider
        .when(
        '/login',
        {
          templateUrl: 'dist/views/login.html',
          controller: 'login'
        })


      /**
       * Logout router
       */
        .when(
        '/logout',
        {
          templateUrl: 'dist/views/logout.html',
          controller: 'logout'
        })


      /**
       * Dashboard router
       */
        .when(
        '/dashboard',
        {
          templateUrl: 'dist/views/dashboard.html',
          controller: 'dashboard'
        })


      /**
       * TV Monitor / Dashboard router
       */
        .when(
        '/tv',
        {
          templateUrl: 'dist/views/tv.html',
          controller: 'tv',
          resolve: {
            data: [
              '$route', '$http',
              function ($route, $http)
              {
                if ($route.current.params.sessionID)
                {
                  $http.defaults.headers.common['X-SESSION_ID'] = $route.current.params.sessionID;
                }
              }
            ]
          }
        })


      /**
       * Planboard router
       */
        .when(
        '/planboard',
        {
          templateUrl: 'dist/views/planboard.html',
          controller: 'planboard',
          resolve: {
            data: [
              '$route', 'Slots', 'Storage', 'Dater',
              function ($route, Slots, Storage, Dater)
              {
                var periods = Storage.local.periods(),
                    settings = Storage.local.settings();

                var stamps = {};

                if (Dater.current.today() > 360)
                {
                  stamps = {
                    start: periods.days[358].last.timeStamp,
                    end: periods.days[365].last.timeStamp
                  }
                }
                else
                {
                  stamps = {
                    start: periods.days[Dater.current.today() - 1].last.timeStamp,
                    end: periods.days[Dater.current.today() + 6].last.timeStamp
                  }
                }

                return  Slots.all(
                  {
                    groupId: settings.app.group,
                    stamps: stamps,
                    month: Dater.current.month(),
                    layouts: {
                      user: true,
                      group: true,
                      members: false
                    }
                  });
              }
            ]
          },
          reloadOnSearch: false
        })


      /**
       * Messages router
       */
        .when(
        '/messages',
        {
          templateUrl: 'dist/views/messages.html',
          controller: 'messages',
          resolve: {
            data: [
              '$route', 'Messages',
              function ($route, Messages) { return Messages.query() }
            ]
          },
          reloadOnSearch: false
        })


      /**
       * Groups router
       */
        .when(
        '/groups',
        {
          templateUrl: 'dist/views/groups.html',
          controller: 'groups',
          resolve: {
            data: [
              'Groups',
              function (Groups)
              {
                return Groups.query();
              }
            ]
          },
          reloadOnSearch: false
        })


      /**
       * Profile (user specific) router
       */
        .when(
        '/profile/:userId',
        {
          templateUrl: 'dist/views/profile.html',
          controller: 'profile',
          resolve: {
            data: [
              '$rootScope', 'Profile', '$route',
              function ($rootScope, Profile, $route)
              {
                if ($route.current.params.userId.toLowerCase() != $rootScope.app.resources.uuid)
                {
                  // IE route fix
                  var firstOfJanuary = new Date(new Date().getFullYear(), 0, 1);

                  var periods = angular.fromJson(localStorage.getItem('WebPaige.periods')),
                      current = Math.ceil((((new Date() - firstOfJanuary) / 86400000) + firstOfJanuary.getDay() + 1) / 7);

                  return Profile.getWithSlots(
                    $route.current.params.userId.toLowerCase(),
                    false,
                    {
                      start: periods.weeks[current].first.timeStamp / 1000,
                      end: periods.weeks[current].last.timeStamp / 1000
                    }
                  );
                }
                else
                {
                  return Profile.get($route.current.params.userId.toLowerCase(), false);
                }
              }
            ]
          },
          reloadOnSearch: false
        })


      /**
       * Profile (user hiself) router
       */
        .when(
        '/profile',
        {
          templateUrl: 'dist/views/profile.html',
          controller: 'profile',
          resolve: {
            data: [
              '$rootScope', '$route', '$location',
              function ($rootScope, $route, $location)
              {
                if (! $route.current.params.userId || ! $location.hash())
                {
                  $location.path('/profile/' + $rootScope.app.resources.uuid).hash('profile');
                }
              }
            ]
          }
        })


      /**
       * Settings router
       */
        .when(
        '/settings',
        {
          templateUrl: 'dist/views/settings.html',
          controller: 'settings',
          resolve: {
            data: [
              'Settings',
              function (Settings)
              {
                return angular.fromJson(Settings.get());
              }
            ]
          }
        })


      /**
       * Help router
       */
        .when(
        '/help',
        {
          templateUrl: 'dist/views/help.html',
          controller: 'help'
        })


      /**
       * Router fallback
       */
        .otherwise(
        {
          redirectTo: '/login'
        });


      /**
       * Define interceptor
       */
      $httpProvider.responseInterceptors.push('Interceptor');
    }
  ]);
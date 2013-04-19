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
    .when('/login',
    {
      templateUrl: 'js/views/login.html',
      controller: 'login' 
    })

    /**
     * Logout router
     */
    .when('/logout',
    { 
      templateUrl: 'js/views/logout.html',
      controller: 'logout'
    })

    /**
     * Dashboard router
     */
    .when('/dashboard', 
    { 
      templateUrl: 'js/views/dashboard.html',
      controller: 'dashboard',
      // resolve: {
      //   timers:
      //   [
      //     '$rootScope', 'Timer', 'Messages',
      //     function ($rootScope, Timer, Messages)
      //     {
      //       $rootScope.$on('unreadCount', function () 
      //       {
      //         Messages.query();
      //       });

      //       Timer.start('unreadCount', function ()
      //       {
      //         $rootScope.$broadcast('unreadCount');
      //       }, 60);
      //     }
      //   ]
      // }
    })

    /**
     * Planboard router
     */
    .when('/planboard', 
    { 
      templateUrl: 'js/views/planboard.html',
      controller: 'planboard',
      resolve: {
        data: 
        [
          '$route', 'Slots', 'Storage', 'Dater',
          function ($route, Slots, Storage, Dater) 
          {
            var periods = Storage.local.periods(),
                current = Dater.current.week(),
                initial = periods.weeks[current],
                groups  = Storage.local.groups(),
                settings = Storage.local.settings();

            return  Slots.all({
                      groupId:  settings.app.group,
                      division: 'all',
                      stamps: {
                        start:  initial.first.timeStamp,
                        end:    initial.last.timeStamp
                      },
                      month: Dater.current.month(),
                      layouts: {
                        user:     true,
                        group:    true,
                        members:  false
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
    .when('/messages', 
    { 
      templateUrl: 'js/views/messages.html',    
      controller: 'messages',   
      resolve: {
        data: [
          '$route', 'Messages',
          function ($route, Messages) 
          {    
            return Messages.query();
          }
        ]
      }, 
      reloadOnSearch: false
    })

    /**
     * Groups router
     */
    .when('/groups',
    {
      templateUrl: 'js/views/groups.html',
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
    .when('/profile/:userId', 
    { 
      templateUrl: 'js/views/profile.html',
      controller: 'profile',
      resolve: {
        data: [
          '$rootScope', 'Profile', '$route', '$location', 'Dater',
          function ($rootScope, Profile, $route, $location, Dater) 
          {
            if ($route.current.params.userId != $rootScope.app.resources.uuid)
            {
              var periods = Dater.getPeriods(),
                  current = Dater.current.week(),
                  ranges  = {
                    start:  periods.weeks[current].first.timeStamp / 1000,
                    end:    periods.weeks[current].last.timeStamp / 1000,
                  };

              return Profile.getWithSlots($route.current.params.userId, false, ranges);
            }
            else
            {
              return Profile.get($route.current.params.userId, false);
            };
          }
        ]
      },
      reloadOnSearch: false
    })

    /**
     * Profile (user hiself) router
     */
    .when('/profile', 
    { 
      templateUrl: 'js/views/profile.html', 
      controller: 'profile',
      resolve: {
        data: [
          '$rootScope', '$route', '$location',
          function ($rootScope, $route, $location) 
          {
            if (!$route.current.params.userId || !$location.hash())
              $location.path('/profile/' + $rootScope.app.resources.uuid).hash('profile');
          }
        ]
      }
    })

    /**
     * Settings router
     */
    .when('/settings',
    { 
      templateUrl: 'js/views/settings.html',
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
    .when('/help',
    {
      templateUrl: 'js/views/help.html',
      controller: 'help'
    })

    /**
     * Router fallback
     */
    .otherwise({ 
      redirectTo: '/login' 
    });

    /**
     * Define interceptor
     */
    $httpProvider.responseInterceptors.push('Interceptor');
  }
]);
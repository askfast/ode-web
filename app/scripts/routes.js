define(
  ['app'],
  function (app)
  {
    'use strict';


    app.config(
      [
        '$routeProvider',
        function ($routeProvider)
        {
          $routeProvider
            .when('/home',
            {
              templateUrl:  'views/home.html',
              controller:   'home'
            })
            .when('/partial1',
            {
              templateUrl:  'views/partial1.html',
              controller:   'partial1'
            })
            .when('/partial2',
            {
              templateUrl:  'views/partial2.html',
              controller:   'partial2'
            })
            .otherwise({
              redirectTo: '/home'
            });
        }
      ]
    );


  }
);
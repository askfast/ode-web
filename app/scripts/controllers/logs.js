define(['controllers/controllers'], function (controllers) {
  'use strict';

  controllers.controller('logs', function ($scope, $rootScope, $filter, $timeout, data, Logs) {
    $rootScope.fixStyles();

    $scope.data = data;

    $scope.orderBy = function (ordered)
    {
      $scope.ordered = ordered;

      $scope.reversed = ! $scope.reversed;
    };

    $scope.ordered = 'started.stamp';
    $scope.reversed = true;

    $scope.daterange = $filter('date')(data.periods.start, 'dd-MM-yyyy') + ' / ' +
                       $filter('date')(data.periods.end, 'dd-MM-yyyy');

    $rootScope.$on('getLogRange', function () {
      $timeout(function () { 
        $rootScope.statusBar.display('Logs aan het laden..')
      });

      var periods = arguments[1];

      Logs.fetch(periods)
      .then( function (data) {
        $scope.data = data;

        $rootScope.statusBar.off();
      });
    });
  });
});
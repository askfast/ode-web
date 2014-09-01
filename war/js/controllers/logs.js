/*jslint node: true */
/*global angular */
/*global Raphael */
'use strict';


angular.module('WebPaige.Controllers.Logs', [])

  .controller(
  'logs',
  [
    '$scope',
    '$rootScope',
    '$filter',
    'data',
    'Logs',
    function ($scope, $rootScope, $filter, data, Logs)
    {
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

      $rootScope.$on(
        'getLogRange',
        function ()
        {
          var periods = arguments[1];

          Logs.fetch(periods)
            .then(
            function (data)
            {
              $scope.data = data;
            }
          );
        }
      );
    }
  ]);
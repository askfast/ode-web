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
    'data',
    'Logs',
    function ($scope, $rootScope, data, Logs)
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
    }
  ]);
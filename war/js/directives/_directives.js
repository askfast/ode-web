/*jslint node: true */
/*global angular */
/*global $ */
'use strict';


angular.module('WebPaige.Directives', ['ngResource'])


/**
 * Chosen
 */
  .directive(
  'chosen',
  function ()
  {
    return {
      restrict: 'A',
      link: function (scope, element, attr)
      {
        scope.$watch(
          'receviersList',
          function () { element.trigger('liszt:updated') }
        );

        scope.$watch(
          'message.receviers',
          function () { $(element[0]).trigger('liszt:updated') }
        );

        element.chosen();
      }
    };
  })


/**
 * Notification item
 */
  .directive(
  'notificationItem',
  function ()
  {
    return {
      restrict: 'E',
      rep1ace: true,
      templateUrl: 'dist/views/messages-scheadule-item.html',
      scope: {
        scheadule: '=',
        days: '='
      },
      link: function (scope, element, attrs)
      {
        // scope.s = angular.extend({}, scope.scheadule);
        scope.s = scope.scheadule;

        console.log('s value ->', scope.s);

        scope.remover = function (key) { scope.$parent.$parent.remover(key) };
        
        scope.addNewOffset = function () { scope.$parent.$parent.addNewOffset() }
      }
    };
  })


/**
 * Daterangepicker
 */
  .directive(
  'daterangepicker',
  [
    '$rootScope',
    function ($rootScope)
    {
      return {
        restrict: 'A',

        link: function postLink (scope, element, attrs, controller)
        {
          // var startDate = Date.create().addDays(-6),
          //     endDate   = Date.create();
          //element.val(startDate.format('{MM}-{dd}-{yyyy}') + ' / ' + endDate.format('{MM}-{dd}-{yyyy}'));

          var options = {
            // startDate: startDate,
            // endDate: endDate,
            ranges: {}
          };

          options.ranges[$rootScope.ui.planboard.daterangerToday] = ['today', 'tomorrow'];
          options.ranges[$rootScope.ui.planboard.daterangerTomorrow] = ['tomorrow', new Date.today().addDays(2)];
          options.ranges[$rootScope.ui.planboard.daterangerYesterday] = ['yesterday', 'today'];
          options.ranges[$rootScope.ui.planboard.daterangerNext3Days] = ['today', new Date.create().addDays(3)];
          options.ranges[$rootScope.ui.planboard.daterangerNext7Days] = ['today', new Date.create().addDays(7)];

          element.daterangepicker(
            options,
            function (start, end)
            {
              scope.$apply(
                function ()
                {
                  var diff = end.getTime() - start.getTime();

                  scope.timeline.scope = {
                    day: false,
                    week: false,
                    month: false
                  };

                  // Scope is a day
                  if (diff <= 86400000) { scope.timeline.scope.day = true }
                  // Scope is less than a week
                  else if (diff < 604800000) { scope.timeline.scope.week = true }
                  // Scope is more than a week
                  else if (diff > 604800000) { scope.timeline.scope.month = true }

                  var periods = {
                    start: start,
                    end: start
                  };

                  scope.timeline.range = periods;

                  $rootScope.$broadcast('timeliner', periods);
                }
              );
            }
          );

          // Set data toggle
          element.attr('data-toggle', 'daterangepicker');

          // TODO: Investigate if its really needed!!
          element.daterangepicker({ autoclose: true });
        }
      };
    }
  ]);
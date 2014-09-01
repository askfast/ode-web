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
  function ($compile)
  {
    return {
      restrict: 'E',
      rep1ace: true,
      templateUrl: 'dist/views/messages-scheadule-item.html',
      scope: {
        scheadule: '='
      },
      link: function (scope, element, attrs)
      {
        /**
         * Pass the scheadule data
         */
          // scope.s = angular.extend({}, scope.scheadule);
        scope.s = scope.scheadule;

        // element.html(template).show();
        // $compile(element.contents())(scope);

        /**
         * Serve to the controller
         */
        scope.remover = function (key)
        {
          // console.log('coming to remover');

          scope.$parent.$parent.remover(key);
        };
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

          // lose this sugerJs related stuff later on!
          //          options.ranges[$rootScope.ui.planboard.daterangerToday] = ['today', 'tomorrow'];
          //          options.ranges[$rootScope.ui.planboard.daterangerTomorrow] = ['tomorrow', new Date.today().addDays(2)];
          //          options.ranges[$rootScope.ui.planboard.daterangerYesterday] = ['yesterday', 'today'];
          //          options.ranges[$rootScope.ui.planboard.daterangerNext3Days] = ['today', new Date.create().addDays(3)];
          //          options.ranges[$rootScope.ui.planboard.daterangerNext7Days] = ['today', new Date.create().addDays(7)];

          options.ranges[$rootScope.ui.planboard.daterangerToday] = [
            new Date.today(),
            new Date.today().addDays(1)
          ];

          options.ranges[$rootScope.ui.planboard.daterangerTomorrow] = [
            new Date.today().addDays(1),
            new Date.today().addDays(2)
          ];

          options.ranges[$rootScope.ui.planboard.daterangerYesterday] = [
            new Date.today().addDays(- 1),
            new Date.today()
          ];

          options.ranges[$rootScope.ui.planboard.daterangerNext3Days] = [
            new Date.today(),
            new Date.create().addDays(3)
          ];
          options.ranges[$rootScope.ui.planboard.daterangerNext7Days] = [
            new Date.today(),
            new Date.create().addDays(7)
          ];

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
                  if (diff <= 86400000)
                  {
                    scope.timeline.scope.day = true;
                  }
                  // Scope is less than a week
                  else if (diff < 604800000)
                  {
                    scope.timeline.scope.week = true;
                  }
                  // Scope is more than a week
                  else if (diff > 604800000)
                  {
                    scope.timeline.scope.month = true;
                  }

                  var periods = {
                    start: start,
                    end: end
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
  ])


/**
 * Download mobile app
 */
  .directive(
  'downloadMobileApp',
  function ()
  {
    return {
      restrict: 'E',
      rep1ace: true,
      templateUrl: 'dist/views/download-mobile-app.html',
      link: function (scope, element, attrs)
      {
        scope.upwards = $.browser.mobile && $.browser.screen.width < 768;

        if ($.browser.mozilla && $.browser.version == '11.0')
        {
          angular.element('.download-button')
            .css(
            {
              paddingLeft: '25px'
            }
          );
        }
      }
    };

  })


/**
 * Daterangepicker for logs
 */
  .directive(
  'logRanger',
  [
    '$rootScope',
    function ($rootScope)
    {
      return {
        restrict: 'A',

        link: function postLink (scope, element, attrs, controller)
        {
          var options = {
            ranges: {}
          };

          options.ranges['Vandaag'] = [
            new Date.today(),
            new Date.today().addDays(1)
          ];

          options.ranges['Gisteren'] = [
            new Date.today().addDays(- 1),
            new Date.today()
          ];

          options.ranges['Laatste 7 dagen'] = [
            new Date.today(),
            new Date.create().addDays(- 7)
          ];

          element.daterangepicker(
            options,
            function (start, end)
            {
              scope.$apply(
                function ()
                {
                  $rootScope.$broadcast(
                    'getLogRange',
                    {
                      start: start.getTime(),
                      end: end.getTime()
                    }
                  );
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
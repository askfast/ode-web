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
 * PhoneNumber item
 */
  .directive(
  'phone',
  function ()
  {
    return {
      restrict: 'E',
      //rep1ace: true,
      //templateUrl: 'dist/views/phone-number.html',
      scope: {
        index: '@',
        number: '='
      },
      link: function (scope, element, attrs)
      {
        scope.n = scope.number;

        scope.$watch(
          'n',
          function (newValue, oldValue)
          {
            // console.log('new ->', newValue);
            // console.log('old ->', oldValue);
            scope.number = newValue;
          }
        );

        scope.resetPhoneNumberChecker = function ()
        {
          scope.phoneNumberParsed = {};

          scope.phoneNumberParsed.result = false;
        };

        scope.resetPhoneNumberChecker();

        scope.phoneNumberParser = function (checked)
        {
          if (checked != '')
          {
            if (checked && checked.length > 0)
            {
              var result, all;

              result = all = phoneNumberParser(checked, 'NL');

              scope.phoneNumberParsed.result = true;

              if (result)
              {
//                var error = $rootScope.ui.errors.phone.notValid,
//                    invalidCountry = $rootScope.ui.errors.phone.invalidCountry,
//                    message;

                var error = 'not valid!',
                    invalidCountry = 'invalid country',
                    message;

                if (result.error)
                {
                  scope.phoneNumberParsed = {
                    result: false,
                    message: error
                  };
                }
                else
                {
                  if (! result.validation.isPossibleNumber)
                  {
                    switch (result.validation.isPossibleNumberWithReason)
                    {
                      case 'INVALID_COUNTRY_CODE':
                        message = invalidCountry;
                        break;
                      case 'TOO_SHORT':
                        // message = error + $rootScope.ui.errors.phone.tooShort;
                        message = error + 'too short';
                        break;
                      case 'TOO_LONG':
                        // message = error + $rootScope.ui.errors.phone.tooLong;
                        message = error + 'too long';
                        break;
                    }

                    scope.phoneNumberParsed = {
                      result: false,
                      message: message
                    };
                  }
                  else
                  {
                    if (! result.validation.isValidNumber)
                    {
                      scope.phoneNumberParsed = {
                        result: false,
                        message: error
                      };
                    }
                    else
                    {
                      if (! result.validation.isValidNumberForRegion)
                      {
                        scope.phoneNumberParsed = {
                          result: false,
                          message: invalidCountry
                        };
                      }
                      else
                      {
                        scope.phoneNumberParsed = {
                          result: true,
                          message: 'Validated well!'
//                          message: $rootScope.ui.success.phone.message +
//                                   result.validation.phoneNumberRegion +
//                                   $rootScope.ui.success.phone.as +
//                                   result.validation.getNumberType
                        };

                        $('#inputPhoneNumber-' + scope.index).removeClass('error');
                      }
                    }
                  }
                }
              }

              scope.phoneNumberParsed.all = all;
            }
            else
            {
              scope.phoneNumberParsed.result = true;

              delete scope.phoneNumberParsed.message;

              $('#inputPhoneNumber-' + scope.index).removeClass('error');
            }
          }
        };

        scope.remove = function (index)
        {
          scope.$parent.$parent.removePhoneNumber(index);
        };
      }
    };

  }
)


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

  }
)


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
                  if (diff <= 86400000)
                  { scope.timeline.scope.day = true }
                  // Scope is less than a week
                  else if (diff < 604800000)
                  { scope.timeline.scope.week = true }
                  // Scope is more than a week
                  else if (diff > 604800000)
                  { scope.timeline.scope.month = true }

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
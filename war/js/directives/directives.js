/*jslint node: true */
/*global angular */
/*global $ */
'use strict';


angular.module('WebPaige.Directives', ['ngResource'])


/**
 * Chosen
 */
.directive('chosen',
  function ()
  {
    var linker = function (scope,element,attr)
    {
      scope.$watch('receviersList', function ()
      {
         element.trigger('liszt:updated');
      });

      scope.$watch('message.receviers', function ()
      {
        $(element[0]).trigger('liszt:updated');
      });

      element.chosen();
    };

    return {
      restrict: 'A',
      link:     linker
    };
  }
)


/**
 * Scheadule item
 */
.directive('scheaduleItem',
  function ($compile)
  {
    var templateMain =  '<div class="control-group">' +
                          '<label class="control-label">Scheadules</label>' +
                          '<div class="timer" style="float: left; margin-right: 10px;">' +
                            '<input name="time-start" type="text" ng-model="s.time" bs-timepicker>' +
                            '<i class="icon-time" style="margin-top: -3px;"></i>' +
                          '</div>' +

                          '<ul id="scheadule-days">' +
                            '<li>' +
                              '<label for="monday-{{s.value}}">' +
                                '<input type="checkbox" id="monday-{{s.value}}" ng-model="s.days.mon">&nbsp;Monday' +
                              '</label>' +
                            '</li>' +
                            '<li>' +
                              '<label for="tuesday-{{s.value}}">' +
                                '<input type="checkbox" id="tuesday-{{s.value}}" ng-model="s.days.tue">&nbsp;Tuesday' +
                              '</label>' +
                            '</li>' +
                            '<li>' +
                              '<label for="wednesday-{{s.value}}">' +
                                '<input type="checkbox" id="wednesday-{{s.value}}" ng-model="s.days.wed">&nbsp;Wednesday' +
                              '</label>' +
                            '</li>' +
                            '<li>' +
                              '<label for="thursday-{{s.value}}">' +
                                '<input type="checkbox" id="thursday-{{s.value}}" ng-model="s.days.thu">&nbsp;Thursday' +
                              '</label>' +
                            '</li>' +
                            '<li>' +
                              '<label for="friday-{{s.value}}">' +
                                '<input type="checkbox" id="friday-{{s.value}}" ng-model="s.days.fri">&nbsp;Friday' +
                              '</label>' +
                            '</li>' +
                            '<li>' +
                              '<label for="saturday-{{s.value}}">' +
                                '<input type="checkbox" id="saturday-{{s.value}}" ng-model="s.days.sat">&nbsp;Saturday' +
                              '</label>' +
                            '</li>' +
                            '<li>' +
                              '<label for="sunday-{{s.value}}">' +
                                '<input type="checkbox" id="sunday-{{s.value}}" ng-model="s.days.sun">&nbsp;Sunday' +
                              '</label>' +
                            '</li>' +
                          '</ul>' +

                          // '<div class="btn-group" data-toggle="buttons-radio">' +
                          //   '<button type="button" class="btn {{(s.days.mon) && \'active\'}}" ng-model="s.days.mon" ng-click="s.days.mon == !s.days.mon">Ma</button>' +
                          //   '<button type="button" class="btn {{(s.days.tue) && \'active\'}}" ng-model="s.days.tue" ng-click="s.days.tue == !s.days.tue">Di</button>' +
                          //   '<button type="button" class="btn {{(s.days.wed) && \'active\'}}" ng-model="s.days.wed" ng-click="s.days.wed == !s.days.wed">Wo</button>' +
                          //   '<button type="button" class="btn {{(s.days.thu) && \'active\'}}" ng-model="s.days.thu" ng-click="s.days.thu == !s.days.thu">Do</button>' +
                          //   '<button type="button" class="btn {{(s.days.fri) && \'active\'}}" ng-model="s.days.fri" ng-click="s.days.fri == !s.days.fri">Vr</button>' +
                          //   '<button type="button" class="btn {{(s.days.sat) && \'active\'}}" ng-model="s.days.sat" ng-click="s.days.sat == !s.days.sat">Za</button>' +
                          //   '<button type="button" class="btn {{(s.days.sun) && \'active\'}}" ng-model="s.days.sun" ng-click="s.days.sun == !s.days.sun">Zo</button>' +
                          // '</div>' +

                        '</div>';


    var getTemplate = function ()
    {
      var template = '';

      template = templateMain;

      return template;
    };

    var linker = function (scope, element, attrs)
    {
      scope.s = scope.scheadule;


      // console.log('offset ->', offset, 'max ->', max);
      // console.warn('days ->',     Math.floor(days / day));
      // console.warn('hours ->',    hours, Math.floor(hours / hour));
      // console.warn('minutes ->',  Math.floor(minutes / minute));

      element.html(getTemplate()).show();

      $compile(element.contents())(scope);

      // // scope.s.real = offset;

      scope.$watch(function ()
      {
        var time    = scope.s.time.split(':'),
            hours   = time[0],
            hour    = 1000 * 60 * 60,
            minutes = time[1],
            minute  = 1000 * 60,
            day     = 1000 * 60 * 60 * 24,
            days;

        if (scope.s.days.mon)
        {
          days = 0;
          scope.s.days.mon = true;
        }
        else if (scope.s.days.tue)
        {
          days = 1;
          scope.s.days.tue = true;
        }
        else if (scope.s.days.wed)
        {
          days = 2;
        }
        else if (scope.s.days.thu)
        {
          days = 3;
        }
        else if (scope.s.days.fri)
        {
          days = 4;
        }
        else if (scope.s.days.sat)
        {
          days = 5;
        }
        else if (scope.s.days.sun)
        {
          days = 6;
        }

        // scope.$apply(function ()
        // {
          // scope.scheadule_ = (days * day) + (hours * hour) + (minutes * minute);
        // })
        
      });



    };

    return {
      restrict: 'E',
      rep1ace:  true,
      link:     linker,
      scope: {
        scheadule: '='
      }
    };

  }
)


/**
 * Daterangepicker
 */
.directive('daterangepicker',
[
  '$rootScope',
  function ($rootScope)
  {
    return {
      restrict: 'A',

      link: function postLink(scope, element, attrs, controller)
      {
        // var startDate = Date.create().addDays(-6),
        //     endDate   = Date.create();       
        //element.val(startDate.format('{MM}-{dd}-{yyyy}') + ' / ' + endDate.format('{MM}-{dd}-{yyyy}'));

        element.daterangepicker({
          // startDate: startDate,
          // endDate: endDate,
          ranges: {
            'Today':        ['today', 'tomorrow'],
            'Tomorrow':     ['tomorrow', new Date.today().addDays(2)],
            'Yesterday':    ['yesterday', 'today'],
            'Next 3 Days':  ['today', new Date.create().addDays(3)],
            'Next 7 Days':  ['today', new Date.create().addDays(7)]
          }
        },
        function (start, end)
        {
          scope.$apply(function ()
          {
            var diff = end.getTime() - start.getTime();

            /**
             * Scope is a day
             */
            if (diff <= 86400000)
            {
              scope.timeline.range = {
                start: start,
                end: start
              };
              scope.timeline.scope = {
                day: true,
                week: false,
                month: false
              };
            }
            /**
             * Scope is less than a week
             */
            else if (diff < 604800000)
            {
              scope.timeline.range = {
                start: start,
                end: end
              };
              scope.timeline.scope = {
                day: false,
                week: true,
                month: false
              };
            }
            /**
             * Scope is more than a week
             */
            else if (diff > 604800000)
            {
              scope.timeline.range = {
                start: start,
                end: end
              };
              scope.timeline.scope = {
                day: false,
                week: false,
                month: true
              };
            }

            $rootScope.$broadcast('timeliner', {
              start: start,
              end: end
            });

          });
        });

        /**
         * Set data toggle
         */
        element.attr('data-toggle', 'daterangepicker');

        /**
         * TODO
         * Investigate if its really needed!!
         */
        element.daterangepicker({
          autoclose: true
        });
      }
    };
  }
]);


/**
 * ???
 */
// .directive('wpName', 
// [
//   'Storage', 
//   function (Storage)
//   {
//     return {
//       restrict : 'A',
//       link : function linkfn(scope, element, attrs)
//       {
//         var getmemberName = function (uid)
//         {
//           var members = angular.fromJson(Storage.get('members')),
//               retName = uid;

//           angular.forEach(members , function (mem, i)
//           {
//             if (mem.uuid == uid)
//             {
//               retName = mem.name;

//               return false;
//             };
//           });

//           return retName;
//         };
//         scope.$watch(attrs.wpName, function (uid)
//         {
//           element.text(getmemberName(uid)); 
//         });
//       }
//     }
//   }
// ]);


/**
 * 
 */
// .directive('shortcuts', 
// [
//   '$rootScope', 
//   function ($rootScope)
//   {
//     return {
//       restrict: 'E',
//       template: '<link rel="shortcut icon" ng-href="js/profiles/{{profile}}/img/ico/favicon.ico">' +
//                 '<link rel="apple-touch-icon-precomposed" sizes="144x144" ng-href="js/profiles/{{profile}}/img/ico/apple-touch-icon-144-precomposed.png">' +
//                 '<link rel="apple-touch-icon-precomposed" sizes="114x114" ng-href="js/profiles/{{profile}}/img/ico/apple-touch-icon-114-precomposed.png">' +
//                 '<link rel="apple-touch-icon-precomposed" sizes="72x72"   ng-href="js/profiles/{{profile}}/img/ico/apple-touch-icon-72-precomposed.png">' +
//                 '<link rel="apple-touch-icon-precomposed" sizes="57x57"   ng-href="js/profiles/{{profile}}/img/ico/apple-touch-icon-57-precomposed.png">',
//       replace: true,
//       scope: {
//         profile: '@profile'
//       },
//       link: function (scope, element, attrs)
//       {
//       }
//     }
//   }
// ]);


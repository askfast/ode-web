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
    return {
      restrict: 'E',
      rep1ace:  true,
      link: function (scope, element, attrs)
      {
        /**
         * Pass the scheadule data
         */
        scope.s = scope.scheadule;

        var template =  '<div class="scheadule">' + 
                          '<div class="timer">' +
                            '<input name="time-start" type="text" ng-model="s.time" bs-timepicker>' +
                            '<i class="icon-time" style="margin-top: -3px;"></i>' +
                          '</div>' +
                          '<ul>' +
                            '<li>' +
                              '<label for="monday-{{s.exact}}">' +
                                '<input type="checkbox" id="monday-{{s.exact}}" ng-model="s.mon">&nbsp;Monday' +
                              '</label>' +
                            '</li>' +
                            '<li>' +
                              '<label for="tuesday-{{s.exact}}">' +
                                '<input type="checkbox" id="tuesday-{{s.exact}}" ng-model="s.tue">&nbsp;Tuesday' +
                              '</label>' +
                            '</li>' +
                            '<li>' +
                              '<label for="wednesday-{{s.exact}}">' +
                                '<input type="checkbox" id="wednesday-{{s.exact}}" ng-model="s.wed">&nbsp;Wednesday' +
                              '</label>' +
                            '</li>' +
                            '<li>' +
                              '<label for="thursday-{{s.exact}}">' +
                                '<input type="checkbox" id="thursday-{{s.exact}}" ng-model="s.thu">&nbsp;Thursday' +
                              '</label>' +
                            '</li>' +
                            '<li>' +
                              '<label for="friday-{{s.exact}}">' +
                                '<input type="checkbox" id="friday-{{s.exact}}" ng-model="s.fri">&nbsp;Friday' +
                              '</label>' +
                            '</li>' +
                            '<li>' +
                              '<label for="saturday-{{s.exact}}">' +
                                '<input type="checkbox" id="saturday-{{s.exact}}" ng-model="s.sat">&nbsp;Saturday' +
                              '</label>' +
                            '</li>' +
                            '<li>' +
                              '<label for="sunday-{{s.exact}}">' +
                                '<input type="checkbox" id="sunday-{{s.exact}}" ng-model="s.sun">&nbsp;Sunday' +
                              '</label>' +
                            '</li>' +
                            '<li><i class="icon-calendar"></i></li>' + 
                          '</ul>' +
                          '<button class="btn btn-small btn-danger" type="button" ng-click="remover(s.exact)"><i class="icon-trash icon-white"></i></button>' + 
                        '</div>';

        /**
         * Showtime
         */
        element.html(template).show();

        /**
         * Compile the hottie
         */
        $compile(element.contents())(scope);

        /**
         * Serve to the controller
         */
        scope.remover = function (key)
        {
          scope.$parent.$parent.remover(key);
        };

      },
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


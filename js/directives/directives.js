'use strict';

/* Directives */


// angular.module('WebPaige.directives', []).
//   directive('appVersion', ['version', function(version) 
//   {
//     return function(scope, elm, attrs) {
//       elm.text(version);
//     };
//   }]);







WebPaige.
directive('chosen',function()
{
  var linker = function(scope,element,attr)
  {
    scope.$watch('recipientsList',function()
    {
       element.trigger('liszt:updated');
    });

    element.chosen();
  };

  return {
    restrict:'A',
    link: linker
  }
});




/**
 * TODO
 * Needs attention :)
 * 
 */
WebPaige.
directive('daterangepicker', function($rootScope, $timeout)
{
  'use strict';

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
                'Today': ['today', 'today'],
                'Tomorrow': ['tomorrow', 'tomorrow'],
                'Yesterday': ['yesterday', 'yesterday'],
                // 'Next 7 Days': [new Date.create().addDays(7), 'today'],
                // 'Last 30 Days': [new Date.create().addDays(-29), 'today']
            }
      },
      function(start, end)
      {
        scope.$apply(function()
        {
          /**
           * Scope is a day
           */
          if (start.getTime() == end.getTime())
          {
            console.log('scope is day');
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
          else if ((end.getTime() - start.getTime()) < 604800000)
          {
            console.log('scope is week ->', scope.timeline);
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
          else if ((end.getTime() - start.getTime()) > 604800000)
          {
            console.log('scope is month');
            scope.timeline.range = {
              start: start,
              end: end
            };
            scope.timeline.scope = {
              day: false,
              week: false,
              month: true
            };
          };
          /**
           * Broadcast for timeliner
           */
          $rootScope.$broadcast('timeliner', {
            from: start,
            till: end
          });
        });
      });

      element.attr('data-toggle', 'daterangepicker');

      element.daterangepicker({
        autoclose: true
      });

    }

  };

});




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
directive('daterangepicker', function($timeout)
{
  'use strict';

  return {

    restrict: 'A',

    link: function postLink(scope, element, attrs, controller)
    {
      var startDate = Date.create().addDays(-6),
          endDate   = Date.create();              

      element.val(startDate.format('{MM}-{dd}-{yyyy}') + ' - ' + endDate.format('{MM}-{dd}-{yyyy}'));

      element.daterangepicker({
        startDate: startDate,
        endDate: endDate,
        ranges: {
                'Today': ['today', 'today'],
                'Yesterday': ['yesterday', 'yesterday'],
                'Last 7 Days': [Date.create().addDays(-6), 'today'],
                'Last 30 Days': [Date.create().addDays(-29), 'today']
            }
      },function(start, end)
      {
      });

      element.attr('data-toggle', 'daterangepicker');
      element.daterangepicker({
        autoclose: true
      });

    }

  };

});




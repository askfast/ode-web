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
      // var startDate = Date.create().addDays(-6),
      //     endDate   = Date.create();              

      // element.val(startDate.format('{MM}-{dd}-{yyyy}') + ' / ' + endDate.format('{MM}-{dd}-{yyyy}'));
     
      element.daterangepicker({
        //startDate: startDate,
        //endDate: endDate,
        ranges: {
                'Today': ['today', 'today'],
                'Tomorrow': ['tomorrow', 'tomorrow'],
                'Yesterday': ['yesterday', 'yesterday'],
                'Next 7 Days': [Date.create().addDays(7), 'today'],
                'Last 30 Days': [Date.create().addDays(-29), 'today']
            }
      },function(start, end)
      {
        if (start.getTime() == end.getTime())
        {
          /**
           * TODO
           * Get timeline zoom into one day!
           */
          console.log('same date');
        };
      });

      // scope.$watch(function()
      // {
      //   //var dates = element.context.value.split(' / ');
      //   // element.daterangepicker({
      //   //   startDate: dates[0],
      //   //   endDate: dates[1]
      //   // });
      //   //element.val(dates[0] + ' / ' + dates[1]);
        
      //   console.log('val ->', element.context.value);

      //   //scope.$watch(function()
      //   //{
      //     scope.daterange = element.context.value;
      //   //});
      // });

      element.attr('data-toggle', 'daterangepicker');

      // element.daterangepicker({
      //   autoclose: true
      // });

    }

  };

});




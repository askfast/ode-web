'use strict';

/* Directives */

WebPaige.
directive('chosen',function()
{
  var linker = function(scope,element,attr)
  {
    scope.$watch('receviersList',function()
    {   
       element.trigger('liszt:updated');
    });
    
    scope.$watch('message.receviers',function()
    {   
       $(element[0]).trigger('liszt:updated');
    });
    
    element.chosen();
  };

  return {
    restrict:'A',
    link: linker
  }
})

/**
 * TODO
 * Needs attention :)
 * 
 */
.directive('daterangepicker', function($rootScope, $timeout)
{
  return {
    /**
     * Directive type
     */
    restrict: 'A',
    /**
     * Directive linker
     */
    link: function postLink(scope, element, attrs, controller)
    {
      // var startDate = Date.create().addDays(-6),
      //     endDate   = Date.create();       
      //element.val(startDate.format('{MM}-{dd}-{yyyy}') + ' / ' + endDate.format('{MM}-{dd}-{yyyy}'));
      element.daterangepicker({
        // startDate: startDate,
        // endDate: endDate,
        ranges: {
                'Today': ['today', 'tomorrow'],
                'Tomorrow': ['tomorrow', new Date.today().addDays(2)],
                'Yesterday': ['yesterday', 'today'],
                'Next 3 Days': ['today', new Date.create().addDays(3)],
                'Next 7 Days': ['today', new Date.create().addDays(7)]
            }
      },
      function(start, end)
      {
        scope.$apply(function()
        {
          /**
           * Calculate difference
           */
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
          };
          /**
           * Broadcast for timeliner
           */
          $rootScope.$broadcast('timeliner', {
            start: start,
            end: end
          });
          
        });
      });
      /**
       * TODO
       * Maybe better hardcoded?
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
});

'use strict';

WebPaige.directive('wpName', function(Storage){
    return {
        restrict : 'A',
        link : function linkfn(scope, element, attrs){
            var getmemberName = function(uid){
                var members = angular.fromJson(Storage.get('members'));
                var retName = uid; 
                angular.forEach(members , function(mem, i){
                   if(mem.uuid == uid){
                       retName = mem.name;
                       return false;
                   } 
                });
                return retName;
            }
            
            scope.$watch(attrs.wpName,function(uid){
                element.text(getmemberName(uid)); 
            });
            
        }
    }
});




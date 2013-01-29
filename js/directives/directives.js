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



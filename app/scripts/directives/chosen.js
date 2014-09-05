define(
  ['directives/directives'],
  function (directives)
  {
    'use strict';

    directives.directive(
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
      });
  }
);

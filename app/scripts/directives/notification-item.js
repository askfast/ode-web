define(
  ['directives/directives'],
  function (directives)
  {
    'use strict';

    directives.directive(
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
  }
);

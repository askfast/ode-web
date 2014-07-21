/*jslint node: true */
/*global angular */
'use strict';


angular.module('WebPaige.Controllers.Scheaduler', [])


/**
 * Schedule controller
 */
  .controller(
  'scheaduler',
  [
    '$scope', '$rootScope', '$timeout',
    function ($scope, $rootScope, $timeout)
    {
      $scope.days = $rootScope.ui.days;

      /**
       * Watch offsets
       */
      $scope.$watch(
        function ()
        {
//          $timeout(
//            function ()
//            {
              // console.log('watching? ->');

              if ($scope.scheaduled)
              {
                angular.forEach(
                  $scope.scheaduled.offsets,
                  function (offset)
                  {
                    /**
                     * If all the days are unchecked make monday checked as default
                     */
                    if (offset.mon == false &&
                        offset.tue == false &&
                        offset.wed == false &&
                        offset.thu == false &&
                        offset.fri == false &&
                        offset.sat == false &&
                        offset.sun == false)
                    {
                      offset.mon = true;
                    }

                    // var hour    = 1000 * 60 * 60,
                    //      minute  = 1000 * 60,
                    var hour = 60 * 60,
                        minute = 60,
                        time = offset.time.split(':'),
                        exact = (time[0] * hour) + (time[1] * minute);

                    if (time[0] != offset.hour)  offset.hour = time[0];
                    if (time[1] != offset.minute) offset.minute = time[1];

                    if (offset.exact != exact)
                    {
                      offset.exact = exact;
                    }

                  }
                );
              }

//            });

        }
      );


      /**
       * Add a new offset
       */
      $scope.addNewOffset = function ()
      {
        $timeout(
          function ()
          {
            console.log('adding ->', $scope.scheaduled.offsets);

            var starter = {
              mon: true,
              tue: false,
              wed: false,
              thu: false,
              fri: false,
              sat: false,
              sun: false,
              hour: 0,
              minute: 0,
              time: '00:00',
              exact: 0
            };

            if ($scope.scheaduled.offsets[0])
            {
              console.log('there are some offsets ->');

              var hour = 60 * 60,
                  minute = 60,
                  time = $scope.scheaduled.offsets[0].time.split(':'),
                  exact = (time[0] * hour) + (time[1] * minute);

              console.log('exact ->', hour, minute, time, exact);

              $scope.scheaduled.offsets[exact] = $scope.scheaduled.offsets[0];

              $scope.scheaduled.offsets[exact].exact = exact;
            }
            else
            {
              console.log('there is no ->');
            }

            $scope.scheaduled.offsets[0] = starter;

            $scope.scheaduleCounter();
          }
        );
      };

      $scope.addNewOffset();


      /**
       * Remove a schedule
       */
      $scope.remover = function (key)
      {
        console.log('removing ->');

        delete $scope.scheaduled.offsets[key];

        $scope.scheaduleCounter();
      };

    }
  ]);
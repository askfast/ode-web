define(
  ['controllers/controllers', 'config'],
  function (controllers, config) {
    'use strict';

    controllers.controller(
      'scheaduler',
      [
        '$scope', '$timeout',
        function ($scope, $timeout) {
          /**
           * Watch offsets
           */
          $scope.$watch(
            function () {
              if ($scope.scheaduled) {
                _.each(
                  $scope.scheaduled.offsets,
                  function (offset) {
                    if (offset.mon == false &&
                      offset.tue == false &&
                      offset.wed == false &&
                      offset.thu == false &&
                      offset.fri == false &&
                      offset.sat == false &&
                      offset.sun == false) {
                      offset.mon = true;
                    }

                    var hour = 60 * 60,
                      minute = 60,
                      time = offset.time.split(':'),
                      exact = (time[0] * hour) + (time[1] * minute);

                    if (time[0] != offset.hour) {
                      offset.hour = time[0]
                    }
                    if (time[1] != offset.minute) {
                      offset.minute = time[1]
                    }

                    if (offset.exact != exact) {
                      offset.exact = exact
                    }
                  }
                );
              }
            }
          );


          /**
           * Add a new offset
           */
          $scope.addNewOffset = function () {
            $timeout(
              function () {
                if ($scope.scheaduled.offsets[0]) {
                  var hour = 60 * 60,
                    minute = 60,
                    time = $scope.scheaduled.offsets[0].time.split(':'),
                    exact = (time[0] * hour) + (time[1] * minute);

                  $scope.scheaduled.offsets[exact] = $scope.scheaduled.offsets[0];

                  $scope.scheaduled.offsets[exact].exact = exact;
                }

                $scope.scheaduled.offsets[0] = {
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

                $scope.scheaduleCounter();
              }
            )
          };


          /**
           * Remove a scheadule
           */
          $scope.remover = function (key) {
            delete $scope.scheaduled.offsets[key];

            $scope.scheaduleCounter();
          };

        }
      ]);
  }
);
define(
  ['controllers/controllers', 'config'],
  function (controllers, config) {
    'use strict';

    controllers.controller(
      'help',
      [
        '$rootScope', '$scope', '$location',
        function ($rootScope, $scope, $location) {
          $rootScope.notification.status = false;

          /**
           * Fix styles
           */
          $rootScope.fixStyles();


          /**
           * View setter
           */
          function setView(hash) {
            $scope.views = {
              dashboard: false,
              planboard: false,
              messages: false,
              groups: false,
              profile: false,
              settings: false,
              support: false
            };

            $scope.views[hash] = true;
          }


          /**
           * Switch between the views and set hash accordingly
           */
          $scope.setViewTo = function (hash) {
            $scope.$watch(
              hash,
              function () {
                $location.hash(hash);

                setView(hash);
              }
            );
          };


          /**
           * If no params or hashes given in url
           */
          var view;

          if (!$location.hash()) {
            view = 'dashboard';

            $location.hash('dashboard');
          }
          else {
            view = $location.hash();
          }


          /**
           * Set view
           */
          setView(view);
        }
      ]);
  }
);
define(
  ['controllers/controllers', 'config'],
  function (controllers, config) {
    'use strict';

    controllers.controller(
      'logout',
      [
        '$rootScope', '$scope', '$window', 'Session', 'User', 'Store',
        function ($rootScope, $scope, $window, Session, User, Store) {
          $('.navbar').hide();
          $('#footer').hide();
          // $('#notification').hide();

          var logindata = Store('environment').get('logindata');
          var registeredNotifications = Store('environment').get('registeredNotifications');

          User.logout()
            .then(
            function (result) {
              if (result.error) {
                console.warn('error ->', result);
              }
              else {
                Store('network').nuke();
                Store('environment').nuke();
                Store('messages').nuke();
                Store('records').nuke();
                Store('smartAlarm').nuke();
                Store('notifications').nuke();
                Store('user').nuke();
                Store('app').nuke();

                Store('environment').save('logindata', logindata);
                Store('environment').save('registeredNotifications', registeredNotifications);

                $window.location.href = 'logout.html';
              }
            }
          );
        }
      ]);
  }
);
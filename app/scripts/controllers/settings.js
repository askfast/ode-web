define(['controllers/controllers', 'locals'], function (controllers, locals) {
  'use strict';

  controllers.controller('settings', function ($rootScope, $scope, $window, data, Settings, Profile, Storage, Store) {
    $rootScope.notification.status = false;

    $rootScope.fixStyles();

    $scope.settings = angular.fromJson(data);

    var languages = {};

    _.each(locals.ui, function (lang) {
      languages[lang.meta.name] = lang.meta.label
    });

    $scope.languages = languages;

    var groups = {};

    _.each(Store('network').get('groups'), function (group) {
      groups[group.uuid] = group.name
    });

    $scope.groups = groups;

    $scope.save = function (settings) {
      $rootScope.statusBar.display($rootScope.ui.settings.saving);

      Settings.save($rootScope.StandBy.resources.uuid, settings).then(function () {
        $rootScope.notifier.success($rootScope.ui.settings.saved);

        $rootScope.statusBar.display($rootScope.ui.settings.refreshing);

        Profile.get($rootScope.StandBy.resources.uuid, true).then(
          function (result) {
            if (result.error) {
              $rootScope.notifier.error($rootScope.ui.errors.settings.save);
              console.warn('error ->', result);
            } else {
              $scope.settings = angular.fromJson(result.resources.settingsWebPaige);

              $rootScope.changeLanguage(
                angular.fromJson(result.resources.settingsWebPaige).user.language
              );

              $rootScope.statusBar.off();
            }
          });
      });
    };

    $scope.authGoogle = function () {
      window.location = 'http://3rc2.ask-services.appspot.com/auth/google' +
        '?agentUrl=http://3rc2.ask-services.appspot.com/eveagents/personalagent/' +
        $rootScope.StandBy.resources.uuid +
        '/' +
        '&agentMethod=createGoogleAgents' +
        '&applicationCallback=' +
        location.protocol +
        "//" +
        location.hostname +
        (location.port && ":" + location.port) +
        '/index.html' +
        '?account=' +
        $rootScope.StandBy.resources.uuid +
        encodeURIComponent('#') +
        '/settings';
    };
  });
});
define(['services/services'], function (services) {
  'use strict';

  services.factory('User', function ($rootScope, $resource, $q, $http, Log, md5, StandBy, Session, Store) {
    var User = $resource();

    User.prototype.login = function (username, password) {
      var deferred = $q.defer();

      try {
        StandBy._('login', { uuid: username.toLowerCase(), pass: md5.createHash(password) }).then(function (result) {
          if (!result.error) {
            Session.set(result['X-SESSION_ID']);
          }

          deferred.resolve(result);
        });
      } catch (e) {
        Log.error('Something went wrong with login call:', e);
      }

      return deferred.promise;
    };

    User.prototype.logout = function () {
      var deferred = $q.defer();

      try {
        StandBy._('logout').then(function (result) {
          Session.clear();

          deferred.resolve(result);
        });
      } catch (e) {
        Log.error('Something went wrong with logout call:', e);
      }

      return deferred.promise;
    };

    User.prototype.resources = function () {
      var deferred = $q.defer();

      try {
        StandBy._('resources').then(function (result) {
          Store('user').save('resources', result);

          $rootScope.StandBy.resources = result;

          deferred.resolve(result);
        });
      } catch (e) {
        Log.error('Something went wrong with resources call:', e);
      }

      return deferred.promise;
    };

    return new User();
  });
});
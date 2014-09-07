define(['services/services'], function (services) {
  'use strict';

  services.factory('Environment', function ($rootScope, $resource, $q, Log, StandBy, Store) {
    var Environment = $resource();

    Environment.prototype.domain = function () {
      var deferred = $q.defer();

      try {
        StandBy._('domain').then(function (result) {
          $rootScope.ticked();

          Store('environment').save('domain', result);

          $rootScope.app.environment.domain = result;

          deferred.resolve(result);
        });
      } catch (e) {
        Log.error('Something went wrong with environment domain call:', e);
      }

      return deferred.promise;
    };

    Environment.prototype.states = function () {
      var deferred = $q.defer();

      try {
        StandBy._('states').then(function (result) {
          $rootScope.ticked();

          Store('environment').save('states', result);

          $rootScope.app.environment.states = result;

          deferred.resolve(result);
        });
      } catch (e) {
        Log.error('Something went wrong with environment states call:', e);
      }

      return deferred.promise;
    };

    Environment.prototype.divisions = function () {
      var deferred = $q.defer();

      try {
        StandBy._('divisions').then(function (result) {
          $rootScope.ticked();

          Store('environment').save('divisions', result);

          $rootScope.app.environment.divisions = result;

          deferred.resolve(result);
        });
      } catch (e) {
        Log.error('Something went wrong with environment divisions call:', e);
      }

      return deferred.promise;
    };

    Environment.prototype.setup = function () {
      var deferred = $q.defer();

      $rootScope.missioned(3);

      var queue = [
        Environment.prototype.domain(),
        Environment.prototype.states(),
        Environment.prototype.divisions()
      ];

      try {
        $q.all(queue).then(function (results) {
          deferred.resolve(results);
        });
      } catch (e) {
        Log.error('Something went wrong with setting up environment call:', e);
      }

      return deferred.promise;
    };

    return new Environment();
  });
});
'use strict';

/**
 * TODO
 * Clear list of dependencies
 * 
 * TimeSlots Service
 */
WebPaige.
factory('User', function ($resource, $config, $q, $location, $timeout, Storage, $rootScope) 
{
  var self = this;

  /**
   * User resource (general)
   */
  var User = $resource();


  /**
   * Login resource
   */
  var Login = $resource(
    $config.host + '/login',
    {
    },
    {
      process: {
        method: 'GET',
        params: {uuid:'', pass:''}
      }
    }
  );


  /**
   * Resources resource
   */
  var Resources = $resource(
    $config.host + '/resources',
    {
    },
    {
      get: {
        method: 'GET',
        params: {}
      }
    }
  );


  /**
   * Reset resource
   */
  var Reset = $resource(
    $config.host + '/passwordReset',
    {
    },
    {
      password: {
        method: 'GET',
        params: {uuid: '', path:''}
      }
    }
  );


  /**
   * User login
   */
  User.prototype.password = function (uuid) 
  {    
    var deferred = $q.defer();
    Reset.password({
      uuid: uuid.toLowerCase(), 
      path: $location.absUrl() +
            '/password.html'
    }, function (result) 
    {
      deferred.resolve(result);
    });
    return deferred.promise;
  };


  /**
   * User login
   */
  User.prototype.login = function (uuid, pass) 
  {    
    var deferred = $q.defer();
    Login.process({uuid: uuid, pass: pass}, function (result) 
    {
      if (angular.equals(result, [])) 
      {
        deferred.reject("Something went wrong with login!");
      }
      else 
      {
        deferred.resolve(result);
      }
    });
    return deferred.promise;
  };


  /**
   * Logout resource
   */
  var Logout = $resource(
    $config.host + '/logout',
    {
    },
    {
      process: {
        method: 'GET',
        params: {}
      }
    }
  );


  /**
   * User logout
   */
  User.prototype.logout = function () 
  {    
    var deferred = $q.defer();
    Logout.process(null, function (result) 
    {
      deferred.resolve(result);
    });
    return deferred.promise;
  };


  /**
   * Get user resources
   */
  User.prototype.resources = function () 
  {    
    var deferred = $q.defer();
    Resources.get(null, function (result) 
    {
      if (angular.equals(result, [])) 
      {
        deferred.reject("User has no resources!");
      }
      else 
      {
        Storage.add('resources', angular.toJson(result));
        deferred.resolve(result);
      }
    });
    return deferred.promise;
  };


  return new User;

});

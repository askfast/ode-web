'use strict';

angular.module(
  'WebPaige.Services.Interceptor', ['ngResource']).factory(
  'Interceptor', [
    '$q',
    function ($q)
    {
      return {
        request: function (config)
        {
          console.log('request ->', config);
          return config || $q.when(config);
        },
        requestError: function (rejection)
        {
          console.warn('request error ->', rejection);
          return $q.reject(rejection);
        },
        response: function (response)
        {
          return response || $q.when(response);
        },
        responseError: function (rejection)
        {
          console.warn('response error ->', rejection);
          return $q.reject(rejection);
        }
      };
    }
  ]
);
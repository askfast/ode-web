define(
  ['services/services', 'config'],
  function (services, config) {
    'use strict';

    services.factory(
      'Interceptor', [
        '$window', '$q',
        function ($window, $q) {
          return {
            request: function (config) {
              // console.log('request ->', config);
              return config || $q.when(config);
            },
            requestError: function (rejection) {
              // console.warn('request error ->', rejection);
              return $q.reject(rejection);
            },
            response: function (response) {
              // console.log('response ->', response);
              return response || $q.when(response);
            },
            responseError: function (rejection) {
              // console.warn('response error ->', rejection);

              if (rejection.status == 403) {
                localStorage.setItem('sessionTimeout', '');

                $window.location.href = 'logout.html';
              }

              return $q.reject(rejection);
            }
          };
        }
      ]
    );


  }
);
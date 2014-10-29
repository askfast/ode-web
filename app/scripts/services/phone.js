define(
  ['services/services', 'config'],
  function (services, config) {
    'use strict';

    services.factory(
      'Phone',
      [
        function () {
          function phoneNumberParser(number, country, carrier) {
            var result = phoneNumberParser(number, country, carrier);

            result.parsed = angular.fromJson(result.parsed);

            return result;
          }

          return {
            parse: parse
          };

        }
      ]
    );


  }
);
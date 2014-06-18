'use strict';

angular.module('WebPaige.Services.Phone', [])
  .factory(
  'Phone',
  [
    function ()
    {
      function phoneNumberParser(number, country, carrier)
      {
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
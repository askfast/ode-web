'use strict';


angular.module('WebPaige.Modals.Logs', ['ngResource'])


/**
 * Groups modal
 */
  .factory(
  'Logs',
  [
    '$resource', '$config', '$q', '$filter',
    function ($resource, $config, $q, $filter)
    {
      // /ddr?adapterId= &fromAddress= &typeId= &status= &startTime= &endTime= &offset= &limit= &shouldGenerateCosts= &shouldIncludeServiceCosts=
      var Logs = $resource(
          $config.host + '/ddr',
          {},
          {
            get: {
              method: 'GET',
              params: {},
              isArray: true
            }
          }
      );

      var normalize = function (logs)
      {
        var refined = [];

        var strip = function (number) {
          if (/@/.test(number))
          {
            return number.split('@')[0];
          }
          else
          {
            return number
          }
        };

        var howLong = function (period)
        {
          if (period && period != 0)
          {
            var duration = moment.duration(period);

            return {
              presentation:  ((duration.hours() == 0) ? '00' : duration.hours()) + ':' +
                             ((duration.minutes() == 0) ? '00' : duration.minutes()) + ':' +
                             duration.seconds(),
              stamp: period
            }
          }
          else
          {
            return {
              presentation: '00:00:00',
              stamp: 0
            }
          }
        };

        angular.forEach(
          logs,
          function (log)
          {
            var record = {
              from: strip(log.fromAddress),
              started: {
                date: $filter('date')(log.start, 'medium'),
                stamp: log.start
              }
            };

            angular.forEach(
              log.statusPerAddress,
              function (status) { record.status = status }
            );

            angular.forEach(
              angular.fromJson(log.toAddressString),
              function (message, number) { record.to = strip(number) }
            );

            record.duration = howLong(log.duration);

            refined.push(record);
          }
        );

        $filter('orderBy')(refined, 'started.stamp');

        return refined;
      };

      Logs.prototype.fetch = function ()
      {
        var deferred = $q.defer();

        Logs.get(
          {},
          function (result)
          {
            deferred.resolve(
              {
                logs: normalize(result),
                synced: Date.now().getTime()
              }
            );
          },
          function (error)
          {
            deferred.resolve({ error: error });
          }
        );

        return deferred.promise;
      };

      return new Logs;
    }
  ]);
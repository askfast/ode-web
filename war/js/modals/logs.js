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

        var strip = function (number)
        {
          return (/@/.test(number)) ? number.split('@')[0] : number;
        };

        var howLong = function (period)
        {
          if (period && period != 0)
          {
            var duration = moment.duration(period);

            var doubler = function (num)
            {
              return (String(num).length == 1) ? '0' + String(num) : num;
            };

            return {
              presentation: ((duration.hours() == 0) ? '00' : doubler(duration.hours())) + ':' +
                            ((duration.minutes() == 0) ? '00' : doubler(duration.minutes())) + ':' +
                            doubler(duration.seconds()),
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

        var trackingID = null;

        angular.forEach(
          logs,
          function (log)
          {
            var additionalInfo = angular.fromJson(log.additionalInfo);

            var trackingToken = additionalInfo ?
                                ((additionalInfo.hasOwnProperty('trackingToken')) ?
                                 additionalInfo.trackingToken :
                                 '') :
                                '';

            var tracked = (trackingToken == trackingID) ?
                          (additionalInfo ?
                           ((additionalInfo.hasOwnProperty('trackingToken')) ? true : '') :
                           '') :
                          '';

            trackingID = trackingToken;

            var record = {
              trackingToken: trackingToken,
              tracked: tracked,
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

      Logs.prototype.fetch = function (periods)
      {
        var deferred = $q.defer();

        if (! periods)
        {
          periods = {
            end: new Date.now().getTime(),
            start: new Date.today().addDays(- 7).getTime()
          }
        }

        Logs.get(
          {
            startTime: periods.start,
            endTime: periods.end
          },
          function (result)
          {
            deferred.resolve(
              {
                logs: normalize(result),
                synced: Date.now().getTime(),
                periods: periods
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
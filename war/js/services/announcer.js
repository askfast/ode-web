'use strict';


angular.module('WebPaige.Services.Announcer', ['ngResource'])


/**
 * Announcer
 */
.factory('Announcer',
  ['$rootScope',
  function ($rootScope)
  {
    return {
      /**
       * TODO: Modify p2000 script in ask70 for date conversions!!
       * p2000 messages processor
       */
      process: function (results, couchdb)
      {
        var alarms  = {
              short:  [],
              long:   [] 
            },
            limit   = 4,
            count   = 0;

        if (couchdb)
        {
          var processed = [];

          angular.forEach(results.rows, function (alarm)
          {
            processed.push({
              msgCode:  $rootScope.config.profile.p2000.codes,
              day:      new Date(alarm.value.timestamp).toString('dd-MM-yy'),
              time:     new Date(alarm.value.timestamp).toString('HH:mm:ss'),
              body:     alarm.value.message
            });
          });

          results = processed;
        }

        angular.forEach(results, function (alarm)
        {
          if (alarm.body)
          {
            var alarmBodyLowered = alarm.body.toLowerCase();
            if (alarmBodyLowered.match(/prio 1/) || alarmBodyLowered.match(/p 1 /) || alarmBodyLowered.match(/A1 / ))
            {
              alarm.body = alarm.body.replace('Prio 1 ', '');
              alarm.prio = {
                1:    true,
                test: false
              };
            }

            if (alarmBodyLowered.match(/prio 2/) || alarmBodyLowered.match(/p 2 /) || alarmBodyLowered.match(/A2 / ))
            {
              alarm.body = alarm.body.replace('Prio 2 ', '');
              alarm.prio = {
                2:    true,
                test: false
              };
            }

            if (alarmBodyLowered.match(/prio 3/) || alarmBodyLowered.match(/p 3 /) || alarmBodyLowered.match(/B1 / ) || alarmBodyLowered.match(/B2 / ))
            {
              alarm.body = alarm.body.replace('Prio 3 ', '');
              alarm.prio = {
                3:    true,
                test: false
              }
            }

            if (alarm.body.match(/PROEFALARM/))
            {
              alarm.prio = {
                test: true
              };
            }

            if (count < 4) alarms.short.push(alarm);

            alarms.long.push(alarm);

            count++;
          }
        });

        return alarms;
      }
    }
  }
  ]);
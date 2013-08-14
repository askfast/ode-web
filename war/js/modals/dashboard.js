/*jslint node: true */
/*global angular */
/*global $ */
/*global error */
'use strict';


angular.module('WebPaige.Modals.Dashboard', ['ngResource'])


/**
 * Dashboard modal
 */
.factory('Dashboard',
[
	'$rootScope', '$resource', '$config', '$q', 'Storage', 'Slots', 'Dater', 'Announcer', '$http',
	function ($rootScope, $resource, $config, $q, Storage, Slots, Dater, Announcer, $http)
	{
		var Dashboard = $resource(
			'http://knrm.myask.me/rpc/client/p2000.php',
			{
			},
			{
				p2000: {
					method: 'GET',
					params: {},
					isArray: true
				}
			}
		);
		

		/**
		 * Get group aggs for pie charts
		 */
		Dashboard.prototype.pies = function ()
		{
			var deferred  = $q.defer(),
					groups    = angular.fromJson(Storage.get('groups')),
					// settings  = Storage.local.settings().app.widgets.groups,
					list      = [],
					calls     = [];

			// if (settings.length === 0) console.warn('no settings');

      // console.warn('settings ->', angular.toJson(Storage.local.settings()));

      var settings = {
        "user": {
          "language": "nl"
        },
        "app": {
          "widgets": {
            "groups": {
              "f609041a-69b6-1030-a3ab-005056bc7e66": {
                "status": true,
                "divisions": false
              },
              "4a1a3392-7611-1030-a3ab-005056bc7e66": {
                "status": true,
                "divisions": true
              },
              "e6155d7e-8abd-1030-a3ab-005056bc7e66": {
                "status": false,
                "divisions": false
              },
              "a2408ffc-69b5-1030-a3ab-005056bc7e66": {
                "status": true,
                "divisions": false
              },
              "c19c3eb6-f3fb-1030-a3ab-005056bc7e66": {
                "status": false,
                "divisions": false
              },
              "e9b67064-f4ba-1030-a3ab-005056bc7e66": {
                "status": false,
                "divisions": false
              },
              "09dee150-f4bb-1030-a3ab-005056bc7e66": {
                "status": false,
                "divisions": false
              },
              "64e6f4be-8d39-1030-a3ab-005056bc7e66": {
                "status": false,
                "divisions": false
              },
              "5c8d0e84-8d39-1030-a3ab-005056bc7e66": {
                "status": false,
                "divisions": false
              },
              "b4550b94-8d39-1030-a3ab-005056bc7e66": {
                "status": false,
                "divisions": false
              }
            }
          },
          "group": "4a1a3392-7611-1030-a3ab-005056bc7e66"
        }
      };

      settings = settings.app.widgets.groups;

			angular.forEach(groups, function(group)
			{
				if (settings[group.uuid] && settings[group.uuid].status)
        {
          if (!settings[group.uuid].divisions)
          {
            calls.push(Slots.pie({
              id:         group.uuid,
              name:       group.name,
              division:   'both'
            }));
          }
          else
          {
            angular.forEach($rootScope.config.timeline.config.divisions, function (division)
            {
              calls.push(Slots.pie({
                id:         group.uuid,
                name:       group.name,
                division:   division.id
              }));
            })
          }
        }
			});

			$q.all(calls)
			.then(function (results)
			{
				$rootScope.statusBar.off();

        console.warn('FROM MODAL ->', results);

				deferred.resolve(results);
			});

			return deferred.promise;
		};


		/**
		 * Get p2000 announcements
		 */
		Dashboard.prototype.p2000 = function ()
		{
			var deferred = $q.defer();

			$rootScope.statusBar.display($rootScope.ui.dashboard.gettingAlarms);

			$.ajax({
				url: $config.profile.p2000.url + '?code=' + $config.profile.p2000.codes,
				dataType: 'jsonp',
				success: function (results)
				{
					$rootScope.statusBar.off();
					
					deferred.resolve(
					{
						alarms: 	Announcer.process(results),
						synced:   new Date().getTime()
					});
				},
				error: function ()
				{
					deferred.resolve({error: error});
				}
			});

			// $http({
			// 	method: 'jsonp',
			// 	url: 		$config.profile.p2000.url + '?code=' + $config.profile.p2000.codes
			// })
			// .success(function (data, status)
			// {
			// 	console.log('results ->', data);

			// 	deferred.resolve( Announcer.process(data) );
			// })
			// .error(function (error)
			// {
			// 	deferred.resolve({error: error});
			// });

			return deferred.promise;
		};


		return new Dashboard();
	}
]);
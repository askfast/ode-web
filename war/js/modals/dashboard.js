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
					settings  = Storage.local.settings().app.widgets.groups,
					calls     = [];

			if (settings.length === 0) console.warn('no settings');

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
              if (division.id !== 'all')
              {
                calls.push(Slots.pie({
                  id:         group.uuid,
                  name:       group.name,
                  division:   division.id
                }));
              }
            })
          }
        }
			});

			$q.all(calls)
			.then(function (results)
			{
				$rootScope.statusBar.off();

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
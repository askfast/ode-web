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
	'$rootScope', '$resource', '$config', '$q', 'Storage', 'Slots', 'Dater', 'Announcer',
	function ($rootScope, $resource, $config, $q, Storage, Slots, Dater, Announcer)
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
					list      = [],
					now       = new Date.now().getTime(),
					calls     = [];

			if (settings.length === 0) console.warn('no settings');

			angular.forEach(groups, function(group, index)
			{
				if (settings[group.uuid]) list.push({ id: group.uuid, name: group.name});
			});

			angular.forEach(list, function (group, index)
			{
				calls.push(Slots.pie({
					id:     group.id,
					name:   group.name
				}));
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

			$.ajax({
				url: $config.profile.p2000.url + '?code=' + $config.profile.p2000.codes,
				dataType: 'jsonp',
				success: function (results)
				{
					deferred.resolve( Announcer.process(results) );
				},
				error: function ()
				{
					deferred.resolve({error: error});
				}
			});

			return deferred.promise;
		};


		return new Dashboard();
	}
]);
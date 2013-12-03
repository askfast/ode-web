/*jslint node: true */
/*global angular */
/*global Raphael */
'use strict';


angular.module('WebPaige.Controllers.TV', [])


/**
 * TV / Dashboard controller
 */
.controller('tv',
[
	'$scope', '$rootScope', '$q', '$window', '$location', 'Dashboard', 'Slots', 'Dater', 'Storage', 'Settings', 'Profile', 'Groups', 'Announcer',
	function ($scope, $rootScope, $q, $window, $location, Dashboard, Slots, Dater, Storage, Settings, Profile, Groups, Announcer)
	{
		/**
		 * Fix styles
		 */
		$rootScope.fixStyles();

    $('.navbar').hide();
    $('#footer').hide();

    $('#watermark').css({ bottom: '-10px' });

		/**
		 * Defaults for loaders
		 */
		$scope.loading = {
			alerts:     true,
      smartAlarm: true
		};


		/**
		 * Default values for synced pointer values
		 */
		$scope.synced = {
			alarms: new Date().getTime()
		};


    /**
     * Process Smart Alarm team members for view
     */
    function prepareSaMembers (setup)
    {
      $scope.saMembers = {
        truck:    [],
        reserves: []
      };

      $scope.saSynced = angular.fromJson(Storage.get('guard')).synced;

      var members = {};

      angular.forEach(angular.fromJson(Storage.get('groups')), function (group)
      {
        angular.forEach(angular.fromJson(Storage.get(group.uuid)), function (member)
        {
          members[member.uuid] = member;
        });
      });

      $scope.saMembers.truck.push({
        icon: 'C',
        role: 'Chauffeur',
        class: 'sa-icon-driver',
        name: (setup.chauffeur !== null) ? members[setup.chauffeur].name : 'Niet ingedeeld'
      });

      if (setup.chauffeur !== null) delete members[setup.chauffeur];

      $scope.saMembers.truck.push({
        icon: 'B',
        role: 'Bevelvoerder',
        class: 'sa-icon-commander',
        name: (setup.bevelvoerder !== null) ? members[setup.bevelvoerder].name : 'Niet ingedeeld'
      });

      if (setup.bevelvoerder !== null) delete members[setup.bevelvoerder];

      var mans = {};

      angular.forEach(setup, function (man, role)
      {
        switch (role)
        {
          case 'manschap.1':
            mans[1] = (man !== null) ? members[man].name : 'Niet ingedeeld';
            delete members[man];
            break;
          case 'manschap.2':
            mans[2] = (man !== null) ? members[man].name : 'Niet ingedeeld';
            delete members[man];
            break;
          case 'manschap.3':
            mans[3] = (man !== null) ? members[man].name : 'Niet ingedeeld';
            delete members[man];
            break;
          case 'manschap.4':
            mans[4] = (man !== null) ? members[man].name : 'Niet ingedeeld';
            delete members[man];
            break;
        }
      });

      $scope.saMembers.truck.push({
        icon: 'M1',
        role: 'Manschap 1',
        name: mans[1]
      });

      $scope.saMembers.truck.push({
        icon: 'M2',
        role: 'Manschap 2',
        name: mans[2]
      });

      $scope.saMembers.truck.push({
        icon: 'M3',
        role: 'Manschap 3',
        name: mans[3]
      });

      $scope.saMembers.truck.push({
        icon: 'M4',
        role: 'Manschap 4',
        name: mans[4]
      });

      angular.forEach(members, function (member)
      {
        $scope.saMembers.reserves.push(member.name);
      });

      $scope.loading.smartAlarm = false;
    }


    /**
     * Fetch smartAlarm information
     */
    if ($rootScope.config.profile.smartAlarm)
    {
      if (angular.fromJson(Storage.get('guard')).team)
      {
        $scope.loading.smartAlarm = false;

        prepareSaMembers(angular.fromJson(Storage.get('guard')).team);
      }

      Groups.guardMonitor()
        .then(function ()
        {
          Groups.guardRole()
            .then(function (setup)
            {
              prepareSaMembers(setup);
            });
        });
    }


    /**
     * Fetcher for p2000 alarm messages
     */
		$scope.getP2000 = function  ()
		{
      Dashboard.p2000().
			then(function (result)
			{
        $scope.loading.alerts = false;

        $scope.alarms = result.alarms;

        $scope.alarms.list = $scope.alarms.short;

        $scope.synced.alarms = result.synced;
			});
		};


    $window.setInterval(function ()
    {
      $scope.$apply()
      {
        $scope.getP2000();

        if (angular.fromJson(Storage.get('guard')).team)
        {
          prepareSaMembers(angular.fromJson(Storage.get('guard')).team);
        }

        Groups.guardRole()
          .then(function (setup)
          {
            prepareSaMembers(setup);
          });
      }
    }, 60000);


    /**
     * Get alarms for the first time
     */
    $.ajax({
      url: $rootScope.config.profile.p2000.url,
      dataType: 'json',
      success: function (results)
      {
        $rootScope.statusBar.off();

        var processed = Announcer.process(results, true);

        var result = {
          alarms: 	processed,
          synced:   new Date().getTime()
        };

        $scope.$apply(function ()
        {
          $scope.loading.alerts = false;

          $scope.alarms = result.alarms;

          $scope.alarms.list = $scope.alarms.short;

          $scope.synced.alarms = result.synced;
        });
      },
      error: function ()
      {
        console.log('ERROR with getting p2000 for the first time!');
      }
    });

	}
]);
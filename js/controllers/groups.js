'use strict';


/**
 * Groups Controller
 */
function groupsCtrl($rootScope, $scope, $config, groups, Group, timerService, $route, $routeParams, Storage)
{

	var self = this;

	$scope.groups = groups;

  $scope.members = {};

  angular.forEach(angular.fromJson(Storage.get('groups')), function(group, gindex)
  {
    $scope.members[group.uuid] = [];
    angular.forEach(angular.fromJson(Storage.get(group.uuid)), function (member, mindex)
    {
      $scope.members[group.uuid].push(member);
    });
  });

  console.log('members ->', $scope.members);

	// switch($scope.params.action)
	// {
	// 	case 'members':
	// 		$scope.members = Group.get($scope.params.groupId);
	// 	break;
	// 	case 'edit':
	// 	break;
	// };
	
  // timerService.start('groupsTimer', function()
  // { 
  //   Group.query();
  // }, 60 * 30);

  //$('.tabs-left .tab-content').css({ height: $('.tabs-left .nav-tabs').height() - 24 });

};


/**
 * Groups resolver
 */
groupsCtrl.resolve = {
  groups: function ($rootScope, $config, Group, $route) 
  {
    return Group.query();
  }
};


/**
 * Groups prototypes
 */
groupsCtrl.prototype = {
  constructor: groupsCtrl
};



groupsCtrl.$inject = [  '$rootScope', 
                        '$scope', 
                        '$config', 
                        'groups', 
                        'Group', 
                        'timerService', 
                        '$route', 
                        '$routeParams',
                        'Storage'];
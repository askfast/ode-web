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
	
  // timerService.start('groupsTimer', function()
  // { 
  //   Group.query();
  // }, 60 * 30);

  $scope.fixTabHeight = function(uuid)
  {
    $('.tabs-left .tab-content #grp-' + uuid).css({ height: $('.tabs-left .nav-tabs').height() });
  };

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
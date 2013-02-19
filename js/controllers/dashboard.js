'use strict';


/**
 * Dashboard Controller
 */
function dashboardCtrl($scope, $rootScope, data)
{
	$scope.messages = data;
	
};


/**
 * Dashboard resolver
 */
dashboardCtrl.resolve = {
  data: function ($rootScope, $config, Messages) 
  {
      $rootScope.app.unreadMessages = Messages.unreadCount();
      if($rootScope.app.unreadMessages == 0 ){
          $('#msgBubble').hide();
      }else{
          $('#msgBubble').show();
      }
  	  return Messages.unread();
  }
}


dashboardCtrl.$inject = ['$scope', '$rootScope', 'data'];
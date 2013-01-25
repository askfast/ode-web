'use strict';


/**
 * Messages Controller
 */
function messagesCtrl($scope, $rootScope, messages)
{
  var self = this;
  $scope.messages = messages;

  console.log('messages ->', messages);
}


/**
 * Messages resolver
 */
messagesCtrl.resolve = {
  messages: function (Messages) 
  {
    return Messages.query();
  }
}


messagesCtrl.$inject = ['$scope', '$rootScope', 'messages'];
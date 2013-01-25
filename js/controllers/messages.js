'use strict';


/**
 * Messages Controller
 */
function messagesCtrl($scope, $rootScope, $config, messages)
{
  var self = this;
  

  $scope.boxes = {
    inbox: true
  };


  $scope.boxer = function(box)
  {
    $scope.messages = [];
    var filtered = [];

    angular.forEach(messages, function(message, index)
    {
      message.date = new Date(message.creationTime).toString($config.datetime.format);

      message.sender = message.requester.split('personalagent/')[1].split('/')[0];

      if (box != 'trash')
      {
        if (message.box == box) filtered.push(message);        
      }
      else
      {
        if (message.state == 'TRASH') filtered.push(message);
      };



    });

    $scope.messages = filtered;
  };


  $scope.boxer('inbox');


};


/**
 * Messages resolver
 */
messagesCtrl.resolve = {
  messages: function (Messages) 
  {
    return Messages.query();
  }
};


messagesCtrl.$inject = ['$scope', '$rootScope', '$config', 'messages'];
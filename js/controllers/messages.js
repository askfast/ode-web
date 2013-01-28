'use strict';


/**
 * Messages Controller
 */
function messagesCtrl($scope, $rootScope, $config, $q, messages, Messages)
{
  var self = this;

  $scope.fixTabHeight = function(uuid)
  {
    var tabHeight = $('.tabs-left .nav-tabs').height();
    var contentHeight = $('.tabs-left .tab-content #msg-' + uuid).height();

    if (tabHeight > contentHeight)
    {
      $('.tabs-left .tab-content #msg-' + uuid).css({ height: $('.tabs-left .nav-tabs').height() });
    };
  };

  $scope.boxer = function(box)
  {
    $scope.composeView = false;
    $scope.boxes = {
      inbox: false,
      outbox: false,
      trash: false
    };
    $scope.boxes[box] = true;

    $scope.messages = [];
    var filtered = [];
    angular.forEach(messages, function(message, index)
    {
      message.date = new Date(message.creationTime).toString($config.datetime.format);
      message.sender = message.requester.split('personalagent/')[1].split('/')[0];
      switch (box)
      {
        case 'inbox':
          if (message.box == 'inbox' &&
              message.state != 'TRASH')
          {
            filtered.push(message);
          };
        break;
        case 'outbox':
          if (message.box == 'outbox')
          {
            filtered.push(message);
          };
        break;
        case 'trash':
          if (message.box == 'inbox' &&
              message.state == 'TRASH')
          {
            filtered.push(message);
          };
        break;
      };
    });
    $scope.messages = filtered;
    //$scope.fixTabHeight(filtered[0].uuid);
  };
  $scope.boxer('inbox');

  

  $scope.composeView = true;


  $scope.delete = function(uuid)
  {
    var uuids = [];
    uuids.push(uuid);

    Messages.delete(uuids).
    then(function()
    {
      $scope.messages = Messages.query();
      $scope.boxer('inbox'); 
    });
  };

  $scope.composeMessage = function()
  {
    $scope.composeView = true;
    $scope.boxes = {
      inbox: false,
      outbox: false,
      trash: false
    };
  };

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


messagesCtrl.$inject = ['$scope', '$rootScope', '$config', '$q', 'messages', 'Messages'];
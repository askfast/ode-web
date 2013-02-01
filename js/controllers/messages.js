'use strict';







WebPaige.
factory('Messages', function ($resource, $config, $q, $route, $timeout, Storage, $rootScope) 
{

  var Messages = $resource(
    $config.host + '/question/:action',
    {
    },
    {
      query: {
        method: 'GET',
        params: {action: '', 0: 'dm'},
        isArray: true
      },
      get: {
        method: 'GET',
        params: {}
      },
      send: {
        method: 'POST',
        params: {action : 'sendDirectMessage'}
      },
      save: {
        method: 'POST',
        params: {}
      },
      change: {
        method: 'POST',
        params: {action : 'changeState'}
      },
      delete: {
        method: 'POST',
        params: {action: 'deleteQuestions'}
      }
    }
  );
  

  Messages.prototype.query = function () 
  {    

    var deferred = $q.defer();
        //,localProfile = Storage.get('messages');

    // if (localProfile)
    // {
    //   deferred.resolve(angular.fromJson(localSlots));
    //   return deferred.promise;
    // }
    // else
    // {
      var successCb = function (result) 
      {

        // if (angular.equals(result, [])) 
        // {
        //   deferred.reject("There is no groups!");
        // }
        // else 
        // {
        //   $rootScope.notify( { message: 'Groups downloaded from back-end.' } );

          Storage.add('messages', angular.toJson(result));
        //   $rootScope.notify( { message: 'Groups data added to localStorage.' } );

          deferred.resolve(result);
        // }
      };

      Messages.query(successCb);

      return deferred.promise;
    // }
  };


  Messages.prototype.local = function()
  {
    return angular.fromJson(Storage.get('messages'));
  };




  Messages.prototype.receviersList = function()
  {
    var membersLocal = angular.fromJson(Storage.get('members')),
        members = [],
        groupsLocal = angular.fromJson(Storage.get('groups')),
        groups = [];
    angular.forEach(membersLocal, function(member, index)
    {
      members.push({
        id: index,
        name: member.name,
        group: 'Users'
      });
    });
    angular.forEach(groupsLocal, function(group, index)
    {
      groups.push({
        id: group.uuid,
        name: group.name,
        group: 'Groups'
      });
    });
    return angular.extend(members, groups);
  };




  Messages.prototype.send = function (message) 
  {
    var members = [],
        types = [];

    angular.forEach(message.receivers, function(receiver, index)
    {
      members.push(receiver.id);
    });

    if (message.type.sms) types.push('sms');
    if (message.type.message) types.push('paige');
    if (message.type.email) types.push('email');

    var message = {
      members: members,
      content: message.body,
      subject: message.subject,
      types: types
    };

    var deferred = $q.defer();
    var successCb = function (result) 
    {
      deferred.resolve(result);
    };
    Messages.send(null, message, successCb);
    return deferred.promise;
  };





  Messages.prototype.unread = function()
  {
    var messages = Messages.prototype.local(),
        count = 0;
    angular.forEach(messages, function(message, index)
    {
      //console.log('sender ->', message.requester.split('personalagent/')[1].split('/')[0], message.state);
      if (message.state == 'NEW' &&
          message.requester.split('personalagent/')[1].split('/')[0] == 'apptestknrm') count++;
    });
    return count;
  };


  Messages.prototype.state = function (state) 
  {

  };


  Messages.prototype.delete = function (uuids) 
  {
    var deferred = $q.defer();
    var successCb = function (result) 
    {
      deferred.resolve(result);
    };
    Messages.delete(null, {members: uuids}, successCb);
    return deferred.promise;
  };



  return new Messages;
});





/**
 * ************************************************************************************************
 * ************************************************************************************************
 * ************************************************************************************************
 * ************************************************************************************************
 */







/**
 * Messages Controller
 */
function messagesCtrl($scope, $rootScope, $config, $q, messages, Messages)
{
  var self = this;



  $scope.receviersList = Messages.receviersList();



  $scope.sendMessage = function(message)
  {
    Messages.send(message).
    then(function(result)
    {
      $scope.composeView = false;
      
      // TODO
      // Reset compose form
      
      console.log('message sent', result);
    });
  };



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

  

  //$scope.composeView = true;


  $scope.delete = function(uuid)
  {
    var uuids = [];
    uuids.push(uuid);

    Messages.delete(uuids).
    then(function()
    {
      $scope.messages = Messages.query().
      then(function()
      {
        $scope.boxer('inbox');
      });
      
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
'use strict';

WebPaige.
factory('Messages', function ($resource, $config, $q, $route, $timeout, Storage, $rootScope) 
{
  /**
   * Messages resource
   */
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
      changeState: {
        method: 'POST',
        params: {action : 'changeState'}
      },
      delete: {
        method: 'POST',
        params: {action : 'changeState'}
      },
      deleteforever : {
      	method: 'POST',
        params: {action: 'deleteQuestions'}
      }
    }
  );
  

  /**
   * Query messages from back-end
   */
  Messages.prototype.query = function () 
  {
    var deferred = $q.defer();
    Messages.query(function(result) 
    {
      Storage.add('messages', angular.toJson(result));
      deferred.resolve(Messages.prototype.filter(result));
    });
    return deferred.promise;
  };


  /**
   * Filter messages based on box
   */
  Messages.prototype.filter = function(messages)
  {
    /**
     * Set inboxes
     */
    var filtered = {
      inbox: [],
      outbox: [],
      trash: []
    };
    /**
     * Loop through messages
     */
    angular.forEach(messages, function(message, index)
    {
      /**
       * Inbox
       */
      if (message.box == 'inbox' &&
          message.state != 'TRASH' && message.state != 'FOREVER' )
      {
        filtered.inbox.push(message);
      }
      /**
       * Outbox
       */
      else if (message.box == 'outbox' && message.state != 'TRASH')
      {
        filtered.inbox.push(message);
      }
      /**
       * Trash
       */
      else if ((message.box == 'inbox' || message.box == 'outbox') &&
          message.state == 'TRASH')
      {
        filtered.inbox.push(message);
      };
    });
    return filtered;
  };


  /**
   * Serve messages from localStorage
   */
  Messages.prototype.local = function()
  {
    return angular.fromJson(Storage.get('messages'));
  };


  /**
   * Find a message in cache
   */
  Messages.prototype.find = function(id)
  {
    var gem;
    angular.forEach(Messages.prototype.local(), function(message, index)
    {
      if (message.uuid == id)
      {
        gem = message;
      }
    });
    return gem;
  };


  /**
   * Serve receivers list
   */
  Messages.prototype.receviersList = function()
  {
    var membersLocal = angular.fromJson(Storage.get('members')),
        groupsLocal = angular.fromJson(Storage.get('groups'));
    
    var receivers  = [];

    angular.forEach(membersLocal, function(member, index)
    {
        receivers.push({
        id: member.uuid,
        name: member.name,
        group: 'Users'
      });
    });

    angular.forEach(groupsLocal, function(group, index)
    {
        receivers.push({
        id: group.uuid,
        name: group.name,
        group: 'Groups'
      });
    });

    return receivers;
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


  Messages.prototype.changeState = function (uuids,state){
	var deferred = $q.defer();
	var successCb = function (result) 
	{
	  deferred.resolve(result);
	};
	Messages.changeState(null, {ids: uuids, state: state}, successCb);
	return deferred.promise;
  };


  Messages.prototype.delete = function (uuids) 
  {
    var deferred = $q.defer();
    var successCb = function (result) 
    {
      deferred.resolve(result);
    };
    Messages.delete(null, {ids: uuids, state: "TRASH"}, successCb);
    return deferred.promise;
  };

  Messages.prototype.deleteforever = function (uuids){
  	var deferred = $q.defer();
    var successCb = function (result) 
    {
      deferred.resolve(result);
    };
    Messages.deleteforever(null, {members: uuids}, successCb);
    return deferred.promise;
  }

  return new Messages;
});

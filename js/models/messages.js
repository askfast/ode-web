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
        params: {action: 'sendDirectMessage'}
      },
      save: {
        method: 'POST',
        params: {}
      },
      changeState: {
        method: 'POST',
        params: {action: 'changeState'}
      },
      // delete: {
      //   method: 'POST',
      //   params: {action : 'changeState'}
      // },
      delete : {
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
      /**
       * Save to localStorage
       */
      Storage.add('messages', angular.toJson(result));

      deferred.resolve(Messages.prototype.filter(result));
    });

    return deferred.promise;
  };


  /**
   * Filter messages based on box
   */
  Messages.prototype.filter = function (messages)
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
          message.state != 'TRASH')
      {
        filtered.inbox.push(message);
      }
      /**
       * Outbox
       */
      else if ( message.box == 'outbox' && 
                message.state != 'TRASH')
      {
        filtered.outbox.push(message);
      }
      /**
       * Trash
       */
      else if ( (message.box == 'inbox' || message.box == 'outbox') &&
                message.state == 'TRASH')
      {
        filtered.trash.push(message);
      };
    });
    return filtered;
  };


  /**
   * Serve messages from localStorage
   */
  Messages.prototype.local = function ()
  {
    return angular.fromJson(Storage.get('messages'));
  };


  /**
   * Find a message in cache
   */
  Messages.prototype.find = function (id)
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
  Messages.prototype.receviersList = function ()
  {
    /**
     * Get local unique members list and groups, and init receivers list
     */
    var members   = angular.fromJson(Storage.get('members')),
        groups    = angular.fromJson(Storage.get('groups')),
        receivers = [];

    /**
     * Loop through members
     */
    angular.forEach(members, function(member, index)
    {
        receivers.push({
        id: member.uuid,
        name: member.name,
        group: 'Users'
      });
    });

    /**
     * Loop through groups
     */
    angular.forEach(groups, function(group, index)
    {
        receivers.push({
        id: group.uuid,
        name: group.name,
        group: 'Groups'
      });
    });

    return receivers;
  };


  /**
   * Send a message
   */
  Messages.prototype.send = function (message) 
  {
    var deferred = $q.defer(),
        members = [],
        types = [];

    angular.forEach(message.receivers, function (receiver, index)
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

    Messages.send(null, message, function (result) 
    {
      deferred.resolve(result);
    });

    return deferred.promise;
  };


  /**
   * Get unread messages
   */
  Messages.prototype.unread = function ()
  {
    /**
     * Get messages and init counter
     */
    var messages = Messages.prototype.local(),
        unread = [];
    
    /**
     * Loop through local messages
     */
    angular.forEach(messages, function (message, index)
    {
      /**
       * Checks
       */
      if (message.box   == 'inbox' &&
          message.state == 'NEW')
      {
        unread.push(message);
      };
    });

    return unread;
  };


  /**
   * Count unread messages
   */
  Messages.prototype.unreadCount = function ()
  {
    /**
     * Get messages and init counter
     */
    var messages = Messages.prototype.local(),
        counter = 0;
    
    /**
     * Loop through local messages
     */
    angular.forEach(messages, function (message, index)
    {
      /**
       * Checks
       */
      if (message.box   == 'inbox' &&
          message.state == 'NEW')
      {
        counter++;
      };
    });

    return counter;
  };


  /**
   * Change message state
   */
  Messages.prototype.changeState = function (ids, state)
  {
  	var deferred = $q.defer();

  	Messages.changeState(null, {
      ids: ids, 
      state: state 
    }, function (result) 
    {
      deferred.resolve(result);
    });

  	return deferred.promise;
  };



  /**
   * Delete message(s)
   */
  Messages.prototype.remove = function (id)
  {
    var deferred = $q.defer();

    Messages.prototype.changeState(id, 'TRASH')
    .then(function (result) 
    {
      deferred.resolve(result);
    });

    return deferred.promise;
  };



  /**
   * Restore message(s)
   */
  Messages.prototype.restore = function (id)
  {
    var deferred = $q.defer();

    Messages.prototype.changeState(id, 'SEEN')
    .then(function (result) 
    {
      deferred.resolve(result);
    });

    return deferred.promise;
  };


  /**
   * Delete forever
   */
  Messages.prototype.emptyTrash = function (ids)
  {
    var deferred = $q.defer(),
        messages = Messages.prototype.local(),
        bulk = [];

    /**
     * Loop through messages
     */
    angular.forEach(messages, function(message, index)
    {
      if ( (message.box == 'inbox' || message.box == 'outbox') &&
                message.state == 'TRASH')
      {
        bulk.push(message.uuid);
      };
    });

    Messages.delete(null, { 
      members: bulk 
    }, function (result) 
    {
      deferred.resolve(result);
    });

    return deferred.promise;
  };


  return new Messages;
});

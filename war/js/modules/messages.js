'use strict';

/**
 * Messages Controller
 */
function messagesCtrl($scope, $rootScope, $config, $q, $location, $route, data, Messages, Storage)
{
  /**
   * Fix styles
   */
  $rootScope.fixStyles();

  
  /**
   * Self this
   */
  var self = this;


  /**
   * Receivers list
   */
  $scope.receviersList = Messages.receviers();


  /**
   * Set messages
   */
  $scope.messages = data;


  /**
   * Selections
   */
  $scope.selection = {
    inbox: {},
    outbox: {},
    trash: {}
  };


  /**
   * Selection masters
   */
  $scope.selectionMaster = {
    inbox: '',
    outbox: '',
    trash: ''
  };


  /**
   * Initial value for broadcasting
   */
  $scope.broadcast = {
    sms: false,
    email: false
  };


  /**
   * Set origin container for returning back to origin box
   */
  $scope.origin = 'inbox';


  /**
   * View setter
   */
  function setView (hash)
  {
    /**
     * Default view settings
     */
    $scope.views = {
      compose: false,
      message: false,
      inbox:   false,
      outbox:  false,
      trash:   false
    };
    /**
     * Set correct one true
     */
    $scope.views[hash] = true;
  };


  /**
   * Switch between the views and set hash accordingly
   */
  $scope.setViewTo = function (hash)
  {
    /**
     * Let angular know things are changing
     */
    $scope.$watch(hash, function()
    {
      /**
       * Set hash
       */
      $location.hash(hash);
      /**
       * Set view intern
       */
      setView(hash);
    });
  };


  /**
   * If no params or hashes given in url
   */
  if (!$location.hash())
  {
    /**
     * Set view
     */
    var view = 'inbox';
    /**
     * Adjust url
     */
    $location.hash('inbox');
  }
  else
  {
    /**
     * If given use what's supplied
     */
    var view = $location.hash();
  };


  /**
   * Set view
   */
  setView(view);

    
  /**
   * Extract view action from url and set message view
   */
  if ($location.search().uuid)
  {
    setMessageView($location.search().uuid);
  };


  /**
   * TODO
   * Possible bug..
   * Still issues with changing state of the message
   * 
   * Set given group for view
   */
  function setMessageView (id)
  {
    /**
     * Set loading
     */
    $rootScope.loading = {
      status: true,
      message: $rootScope.ui.message.loadingMessage
    };
    /**
     * Set view
     */
    setView('message');
    /**
     * Set hash
     */
    $scope.setViewTo('message');
    /**
     * Find message
     */
    $scope.message = Messages.find(id);

    /**
     * Change to read if message not seen yet
     * Check only in inbox because other box messages
     * can have 'NEW' state as well but those states are not shown
     *
     * Maybe only for 'trash' box to show state in later stages
     */
    if ($scope.message.state == "NEW" && $scope.message.box == 'inbox')
    {
      /**
       * Trigger change state call
       */
      Messages.changeState([id], 'READ')
      .then( function (result)
      {
        console.log('state changed');
      });
      /**
       * Loop through in inbox
       */
      var _inbox = [];
      angular.forEach($scope.messages.inbox, function (message, index)
      {
        if (message.uuid == $scope.message.uuid)
        {
          /**
           * Change state for view
           */
          message.state = "READ";
        };
        /**
         * Push changes message to inbox
         */
        _inbox.push(message);
      });
  		/**
       * Update inbox container in view
       */
  	  $scope.messages.inbox = _inbox;
  	  // console.log($scope.messages.inbox);
      Messages.unreadCount(); 
    };
    /**
     * Turn off loading
     */
    $rootScope.loading = {
      status: false
    };
  };


  /**
   * Request for a message
   */
  $scope.requestMessage = function (current, origin)
  {
    /**
     * Set origin
     */
    $scope.origin = origin;
    /**
     * Set selected group for view
     */
    setMessageView(current);
    /**
     * Let angular know things are changing
     */
    $scope.$watch($location.search(), function()
    {
      /**
       * Set hash
       */
      $location.search({
        uuid: current
      });
    });
  };


  /**
   * Compose message view toggler
   */
  $scope.composeMessage = function()
  {
    /** 
     * Check on status
     */
    if ($scope.views.compose)
    {
      /**
       * Close all
       */
      $scope.closeTabs();
    }
    else
    {
      /**
       * Reset inline form value
       */
      $scope.message = {};
      /**
       * Set views
       */
      $scope.setViewTo('inbox');
    };

  };


  /**
   * Reset views
   */
  $scope.closeTabs = function()
  {
    /**
     * Reset message container
     */
    $scope.message = {};
    /**
     * Remove uuid from url
     */
    $location.search({});
    /**
     * Set view to inbox
     */
    setView($scope.origin);
    /**
     * Set hash
     */
    $scope.setViewTo($scope.origin);
    /**
     * Clear session cache for escalation data
     */
    Storage.session.remove('escalation');
  };


  /**
   * Toggle selections
   */
  $scope.toggleSelection = function(messages, inbox, master)
  {
    /**
     * Set flag
     */
    var flag = (master) ? true : false;
    /**
     * Loop through
     */
    angular.forEach(messages, function(message, index)
    {
      $scope.selection[inbox][message.uuid] = flag;
    });
  };


  /**
   * Remove message
   */
  $scope.removeMessage = function (id)
  {
    /**
     * Set preloader
     */
    $rootScope.loading = {
      status: true,
      message: $rootScope.ui.message.removing
    };
    /**
     * Init bulk
     */
    var bulk = [];
    /**
     * Push it
     */
    bulk.push(id);
    /**
     * Remove message
     */
    Messages.remove(bulk)
    .then(function(result)
    {
      /**
       * Inform user
       */
      $rootScope.notify({
        status: true,
        type: 'alert-success',
        message: $rootScope.ui.message.removed
      });
      /**
       * Set loading to refreshing
       */
      $rootScope.loading = {
        status: true,
        message: $rootScope.ui.message.refreshing
      };
      /**
       * Query messages
       */
      Messages.query()
      .then(function(messages)
      {
        /**
         * Reload messages
         */
        $scope.messages = messages;
        /**
         * Set preloader
         */
        $rootScope.loading = false;
        /**
         * Return to origin
         */
        $scope.closeTabs();
        /**
         * Turn off loading
         */
        $rootScope.loading = {
          status: false
        };
      });
    });
  };


  /**
   * Remove messages
   */
  $scope.removeMessages = function (selection)
  {
    /**
     * Set loading
     */
    $rootScope.loading = {
      status: true,
      message: $rootScope.ui.message.removingSelected
    };
    /**
     * Init vars
     */
    var ids = [];
    /**
     * Loop through the selection
     */
    angular.forEach(selection, function(flag, id)
    {
      /**
       * If true push it
       */
      if (flag)
      {
        ids.push(id);
      }
    });
    /**
     * Remove messages
     */
    Messages.remove(ids)
    .then(function(result)
    {
      /**
       * Inform user
       */
      $rootScope.notify({
        status: true,
        type: 'alert-success',
        message: $rootScope.ui.message.removed
      });
      /**
       * Set loading to refreshing
       */
      $rootScope.loading = {
        status: true,
        message: $rootScope.ui.message.refreshing
      };
      /**
       * Query messages
       */
      Messages.query()
      .then(function(messages)
      {
        /**
         * Reload messages
         */
        $scope.messages = messages;
        /**
         * Turn off preloader
         */
        $rootScope.loading = {
          status: false
        };
      });
    });
  };


  /**
   * Restore a message
   */
  $scope.restoreMessage = function (id)
  {
    /**
     * Set preloader
     */
    $rootScope.loading = {
      status: true,
      message: $rootScope.ui.message.restoring
    };
    /**
     * Init var
     */
    var bulk = [];
    /**
     * Push it
     */
    bulk.push(id);
    /**
     * Restore message
     */
    Messages.restore(bulk)
    .then(function(result)
    {
      /**
       * Inform user
       */
      $rootScope.notify({
        status: true,
        type: 'alert-success',
        message: $rootScope.ui.message.restored
      });
      /**
       * Set loading to refreshing
       */
      $rootScope.loading = {
        status: true,
        message: $rootScope.ui.message.refreshing
      };
      /**
       * Query messages
       */
      Messages.query()
      .then(function(messages)
      {
        /**
         * Reload messages
         */
        $scope.messages = messages;
        /**
         * Turn off preloader
         */
        $rootScope.loading = {
          status: false
        };
      });
    });
  };


  /**
   * Restore messages
   */
  $scope.restoreMessages = function (selection)
  {
    /**
     * Set loading
     */
    $rootScope.loading = {
      status: true,
      message: $rootScope.ui.message.restoringSelected
    };
    /**
     * Init vars
     */
    var ids = [];
    /**
     * Loop through
     */
    angular.forEach(selection, function(flag, id)
    {
      /**
       * If true push it
       */
      if (flag)
      {
        ids.push(id);
      }
    });
    /**
     * Restore message
     */
    Messages.restore(ids)
    .then(function(result)
    {
      /**
       * Inform user
       */
      $rootScope.notify({
        status: true,
        type: 'alert-success',
        message: $rootScope.ui.message.removed
      });
      /**
       * Set loading to refreshing
       */
      $rootScope.loading = {
        status: true,
        message: $rootScope.ui.message.refreshing
      };
      /**
       * Query messages
       */
      Messages.query()
      .then(function(messages)
      {
        /**
         * Reload messages
         */
        $scope.messages = messages;
        /**
         * Turn off preloader
         */
        $rootScope.loading = {
          status: false
        };
      });
    });
  };


  /**
   * Empty trash
   */
  $scope.emptyTrash = function ()
  {
    /**
     * Set preloader
     */
    $rootScope.loading = {
      status: true,
      message: $rootScope.ui.message.emptying
    };
    /**
     * Empty trash
     */
    Messages.emptyTrash()
    .then(function(result)
    {
      /**
       * Inform user
       */
      $rootScope.notify({
        status: true,
        type: 'alert-success',
        message: $rootScope.ui.message.empited
      });
      /**
       * Set loading to refreshing
       */
      $rootScope.loading = {
        status: true,
        message: $rootScope.ui.message.refreshing
      };
      /**
       * Query messages
       */
      Messages.query()
      .then(function(messages)
      {
        /**
         * Reload messages
         */
        $scope.messages = messages;
        /**
         * Turn off preloader
         */
        $rootScope.loading = {
          status: false
        };
      });
    });    
  };



	/**
   * Fix for not displaying original sender in multiple receivers selector
   * in the case that user wants to add more receivers to the list  
   */
  $("div#composeTab select.chzn-select").chosen()
  .change(function(item)
  {
    /**
     * Loop through list items of chosen
     */
  	$.each($(this).next().find("ul li.result-selected"), function (i,li)
    {
      /**
       * Set name
       */
  		var name = $(li).html();
      /**
       * Loop though options
       */
  		$.each($("div#composeTab select.chzn-select option"), function (j,opt)
      {
        /**
         * If found
         */
	      if(opt.innerHTML == name)
        {
          /**
           * Set option to selected
           */
          opt.selected = true;
	      };
	    });
  	});
  });


  /**
   * Reply a amessage
   */
  $scope.reply = function(message)
  {
    /**
     * Switch view to compose
     */
    setView('compose');

    /**
     * Set hash to compose
     */
    $scope.setViewTo('compose');

    /**
     * Get members from localStorage
     */
    var members = angular.fromJson(Storage.get('members')),
        /**
         * Extract sender id
         */
        senderId = message.requester.split('personalagent/')[1].split('/')[0],
        /**
         * Find sender's name in members list
         */
        name = (typeof members[senderId] == 'undefined' ) ? senderId : members[senderId].name;

    /**
     * Set data in compose form
     */
    $scope.message = {
      subject: 'RE: ' + message.subject,
      receivers: [{
        group: 'Users', 
        id: senderId , 
        name: name
      }]
    };

    /**
     * Trigger chosen
     */
    angular.forEach($("div#composeTab select.chzn-select option"), function (option, index)
    {
      if (option.innerHTML == name)
      {
        option.selected = true;
      };
    });

    /**
     * Let chosen know list is updated
     */
    $("div#composeTab select.chzn-select").trigger("liszt:updated");
  };

  
  /**
   * Send message
   */
  $scope.send = function (message, broadcast)
  {
    /**
     * Set loading
     */
    $rootScope.loading = {
      status: true,
      message: $rootScope.ui.message.sending
    };
    /**
     * Empty trash
     */
    Messages.send(message, broadcast)
    .then(function(uuid)
    {
      /**
       * Inform user
       */
      $rootScope.notify({
        status: true,
        type: 'alert-success',
        message: $rootScope.ui.message.sent
      });
      /**
       * Set loading
       */
      $rootScope.loading = {
        status: true,
        message: $rootScope.ui.message.refreshing
      };
      /**
       * Query messages
       */
      Messages.query()
      .then(function(messages)
      {
        /**
         * Reload messages
         */
        $scope.messages = messages;
        /**
         * Close tabs
         */
        $scope.closeTabs();
        /**
         * Redirect to messge view
         */
        $scope.requestMessage(uuid, $scope.origin);
        /**
         * Turn off preloader
         */
        $rootScope.loading = {
          status: false
        };
      });
    });
  };

    
  /**
   * Extract escalation information
   */
  if ($location.search().escalate)
  {
    var escalation = angular.fromJson(Storage.session.get('escalation'));
    /**
     * Grab group uuid
     */
    var name = escalation.group.split('>')[1].split('<')[0];
    var uuid = escalation.group.split('uuid=')[1].split('#view')[0];
    /**
     * Wait a bit till DOM is ready
     */
    setTimeout (function ()
    {
      /**
       * Trigger chosen
       */
      angular.forEach($("div#composeTab select.chzn-select option"), function (option, index)
      {
        /**
         * Find the correct option
         */
        if (option.innerHTML == name)
        {
          /**
           * Set selected
           */
          option.selected = true;
        };
      });
      /**
       * Let chosen know list is updated
       */
      $("div#composeTab select.chzn-select").trigger("liszt:updated");
    }, 100);
    /**
     * Set data in compose form
     */
    $scope.message = {
      subject: $rootScope.ui.message.escalation,
      receivers: [{
        group: 'Groups', 
        id: uuid, 
        name: name
      }],
      body: $rootScope.ui.message.escalationBody(escalation.diff, escalation.start.date , escalation.start.time ,escalation.end.date ,escalation.end.time)
    };
    /**
     * Set broadcasting options
     */
    $scope.broadcast = {
      sms: true
    };
  };
  
}



/**
 * Messages resolver
 */
messagesCtrl.resolve = {
  data: function ($route, Messages, Storage) 
  {
    return Messages.query();
  }
};




messagesCtrl.$inject = ['$scope', '$rootScope', '$config', '$q', '$location', 
                        '$route', 'data', 'Messages', 'Storage'];


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
      remove : {
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

      /**
       * Update message counter
       */
      Messages.prototype.unreadCount();

      /**
       * Return promised
       */
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
       * If message has no subject
       */
      if (message.subject == '') message.subject = '-No Subject-';

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
    /**
     * Loop through local messages
     */
    angular.forEach(Messages.prototype.local(), function(message, index)
    {
      /**
       * Catched you
       */
      if (message.uuid == id)
      {
        gem = message;
      };
    });

    return gem;
  };


  /**
   * Serve receivers list
   */
  Messages.prototype.receviers = function ()
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
  Messages.prototype.send = function (message, broadcast) 
  {
    /**
     * Init vars
     */
    var deferred = $q.defer(),
        members = [],
        types = [];

    /**
     * Loop through receivers
     */
    angular.forEach(message.receivers, function (receiver, index)
    {
      members.push(receiver.id);
    });

    /**
     * Set types
     * 'paige' is default type
     */
    types.push('paige');
    /**
     * Set 'sms' if it's selected
     */
    if (broadcast.sms) types.push('sms');
    /**
     * Set 'email' if its selected
     */
    if (broadcast.email) types.push('email');

    /**
     * Construct message
     */
    var message = {
      members: members,
      content: message.body,
      subject: message.subject,
      types: types
    };

    /**
     * Send message
     */
    Messages.send(null, message, function (result) 
    {
      /**
       * Message send call returns only uuid and that is parsed as json
       * by angular, this is a fix for converting returned object to plain string
       */
      var returned = '';
      angular.forEach(result, function (chr, i)
      {
        returned += chr;
      });

      deferred.resolve(returned);
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
    /**
     * No need to return but set rootScope directly
     */
    $rootScope.app.unreadMessages = counter;
  };


  /**
   * Change message state
   */
  Messages.prototype.changeState = function (ids, state)
  {
    var deferred = $q.defer();
    /**
     * Make change state call
     */
    Messages.changeState(null, {
      ids: ids, 
      state: state 
    }, function (result) 
    {
      /**
       * Return promised
       */
      deferred.resolve(result);
    });
    /**
     * Change message state locally as well
     * if it is READ
     */
    if (state == 'READ')
    {
      /**
       * Get messages
       */
      var messages = angular.fromJson(Storage.get('messages')),
          converted = [];
      /**
       * Loop through messages
       */
      angular.forEach(messages, function (message, index)
      {
        /**
         * Loop through given array of ids
         */
        angular.forEach(ids, function (id, i)
        {
          /**
           * Catches
           */
          if (message.uuid == id)
          {
            message.state = 'READ';
          };
        });
        /**
         * Push in converted array
         */
        converted.push(message);
      });
      /**
       * Remove local messgaes container
       */
      Storage.remove('messages');
      /**
       * Store back in localStorage
       */
      Storage.add(angular.toJson('messages', converted));
      /**
       * Update unread message counter
       */
      Messages.prototype.unreadCount();
    };

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

    /**
     * Make seen message call
     */
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

    /**
     * Make delete call(s)
     */
    Messages.remove(null, { 
      members: bulk 
    }, function (result) 
    {
      deferred.resolve(result);
    });

    return deferred.promise;
  };


  return new Messages;
});


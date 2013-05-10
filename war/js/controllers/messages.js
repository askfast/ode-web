/*jslint node: true */
/*global angular */
'use strict';


angular.module('WebPaige.Controllers.Messages', [])


/**
 * Messages controller
 */
.controller('messages', 
[
	'$scope', '$rootScope', '$q', '$location', '$route', 'data', 'Messages', 'Storage', 'Timer', 'Offsetter',
	function ($scope, $rootScope, $q, $location, $route, data, Messages, Storage, Timer, Offsetter) 
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
	  $scope.messages 			= data.messages;
	  $scope.notifications 	= data.notifications;


	  /**
	   * Pagination
	   */
	  $scope.page = {
	  	inbox: 	0,
	  	outbox: 0,
	  	trash: 	0
	  };

	  $scope.paginate = {

	  	set: function (page, box)
	  	{
	  		$scope.page[box] = page;
	  	},

	  	next: function (box)
	  	{
	  		if ($scope.page[box] + 1 != $scope.messages[box].length)
	  			$scope.page[box]++;
	  	},

	  	before: function (box)
	  	{
	  		if ($scope.page[box] != 0)
	  			$scope.page[box]--;
	  	}
	  };


	  /**
	   * Selections
	   */
	  $scope.selection = {
	    inbox: 	{},
	    outbox: {},
	    trash: 	{}
	  };


	  /**
	   * Selection masters
	   */
	  $scope.selectionMaster = {
	    inbox: 	'',
	    outbox: '',
	    trash: 	''
	  };


	  /**
	   * Initial value for broadcasting
	   */
	  $scope.broadcast = {
	    sms: 		false,
	    email: 	false
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
	    $scope.views = {
	      compose: 				false,
	      message: 				false,
	      inbox:   				false,
	      outbox:  				false,
	      trash:   				false,
	      notifications: 	false,
	      scheaduler: 		false
	    };

	    $scope.views[hash] = true;
	  };


	  /**
	   * Switch between the views and set hash accordingly
	   */
	  $scope.setViewTo = function (hash)
	  {
	    $scope.$watch(hash, function ()
	    {
	      $location.hash(hash);

	      setView(hash);
	    });
	  };


	  /**
	   * If no params or hashes given in url
	   */
	  if (!$location.hash())
	  {
	    var view = 'inbox';

	    $location.hash('inbox');
	  }
	  else
	  {
	    var view = $location.hash();
	  };


	  /**
	   * Set view
	   */
	  setView(view);





    $scope.scheaduler = false;





	  /**
	   * Extract view action from url and set message view
	   */
	  if ($location.search().uuid)
	  {
	  	if ($location.hash() == 'scheaduler')
	  	{
		    setNotificationView($location.search().uuid);
	  	}
	  	else
	  	{
	  		setMessageView($location.search().uuid);
	  	}
	  }








	  /**
	   * TODO
	   * Possible bug..
	   * Still issues with changing state of the message
	   * 
	   * Set given group for view
	   */
	  function setMessageView (id)
	  {
	    $rootScope.statusBar.display($rootScope.ui.message.loadingMessage);

	    setView('message');

	    $scope.setViewTo('message');

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
	      Messages.changeState([id], 'READ')
	      .then(function (result)
	      {
	        if (result.error)
	        {
	          $rootScope.notifier.error('Error with changing message state.');
	          console.warn('error ->', result);
	        }
	        else
	        {
	          // console.log('state changed');
	        };
	      });

	      var _inbox = [];

	      angular.forEach($scope.messages.inbox, function (message, index)
	      {
	        if (message.uuid == $scope.message.uuid) message.state = "READ";

	        _inbox.push(message);
	      });

	  	  $scope.messages.inbox = _inbox;

	      Messages.unreadCount(); 
	    };

	    $rootScope.statusBar.off();
	  };


	  /**
	   * Request for a message
	   */
	  $scope.requestMessage = function (current, origin)
	  {
		  $scope.origin = origin;

	    setMessageView(current);

	    $scope.$watch($location.search(), function ()
	    {
	      $location.search({uuid: current});
	    });
	  };





	  function setNotificationView (id)
	  {
	  	$scope.origin = 'notifications';

    	$scope.scheaduler = true;

	    $scope.notification = Messages.notification.find(id);

	    console.log('notification ->', $scope.notification);

	    angular.forEach($scope.notification.types, function (type, index)
	  	{
	  		if (type == 'sms') $scope.broadcast.sms = true;
	  		if (type == 'email') $scope.broadcast.email = true;
	  	});

	    var members 	= angular.fromJson(Storage.get('members')),
	        name 			= members[$scope.notification.recipients[0]].name;

	    $scope.message = {
	      subject: 		$scope.notification.subject,
	      body: 			$scope.notification.message,
	      receivers: 	[{
	        group: 		'Users', 
	        id: 			$scope.notification.recipients[0], 
	        name: 		name
	      }]
	    };

	    $scope.scheadule = {
	    	title: 	$scope.notification.label,
	    	status: $scope.notification.active
	    }

	    angular.forEach($("div#composeTab select.chzn-select option"), function (option, index)
	    {
	      if (option.innerHTML == name) option.selected = true;
	    });

	    $("div#composeTab select.chzn-select").trigger("liszt:updated");




	    console.warn('offsets --->', $scope.notification.offsets, 'Offsets ->', Offsetter);

	    setTimeout(function ()
	  	{
	  		$scope.offsets = Offsetter.factory($scope.notification.offsets);
	  	}, 100);
	  }



	  /**
	   * Request for a notification
	   */
	  $scope.requestNotification = function (id)
	  {
	    $rootScope.statusBar.display('Getting notification..');

	    setView('scheaduler');

	    $scope.setViewTo('scheaduler');

	    setNotificationView(id);

	    $scope.$watch($location.search(), function ()
	    {
	      $location.search({uuid: id});
	    });

	    $rootScope.statusBar.off();
	  };







	  /**
	   * Compose message view toggler
	   */
	  $scope.composeMessage = function ()
	  {
	    if ($scope.views.compose)
	    {
	      $scope.closeTabs();
	    }
	    else
	    {
	      $scope.message = {};

	      $scope.setViewTo('inbox');
	    };
	  };


	  /**
	   * Reset views
	   */
	  $scope.closeTabs = function ()
	  {
	    $scope.message = {};

	    $location.search({});

	    setView($scope.origin);

	    $scope.setViewTo($scope.origin);

	    Storage.session.remove('escalation');
	  };


	  /**
	   * Toggle selections
	   */
	  $scope.toggleSelection = function (messages, inbox, master)
	  {
	    var flag = (master) ? true : false;

	    angular.forEach(messages, function (message, index)
	    {
	      $scope.selection[inbox][message.uuid] = flag;
	    });
	  };


	  /**
	   * Remove message
	   */
	  $scope.removeMessage = function (id)
	  {
	    $rootScope.statusBar.display($rootScope.ui.message.removing);

	    var bulk = [];

	    bulk.push(id);

	    Messages.remove(bulk)
	    .then(function (result)
	    {
	      if (result.error)
	      {
	        $rootScope.notifier.error('Error with removing message.');
	        console.warn('error ->', result);
	      }
	      else
	      {
	        $rootScope.notifier.success($rootScope.ui.message.removed);

	        $rootScope.statusBar.display($rootScope.ui.message.refreshing);

	        Messages.query()
	        .then(function (messages)
	        {
	          $scope.messages = messages;

	          $rootScope.loading = false;

	          $scope.closeTabs();

	          $rootScope.statusBar.off();
	        });
	      };
	    });
	  };


	  /**
	   * Remove messages
	   */
	  $scope.removeMessages = function (selection)
	  {
	    // console.log('it is coming to bulk remove ->', selection.length);

	    $rootScope.statusBar.display($rootScope.ui.message.removingSelected);

	    var ids = [];

	    angular.forEach(selection, function (flag, id)
	    {
	      if (flag) ids.push(id);
	    });

	    Messages.remove(ids)
	    .then(function (result)
	    {
	      if (result.error)
	      {
	        $rootScope.notifier.error('Error with removing messages.');
	        console.warn('error ->', result);
	      }
	      else
	      {
	        $rootScope.notifier.success($rootScope.ui.message.removed);

	        $rootScope.statusBar.display($rootScope.ui.message.refreshing);

	        Messages.query()
	        .then(function (messages)
	        {
	          $scope.messages = messages;

	          $rootScope.statusBar.off();
	        });
	      };
	    });
	  };


	  /**
	   * Restore a message
	   */
	  $scope.restoreMessage = function (id)
	  {
	    $rootScope.statusBar.display($rootScope.ui.message.restoring);

	    var bulk = [];

	    bulk.push(id);

	    Messages.restore(bulk)
	    .then(function (result)
	    {
	      if (result.error)
	      {
	        $rootScope.notifier.error('Error with restoring message.');
	        console.warn('error ->', result);
	      }
	      else
	      {
	        $rootScope.notifier.success($rootScope.ui.message.restored);

	        $rootScope.statusBar.display($rootScope.ui.message.refreshing);

	        Messages.query()
	        .then(function(messages)
	        {
	          $scope.messages = messages;

	          $rootScope.statusBar.off();
	        });
	      };
	    });
	  };


	  /**
	   * Restore messages
	   */
	  $scope.restoreMessages = function (selection)
	  {
	    $rootScope.statusBar.display($rootScope.ui.message.restoringSelected);

	    var ids = [];

	    angular.forEach(selection, function (flag, id)
	    {
	      if (flag) ids.push(id);
	    });

	    Messages.restore(ids)
	    .then(function (result)
	    {
	      if (result.error)
	      {
	        $rootScope.notifier.error('Error with restoring message.');
	        console.warn('error ->', result);
	      }
	      else
	      {
	        $rootScope.notifier.success($rootScope.ui.message.removed);

	        $rootScope.statusBar.display($rootScope.ui.message.refreshing);

	        Messages.query()
	        .then(function(messages)
	        {
	          $scope.messages = messages;

	          $rootScope.statusBar.off();
	        });
	      };
	    });
	  };


	  /**
	   * Empty trash
	   */
	  $scope.emptyTrash = function ()
	  {
	    $rootScope.statusBar.display($rootScope.ui.message.emptying);

	    Messages.emptyTrash()
	    .then(function (result)
	    {
	      if (result.error)
	      {
	        $rootScope.notifier.error('Error with emting trash.');
	        console.warn('error ->', result);
	      }
	      else
	      {
	        $rootScope.notifier.success($rootScope.ui.message.emptied);

	        $rootScope.statusBar.display($rootScope.ui.message.refreshing);

	        Messages.query()
	        .then(function (messages)
	        {
	          if (messages.error)
	          {
	            $rootScope.notifier.error('Error with getting messages.');
	            console.warn('error ->', messages);
	          }
	          else
	          {
	            $scope.messages = messages;

	            $rootScope.statusBar.off();
	          };
	        });
	      };
	    });    
	  };


		/**
	   * Fix for not displaying original sender in multiple receivers selector
	   * in the case that user wants to add more receivers to the list  
	   */
	  $("div#composeTab select.chzn-select").chosen()
	  .change(function (item)
	  {
	  	$.each($(this).next().find("ul li.result-selected"), function (i,li)
	    {
	  		var name = $(li).html();

	  		$.each($("div#composeTab select.chzn-select option"), function (j, opt)
	      {
		      if (opt.innerHTML == name) opt.selected = true;
		    });
	  	});
	  });


	  /**
	   * Reply a amessage
	   */
	  $scope.reply = function(message)
	  {
	    setView('compose');

	    $scope.setViewTo('compose');

	    var members 	= angular.fromJson(Storage.get('members')),
	        senderId 	= message.requester.split('personalagent/')[1].split('/')[0],
	        name 			= (typeof members[senderId] == 'undefined' ) ? senderId : members[senderId].name;

	    $scope.message = {
	      subject: 		'RE: ' + message.subject,
	      receivers: 	[{
	        group: 		'Users', 
	        id: 			senderId , 
	        name: 		name
	      }]
	    };

	    angular.forEach($("div#composeTab select.chzn-select option"), function (option, index)
	    {
	      if (option.innerHTML == name) option.selected = true;
	    });

	    $("div#composeTab select.chzn-select").trigger("liszt:updated");
	  };

	  
	  /**
	   * Send message
	   */
	  $scope.send = function (message, broadcast)
	  {
	    $rootScope.statusBar.display($rootScope.ui.message.sending);

	    if (message.receivers)
	    {
	      Messages.send(message, broadcast)
	      .then(function (uuid)
	      {
	        if (uuid.error)
	        {
	          $rootScope.notifier.error('Error with sending message.');
	          console.warn('error ->', uuid);
	        }
	        else
	        {
	          $rootScope.notifier.success($rootScope.ui.message.sent);

	          $rootScope.statusBar.display($rootScope.ui.message.refreshing);

	          Messages.query()
	          .then(function (messages)
	          {
	            if (messages.error)
	            {
	              $rootScope.notifier.error('Error with getting messages.');
	              console.warn('error ->', messages);
	            }
	            else
	            {
	              $scope.messages = messages;

	              $scope.closeTabs();

	              $scope.requestMessage(uuid, $scope.origin);

	              $rootScope.statusBar.off();
	            };
	          });
	        };
	      });
	    }
	    else
	    {
	      $rootScope.notifier.error($rootScope.ui.message.noReceivers);

	      $rootScope.statusBar.off();
	    };
	  };

	    
	  /**
	   * Extract escalation information
	   */
	  if ($location.search().escalate)
	  {
	    var escalation = angular.fromJson(Storage.session.get('escalation')),
	        name = escalation.group.split('>')[1].split('<')[0],
	        uuid = escalation.group.split('uuid=')[1].split('#view')[0];

	    setTimeout (function ()
	    {
	      angular.forEach($("div#composeTab select.chzn-select option"), function (option, index)
	      {
	        if (option.innerHTML == name) option.selected = true;
	      });

	      $("div#composeTab select.chzn-select").trigger("liszt:updated");
	    }, 100);

	    $scope.message = {
	      subject: $rootScope.ui.message.escalation,
	      receivers: [{
	        group: 'Groups', 
	        id: uuid, 
	        name: name
	      }],
	      body: $rootScope.ui.message.escalationBody(
	        escalation.diff, 
	        escalation.start.date, 
	        escalation.start.time,
	        escalation.end.date,
	        escalation.end.time)
	    };

	    $scope.broadcast = {
	      sms: true
	    };
	  };












	  /**
	   * Bulk cleaners for mailboxes
	   */
	  $scope.clean = {
	  	inbox: function ()
	  	{
	  		Messages.clean($scope.messages.inbox);
	  	},
	  	outbox: function ()
	  	{
	  		Messages.clean($scope.messages.outbox);
	  	},
	  	trash: function ()
	  	{
	  		Messages.clean($scope.messages.trash); 		
	  	}
	  };














	  /**
	   * Notifications API
	   */
	  /*
    Messages.notification.list()
    .then(function (result)
    {
      if (result.error)
      {
        $rootScope.notifier.error('Error with getting notifications..');
        console.warn('error ->', result);
      }
      else
      {
        console.log('notifications ->', result);

        $scope.notifications = result;
      };
    });
    */


    /**
     * Create notification
     */
    $scope.createNotification = function ()
    {
    	var notification = {
			 "sender" : 		"apptestknrm",
			 "recipients": 	["apptestknrm", "person1", "person2"],
			 "label": 			"mysubject xxxxxxx label",
			 "subject": 		"mysubject xxxxxx",
			 "message": 		"mymessage xxxxxx",
			 "offsets": 		[100100, 200200, 300300, 400400, 500500],
			 "repeat" : 		"week",
			 "types": 			["sms", "email", "paige"],
			 "active" : 		true
			};

	    Messages.notification.create(notification)
	    .then(function (result)
	    {
	      if (result.error)
	      {
	        $rootScope.notifier.error('Error with getting notifications..');
	        console.warn('error ->', result);
	      }
	      else
	      {
	        console.log('notification made ->', result);
	      };
	    });
    };


    /**
     * Edit notification
     */
    $scope.editNotification = function ()
    {
    	var notification = {
			 "sender" : 		"apptestknrm",
			 "recipients": 	["apptestknrm", "culusoy@ask-cs.com"],
			 "label": 			"mysubject [modified] label",
			 "subject": 		"mysubject [modified]",
			 "message": 		"mymessage [modified]",
			 "offsets": 		[10000, 20000, 30000, 40000],
			 "repeat" : 		"week",
			 "types": 			["sms"],
			 "active" : 		false
			};

	    Messages.notification.edit('271d820b-8ec4-41d1-a5f6-0845751e0a44', notification)
	    .then(function (result)
	    {
	      if (result.error)
	      {
	        $rootScope.notifier.error('Error with getting notifications..');
	        console.warn('error ->', result);
	      }
	      else
	      {
	        console.log('notification edited ->', result);
	      };
	    });
    };


    /**
     * Get notification
     */
    $scope.getNotification = function ()
    {
	    Messages.notification.get('271d820b-8ec4-41d1-a5f6-0845751e0a44')
	    .then(function (result)
	    {
	      if (result.error)
	      {
	        $rootScope.notifier.error('Error with getting notifications..');
	        console.warn('error ->', result);
	      }
	      else
	      {
	        // console.log('notification fetched ->', result);

	        $scope.notification = result;
	      };
	    });
    };

    // $scope.getNotification();

    /**
     * Delete notification
     */
    $scope.deleteNotification = function ()
    {
	    Messages.notification.remove('36a8fedc-ed7b-495d-b642-8ea1bfbc8c65')
	    .then(function (result)
	    {
	      if (result.error)
	      {
	        $rootScope.notifier.error('Error with getting notifications..');
	        console.warn('error ->', result);
	      }
	      else
	      {
	        console.log('notification deleted ->', result);
	      };
	    });
    };




	}
]);

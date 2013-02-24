'use strict';

/**
 * Messages Controller
 */
function messagesCtrl($scope, $rootScope, $config, $q, $location, $route, data, Messages, Storage)
{
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








  $rootScope.app.unreadMessages = Messages.unreadCount();
  if($rootScope.app.unreadMessages == 0 ){
  	$('#msgBubble').hide();
  }else{
  	$('#msgBubble').show();
  }









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
   * Switch between the views and set hash accordingly
   */
  $scope.setViewTo = function (hash)
  {
    /**
     * Let angular know things are changing
     */
    $scope.$watch($location.hash(), function()
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
   * Set given group for view
   */
  function setMessageView (id)
  {
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





  // /**
  //  * Change to read if message not seen yet
  //  */
  // if($scope.message.state == "NEW")
  // { 
  // 	angular.forEach($scope.messages.inbox, function(msg,index)
  //   {
  // 		if(msg.uuid == $scope.message.uuid)
  //     {
  // 			msg.state = "READ";
  // 			Messages.changeState([msg.uuid],"READ");

  // 			$rootScope.app.unreadMessages = $rootScope.app.unreadMessages-1;

  // 			if($rootScope.app.unreadMessages == 0 )
  //       {
		// 		 	$('#msgBubble').hide();
		// 		}
  //       else
  //       {
		// 		  $('#msgBubble').show();
		// 		};

  // 		}
  // 	});
  // };




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
   * TODO
   * Find a way to clear url if there is message uuid in url!
   * 
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
    $rootScope.loading = true;
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
      });
    });
  };


  /**
   * Remove messages
   */
  $scope.removeMessages = function (selection)
  {
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
     * Set preloader
     */
    $rootScope.loading = true;
    /**
     * Remove messages
     */
    Messages.remove(ids)
    .then(function(result)
    {
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
    $rootScope.loading = true;
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
      });
    });
  };


  /**
   * Restore messages
   */
  $scope.restoreMessages = function (selection)
  {
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
     * Set preloader
     */
    $rootScope.loading = true;
    /**
     * Restore message
     */
    Messages.restore(ids)
    .then(function(result)
    {
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
    $rootScope.loading = true;
    /**
     * Empty trash
     */
    Messages.emptyTrash()
    .then(function(result)
    {
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
  	$.each($(this).next().find("ul li.result-selected"),function(i,li)
    {
  		var name = $(li).html();
  		$.each($("div#composeTab select.chzn-select option"),function(j,opt)
      {
	      if(opt.innerHTML == name)
        {
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
     * Switch in views
     */
    $scope.views = {
      compose: true,
      message: false,
      default: false
    };
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
        name = (typeof members[senderId] == "undefined" )? senderId : members[senderId].name;

    /**
     * Set data in compose form
     */
    $scope.message = {
      subject: 'RE: ' + message.subject,
      receivers: [ {group: "Users" , id: senderId , name: name} ]
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
     * @type {[type]}
     */
    $("div#composeTab select.chzn-select").trigger("liszt:updated");
  };

  
  /**
   * Send message
   */
  $scope.send = function (message, broadcast)
  {
    /**
     * Set preloader
     */
    $rootScope.loading = true;
    /**
     * Empty trash
     */
    Messages.send(message, broadcast)
    .then(function(result)
    {
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
        $scope.closeTabs();
      });
    });
  };

};



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

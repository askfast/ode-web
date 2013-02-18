'use strict';

/**
 * Messages Controller
 */
function messagesCtrl($scope, $rootScope, $config, $q, $location, $route, data, Messages, Storage)
{
  /**
   * REMOVE
   * this if no prototypes used
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
   * Defaults for views
   */
  if ($route.current.params.messageId)
  {
    /**
     * TODO
     * Remove jquery hook later on, use reg. expression
     * for url in data-match-role for bs-navbar
     *
     * Ugly fix for making messages link active
     */
    $("ul.nav li:nth-child(3)").addClass('active');
    /**
     * Set views
     */
    $scope.views = {
      compose: false,
      message: true,
      default: false
    };
    /**
     * Set message
     */
    $scope.message = Messages.find($route.current.params.messageId);
  }
  else
  {
    /**
     * Set views
     */
    $scope.views = {
      compose: false,
      message: false,
      default: true
    };
  };


  /**
   * Compose message view toggler
   */
  $scope.composeMessage = function()
  {
    /**
     * Set views
     */
    if ($scope.views.compose)
    {
      $scope.views = {
        compose: false,
        message: false,
        default: true
      }; 
    }
    else
    {
      $scope.views = {
        compose: true,
        message: false,
        default: false
      };      
    };
  };


  /**
   * TODO
   * Find a way to clear url if there is message uuid in url!
   * 
   * Reset views
   */
  $scope.resetViews = function()
  {
    /**
     * Set views
     */
    $scope.views = {
      compose: false,
      message: false,
      default: true
    };    
    // console.warn('location ->', $location.replace(), $location);
    // $location.$$rewriteAppUrl('/messages');
    //$location.path('/messages');
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
        name = members[senderId].name;

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
    if ($route.current.params.messageId)
    {
      return Messages.filter(Messages.local());
    }
    else{
      return Messages.query();
    }
  }
};








messagesCtrl.$inject = ['$scope', '$rootScope', '$config', '$q', '$location', '$route', 'data', 'Messages', 'Storage'];
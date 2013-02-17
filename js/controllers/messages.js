'use strict';

/**
 * Messages Controller
 */
function messagesCtrl($scope, $rootScope, $config, $q, $location, $route, data, Messages)
{
  /**
   * REMOVE
   * this if no prototypes used
   */
  var self = this;


  /**
   * Receivers list
   */
  $scope.receviersList = Messages.receviersList();


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





	
  // $("div[ng-show='defaultView'] select.chzn-select").chosen().change( function(item){
  // 	$.each($(this).next().find("ul li.result-selected"),function(i,li){
  // 		var req_name = $(li).html();
  // 		$.each($("div[ng-show='composeView'] select.chzn-select option"),function(j,opt){
	 //      if(opt.innerHTML == req_name){
	 //          opt.selected = true;
	 //      }
	 //    });
  // 	});
  // });






  // $scope.$watch('boxes', function(newbox, oldbox)
  // {
	 // if(typeof newbox == "undefined"){
	 // 	return ;
	 // }
	 // if(newbox.inbox == false && newbox.outbox == false && newbox.trash == false ){
	 // 	// do nothing , Intermediate state
	 // }else if(newbox.inbox == true){
	 // 	$scope.boxer("inbox");
	 // }else if(newbox.outbox == true){
	 // 	$scope.boxer("outbox");
	 // }else if(newbox.trash == true){
	 // 	$scope.boxer("trash");
	 // }
  // },true);





  
  // $scope.sendMessage = function(message)
  // {
  //   Messages.send(message).
  //   then(function(result)
  //   {
  //     $scope.composeView = false;
  //     // TODO
  //     // Reset compose form
  //   });
  // };






 //  $scope.replyMessage = function(message)
 //  {
      
 //    var requester = message.requester.split('personalagent/')[1].split('/')[0];    
 //    var req_name = requester;
    
 //    $scope.composeMessage();
     
 //    $.each($scope.receviersList,function(i,rec){
 //        if(rec.id == requester){
 //            req_name = rec.name;    
 //        }
 //    });
    
 //    // only preset the message when receiver exists in the receiver list
 //    if(req_name != requester){
 //    	$scope.message = {
	//             subject: 'RE: ' + message.subject,
	//             receivers: [{group : "Users" , id : requester , name : req_name}],
	//             type : { message : true}
	//     }
 //    }
    
 //    $.each($("div[ng-show='composeView'] select.chzn-select option"),function(i,opt){
 //      if(opt.innerHTML == req_name){
 //          opt.selected = true;
 //      }
 //    });
    
	// $("div[ng-show='composeView'] select.chzn-select").trigger("liszt:updated");    
	// console.log(message);
 //  };





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








messagesCtrl.$inject = ['$scope', '$rootScope', '$config', '$q', '$location', '$route', 'data', 'Messages'];
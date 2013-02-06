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
  
  $scope.boxes = {
  	inbox : true,
  	outbox : false,
  	trash : false,
  };
	
  $("div[ng-show='composeView'] select.chzn-select").chosen().change( function(item){
  	$.each($(this).next().find("ul li.result-selected"),function(i,li){
  		var req_name = $(li).html();
  		$.each($("div[ng-show='composeView'] select.chzn-select option"),function(j,opt){
	      if(opt.innerHTML == req_name){
	          opt.selected = true;
	      }
	    });
  	});
  });

  $scope.$watch('boxes', function(newbox, oldbox){
  	 if(typeof newbox == "undefined"){
  	 	return ;
  	 }
  	 if(newbox.inbox == false && newbox.outbox == false && newbox.trash == false ){
  	 	// do nothing , Intermediate state
  	 }else if(newbox.inbox == true){
  	 	$scope.boxer("inbox");
  	 }else if(newbox.outbox == true){
  	 	$scope.boxer("outbox");
  	 }else if(newbox.trash == true){
  	 	$scope.boxer("trash");
  	 }
  },true);
  
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
              message.state != 'TRASH' && message.state != 'FOREVER' )
          {
            filtered.push(message);
          };
        break;
        case 'outbox':
          if (message.box == 'outbox' && message.state != 'TRASH')
          {
            filtered.push(message);
          };
        break;
        case 'trash':
          if ((message.box == 'inbox' || message.box == 'outbox') &&
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

    Messages.delete(uuids).then(function(){
      $scope.messages = Messages.query().then(function(){
      	if($scope.boxes.inbox){
      		$scope.boxer('inbox');
      	}else if($scope.boxes.outbox){
      		$scope.boxer('outbox');
      	}
      });
      
    });
  };
  
	$scope.deleteforever = function(uuid){
		var uuids = [];
		uuids.push(uuid);
		
		Messages.deleteforever(uuids).then(function(){
		  $scope.messages = Messages.query().then(function(){
		  	$scope.boxer('trash');
		  });
		  
		});
	};
	
  $scope.composeMessage = function()
  {
    $scope.composeView = true;
    $scope.message = {
            subject: '',
            receivers: [],
            type : { message : true}
    };
    
    $("div[ng-show='composeView'] select.chzn-select").trigger("liszt:updated"); 
  };

  $scope.replyMessage = function(message)
  {
      
    var requester = message.requester.split('personalagent/')[1].split('/')[0];    
    var req_name = requester;
    
    $scope.composeMessage();
     
    $.each($scope.receviersList,function(i,rec){
        if(rec.id == requester){
            req_name = rec.name;    
        }
    });
    
    // only preset the message when receiver exists in the receiver list
    if(req_name != requester){
    	$scope.message = {
	            subject: 'RE: ' + message.subject,
	            receivers: [{group : "Users" , id : requester , name : req_name}],
	            type : { message : true}
	    }
    }
    
    $.each($("div[ng-show='composeView'] select.chzn-select option"),function(i,opt){
      if(opt.innerHTML == req_name){
          opt.selected = true;
      }
    });
    
	$("div[ng-show='composeView'] select.chzn-select").trigger("liszt:updated");    
  };

	$scope.composeCancel = function(){
		$scope.composeView = false;
		$scope.boxes.inbox = true;
	};
	
	
	
	$scope.askDelete = function(message){
		console.log(message);
		$scope.modal =  {
		  header : "Delete Message",
		  title : "Do you want to delete this messsage ? ",
		  content : "You can still find the message in the trash box after deleting.",
		  left : { show : true , text : "Cancel"} ,
		  middle : { show : false } ,
		  right : { show : true , style : "btn-primary", text : "OK", func : function(){
		  	 message.state = "TRASH";
		  	 $scope.delete(message.uuid);
		  }}
		};
	}
	
	$scope.askDeleteforever = function(message){
		$scope.modal =  {
		  header : "Delete Forever",
		  title : "Do you want to delete this messsage ?",
		  content : "Message will be deleted forever and can't be restored.",
		  left : { show : true , text : "Cancel"} ,
		  middle : { show : false } ,
		  right : { show : true , style : "btn-primary", text : "OK", func : function(){
		  	 message.state = "FOREVER";
		  	 $scope.deleteforever(message.uuid);
		  }}
		};
	}
	
	$scope.restore = function(message){
		var uuids = [];
	    uuids.push(message.uuid);
	    
	    Messages.changeState(uuids, "NEW").then(function(){
	      message.state = "NEW";
	      $scope.messages = Messages.query().then(function(){
	        $scope.boxer('trash');
	      });
	    });
	}
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
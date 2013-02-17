'use strict';

/**
 * Messages Controller
 */
function messagesCtrl($scope, $rootScope, $config, $q, $location, $route, data, Messages)
{
  var self = this;


  console.log('messages ->', data);


  /**
   * Receivers list
   */
  $scope.receviersList = Messages.receviersList();


  /**
   * Set messages
   */
  $scope.messages = data;


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
    console.warn('message ->', $scope.message);
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
    $scope.views = {
      compose: !$scope.views.compose,
      message: false,
      default: false
    }; 
    // $scope.views.compose = !$scope.views.compose;
    // $scope.views.default = !$scope.views.default;
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
  };





  //console.warn('messages ->', data);

  
  // $scope.boxes = {
  // 	inbox : true,
  // 	outbox : false,
  // 	trash : false,
  // };




	
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



  $scope.fixTabHeight = function(uuid)
  {
    var tabHeight = $('.tabs-left .nav-tabs').height();
    var contentHeight = $('.tabs-left .tab-content #msg-' + uuid).height();

    if (tabHeight > contentHeight)
    {
      $('.tabs-left .tab-content #msg-' + uuid).css({ height: $('.tabs-left .nav-tabs').height() });
    };
  };



  // $scope.boxer = function(box)
  // {
  //   $scope.composeView = false;
    
  //   $scope.messages = [];
  //   var filtered = [];
  //   angular.forEach(messages, function(message, index)
  //   {
  //     message.date = new Date(message.creationTime).toString($config.datetime.format);
  //     message.sender = message.requester.split('personalagent/')[1].split('/')[0];
  //     switch (box)
  //     {
  //       case 'inbox':          
  //         if (message.box == 'inbox' &&
  //             message.state != 'TRASH' && message.state != 'FOREVER' )
  //         {
  //           filtered.push(message);
  //         };
  //         $scope.listview = true;
  //       break;
  //       case 'outbox':
  //         if (message.box == 'outbox' && message.state != 'TRASH')
  //         {
  //           filtered.push(message);
  //         };
  //         $scope.listview = true;
  //       break;
  //       case 'trash':
  //         if ((message.box == 'inbox' || message.box == 'outbox') &&
  //             message.state == 'TRASH')
  //         {
  //           filtered.push(message);
  //         };
  //         $scope.listview = false;
  //         $scope.trashview = true;
  //       break;
  //     };
  //   });
  //   $scope.messages = filtered;
  //   //$scope.fixTabHeight(filtered[0].uuid);
  // };
  
  // $scope.boxer('inbox');

  



  // $scope.composeView = true;





  // $scope.delete = function(uuid)
  // {
  //   var uuids = [];
  //   uuids.push(uuid);

  //   Messages.delete(uuids).then(function(){
    	
  //     $scope.messages = Messages.query().then(function(){
  //     	if($scope.boxes.inbox){
  //     		$scope.boxer('inbox');
  //     	}else if($scope.boxes.outbox){
  //     		$scope.boxer('outbox');
  //     	}
  //     });
      
  //   });
  // };




  
	// $scope.deleteforever = function(uuid){
	// 	var uuids = [];
	// 	uuids.push(uuid);
		
	// 	Messages.deleteforever(uuids).then(function(){
	// 	  $scope.messages = Messages.query().then(function(){
	// 	  	$scope.boxer('trash');
	// 	  });
		  
	// 	});
	// };




	
  // $scope.composeMessage = function()
  // {
  //   $scope.composeView = true;
  //   $scope.listview = false;
  //   $scope.trashview = false;
    
  //   $scope.message = {
  //           subject: '',
  //           receivers: [],
  //           type : { message : true}
  //   };
    
  //   $("div[ng-show='composeView'] select.chzn-select").trigger("liszt:updated"); 
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






	// $scope.composeCancel = function(){
	// 	$scope.composeView = false;
	// 	if($scope.boxes.inbox == true || $scope.boxes.outbox == true){
	// 		$scope.listview = true;
	// 	}else if($scope.boxes.trash == true){
	// 		$scope.trashview = true;
	// 	}  
	// };





	
	// $scope.askDelete = function(message){
	// 	$scope.modal =  {
	// 	  header : "Delete Message",
	// 	  title : "Do you want to delete this messsage ? ",
	// 	  content : "You can still find the message in the trash box after deleting.",
	// 	  left : { show : true , text : "Cancel"} ,
	// 	  middle : { show : false } ,
	// 	  right : { show : true , style : "btn-primary", text : "OK", func : function(){
	// 	  	 message.state = "TRASH";
	// 	  	 $scope.delete(message.uuid);
	// 	  }}
	// 	};
	// }




	
	// $scope.askDeleteforever = function(message){
	// 	$scope.modal =  {
	// 	  header : "Delete Forever",
	// 	  title : "Do you want to delete this messsage ?",
	// 	  content : "Message will be deleted forever and can't be restored.",
	// 	  left : { show : true , text : "Cancel"} ,
	// 	  middle : { show : false } ,
	// 	  right : { show : true , style : "btn-primary", text : "OK", func : function(){
	// 	  	 message.state = "FOREVER";
	// 	  	 $scope.deleteforever(message.uuid);
	// 	  }}
	// 	};
	// }




	
	// $scope.restore = function(message){
	// 	var uuids = [];
	//     uuids.push(message.uuid);
	    
	//     Messages.changeState(uuids, "NEW").then(function(){
	//       message.state = "NEW";
	//       $scope.messages = Messages.query().then(function(){
	//         $scope.boxer('trash');
	//       });
	//     });
	// }






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
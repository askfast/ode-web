'use strict';


/**
 * Dashboard Controller
 */
function dashboardCtrl($scope, $rootScope, data)
{
	$scope.messages = data;



      /**
       * Clean group pie chart holder
       */
      document.getElementById("weeklyPie1").innerHTML = '';
      /**
       * Init vars
       */
      var ratios = [30, 40, 30];
      /**
       * Pie chart it baby!
       */
      var r = Raphael("weeklyPie1"),
          pie = r.piechart(40, 40, 40, ratios);


      /**
       * Clean group pie chart holder
       */
      document.getElementById("weeklyPie2").innerHTML = '';
      /**
       * Init vars
       */
      var ratios = [30, 40, 30];
      /**
       * Pie chart it baby!
       */
      var r = Raphael("weeklyPie2"),
          pie = r.piechart(40, 40, 40, ratios);


      /**
       * Clean group pie chart holder
       */
      document.getElementById("weeklyPie3").innerHTML = '';
      /**
       * Init vars
       */
      var ratios = [30, 40, 30];
      /**
       * Pie chart it baby!
       */
      var r = Raphael("weeklyPie3"),
          pie = r.piechart(40, 40, 40, ratios);


      /**
       * Clean group pie chart holder
       */
      document.getElementById("weeklyPie4").innerHTML = '';
      /**
       * Init vars
       */
      var ratios = [30, 40, 30];
      /**
       * Pie chart it baby!
       */
      var r = Raphael("weeklyPie4"),
          pie = r.piechart(40, 40, 40, ratios);


      /**
       * Clean group pie chart holder
       */
      document.getElementById("weeklyPie5").innerHTML = '';
      /**
       * Init vars
       */
      var ratios = [30, 40, 30];
      /**
       * Pie chart it baby!
       */
      var r = Raphael("weeklyPie5"),
          pie = r.piechart(40, 40, 40, ratios);



	
};


/**
 * Dashboard resolver
 */
dashboardCtrl.resolve = {
  data: function ($rootScope, $config, Messages) 
  {
      $rootScope.app.unreadMessages = Messages.unreadCount();
      if($rootScope.app.unreadMessages == 0 ){
          $('#msgBubble').hide();
      }else{
          $('#msgBubble').show();
      }
  	  return Messages.unread();
  }
}


dashboardCtrl.$inject = ['$scope', '$rootScope', 'data'];
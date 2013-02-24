'use strict';


/**
 * Dashboard Controller
 */
function dashboardCtrl($scope, $rootScope, $q, data, Dashboard, Slots)
{
  /**
   * Get unread messages
   */
	$scope.messages = data;

  $scope.loadingPies = true;
  /**
   * Produce pie charts for groups
   * for current week
   */
  Dashboard.pies()
  .then(function (pies)
  {
    $scope.loadingPies = false;
    /**
     * Set pies data
     */
    $scope.pies = pies;
  })
  .then( function (result)
  {
    /**
     * TODO 
     * Look for a better way to handle with it
     * Wait a bit for angular to produce dom
     */
    setTimeout( function() 
    {
      /**
       * Loop through pie statistics data
       */
      angular.forEach($scope.pies, function (pie, index)
      {
        /**
         * Clean group pie chart holder
         */
        document.getElementById('weeklyPie-' + pie.id).innerHTML = '';
        /**
         * Quick fix. If ratio is 0 than pie chart is not displayed at all
         */
        var ratios = [];
        if (pie.ratios.more != 0) ratios.push(pie.ratios.more);
        if (pie.ratios.even != 0) ratios.push(pie.ratios.even);
        if (pie.ratios.less != 0) ratios.push(pie.ratios.less);
        /**
         * Pie chart it baby!
         */
        var r = Raphael('weeklyPie-' + pie.id),
            pie = r.piechart(40, 40, 40, ratios);
      });
    }, 100);
  });
	
};


/**
 * Dashboard resolver
 */
dashboardCtrl.resolve = {
  data: function ($rootScope, $config, Messages) 
  {
    /**
     * Updating unread messages counter can be better made in
     * unreadCount function in Messages model, after counting
     * it can update rootScope value for it
     */
    $rootScope.app.unreadMessages = Messages.unreadCount();
    /**
     * [unreadMessages description]
     * @type {[type]}
     */
    if($rootScope.app.unreadMessages == 0)
    {
      $('#msgBubble').hide();
    }
    else
    {
      $('#msgBubble').show();
    };
    return Messages.unread();
  }
}


dashboardCtrl.$inject = ['$scope', '$rootScope', '$q', 'data', 'Dashboard', 'Slots'];
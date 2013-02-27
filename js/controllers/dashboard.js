'use strict';

/**
 * Dashboard Controller
 */
function dashboardCtrl($scope, $rootScope, $config, $q, data, Dashboard, Slots)
{
  /**
   * Get unread messages
   */
	$scope.messages = data;


  /**
   * Set loader for pies
   */
  $scope.loadingPies = true;


  /**
   * Produce pie charts for groups
   * for current week
   */
  Dashboard.pies()
  .then(function (pies)
  {
    /**
     * Turn off loader
     */
    $scope.loadingPies = false;
    /**
     * Set pies data
     */
    $scope.pies = pies;
  })
  /**
   * Second then for making sure that first process is done
   */
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
            pie = r.piechart(40, 40, 40, ratios, {
              colors: $config.pie.colors
            });
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
    return Messages.unread();
  }
}


dashboardCtrl.$inject = ['$scope', '$rootScope', '$config', '$q', 'data', 'Dashboard', 'Slots'];
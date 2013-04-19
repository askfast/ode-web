'use strict';


angular.module('WebPaige.Controllers.Planboard', [])


.controller('planboard', 
[
	'$rootScope', '$scope', '$q', '$window', '$location', 'data', 'Slots', 'Dater', 'Storage', 'Sloter', 
	function ($rootScope, $scope, $q, $window, $location, data, Slots, Dater, Storage, Sloter) 
	{
	  /**
	   * Fix styles
	   */
	  $rootScope.fixStyles();


	  /**
	   * Pass the self
	   */
		$scope.self = this;


	  /**
	   * Pass time slots data
	   */
	  $scope.data = data;

	  
	  /**
	   * Set default currents
	   */
	  var periods = Dater.getPeriods(),
	      groups  = Storage.local.groups(),
	      settings = Storage.local.settings(),
	      current = {
	        layouts: {
	          user:     true,
	          group:    true,
	          members:  false
	        },
	        day:      Dater.current.today(),
	        week:     Dater.current.week(),
	        month:    Dater.current.month(),
	        group:    settings.app.group,
	        // group:    groups[0].uuid,
	        division: 'all'
	      };


	  /**
	   * Pass current
	   */
	  $scope.current = current;


	  /**
	   * Pass periods
	   */
	  $scope.periods = periods;


	  /**
	   * Reset views for default views
	   */
	  $scope.resetViews = function ()
	  {
	    $scope.views = {
	      slot: {
	        add:  false,
	        edit: false
	      },
	      group:  false,
	      wish:   false,
	      member: false
	    };
	  };

	  $scope.resetViews();


	  /**
	   * Slot form toggler
	   */
	  $scope.toggleSlotForm = function ()
	  {
	    if ($scope.views.slot.add)
	    {
	      $scope.resetInlineForms();
	    }
	    else
	    {
	      $scope.slot = {};

	      $scope.slot = {
	        start: {
	          date: new Date().toString($rootScope.config.formats.date),
	          time: new Date().toString($rootScope.config.formats.time),
	          datetime: new Date().toISOString()
	        },
	        end: {
	          date: new Date().toString($rootScope.config.formats.date),
	          time: new Date().addHours(1).toString($rootScope.config.formats.time),
	          datetime: new Date().toISOString()
	        },
	        state:      '',
	        recursive:  false,
	        id:         ''
	      };

	      $scope.resetViews();

	      $scope.views.slot.add = true;
	    };
	  };


	  /**
	   * Reset inline forms
	   */
	  $scope.resetInlineForms = function ()
	  {
	    $scope.slot = {};

	    $scope.original = {};

	    $scope.resetViews();
	  };


	  /**
	   * Reset and init slot container which
	   * is used for adding or changing slots
	   */
	  $scope.slot = {};


	  /**
	   * Set defaults for timeline
	   */
	  $scope.timeline = {
	  	id: 'mainTimeline',
	  	user: {
	  		id: 	$rootScope.app.resources.uuid,
	  		role: $rootScope.app.resources.role
	  	},
	    current: current,
	    options: {
	      start:  new Date(periods.weeks[current.week].first.day),
	      end:    new Date(periods.weeks[current.week].last.day),
	      min:    new Date(periods.weeks[current.week].first.day),
	      max:    new Date(periods.weeks[current.week].last.day)
	    },
	    range: {
	      start:  periods.weeks[current.week].first.day,
	      end:    periods.weeks[current.week].last.day
	    },
	    scope: {
	      day:    false,
	      week:   true,
	      month:  false
	    },
	    config: {
	      bar:        $rootScope.config.timeline.config.bar,
	      wishes:     $rootScope.config.timeline.config.wishes,
	      legenda:    {},
	      legendarer: $rootScope.config.timeline.config.legendarer,
	      states:     $rootScope.config.timeline.config.states,
	      divisions:  $rootScope.config.timeline.config.divisions,
	      densities:  $rootScope.config.timeline.config.densities
	    }
	  };


	  /**
	   * Legenda defaults
	   */
	  angular.forEach($rootScope.config.timeline.config.states, function (state, index)
	  {
	    $scope.timeline.config.legenda[index] = true;
	  });


	  /**
	   * Timeline group legenda default configuration
	   */
	  $scope.timeline.config.legenda.groups = {
	    more: true,
	    even: true,
	    less: true
	  };


	  /**
	   * Prepeare timeline range for dateranger widget
	   */
	  $scope.daterange =  Dater.readable.date($scope.timeline.range.start) + 
	                      ' / ' + 
	                      Dater.readable.date($scope.timeline.range.end);


	  /**
	   * States for dropdown
	   */
	  var states = {};

	  angular.forEach($scope.timeline.config.states, function (state, key) { states[key] = state.label });

	  $scope.states = states;


	  /**
	   * Groups for dropdown
	   */
	  $scope.groups = groups;


	  /**
	   * Groups for dropdown
	   */
	  $scope.divisions = $scope.timeline.config.divisions;


	  /**
	   * Send shortage message
	   */
	  $scope.sendShortageMessage = function (slot)
	  {
	    $rootScope.statusBar.display($rootScope.ui.planboard.preCompilingStortageMessage);

	    Storage.session.add('escalation', angular.toJson({
	      group: slot.group,
	      start: {
	        date: slot.start.date,
	        time: slot.start.time
	      },
	      end: {
	        date: slot.end.date,
	        time: slot.end.time
	      },
	      diff: slot.diff
	    }));

	    $location.path('/messages').search({ escalate: true }).hash('compose');
	  };

	}
]);
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
	   * Set default currents
	   */
	  var self = this,
	      periods = Dater.getPeriods(),
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
	   * Reset views for default views
	   */
	  function resetViews ()
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

	  resetViews();


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

	      resetViews();

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

	    resetViews();
	  };


	  /**
	   * Reset and init slot container which
	   * is used for adding or changing slots
	   */
	  $scope.slot = {};


	  /**
	   * Pass time slots data
	   */
	  $scope.data = data;


	  /**
	   * Set defaults for timeline
	   */
	  $scope.timeline = {
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
	   * Watch for changes in timeline range
	   */
	  $scope.$watch(function ()
	  {
	    var range = self.timeline.getVisibleChartRange(),
	        diff  = Dater.calculate.diff(range);

	    /**
	     * Scope is a day
	     * 
	     * TODO
	     * try later on!
	     * new Date(range.start).toString('d') == new Date(range.end).toString('d')
	     */
	    if (diff <= 86400000)
	    {
	      $scope.timeline.scope = {
	        day:    true,
	        week:   false,
	        month:  false
	      };
	    }
	    /**
	     * Scope is less than a week
	     */
	    else if (diff < 604800000)
	    {
	      $scope.timeline.scope = {
	        day:    false,
	        week:   true,
	        month:  false
	      };
	    }
	    /**
	     * Scope is more than a week
	     */
	    else if (diff > 604800000)
	    {
	      $scope.timeline.scope = {
	        day:    false,
	        week:   false,
	        month:  true
	      };
	    };

	    $scope.timeline.range = {
	      start:  new Date(range.start).toString(),
	      end:    new Date(range.end).toString()
	    };

	    $scope.daterange =  Dater.readable.date($scope.timeline.range.start) + 
	                        ' / ' + 
	                        Dater.readable.date($scope.timeline.range.end);
	  });


	  /**
	   * Timeline (The big boy)
	   */
	  var timeliner = {

	    /**
	     * Init timeline
	     */
	    init: function ()
	    {
	      self.timeline = new links.Timeline(document.getElementById('mainTimeline'));

	      links.events.addListener(self.timeline, 'rangechanged',  timelineGetRange);
	      links.events.addListener(self.timeline, 'add',           timelineOnAdd);
	      links.events.addListener(self.timeline, 'delete',        timelineOnRemove);
	      links.events.addListener(self.timeline, 'change',        timelineOnChange);
	      links.events.addListener(self.timeline, 'select',        timelineOnSelect);

	      this.render($scope.timeline.options);      
	    },

	    /**
	     * Render or re-render timeline
	     */
	    render: function (options)
	    {
	      $scope.timeline = {
	        current:  $scope.timeline.current,
	        scope:    $scope.timeline.scope,
	        config:   $scope.timeline.config,
	        options: {
	          start:  new Date(options.start),
	          end:    new Date(options.end),
	          min:    new Date(options.start),
	          max:    new Date(options.end)
	        }
	      };

	      angular.extend($scope.timeline.options, $rootScope.config.timeline.options);

	      self.timeline.draw(
	        Sloter.process(
	          $scope.data,
	          $scope.timeline.config,
	          $scope.divisions,
	          $rootScope.app.resources.role
	        ), 
	        $scope.timeline.options
	      );

	      self.timeline.setVisibleChartRange($scope.timeline.options.start, $scope.timeline.options.end);
	    },

	    /**
	     * Grab new timeline data from backend and render timeline again
	     */
	    load: function (stamps)
	    {
	      var _this = this;

	      $rootScope.statusBar.display($rootScope.ui.planboard.refreshTimeline);

	      Slots.all({
	        groupId:  $scope.timeline.current.group,
	        division: $scope.timeline.current.division,
	        layouts:  $scope.timeline.current.layouts,
	        month:    $scope.timeline.current.month,
	        stamps:   stamps
	      })
	      .then(function (data)
	      {
	        if (data.error)
	        {
	          $rootScope.notifier.error('Error with gettings timeslots.');
	          console.warn('error ->', result);
	        }
	        else
	        {
	          $scope.data = data;

	          _this.render(stamps);
	        };

	        $rootScope.statusBar.off();
	      });
	    },

	    /**
	     * Refresh timeline as it is
	     */
	    refresh: function ()
	    {
	      $scope.slot = {};

	      resetViews();

	      $scope.views.slot.add = true;

	      this.load({
	        start:  data.periods.start,
	        end:    data.periods.end
	      });
	    },

	    /**
	     * Redraw timeline
	     */
	    redraw: function ()
	    {
	      self.timeline.redraw();
	    },

	    /**
	     * Cancel add
	     */
	    cancelAdd: function ()
	    {
	      self.timeline.cancelAdd();
	    }
	  };
	 

	  /**
	   * Init timeline
	   */
	  timeliner.init();


	  /**
	   * Timeliner listener
	   */
	  $rootScope.$on('timeliner', function () 
	  {
	    timeliner.load({
	      start:  new Date(arguments[1].start).getTime(),
	      end:    new Date(arguments[1].end).getTime()
	    });
	  });


	  /**
	   * Handle new requests for timeline
	   */
	  $scope.requestTimeline = function (section)
	  {
	    switch (section)
	    {
	      case 'group':
	        $scope.timeline.current.layouts.group = !$scope.timeline.current.layouts.group;

	        if ($scope.timeline.current.layouts.members && !$scope.timeline.current.layouts.group)
	          $scope.timeline.current.layouts.members = false;
	      break;

	      case 'members':
	        $scope.timeline.current.layouts.members = !$scope.timeline.current.layouts.members;

	        if ($scope.timeline.current.layouts.members && !$scope.timeline.current.layouts.group)
	          $scope.timeline.current.layouts.group = true;
	      break;
	    };

	    timeliner.load({
	      start:  data.periods.start,
	      end:    data.periods.end
	    });
	  };


	  /**
	   * Day & Week & Month toggle actions
	   */
	  $scope.timelineScoper = function (period)
	  {
	    $scope.timeline.current.day   = current.day;
	    $scope.timeline.current.week  = current.week;
	    $scope.timeline.current.month = current.month;

	    switch (period)
	    {
	      case 'day':
	        $scope.timeline.scope = {
	          day:    true,
	          week:   false,
	          month:  false
	        };

	        timeliner.load({
	          start:  periods.days[$scope.timeline.current.day].first.timeStamp,
	          end:    periods.days[$scope.timeline.current.day].last.timeStamp,
	        });
	      break;

	      case 'week':
	        $scope.timeline.scope = {
	          day:    false,
	          week:   true,
	          month:  false
	        };

	        timeliner.load({
	          start:  periods.weeks[$scope.timeline.current.week].first.timeStamp,
	          end:    periods.weeks[$scope.timeline.current.week].last.timeStamp,
	        });
	      break;

	      case 'month':
	        $scope.timeline.scope = {
	          day:    false,
	          week:   false,
	          month:  true
	        };

	        timeliner.load({
	          start:  periods.months[$scope.timeline.current.month].first.timeStamp,
	          end:    periods.months[$scope.timeline.current.month].last.timeStamp,
	        });
	      break;
	    };
	  };


	  /**
	   * Go one period in past
	   */
	  $scope.timelineBefore = function (timelineScope)
	  {
	    if ($scope.timeline.scope.day)
	    {
	      if ($scope.timeline.current.day != 1)
	      {
	        $scope.timeline.current.day--;

	        timeliner.load({
	          start:  periods.days[$scope.timeline.current.day].first.timeStamp,
	          end:    periods.days[$scope.timeline.current.day].last.timeStamp,
	        });
	      };
	    }
	    else if ($scope.timeline.scope.week)
	    {
	      if ($scope.timeline.current.week != 1)
	      {
	        $scope.timeline.current.week--;

	        timeliner.load({
	          start:  periods.weeks[$scope.timeline.current.week].first.timeStamp,
	          end:    periods.weeks[$scope.timeline.current.week].last.timeStamp,
	        });
	      };
	    }
	    else if ($scope.timeline.scope.month)
	    {
	      if ($scope.timeline.current.month != 1)
	      {
	        $scope.timeline.current.month--;

	        timeliner.load({
	          start:  periods.months[$scope.timeline.current.month].first.timeStamp,
	          end:    periods.months[$scope.timeline.current.month].last.timeStamp,
	        });
	      };
	    };
	  };


	  /**
	   * Go one period in future
	   */
	  $scope.timelineAfter = function (timelineScope)
	  {
	    if ($scope.timeline.scope.day)
	    {
	      /**
	       * Total days in a month can change so get it start periods cache
	       */
	      if ($scope.timeline.current.day != periods.days.total)
	      {
	        $scope.timeline.current.day++;

	        timeliner.load({
	          start:  periods.days[$scope.timeline.current.day].first.timeStamp,
	          end:    periods.days[$scope.timeline.current.day].last.timeStamp,
	        });
	      };
	    }
	    else if ($scope.timeline.scope.week)
	    {
	      if ($scope.timeline.current.week != 53)
	      {
	        $scope.timeline.current.week++;

	        timeliner.load({
	          start:  periods.weeks[$scope.timeline.current.week].first.timeStamp,
	          end:    periods.weeks[$scope.timeline.current.week].last.timeStamp,
	        });
	      };
	    }
	    else if ($scope.timeline.scope.month)
	    {
	      if ($scope.timeline.current.month != 12)
	      {
	        $scope.timeline.current.month++;

	        timeliner.load({
	          start:  periods.months[$scope.timeline.current.month].first.timeStamp,
	          end:    periods.months[$scope.timeline.current.month].last.timeStamp,
	        });
	      };
	    };
	  };


	  /**
	   * Timeline zoom in
	   */
	  $scope.timelineZoomIn = function () { self.timeline.zoom($rootScope.config.timeline.config.zoom, Date.now()) };


	  /**
	   * Timeline zoom out
	   */
	  $scope.timelineZoomOut = function () { self.timeline.zoom(-$rootScope.config.timeline.config.zoom, Date.now()) };


	  /**
	   * Timeline get ranges
	   */
	  function timelineGetRange ()
	  {
	    var range = self.timeline.getVisibleChartRange();

	    $scope.$apply(function ()
	    {
	      $scope.timeline.range = {
	        start:  new Date(range.from).toString(),
	        end:    new Date(range.till).toString()
	      };

	      $scope.daterange = {
	        start:  Dater.readable.date(new Date(range.start).getTime()),
	        end:    Dater.readable.date(new Date(range.end).getTime())
	      };

	    });
	  };


	  /**
	   * Get information of the selected slot
	   */
	  function selectedSlot ()
	  {
	    var selection;

	    /**
	     * TODO
	     * 
	     * Not working!!
	     */
	    timeliner.cancelAdd();

	    if (selection = self.timeline.getSelection()[0])
	    {
	      var values  = self.timeline.getItem(selection.row),
	          content = angular.fromJson(values.content.match(/<span class="secret">(.*)<\/span>/)[1]);

	      $scope.original = {
	        start:        values.start,
	        end:          values.end,
	        content: {
	          recursive:  content.recursive,
	          state:      content.state,
	          id:         content.id
	        }
	      };

	      resetViews();

	      switch (content.type)
	      {
	        case 'slot':
	          $scope.views.slot.edit = true;
	        break;

	        case 'group':
	          $scope.views.group = true;
	        break;

	        case 'wish':
	          $scope.views.wish = true;
	        break;

	        case 'member':
	          $scope.views.member = true;
	        break;
	      };

	      $scope.slot = {
	        start: {
	          date: new Date(values.start).toString($rootScope.config.formats.date),
	          time: new Date(values.start).toString($rootScope.config.formats.time),
	          datetime: new Date(values.start).toISOString()
	        },
	        end: {
	          date: new Date(values.end).toString($rootScope.config.formats.date),
	          time: new Date(values.end).toString($rootScope.config.formats.time),
	          datetime: new Date(values.end).toISOString()
	        },
	        state:      content.state,
	        recursive:  content.recursive,
	        id:         content.id
	      };

	      /**
	       * TODO
	       * Check if this can be combined with switch later on!
	       * Set extra data based slot type for inline form
	       */
	      switch (content.type)
	      {
	        case 'group':
	          $scope.slot.diff  = content.diff;
	          $scope.slot.group = content.group;
	        break;

	        case 'wish':
	          $scope.slot.wish    = content.wish;
	          $scope.slot.group   = content.group;
	          $scope.slot.groupId = content.groupId;
	        break;

	        case 'member':
	          $scope.slot.member = content.mid;
	        break;
	      }

	      return values;
	    };
	  };


	  /**
	   * Timeline on select
	   */
	  function timelineOnSelect ()
	  {
	    $scope.$apply(function ()
	    {
	      $scope.selectedOriginal = selectedSlot();
	    });
	  };


	  /**
	   * Timeline on add
	   */
	  function timelineOnAdd ()
	  {
	    var news = $('.timeline-event-content')
	                .contents()
	                .filter(function ()
	                { 
	                  return this.nodeValue == 'New' 
	                }),
	        values = self.timeline.getItem(self.timeline.getSelection()[0].row);
	      
	    if (news.length > 1) self.timeline.cancelAdd();

	    $scope.$apply(function ()
	    {
	      resetViews();

	      $scope.views.slot.add = true;

	      $scope.slot = {
	        start: {
	          date: new Date(values.start).toString($rootScope.config.formats.date),
	          time: new Date(values.start).toString($rootScope.config.formats.time),
	          datetime: new Date(values.start).toISOString()
	        },
	        end: {
	          date: new Date(values.end).toString($rootScope.config.formats.date),
	          time: new Date(values.end).toString($rootScope.config.formats.time),
	          datetime: new Date(values.end).toISOString()
	        },
	        recursive: (values.group.match(/recursive/)) ? true : false,
	        /**
	         * INFO
	         * First state is hard-coded
	         * Maybe use the first one from array later on?
	         */
	        state: 'com.ask-cs.State.Available'
	      };
	    });
	  };


	  /**
	   * Add slot trigger start view
	   */
	  $scope.add = function (slot)
	  {
	    var now     = Date.now().getTime(),
	        values  = {
	                    start:      ($rootScope.browser.mobile) ? 
	                                  new Date(slot.start.datetime).getTime() / 1000 :
	                                  Dater.convert.absolute(slot.start.date, slot.start.time, true),
	                    end:        ($rootScope.browser.mobile) ? 
	                                  new Date(slot.end.datetime).getTime() / 1000 : 
	                                  Dater.convert.absolute(slot.end.date, slot.end.time, true),
	                    recursive:  (slot.recursive) ? true : false,
	                    text:       slot.state
	                  };

	    if (values.end * 1000 <= now && values.recursive == false)
	    {
	      $rootScope.notifier.error('You can not input timeslots in past.');

	      // timeliner.cancelAdd();
	      timeliner.refresh();
	    }
	    else
	    {
	      $rootScope.statusBar.display($rootScope.ui.planboard.addTimeSlot);

	      Slots.add(values, $rootScope.app.resources.uuid)
	      .then(
	        function (result)
	        {
	          if (result.error)
	          {
	            $rootScope.notifier.error('Error with adding a new timeslot.');
	            console.warn('error ->', result);
	          }
	          else
	          {
	            $rootScope.notifier.success($rootScope.ui.planboard.slotAdded);
	          };

	          timeliner.refresh();
	        }
	      );
	    };
	  };


	  /**
	   * Timeline on change
	   */
	  function timelineOnChange (direct, original, slot, options)
	  {
	    if (!direct)
	    {
	      var values  = self.timeline.getItem(self.timeline.getSelection()[0].row),
	          options = {
	            start:    values.start,
	            end:      values.end,
	            content:  angular.fromJson(values.content.match(/<span class="secret">(.*)<\/span>/)[1])
	          };
	    };

	    var now = Date.now().getTime();

	    if (options.end <= now && options.content.recursive == false)
	    {
	      $rootScope.notifier.error('You can not change timeslots in past.');

	      timeliner.refresh();
	    }
	    else
	    {
	      $rootScope.statusBar.display($rootScope.ui.planboard.changingSlot);

	      Slots.change($scope.original, options, $rootScope.app.resources.uuid)
	      .then(
	        function (result)
	        {
	          if (result.error)
	          {
	            $rootScope.notifier.error('Error with changing timeslot.');
	            console.warn('error ->', result);
	          }
	          else
	          {
	            $rootScope.notifier.success($rootScope.ui.planboard.slotChanged);
	          };

	          timeliner.refresh();
	        }
	      );
	    };
	  };


	  /**
	   * Change slot
	   */
	  $scope.change = function (original, slot)
	  {
	    timelineOnChange(true, original, slot, 
	    {
	      start:  ($rootScope.browser.mobile) ?
	                new Date(slot.start.datetime).getTime() : 
	                Dater.convert.absolute(slot.start.date, slot.start.time, false),
	      end:    ($rootScope.browser.mobile) ? 
	                new Date(slot.end.datetime).getTime() :
	                Dater.convert.absolute(slot.end.date, slot.end.time, false),
	      content: angular.toJson({
	        recursive:  slot.recursive, 
	        state:      slot.state 
	      })
	    });
	  };


	  /**
	   * Set wish
	   */
	  $scope.setWish = function (slot)
	  {
	    $rootScope.statusBar.display($rootScope.ui.planboard.changingWish);

	    Slots.setWish(
	    {
	      id:     slot.groupId,
	      start:  ($rootScope.browser.mobile) ? 
	                new Date(slot.start.datetime).getTime() / 1000 : 
	                Dater.convert.absolute(slot.start.date, slot.start.time, true),
	      end:    ($rootScope.browser.mobile) ? 
	                new Date(slot.end.datetime).getTime() / 1000 : 
	                Dater.convert.absolute(slot.end.date, slot.end.time, true),
	      recursive:  false,
	      // recursive:  slot.recursive,
	      wish:       slot.wish
	    })
	    .then(
	      function (result)
	      {
	        if (result.error)
	        {
	          $rootScope.notifier.error('Error with changing wish value.');
	          console.warn('error ->', result);
	        }
	        else
	        {
	          $rootScope.notifier.success($rootScope.ui.planboard.wishChanged);
	        };

	        timeliner.refresh();
	      }
	    );
	  };


	  /**
	   * Timeline on delete
	   */
	  function timelineOnRemove ()
	  {
	    /**
	     * TODO
	     * Look ways to implement cancelAdd of timeline itself!!
	     */
	    var news = $('.timeline-event-content')
	                .contents()
	                .filter(function ()
	                { 
	                  return this.nodeValue == 'New' 
	                });
	      
	    if (news.length > 0)
	    {
	      self.timeline.cancelAdd();

	      $scope.$apply(function ()
	      {
	        $scope.resetInlineForms();
	      });
	    }
	    else
	    {
	      var now = Date.now().getTime();

	      if ($scope.original.end.getTime() <= now && $scope.original.recursive == false)
	      {
	        $rootScope.notifier.error('You can not delete timeslots in past.');

	        timeliner.refresh();
	      }
	      else
	      {
	        $rootScope.statusBar.display($rootScope.ui.planboard.deletingTimeslot);

	        Slots.remove($scope.original, $rootScope.app.resources.uuid)
	        .then(
	          function (result)
	          {
	            if (result.error)
	            {
	              $rootScope.notifier.error('Error with removing timeslot.');
	              console.warn('error ->', result);
	            }
	            else
	            {
	              $rootScope.notifier.success($rootScope.ui.planboard.timeslotDeleted);
	            };

	            timeliner.refresh();
	          }
	        );
	      };
	    };
	  };


	  /**
	   * Delete trigger start view
	   */
	  $scope.remove = function () { timelineOnRemove() };


	  /**
	   * Redraw timeline on window resize
	   */
	  $window.onresize = function () { self.timeline.redraw() };


	  /**
	   * Group aggs barCharts toggler
	   */
	  $scope.barCharts = function ()
	  {
	    $scope.timeline.config.bar = !$scope.timeline.config.bar;

	    timeliner.render({
	      start:  $scope.timeline.range.start,
	      end:    $scope.timeline.range.end
	    });
	  };
	  

	  /**
	   * Group wishes toggler
	   */
	  $scope.groupWishes = function ()
	  {
	    $scope.timeline.config.wishes = !$scope.timeline.config.wishes;

	    timeliner.render({
	      start:  $scope.timeline.range.start,
	      end:    $scope.timeline.range.end
	    });
	  };
	  

	  /**
	   * Timeline legenda toggler
	   */
	  $scope.showLegenda = function () { $scope.timeline.config.legendarer = !$scope.timeline.config.legendarer; };


	  /**
	   * Alter legenda settings
	   */
	  $scope.alterLegenda = function (legenda)
	  {
	    $scope.timeline.config.legenda = legenda;

	    timeliner.render({
	      start:  $scope.timeline.range.start,
	      end:    $scope.timeline.range.end
	    });
	  };


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


	  /**
	   * Prevent re-rendering issues with timeline
	   */
	  $scope.destroy = {
	    timeline: function ()
	    {
	      // Not working !! :(
	      // Sloter.pies($scope.data);
	    },
	    statistics: function ()
	    {
	      setTimeout(function ()
	      {
	        timeliner.redraw();
	      }, 10);
	    }
	  };

	}
]);
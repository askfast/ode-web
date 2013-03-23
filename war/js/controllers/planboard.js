'use strict';

/**
 * TODO
 *
 *  1. Add url routing for accessing timeline from outside with different scopes
 *  2. Add hash tags for tabs
 *  3. Fix timeline rendering bug when an another group selected in statistics
 *  4. Fix timeline scope with loaded data bug
 *  5. Fix members performance bug in statistics
 *  6. Lose legenda of pie chart and integrate ratios next to durations and hook it up with interactive pies
 *  
 * Planboard Controller
 */
function planboardCtrl($rootScope, $scope, $config, $q, $window, data, Slots, Dater, Storage, $location, Sloter) 
{
  /**
   * Fix styles
   */
  $rootScope.fixStyles();

  
  /**
   * Set default currents
   */
  var self = this,
      /**
       * Set preiods
       */
      periods = Dater.getPeriods(),
      /**
       * Get groups
       */
      groups = angular.fromJson(Storage.get('groups')),
      /**
       * Set current values
       */
      current = {
        layouts: {
          user: true,
          group: true,
          members: false
        },
        day: Date.today().getDayOfYear() + 1,
        week: new Date().getWeek(),
        month: new Date().getMonth() + 1,
        /**
         * Set first group as selected
         */
        group: groups[0].uuid,
        /**
         * Default division
         */
        division: 'all'
      };


  /**
   * Default views
   */
  $scope.views = {
    slot: {
      add: false,
      edit: false
    },
    group: false,
    wish: false,
    member: false
  };


  /**
   * Slot form toggler
   */
  $scope.toggleSlotForm = function ()
  {
    /**
     * If inline slot manager open close it
     */
    if ($scope.views.slot.add)
    {
      $scope.resetInlineForms();
    }
    /**
     * Open sesame open!
     */
    else
    {
      /**
       * Reset slot container
       */
      $scope.slot = {};
      /**
       * Set the view
       */
      $scope.views = {
        slot: {
          add: true,
          edit: false
        },
        group: false,
        wish: false,
        member: false
      };
    }
  };


  /**
   * Reset inline forms
   */
  $scope.resetInlineForms = function ()
  {
    /**
     * Reset slot container
     */
    $scope.slot = {};
    /**
     * Reset original container
     */
    $scope.original = {};
    /**
     * Reset views
     */
    $scope.views = {
      slot: {
        add: false,
        edit: false
      },
      group: false,
      wish: false,
      member: false
    };
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
      start: periods.weeks[current.week].first.day,
      end: periods.weeks[current.week].last.day
    },
    scope: {
      day: false,
      week: true,
      month: false
    },
    config: {
      bar:        $config.timeline.config.bar,
      wishes:     $config.timeline.config.wishes,
      legenda:    {},
      legendarer: $config.timeline.config.legendarer,
      states:     $config.timeline.config.states,
      divisions:  $config.timeline.config.divisions,
      densities:  $config.timeline.config.densities
    }
  };


  /**
   * Legenda defaults
   */
  angular.forEach($config.timeline.config.states, function(state, index)
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
   * TODO
   * 
   * Move date conversions to Dater
   */
  $scope.daterange =  new Date($scope.timeline.range.start).toString('dd-MM-yyyy') + 
                      ' / ' + 
                      new Date($scope.timeline.range.end).toString('dd-MM-yyyy');


  /**
   * States for dropdown
   */
  var states = {};
  angular.forEach($scope.timeline.config.states, function(state, key)
  {
    states[key] = state.label;
  });
  $scope.states = states;


  /**
   * Groups for dropdown
   */
  $scope.groups = groups;
  

  /**
   * Group aggs barCharts toggler
   */
  $scope.barCharts = function()
  {
    /**
     * Set config to altered
     */
    $scope.timeline.config.bar = !$scope.timeline.config.bar;


    /**
     * Render timeline
     */
    timeliner({
      start:  $scope.timeline.range.start,
      end:    $scope.timeline.range.end
    });    


  };
  

  /**
   * Group wishes toggler
   */
  $scope.groupWishes = function()
  {
    /**
     * Set config to altered
     */
    $scope.timeline.config.wishes = !$scope.timeline.config.wishes;


    /**
     * Render timeline
     */
    timeliner({
      start:  $scope.timeline.range.start,
      end:    $scope.timeline.range.end
    });


  };
  

  /**
   * Timeline legenda toggler
   */
  $scope.showLegenda = function()
  {
    $scope.timeline.config.legendarer = !$scope.timeline.config.legendarer;
  };


  /**
   * Alter legenda settings
   */
  $scope.alterLegenda = function(legenda)
  {
    /**
     * Set config to altered
     */
    $scope.timeline.config.legenda = legenda;


    /**
     * Render timeline again
     */
    timeliner({
      start:  $scope.timeline.range.start,
      end:    $scope.timeline.range.end
    });


  };


  /**
   * Groups for dropdown
   */
  $scope.divisions = $scope.timeline.config.divisions;


  /**
   * Watch for changes in timeline range
   */
  $scope.$watch(function()
  {
    /**
     * Get timeline range
     */
    
    var range = self.timeline.getVisibleChartRange();

    // console.warn('range ->', range);

    /**
     * Calculate difference
     */
    var diff = new Date(range.end).getTime() - new Date(range.start).getTime();
    /**
     * Scope is a day
     */
    // TODO
    // try later on!
    // new Date(range.start).toString('d') == new Date(range.end).toString('d')
    if (diff <= 86400000)
    {
      $scope.timeline.scope = {
        day: true,
        week: false,
        month: false
      };
    }
    /**
     * Scope is less than a week
     */
    else if (diff < 604800000)
    {
      $scope.timeline.scope = {
        day: false,
        week: true,
        month: false
      };
    }
    /**
     * Scope is more than a week
     */
    else if (diff > 604800000)
    {
      $scope.timeline.scope = {
        day: false,
        week: false,
        month: true
      };
    };

    /**
     * Set ranges
     */
    //console.warn('start ->',  new Date(range.start).toString($config.date.stringFormat));
    //console.warn('end ->',    new Date(range.end).toString($config.date.stringFormat));

    $scope.timeline.range = {
      start: new Date(range.start).toString($config.date.stringFormat),
      end: new Date(range.end).toString($config.date.stringFormat)
    };

    /**
     * Pass range to dateranger
     */
    $scope.daterange =  new Date($scope.timeline.range.start).toString('dd-MM-yyyy') + 
                        ' / ' + 
                        new Date($scope.timeline.range.end).toString('dd-MM-yyyy');

  });
 

  /**
   * TODO
   * Automatically initialize this function
   */
  render();


  /**
   * Go one period in past
   */
  $scope.timelineBefore = function(timelineScope)
  {
    /**
     * Scope day
     */
    if ($scope.timeline.scope.day)
    {
      if ($scope.timeline.current.day != 1)
      {
        $scope.timeline.current.day--;


        loadTimeline(periods.days[$scope.timeline.current.day]);


      };
    }
    /**
     * Scope week
     */
    else if ($scope.timeline.scope.week)
    {
      if ($scope.timeline.current.week != 1)
      {
        $scope.timeline.current.week--;


        loadTimeline(periods.weeks[$scope.timeline.current.week]);


      };
    }
    /**
     * Scope month
     */
    else if ($scope.timeline.scope.month)
    {
      if ($scope.timeline.current.month != 1)
      {
        $scope.timeline.current.month--;


        loadTimeline(periods.months[$scope.timeline.current.month]);


      };
    };
  };


  /**
   * Go one period in future
   */
  $scope.timelineAfter = function(timelineScope)
  {
    /**
     * Scope day
     */
    if ($scope.timeline.scope.day)
    {
      /**
       * Total days in a month can change so get it start periods cache
       */
      if ($scope.timeline.current.day != periods.days.total)
      {
        $scope.timeline.current.day++;


        loadTimeline(periods.days[$scope.timeline.current.day]);


      };
    }
    /**
     * Scope week
     */
    else if ($scope.timeline.scope.week)
    {
      if ($scope.timeline.current.week != 53)
      {
        $scope.timeline.current.week++;


        loadTimeline(periods.weeks[$scope.timeline.current.week]);


      };
    }
    /**
     * Scope month
     */
    else if ($scope.timeline.scope.month)
    {
      if ($scope.timeline.current.month != 12)
      {
        $scope.timeline.current.month++;


        loadTimeline(periods.months[$scope.timeline.current.month]);


      };
    };
  };


  /**
   * Day & Week & Month toggle actions
   */
  $scope.timelineScoper = function(period)
  {
    /**
     * Reset currents
     */
    $scope.timeline.current.day = current.day;
    $scope.timeline.current.week = current.week;
    $scope.timeline.current.month = current.month;
    /**
     * Switch on periods
     */
    switch (period)
    {
      /**
       * Scope day
       */
      case 'day':
        $scope.timeline.scope = {
          day: true,
          week: false,
          month: false
        };


        /**
         * Adjust timeline
         */
        loadTimeline(periods.days[$scope.timeline.current.day]);


        break;
      /**
       * Scope week
       */
      case 'week':
        $scope.timeline.scope = {
          day: false,
          week: true,
          month: false
        };


        /**
         * Adjust timeline
         */
        loadTimeline(periods.weeks[$scope.timeline.current.week]);


        break;
      /**
       * Scope month
       */
      case 'month':
        $scope.timeline.scope = {
          day: false,
          week: false,
          month: true
        };


        /**
         * Adjust timeline
         */
        loadTimeline(periods.months[$scope.timeline.current.month]);


        break;
    };
  };


  /**
   * Timeline get ranges
   */
  function timelineGetRange ()
  {
    /**
     * Get range from timeline
     */
    var range = self.timeline.getVisibleChartRange();
    /**
     * Let angular know about changes
     */
    $scope.$apply(function()
    {
      /**
       * Apply changes
       */
      $scope.timeline.range = {
        start: new Date(range.from).toString($config.date.stringFormat),
        end: new Date(range.till).toString($config.date.stringFormat)
      };
      /**
       * Daterange
       */
      $scope.daterange =  new Date(new Date(range.start).getTime()).toString('dd-MM-yyyy') + 
                          ' / ' + 
                          new Date(new Date(range.end).getTime()).toString('dd-MM-yyyy');
    });
  };


  /**
   * Get information of the selected slot
   */
  function selectedSlot ()
  {
    /**
     * Init container
     */
    var selection;
    /**
     * Get selection info from timeline
     */
    if (selection = self.timeline.getSelection()[0])
    {
      /**
       * Init values and content of slot
       */
      var values = self.timeline.getItem(selection.row),
          content = angular.fromJson(values.content.match(/<span class="secret">(.*)<\/span>/)[1]);
      
      /**
       * Set original slot value
       */
      $scope.original = {
        start: values.start,
        end: values.end,
        content: {
          recursive: content.recursive,
          state: content.state,
          id: content.id
        }
      };
      /**
       * Switch over type of slot
       */
      switch (content.type)
      {
        case 'slot':
          $scope.views = {
            slot: {
              add: false,
              edit: true
            },
            group: false,
            wish: false,
            member: false
          };
        break;
        case 'group':
          $scope.views = {
            slot: {
              add: false,
              edit: false
            },
            group: true,
            wish: false,
            member: false
          };
        break;
        case 'wish':
          $scope.views = {
            slot: {
              add: false,
              edit: false
            },
            group: false,
            wish: true,
            member: false
          };
        break;
        case 'member':
          $scope.views = {
            slot: {
              add: false,
              edit: false
            },
            group: false,
            wish: false,
            member: true
          };
        break;
      };
      /**
       * Set selected slot for view
       */
      $scope.slot = {
        start: {
          date: Dater.readableDate(values.start, $config.date.format),
          time: Dater.readableTime(values.start, $config.time.format)
        },
        end: {
          date: Dater.readableDate(values.end, $config.date.format),
          time: Dater.readableTime(values.end, $config.time.format)
        },
        state: content.state,
        recursive: content.recursive,
        id: content.id
      };
      /**
       * TODO
       * Check if this can be combined with switch later on!
       *
       * Set extra data based slot type for inline form
       */
      if (content.type == 'group') 
      {
        $scope.slot.diff  = content.diff;
        $scope.slot.group = content.group;
      }
      else if (content.type == 'wish')
      {
        $scope.slot.wish    = content.wish;
        $scope.slot.group   = content.group;
        $scope.slot.groupId = content.groupId;
      }
      else if (content.type == 'member')
      {
        $scope.slot.member = content.mid;
      }
      /**
       * Return values
       */
      return values;
    };
  };


  /**
   * Extract Slot ID of the selected slot
   */
  function selectedSlotID ()
  {
    return angular.fromJson(selectedSlot().content).id;
  };


  /**
   * Timeline on select
   */
  function timelineOnSelect ()
  {
    /**
     * Let angular knows about it
     */
    $scope.$apply(function()
    {
      $scope.selectedOriginal = selectedSlot();
    });
  };


  /**
   * Timeline on add
   */
  function timelineOnAdd ()
  {
    /**
     * Remove old new slots
     */
    var news = $('.timeline-event-content')
      .contents()
      .filter(function()
      { 
        return this.nodeValue == 'New' 
      });
    if (news.length > 1)
    {
      self.timeline.cancelAdd(); 
    };
    /**
     * Get new slot and row information from timeline
     */
    var values = self.timeline.getItem(self.timeline.getSelection()[0].row);
    /**
     * Let angular know that model changed
     */
    $scope.$apply(function()
    {
      /**
       * Set the view
       */
      $scope.views = {
        slot: {
          add: true,
          edit: false
        },
        group: false,
        wish: false,
        member: false
      };
      /**
       * Set info in slot model
       */
      $scope.slot = {
        start: {
          date: new Date(values.start).toString('dd-MM-yyyy'),
          time: new Date(values.start).toString('HH:mm tt')
        },
        end: {
          date: new Date(values.end).toString('dd-MM-yyyy'),
          time: new Date(values.end).toString('HH:mm tt')
        },
        /**
         * Determine if it is recursive
         */
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
    /**
     * Set preloader
     */
    $rootScope.loading = {
      status: true,
      message: $rootScope.ui.planboard.addTimeSlot
    };
    /**
     * Add slot
     */
    Slots.add({
      // start: Date.parse(slot.start.date + ' ' + slot.start.time).getTime() / 1000,
      // end: Date.parse(slot.end.date + ' ' + slot.end.time).getTime() / 1000,
      start: Dater.absoluteDates(slot.start.date, slot.start.time),
      end: Dater.absoluteDates(slot.end.date, slot.end.time),
      recursive: (slot.recursive) ? true : false,
      text: slot.state
    }, $rootScope.app.resources.uuid)
    .then(function (result)
    {
      /**
       * Inform user
       */
      $rootScope.notify({
        status: true,
        type: 'alert-success',
        message: $rootScope.ui.planboard.slotAdded
      });


      /**
       * Refresh timeline
       */
      refreshTimeline();


    });
  };


  /**
   * TODO
   * REMOVE ?
   * Finish it! No interaction needed actualty..
   * This can be redirected to edit slot form
   * 
   * Timeline on edit
   */
  function timelineOnEdit ()
  {
    console.log('double click edit mode!');
  };


  /**
   * Timeline on change
   */
  function timelineOnChange ()
  {
    /**
     * Set preloader
     */
    $rootScope.loading = {
      status: true,
      message: $rootScope.ui.planboard.changingSlot
    };

    var values = self.timeline.getItem(self.timeline.getSelection()[0].row);

    /**
     * Add slot
     */
    Slots.change($scope.original, {
      start: values.start,
      end: values.end,
      content: angular.fromJson(values.content.match(/<span class="secret">(.*)<\/span>/)[1]), 
    }, $rootScope.app.resources.uuid)
    .then(function (result)
    {
      /**
       * Inform user
       */
      $rootScope.notify({
        status: true,
        type: 'alert-success',
        message: $rootScope.ui.planboard.slotChanged
      });


      /**
       * Refresh timeline
       */
      refreshTimeline();


    });
  };


  /**
   * Change slot
   */
  $scope.change = function (original, slot)
  {
    /**
     * Set preloader
     */
    $rootScope.loading = {
      status: true,
      message: $rootScope.ui.planboard.changingSlot
    };
    /**
     * Add slot
     */
    Slots.change($scope.original, {
      start: Date.parse(slot.start.date + ' ' + slot.start.time),
      end: Date.parse(slot.end.date + ' ' + slot.end.time),
      recursive: (slot.recursive) ? true : false,
      text: slot.state,
      /**
       * REMOVE
       * Lose id and content later on!
       */
      id: (slot.id) ? slot.id : 0,
      content: angular.toJson({ 
        id: slot.id, 
        recursive: slot.recursive, 
        state: slot.state 
        })
    }, $rootScope.app.resources.uuid)
    .then(function (result)
    {
      /**
       * Inform user
       */
      $rootScope.notify({
        status: true,
        type: 'alert-success',
        message: $rootScope.ui.planboard.slotChanged
      });


      /**
       * Refresh timeline
       */
      refreshTimeline();


    });
  };


  /**
   * Set wish
   */
  $scope.setWish = function (slot)
  {
    /**
     * Set preloader
     */
    $rootScope.loading = {
      status: true,
      message: $rootScope.ui.planboard.changingWish
    };
    /**
     * Add slot
     */
    Slots.setWish({
      id: slot.groupId,
      start: Dater.absoluteDates(slot.start.date, slot.start.time),
      end: Dater.absoluteDates(slot.end.date, slot.end.time),
      recursive: slot.recursive,
      wish: slot.wish
    })
    .then(function (result)
    {
      /**
       * Inform user
       */
      $rootScope.notify({
        status: true,
        type: 'alert-success',
        message: $rootScope.ui.planboard.wishChanged
      });


      /**
       * Refresh timeline
       */
      refreshTimeline();


    });
  };


  /**
   * Timeline on delete
   */
  function timelineOnRemove ()
  {
    /**
     * Set preloader
     */
    $rootScope.loading = {
      status: true,
      message: $rootScope.ui.planboard.deletingTimeslot
    };
    /**
     * Add slot
     * delete -> remove
     */
    Slots.remove($scope.original, $rootScope.app.resources.uuid)
    .then(function (result)
    {
      /**
       * Inform user
       */
      $rootScope.notify({
        status: true,
        type: 'alert-success',
        message: $rootScope.ui.planboard.timeslotDeleted
      });


      /**
       * Refresh timeline
       */
      refreshTimeline();


    });
  };


  /**
   * Delete trigger start view
   */
  $scope.remove = function ()
  {
    /**
     * Set preloader
     */
    $rootScope.loading = {
      status: true,
      message: $rootScope.ui.planboard.deletingTimeslot
    };
    /**
     * Add slot
     */
    Slots.remove($scope.original, $rootScope.app.resources.uuid)
    .then(function (result)
    {
      /**
       * Inform user
       */
      $rootScope.notify({
        status: true,
        type: 'alert-success',
        message: $rootScope.ui.planboard.timeslotDeleted
      });


      /**
       * Refresh timeline
       */
      refreshTimeline();


    });
  };


  /**
   * Timeline renderer
   */
  function render()
  {
    /**
     * Where is my timeline landlord?
     */
    self.timeline = new links.Timeline(document.getElementById('mainTimeline'));    
    /**
     * Init timeline listeners
     */
    links.events.addListener(self.timeline, 'rangechanged',  timelineGetRange);
    links.events.addListener(self.timeline, 'edit',          timelineOnEdit);
    links.events.addListener(self.timeline, 'add',           timelineOnAdd);
    links.events.addListener(self.timeline, 'delete',        timelineOnRemove);
    links.events.addListener(self.timeline, 'change',        timelineOnChange);
    links.events.addListener(self.timeline, 'select',        timelineOnSelect);
    

    /**
     * Run timeline
     */
    timeliner($scope.timeline.options);


  };


  /**
   * Timeliner listener
   */
  $rootScope.$on('timeliner', function() 
  {
    /**
     * Convert arguments
     */
    var options = {
      start: arguments[1].start,
      end: arguments[1].end
    };


    // loadTimeline({
    //   start:  new Date(options.start).getTime(),
    //   end:    new Date(options.end).getTime()
    // });

    timelinerBefore ({
      // start:  new Date($scope.timeline.range.start).getTime(),
      // end:    new Date($scope.timeline.range.end).getTime()
      start:  new Date(options.start).getTime(),
      end:    new Date(options.end).getTime()
    },
    function ()
    {
      /**
       * Adjust timeline for new period
       */
      timeliner({
        // start: options.start,
        // end: options.end
        start:  new Date(options.start).getTime(),
        end:    new Date(options.end).getTime()
      });
    });


  });


  /**
   * Handle new requests for timeline
   */
  $scope.requestTimeline = function (section)
  {
    /**
     * Switch on section
     */
    switch (section)
    {
      /**
       * Section groups
       */
      case 'group':
          $scope.timeline.current.layouts.group = !$scope.timeline.current.layouts.group;
          /**
           * Check if when group is deselected when members is deselected as well
           */
          if ($scope.timeline.current.layouts.members && 
              !$scope.timeline.current.layouts.group)
          {
            $scope.timeline.current.layouts.members = false;
          };
        break;
      /**
       * Section members
       */
      case 'members':
          $scope.timeline.current.layouts.members = !$scope.timeline.current.layouts.members;
          /**
           * Check if group is selected when members is selected
           */
          if ($scope.timeline.current.layouts.members && 
              !$scope.timeline.current.layouts.group)
          {
            $scope.timeline.current.layouts.group = true;
          };
        break;
    };



    // loadTimeline({
    //   start:  data.periods.start,
    //   end:    data.periods.end
    // });

    
    timelinerBefore ({
      // start:  new Date($scope.timeline.range.start).getTime(),
      // end:    new Date($scope.timeline.range.end).getTime()
      start:  data.periods.start,
      end:    data.periods.end
    },
    function ()
    {
      /**
       * Adjust timeline for new period
       */
      timeliner({
        // start:  $scope.timeline.range.start,
        // end:    $scope.timeline.range.end
        start:  data.periods.start,
        end:    data.periods.end
      });
    });


  };


  /**
   * Refresh timeline
   */
  function refreshTimeline ()
  {
    /**
     * Reset slot container
     */
    $scope.slot = {};

    /**
     * Set view to default slot add
     */
    $scope.views = {
      slot: {
        add: true,
        edit: false
      },
      group: false,
      wish: false,
      member: false
    };


    // loadTimeline({
    //   start:  data.periods.start,
    //   end:    data.periods.end
    // });

    timelinerBefore ({
      // start:  new Date($scope.timeline.range.start).getTime(),
      // end:    new Date($scope.timeline.range.end).getTime()
      start:  data.periods.start,
      end:    data.periods.end
    },
    function ()
    {
      /**
       * Adjust timeline for new period
       */
      timeliner({
        // start:  $scope.timeline.range.start,
        // end:    $scope.timeline.range.end
        start:  data.periods.start,
        end:    data.periods.end
      });
    });


  };


  /**
   * Generic data loader and timeline renderer
   */
  function loadTimeline (options)
  {


    timelinerBefore ({
      start:  options.first.timeStamp,
      end:    options.last.timeStamp
    },
    function ()
    {
      /**
       * Adjust timeline for new period
       */
      timeliner({
        // start:  options.first.day,
        // end:    options.last.day
        start:  options.first.timeStamp,
        end:    options.last.timeStamp
      });
    });


  };


  function timelinerBefore (stamps, callback)
  {
    /**
     * Set preloader message
     */
    $rootScope.loading = {
      status: true,
      message: $rootScope.ui.planboard.refreshTimeline
    };
    /**
     * Ask for fresh data
     */
    Slots.all({
      groupId:  $scope.timeline.current.group,
      division: $scope.timeline.current.division,
      layouts:  $scope.timeline.current.layouts,
      month:    $scope.timeline.current.month,
      stamps:   stamps
    })
    .then(function(data)
    {
      /**
       * Set scope
       */
      $scope.data = data;
      /**
       * Init callback
       */
      callback();
      /**
       * Set preloader
       */
      $rootScope.loading.status = false;
    });
  };


  /**
   * Draw and limit timeline
   */
  function timeliner (options)
  {
    renderTimeline(options, self);

    function renderTimeline (options ,self)
    {
      /**
       * Timeline options
       */
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
      /**
       * Merge options with defaults
       */
      angular.extend($scope.timeline.options, $config.timeline.options);
      /**
       * Draw timeline
       */
      self.timeline.draw(
        Sloter.process(
          $scope.data,
          $scope.timeline.config,
          $scope.divisions
        ), 
        $scope.timeline.options
      );
      /**
       * Set range dynamically
       */
      self.timeline.setVisibleChartRange($scope.timeline.options.start, $scope.timeline.options.end);
    }
  };


  /**
   * Redraw timeline on window resize
   */
  $window.onresize = function ()
  {
    self.timeline.redraw();
  };


  /**
   * Timeline zoom in
   */
  $scope.timelineZoomIn = function()
  {
    self.timeline.zoom($config.timeline.config.zoomValue);
  };


  /**
   * Timeline zoom out
   */
  $scope.timelineZoomOut = function()
  {
    self.timeline.zoom(-$config.timeline.config.zoomValue);
  };


};



/**
 * Resolve planboard
 */
planboardCtrl.resolve = {
  data: function ($route, Slots, Storage) 
  {
    /**
     * Fetch periods
     */
    var periods = angular.fromJson(Storage.get('periods')),
        /**
         * Set initial period for starting timeline
         */
        /**
         * Get current week data at first
         *
         * Depreciated!
         * initial = periods.months[new Date().toString('M')],
         */
        current = new Date().getWeek(),
        initial = periods.weeks[current],
        /**
         * Set first group and current month for the planboard link
         */
        groups = angular.fromJson(Storage.get('groups'));
    /**
     * Fetch the data start model
     */
    return Slots.all({
      // Startup group
      groupId: groups[0].uuid,
      // Startup division
      division: 'all',
      // Startup periods
      stamps: {
        start:  initial.first.timeStamp,
        end:    initial.last.timeStamp
      },
      // Startup month
      month: new Date().toString('M'),
      // Startup layouts
      layouts: {
        user: true,
        group: true,
        members: false
      }
    });
  }
};


planboardCtrl.$inject = ['$rootScope', '$scope', '$config', '$q', 
                        '$window', 'data', 'Slots', 'Dater', 'Storage', '$location', 'Sloter'];
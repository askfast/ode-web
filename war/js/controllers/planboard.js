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
function planboardCtrl($rootScope, $scope, $config, $q, $window, data, Slots, Dater, Storage, $location) 
{
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
   * TODO
   * Define a better way with dealing localStorage and Resolver
   *
   * Controller render
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
    /**
     * Set preloader
     */
    $rootScope.loading = {
      status: true,
      message: $rootScope.ui.planboard.loadingTimeline
    };
    /**
     * Fetch new data
     */
    Slots.all({
      groupId:  $scope.timeline.current.group,
      division: $scope.timeline.current.division,
      layouts:  $scope.timeline.current.layouts,
      month: $scope.timeline.current.month,
      stamps: {
        start:  new Date($scope.timeline.range.start).getTime(),
        end:    new Date($scope.timeline.range.end).getTime()
      },
    })
    .then(function(data)
    {
      $scope.data = data;
      /**
       * Adjust timeline for new period
       */
      timeliner(options);
      /**
       * Turn off preloader
       */
      $rootScope.loading = {
        status: false
      }
    }); 
  });


  /**
   * Draw and limit timeline
   */
  function timeliner(options)
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
    // setTimeout( function ()
    // {
      self.timeline.draw(
        self.process(
          $scope.data, 
          $scope.timeline.config,
          angular.fromJson(Storage.get('groups')),
          angular.fromJson(Storage.get('members')),
          $scope.divisions,
          $rootScope.ui
        ), 
        $scope.timeline.options
      );
    // }, 1000);
    /**
     * Set range dynamically
     */
    self.timeline.setVisibleChartRange($scope.timeline.options.start, $scope.timeline.options.end);
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


  /**
   * Handle new requests for timeline
   */
  $scope.requestTimeline = function(current, section)
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
    /**
     * Set preloader
     */
    $rootScope.loading = {
      status: true,
      message: $rootScope.ui.planboard.loadingTimeline
    };
    /**
     * Fetch new data
     */
    Slots.all({
      groupId: $scope.timeline.current.group,
      division: $scope.timeline.current.division,
      month: $scope.timeline.current.month,
      stamps: {
        start:  new Date($scope.timeline.range.start).getTime(),
        end:    new Date($scope.timeline.range.end).getTime()
      },
      layouts: $scope.timeline.current.layouts
    })
    .then(function(data)
    {
      /**
       * Set data
       */
      $scope.data = data;
      /**
       * Render timeline
       */
      render();
      /**
       * Turn off preloader
       */
      $rootScope.loading = {
        status: false
      };
    });
  };


  /**
   * Generic data loader and timeline renderer
   */
  function loadTimeline(options)
  {

    // /**
    //  * Check whether if the selected timeline period falls in downloaded range
    //  */
    // if (options.first.timeStamp > data.periods.start &&
    //     options.last.timeStamp < data.periods.end)
    // {
    //   /**
    //    * Adjust timeline for new period
    //    */
    //   timeliner({
    //     start:  options.first.day,
    //     end:    options.last.day
    //   }); 
    // }
    // else
    // {
      /**
       * Set preloader
       */
      $rootScope.loading = {
        status: true,
        message: $rootScope.ui.planboard.loadingTimeline
      };
      /**
       * Fetch new data
       */
      Slots.all({
        groupId:  $scope.timeline.current.group,
        division: $scope.timeline.current.division,
        layouts:  $scope.timeline.current.layouts,
        month:    $scope.timeline.current.month,
        stamps: {
          start:  options.first.timeStamp,
          end:    options.last.timeStamp
        },
      })
      .then(function(data)
      {
        // $scope.$watch(function()
        // {
        /**
         * Set scope
         */
        $scope.data = data;
        /**
         * Adjust timeline for new period
         */
        timeliner({
          start:  options.first.day,
          end:    options.last.day
        });
        /**
         * Turn off preloader
         */
        $rootScope.loading = {
          status: false
        };
        // });
      });
    // };
  };


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
        // /**
        //  * If we are not in the current week
        //  */
        // if ($scope.timeline.current.week != new Date().getWeek())
        // {
        //   for (var i in periods.days)
        //   {
        //     if (periods.weeks[$scope.timeline.current.week].first.timeStamp <= 
        //         periods.days[i].first.timeStamp)
        //     {
        //       $scope.timeline.current.day = i;
        //       /**
        //        * Adjust timeline
        //        */
        //       loadTimeline({
        //         start:  periods.days[i].first.day,
        //         end:    periods.days[i].last.day
        //       });
        //       break;
        //     };
        //   };
        // }
        // else
        // {
          /**
           * Adjust timeline
           */
          loadTimeline(periods.days[$scope.timeline.current.day]);
        //   timeliner({
        //     start:  periods.days[$scope.timeline.current.day].first.day,
        //     end:    periods.days[$scope.timeline.current.day].last.day
        //   });
        // };

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
        // /**
        //  * If we are not in the current week
        //  */
        // if ($scope.timeline.current.week != new Date().getWeek())
        // {
        //   for (var i in periods.weeks)
        //   {
        //     if (periods.weeks[$scope.timeline.current.week].first.timeStamp <= 
        //         periods.weeks[i].first.timeStamp)
        //     { 
        //       $scope.timeline.current.week = i;
        //       /**
        //        * Adjust timeline
        //        */
        //       loadTimeline({
        //         start:  periods.weeks[i].first.day,
        //         end:    periods.weeks[i].last.day
        //       });
        //       break;
        //     };
        //   };
        // }
        // else
        // {
          /**
           * Adjust timeline
           */
          loadTimeline(periods.weeks[$scope.timeline.current.week]);
          // timeliner({
          //   start:  periods.weeks[$scope.timeline.current.week].first.day,
          //   end:    periods.weeks[$scope.timeline.current.week].last.day
          // });
        // };

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
  function timelineGetRange()
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
  function selectedSlot()
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
  function selectedSlotID()
  {
    return angular.fromJson(selectedSlot().content).id;
  };


  /**
   * Timeline on select
   */
  function timelineOnSelect()
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
  function timelineOnAdd()
  {
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
        recursive: (values.group.match(/recursive/)) ? true : false
      };
    });
  };


  /**
   * Add slot trigger start view
   */
  $scope.add = function(slot)
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
   * Finish it! No interaction needed actualty..
   * This can be redirected to edit slot form
   * 
   * Timeline on edit
   */
  function timelineOnEdit()
  {
    console.log('double click edit mode!');
  };


  /**
   * Timeline on change
   */
  function timelineOnChange()
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
  $scope.change = function(original, slot)
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
  $scope.setWish = function(slot)
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
  function timelineOnRemove()
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
  $scope.remove = function()
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
   * TODO
   * Look for ways to combine with other timeline refreshers
   *
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
      stamps: {
        start:  new Date($scope.timeline.range.start).getTime(),
        end:    new Date($scope.timeline.range.end).getTime()
      },
    })
    .then(function(data)
    {
      /**
       * Reset slot container
       */
      $scope.slot = {};
      /**
       * Set scope
       */
      $scope.data = data;
      /**
       * Adjust timeline for new period
       */
      timeliner({
        start:  $scope.timeline.range.start,
        end:    $scope.timeline.range.end
      });
      /**
       * Set preloader
       */
      $rootScope.loading = {
        status: false
      };
    });    
  };


  /**
   * Send shortage message
   */
  $scope.sendShortageMessage = function (slot)
  {
    /**
     * Set preloader
     */
    $rootScope.loading = {
      status: true,
      message: $rootScope.ui.planboard.preCompilingStortageMessage
    };
    /**
     * Set info about slot in sessionStorage
     */
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
    /**
     * Redirect location to messages compose
     */
    $location.path('/messages').search({
      escalate: true
    }).hash('compose');
  };

};







/**
 * TODO
 * Implement eventBus!
 * 
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







/**
 * Planboard prototypes
 */
planboardCtrl.prototype = {
  
  /**
   * Initialize the constructor
   */
  constructor: planboardCtrl,
  
  /**
   * Timeline data processing
   */
  process: function (data, config, ngroups, nmembers, divisions, ui)
  {
    /**
     * Timedata container for all sort of slots
     */
    var timedata = [];
    
    /**
     * Get groups
     */
    var groups = {};
    angular.forEach(ngroups, function(group, index)
    {
      groups[group.uuid] = group.name;
    });

    /**
     * Get members
     */
    var members = {};
    angular.forEach(nmembers, function(member, index)
    {
      members[member.uuid] = member.name;
    });

    /**
     * Wrap hidden span for sorting workaround in timeline rows
     */
    function wrapper(rank)
    {
      return '<span style="display:none;">' + rank + '</span>';
    };

    /**
     * Wrap secret content div for content of slot
     */
    function secret(content)
    {
      return '<span class="secret">' + content + '</span>';
    };

    /**
     * Add loading slots
     */
    function addLoading(timedata, rows)
    {
      angular.forEach(rows, function(row, index)
      {
        timedata.push({
          start: data.periods.end,
          end: 1577836800000,
          group: row,
          content: 'loading',
          className: 'state-loading-right',
          editable: false
        });
        timedata.push({
          start: 0,
          end: data.periods.start,
          group: row,
          content: 'loading',
          className: 'state-loading-left',
          editable: false
        });
      });
      return timedata;
    };

    /**
     * Process user slots
     */
    if (data.user)
    {
      angular.forEach(data.user, function(slot, index)
      {
        /**
         * Loop through legenda items
         */
        angular.forEach(config.legenda, function(value, legenda)
        {
          /**
           * Check whether legenda item is selected
           */
          if (slot.text == legenda && value)
          {
            /**
             * Push slot in the pool
             */
            timedata.push({
              start: Math.round(slot.start * 1000),
              end: Math.round(slot.end * 1000),
              group: (slot.recursive) ? wrapper('b') + ui.planboard.weeklyPlanning + wrapper('recursive') : 
                                        wrapper('a') + 'Planning' + wrapper('planning'),
              content: secret(angular.toJson({
                type: 'slot',
                id: slot.id, 
                recursive: slot.recursive, 
                state: slot.text 
                })),
              className: config.states[slot.text].className,
              editable: true
            });
          };
        });       
      });
      /**
       * Add loading slots
       */
      timedata = addLoading(timedata, [
        wrapper('b') + 'Wekelijkse planning' + wrapper('recursive'),
        wrapper('a') + 'Planning' + wrapper('planning')
      ]);
    };

    /**
     * Process group slots
     */
    if (data.aggs)
    {
      /**
       * Check whether a division is selected
       */
      if (data.aggs.division == 'all' || data.aggs.division == undefined)
      {
        var name = '<a href="#/groups?uuid=' + 
                    data.aggs.id + 
                    '#view">' +
                    groups[data.aggs.id] +
                    '</a>';
      }
      else
      {
        var label;
        /**
         * Loop over the divisions
         */
        angular.forEach(divisions, function(division, index)
        {
          if (division.id == data.aggs.division)
          {
            label = division.label;
          }
        });
        /**
         * Set division in the name
         */
        var name =  '<a href="#/groups?uuid=' + 
                    data.aggs.id + 
                    '#view">' +
                    groups[data.aggs.id] +
                    '</a>' + 
                    '<span class="label">' + 
                    label + 
                    '</span>';
      };

      /**
       * Group bar charts
       */
      if (config.bar)
      {
        /**
         * TODO
         * Optimize code below
         */
        var maxh = 0;
        /**
         * TODO
         * Send needed? Since the top range is fixed already?
         *
         * Calculate the max
         */
        angular.forEach(data.aggs.data, function(slot, index)
        {
          if (slot.wish > maxh)
          {
            maxh = slot.wish;
          };
        });
        /**
         * Loop through the slots
         */
        angular.forEach(data.aggs.data, function(slot, index)
        {
          /**
           * Calculate initial values
           */
          var maxNum = maxh,
              num = slot.wish,
              xwish = num,
              // a percentage, with a lower bound on 20%
              height = Math.round(num / maxNum * 80 + 20),
              minHeight = height,
              style = 'height:' + height + 'px;',
              requirement = '<div class="requirement" style="' + 
                            style + 
                            '" ' + 
                            'title="'+'Minimum aantal benodigden'+': ' + 
                            num + 
                            ' personen"></div>';
          /**
           * ?
           */
          num = slot.wish + slot.diff;
          /**
           * ?
           */
          var xcurrent = num;
          /**
           * A percentage, with a lower bound on 20%
           */
          height = Math.round(num / maxNum * 80 + 20);
          /**
           * Base color based on density
           */
          if (slot.diff >= 0 && slot.diff < 7)
          {
            switch(slot.diff)
            {
              case 0:
                var color = config.densities.even;
                break
              case 1:
                var color = config.densities.one;
                break;
              case 2:
                var color = config.densities.two;
                break;
              case 3:
                var color = config.densities.three;
                break;
              case 4:
                var color = config.densities.four;
                break;
              case 5:
                var color = config.densities.five;
                break;
              case 6:
                var color = config.densities.six;
                break;
            }
          }
          else if (slot.diff >= 7)
          {
            var color = config.densities.more;
          }
          else
          {
            var color = config.densities.less;
          };
          /**
           * Show diff value in badge
           */
          var span = '<span class="badge badge-inverse">' + slot.diff + '</span>';
          /**
           * ?
           */
          if (xcurrent > xwish)
          {
            height = minHeight;
          };
          /**
           * Set the style for bar
           */
          style = 'height:' + height + 'px;' + 'background-color: ' + color + ';';
          /**
           * TODO
           * Strip hard-coded local texts
           *
           * Style for actual
           */
          var actual = '<div class="bar" style="' + 
                        style + 
                        '" ' + 
                        ' title="Huidig aantal beschikbaar: ' + 
                        num + 
                        ' personen">' + 
                        span + 
                        '</div>';
          /**
           * Filter aggs based on selection
           */
          if (  (slot.diff > 0 && config.legenda.groups.more) ||
                (slot.diff == 0 && config.legenda.groups.even) || 
                (slot.diff < 0 && config.legenda.groups.less) )
          {
            /**
             * Push in pool
             */
            timedata.push({
              start: Math.round(slot.start * 1000),
              end: Math.round(slot.end * 1000),
              group: wrapper('c') + name,
              content: requirement + 
                        actual +
                        secret(angular.toJson({
                          type: 'group',
                          diff: slot.diff,
                          group: name
                        })),
              className: 'group-aggs',
              editable: false
            });
          };
          /**
           * Add loading slots
           */
          timedata = addLoading(timedata, [
            wrapper('c') + name
          ]);
        });
      }
      /**
       * Normal view for group slots
       */
      else
      {
        /**
         * Loop throught the slots
         */
        angular.forEach(data.aggs.data, function(slot, index)
        {
          /**
           * Class indicator
           */
          var cn;
          /**
           * TODO
           * Some calculations can be left off!
           * 
           * Base color based on density
           */
          if (slot.diff >= 0 && slot.diff < 7)
          {
            switch(slot.diff)
            {
              case 0:
                cn = 'even';
                break
              case 1:
                cn = 1;
                break
              case 2:
                cn = 2;
                break
              case 3:
                cn = 3;
                break
              case 4:
                cn = 4;
                break
              case 5:
                cn = 5;
                break
              case 6:
                cn = 6;
                break
            }
          }
          else if (slot.diff >= 7)
          {
            cn = 'more';
          }
          else
          {
            cn = 'less'
          };
          /**
           * Filter aggs based on selection
           */
          if (  (slot.diff > 0 && config.legenda.groups.more) ||
                (slot.diff == 0 && config.legenda.groups.even) || 
                (slot.diff < 0 && config.legenda.groups.less) )
          {
            /**
             * Push in pool
             */
            timedata.push({
              start: Math.round(slot.start * 1000),
              end: Math.round(slot.end * 1000),
              group: wrapper('c') + name,
              content: cn +
                        secret(angular.toJson({
                          type: 'group',
                          diff: slot.diff,
                          group: name
                        })),
              className: 'agg-' + cn,
              editable: false
            });
          };
          /**
           * Add loading slots
           */
          timedata = addLoading(timedata, [
            wrapper('c') + name
          ]);
        });
      };
    
    };

    /**
     * If wishes are on
     */
    if (config.wishes)
    {
      /**
       * Loop through wishes
       */
      angular.forEach(data.aggs.wishes, function(wish, index)
      {
        /**
         * Base color based on density
         */
        if (wish.count >= 7)
        {
          var cn = 'wishes-more';
        }
        else if (wish.count == 0)
        {
          var cn = 'wishes-even';
        }
        else
        {
          var cn = 'wishes-' + wish.count;
        };

        /**
         * Push in pool
         */
        timedata.push({
          start: Math.round(wish.start * 1000),
          end: Math.round(wish.end * 1000),
          group: wrapper('c') + name + ' (Wishes)',
          content: '<span class="badge badge-inverse">' + wish.count + '</span>' + 
                    secret(angular.toJson({
                      type: 'wish',
                      wish: wish.count,
                      group: name,
                      groupId: data.aggs.id
                    })),
          className: cn,
          editable: false
        });
        /**
         * Add loading slots
         */
        timedata = addLoading(timedata, [
          wrapper('c') + name + ' (Wishes)'
        ]);
      });

    };


    /**
     * Process members slots
     */
    if (data.members)
    {
      /**
       * Get members
       */
      //var members = angular.fromJson(Storage.get('members'));
      /**
       * Loop through members
       */
      angular.forEach(data.members, function(member, index)
      {
        /**
         * Loop through slots of member
         */
        angular.forEach(member.data, function(slot, i)
        {
          /**
           * Loop through legenda items
           */
          angular.forEach(config.legenda, function(value, legenda)
          {
            /**
             * Check whether legenda item is selected
             */
            if (slot.text == legenda && value)
            {
              timedata.push({
                start: Math.round(slot.start * 1000),
                end: Math.round(slot.end * 1000),
                group: wrapper('d') + 
                        '<a href="#/profile/' + 
                        member.id + 
                        '#timeline">' + 
                        members[member.id] + 
                        '</a>',
                content: secret(angular.toJson({ 
                  type: 'member',
                  id: slot.id, 
                  mid: member.id,
                  recursive: slot.recursive, 
                  state: slot.text 
                  })),
                className: config.states[slot.text].className,
                editable: false
              });
            };
          });
        });
        /**
         * Add empty slots for forcing timeline to display the row
         * even if there is no data of the user
         */
        timedata.push({
          start: 0,
          end: 0,
          group: wrapper('d') + 
                  '<a href="#/profile/' + 
                  member.id + 
                  '#timeline">' + 
                  members[member.id] + 
                  '</a>',
          content: null,
          className: null,
          editable: false
        });
        /**
         * Add loading slots
         */
        timedata = addLoading(timedata, [
          wrapper('d') + 
          '<a href="#/profile/' + 
          member.id + 
          '#timeline">' + 
          members[member.id] + 
          '</a>'
        ]);
        /**
         * Produce member stats
         */
        angular.forEach(member.stats, function(stat, index)
        {
          var state = stat.state.split('.');
          state.reverse();
          stat.state = 'bar-' + state[0];
        });
      });
    };
   

    /**
     * Group availabity ratios pie chart
     */
    if (data.aggs && data.aggs.ratios)
    {
      /**
       * Clean group pie chart holder
       */
      document.getElementById("groupPie").innerHTML = '';
      /**
       * Init vars
       */
      var ratios = [];
      var legends = [];
      /**
       * Loop through group agg. ratios
       */
      angular.forEach(data.aggs.ratios, function(ratio, index)
      {
        /**
         * Quick fix against 0 ratios
         * Dont display them at all
         */
        if (ratio != 0)
        {
          /**
           * Ratios
           */
          ratios.push(ratio);
          /**
           * Legends
           */
          legends.push(ratio + '% ' + index);
        };
      });
      /**
       * Pie chart it baby!
       */
      var r = Raphael("groupPie"),
          pie = r.piechart(120, 120, 100, ratios, 
          { 
            legend: legends,
            colors: ['#415e6b', '#ba6a24', '#a0a0a0']
          });
      /**
       * Pie chart title
       */
      // r.text(140, 240, name).attr({
      //   font: "20px sans-serif"
      // });
      /**
       * Decorate it with mouse effects
       */
      pie.hover(
      function()
      {
        //console.log('this ->', this);
        this.sector.stop();
        this.sector.scale(1.1, 1.1, this.cx, this.cy);
        if (this.label)
        {
          this.label[0].stop();
          this.label[0].attr({ r: 7.5 });
          this.label[1].attr({ "font-weight": 800 });
        }
      },
      function()
      {
        this.sector.animate({
          transform: 's1 1 ' + this.cx + ' ' + this.cy
        }, 500, "bounce");
        if (this.label)
        {
          this.label[0].animate({ r: 5 }, 500, "bounce");
          this.label[1].attr({ "font-weight": 400 });
        }
      });

    };


    return timedata;
  }

};

planboardCtrl.$inject = ['$rootScope', '$scope', '$config', '$q', 
                        '$window', 'data', 'Slots', 'Dater', 'Storage', '$location'];
'use strict';


/**
 * TODO
 * Clear list of dependencies
 * 
 * TimeSlots Resource
 */
WebPaige.
factory('Slots', function ($resource, $config, $q, $route, $timeout, Storage, $rootScope) 
{
  /**
   * TODO
   * Still needed?
   */
  var self = this;

  /**
   * TODO
   * make uuid parameter dynamic and
   * add functionality for calls of different types
   * same proxy
   * 
   * Define Slot Resource from back-end
   */
  var Slots = $resource(
    $config.host + '/askatars/:user/slots',
    {
      user: $rootScope.user.uuid
    },
    {
      query: {
        method: 'GET',
        params: {start:'', end:''},
        isArray: true
      },
      change: {
        method: 'PUT',
        params: {start:'', end:'', text:'', recursive:''}        
      },
      save: {
        method: 'POST',
        params: {}
      },
      delete: {
        method: 'DELETE',
        params: {}
      }
    }
  );

  /**
   * TODO
   * Organize and make it compacter
   * Make slot query to back-end unless
   * there are no slots in the localStorage
   * 
   * @return {[type]} [description]
   */
  Slots.prototype.query = function (params) 
  {    
    var deferred = $q.defer(), 
        localSlots = Storage.get('slots');
    /**
     * TODO
     * Checking for localSlots should be done here?
     * or in the renderer? if so how to integrate to this check?
     */
    // if (localSlots)
    // {
    //   deferred.resolve(angular.fromJson(localSlots));
    //   return deferred.promise;
    // }
    // else
    // {
      var successCb = function (result) 
      {
        if (angular.equals(result, [])) 
        {
          deferred.reject("There are no records!");
        }
        else 
        {
          $rootScope.notify( { message: 'Slots downloaded from back-end.' } );
          /**
           * TODO
           * Should the id processing made here or in render?
           * 
           * Process result and put in localStorage
           */
          var localSlots = [];
          angular.forEach(result, function(slot, index)
          {
            localSlots.push({
              start: slot.start,
              end: slot.end,
              recursive: slot.recursive,
              text: slot.text,
              id: index + 1
            });
          });
          Storage.add('slots', angular.toJson(localSlots));
          $rootScope.notify( { message: 'Downloaded slots added to localStorage.' } );
          $rootScope.$broadcast('renderPlanboard', 'slot added to back-end');
          deferred.resolve(result);
        }
      };
      Slots.query(params, successCb);
      return deferred.promise;
    // }
  };

  /**
   * Return local slots
   * @return {array of objects} [slots from localStorage]
   */
  Slots.prototype.local = function()
  {
    return angular.fromJson(Storage.get('slots'));
  };

  /**
   * TODO
   * FInish it!
   * 
   * Slot adding process
   * @slot {object} params [slot information passed from controller]
   */
  Slots.prototype.add = function (slot) 
  {
    /**
     * TODO
     * IMPORTANT
     * Always check before wheter changes or saved
     * slot is overlaping with other ones!
     */
    

    var localSlots = angular.fromJson(Storage.get('slots'));

    var slot = {
      start: new Date(slot.start).getTime() / 1000,
      end: new Date(slot.end).getTime() / 1000,
      recursive: (slot.recursive) ? true : false,
      text: slot.text,
      id: slot.id
    };

    localSlots.push(slot);

    Storage.add('slots', angular.toJson(localSlots));
    $rootScope.$broadcast('renderPlanboard', 'slot added to localStorage');
    $rootScope.notify( { message: 'Slot added in localStorage.' } );

    /**
     * TODO
     */
    Slots.save(null, slot, function()
    {
      $rootScope.$broadcast('renderPlanboard', 'slot added to back-end');
      $rootScope.notify( { message: 'Slot added in back-end.' } );
    });
  };

  /**
   * TODO
   * Add back-end
   *
   * Check whether slot is being replaced on top of an another
   * slot of same sort. If so combine them silently and show them as
   * one slot but keep aligned with back-end, like two or more slots 
   * in real.
   * 
   * Slot changing process
   * @changed  {object} changed [changed slot information]
   */
  Slots.prototype.change = function (original, changed) 
  {
    /**
     * TODO
     * IMPORTANT
     * Always check before wheter changes or saved
     * slot is overlaping with other ones!
     */

    /**
     * TODO
     * Should the conversion done here or in controller?
     */
    var original = naturalize(original);
    var changed = naturalize(changed);
    var localSlots = [];
    angular.forEach(angular.fromJson(Storage.get('slots')), 
    function(slot, index)
    {
      if (slot.id == changed.id)
      {
        var slot = {
          start: changed.start,
          end: changed.end,
          recursive: changed.recursive,
          text: changed.text,
          id: changed.id
        };
      };
      localSlots.push(slot);    
    });
    Storage.add('slots', angular.toJson(localSlots));
    $rootScope.$broadcast('renderPlanboard', 'slot changed in localStorage');
    $rootScope.notify( { message: 'Slot changed in localStorage.' } );
    /**
     * TODO
     */
    Slots.change(changed, original, function()
    {
      $rootScope.$broadcast('renderPlanboard', 'slot changed in back-end');
      $rootScope.notify( { message: 'Slot changed in back-end.' } );
    });
  };

  /**
   * TODO
   * Add back-end
   * 
   * Slot delete process
   * @id  {integer} [id of slot]
   */
  Slots.prototype.delete = function (id, slot) 
  {
    var slot = naturalize(slot);
    var localSlots = [];
    angular.forEach(angular.fromJson(Storage.get('slots')), 
    function(slot, index)
    {
      if (slot.id != id)
      {
        localSlots.push(slot);
      };  
    });
    Storage.add('slots', angular.toJson(localSlots));
    $rootScope.$broadcast('renderPlanboard', 'slot deleted from localStorage');
    $rootScope.notify( { message: 'Slot deleted from localStorage.' } );
    /**
     * TODO
     */
    Slots.delete(slot, function()
    {
      $rootScope.$broadcast('renderPlanboard', 'slot deleted from back-end');
      $rootScope.notify( { message: 'Slot deleted in back-end.' } );
    });
  };

  /**
   * TODO
   * Finish it
   * 
   * Check whether slot extends from saturday to sunday and if recursive?
   */
  function checkForSatSun(slot)
  {
    // Produce timestamps for sunday 00:00 am through the year and
    // check whether intended to change recursive slot has one of those
    // timestamps, if so slice slot based on midnight and present as two
    // slots in timeline.
  };

  /**
   * TODO
   * Finish it
   * 
   * Check for overlaping slots exists?
   */
  function preventOverlaps(slot)
  {
    // Prevent any overlaping slots by adding new slots or changing
    // the current ones in front-end so back-end is almost always aligned with
    // front-end.
  };

  /**
   * TODO
   * Finish it
   * 
   * Slice a slot
   */
  function slice(slot, point)
  {
    // Slice a slot from a give point
  };

  /**
   * TODO
   * Finish it
   * 
   * Combine two slots
   */
  function combine(slots)
  {
    // Combine two slots
  };
  
  /**
   * Naturalize Slot for back-end injection
   * @slot  {object} slot [slot that should be naturalized]
   */
  function naturalize(slot)
  {
    var content = angular.fromJson(slot.content);
    return {
      start: new Date(slot.start).getTime() / 1000,
      end: new Date(slot.end).getTime() / 1000,
      recursive: content.recursive,
      text: content.state,
      id: content.id
    }
  };
  return new Slots;
});





/**
 * ************************************************************************************************
 * ************************************************************************************************
 * ************************************************************************************************
 * ************************************************************************************************
 */



/**
 * TODO
 * Clear list of dependencies
 *
 * Planboard Controller
 */
function planboardCtrl($rootScope, $scope, $config, data, Slots, timerService, Dater, Storage) 
{
  /**
   * TODO
   * Always refine this initializers
   */
  var self = this;

  $scope.slot = {};

  $scope.data = data;

  /**
   * Initial timeline layout manager
   */
  $scope.checkbox = {
    left: true
  };

  /**
   * TODO
   * Optimize this settings
   * Dynamically set timeline range
   */
  var periods = angular.fromJson(Storage.get('periods'));
  var current = {
    day: Date.today().getDayOfYear() + 1,
    week: new Date().getWeek(),
    month: new Date().getMonth() + 1
  };

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
      from: periods.weeks[current.week].first.day,
      till: periods.weeks[current.week].last.day
    },
    scope: {
      day: false,
      week: true,
      month: false
    }
  };

  /**
   * TODO
   * Automatically initialize this function
   */
  render();
  /**
   * Renderer listener
   */
  $rootScope.$on('renderPlanboard', function () 
  {
    render();
  });

  /**
   * TODO
   * Quick fix for tabs on the left!
   * Make a permanent fix for this
   */
  $scope.fixTabHeight = function(section)
  {
    var tabHeight = $('.tabs-left .nav-tabs').height();
    var contentHeight = $('.tabs-left .tab-content #' + section).height();
    if (tabHeight > contentHeight)
    {
      $('.tabs-left .tab-content #' + section).css({ height: $('.tabs-left .nav-tabs').height() });
    };
  };
  
  /**
   * Watch for changes in timeline range
   */
  $scope.$watch(function()
  {
    var range = self.timeline.getVisibleChartRange();
    $scope.timeline.range = {
      from: new Date(range.start).toString($config.date.stringFormat),
      till: new Date(range.end).toString($config.date.stringFormat)
    };
  });

  /**
   * Timeline get ranges
   */
  function timelineGetRange()
  {
    var range = self.timeline.getVisibleChartRange();
    $scope.$apply(function()
    {
      $scope.timeline.range = {
        from: new Date(range.start).toString($config.date.stringFormat),
        till: new Date(range.end).toString($config.date.stringFormat)
      };
      $scope.daterange =  new Date(new Date(range.start).getTime()).toString('dd-MM-yyyy') + 
                          ' / ' + 
                          new Date(new Date(range.end).getTime()).toString('dd-MM-yyyy');
    });
  };

  /**
   * Set timeline range manually
   */
  $scope.setTimelineRange = function()
  {
    /**
     * TODO
     * Lose jquery hook later on
     */
    var dates = $scope.daterange = $('input[name=daterange]').val();
    var dates = Dater.convertRangeDates(dates);
    timeliner({
      start:  dates.start,
      end:    dates.end
    });
  };

  /**
   * TODO
   * Get slot information of selcted slot
   * Put that information in the scope!
   *
   * Get information of the selected slot
   */
  function selectedSlot()
  {
    var selection;
    if (selection = self.timeline.getSelection()[0])
    {
      var values = $scope.original = self.timeline.getItem(selection.row);
      var content = angular.fromJson(values.content);
      $scope.slot = {
        from: {
          date: Dater.readableDate(values.start, $config.date.format),
          time: Dater.readableTime(values.start, $config.time.format)
        },
        till: {
          date: Dater.readableDate(values.end, $config.date.format),
          time: Dater.readableTime(values.end, $config.time.format)
        },
        state: content.state,
        recursive: content.recursive,
        id: content.id
      };   
      return values;
    }
  };

  /**
   * Extract Slot ID of the selected slot
   */
  function selectedSlotID()
  {
    return angular.fromJson(selectedSlot().content).id;
  };

  /**
   * TODO
   * Finish it!
   * selectedOriginal is still needed?
   * 
   * Timeline on select
   */
  function timelineOnSelect()
  {
    $scope.$apply(function()
    {
      $scope.selectedOriginal = selectedSlot();
    });
  };

  /**
   * TODO
   * Finish it!
   * Find a way to dynamically present state menu
   * after the creation of slot with mouse, or just use 'available'
   * as default.
   * 
   * Timeline on add
   */
  function timelineOnAdd()
  {
    // DEPRECIATED
    // $scope.$apply(function()
    // {
    //   $scope.newSlots.push(selectedSlot());
    // });
  };

  /**
   * TODO
   * Redirect to add in Resource
   *
   * Add slot trigger from view
   */
  $scope.add = function(slot)
  {
    /**
     * TODO
     * Build prototype conversion
     * Date obejcts in return values of function
     * not working properly..
     */    
    Slots.add({
      start: Date.parse(slot.from.date + ' ' + slot.from.time),
      end: Date.parse(slot.till.date + ' ' + slot.till.time),
      recursive: (slot.recursive) ? true : false,
      text: slot.state,
      id: (slot.id) ? slot.id : 0
    });
    $scope.slot = {};
  };

  /**
   * TODO
   * Finish it!
   * 
   * Timeline on edit
   */
  function timelineOnEdit()
  {
    console.log('double click edit mode!');
  };

  /**
   * TODO
   * Find ways of combining with triggers from view
   * 
   * Timeline on change
   */
  function timelineOnChange()
  { 
    Slots.change($scope.original, selectedSlot());
  };

  /**
   * TODO
   * Redirect to change in Resource
   *
   * Change trigger from view
   */
  $scope.change = function(original, slot)
  {
    /**
     * TODO
     * Ugly fix! Define a common way converting obejcts
     */
    var slot = {
      start: Date.parse(slot.from.date + ' ' + slot.from.time),
      end: Date.parse(slot.till.date + ' ' + slot.till.time),
      recursive: (slot.recursive) ? true : false,
      text: slot.state,
      id: (slot.id) ? slot.id : 0,
      content: angular.toJson({ 
        id: slot.id, 
        recursive: slot.recursive, 
        state: slot.state 
        })
    };
    Slots.change($scope.original, slot);
  };

  /**
   * TODO
   * Find ways of combining with triggers from view
   * 
   * Timeline on delete
   * @return {[type]} [description]
   */
  function timelineOnDelete()
  {
    Slots.delete(selectedSlotID(), selectedSlot());
  };

  /**
   * TODO
   * Redirect to delete in Resource
   *
   * Delete trigger from view
   */
  $scope.delete = function(id)
  {
    Slots.delete(id, selectedSlot());
  };

  /**
   * TODO
   * Define a better way with dealing localStorage and Resolver
   *
   * Controller render
   */
  function render()
  {
    self.timeline = new links.Timeline(document.getElementById('myTimeline'));
    links.events.addListener(self.timeline, 'rangechanged',  timelineGetRange);
    links.events.addListener(self.timeline, 'edit',          timelineOnEdit);
    links.events.addListener(self.timeline, 'add',           timelineOnAdd);
    links.events.addListener(self.timeline, 'delete',        timelineOnDelete);
    links.events.addListener(self.timeline, 'change',        timelineOnChange);
    links.events.addListener(self.timeline, 'select',        timelineOnSelect);
    timeliner($scope.timeline.options);
  };


  /**
   * Timeliner listener
   */
  $rootScope.$on('timeliner', function() 
  {
    var options = {
      start: arguments[1].from,
      end: arguments[1].till
    };
    //console.log('options ->', options);
    timeliner(options);
  });

  /**
   * Draw and limit timeline
   */
  function timeliner(options)
  {
    $scope.timeline = {
      current: $scope.timeline.current,
      scope: $scope.timeline.scope,
      options: {
        start:  new Date(options.start),
        end:    new Date(options.end),
        min:    new Date(options.start),
        max:    new Date(options.end)
      }
    };
    angular.extend($scope.timeline.options, $config.timeline.options);
    self.timeline.draw( self.process(Slots.local()), $scope.timeline.options);
    self.timeline.setVisibleChartRange($scope.timeline.options.start, $scope.timeline.options.end);    
  };

  /**
   * Timeline zoom in
   */
  $scope.timelineZoomIn = function()
  {
    self.timeline.zoom( $config.timeline.settings.zoomValue );
  };

  /**
   * Timeline zoom out
   */
  $scope.timelineZoomOut = function()
  {
    self.timeline.zoom( -$config.timeline.settings.zoomValue );
  };

  /**
   * Go one period in past
   */
  $scope.timelineBefore = function(timelineScope)
  {
    if ($scope.timeline.scope.day)
    {
      if ($scope.timeline.current.day != 1)
      {
        timeliner({
          start:  periods.days[$scope.timeline.current.day - 1].first.day,
          end:    periods.days[$scope.timeline.current.day - 1].last.day
        });
        $scope.timeline.current.day--;
      }
    }
    else if ($scope.timeline.scope.week)
    {
      if ($scope.timeline.current.week != 1)
      {
        timeliner({
          start:  periods.weeks[$scope.timeline.current.week - 1].first.day,
          end:    periods.weeks[$scope.timeline.current.week - 1].last.day
        });
        $scope.timeline.current.week--;
      }
    }
    else if ($scope.timeline.scope.month)
    {
      if ($scope.timeline.current.month != 1)
      {
        timeliner({
          start:  periods.months[$scope.timeline.current.month - 1].first.day,
          end:    periods.months[$scope.timeline.current.month - 1].last.day
        });
        $scope.timeline.current.month--;
      }
    };
  };

  /**
   * Go one period in future
   */
  $scope.timelineAfter = function(timelineScope)
  {
    if ($scope.timeline.scope.day)
    {
      if ($scope.timeline.current.day != periods.days.total)
      {
        timeliner({
          start:  periods.days[$scope.timeline.current.day + 1].first.day,
          end:    periods.days[$scope.timeline.current.day + 1].last.day
        });
        $scope.timeline.current.day++;
      }
    }
    else if ($scope.timeline.scope.week)
    {
      if ($scope.timeline.current.week != 53)
      {
        timeliner({
          start:  periods.weeks[$scope.timeline.current.week + 1].first.day,
          end:    periods.weeks[$scope.timeline.current.week + 1].last.day
        });
        $scope.timeline.current.week++;
      }
    }
    else if ($scope.timeline.scope.month)
    {
      if ($scope.timeline.current.month != 12)
      {
        timeliner({
          start:  periods.months[$scope.timeline.current.month + 1].first.day,
          end:    periods.months[$scope.timeline.current.month + 1].last.day
        });
        $scope.timeline.current.month++;
      }
    };
  };

  /**
   * Day & Week & Month toggle actions
   */
  $scope.timelineScoper = function(period)
  {
    $scope.timeline.current = {
      day: current.day,
      week: current.week,
      month: current.month
    };

    switch (period)
    {
      case 'day':
        $scope.timeline.scope = {
          day: true,
          week: false,
          month: false
        };
        timeliner({
          start:  periods.days[$scope.timeline.current.day].first.day,
          end:    periods.days[$scope.timeline.current.day].last.day
        });
        break;
      case 'week':
        $scope.timeline.scope = {
          day: false,
          week: true,
          month: false
        };
        timeliner({
          start:  periods.weeks[$scope.timeline.current.week].first.day,
          end:    periods.weeks[$scope.timeline.current.week].last.day
        });
        break;
      case 'month':
        $scope.timeline.scope = {
          day: false,
          week: false,
          month: true
        };
        timeliner({
          start:  periods.months[$scope.timeline.current.month].first.day,
          end:    periods.months[$scope.timeline.current.month].last.day
        });
        break;
    };
  };






  /**
   * TODO
   * States for dropdown
   */
  var states = {};
  angular.forEach($config.states, function(state, key)
  {
    states[key] = state.label;
  });
  $scope.states = states;

  /**
   * TODO
   * Groups for dropdown
   */
  var groups = {};
  angular.forEach(databank.groups, function(group, key)
  {
    groups[key] = group.name;
  });
  $scope.groups = groups;

  /**
   * TODO
   * Groups for dropdown
   */
  var divisions = {};
  angular.forEach($config.divisions, function(division, key)
  {
    divisions[key] = division.label;
  });
  $scope.divisions = divisions;

};


/**
 * TODO
 * Implement eventBus!
 * 
 * Resolve planboard
 */
planboardCtrl.resolve = {
  data: function ($rootScope, $config, Slots) 
  {
    return Slots.query({
      start:  $config.timeline.period.bstart, 
      end:    $config.timeline.period.bend
    });
  }
};


/**
 * TODO
 * Organize prototypes!
 * 
 * Planboard prototypes
 */
planboardCtrl.prototype = {
  
  /**
   * Initialize the constructor
   */
  constructor: planboardCtrl,

  /**
   * TODO
   * Compacter
   *
   * Make values back-end friendly
   */
  backendFriendly: function(slot)
  {
    return {
      start: Date.parse(slot.from.date + ' ' + slot.from.time),
      end: Date.parse(slot.till.date + ' ' + slot.till.time),
      recursive: (slot.recursive) ? true : false,
      text: slot.state,
      id: (slot.id) ? slot.id : 0
    }
  },
  
  /**
   * TODO
   * List sorting functions?
   * Make it compact!
   *
   * Timeline data processing
   */
  process: function (SlotsData)
  {
    var timedata = [];
    $.each(SlotsData, function(index, slot)
    {
      timedata.push({
        start: Math.round(slot.start * 1000),
        end: Math.round(slot.end * 1000),
        group: (slot.recursive) ? 'Wekelijkse planning' : 'Planning',
        content: angular.toJson({ 
          id: slot.id, 
          recursive: slot.recursive, 
          state: slot.text 
          }),
        className: states[slot.text].className,
        editable: true
      })  
    });
    return timedata;
  }
};

planboardCtrl.$inject = ['$rootScope', '$scope', '$config', 'data', 'Slots', 'timerService', 'Dater', 'Storage'];




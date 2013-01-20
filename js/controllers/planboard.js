// 
// process slots
//  id slots
//  make time ranges (define months with timestamps -> make calls based on that)
//    months
//  make them sortable
// render view
// 


/**
 * REMOVE
 * Timers
 */
// $scope.stopTimer = function()
// {
//   timerService.stop('myTimer');
// }
// 
// timerService.start('SlotsQueryTimer', function()
// { 
//   Slots.query(params, successCb);
// }, 5);


/**
 * REMOVE
 * timeStampers
 */
// var monthTimeStamps = this.getMonthTimeStamps();
// console.log('months ->', monthTimeStamps);
// var weekTimeStamps = this.getWeekTimeStamps();
// console.log('weeks ->', weekTimeStamps);



/**
 * TODO
 * Clear list of dependencies
 *
 * Planboard Controller
 */
function planboardCtrl($rootScope, $scope, $config, data, Slots, timerService) 
{
  /**
   * TODO
   * Always refine this initializers
   */
  var self = this;
  $scope.slot = {};
  $scope.data = data;





  /**
   * TODO
   * Automatically initialize this function
   */
  render();
  
  /**
   * TODO
   * Renderer listener
   */
  $rootScope.$on("renderPlanboard", function () 
  {
    console.log('---> render inited from:', arguments[1]);

    render();
  });







  /**
   * TODO
   * States for dropdown
   */
  var states = {};
  angular.forEach($config.states, function(state, key)
  {
    states[key] = state.label;
  })
  $scope.states = states;

  /**
   * TODO
   * Groups for dropdown
   */
  var groups = {};
  angular.forEach(databank.groups, function(group, key)
  {
    groups[key] = group.name;
  })
  $scope.groups = groups;

  /**
   * TODO
   * Groups for dropdown
   */
  var divisions = {};
  angular.forEach($config.divisions, function(division, key)
  {
    divisions[key] = division.label;
  })
  $scope.divisions = divisions;







  /**
   * TODO
   * Angularize it!
   * 
   * Timeline Range
   * @type {Object}
   */
  $scope.range = new Object;
  var range = self.timeline.getVisibleChartRange();
  $scope.range.from = new Date(range.start).toString( $config.date.stringFormat );
  $scope.range.till = new Date(range.end).toString( $config.date.stringFormat );

  /**
   * TODO
   *
   * Timeline get ranges
   * @return {[type]} [description]
   */
  function timelineGetRange()
  {
    $scope.$apply(function()
    {
      var range = self.timeline.getVisibleChartRange();
      $scope.range.from = new Date(range.start).toString( $config.date.stringFormat );
      $scope.range.till = new Date(range.end).toString( $config.date.stringFormat );
    });
  };

  /**
   * TODO
   * Get slot information of selcted slot
   * Put that information in the scope!
   *
   * Get information of the selected slot
   * @return {[type]} [description]
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
          date: self.readableDate(values.start, $config.date.format),
          time: self.readableTime(values.start, $config.time.format)
        },
        till: {
          date: self.readableDate(values.end, $config.date.format),
          time: self.readableTime(values.end, $config.time.format)
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
   * @return {[type]} [description]
   */
  function selectedSlotID()
  {
    return angular.fromJson(selectedSlot().content).id;
  }

  /**
   * TODO
   * Finish it!
   * selectedOriginal is still needed?
   * 
   * Timeline on select
   * @return {[type]} [description]
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
   * @return {[type]} [description]
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
   * @param {[type]} slot [description]
   */
  $scope.add = function(slot)
  {
    /**
     * TODO
     * Build prototype conversion
     * Date obejcts in return values of function
     * not working properly..
     * @type {Object}
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
   * @return {[type]} [description]
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
   * @return {[type]} [description]
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
   * @param  {[type]} slot [description]
   * @return {[type]}      [description]
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
   * @param  {[type]} id [description]
   * @return {[type]}    [description]
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

    self.timeline.draw( self.process(Slots.local()), $config.timeline.options );
  };




  /**
   * TODO
   * Finish it!
   *
   * Timer Service for querying slots
   */
  timerService.start('SlotsQueryTimer', function()
  { 
    Slots.query({
      start:  $config.timeline.period.bstart, 
      end:    $config.timeline.period.bend
    });
  }, 500);

}







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
}







/**
 * TODO
 * Organize prototypes!
 * 
 * Planboard prototypes
 */
planboardCtrl.prototype = {
  
  /**
   * Initialize the constructor
   * @type {[type]}
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
   * Move to prototypes or
   * place in DATE service
   * 
   * Make date readable for user
   * @param  {[type]} date [description]
   * @return {[type]}      [description]
   */
  readableDate: function(date, format)
  {
    return new Date(date).toString(format);
  },

  /**
   * TODO
   * Move to prototypes or
   * place in DATE service
   * 
   * Make time readable for user
   * @param  {[type]} time [description]
   * @return {[type]}      [description]
   */
  readableTime: function(time, format)
  {
    return new Date(time).toString(format); 
  },
  
  /**
   * TODO
   * List sorting functions?
   * Make it compact!
   *
   * Timeline data processing
   * @param  {[type]} SlotsData [description]
   * @return {[type]}           [description]
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
  },



  /**
   * Get the current month
   * @return {[type]} [description]
   */
  getThisMonth: function()
  {
    return new Date().toString('M');
  },

  /**
   * Get the current year
   * @return {[type]} [description]
   */
  getThisYear: function()
  {
    return new Date().toString('yyyy');
  },

  /**
   * Get begin and end timestamps of months
   * in the current year
   * @return {[type]} [description]
   */
  getMonthTimeStamps: function()
  {
    var months = {};
    var year = planboardCtrl.prototype.getThisYear();
    for (var i = 0; i < 12; i++)
    {
      var firstDay = new Date(year, i).moveToFirstDayOfMonth();
      var lastDay = new Date(year, i).moveToLastDayOfMonth();
      var month = {
        first: {
          day: firstDay,
          timeStamp: firstDay.getTime()
        },
        last: { 
          day: lastDay,
          timeStamp: lastDay.getTime() 
        },
        // use it if needed
        //totalDays: Date.getDaysInMonth(year, i)
      };
      months[i+1] = month;
    }
    return months;
  },

  /**
   * TODO
   * Finish it!
   * 
   * Get begin and end timestamps of weeks
   * @return {[type]} [description]
   */
  getWeekTimeStamps: function()
  {
    var weeks = {};
    var year = planboardCtrl.prototype.getThisYear();
    var firstDayInYear = new Date(year, 0).moveToFirstDayOfMonth();

    var swapDay = firstDayInYear;
    var first, nextMonday;

    var firstMondayOfYear = new Date(year, 0).moveToFirstDayOfMonth().last().monday().addWeeks(0);

    console.log('firstMondayOfYear ->', firstMondayOfYear);

    for (var i = 1; i < 52; i++)
    {
      if (first)
      {
        var week = {
          first: nextMonday
        }
        nextMonday = nextMonday.addWeeks(i);
        console.log('first week is true', nextMonday);  
        first = false;       
      }
      else
      {
        var week = {
          first: firstMondayOfYear
        }
        nextMonday = firstMondayOfYear.addWeeks(1);
        console.log('others', nextMonday);       
      }

      console.log('fm ->', week.first );

      // DEPRECIATED!
      // if (!first)
      // {
      //   var firstDay = new Date(year, 0).moveToFirstDayOfMonth().last().monday().addWeeks(0);
      //   var lastDay = new Date(year, 0).moveToFirstDayOfMonth().last().sunday().addWeeks(1);
      //   first = true;      
      // }
      // else
      // {
      //   var firstDay = swapDay.last().monday().addWeeks(i);
      //   var lastDay = swapDay.last().sunday().addWeeks(i);         
      // }
      // var swapDay = firstDay;
      // console.log('swapDay', swapDay);
      // console.log('week:', i, 'fday', firstDay, 'lday', lastDay);
      // var month = {
      //   first: {
      //     day: firstDay,
      //     timeStamp: firstDay.getTime()
      //   },
      //   last: { 
      //     day: lastDay,
      //     timeStamp: lastDay.getTime() 
      //   },
      //   // use it if needed
      //   //totalDays: Date.getDaysInMonth(year, i)
      // };
      // months[i+1] = month;

    }
    return weeks; 
  }

}

planboardCtrl.$inject = ['$rootScope', '$scope', '$config', 'data', 'Slots', 'timerService'];
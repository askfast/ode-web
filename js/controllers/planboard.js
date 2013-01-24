/**
 * TODO
 * Clear list of dependencies
 * 
 * TimeSlots Resource
 */
angular.module('SlotServices', ['ngResource']).
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
  }
  



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
  }



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
  }



  /**
   * TODO
   * Finish it
   * 
   * Slice a slot
   */
  function slice(slot, point)
  {
    // Slice a slot from a give point
  }



  /**
   * TODO
   * Finish it
   * 
   * Combine two slots
   */
  function combine(slots)
  {
    // Combine two slots
  }
  


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
function planboardCtrl($rootScope, $scope, $config, data, Slots, timerService, Services) 
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
  }

  /**
   * TODO
   * Optimize this settings
   * Dynamically set timeline range
   * @type {Object}
   */
  $scope.range = {
    from: $config.timeline.period.start,
    till: $config.timeline.period.end
  };





  /**
   * TODO
   * Automatically initialize this function
   */
  render();
  
  /**
   * TODO
   * Renderer listener
   */
  $rootScope.$on('renderPlanboard', function () 
  {
    console.log('---> render inited from:', arguments[1]); 

    // Causes continious loop :(
    /*
    Slots.query({
      start:  $config.timeline.period.bstart, 
      end:    $config.timeline.period.bend
    });
    */

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

    self.timeline.setVisibleChartRange($scope.range.from, $scope.range.till);
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
  }, 60 * 5);

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

planboardCtrl.$inject = ['$rootScope', '$scope', '$config', 'data', 'Slots', 'timerService', 'Services'];
'use strict';

/**
 * TODO
 * Clear list of dependencies
 * 
 * TimeSlots Resource
 */
WebPaige.
factory('Slots', function ($resource, $config, $q, $route, $timeout, Storage, $rootScope, Dater) 
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
      /**
       * TODO
       * Use a better way dealing with it user.uuid
       */
      user: angular.fromJson(Storage.get('resources')).uuid
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


  var Aggs = $resource(
    $config.host + '/calc_planning/:id',
    {
    },
    {
      query: {
        method: 'GET',
        params: {id: '', start:'', end:''},
        isArray: true
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
  // Slots.prototype.query__ = function (month) 
  // {    
  //   var deferred = $q.defer(),
  //       periods = Dater.getPeriods(),
  //       params = {
  //         start:  periods.months[month].first.timeStamp / 1000, 
  //         end:    periods.months[month].last.timeStamp / 1000
  //       },
  //       data = {};
  //   var successCb = function (result) 
  //   {
  //     var localSlots = [];
  //     angular.forEach(result, function(slot, index)
  //     {
  //       localSlots.push({
  //         start: slot.start,
  //         end: slot.end,
  //         recursive: slot.recursive,
  //         text: slot.text,
  //         id: index + 1
  //       });
  //     });
  //     Storage.add('slots', angular.toJson(localSlots));

  //     deferred.resolve({
  //       user : result
  //     });
  //   };
  //   Slots.query(params, successCb);
  //   return deferred.promise;
  // };


  Slots.prototype.aggs = function (options) 
  {
    var deferred = $q.defer();
    Aggs.query({
      id: options.id,
      start: options.start,
      end: options.end
    }, function (result) 
    {
      deferred.resolve({
        id: options.id,
        data: result
      });
    });
    return deferred.promise;
  };





  Slots.prototype.query = function (options) 
  {
    var deferred = $q.defer(),
        periods = Dater.getPeriods(),
        params = {
          start:  periods.months[options.month].first.timeStamp / 1000, 
          end:    periods.months[options.month].last.timeStamp / 1000
        },
        data = {};

    Slots.query(params, function(user) 
    {
      user.push({
        count: 0,
        end: 0,
        recursive: true,
        start: 0,
        text: "com.ask-cs.State.Available",
        type: "availability",
        wish: 0
      });

      user.push({
        count: 0,
        end: 0,
        recursive: false,
        start: 0,
        text: "com.ask-cs.State.Available",
        type: "availability",
        wish: 0
      });

      Slots.prototype.aggs({
          id: options.groupId,
          start: params.start,
          end: params.end
      }).then(function(aggs)
      {        
        deferred.resolve({
          user: user,
          groupId: options.groupId,
          aggs: aggs
        });        
      });

    });

    return deferred.promise;
  };





  Slots.prototype.query___ = function (options) 
  {
    var deferred = $q.defer(),
        periods = Dater.getPeriods(),
        params = {
          start:  periods.months[options.month].first.timeStamp / 1000, 
          end:    periods.months[options.month].last.timeStamp / 1000
        },
        data = {};

    Slots.query(params, function(user) 
    {
      user.push({
        count: 0,
        end: 0,
        recursive: true,
        start: 0,
        text: "com.ask-cs.State.Available",
        type: "availability",
        wish: 0
      });

      user.push({
        count: 0,
        end: 0,
        recursive: false,
        start: 0,
        text: "com.ask-cs.State.Available",
        type: "availability",
        wish: 0
      });

      var groups = angular.fromJson(Storage.get('groups'));
      var calls = [];
      
      angular.forEach(groups, function(group, index)
      {
        calls.push(Slots.prototype.aggs({
          id: group.uuid,
          start: params.start,
          end: params.end
        }));
      });

      $q.all(calls)
      .then(function(aggs)
      {
        // 
        // var localSlots = [];
        // angular.forEach(result, function(slot, index)
        // {
        //   localSlots.push({
        //     start: slot.start,
        //     end: slot.end,
        //     recursive: slot.recursive,
        //     text: slot.text,
        //     id: index + 1
        //   });
        // });
        // Storage.add('slots', angular.toJson(localSlots));
        // 
        
        deferred.resolve({
          user: user,
          aggs: aggs
        });



        // var members = angular.fromJson(Storage.get('members'));

        // var calls = [];
        
        // angular.forEach(members, function(member, index)
        // {
        //   calls.push(Slots.prototype.query({
        //     user: member.uuid,
        //     start: params.start,
        //     end: params.end
        //   }));
        // });

        // $q.all(calls)
        // .then(function(members)
        // {
        //   // 
        //   // var localSlots = [];
        //   // angular.forEach(result, function(slot, index)
        //   // {
        //   //   localSlots.push({
        //   //     start: slot.start,
        //   //     end: slot.end,
        //   //     recursive: slot.recursive,
        //   //     text: slot.text,
        //   //     id: index + 1
        //   //   });
        //   // });
        //   // Storage.add('slots', angular.toJson(localSlots));
        //   // 
          
        //   deferred.resolve({
        //     user: user,
        //     aggs: aggs,
        //     members: members
        //   });
        // });


      });
    });

    return deferred.promise;
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


  /**
   * Return resource
   */
  return new Slots;
});
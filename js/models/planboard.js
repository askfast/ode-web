'use strict';

/**
 * 
 * TimeSlots Resource
 */
WebPaige.
factory('Slots', function ($resource, $config, $q, $route, $timeout, Storage, $rootScope, Dater) 
{
  /**
   * Define Slot Resource from back-end
   */
  var Slots = $resource(
    $config.host + '/askatars/:user/slots',
    {
      user: ''
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
   * Group aggs resource
   */
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
   * Wishes resource
   */
  var Wishes = $resource(
    $config.host + '/network/:id/wish',
    {
    },
    {
      query: {
        method: 'GET',
        params: {id: '', start:'', end:''},
        isArray: true
      },
      save: {
        method: 'PUT',
        params: {id: ''}
      },
    }
  );


  /**
   * Get group wishes
   */
  Slots.prototype.wishes = function (options) 
  {
    /**
     * Default params
     */
    var deferred = $q.defer(),
        params = {
          id: options.id,
          start: options.start,
          end: options.end
        };
    /**
     * Fetch wishes
     */
    Wishes.query(params, function (result) 
    {
      deferred.resolve(result);
    });
    return deferred.promise;
  };


  /**
   * Set group wish
   */
  Slots.prototype.setWish = function (options) 
  {
    console.log('wish slot ->', options);
    
    /**
     * Default params
     */
    var deferred = $q.defer(),
        params = {
          start: options.start,
          end: options.end,
          wish: options.wish,
          recurring: true
        };
    /**
     * Fetch wishes
     */
    Wishes.save({id: options.id}, params, function (result) 
    {
      deferred.resolve(result);
    });
    return deferred.promise;
  };


  /**
   * Get group aggs
   */
  Slots.prototype.aggs = function (options) 
  {
    /**
     * Default params
     */
    var deferred = $q.defer(),
        params = {
          id: options.id,
          start: options.start,
          end: options.end
        };
    /**
     * If specific division is selected
     */
    if (options.division != undefined)
    {
      params.stateGroup = options.division;
    };
    /**
     * Fetch aggs
     */
    Aggs.query(params, function (result) 
    {

      // /**
      //  * TODO
      //  * Clean it up a bit!
      //  *
      //  * Produce statistics for group
      //  */
      // var stats = {},
      //     durations = {
      //       less: 0,
      //       even: 0,
      //       more: 0,
      //       total: 0
      //     },
      //     total = 0;
      // angular.forEach(result, function(slot, index)
      // {
      //   /**
      //    * Count diffs
      //    */
      //   if (stats[slot.diff])
      //   {
      //     stats[slot.diff]++;
      //   }
      //   else
      //   {
      //     stats[slot.diff] = 1;
      //   };
      //   total++;
      //   /**
      //    * Calculate total absence
      //    */
      //   var slotDiff = slot.end - slot.start;
      //   if (slot.diff < 0)
      //   {
      //     durations.less = durations.less + slotDiff;
      //   }
      //   else if (slot.diff == 0)
      //   {
      //     durations.even = durations.even + slotDiff;
      //   }
      //   else
      //   {
      //     durations.more = durations.more + slotDiff;
      //   };
      //   durations.total = durations.total + slotDiff;

      // });
      // // console.warn('stats ->', stats, total);

      // var ratios = {};
      // angular.forEach(stats, function(stat, index)
      // {
      //   //console.warn(stat, index);
      //   ratios[index] = Math.round((stat / total) * 100);
      // });
      // // console.warn('ratios ->', ratios);

      // // var confirm = 0;
      // // angular.forEach(ratios, function(ratio, index)
      // // {
      // //   confirm = confirm + ratio;
      // // });
      // // console.warn('confirm ->', confirm);
      // // 
      /**
       * Produce pie statistics for group
       */
      var stats = {
            less: 0,
            even: 0,
            more: 0        
          },
          durations = {
            less: 0,
            even: 0,
            more: 0,
            total: 0
          },
          total = result.length;
      /**
       * Loop through results
       */
      angular.forEach(result, function(slot, index)
      {
        /**
         * Calculate total absence
         */
        if (slot.diff < 0)
        {
          stats.less++;
        }
        else if (slot.diff == 0)
        {
          stats.even++;
        }
        else
        {
          stats.more++;
        };
        /**
         * Calculate total absence
         */
        var slotDiff = slot.end - slot.start;
        if (slot.diff < 0)
        {
          durations.less = durations.less + slotDiff;
        }
        else if (slot.diff == 0)
        {
          durations.even = durations.even + slotDiff;
        }
        else
        {
          durations.more = durations.more + slotDiff;
        };
        durations.total = durations.total + slotDiff;
      });
      /**
       * Calculate ratios
       */
      var ratios = {
        less: Math.round((stats.less / total) * 100),
        even: Math.round((stats.even / total) * 100),
        more: Math.round((stats.more / total) * 100)
      };

      /**
       * Fetch the wishes
       */
      Slots.prototype.wishes(params)
      .then(function(wishes)
      {
        deferred.resolve({
          id: options.id,
          division: options.division,
          wishes: wishes,
          data: result,
          ratios: ratios,
          durations: durations
        });
      });


    });
    return deferred.promise;
  };




  /**
   * Get group aggs for pie charts
   */
  Slots.prototype.pie = function (options) 
  {
    /**
     * Default params
     */
    var deferred = $q.defer();    

    /**
     * Get group aggs for ratios
     */
    Aggs.query({
      id: options.id,
      start: options.start,
      end: options.end
    }, function (result)
    {
      /**
       * Produce pie statistics for group
       */
      var stats = {
            less: 0,
            even: 0,
            more: 0        
          },
          total = result.length;
      /**
       * Loop through results
       */
      angular.forEach(result, function(slot, index)
      {
        /**
         * Calculate total absence
         */
        if (slot.diff < 0)
        {
          stats.less++;
        }
        else if (slot.diff == 0)
        {
          stats.even++;
        }
        else
        {
          stats.more++;
        };
      });
      /**
       * Calculate ratios
       */
      var ratios = {
        less: Math.round((stats.less / total) * 100),
        even: Math.round((stats.even / total) * 100),
        more: Math.round((stats.more / total) * 100)
      };
      /**
       * Return promised agg
       */
      deferred.resolve({
        id: options.id,
        name: options.name,
        ratios: ratios
      });      
    });

    return deferred.promise;
  };




  /**
   * Get slot bundels; user, group aggs and members
   */
  Slots.prototype.all = function (options) 
  {
    /**
     * Define vars
     */
    var deferred = $q.defer(),
        periods = Dater.getPeriods(),
        params = {
          /**
           * TODO
           * This causes an issue of rendering someone else's timeline
           */
          user:   angular.fromJson(Storage.get('resources')).uuid,
          start:  options.stamps.start / 1000,
          end:    options.stamps.end / 1000
        },
        data = {};

    // /**
    //  * Is it monthly view or custom range?
    //  */
    // if (options.custom)
    // {
    //   params.start = options.periods.start / 1000;
    //   params.end = options.periods.end / 1000;
    // }
    // else
    // {
    //   params.start = periods.months[options.month].first.timeStamp / 1000;
    //   params.end = periods.months[options.month].last.timeStamp / 1000;
    // }

    /**
     * Fetch first user slots
     */
    Slots.query(params, function(user) 
    {
      /**
       * Check whether group is selected
       */
      if (options.layouts.group)
      {
        /**
         * Given params
         */
        var groupParams = {
            id: options.groupId,
            start: params.start,
            end: params.end,
            month: options.month
        };

        /**
         * If specific division is selected
         */
        if (options.division != 'all')
        {
          groupParams.division = options.division;
        };

        /**
         * Fetch group aggs
         */
        Slots.prototype.aggs(groupParams)
        .then(function(aggs)
        {
          /**
           * Check whether members are selected
           */
          if (options.layouts.members)
          {
            /**
             * Get members of given group
             */
            var members = angular.fromJson(Storage.get(options.groupId));
            /**
             * Reset calls
             */
            var calls = [];
            /**
             * Loop through the members
             */
            angular.forEach(members, function(member, index)
            {
              /**
               * Push members in calls pool
               */
              calls.push(Slots.prototype.user({
                user: member.uuid,
                //start: periods.months[options.month].first.timeStamp / 1000,
                //end: periods.months[options.month].last.timeStamp / 1000,
                start: params.start,
                end: params.end,
                type: 'both'
              }));
            });
            /**
             * Run pool of calls
             */
            $q.all(calls)
            .then(function(members)
            {
              /**
               * Return promised values
               */
              deferred.resolve({
                user: user,
                groupId: options.groupId,
                aggs: aggs,
                members: members,
                synced: new Date().getTime(),
                periods: {
                  start: options.stamps.start,
                  end: options.stamps.end
                }
              });

            });
          }
          else
          {
            deferred.resolve({
              user: user,
              groupId: options.groupId,
              aggs: aggs,
              synced: new Date().getTime(),
              periods: {
                start: options.stamps.start,
                end: options.stamps.end
              }
            });
          };
        });

      }
      else
      {
        deferred.resolve({
          user: user,
          synced: new Date().getTime(),
          periods: {
            start: options.stamps.start,
            end: options.stamps.end
          }
        });

        // /**
        //  * Add to localStorage
        //  */
        // var slots = angular.fromJson(Storage.get('slots')) || {};
        // /**
        //  * Check if box exists otherwsie create it
        //  */
        // if (slots[params.user])
        // {
        //   slots[params.user][options.month] = user;
        // }
        // else
        // {
        //   slots[params.user] = {};
        //   slots[params.user][options.month] = user;
        // };
        // /**
        //  * Save data to localstorage
        //  */
        // Storage.add('slots', angular.toJson(slots));

      };

    });

    /**
     * Return what promised
     */
    return deferred.promise;
  };


  /**
   * Fetch user slots
   * This is needed as a seperate promise object
   * for making the process wait in Slots.all call bundle
   */
  Slots.prototype.user = function (params) 
  {
    var deferred = $q.defer();
    Slots.query(params, function (result) 
    {
      /**
       * TODO
       * Clean it up a bit!
       *
       * Produce statistics for member
       */
      var stats = {},
          total = 0;
      angular.forEach(result, function(slot, index)
      {
        if (stats[slot.text])
        {
          stats[slot.text]++;
        }
        else
        {
          stats[slot.text] = 1;
        };
        total++;
      });
      //console.warn('stats ->', stats, total);

      var ratios = [];
      angular.forEach(stats, function(stat, index)
      {
        ratios.push({
          state: index,
          ratio: (stat / total) * 100
        });
        //console.warn(stat, index);
        //ratios[index] = (stat / total) * 100;
      });
      //console.warn('ratios ->', ratios);

      // var confirm = 0;
      // angular.forEach(ratios, function(ratio, index)
      // {
      //   confirm = confirm + ratio;
      // });
      // console.warn('confirm ->', confirm);

      /**
       * Return promised
       */
      deferred.resolve({
        id: params.user,
        data: result,
        stats: ratios
      });
    });
    return deferred.promise;
  };


  /**
   * Return local slots
   */
  Slots.prototype.local = function()
  {
    return angular.fromJson(Storage.get('slots'));
  };


  /**
   * Slot adding process
   */
  Slots.prototype.add = function (slot, user) 
  {
    var deferred = $q.defer();

    /**
     * Save slot
     */
    Slots.save({user: user}, slot, function (result) 
    {
      deferred.resolve(result);
    });

    return deferred.promise;
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
   */
  Slots.prototype.change = function (original, changed, user) 
  {
    // console.warn('original ->', original);
    // console.warn('changed ->',  changed);

    //var ccon = angular.fromJson(changed.content);

    //console.log('ccon ->', ccon);

    /**
     * TODO
     * IMPORTANT
     * Always check before wheter changes or saved
     * slot is overlaping with other ones!
     */

    var deferred = $q.defer();

    /**
     * Change slot
     */
    Slots.change(angular.extend(naturalize(changed), {user: user}), 
                  naturalize(original), 
    function (result) 
    {
      deferred.resolve(result);
    });

    return deferred.promise;
  };


  /**
   * Slot delete process
   */
  Slots.prototype.delete = function (slot, user) 
  {
    var deferred = $q.defer();

    /**
     * Delete slot
     */
    Slots.delete(angular.extend(naturalize(slot), {user: user}), 
    function (result) 
    {
      deferred.resolve(result);
    });

    return deferred.promise;
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
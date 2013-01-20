'use strict';


/**
 * TODO
 * Finish all the config items and move from other config file
 * Dynamically creating config items??
 * 
 * App configuration
 */
angular.module('WebPaige.settings', []).
  value('$config', {
    version: '0.2.0',
    host: 'http://3rc2.ask-services.appspot.com/ns_knrm',
    date: {
      format: 'dd-M-yyyy'
    },
    time: {
      format: 'HH:mm tt'
    },
    timeline: {
      //period: period,
      period: {
        bstart: (parseInt((new Date()).getTime() / 1000) - 86400 * 7 * 1),
        bend:   (parseInt((new Date()).getTime() / 1000) + 86400 * 7 * 1),
        start:  Date.today().add({ days: -5 }),
        end:    Date.today().add({ days: 5 })
      },
      /**
       * TODO
       * setting properties dynamically is not working yet!!
       */
      settings: {
        ranges: {
          period: this.period,
          reset: this.period
        }
      },
      // TODO combine options with settings
      options: {
        axisOnTop: true,
        width: '100%',
        height: 'auto',
        selectable: true,
        editable: true,
        style: 'box',
        groupsWidth: '150px',
        eventMarginAxis: 0,
        //showNavigation: true,
        groupsChangeable: true,
        //start: "2013-01-01T00:00:00.000Z",
        //end: "2013-12-31T00:00:00.000Z",
        //min: "2013-01-01T00:00:00.000Z",
        //max: "2013-12-31T00:00:00.000Z",
        intervalMin: 1000 * 60 * 60 * 1,
        intervalMax: 1000 * 60 * 60 * 24 * 7 * 2
      }
    },
    states: {
      'com.ask-cs.State.Available': {
          'className': 'state-available',
          'label': 'Beschiekbaar',
          'color': '#4f824f',
          'type': 'Beschikbaar'
      },
      'com.ask-cs.State.KNRM.BeschikbaarNoord': {
          'className': 'state-available-north',
          'label': 'Beschikbaar voor Noord',
          'color': '#000',
          'type': 'Beschikbaar'
      },
      'com.ask-cs.State.KNRM.BeschikbaarZuid': {
          'className': 'state-available-south',
          'label': 'Beschikbaar voor Zuid',
          'color': '#e08a0c',
          'type': 'Beschikbaar'
      },
      'com.ask-cs.State.Unavailable': {
          'className': 'state-unavailable',
          'label': 'Niet Beschikbaar',
          'color': '#a93232',
          'type': 'Niet Beschikbaar'
      },
      'com.ask-cs.State.KNRM.SchipperVanDienst': {
          'className': 'state-schipper-service',
          'label': 'Schipper van Dienst',
          'color': '#e0c100',
          'type': 'Beschikbaar'
      },
      'com.ask-cs.State.Unreached': {
          'className': 'state-unreached',
          'label': 'Niet Bereikt',
          'color': '#65619b',
          'type': 'Niet Beschikbaar'
      }
    },
    divisions: {
      'knrm.StateGroup.BeschikbaarNoord': {
        'label': 'Noord'
      },
      'knrm.StateGroup.BeschikbaarZuid': {
        'label': 'Zuid'
      }
    }
});











/**
 * TODO
 * Clear list of dependencies
 * 
 * TimeSlots Service
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
    if (localSlots)
    {
      deferred.resolve(angular.fromJson(localSlots));
      return deferred.promise;
    }
    else
    {
      var successCb = function (result) 
      {
        if (angular.equals(result, [])) 
        {
          deferred.reject("There are no records!");
        }
        else 
        {
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

          deferred.resolve(result);
        }
      };

      Slots.query(params, successCb);

      return deferred.promise;
    }
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

    /**
     * TODO
     */
    Slots.save(null, slot, function()
    {
      console.log('slot added !');
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

    /**
     * TODO
     */
    Slots.change(changed, original, function()
    {
      console.log('slot changed !');
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

    /**
     * TODO
     */
    Slots.delete(slot, function()
    {
      console.log('slot deleted !');
    });
  };



  /**
   * TODO
   * Finish it
   * 
   * Slice a slot
   */
  Slots.prototype.slice = function (slot, point)
  {
    // Slice a slot from a give point
  }



  /**
   * TODO
   * Finish it
   * 
   * Combine two slots
   */
  Slots.prototype.combine = function (slots)
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




















/**
 * TODO
 * Make history of events
 * 
 * EventBus Service
 */
WebPaige.service('$eventBus', 
function($rootScope) 
{
  var self = this;
  var listeners = {};
  var history = {};
 
  self.emit = function(eventName) 
  {
    var args = Array.prototype.slice.call(arguments, 1);
    angular.forEach(listeners, function(fns, eventName) 
    {
      angular.forEach(fns, function(fn, key)
      {
        if (!args.length)
        {
          $rootScope.$emit(eventName, fn());
        }
        else
        {
          $rootScope.$emit(eventName, fn(args));
        };
      });
    });
  };
 
  self.on = function(eventName, fn) 
  {
    if(!(listeners[eventName] instanceof Array))
    {
      listeners[eventName] = [];
    }
    listeners[eventName].push(fn);
    $rootScope.$on(listeners[eventName], fn);
  };
 
  self.remove = function(eventName, fn) 
  {
    var lsnrs = listeners[eventName];
    var ind = lsnrs instanceof Array ? lsnrs.indexOf(fn) : -1;
    if(ind > -1)
    {
      listeners[eventName].splice(ind,1);
    }
  };
 
  self.removeAll = function(eventName) 
  {
    if (eventName)
    {
      listeners[eventName] = [];
    }
    else
    {
      listeners = {};
    }
  };

});























/**
 * TODO
 * More capabilities for time services
 * 
 * Timer Service
 */
var timerService = angular.module('timerModule', []);
timerService.constant('initer', 0);

timerService.service('timerService', [
  '$rootScope', 
  '$timeout', 
  function($rootScope, $timeout)
  {
    var timers = [];
    var addTimer = function (id, event, delay)
    {
      timers[id] = {event: event, delay: delay, counter: 0};
      var onTimeout = function()
      {
        timers[id].counter++;
        timers[id].mytimeout = $timeout(onTimeout, 1000);
        if (timers[id].delay == timers[id].counter)
        {
          timers[id].event.call();
          timers[id].counter = 0;
        }
        // REMOVE LATER
        // 
        $rootScope.counter = timers[id].counter;
        //
      }
      timers[id].mytimeout = $timeout(onTimeout, 1000);  
    }

    var stopTimer = function (id)
    {
      $timeout.cancel(timers[id].mytimeout);
    };

    return {
      start: addTimer,
      stop: stopTimer
    };

  }
]);












/**
 * TODO
 * Rewrite it based on current pattern of defining services
 *
 * angularLocalStorage
 * @type {[type]}
 */
var angularLocalStorage = angular.module('StorageModule', []);

// You should set a prefix to avoid overwriting any local storage variables 
// from the rest of your app
// e.g. angularLocalStorage.constant('prefix', 'youAppName');
angularLocalStorage.constant('prefix', 'WebPaige');

// Cookie options (usually in case of fallback)
// expiry = Number of days before cookies expire // 0 = Does not expire
// path = The web path the cookie represents
angularLocalStorage.constant('cookie', { expiry:30, path: '/'});

angularLocalStorage.service('Storage', [
  '$rootScope', 
  'prefix', 
  'cookie',
  function($rootScope, prefix, cookie)
  {


  // If there is a prefix set in the config lets use that with an appended 
  // period for readability
  //var prefix = angularLocalStorage.constant;
  if (prefix.substr(-1)!=='.')
  {
    prefix = !!prefix ? prefix + '.' : '';
  }


  // Checks the browser to see if local storage is supported
  var browserSupportsLocalStorage = function ()
  {
    try
    {
      return ('localStorage' in window && window['localStorage'] !== null);           
    }
    catch (e)
    {
      $rootScope.$broadcast('StorageModule.notification.error',e.Description);
      return false;
    }
  };


  // Directly adds a value to local storage
  // If local storage is not available in the browser use cookies
  // Example use: Storage.add('library','angular');
  var addToLocalStorage = function (key, value)
  {
    // If this browser does not support local storage use cookies
    if (!browserSupportsLocalStorage())
    {
      $rootScope.$broadcast('StorageModule.notification.warning','LOCAL_STORAGE_NOT_SUPPORTED');
      return false;
    }

    // 0 and "" is allowed as a value but let's limit other falsey values like "undefined"
    if (!value && value!==0 && value!=="") return false;

    try
    {
      localStorage.setItem(prefix+key, value);
    }
    catch (e)
    {
      $rootScope.$broadcast('StorageModule.notification.error',e.Description);
      return false;
    }
    return true;
  };


  // Directly get a value from local storage
  // Example use: Storage.get('library'); // returns 'angular'
  var getFromLocalStorage = function (key)
  {
    if (!browserSupportsLocalStorage()) 
    {
      $rootScope.$broadcast('StorageModule.notification.warning','LOCAL_STORAGE_NOT_SUPPORTED');
      return false;
    }

    var item = localStorage.getItem(prefix+key);
    if (!item) return null;
    return item;
  };


  // Remove an item from local storage
  // Example use: Storage.remove('library'); // removes the key/value pair of library='angular'
  var removeFromLocalStorage = function (key) 
  {
    if (!browserSupportsLocalStorage()) 
    {
      $rootScope.$broadcast('StorageModule.notification.warning','LOCAL_STORAGE_NOT_SUPPORTED');
      return false;
    }

    try 
    {
      localStorage.removeItem(prefix+key);
    } 
    catch (e) 
    {
      $rootScope.$broadcast('StorageModule.notification.error',e.Description);
      return false;
    }
    return true;
  };


  // Remove all data for this app from local storage
  // Example use: Storage.clearAll();
  // Should be used mostly for development purposes
  var clearAllFromLocalStorage = function () 
  {

    if (!browserSupportsLocalStorage()) 
    {
      $rootScope.$broadcast('StorageModule.notification.warning','LOCAL_STORAGE_NOT_SUPPORTED');
      return false;
    }

    var prefixLength = prefix.length;

    for (var key in localStorage) 
    {
      // Only remove items that are for this app
      if (key.substr(0,prefixLength) === prefix) 
      {
        try 
        {
          removeFromLocalStorage(key.substr(prefixLength));
        } 
        catch (e) 
        {
          $rootScope.$broadcast('StorageModule.notification.error',e.Description);
          return false;
        }
      }
    }
    return true;
  };


  // Checks the browser to see if cookies are supported
  var browserSupportsCookies = function() 
  {
    try 
    {
      return navigator.cookieEnabled ||
        ("cookie" in document && (document.cookie.length > 0 ||
        (document.cookie = "test").indexOf.call(document.cookie, "test") > -1));
    } 
    catch (e) 
    {
      $rootScope.$broadcast('StorageModule.notification.error',e.Description);
      return false;
    }
  }


  // Directly adds a value to cookies
  // Typically used as a fallback is local storage is not available in the browser
  // Example use: Storage.cookie.add('library','angular');
  var addToCookies = function (key, value) 
  {

    if (typeof value == "undefined") return false;

    if (!browserSupportsCookies()) 
    {
      $rootScope.$broadcast('StorageModule.notification.error','COOKIES_NOT_SUPPORTED');
      return false;
    }

    try 
    {
      var expiry = '', expiryDate = new Date();
      if (value === null) 
      {
        cookie.expiry = -1;
        value = '';
      };

      if (cookie.expiry !== 0) 
      {
        expiryDate.setTime(expiryDate.getTime() + (cookie.expiry*24*60*60*1000));
        expiry = "; expires="+expiryDate.toGMTString();
      }

      document.cookie = prefix + 
                        key + 
                        "=" + 
                        encodeURIComponent(value) + 
                        expiry + 
                        "; path=" + 
                        cookie.path;
    } 
    catch (e) 
    {
      $rootScope.$broadcast('StorageModule.notification.error',e.Description);
      return false;
    }

    return true;
  };


  // Directly get a value from a cookie
  // Example use: Storage.cookie.get('library'); // returns 'angular'
  var getFromCookies = function (key) 
  {
    if (!browserSupportsCookies()) 
    {
      $rootScope.$broadcast('StorageModule.notification.error','COOKIES_NOT_SUPPORTED');
      return false;
    }

    var cookies = document.cookie.split(';');
    
    for(var i=0;i < cookies.length;i++) 
    {
      var thisCookie = cookies[i];
      
      while (thisCookie.charAt(0)==' ') 
      {
        thisCookie = thisCookie.substring(1,thisCookie.length);
      }

      if (thisCookie.indexOf(prefix+key+'=') == 0) 
      {
        return decodeURIComponent(thisCookie.substring(prefix.length+key.length+1,thisCookie.length));
      }
    }
    return null;
  };


  var removeFromCookies = function (key) 
  {
    addToCookies(key,null);
  }


  var clearAllFromCookies = function () 
  {
    var thisCookie = null, thisKey = null;
    var prefixLength = prefix.length;
    var cookies = document.cookie.split(';');
    
    for(var i=0;i < cookies.length;i++) 
    {
      thisCookie = cookies[i];
      
      while (thisCookie.charAt(0)==' ') 
      {
        thisCookie = thisCookie.substring(1,thisCookie.length);
      }

      key = thisCookie.substring(prefixLength,thisCookie.indexOf('='));
      removeFromCookies(key);
    }
  }


  return {
    isSupported: browserSupportsLocalStorage,
    add: addToLocalStorage,
    get: getFromLocalStorage,
    remove: removeFromLocalStorage,
    clearAll: clearAllFromLocalStorage,
    cookie: {
      add: addToCookies,
      get: getFromCookies,
      remove: removeFromCookies,
      clearAll: clearAllFromCookies
    }
  };

}]);





































































/*
angular.module('TimeSlotsServices2', ['ngResource']).
  factory('TimeSlotsResource2', function ($resource) 
  {
    var sessionID = '0e57d85c6c959d9882d3ba9d8ee66bc8383ca4b37a5f19bf44a89d582342562b';

    $.ajaxSetup(
    {
      contentType: 'application/json',
      xhrFields: { 
        withCredentials: true
      },
      headers: {
        'X-SESSION_ID': sessionID
      } 
    })

    var TimeSlotsResource = new Object;

    TimeSlotsResource.prototype.getAll = function (successCB, errorCB)
    {
      /*
      async.parallel(
      {
        user: function(callbackUserSlots)
        {
          setTimeout(function()
          {
            var user,
                members = {},
                tmp = {},
                slots = {},
                key, 
                itype, 
                ikey, 
                params = [];
                //params = ['&type=both'];
            params.unshift(null);

            $.each(params, function(index, param)
            {
              if (param)
              {
                key = param.substr(6);
                itype = param;
              }
              else
              {
                key = 'default';
                itype = '';
              }
              ikey = window.app.resources.uuid + "_" + key;

              (function(ikey, itype, key, index)
              {
                tmp[ikey] = function(callback, index)
                {
                  setTimeout(function()
                  {
                    $.ajax(
                    {
                      url: host  + '/askatars/' 
                                 //+ window.app.resources.uuid 
                                 + 'apptestknrm'
                                 + '/slots?start=' 
                                 //+ config.timeline.settings.ranges.period.bstart 
                                 + 1349049600 // 1-10-2012 
                                 + '&end=' 
                                 //+ config.timeline.settings.ranges.period.bend 
                                 + 1356912000 // 31-12-2012
                                 + itype
                    }).success(
                    function(data)
                    {
                      callback(null, true);
                    }).fail(function()
                    { 
                      callback(true, null);
                    })
                  }, (index * 100) + 100)
                }
                $.extend(members, tmp)
              })(ikey, itype, key, index)
            })

            async.series(members, function(err, results)
            {
              callbackUserSlots(null, results)
            })

          }, 100)
        },

        groups: function(callbackGroupSlots)
        {
          setTimeout(function()
          {
            callbackGroupSlots(null, true)
          }, 300)
        },

        members: function(callbackMemberSlots)
        {
          setTimeout(function()
          {
            callbackMemberSlots(null, true)
          }, 500)
        }

      },
      function(err, results)
      {
        return (err, results);  
      })
      */
     /*
      return true;
    }

    return new TimeSlotsResource;

  });
*/


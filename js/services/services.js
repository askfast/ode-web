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

    blacklisted: ['msie'],

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
        start:  Date.today().add({ days: -2 }),
        end:    Date.today().add({ days: 12 })
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

        start: Date.today().add({ days: -2 }),
        end: Date.today().add({ days: 12 }),

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
 * Use same structure as other ones!
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
        // $rootScope.counter = timers[id].counter;
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
  };




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
        expiryDate.setTime(expiryDate.getTime() + (cookie.expiry * 60 * 60 * 1000));
        expiry = "; expires="+expiryDate.toGMTString();
      };


      document.cookie = prefix + 
                        key + 
                        "=" + 
                        //encodeURIComponent(value) + 
                        value + 
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
  // var addToCookies = function (key, value) 
  // {

  //   if (typeof value == "undefined") return false;

  //   if (!browserSupportsCookies()) 
  //   {
  //     $rootScope.$broadcast('StorageModule.notification.error','COOKIES_NOT_SUPPORTED');
  //     return false;
  //   }

  //   try 
  //   {
  //     var expiry = '', expiryDate = new Date();
  //     if (value === null) 
  //     {
  //       cookie.expiry = -1;
  //       value = '';
  //     };

  //     if (cookie.expiry !== 0) 
  //     {
  //       expiryDate.setTime(expiryDate.getTime() + (cookie.expiry*24*60*60*1000));
  //       expiry = "; expires="+expiryDate.toGMTString();
  //     }

  //     document.cookie = prefix + 
  //                       key + 
  //                       "=" + 
  //                       encodeURIComponent(value) + 
  //                       expiry + 
  //                       "; path=" + 
  //                       cookie.path;
  //   } 
  //   catch (e) 
  //   {
  //     $rootScope.$broadcast('StorageModule.notification.error',e.Description);
  //     return false;
  //   }

  //   return true;
  // };


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

































































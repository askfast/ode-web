'use strict';

/**
 * TODO
 * Integrate localStorage service into this
 * for cookie reading or setting
 *
 * Needs optimizing!!
 * 
 * Organize it more!
 * 
 * Session Service
 */
WebPaige.
factory('Session', function ($rootScope, $http, Storage) 
{
  return {

    /**
     * Check session
     * @param  {[type]} session [description]
     * @return {[type]}         [description]
     */
    check: function()
    {
        var session = angular.fromJson(Storage.cookie.get('session'));
        if (session)
        {
          this.set(session.id);
          return true;
        }
        else
        {
          return false;
        };
    },


    /**
     * TODO
     * Take the useful parts to real one 
     * 
     * @param  {[type]} session [description]
     * @return {[type]}         [description]
     */
    check__: function(session)
    {
      console.log('-> asked session value', session);

      if(!session)
      {
        console.log('there was no session given by check so reading from cookie.');
        session = this.cookie();
        console.log('--> cookie read session value:', session); 
        
        if(session != null)
        {
          if(session.id == null)
            return false;

          var time  = new Date();
          var now   = time.getTime();

          if((now - session.time) > (60 * 60 * 1000))
          {   
            return false;
          };
          return true;
        }
             
      };
      //return false;
    },


    /**
     * TODO
     * Use cookie optionality of Storage!
     * 
     * Read cookie value
     * @param  {[type]} session [description]
     * @return {[type]}         [description]
     */
    cookie: function(session)
    {
      var values;

      var pairs = document.cookie.split(";");

      for(var i=0; i<pairs.length; i++)
      {
        values = pairs[i].split("=");

        if(values[0].trim() == "WebPaige.session")
        {
          return angular.fromJson(values[1]);
        };
      };

    },

    /**
     * Get session
     * Prolong session time by every check
     * 
     * @param  {[type]} session [description]
     * @return {[type]}         [description]
     */
    get: function(session)
    {
      this.check(session);
      this.set(session.id);
      return session.id;
    },


    /**
     * Set session
     * @param {[type]} sessionId [description]
     */
    set: function(sessionId)
    {
      // var session     = new Object();
      // var time        = new Date();
      // session.id      = sessionId;
      // session.time    = time;
      // document.cookie = "ask=" + angular.toJson(session);

      // $rootScope.session = session;
      // $http.defaults.headers.common['X-SESSION_ID'] = $rootScope.session.id;
      // /**
      //  * REMOVE
      //  */
      // console.log('http headers ->', $http.defaults.headers.common);

      // return session;



      var session = {
        id: sessionId,
        time: new Date()
      };

      Storage.cookie.add('session', angular.toJson(session));

      //document.cookie = "ask=" + angular.toJson(session);

      $rootScope.session = session;
      $http.defaults.headers.common['X-SESSION_ID'] = $rootScope.session.id;
      /**
       * REMOVE
       */
      //console.log('http headers ->', $http.defaults.headers.common);

      return session;
    },


    /**
     * Clear session
     * @param {[type]} sessionId [description]
     */
    clear: function()
    {
      $rootScope.session = null;
      $http.defaults.headers.common['X-SESSION_ID'] = null;
    }

  }

});


/**
 * ************************************************************************************************
 * ************************************************************************************************
 * ************************************************************************************************
 * ************************************************************************************************
 */



WebPaige.
factory('Dater', function ($rootScope, Storage) 
{
  return {
    current:
    {
      today: function ()
      {
        return Date.today().getDayOfYear() + 1;
      },
      week: function ()
      {
        return new Date().getWeek();
      },
      month: function ()
      {
        return new Date().getMonth() + 1;
      }
    },

    readable: 
    {
      date: function (date)
      {
        return  new Date(date).toString($rootScope.config.formats.date);
      }
    },

    // convert:
    // {
    //   range: function (range)
    //   {
    //     var range = {
    //       start:  new Date(range.start).toString($rootScope.config.formats.date),
    //       end:    new Date(range.end).toString($rootScope.config.formats.date)
    //     };

    //     return range;
    //   },

    //   /**
    //    * Not working either       
    //    *
    //    */
    //   stamp: function (date)
    //   {
    //     return Date(date).getTime();
    //   }
    // },

    // stringify:
    // {
    //   date: function (date)
    //   {
    //     return new Date(date).toString($rootScope.config.formats.date);
    //   }
    // },

    calculate:
    {
      diff: function (range)
      {
        return new Date(range.end).getTime() - new Date(range.start).getTime()
      }
    },

    // /**
    //  * TODO
    //  * REMOVE
    //  * Not used in planboard controller
    //  * 
    //  * Fix it later..
    //  * Not beautiful but works!!
    //  */
    // convertRangeDates: function(dates)
    // {
    //   var dates   = dates.split(' / '),
    //       starts  = dates[0].split('-'),
    //       start   = starts[1] + '-' + starts[0] + '-' + starts[2],
    //       ends    = dates[1].split('-'),
    //       end     = ends[1] + '-' + ends[0] + '-' + ends[2];

    //   return {
    //     start:  Date.parse(start + ' 00:00:00 AM'),
    //     end:    Date.parse(end + ' 00:00:00 AM')
    //   }
    // },

    // /**
    //  * Make time readable for user
    //  */
    // readableTime: function(time, format)
    // {
    //   return new Date(time).toString(format); 
    // },

    // /** 
    //  * Make date readable for user
    //  */
    // readableDate: function(date, format)
    // {
    //   return new Date(date).toString(format);
    // },

    /**
     * Get the current month
     */
    getThisMonth: function()
    {
      return new Date().toString('M');
    },

    /**
     * Get the current year
     */
    getThisYear: function()
    {
      return new Date().toString('yyyy');
    },

    /**
     * Get begin and end timestamps of months
     * in the current year
     */
    getMonthTimeStamps: function()
    {
      var months = {}, 
          year = this.getThisYear();

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
          totalDays: Date.getDaysInMonth(year, i)
        };
        months[i+1] = month;
      };

      return months;
    },

    /**
     * Get begin and end timestamps of weeks
     */
    getWeekTimeStamps: function()
    {
      var nweeks = [],
          weeks = {},
          nextMonday,
          year = this.getThisYear(), 
          firstDayInYear = new Date(year, 0).moveToFirstDayOfMonth(),
          firstMondayOfYear = new Date(year, 0).moveToFirstDayOfMonth().last().sunday().addWeeks(0),
          firstMonday = new Date(firstMondayOfYear);

      for (var i = 0; i < 53; i++)
      {
        if (i == 0)
        {
          nextMonday = firstMondayOfYear.addWeeks(1);
        }
        else
        {
          nextMonday = new Date(nweeks[i-1]).addWeeks(1);
        }
        nweeks.push(new Date(nextMonday));
      };

      nweeks.unshift(firstMonday);

      var firstMondayofNextYear = new Date(nweeks[51].addWeeks(1));

      for (var i = 0; i < 55; i++)
      {
        weeks[i+1] = {
          first: {
            day: nweeks[i],
            timeStamp: new Date(nweeks[i]).getTime()
          },
          last: {
            day: nweeks[i+1],
            timeStamp: new Date(nweeks[i+1]).getTime()
          }
        }
      };

      /**
       * Remove unneccessary periods
       */
      delete weeks[54];
      delete weeks[55];

      return weeks;
    },

    /**
     */
    getDayTimeStamps: function()
    {
      var nextDay,
          ndays = [],
          days = {},
          year = this.getThisYear(),
          firstDayInYear = new Date(year, 0).moveToFirstDayOfMonth();
      
      for (var i = 0; i < 366; i++)
      {
        if (i == 0)
        {
          nextDay = firstDayInYear;
        }
        else
        {
          nextDay = new Date(ndays[i-1]).addDays(1);
        }
        ndays.push(new Date(nextDay));
      };

      for (var i = 0; i < 366; i++)
      {
        days[i+1] = {
          first: {
            day: ndays[i],
            timeStamp: new Date(ndays[i]).getTime()
          },
          last: {
            day: ndays[i+1],
            timeStamp: new Date(ndays[i+1]).getTime()
          }
        }
      };

      /**
       * Remove not existing date
       */
      if (!days[366].timeStamp)
      {
        delete days[366];
        days.total = 365;
      }
      else
      {
        days.total = 366;
      };

      return days;
    },

    registerPeriods: function()
    {
      var periods = angular.fromJson(Storage.get('periods') || '{}');
      Storage.add('periods', angular.toJson({
        months: this.getMonthTimeStamps(),
        weeks: this.getWeekTimeStamps(),
        days: this.getDayTimeStamps()
      }));      
    },

    getPeriods: function()
    {
      return angular.fromJson(Storage.get('periods'));
    },

    absoluteDates: function(date, time)
    {
      var dates = date.split('-');
      return new Date(Date.parse(dates[2] + 
                                  '-' + 
                                  dates[1] + 
                                  '-' + 
                                  dates[0] + 
                                  ' ' + 
                                  time)).getTime() / 1000
    }




  }
});



/**
 * ************************************************************************************************
 * ************************************************************************************************
 * ************************************************************************************************
 * ************************************************************************************************
 */



/**
 * TODO
 * Make history of events
 * 
 * EventBus Service
 */
WebPaige.
service('$eventBus', 
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
 * ************************************************************************************************
 * ************************************************************************************************
 * ************************************************************************************************
 * ************************************************************************************************
 */



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
    };

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
 * ************************************************************************************************
 * ************************************************************************************************
 * ************************************************************************************************
 * ************************************************************************************************
 */



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
      //$rootScope.$broadcast('StorageModule.notification.error',e.Description);
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
      //$rootScope.$broadcast('StorageModule.notification.warning','LOCAL_STORAGE_NOT_SUPPORTED');
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
      //$rootScope.$broadcast('StorageModule.notification.error',e.Description);
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
      //$rootScope.$broadcast('StorageModule.notification.warning','LOCAL_STORAGE_NOT_SUPPORTED');
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
      //$rootScope.$broadcast('StorageModule.notification.warning','LOCAL_STORAGE_NOT_SUPPORTED');
      return false;
    }

    try 
    {
      localStorage.removeItem(prefix+key);
    } 
    catch (e) 
    {
      //$rootScope.$broadcast('StorageModule.notification.error',e.Description);
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
      //$rootScope.$broadcast('StorageModule.notification.warning','LOCAL_STORAGE_NOT_SUPPORTED');
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
          //$rootScope.$broadcast('StorageModule.notification.error',e.Description);
          return false;
        }
      }
    }
    return true;
  };









  /**
   * Checks the browser to see if session storage is supported
   */
  var browserSupportsSessionStorage = function ()
  {
    try
    {
      return ('sessionStorage' in window && window['sessionStorage'] !== null);           
    }
    catch (e)
    {
      return false;
    }
  };



  /**
   * Directly adds a value to session storage
   */
  var addToSessionStorage = function (key, value)
  {
    if (!browserSupportsSessionStorage())
    {
      return false;
    };

    if (!value && value!==0 && value!=="") return false;

    try
    {
      sessionStorage.setItem(prefix+key, value);
    }
    catch (e)
    {
      return false;
    };

    return true;
  };



  /**
   * Get value from session storage
   */
  var getFromSessionStorage = function (key)
  {
    if (!browserSupportsSessionStorage()) 
    {
      return false;
    };

    var item = sessionStorage.getItem(prefix+key);
    if (!item) return null;

    return item;
  };



  /**
   * Remove item from session storage
   */
  var removeFromSessionStorage = function (key) 
  {
    if (!browserSupportsSessionStorage()) 
    {
      return false;
    };

    try 
    {
      sessionStorage.removeItem(prefix+key);
    } 
    catch (e) 
    {
      return false;
    };

    return true;
  };



  /**
   * Remove all data from session storage
   */
  var clearAllFromSessionStorage = function () 
  {

    if (!browserSupportsSessionStorage()) 
    {
      return false;
    };

    var prefixLength = prefix.length;

    for (var key in sessionStorage) 
    {
      // Only remove items that are for this app
      if (key.substr(0,prefixLength) === prefix) 
      {
        try 
        {
          removeFromSessionStorage(key.substr(prefixLength));
        } 
        catch (e) 
        {
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


  var getPeriods = function ()
  {
    return angular.fromJson(getFromLocalStorage('periods'));
  };

  var getGroups = function ()
  {
    return angular.fromJson(getFromLocalStorage('groups'));
  }


  return {
    isSupported: browserSupportsLocalStorage,
    add:        addToLocalStorage,
    get:        getFromLocalStorage,
    remove:     removeFromLocalStorage,
    clearAll:   clearAllFromLocalStorage,
    session: {
      add:      addToSessionStorage,
      get:      getFromSessionStorage,
      remove:   removeFromSessionStorage,
      clearAll: clearAllFromSessionStorage
    },
    cookie: {
      add:      addToCookies,
      get:      getFromCookies,
      remove:   removeFromCookies,
      clearAll: clearAllFromCookies
    },
    local: {
      periods:  getPeriods,
      groups:   getGroups
    }
  };

}]);



/**
 * ************************************************************************************************
 * ************************************************************************************************
 * ************************************************************************************************
 * ************************************************************************************************
 */


/** 
 * MD5 Service
 */
WebPaige.service('$md5', 
function() 
{
  var self = this;
  
  self.process = function(string)
  {
    function RotateLeft(lValue, iShiftBits)
    {
      return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
    }
   
    function AddUnsigned(lX,lY)
    {
      var lX4,lY4,lX8,lY8,lResult;
      lX8 = (lX & 0x80000000);
      lY8 = (lY & 0x80000000);
      lX4 = (lX & 0x40000000);
      lY4 = (lY & 0x40000000);
      lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);

      if (lX4 & lY4)
      {
        return (lResult ^ 0x80000000 ^ lX8 ^ lY8);
      }

      if (lX4 | lY4)
      {
        if (lResult & 0x40000000)
        {
          return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
        }
        else
        {
          return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
        }
      }
      else
      {
        return (lResult ^ lX8 ^ lY8);
      }
    }
   
    function F(x,y,z) { return (x & y) | ((~x) & z) }
    function G(x,y,z) { return (x & z) | (y & (~z)) }
    function H(x,y,z) { return (x ^ y ^ z) }
    function I(x,y,z) { return (y ^ (x | (~z))) }
   
    function FF(a,b,c,d,x,s,ac)
    {
      a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));
      return AddUnsigned(RotateLeft(a, s), b);
    }
   
    function GG(a,b,c,d,x,s,ac)
    {
      a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));
      return AddUnsigned(RotateLeft(a, s), b);
    }
   
    function HH(a,b,c,d,x,s,ac)
    {
      a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));
      return AddUnsigned(RotateLeft(a, s), b);
    }
   
    function II(a,b,c,d,x,s,ac)
    {
      a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));
      return AddUnsigned(RotateLeft(a, s), b);
    }
   
    function ConvertToWordArray(string)
    {
      var lWordCount;
      var lMessageLength = string.length;
      var lNumberOfWords_temp1=lMessageLength + 8;
      var lNumberOfWords_temp2=(lNumberOfWords_temp1-(lNumberOfWords_temp1 % 64))/64;
      var lNumberOfWords = (lNumberOfWords_temp2+1)*16;
      var lWordArray=Array(lNumberOfWords-1);
      var lBytePosition = 0;
      var lByteCount = 0;

      while ( lByteCount < lMessageLength )
      {
        lWordCount = (lByteCount-(lByteCount % 4))/4;
        lBytePosition = (lByteCount % 4)*8;
        lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
        lByteCount++;
      }

      lWordCount = (lByteCount-(lByteCount % 4))/4;
      lBytePosition = (lByteCount % 4)*8;
      lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
      lWordArray[lNumberOfWords-2] = lMessageLength<<3;
      lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
      return lWordArray;
    }
   
    function WordToHex(lValue)
    {
      var WordToHexValue="",WordToHexValue_temp="",lByte,lCount;

      for (lCount = 0;lCount<=3;lCount++)
      {
        lByte = (lValue>>>(lCount*8)) & 255;
        WordToHexValue_temp = "0" + lByte.toString(16);
        WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length-2,2);
      }

      return WordToHexValue;
    };
   
    function Utf8Encode(string)
    {
      string = string.replace(/\r\n/g,"\n");
      var utftext = "";
   
      for (var n = 0; n < string.length; n++)
      {
        var c = string.charCodeAt(n);
   
        if (c < 128)
        {
          utftext += String.fromCharCode(c);
        }
        else if((c > 127) && (c < 2048))
        {
          utftext += String.fromCharCode((c >> 6) | 192);
          utftext += String.fromCharCode((c & 63) | 128);
        }
        else
        {
          utftext += String.fromCharCode((c >> 12) | 224);
          utftext += String.fromCharCode(((c >> 6) & 63) | 128);
          utftext += String.fromCharCode((c & 63) | 128);
        }
   
      }
   
      return utftext;
    };
   
    var x=Array();
    var k,AA,BB,CC,DD,a,b,c,d;
    var S11=7, S12=12, S13=17, S14=22;
    var S21=5, S22=9 , S23=14, S24=20;
    var S31=4, S32=11, S33=16, S34=23;
    var S41=6, S42=10, S43=15, S44=21;
   
    string = Utf8Encode(string);
   
    x = ConvertToWordArray(string);
   
    a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
   
    for (k=0;k<x.length;k+=16)
    {
      AA=a; BB=b; CC=c; DD=d;
      a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
      d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
      c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
      b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
      a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
      d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
      c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
      b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
      a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
      d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
      c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
      b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
      a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
      d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
      c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
      b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
      a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
      d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
      c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
      b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
      a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
      d=GG(d,a,b,c,x[k+10],S22,0x2441453);
      c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
      b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
      a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
      d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
      c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
      b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
      a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
      d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
      c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
      b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
      a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
      d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
      c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
      b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
      a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
      d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
      c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
      b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
      a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
      d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
      c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
      b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
      a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
      d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
      c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
      b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
      a=II(a,b,c,d,x[k+0], S41,0xF4292244);
      d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
      c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
      b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
      a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
      d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
      c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
      b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
      a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
      d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
      c=II(c,d,a,b,x[k+6], S43,0xA3014314);
      b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
      a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
      d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
      c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
      b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
      a=AddUnsigned(a,AA);
      b=AddUnsigned(b,BB);
      c=AddUnsigned(c,CC);
      d=AddUnsigned(d,DD);
    }
   
    var temp = WordToHex(a)+WordToHex(b)+WordToHex(c)+WordToHex(d);
   
    return temp.toLowerCase();
  }
});

//register the interceptor as a service
WebPaige.config(function ($httpProvider) {
    $httpProvider.responseInterceptors.push('paigeHttpInterceptor');
})

//register the interceptor as a service, intercepts ALL angular ajax http calls
.factory('paigeHttpInterceptor', function($q,$location) {
    return function(promise) {
      return promise.then(function(response) 
      {
        // console.log('intercepted', arguments);

        // do something on success
          return response;
      }, function(response) {
        // do something on error
          if(response.status == 403)
          {
              alert("Session timeout , please re-login");
              $location.path("/login");
          }
          return $q.reject(response);
      });
    }
});


/**
 * ************************************************************************************************
 * ************************************************************************************************
 * ************************************************************************************************
 * ************************************************************************************************
 */



WebPaige.
factory('Strings', function () 
{
  return {

    /**
     * Truncate string from words with ..
     */
    truncate: function(txt, n, useWordBoundary)
    {
       var toLong = txt.length > n,
           s_ = toLong ? txt.substr(0, n-1) : txt;

       s_ = useWordBoundary && toLong ? s_.substr(0,s_.lastIndexOf(' ')) : s_;

       return toLong ? s_ + '..' : s_;
    }

  }
});








/**
 * ************************************************************************************************
 * ************************************************************************************************
 * ************************************************************************************************
 * ************************************************************************************************
 */



WebPaige.
factory('Sloter', ['$rootScope', 'Storage', function ($rootScope, Storage) 
{
  return {
    
    /**
     * Timeline data processing
     */
    process: function (data, config, divisions)
    {
      /**
       * Timedata container for all sort of slots
       */
      var timedata = [];
      
      /**
       * Get groups
       */
      var groups = {};
      angular.forEach(angular.fromJson(Storage.get('groups')), function (group, index)
      {
        groups[group.uuid] = group.name;
      });

      /**
       * Get members
       */
      var members = {};
      angular.forEach(angular.fromJson(Storage.get('members')), function (member, index)
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
                group: (slot.recursive) ? wrapper('b') + $rootScope.ui.planboard.weeklyPlanning + wrapper('recursive') : 
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

  }
}]);
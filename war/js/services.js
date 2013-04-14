'use strict';


angular.module('WebPaige.Services', ['ngResource'])

/**
 * Timer service
 *
 * Timer.start('timerExample', function () { console.warn('timer started') }, 5);
 * $scope.stopTimer = function () { Timer.stop('timerExample') };
 */
.factory('Timer', 
[
  '$rootScope', '$timeout', 
  function ($rootScope, $timeout)
  {
    var initer = 0,
        timers = [];

    var addTimer = function (id, event, delay)
    {
      timers[id] = {
        event: event, 
        delay: delay, 
        counter: 0
      };

      var onTimeout = function ()
      {
        timers[id].counter++;

        timers[id].mytimeout = $timeout(onTimeout, 1000);

        if (timers[id].delay == timers[id].counter)
        {
          timers[id].event.call();

          timers[id].counter = 0;
        };
      };

      timers[id].mytimeout = $timeout(onTimeout, 1000);  
    };

    var stopTimer = function (id)
    {
      $timeout.cancel(timers[id].mytimeout);
    };

    return {
      start:  addTimer,
      stop:   stopTimer
    };
  }
])


/**
 * Session Service
 */
.factory('Session', 
[
  '$rootScope', '$http', 'Storage', 
  function ($rootScope, $http, Storage)
  {
    return {
      /**
       * Check session
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
       * Read cookie value
       */
      cookie: function(session)
      {
        var values,
            pairs = document.cookie.split(";");

        for (var i=0; i < pairs.length; i++)
        {
          values = pairs[i].split("=");

          if (values[0].trim() == "WebPaige.session") return angular.fromJson(values[1]);
        };

      },

      /**
       * Get session
       * Prolong session time by every check
       */
      get: function(session)
      {
        this.check(session);

        this.set(session.id);

        return session.id;
      },

      /**
       * Set session
       */
      set: function(sessionId)
      {
        var session = {
          id: sessionId,
          time: new Date()
        };

        Storage.cookie.add('session', angular.toJson(session));

        $rootScope.session = session;

        $http.defaults.headers.common['X-SESSION_ID'] = $rootScope.session.id;

        return session;
      },

      /**
       * Clear session
       */
      clear: function()
      {
        $rootScope.session = null;

        $http.defaults.headers.common['X-SESSION_ID'] = null;
      }
    }
  }
])


/**
 * Dater service (Wrapper on Date)
 */
.factory('Dater', 
[
  '$rootScope', 'Storage', 
  function ($rootScope, Storage)
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

      convert:
      {
        absolute: function (date, time, flag)
        {
          var dates   = date.split('-'),
              result  = new Date(Date.parse(dates[2] + 
                                      '-' + 
                                      dates[1] + 
                                      '-' + 
                                      dates[0] + 
                                      ' ' + 
                                      time)).getTime();
          
          return (flag) ? result / 1000 : result;
        }
      },

      calculate:
      {
        diff: function (range)
        {
          return new Date(range.end).getTime() - new Date(range.start).getTime()
        }
      },

      /**
       * Get the current month
       */
      getThisMonth: function ()
      {
        return new Date().toString('M');
      },

      /**
       * Get the current year
       */
      getThisYear: function ()
      {
        return new Date().toString('yyyy');
      },

      /**
       * Get begin and end timestamps of months
       * in the current year
       */
      getMonthTimeStamps: function ()
      {
        var months  = {}, 
            year    = this.getThisYear();

        for (var i = 0; i < 12; i++)
        {
          var firstDay  = new Date(year, i).moveToFirstDayOfMonth(),
              lastDay   = new Date(year, i).moveToLastDayOfMonth(),
              month     = {
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
        var nweeks    = [],
            weeks     = {},
            nextMonday,
            year      = this.getThisYear(), 
            firstDayInYear    = new Date(year, 0).moveToFirstDayOfMonth(),
            firstMondayOfYear = new Date(year, 0).moveToFirstDayOfMonth().last().sunday().addWeeks(0),
            firstMonday       = new Date(firstMondayOfYear);

        for (var i = 0; i < 53; i++)
        {
          if (i == 0)
          {
            nextMonday = firstMondayOfYear.addWeeks(1);
          }
          else
          {
            nextMonday = new Date(nweeks[i-1]).addWeeks(1);
          };

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
          };

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
          };
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

      registerPeriods: function ()
      {
        var periods = angular.fromJson(Storage.get('periods') || '{}');

        Storage.add('periods', angular.toJson({
          months: this.getMonthTimeStamps(),
          weeks: this.getWeekTimeStamps(),
          days: this.getDayTimeStamps()
        }));      
      },

      getPeriods: function ()
      {
        return angular.fromJson(Storage.get('periods'));
      }
    }
  }
])


/**
 * EventBus Service
 */
.factory('EventBus', 
[
  '$rootScope', 
  function ($rootScope)
  {
    var self      = this,
        listeners = {},
        history   = {};
   
    self.emit = function (eventName) 
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
   
    self.on = function (eventName, fn) 
    {
      if (!(listeners[eventName] instanceof Array)) listeners[eventName] = [];

      listeners[eventName].push(fn);

      $rootScope.$on(listeners[eventName], fn);
    };
   
    self.remove = function (eventName, fn) 
    {
      var lsnrs = listeners[eventName],
          ind   = lsnrs instanceof Array ? lsnrs.indexOf(fn) : -1;

      if (ind > -1) listeners[eventName].splice(ind,1);
    };
   
    self.removeAll = function (eventName) 
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
  }
])


/**
 * TODO
 * Implement a call registering system with general error handling
 * 
 * Intercepts *all* angular ajax http calls
 */
.factory('Interceptor', 
[
  '$q', '$location', 
  function ($q, $location)
  {
    return function (promise)
    {
      return promise.then(
      /**
       * Succeded
       */
      function (response) 
      {
        // console.log('call ->', arguments[0].config.url, 'method ->', arguments[0].config.method, arguments);
        return response;
      },
      /**
       * Failed
       */
      function (response) 
      {
        /**
         * TODO
         * Possible bug !
         */
        // if (response.status == 403)
        // {
        //   alert("Session timeout , please re-login");
        //   $location.path("/login");
        // };

        return $q.reject(response);
      });
    }
  }
])


/**
 * MD5
 */
.factory('MD5', 
  function ()
  {
    return function (string)
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

        if (lX4 & lY4) return (lResult ^ 0x80000000 ^ lX8 ^ lY8);

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
        var lWordCount,
            lMessageLength = string.length,
            lNumberOfWords_temp1 = lMessageLength + 8,
            lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64,
            lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16,
            lWordArray = Array(lNumberOfWords - 1),
            lBytePosition = 0,
            lByteCount = 0;

        while ( lByteCount < lMessageLength )
        {
          lWordCount = (lByteCount - (lByteCount % 4)) / 4;
          lBytePosition = (lByteCount % 4)*8;
          lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
          lByteCount++;
        }

        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
        lWordArray[lNumberOfWords-2] = lMessageLength<<3;
        lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
        return lWordArray;
      }
     
      function WordToHex(lValue)
      {
        var WordToHexValue = "", 
            WordToHexValue_temp = "",
            lByte,
            lCount;

        for (lCount = 0; lCount<=3; lCount++)
        {
          lByte = (lValue>>>(lCount*8)) & 255;
          WordToHexValue_temp = "0" + lByte.toString(16);
          WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
        }

        return WordToHexValue;
      };
     
      function Utf8Encode(string)
      {
        string = string.replace(/\r\n/g, "\n");

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
     
      var x = Array();
      var k,AA,BB,CC,DD,a,b,c,d;
      var S11=7, S12=12, S13=17, S14=22;
      var S21=5, S22=9 , S23=14, S24=20;
      var S31=4, S32=11, S33=16, S34=23;
      var S41=6, S42=10, S43=15, S44=21;
     
      string = Utf8Encode(string);
     
      x = ConvertToWordArray(string);
     
      a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
     
      for (k=0; k<x.length; k+=16)
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
     
      var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);
     
      return temp.toLowerCase();
    }
  }
)


/**
 * Storage service for localStorage, Session and cookies management
 */
.factory('Storage', ['$rootScope', '$config', function ($rootScope, $config)
{
  // If there is a prefix set in the config lets use that with an appended 
  // period for readability
  // var prefix = angularLocalStorage.constant;
  
  if ($config.title.substr(-1) !== '.') $config.title = !!$config.title ? $config.title + '.' : '';

  // Checks the browser to see if local storage is supported
  var browserSupportsLocalStorage = function ()
  {
    try {
      return ('localStorage' in window && window['localStorage'] !== null);           
    }
    catch (e) {
      return false;
    }
  };

  // Directly adds a value to local storage
  // If local storage is not available in the browser use cookies
  // Example use: Storage.add('library','angular');
  var addToLocalStorage = function (key, value)
  {
    if (!browserSupportsLocalStorage()) return false;

    // 0 and "" is allowed as a value but let's limit other falsey values like "undefined"
    if (!value && value !== 0 && value !== "") return false;

    try {
      localStorage.setItem($config.title + key, value);
    }
    catch (e) {
      return false;
    };

    return true;
  };


  // Directly get a value from local storage
  // Example use: Storage.get('library'); // returns 'angular'
  var getFromLocalStorage = function (key)
  {
    if (!browserSupportsLocalStorage()) return false;

    var item = localStorage.getItem($config.title + key);

    if (!item) return null;

    return item;
  };


  // Remove an item from local storage
  // Example use: Storage.remove('library'); // removes the key/value pair of library='angular'
  var removeFromLocalStorage = function (key) 
  {
    if (!browserSupportsLocalStorage()) return false;

    try {
      localStorage.removeItem($config.title + key);
    } 
    catch (e) {
      return false;
    };

    return true;
  };


  // Remove all data for this app from local storage
  // Example use: Storage.clearAll();
  // Should be used mostly for development purposes
  var clearAllFromLocalStorage = function () 
  {
    if (!browserSupportsLocalStorage()) return false;

    var prefixLength = $config.title.length;

    for (var key in localStorage) 
    {
      // Only remove items that are for this app
      if (key.substr(0, prefixLength) === $config.title) 
      {
        try {
          removeFromLocalStorage(key.substr(prefixLength));
        } 
        catch (e) {
          return false;
        };
      };
    };

    return true;
  };


  /**
   * Checks the browser to see if session storage is supported
   */
  var browserSupportsSessionStorage = function ()
  {
    try {
      return ('sessionStorage' in window && window['sessionStorage'] !== null);           
    }
    catch (e) {
      return false;
    }
  };


  /**
   * Directly adds a value to session storage
   */
  var addToSessionStorage = function (key, value)
  {
    if (!browserSupportsSessionStorage()) return false;

    if (!value && value !== 0 && value !== "") return false;

    try {
      sessionStorage.setItem($config.title + key, value);
    }
    catch (e) {
      return false;
    };

    return true;
  };


  /**
   * Get value from session storage
   */
  var getFromSessionStorage = function (key)
  {
    if (!browserSupportsSessionStorage()) return false;

    var item = sessionStorage.getItem($config.title + key);

    if (!item) return null;

    return item;
  };


  /**
   * Remove item from session storage
   */
  var removeFromSessionStorage = function (key) 
  {
    if (!browserSupportsSessionStorage()) return false;

    try {
      sessionStorage.removeItem($config.title + key);
    } 
    catch (e) {
      return false;
    };

    return true;
  };


  /**
   * Remove all data from session storage
   */
  var clearAllFromSessionStorage = function () 
  {
    if (!browserSupportsSessionStorage()) return false;

    var prefixLength = $config.title.length;

    for (var key in sessionStorage) 
    {
      // Only remove items that are for this app
      if (key.substr(0, prefixLength) === $config.title) 
      {
        try {
          removeFromSessionStorage(key.substr(prefixLength));
        } 
        catch (e) {
          return false;
        };
      };
    };

    return true;
  };


  // Checks the browser to see if cookies are supported
  var browserSupportsCookies = function () 
  {
    try {
      return navigator.cookieEnabled ||
        ("cookie" in document && (document.cookie.length > 0 ||
        (document.cookie = "test").indexOf.call(document.cookie, "test") > -1));
    } 
    catch (e) {
      return false;
    }
  };


  // Directly adds a value to cookies
  // Typically used as a fallback is local storage is not available in the browser
  // Example use: Storage.cookie.add('library','angular');
  var addToCookies = function (key, value) 
  {
    if (typeof value == "undefined") return false;

    if (!browserSupportsCookies())  return false;

    try {
      var expiry      = '', 
          expiryDate  = new Date();

      if (value === null) 
      {
        $config.cookie.expiry = -1;

        value = '';
      };

      if ($config.cookie.expiry !== 0) 
      {
        expiryDate.setTime(expiryDate.getTime() + ($config.cookie.expiry * 60 * 60 * 1000));

        expiry = "; expires=" + expiryDate.toGMTString();
      };

      document.cookie = $config.title + 
                        key + 
                        "=" + 
                        //encodeURIComponent(value) + 
                        value + 
                        expiry + 
                        "; path=" + 
                        $config.cookie.path;
    } 
    catch (e) {
      return false;
    };

    return true;
  };


  // Directly get a value from a cookie
  // Example use: Storage.cookie.get('library'); // returns 'angular'
  var getFromCookies = function (key) 
  {
    if (!browserSupportsCookies()) 
    {
      $rootScope.$broadcast('StorageModule.notification.error', 'COOKIES_NOT_SUPPORTED');
      return false;
    }

    var cookies = document.cookie.split(';');
    
    for (var i=0; i < cookies.length; i++) 
    {
      var thisCookie = cookies[i];
      
      while (thisCookie.charAt(0)==' ')
        thisCookie = thisCookie.substring(1, thisCookie.length);

      if (thisCookie.indexOf($config.title + key + '=') == 0)
        return decodeURIComponent(thisCookie.substring($config.title.length + key.length + 1, thisCookie.length));
    };

    return null;
  };


  var removeFromCookies = function (key) 
  {
    addToCookies(key, null);
  };


  var clearAllFromCookies = function () 
  {
    var thisCookie    = null, 
        thisKey       = null,
        prefixLength  = $config.title.length,
        cookies       = document.cookie.split(';');
    
    for (var i=0; i < cookies.length; i++) 
    {
      thisCookie = cookies[i];
      
      while (thisCookie.charAt(0) == ' ') 
        thisCookie = thisCookie.substring(1, thisCookie.length);

      key = thisCookie.substring(prefixLength, thisCookie.indexOf('='));

      removeFromCookies(key);
    };
  };


  var getPeriods = function ()
  {
    return angular.fromJson(getFromLocalStorage('periods'));
  };


  var getGroups = function ()
  {
    return angular.fromJson(getFromLocalStorage('groups'));
  };


  var getMembers = function ()
  {
    return angular.fromJson(getFromLocalStorage('members'));
  };


  var getSettings = function ()
  {
    var settings = angular.fromJson(getFromLocalStorage('resources'));

    // if  console.warn('no settings');

    return (!settings.settingsWebPaige) ? $rootScope.config.defaults.settingsWebPaige : angular.fromJson(settings.settingsWebPaige);
  };


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
      groups:   getGroups,
      members:  getMembers,
      settings: getSettings
    }
  }

}])


/**
 * TODO
 * Add example usage!
 * 
 * String manupulators
 */
.factory('Strings', 
  function ()
  {
    return {
      /**
       * Truncate string from words with ..
       */
      truncate: function (txt, n, useWordBoundary)
      {
         var toLong = txt.length > n,
             s_ = toLong ? txt.substr(0, n-1) : txt,
             s_ = useWordBoundary && toLong ? s_.substr(0,s_.lastIndexOf(' ')) : s_;

         return toLong ? s_ + '..' : s_;
      }
    }
  }
)



/**
 * Announcer
 */
.factory('Announcer', 
  function ()
  {
    return {
      /**
       * TODO
       * Modify p2000 script in ask70 for date conversions!!
       *
       * p2000 messages processor
       */
      process: function (results)
      {
        var alarms  = {
              short:  [],
              long:   [] 
            },
            limit   = 4,
            count   = 0;

        angular.forEach(results, function (alarm, index)
        {
          if (alarm.body)
          {
            if (alarm.body.match(/Prio 1/) || alarm.body.match(/PRIO 1/))
            {
              alarm.body = alarm.body.replace('Prio 1 ', '');
              alarm.prio = {
                1:    true,
                test: false
              };
            };

            if (alarm.body.match(/Prio 2/) || alarm.body.match(/PRIO 2/))
            {
              alarm.body = alarm.body.replace('Prio 2 ', '');
              alarm.prio = {
                2:    true,
                test: false
              };
            };

            if (alarm.body.match(/Prio 3/) || alarm.body.match(/PRIO 3/))
            {
              alarm.body = alarm.body.replace('Prio 3 ', '');
              alarm.prio = {
                3:    true,
                test: false
              }
            };

            if (alarm.body.match(/PROEFALARM/))
            {
              alarm.prio = {
                test: true
              };
            };

            // var dates     = alarm.day.split('-'),
            //     swap      = dates[0] + 
            //                 '-' + 
            //                 dates[1] + 
            //                 '-' + 
            //                 dates[2],
            //     dstr      = swap + ' ' + alarm.time,
            //     datetime  = new Date(alarm.day + ' ' + alarm.time).toString('dd-MM-yy HH:mm:ss'),
            //     timeStamp = new Date(datetime).getTime();
            // alarm.datetime = datetime;
            // alarm.timeStamp = timeStamp;

            if (count < 4) alarms.short.push(alarm);

            alarms.long.push(alarm);

            count++;
          }
        });

        return alarms;
      }
    }
  }
)


/**
 * Planboard data processors
 */
.factory('Sloter', 
[
  '$rootScope', 'Storage', 
  function ($rootScope, Storage) 
  {
    return {

      /**
       * Getters
       */
      get: {
        groups: function ()
        {
          var groups = {};

          angular.forEach(Storage.local.groups(), function (group, index)
          {
            groups[group.uuid] = group.name;
          });

          return groups;
        },

        members: function ()
        {
          var members = {};

          angular.forEach(Storage.local.members(), function (member, index)
          {
            members[member.uuid] = member.name;
          });

          return members;
        }
      },

      /**
       * Wrap for sorting in list
       */
      wrapper: function (rank) { return '<span style="display:none;">' + rank + '</span>' },

      /**
       * Wrap secrets in slot contents
       */
      secret: function (content) { return '<span class="secret">' + content + '</span>' },

      /**
       * Add loading bars on both ends
       */
      addLoading: function (data, timedata, rows)
      {
        angular.forEach(rows, function(row, index)
        {
          timedata.push({
            start:  data.periods.end,
            end:    1577836800000,
            group:  row,
            content:    'loading',
            className:  'state-loading-right',
            editable:   false
          });

          timedata.push({
            start:  0,
            end:    data.periods.start,
            group:  row,
            content:    'loading',
            className:  'state-loading-left',
            editable:   false
          });
        });

        return timedata;
      },

      /**
       * Handle user slots
       */
      user: function (data, timedata, config)
      {
        var _this = this;

        angular.forEach(data.user, function (slot, index)
        {
          angular.forEach(config.legenda, function (value, legenda)
          {
            if (slot.text == legenda && value)
            {
              timedata.push({
                start:  Math.round(slot.start * 1000),
                end:    Math.round(slot.end * 1000),
                group:  (slot.recursive) ?  _this.wrapper('b') + $rootScope.ui.planboard.weeklyPlanning + _this.wrapper('recursive') : 
                                            _this.wrapper('a') + $rootScope.ui.planboard.planning + _this.wrapper('planning'),
                content:  _this.secret(angular.toJson({
                  type:   'slot',
                  id:     slot.id, 
                  recursive: slot.recursive, 
                  state:  slot.text 
                  })),
                className:  config.states[slot.text].className,
                editable:   true
              });
            };
          });       
        });

        timedata = _this.addLoading(data, timedata, [
          _this.wrapper('b') + $rootScope.ui.planboard.weeklyPlanning + _this.wrapper('recursive'),
          _this.wrapper('a') + $rootScope.ui.planboard.planning + _this.wrapper('planning')
        ]);

        return timedata;
      },
    
      /**
       * TODO
       * Look for ways to combine with user
       * 
       * Profile timeline data processing
       */
      profile: function (data, config)
      {
        var _this = this,
            timedata = [];

        angular.forEach(data, function (slot, index)
        {
          angular.forEach(config.legenda, function (value, legenda)
          {
            if (slot.text == legenda && value)
            {
              timedata.push({
                start:  Math.round(slot.start * 1000),
                end:    Math.round(slot.end * 1000),
                group:  (slot.recursive) ?  _this.wrapper('b') + $rootScope.ui.planboard.weeklyPlanning + _this.wrapper('recursive') : 
                                            _this.wrapper('a') + $rootScope.ui.planboard.planning + _this.wrapper('planning'),
                content: _this.secret(angular.toJson({
                  type: 'slot',
                  id:   slot.id, 
                  recursive:  slot.recursive, 
                  state:      slot.text 
                  })),
                className:  config.states[slot.text].className,
                editable:   true
              });  
            };
          });       
        });

        timedata.push({
          start:  0,
          end:    1,
          group:  _this.wrapper('b') + $rootScope.ui.planboard.weeklyPlanning + _this.wrapper('recursive'),
          content:    '',
          className:  null,
          editable:   false
        });

        timedata.push({
          start:  0,
          end:    1,
          group:  _this.wrapper('a') + $rootScope.ui.planboard.planning + _this.wrapper('planning'),
          content:    '',
          className:  null,
          editable:   false
        });

        return timedata;
      },

      /**
       * Handle group name whether divisions selected
       */
      namer: function (data, divisions, privilage)
      {
        var groups  = this.get.groups(),
            name    = groups[data.aggs.id],
            link    = '<a href="#/groups?uuid=' + 
                      data.aggs.id + 
                      '#view">' +
                      name +
                      '</a>',
                      title;

        if (data.aggs.division == 'all' || data.aggs.division == undefined)
        {
          title = (privilage == 1) ? link : '<span>' + name + '</span>';
        }
        else
        {
          var label;

          angular.forEach(divisions, function (division, index) { if (division.id == data.aggs.division) label = division.label; });

          title = (privilage == 1) ? link : '<span>' + name + '</span>';

          title += ' <span class="label">' + label + '</span>';
        };

        return title;
      },

      /**
       * Handle group aggs (with divisions) with bars
       */
      bars: function (data, timedata, config, name)
      {
        var _this = this,
            maxh = 0;

        angular.forEach(data.aggs.data, function (slot, index) { if (slot.wish > maxh)  maxh = slot.wish; });

        angular.forEach(data.aggs.data, function (slot, index)
        {
          var maxNum      = maxh,
              num         = slot.wish,
              xwish       = num,
              height      = Math.round(num / maxNum * 80 + 20), // a percentage, with a lower bound on 20%
              minHeight   = height,
              style       = 'height:' + height + 'px;',
              requirement = '<div class="requirement" style="' + 
                            style + 
                            '" ' + 

                            'title="'+'Minimum aantal benodigden'+': ' + 

                            num + 
                            ' personen"></div>';

          num = slot.wish + slot.diff;

          var xcurrent = num;

          height = Math.round(num / maxNum * 80 + 20);

          if (slot.diff >= 0 && slot.diff < 7)
          {
            switch (slot.diff)
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

          var span = '<span class="badge badge-inverse">' + slot.diff + '</span>';

          if (xcurrent > xwish) height = minHeight;

          style = 'height:' + height + 'px;' + 'background-color: ' + color + ';';

          var actual = '<div class="bar" style="' + 
                        style + 
                        '" ' + 

                        ' title="Huidig aantal beschikbaar: ' + 

                        num + 
                        ' personen">' + 
                        span + 
                        '</div>';

          if (  (slot.diff > 0  && config.legenda.groups.more) ||
                (slot.diff == 0 && config.legenda.groups.even) || 
                (slot.diff < 0  && config.legenda.groups.less) )
          {
            timedata.push({
              start:    Math.round(slot.start * 1000),
              end:      Math.round(slot.end * 1000),
              group:    _this.wrapper('c') + name,
              content:  requirement + 
                        actual +
                        _this.secret(angular.toJson({
                          type: 'group',
                          diff: slot.diff,
                          group: name
                        })),
              className: 'group-aggs',
              editable: false
            });
          };

          timedata = _this.addLoading(data, timedata, [
            _this.wrapper('c') + name
          ]);
        });

        return timedata;
      },

      /**
       * Process plain group aggs
       */
      aggs: function (data, timedata, config, name)
      {
        var _this = this;

        angular.forEach(data.aggs.data, function (slot, index)
        {
          var cn;

          if (slot.diff >= 0 && slot.diff < 7)
          {
            switch (slot.diff)
            {
              case 0: cn = 'even';  break
              case 1: cn = 1;       break
              case 2: cn = 2;       break
              case 3: cn = 3;       break
              case 4: cn = 4;       break
              case 5: cn = 5;       break
              case 6: cn = 6;       break
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

          if (  (slot.diff > 0  && config.legenda.groups.more) ||
                (slot.diff == 0 && config.legenda.groups.even) || 
                (slot.diff < 0  && config.legenda.groups.less) )
          {
            timedata.push({
              start:  Math.round(slot.start * 1000),
              end:    Math.round(slot.end * 1000),
              group: _this.wrapper('c') + name,
              content:  cn +
                        _this.secret(angular.toJson({
                          type: 'group',
                          diff: slot.diff,
                          group: name
                        })),
              className:  'agg-' + cn,
              editable:   false
            });
          };

          timedata = _this.addLoading(data, timedata, [
            _this.wrapper('c') + name
          ]);
        });

        return timedata;
      },

      /**
       * Wish slots
       */
      wishes: function (data, timedata, name)
      {
        var _this = this;

        angular.forEach(data.aggs.wishes, function (wish, index)
        {
          if ( wish.count >= 7 )
          {
            var cn = 'wishes-more';
          }
          else if ( wish.count == 0 )
          {
            var cn = 'wishes-even';
          }
          else
          {
            var cn = 'wishes-' + wish.count;
          };

          timedata.push({
            start:  Math.round(wish.start * 1000),
            end:    Math.round(wish.end * 1000),
            group:  _this.wrapper('c') + name + ' (Wishes)',
            content: '<span class="badge badge-inverse">' + wish.count + '</span>' + 
                      _this.secret(angular.toJson({
                        type: 'wish',
                        wish: wish.count,
                        group: name,
                        groupId: data.aggs.id
                      })),
            className:  cn,
            editable:   false
          });

          timedata = _this.addLoading(data, timedata, [
            _this.wrapper('c') + name + ' (Wishes)'
          ]);
        });

        return timedata;
      },

      /**
       * Process members
       */
      members: function (data, timedata, config, privilage)
      {
        var _this   = this,
            members = this.get.members();          

        angular.forEach(data.members, function (member, index)
        {
          var link = (privilage == 1) ? 
                        _this.wrapper('d') + 
                        '<a href="#/profile/' + 
                        member.id + 
                        '#timeline">' + 
                        members[member.id] + 
                        '</a>' :
                        _this.wrapper('d') + 
                        members[member.id];

          angular.forEach(member.data, function (slot, i)
          {
            angular.forEach(config.legenda, function (value, legenda)
            {
              if (slot.text == legenda && value)
              {
                timedata.push({
                  start:  Math.round(slot.start * 1000),
                  end:    Math.round(slot.end * 1000),
                  group:  link,
                  content: _this.secret(angular.toJson({ 
                    type: 'member',
                    id:   slot.id, 
                    mid:  member.id,
                    recursive: slot.recursive, 
                    state: slot.text 
                    })),
                  className:  config.states[slot.text].className,
                  editable:   false
                });
              };
            });
          });

          timedata.push({
            start:    0,
            end:      0,
            group:    link,
            content:  null,
            className:null,
            editable: false
          });

          timedata = _this.addLoading(data, timedata, [ link ]);

          /**
           * TODO
           * Good place to host this here?
           */
          angular.forEach(member.stats, function (stat, index)
          {
            var state = stat.state.split('.');
            state.reverse();
            stat.state = 'bar-' + state[0];
          });
        });

        return timedata;
      },

      /**
       * Produce pie charts
       */
      pies: function (data)
      {
        document.getElementById("groupPie").innerHTML = '';

        var ratios    = [],
            colorMap  = {
              more: '#415e6b',
              even: '#ba6a24',
              less: '#a0a0a0'
            },
            colors    = [],
            xratios   = [];

        angular.forEach(data.aggs.ratios, function (ratio, index)
        {
          if (ratio != 0)
          {
            ratios.push({
              ratio: ratio, 
              color: colorMap[index]
            });
          };
        });

        ratios = ratios.sort(function (a, b) { return b.ratio - a.ratio });

        angular.forEach(ratios, function (ratio, index)
        {
          colors.push(ratio.color);
          xratios.push(ratio.ratio);
        });

        var r   = Raphael("groupPie"),
            pie = r.piechart(120, 120, 100, xratios, { colors: colors });
      },
      
      /**
       * Timeline data processing
       */
      process: function (data, config, divisions, privilage)
      {
        var _this     = this,
            timedata  = [];

        if (data.user) timedata = _this.user(data, timedata, config);

        if (data.aggs)
        {
          var name = _this.namer(data, divisions, privilage);

          if (config.bar) 
          {
            timedata = _this.bars(data, timedata, config, name);
          }
          else
          {
            timedata = _this.aggs(data, timedata, config, name);
          };
        };

        if (config.wishes) timedata = _this.wishes(data, timedata, name);

        if (data.members) timedata = _this.members(data, timedata, config, privilage);

        if (data.aggs && data.aggs.ratios) _this.pies(data);

        return timedata;
      }

    }
  }
])


/**
 * Planboard stats processors
 */
.factory('Stats', 
[
  '$rootScope', 'Storage', 
  function ($rootScope, Storage) 
  {
    return {
      /**
       * Group agg stats
       */
      aggs: function (data)
      {
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
            total = data.length;

        angular.forEach(data, function (slot, index)
        {
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

        return {
          ratios: {
            less: Math.round((stats.less / total) * 100),
            even: Math.round((stats.even / total) * 100),
            more: Math.round((stats.more / total) * 100)
          },
          durations: durations
        }
      },

      /**
       * Group pie stats
       */
      pies: function (data)
      {
        var stats = {
              less: 0,
              even: 0,
              more: 0        
            },
            total = data.length;

        angular.forEach(data, function (slot, index)
        {
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

        return {
          less: Math.round((stats.less / total) * 100),
          even: Math.round((stats.even / total) * 100),
          more: Math.round((stats.more / total) * 100)
        };
      },

      /**
       * Member stats
       */
      member: function (data)
      {
        var stats = {},
            total = 0;

        angular.forEach(data, function (slot, index)
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

        angular.forEach(stats, function (stat, index)
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
        
        return ratios;
      }

    }
  }
]);
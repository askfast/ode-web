'use strict';

/**
 * Services
 *
 * User resources
 * Slots resources
 * Messages resources
 * Groups resources
 * Profile resources
 * Settings resources
 *
 * $eventBus service
 * timerService service
 *
 * Session service
 *
 * localStorage service
 * md5 service
 */



/**
 * TODO
 * Clear list of dependencies
 * 
 * TimeSlots Service
 */
WebPaige.
factory('User', function ($resource, $config, $q, $route, $timeout, Storage, $rootScope) 
{
  var self = this;


  var User = $resource();


  var Login = $resource(
    $config.host + '/login',
    {
    },
    {
      process: {
        method: 'GET',
        params: {uuid:'', pass:''}
      }
    }
  );


  User.prototype.login = function (uuid, pass) 
  {    
    var deferred = $q.defer();
    Login.process({uuid: uuid, pass: pass}, function (result) 
    {
      if (angular.equals(result, [])) 
      {
        deferred.reject("Something went wrong with login!");
      }
      else 
      {
        deferred.resolve(result);
      }
    });
    return deferred.promise;
  };


  var Logout = $resource(
    $config.host + '/logout',
    {
    },
    {
      process: {
        method: 'GET',
        params: {}
      }
    }
  );


  User.prototype.logout = function () 
  {    
    var deferred = $q.defer();
    Logout.process(null, function (result) 
    {
      // if (angular.equals(result, [])) 
      // {
      //   deferred.reject("Something went wrong with logout!");
      // }
      // else 
      // {

        deferred.resolve(result);
      // }
    });
    return deferred.promise;
  };


  var Resources = $resource(
    $config.host + '/resources',
    {
    },
    {
      get: {
        method: 'GET',
        params: {}
      }
    }
  );


  User.prototype.resources = function () 
  {    
    var deferred = $q.defer();
    Resources.get(null, function (result) 
    {
      if (angular.equals(result, [])) 
      {
        deferred.reject("User has no resources!");
      }
      else 
      {
        deferred.resolve(result);
      }
    });
    return deferred.promise;
  };


  return new User;

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





WebPaige.
factory('Messages', function ($resource, $config, $q, $route, $timeout, Storage, $rootScope) 
{

  var Messages = $resource(
    $config.host + '/question',
    {
    },
    {
      query: {
        method: 'GET',
        params: { 0: 'dm' },
        isArray: true
      },
      get: {
        method: 'GET',
        params: {groupId:''}
      },
      save: {
        method: 'POST',
        params: {}
      }
    }
  );
  

  Messages.prototype.query = function () 
  {    

    var deferred = $q.defer();
        //,localProfile = Storage.get('messages');

    // if (localProfile)
    // {
    //   deferred.resolve(angular.fromJson(localSlots));
    //   return deferred.promise;
    // }
    // else
    // {
      var successCb = function (result) 
      {

        // if (angular.equals(result, [])) 
        // {
        //   deferred.reject("There is no groups!");
        // }
        // else 
        // {
        //   $rootScope.notify( { message: 'Groups downloaded from back-end.' } );

          Storage.add('messages', angular.toJson(result));
        //   $rootScope.notify( { message: 'Groups data added to localStorage.' } );

          deferred.resolve(result);
        // }
      };

      Messages.query(successCb);

      return deferred.promise;
    // }
  };


  Messages.prototype.local = function()
  {
    return angular.fromJson(Storage.get('messages'));
  };


  Messages.prototype.unread = function()
  {
    var messages = Messages.prototype.local(),
        count = 0;
    angular.forEach(messages, function(message, index)
    {
      //console.log('sender ->', message.requester.split('personalagent/')[1].split('/')[0], message.state);
      if (message.state == 'NEW' &&
          message.requester.split('personalagent/')[1].split('/')[0] == 'apptestknrm') count++;
    });
    return count;
  };


  Messages.prototype.save = function (group) 
  {
    // var localResources = angular.fromJson(Storage.get('resources'));

    // localResources['name'] = resources.name;
    // localResources['EmailAddress'] = resources.EmailAddress;
    // localResources['PhoneAddress'] = resources.PhoneAddress;
    // localResources['PostAddress'] = resources.PostAddress;
    // localResources['PostZip'] = resources.PostZip;
    // localResources['PostCity'] = resources.PostCity;

    // Storage.add('slots', angular.toJson(localResources));

    // $rootScope.notify( { message: 'Profile saved in localStorage.' } );

    // Profile.save(null, resources, function()
    // {
    //   $rootScope.notify( { message: 'Profile saved in back-end.' } );
    // });
  };



  return new Messages;
});







/**
 * ************************************************************************************************
 * ************************************************************************************************
 * ************************************************************************************************
 * ************************************************************************************************
 */






WebPaige.
factory('Group', function ($resource, $config, $q, $route, $timeout, Storage, $rootScope) 
{


  var Group = $resource(
    $config.host + '/network/:groupId',
    {
    },
    {
      query: {
        method: 'GET',
        params: {},
        isArray: true
      },
      get: {
        method: 'GET',
        params: {groupId:''}
      },
      save: {
        method: 'POST',
        params: {}
      }
    }
  );


  var Members = $resource(
    $config.host + '/network/:groupId/members',
    {
    },
    {
      query: {
        method: 'GET',
        params: {groupId:''},
        isArray: true
      },
      get: {
        method: 'GET',
        params: {groupId:''}
      },
      save: {
        method: 'POST',
        params: {}
      }
    }
  );
  

  Group.prototype.query = function () 
  {    

    var deferred = $q.defer(), 
        localProfile = Storage.get('groups');

    // if (localProfile)
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
          deferred.reject("There is no groups!");
        }
        else 
        {
          $rootScope.notify( { message: 'Groups downloaded from back-end.' } );

          Storage.add('resources', angular.toJson(result));
          $rootScope.notify( { message: 'Groups data added to localStorage.' } );

          deferred.resolve(result);
        }
      };

      Group.query(successCb);

      return deferred.promise;
    // }
  };
  

  Group.prototype.get = function (groupId) 
  {    

    var deferred = $q.defer(), 
        localProfile = Storage.get('resources');

    // if (localProfile)
    // {
    //   deferred.resolve(angular.fromJson(localSlots));
    //   return deferred.promise;
    // }
    // else
    // {
      var successCb = function (result) 
      {

        // if (angular.equals(result, [])) 
        // {
        //   deferred.reject("There is no record!");
        // }
        // else 
        // {
          $rootScope.notify( { message: 'Profile data downloaded from back-end.' } );

          Storage.add('resources', angular.toJson(result));
          $rootScope.notify( { message: 'Profile data added to localStorage.' } );

          deferred.resolve({
            id: groupId,
            data: result
          });
        // }
      };

      Members.query({groupId: groupId}, successCb);

      return deferred.promise;
    // }
  };


  Group.prototype.local = function()
  {
    return angular.fromJson(Storage.get('groups'));
  };


  Group.prototype.save = function (group) 
  {
    // var localResources = angular.fromJson(Storage.get('resources'));

    // localResources['name'] = resources.name;
    // localResources['EmailAddress'] = resources.EmailAddress;
    // localResources['PhoneAddress'] = resources.PhoneAddress;
    // localResources['PostAddress'] = resources.PostAddress;
    // localResources['PostZip'] = resources.PostZip;
    // localResources['PostCity'] = resources.PostCity;

    // Storage.add('slots', angular.toJson(localResources));

    // $rootScope.notify( { message: 'Profile saved in localStorage.' } );

    // Profile.save(null, resources, function()
    // {
    //   $rootScope.notify( { message: 'Profile saved in back-end.' } );
    // });
  };


  return new Group;
});





/**
 * ************************************************************************************************
 * ************************************************************************************************
 * ************************************************************************************************
 * ************************************************************************************************
 */





WebPaige.
factory('Profile', function ($resource, $config, $q, $route, $timeout, Storage, $rootScope) 
{

  var Profile = $resource(
    $config.host + '/node/:user/resource',
    {
      user: $route.current.params.userId
    },
    {
      get: {
        method: 'GET',
        params: {}
      },
      save: {
        method: 'PUT',
        params: {}
      }
    }
  );
  

  Profile.prototype.get = function () 
  {    
    var deferred = $q.defer(), 
        localProfile = Storage.get('resources');

    // if (localProfile)
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
          deferred.reject("There is no record!");
        }
        else 
        {
          $rootScope.notify( { message: 'Profile data downloaded from back-end.' } );

          Storage.add('resources', angular.toJson(result));
          $rootScope.notify( { message: 'Profile data added to localStorage.' } );

          deferred.resolve(result);
        }
      };

      Profile.get(successCb);

      return deferred.promise;
    // }
  };


  Profile.prototype.local = function()
  {
    return angular.fromJson(Storage.get('resources'));
  };


  Profile.prototype.save = function (resources) 
  {    

    var localResources = angular.fromJson(Storage.get('resources'));

    localResources['name'] = resources.name;
    localResources['EmailAddress'] = resources.EmailAddress;
    localResources['PhoneAddress'] = resources.PhoneAddress;
    localResources['PostAddress'] = resources.PostAddress;
    localResources['PostZip'] = resources.PostZip;
    localResources['PostCity'] = resources.PostCity;

    Storage.add('slots', angular.toJson(localResources));

    $rootScope.notify( { message: 'Profile saved in localStorage.' } );

    Profile.save(null, resources, function()
    {
      $rootScope.notify( { message: 'Profile saved in back-end.' } );
    });
  };



  return new Profile;
});





/**
 * ************************************************************************************************
 * ************************************************************************************************
 * ************************************************************************************************
 * ************************************************************************************************
 */





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
      return ($rootScope.session) ? true : false;
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
      console.log('http headers ->', $http.defaults.headers.common);

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

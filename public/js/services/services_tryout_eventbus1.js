'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('WebPaige.services', []).
  value('version', '0.1');




/**
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

  }]);





// angular.module('timerServices', []).
//   factory('timerResource', function () 
//   {
//     var timerResource = function()
//     {
//       var counter = 0;    
//     }

//     timerServices.prototype.start = function () 
//     {
//       console.log('started!');
//       // var onTimeout = function()
//       // {
//       //   this.counter++;
//       //   mytimeout = $timeout(this.onTimeout, 1000);
//       //   //$rootScope.counting = this.counter;
//       // }
//       // var mytimeout = $timeout(this.onTimeout, 1000);  
//     };

//     return new timeSlotResource;

//     // var stop = function()
//     // {
//     //   $timeout.cancel(mytimeout);
//     // }

//   });

// angular.module('WebPaige.services', [], 
//   function($provide)
//   {
//     $provide.factory('Timer', 
//       ['$rootScope', '$timeout',
//         function(rootScope, timeout)
//         {
//           var counter = 0;
//           return {
//             start: function(action, interval)
//             {
//               var onTimeout = function()
//               {
//                 counter++;
//                 mytimeout = timeout(this.onTimeout, 1000);
//                 rootScope.counting = counter;
//               }
//               var mytimeout = timeout(this.onTimeout, 1000);   
//             },
//             test: function(msg)
//             {
//               console.log('----> ', msg)
//             }
//           }
//         }
//       ]
//     )
//   }
// )






// angular.module('xmpl.service', []).
//   value('greeter', {
//     salutation: 'Hello',
//     localize: function(localization) {
//       this.salutation = localization.salutation;
//     },
//     greet: function(name) {
//       return this.salutation + ' ' + name + '!';
//     }
//   }).
//   value('user', {
//     load: function(name) {
//       this.name = name;
//     }
//   });




/**
 * App configuration
 */
angular.module('WebPaige.settings', []).
  value('$config', {
    host: 'http://3rc2.ask-services.appspot.com/ns_knrm',
    date: {
      stringFormat: 'dd-M-yyyy'
    },
    time: {
      stringFormat: 'HH:mm tt'
    },
    timeline: {
      period: {
        bstart: (parseInt((new Date()).getTime() / 1000) - 86400 * 7 * 1),
        bend:   (parseInt((new Date()).getTime() / 1000) + 86400 * 7 * 1),
        start:  Date.today().add({ days: -5 }),
        end:    Date.today().add({ days: 5 })
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
        //groupsChangeable: true,
        //start: "2013-01-01T00:00:00.000Z",
        //end: "2013-12-31T00:00:00.000Z",
        //min: "2013-01-01T00:00:00.000Z",
        //max: "2013-12-31T00:00:00.000Z",
        intervalMin: 1000 * 60 * 60 * 1,
        intervalMax: 1000 * 60 * 60 * 24 * 7 * 2
      }
    }
  });

/*
angular.module('WebPaige.settings', []).
  value('$config', {
    timeline: {
      settings: {
        ranges: {
          period: $config.timeline.period,
          reset: $config.timeline.period
        }
      }
    }
  });
*/

/*
config.timeline.settings = {
  ranges: {
    period: config.timeline.period,
    reset: config.timeline.period
  }
}
*/



/**
 * TimeSlots Service
 */
angular.module('timeSlotServices', ['ngResource']).
  factory('timeSlotResource', function ($resource, $config) 
  {
    var timeSlotResource = $resource(
      $config.host + '/askatars/apptestknrm/slots',
      {
      },
      {
        'getAll': {
          'method': 'GET',
          'params': {start:"", end:""},
          'isArray': true
        }
      }
    );
    timeSlotResource.prototype.getSlots = function (params, successCb, failCb) 
    {
      return timeSlotResource.getAll(params, successCb, failCb);
    };
    return new timeSlotResource;
  });


/**
 * TimeSlots Service
 */
//angular.module('timerServices', [])


























/**
 * @workInProgress
 * @name $commandMap
 * @requres $eventBus
 *
 * @description
 * map events to command objects using the event bus
 *   
 */
var $commandMap = angular.module('commandMapModule', []);

$commandMap.service('$commandMap', [
  '$rootScope', 
  function($rootScope)
  {
    var commands = {}, root = this;
    var map = {
        mapEvent:function(type, command, onceOnly){
            if(!(commands[type] instanceof Array)){
                commands[type] = [];
            }
            angular.forEach(commands[type],function(cmndDef){
               if(cmndDef.command === command ){
                   if(onceOnly) throw "You must unmap the existing event->commmand combo before adding it again as 'onceOnly'";
                   if(cmndDef.once) throw "Conflict with an existing 'onceOnly' command";
                   // aleady mapped, consider job done!
                   return;
               }
            });
            commands[type].push({command:command, once:onceOnly});
        },
        unmapEvent:function(type,command){
            var cmnds = commands[type];
            if( !cmnds || cmnds.length < 1 ) return;
            var newCmnds = [];
            for (var i = 0; i < cmnds.length; i++) {
                if(command !== cmnds[i].command){
                    newCmnds.push(cmnds[i]);
                }
            }
            commands[type] = newCmnds;
        },
        unmapAllEvents:function(){
            commands = {};
        }
    }
    
    var busListener = function( type ){
        var cmnds = commands[type];
        
        if(!cmnds || cmnds.length < 1){
            return;
        } 
        var args = Array.prototype.slice.call(arguments, 1);
        angular.forEach(cmnds, function(cmndDef) {
            // create command as a scope to allow for DI
            // TODO: Find out if this has Memory implications.
            var cmnd = root.$new( cmndDef.command );
            if( typeof cmnd["execute"] != "function" ) throw "Command '"+cmnd+"' must have an execute method!";
            if (!args.length) cmnd.execute();
            else if (!args.length == 1) cmnd.execute(args[0]);
            else cmnd.execute.apply(null, args);
            
            if(cmndDef.once){
                map.unmapEvent(type, cmndDef.command);
            }
        });
    }
    
    $eventBus.on("*", busListener);
    return map;

  }]);





/**
 * @workInProgress
 * @name eventBus
 * @requres scopeWatcher
 *
 * @description
 * Dispatch and respond to events across application tiers.
 *
 *   
 */
var $eventBus = angular.module('eventBusModule', []);

$eventBus.service('$eventBus', [
  'scopeWatcher', 
  function(scopeWatcher)
  {
    var listeners = {}, 
        allRemovedEvent = "eventBusAllListenersRemoved";

    var mainBus = function(scope) 
    {
        return new ChildBus(mainBus, scope);
    };

    mainBus.emit = function(type) 
    {
        var args = Array.prototype.slice.call(arguments, 1);
        
        // optimize for calls with 1 or 0 arguments - "apply" is expensive
        angular.forEach(listeners[type], function(listener) 
        {
            if (!args.length) listener();
            else if (!args.length == 1) listener(args[0]);
            else listener.apply(null, args);
        });

        // call listeners that subscribed to all events using wildcard '*' 
        if(type == "*") return;
        
        args = Array.prototype.slice.call(arguments);
        
        angular.forEach(listeners["*"], function(listener) 
        {
            if (args.length == 1) listener( args[0] );
            else if (!args.length == 2) listener(args[0], args[1]);
            else listener.apply(null, args);
        });
    };

    mainBus.on = function(type, listener) 
    {
        if(!(listeners[type] instanceof Array))
        {
            listeners[type] = [];
        }
        listeners[type].push(listener);
    };
    
    // TODO: Figure out how to remove a listener which was added using child bus
        // but was removed using the static remove method, definate issues there.
        // Maybe just prevent it from being done
    mainBus.remove = function(type, listener) 
    {
        var lsnrs = listeners[type];
        var ind = lsnrs instanceof Array ? lsnrs.indexOf(listener) : -1;
        if(ind > -1)
        {
            listeners[type].splice(ind,1);
        }
    };

    mainBus.removeAll = function(type) 
    {
        if (typeof type == 'string') 
        {
            listeners[type] = [];
        }
        else if(type instanceof Object) 
        {
            //// let's do bit more magic to make it linear rather than quadratic...
            // the order of localListeners is the same as in listeners
            // see http://jsperf.com/remove-all-items-from-array
            angular.forEach(type, function( lsnrs, evttyp )
            {
                if( !listeners[evttyp] instanceof Array ) return;

                var rslt = [],
                lsnrsMain = listeners[evttyp],
                i = 0, j = 0;

                while (i < lsnrs.length) 
                {
                    while (lsnrs[i] !== lsnrsMain[j]) 
                    {
                        rslt.push(lsnrsMain[j++]);
                    }
                    i++;
                    j++;
                }
                while (j < lsnrsMain.length) 
                {
                    rslt.push(lsnrsMain[j++]);
                }
                
                listeners[evttyp] = rslt;
            })
        }
        else
        {
            listeners = {};
            // this will instruct all child bus objects to dump their ref to their listeners
            mainBus.emit(allRemovedEvent);
        } 
    };

    return mainBus;

    function ChildBus(main, scope) 
    {
        var localListeners = {}, watcher, child = this;
        
        this.on = function(type, listener) 
        {
            main.on(type, listener);
            
            if(!(localListeners[type] instanceof Array))
            {
                localListeners[type] = [];
            }
            localListeners[type].push(listener);
        };

        this.emit = main.emit;

        this.remove = function(type, listener) 
        {
            main.remove(type, listener);
            
            var lsnrs = localListeners[type];
            var ind = lsnrs instanceof Array ? lsnrs.indexOf(listener) : -1;

            if(ind > -1)
            {
                localListeners[type].splice(ind,1);
            }
        };

        this.removeAll = function(type) 
        {
            main.removeAll(localListeners);
            
            localListeners = {};
        };
        
        function tidyUp()
        {
            localListeners = {};
        }
        
        function dispose()
        {
            child.removeAll();
            main.remove(allRemovedEvent, tidyUp);
            tidyUp()
        }
        
        main.on(allRemovedEvent, tidyUp);

        if (scope)
        {
            watcher = scopeWatcher(scope);
            watcher.onRemoved( this.removeAll );
        }
    };

  }]);






/**
 * @workInProgress
 * @name scopeWatcer
 *
 * @property {Object} scope to watch.
 *
 * @description
 * Notifies you when a scope is removed. It does this by
 * watching eval on the scope and on the root scope. If the 
 * root scope evaluates and the watched scope doesn't it is deemed to be removed.
 *
 *   
 */
var scopeWatcher = angular.module('scopeWatcherModule', []);

scopeWatcher.service('$eventBus', [
  '$rootScope', 
  function(rootScope)
  {
    
   var root = this;

   var rootCallbacks = [];
   
    function rootEval(){
       for(var i = 0; i<rootCallbacks.length;i++){
           rootCallbacks[i]();
       }
   }

   function addRootCallback( callback ){
       var ind = rootCallbacks.indexOf(callback);

       if(ind == -1){
           rootCallbacks.push(callback);
       }
   }

   function removeRootCallback( callback ){
       var ind = rootCallbacks.indexOf(callback);

       if(ind != -1){
           rootCallbacks.splice(ind,1);
       }
   }
   
   console.log('---> root', root);

   root.$onEval(rootEval);

   return function(scope){
       var scopeEval = false;
       var isActive = false;
       var added = [];
       var removed = [];

       function onRootEval(){
           if(scopeEval){
               scopeEval = false;
           } else if( isActive ){
               isActive = false;
               // dispatch removed
               for( var i=0;i<removed.length;i++ ){
                   removed[i]();
               }
               removeRootCallback(onRootEval);
           }
       }

       function onScopeEval(){
           scopeEval = true;
           if(!isActive){
               isActive = true;
               // dispatch added
               for( var i=0;i<added.length;i++ ){
                   added[i]();
               }
               addRootCallback(onRootEval);
           }
       }

       scope.$onEval(onScopeEval);

       return {
           onAdded:function(cb){
               var ind = added.indexOf(cb);
               if(ind == -1){
                   added.push(cb);
               }
           },
           onRemoved:function(cb){
               var ind = removed.indexOf(cb);
               if(ind == -1){
                   removed.push(cb);
               }
           }
       }
   }

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


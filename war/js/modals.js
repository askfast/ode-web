'use strict';


angular.module('WebPaige.Modals', ['ngResource'])

/**
 * User
 */
.factory('User', ['$resource', '$config', '$q', '$location', 'Storage', '$rootScope', 
function ($resource, $config, $q, $location, Storage, $rootScope) 
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


  var Reset = $resource(
    $config.host + '/passwordReset',
    {
    },
    {
      password: {
        method: 'GET',
        params: {uuid: '', path:''}
      }
    }
  );

  // var changePassword = $resource($config.host+'/passwordReset', 
  //   {uuid: uuid,
  //    pass: newpass,
  //    key: key});
  
  
  /**
   * TODO
   * RE-FACTORY
   * 
   * User login
   */
  User.prototype.password = function (uuid)
  {
    var deferred = $q.defer();

    Reset.password(
      {
        uuid: uuid.toLowerCase(),
        path: $location.absUrl()
      }, 
      function (result)
      {
        if (angular.equals(result, []))
        {
          deferred.resolve("ok");
        }
        else
        {
          deferred.resolve(result);
        };
      },
      function (error)
      {
        deferred.resolve(error);
      }
    );

    return deferred.promise;
  };


  /**
   * User login
   */
  User.prototype.login = function (uuid, pass) 
  {    
    var deferred = $q.defer();

    Login.process({uuid: uuid, pass: pass}, 
      function (result) 
      {
        if (angular.equals(result, [])) 
        {
          deferred.reject("Something went wrong with login!");
        }
        else 
        {
          deferred.resolve(result);
        };
      },
      function (error)
      {
        deferred.resolve(error);
      }
    );

    return deferred.promise;
  };
  

  /**
   * RE-FACTORY
   * change user password
   */
  User.prototype.changePass = function (uuid, newpass, key)
  {
    var deferred = $q.defer();
    
    /**
     * RE-FACTORY
     */
    changePassword.get(
      function (result)
      {
        deferred.resolve(result);
      },
      function (error)
      {
        deferred.resolve(error);
      }
    );
    
    return deferred.promise;
  }


  /**
   * User logout
   */
  User.prototype.logout = function () 
  {    
    var deferred = $q.defer();

    Logout.process(null, 
      function (result) 
      {
        deferred.resolve(result);
      },
      function (error)
      {
        deferred.resolve({error: error});
      }
    );

    return deferred.promise;
  };


  /**
   * Get user resources
   */
  User.prototype.resources = function () 
  {    
    var deferred = $q.defer();

    Resources.get(null, 
      function (result) 
      {
        if (angular.equals(result, [])) 
        {
          deferred.reject("User has no resources!");
        }
        else 
        {
          Storage.add('resources', angular.toJson(result));

          deferred.resolve(result);
        }
      },
      function (error)
      {
        deferred.resolve({error: error});
      }
    );

    return deferred.promise;
  };

  return new User;
}])



/**
 * Dashboard modal
 */
.factory('Dashboard', ['$rootScope', '$resource', '$config', '$q', 'Storage', 'Slots', 'Dater', 'Announcer', 
function ($rootScope, $resource, $config, $q, Storage, Slots, Dater, Announcer) 
{
  var Dashboard = $resource(
    'http://knrm.myask.me/rpc/client/p2000.php',
    {
    },
    {
      p2000: {
        method: 'GET',
        params: {},
        isArray: true
      }
    }
  );


  /**
   * Get group aggs for pie charts
   */
  Dashboard.prototype.pies = function () 
  {
    var deferred  = $q.defer(),
        groups    = angular.fromJson(Storage.get('groups')),
        settings  = Storage.local.settings().app.widgets.groups,
        list      = [],
        now       = new Date.now().getTime(),
        calls     = [];

    if (settings.length == 0) console.warn('no settings');

    angular.forEach(groups, function(group, index)
    {
      if (settings[group.uuid]) list.push({ id: group.uuid, name: group.name});
    });

    angular.forEach(list, function (group, index)
    {
      calls.push(Slots.pie({
        id:     group.id,
        name:   group.name
      }));
    });

    $q.all(calls)
    .then(function (results)
    {
      $rootScope.statusBar.off();

      deferred.resolve(results);
    });

    return deferred.promise;
  };


  /**
   * Get p2000 announcements
   */
  Dashboard.prototype.p2000 = function () 
  {
    var deferred = $q.defer();

    // Dashboard.p2000(null, 
    //    function (result) 
    //    {
    //      deferred.resolve(result);

    //      console.log('result ->', result);
    //    },
    //    function (error)
    //    {
    //      deferred.resolve({error: error});
    //    }
    //  );

    $.ajax({
      url: $config.profile.p2000.url,
      dataType: 'jsonp',
      success: function (results)
      {
        deferred.resolve( Announcer.process(results) );
      },
      error: function ()
      {
        deferred.resolve({error: error});
      }
    });

    return deferred.promise;
  };


  return new Dashboard;
}])



/**
 * Slots
 */
.factory('Slots', ['$rootScope', '$config', '$resource', '$q', 'Storage', 'Dater', 'Sloter', 'Stats',
function ($rootScope, $config, $resource, $q, Storage, Dater, Sloter, Stats) 
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
      remove: {
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
    var deferred  = $q.defer(),
        params    = {
          id:     options.id,
          start:  options.start,
          end:    options.end
        };

    Wishes.query(params, 
      function (result) 
      {
        deferred.resolve(result);
      },
      function (error)
      {
        deferred.resolve({error: error});
      }
    );

    return deferred.promise;
  };


  /**
   * Set group wish
   */
  Slots.prototype.setWish = function (options) 
  {
    var deferred = $q.defer(),
        params = {
          start:      options.start,
          end:        options.end,
          wish:       options.wish,
          recurring:  options.recursive
        };

    Wishes.save({id: options.id}, params, 
      function (result) 
      {
        deferred.resolve(result);
      },
      function (error)
      {
        deferred.resolve({error: error});
      }
    );

    return deferred.promise;
  };


  /**
   * Get group aggs
   */
  Slots.prototype.aggs = function (options) 
  {
    var deferred = $q.defer(),
        params = {
          id:     options.id,
          start:  options.start,
          end:    options.end
        };

    if (options.division != undefined) params.stateGroup = options.division;

    Aggs.query(params, 
      function (result) 
      {
        var stats = Stats.aggs(result);

        Slots.prototype.wishes(params)
        .then(function (wishes)
        {
          deferred.resolve({
            id:       options.id,
            division: options.division,
            wishes:   wishes,
            data:     result,
            ratios:   stats.ratios,
            durations: stats.durations
          });
        });
      },
      function (error)
      {
        deferred.resolve({error: error});
      }
    );

    return deferred.promise;
  };


  /**
   * Get group aggs for pie charts
   */
  Slots.prototype.pie = function (options) 
  {
    var deferred  = $q.defer(),
        now       = Math.floor(Date.now().getTime() / 1000),
        periods   = Dater.getPeriods(),
        current   = Dater.current.week(),
        weeks      = {
          current:  {
            period: periods.weeks[current],
            data:   [],
            shortages: []
          },
          next: {
            period: periods.weeks[current + 1],
            data:   [],
            shortages: []
          }
        },
        slicer    = weeks.current.period.last.timeStamp;

    Aggs.query({
      id:     options.id,
      start:  weeks.current.period.first.timeStamp / 1000,
      end:    weeks.next.period.last.timeStamp / 1000
    }, 
      function (results)
      {
        var state;

        // Check whether it is only one
        if (results.length > 1)
        {
          angular.forEach(results, function (slot, index)
          {
            // Fish out the current
            if (now >= slot.start && now <= slot.end) state = slot;

            // Slice from end of first week
            if (slicer <= slot.start * 1000)
            {
              weeks.next.data.push(slot);
            }
            else if (slicer >= slot.start * 1000)
            {
              weeks.current.data.push(slot)
            };
          });

          // slice extra timestamp from the last of current week dataset and add that to week next
          var last        = weeks.current.data[weeks.current.data.length-1],
              next        = weeks.next.data[0],
              difference  = (last.end * 1000 - slicer) / 1000,
              currents    = [];

          // if start of current of is before the start reset it to start
          weeks.current.data[0].start = weeks.current.period.first.timeStamp / 1000;

          // if there is a leak to next week adjust the last one of current week and add new slot to next week with same values
          if (difference > 0)
          {
            last.end = slicer / 1000;

            weeks.next.data.unshift({
              diff: last.diff,
              start: slicer / 1000,
              end: last.end,
              wish: last.wish
            });
          };

          // shortages and back-end gives more than asked sometimes, with returning values out of the range which being asked !
          angular.forEach(weeks.current.data, function (slot, index)
          {
            if (slot.end - slot.start > 0) currents.push(slot);

            // add to shortages
            if (slot.diff < 0) weeks.current.shortages.push(slot);
          });

          // reset to start of current weekly begin to week begin
          currents[0].start = weeks.current.period.first.timeStamp / 1000;

          // add to shortages
          angular.forEach(weeks.next.data, function (slot, index)
          {
            if (slot.diff < 0) weeks.next.shortages.push(slot);
          });

          deferred.resolve({
            id:       options.id,
            name:     options.name,
            weeks:    {
              current: {
                data:   currents,
                state:  state,
                shortages: weeks.current.shortages,
                start: {
                  date:       new Date(weeks.current.period.first.timeStamp).toString($config.formats.date),
                  timeStamp:  weeks.current.period.first.timeStamp
                },
                end: {
                  date:       new Date(weeks.current.period.last.timeStamp).toString($config.formats.date),
                  timeStamp:  weeks.current.period.last.timeStamp
                },
                ratios: Stats.pies(currents)
              },
              next: {
                data:   weeks.next.data,
                shortages: weeks.next.shortages,
                start: {
                  date:       new Date(weeks.next.period.first.timeStamp).toString($config.formats.date),
                  timeStamp:  weeks.next.period.first.timeStamp
                },
                end: {
                  date:       new Date(weeks.next.period.last.timeStamp).toString($config.formats.date),
                  timeStamp:  weeks.next.period.last.timeStamp
                },
                ratios: Stats.pies(weeks.next.data)
              }
            }
          }); 
        }
        else
        {
          if (results[0].diff == null) results[0].diff = 0;
          if (results[0].wish == null) results[0].wish = 0;

          var currentWeek = [{
                start:  weeks.current.period.first.timeStamp / 1000,
                end:    weeks.current.period.last.timeStamp / 1000,
                wish:   results[0].wish,
                diff:   results[0].diff
              }],
              nextWeek = [{
                start:  weeks.next.period.first.timeStamp / 1000,
                end:    weeks.next.period.last.timeStamp / 1000,
                wish:   results[0].wish,
                diff:   results[0].diff
              }];
          
          if (currentWeek[0].diff < 0) weeks.current.shortages.push(currentWeek[0]);
          if (nextWeek[0].diff < 0) weeks.next.shortages.push(nextWeek[0]);

          deferred.resolve({
            id:       options.id,
            name:     options.name,
            weeks:    {
              current: {
                data: currentWeek,
                state: currentWeek,
                shortages: weeks.current.shortages,
                start: {
                  date:       new Date(weeks.current.period.first.timeStamp).toString($config.formats.date),
                  timeStamp:  weeks.current.period.first.timeStamp
                },
                end: {
                  date:       new Date(weeks.current.period.last.timeStamp).toString($config.formats.date),
                  timeStamp:  weeks.current.period.last.timeStamp
                },
                ratios: Stats.pies(currentWeek)
              },
              next: {
                data: nextWeek,
                shortages: weeks.next.shortages,
                start: {
                  date:       new Date(weeks.next.period.first.timeStamp).toString($config.formats.date),
                  timeStamp:  weeks.next.period.first.timeStamp
                },
                end: {
                  date:       new Date(weeks.next.period.last.timeStamp).toString($config.formats.date),
                  timeStamp:  weeks.next.period.last.timeStamp
                },
                ratios: Stats.pies(nextWeek)
              }
            }
          });
        };          
      },
      function (error)
      {
        deferred.resolve({error: error});
      }
    );

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
    var deferred  = $q.defer(),
        periods   = Dater.getPeriods(),
        params    = {
          user:   angular.fromJson(Storage.get('resources')).uuid, // user hardcoded!!
          start:  options.stamps.start / 1000,
          end:    options.stamps.end / 1000
        },
        data      = {};
    
    Slots.query(params, 
      function (user) 
      {
        if (options.layouts.group)
        {
          var groupParams = {
              id:     options.groupId,
              start:  params.start,
              end:    params.end,
              month:  options.month
          };

          if (options.division != 'all') groupParams.division = options.division;

          Slots.prototype.aggs(groupParams)
          .then(function (aggs)
          {
            if (options.layouts.members)
            {
              var members = angular.fromJson(Storage.get(options.groupId)),
                  calls   = [];

              angular.forEach(members, function(member, index)
              {
                calls.push(Slots.prototype.user({
                  user: member.uuid,
                  start:params.start,
                  end:  params.end,
                  type: 'both'
                }));
              });

              $q.all(calls)
              .then(function (members)
              {
                deferred.resolve({
                  user:     user,
                  groupId:  options.groupId,
                  aggs:     aggs,
                  members:  members,
                  synced:   new Date().getTime(),
                  periods: {
                    start:  options.stamps.start,
                    end:    options.stamps.end
                  }
                });
              });
            }
            else
            {
              deferred.resolve({
                user:     user,
                groupId:  options.groupId,
                aggs:     aggs,
                synced:   new Date().getTime(),
                periods: {
                  start:  options.stamps.start,
                  end:    options.stamps.end
                }
              });
            };
          });
        }
        else
        {
          deferred.resolve({
            user:   user,
            synced: new Date().getTime(),
            periods: {
              start:  options.stamps.start,
              end:    options.stamps.end
            }
          });
        };
      },
      function (error)
      {
        deferred.resolve({error: error});
      }
    );

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

    Slots.query(params, 
      function (result) 
      {
        deferred.resolve({
          id:     params.user,
          data:   result,
          stats:  Stats.member(result)
        });
      },
      function (error)
      {
        deferred.resolve({error: error});
      }
    );

    return deferred.promise;
  };


  /**
   * Return local slots
   */
  Slots.prototype.local = function () { return angular.fromJson(Storage.get('slots')); };


  /**
   * Slot adding process
   */
  Slots.prototype.add = function (slot, user) 
  {
    var deferred = $q.defer();

    Slots.save({user: user}, slot,
      function (result) 
      {
        deferred.resolve(result);
      },
      function (error)
      {
        deferred.resolve({error: error});
      }
    );

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
    var deferred = $q.defer();

    Slots.change(angular.extend(naturalize(changed), {user: user}), naturalize(original), 
      function (result) 
      {
        deferred.resolve(result);
      },
      function (error)
      {
        deferred.resolve({error: error});
      }
    );

    return deferred.promise;
  };


  /**
   * Slot delete process
   */
  Slots.prototype.remove = function (slot, user) 
  {
    var deferred = $q.defer();

    Slots.remove(angular.extend(naturalize(slot), {user: user}), 
      function (result) 
      {
        deferred.resolve(result);
      },
      function (error)
      {
        deferred.resolve({error: error});
      }
    );

    return deferred.promise;
  };
  

  /**
   * Naturalize Slot for back-end injection
   */
  function naturalize (slot)
  {
    var content = angular.fromJson(slot.content);

    return {
      start:      new Date(slot.start).getTime() / 1000,
      end:        new Date(slot.end).getTime() / 1000,
      recursive:  content.recursive,
      text:       content.state,
      id:         content.id
    }
  };


  /**
   * Check whether slot extends from saturday to sunday and if recursive?
   * 
   * Produce timestamps for sunday 00:00 am through the year and
   * check whether intended to change recursive slot has one of those
   * timestamps, if so slice slot based on midnight and present as two
   * slots in timeline.
   */
  // function checkForSatSun (slot) { };


  /**
   * Check for overlaping slots exists?
   * 
   * Prevent any overlaping slots by adding new slots or changing
   * the current ones in front-end so back-end is almost always aligned with
   * front-end.
   */
  // function preventOverlaps (slot) { };


  /**
   * Slice a slot from a give point
   */
  // function slice (slot, point) { };


  /**
   * Combine two slots
   */
  // function combine (slots) { };


  return new Slots;
}])



/**
 * Messages model
 */
.factory('Messages', ['$rootScope', '$config', '$resource', '$q', 'Storage',
function ($rootScope, $config, $resource, $q, Storage) 
{
  var Messages = $resource(
    $config.host + '/question/:action',
    {
    },
    {
      query: {
        method: 'GET',
        params: {action: '', 0: 'dm'},
        isArray: true
      },
      get: {
        method: 'GET',
        params: {}
      },
      send: {
        method: 'POST',
        params: {action: 'sendDirectMessage'}
      },
      save: {
        method: 'POST',
        params: {}
      },
      changeState: {
        method: 'POST',
        params: {action: 'changeState'}
      },
      remove : {
        method: 'POST',
        params: {action: 'deleteQuestions'}
      }
    }
  );
  

  /**
   * Query messages from back-end
   */
  Messages.prototype.query = function () 
  {
    var deferred = $q.defer();

    Messages.query(
      function (result) 
      {
        Storage.add('messages', angular.toJson(result));

        Messages.prototype.unreadCount();

        deferred.resolve(Messages.prototype.filter(result));
      },
      function (error)
      {
        deferred.resolve({error: error});
      }
    );

    return deferred.promise;
  };


  /**
   * TODO
   * Extract this to a data processer
   * 
   * Filter messages based on box
   */
  Messages.prototype.filter = function (messages)
  {
    var filtered = {
      inbox: [],
      outbox: [],
      trash: []
    };

    angular.forEach(messages, function (message, index)
    {
      if (message.subject == '') message.subject = '-No Subject-';

      if (message.box == 'inbox' &&
          message.state != 'TRASH')
      {
        filtered.inbox.push(message);
      }
      else if ( message.box == 'outbox' && 
                message.state != 'TRASH')
      {
        filtered.outbox.push(message);
      }
      else if ( (message.box == 'inbox' || message.box == 'outbox') &&
                message.state == 'TRASH')
      {
        filtered.trash.push(message);
      };
    });

    return filtered;
  };


  /**
   * Serve messages from localStorage
   */
  Messages.prototype.local = function () { return angular.fromJson(Storage.get('messages')) };


  /**
   * Find a message in cache
   */
  Messages.prototype.find = function (id)
  {
    var gem;

    angular.forEach(Messages.prototype.local(), function (message, index)
    {
      if (message.uuid == id) gem = message;
    });

    return gem;
  };


  /**
   * Serve receivers list
   */
  Messages.prototype.receviers = function ()
  {
    var members   = angular.fromJson(Storage.get('members')),
        groups    = angular.fromJson(Storage.get('groups')),
        receivers = [];

    angular.forEach(members, function(member, index)
    {
        receivers.push({
        id: member.uuid,
        name: member.name,
        group: 'Users'
      });
    });

    angular.forEach(groups, function(group, index)
    {
        receivers.push({
        id: group.uuid,
        name: group.name,
        group: 'Groups'
      });
    });

    return receivers;
  };


  /**
   * Send a message
   */
  Messages.prototype.send = function (message, broadcast) 
  {
    var deferred = $q.defer(),
        members = [],
        types = [];

    angular.forEach(message.receivers, function (receiver, index)
    {
      members.push(receiver.id);
    });

    types.push('paige');

    if (broadcast.sms) types.push('sms');

    if (broadcast.email) types.push('email');

    var message = {
      members: members,
      content: message.body,
      subject: message.subject,
      types: types
    };

    Messages.send(null, message, 
      function (result) 
      {
        var returned = '';

        angular.forEach(result, function (chr, i)
        {
          returned += chr;
        });

        deferred.resolve(returned);
      },
      function (error)
      {
        deferred.resolve({error: error});
      }
    );

    return deferred.promise;
  };


  /**
   * Get unread messages
   */
  Messages.prototype.unread = function ()
  {
    var messages = Messages.prototype.local(),
        unread = [];

    angular.forEach(messages, function (message, index)
    {
      if (message.box == 'inbox' && message.state == 'NEW') unread.push(message);
    });

    return unread;
  };


  /**
   * Count unread messages
   */
  Messages.prototype.unreadCount = function ()
  {
    var messages = Messages.prototype.local(),
        counter = 0;

    angular.forEach(messages, function (message, index)
    {
      if (message.box == 'inbox' && message.state == 'NEW') counter++;
    });

    $rootScope.app.unreadMessages = counter;
  };


  /**
   * Change message state
   */
  Messages.prototype.changeState = function (ids, state)
  {
    var deferred = $q.defer();

    Messages.changeState(null, 
      {
        ids: ids, 
        state: state 
      }, 
      function (result) 
      {
        deferred.resolve(result);
      },
      function (error)
      {
        deferred.resolve({error: error});
      }
    );

    /**
     * Change message state locally as well
     * if it is READ
     */
    if (state == 'READ')
    {
      var messages = angular.fromJson(Storage.get('messages')),
          converted = [];

      angular.forEach(messages, function (message, index)
      {
        angular.forEach(ids, function (id, i)
        {
          if (message.uuid == id) message.state = 'READ';
        });

        converted.push(message);
      });

      Storage.remove('messages');

      Storage.add(angular.toJson('messages', converted));

      Messages.prototype.unreadCount();
    };

    return deferred.promise;
  };



  /**
   * Delete message(s)
   */
  Messages.prototype.remove = function (id)
  {
    var deferred = $q.defer();

    Messages.prototype.changeState(id, 'TRASH')
    .then(function (result) 
    {
      deferred.resolve(result);
    });

    return deferred.promise;
  };



  /**
   * Restore message(s)
   */
  Messages.prototype.restore = function (id)
  {
    var deferred = $q.defer();

    Messages.prototype.changeState(id, 'SEEN')
    .then(function (result) 
    {
      deferred.resolve(result);
    });

    return deferred.promise;
  };


  /**
   * Delete forever
   */
  Messages.prototype.emptyTrash = function (ids)
  {
    var deferred = $q.defer(),
        messages = Messages.prototype.local(),
        bulk = [];

    angular.forEach(messages, function(message, index)
    {
      if ((message.box == 'inbox' || message.box == 'outbox') && message.state == 'TRASH') bulk.push(message.uuid);
    });

    Messages.remove(null,
      { 
        members: bulk 
      }, 
      function (result) 
      {
        deferred.resolve(result);
      },
      function (error)
      {
        deferred.resolve({error: error});
      }
    );

    return deferred.promise;
  };


  return new Messages;
}])


/**
 * Groups modal
 */
.factory('Groups', ['$resource', '$config', '$q', 'Storage', '$rootScope', 'Slots',
function ($resource, $config, $q, Storage, $rootScope, Slots) 
{
  var Groups = $resource(
    $config.host + '/network/:action/:id',
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
        params: {id:''}
      },
      save: {
        method: 'POST',
        params: {id:''}
      },
      edit: {
        method: 'PUT',
        params: {id:''}
      },
      remove: {
        method: 'DELETE',
        params: {id:''}
      },
      search: {
        method: 'POST',
        params: {id:'', action:'searchPaigeUser'},
        isArray: true
      }
    }
  );


  var Containers = $resource(
    $config.host + '/node/:id/container',
    {
    },
    {
      get: {
        method: 'GET',
        params: {id:''},
        isArray: true
      }
    }
  );


  var Parents = $resource(
    $config.host + '/parent',
    {
    },
    {
      get: {
        method: 'GET',
        params: {},
        isArray: true
      }
    }
  );


  var Members = $resource(
    $config.host + '/network/:id/members/:mid',
    {
    },
    {
      query: {
        method: 'GET',
        params: {id:'', fields: '[role, latlong, latlong_final, settingsWebPaige]'},
        isArray: true
      },
      get: {
        method: 'GET',
        params: {id:''}
      },
      save: {
        method: 'POST',
        params: {}
      },
      add: {
        method: 'POST',
        params: {id:'', mid:''} 
      },
      remove: {
        method: 'DELETE',
        params: {id:'', mid:''} 
      }
    }
  );


  /**
   * Get parent group data
   */
  Groups.prototype.parents = function (all) 
  {   
    var deferred = $q.defer();

    Parents.get(
      null, 
      function (result) 
      {
        if (!all)
        {
          // console.warn('returned ===>', result.length);

          if (result.length == 0)
          {
            deferred.resolve(null);
          }
          else
          {
            deferred.resolve(result[0].uuid);
          }
        }
        else
        {
          deferred.resolve(result);
        }
      },
      function (error)
      {
        deferred.resolve({error: error});
      }
    );

    return deferred.promise;
  };


  /**
   * TODO
   * Extract only the groups which are in the local list
   * 
   * Get container (parent) group data
   */
  Groups.prototype.containers = function (id) 
  {   
    var deferred  = $q.defer(),
        cons      = [];

    Containers.get(
      {id: id}, 
      function (result) 
      {
        /**
         * Group save call returns only uuid and that is parsed as json
         * by angular, this is a fix for converting returned object to plain string
         */
        angular.forEach(result, function (_r, _i)
        {
          var returned = [];

          angular.forEach(_r, function (chr, i) { returned += chr });

          cons.push(returned);
        });
        
        deferred.resolve(cons);
      },
      function (error)
      {
        deferred.resolve({error: error});
      }
    );

    return deferred.promise;
  };


  /**
   * Add Member to a group
   */
  Groups.prototype.addMember = function (candidate)
  {
    var deferred = $q.defer();

    Members.add(
      { 
        id: candidate.group.uuid, 
        mid: candidate.id 
      }, 
      {}, 
      function (result) 
      {
        deferred.resolve(result);
      },
      function (error)
      {
        deferred.resolve({error: error});
      }
    );

    return deferred.promise;    
  };


  /**
   * Remove member from group
   */
  Groups.prototype.removeMember = function (memberId, groupId)
  {
    var deferred = $q.defer();

    Members.remove(
      { 
        id: groupId, 
        mid: memberId 
      }, 
      function (result) 
      {
        deferred.resolve(result);
      },
      function (error)
      {
        deferred.resolve({error: error});
      }
    );

    return deferred.promise;    
  };


  /**
   * Remove members from a group (bulk action)
   */
  Groups.prototype.removeMembers = function (selection, group)
  {
    var deferred = $q.defer(),
        calls = [];

    angular.forEach(selection, function (value, id)
    {
      if (id) calls.push(Groups.prototype.removeMember(id, group.uuid));
    });

    $q.all(calls)
    .then(function (result)
    {
      deferred.resolve(result);
    });

    return deferred.promise; 
  };


  Groups.prototype.wish = function (id)
  {
    var deferred  = $q.defer(),
        count     = 0;

    Slots.wishes({
      id: id,
      start:  255600,
      end:    860400
    }).then(function (results)
    {
      angular.forEach(results, function (slot, index)
      {
        if (slot.start == 255600 && slot.end == 860400 && slot.count != null) count = slot.count;
      });

      deferred.resolve({
        count: count
      });
    });

    return deferred.promise; 
  }


  /**
   * General query function from groups and their members
   */
  Groups.prototype.query = function (only)
  {
    var deferred = $q.defer();

    Groups.query(
      function (groups) 
      {
        Storage.add('groups', angular.toJson(groups));

        if (!only)
        {
          var calls = [];

          angular.forEach(groups, function (group, index)
          {
            calls.push(Groups.prototype.get(group.uuid));
          });

          $q.all(calls)
          .then(function (results)
          {
            Groups.prototype.uniqueMembers();

            var data = {};

            data.members = {};

            angular.forEach(groups, function (group, gindex)
            {
              data.groups = groups;

              data.members[group.uuid] = [];

              angular.forEach(results, function (result, mindex)
              {
                if (result.id == group.uuid) data.members[group.uuid] = result.data;
              });
            });

            deferred.resolve(data);
          });
        }
        else
        {
          deferred.resolve(groups);
        };
      },
      function (error)
      {
        deferred.resolve({error: error});
      }
    );

    return deferred.promise;
  };


  /**
   * Get group data
   */
  Groups.prototype.get = function (id) 
  {   
    var deferred = $q.defer();

    Members.query(
      {id: id}, 
      function (result) 
      {
        /**
         * DIRTY CHECK!
         * 
         * Check for 'null' return from back-end
         * if group is empty
         */
        var returned;

        if (result.length == 4 && 
            result[0][0] == 'n' && 
            result[1][0] == 'u')
        {
          returned = [];
        }
        else
        {
          returned = result;
        };

        Storage.add(id, angular.toJson(returned));

        deferred.resolve({
          id: id,
          data: returned
        });
      },
      function (error)
      {
        deferred.resolve({error: error});
      }
    );

    return deferred.promise;
  };


  /**
   * Make an inuque list of members
   */
  Groups.prototype.uniqueMembers = function ()
  {
    angular.forEach(angular.fromJson(Storage.get('groups')), function (group, index)
    {
      var members = angular.fromJson(Storage.get('members')) || {};

      angular.forEach(angular.fromJson(Storage.get(group.uuid)), function (member, index)
      {
        members[member.uuid] = member;
      });

      Storage.add('members', angular.toJson(members));
    });
  };


  /**
   * Save group
   */
  Groups.prototype.save = function (group) 
  {
    var deferred = $q.defer();

    /**
     * Check if group id supplied
     * if save submitted from add / edit form
     */
    if (group.id)
    {
      Groups.edit({id: group.id}, {name: group.name}, function (result) 
      {
        deferred.resolve(group.id);
      });
    }
    else
    {
      Groups.save(
        { id: $rootScope.app.resources.uuid }, 
        group, 
        function (result) 
        {
          /**
           * Group save call returns only uuid and that is parsed as json
           * by angular, this is a fix for converting returned object to plain string
           */
          var returned = '';

          angular.forEach(result, function (chr, i)
          {
            returned += chr;
          });

          deferred.resolve(returned);
        },
        function (error)
        {
          deferred.resolve({error: error});
        }
      ); 
    };

    return deferred.promise;
  };


  /**
   * Delete group
   */
  Groups.prototype.remove = function (id) 
  {
    var deferred = $q.defer();

    Groups.remove(
      {id: id}, 
      function (result) 
      {
        deferred.resolve(result);
      },
      function (error)
      {
        deferred.resolve({error: error});
      }
    );

    return deferred.promise;
  };


  /**
   * Search candidate mambers
   */
  Groups.prototype.search = function (query) 
  {
    var deferred = $q.defer();

    Groups.search(
      null, 
      {key: query}, 
      function (results) 
      {
        var processed = [];

        angular.forEach(results, function (result, index)
        {
          processed.push({
            id: result.id,
            name: result.name,
            groups: Groups.prototype.getMemberGroups(result.id)
          });
        });

        deferred.resolve(processed);
      },
      function (error)
      {
        deferred.resolve({error: error});
      }
    );

    return deferred.promise;
  };


  /**
   * Get groups of given member
   */
  Groups.prototype.getMemberGroups = function (id)
  {
    var groups = angular.fromJson(Storage.get('groups')),
        memberGroups = [];

    angular.forEach(groups, function (group, index)
    {
      var localGroup = angular.fromJson(Storage.get(group.uuid));

      angular.forEach(localGroup, function (member, index)
      {
        if (member.uuid === id)
          memberGroups.push({
            uuid: group.uuid,
            name: group.name
          });
      });
    });

    return memberGroups;
  };


  return new Groups;
}])



/**
 * Profile modal
 */
.factory('Profile', ['$rootScope', '$config', '$resource', '$q', 'Storage', 'Groups', 'Slots',
function ($rootScope, $config, $resource, $q, Storage, Groups, Slots) 
{
  var Profile = $resource(
    $config.host + '/node/:id/:section',
    {
    },
    {
      get: {
        method: 'GET',
        params: {id: '', section: 'resource'}
      },
      save: {
        method: 'PUT',
        params: {section: 'resource'}
      },
      role: {
        method: 'PUT',
        params: {section: 'role'}
      }
    }
  );


  var Register = $resource(
    $config.host + '/register',
    {
      direct: 'true',
      module: 'default'
    },
    {
      profile: {
        method: 'GET',
        params: {uuid: '', pass: '', name: '', phone: ''}
      }
    }
  );


  var Resources = $resource(
    $config.host + '/resources',
    {
    },
    {
      get: {
        method: 'GET',
        params: {}
      },
      save: {
        method: 'POST',
        params: {
          /**
           * It seems like backend accepts data in request payload as body as well
           */
          //tags: ''
        }
      }
    }
  );


  /**
   * Change password for user
   */
  Profile.prototype.register = function (profile) 
  {    
    var deferred = $q.defer();

    Register.profile(
      {
        uuid: profile.username,
        pass: MD5(profile.password),
        name: profile.name,
        phone: profile.PhoneAddress
      }, 
      function (registered) 
      {
        Profile.prototype.role(profile.username, profile.role.id)
        .then(function(roled)
        {
          Profile.prototype.save(profile.username, {
            EmailAddress: profile.EmailAddress,
            PostAddress: profile.PostAddress,
            PostZip: profile.PostZip,
            PostCity: profile.PostCity
          }).then(function(resourced)
          {
            var calls = [];

            angular.forEach(profile.groups, function (group, index)
            {
              calls.push(Groups.addMember({
                id: profile.username,
                group: group
              }));
            });

            $q.all(calls)
            .then(function(grouped)
            {
              deferred.resolve({
                registered: registered,
                roled: roled,
                resourced: resourced,
                grouped: grouped
              });
            });

          }); // save profile

        }); // role
      },
      function (error)
      {
        deferred.resolve({error: error});
      }
    ); // register
   
    return deferred.promise;
  };


  /**
   * Set role of given user
   */
  Profile.prototype.role = function (id, role) 
  {    
    var deferred = $q.defer();

    Profile.role(
      {id: id}, 
      role, 
      function (result) 
      {
        deferred.resolve(result);
      },
      function (error)
      {
        deferred.resolve({error: error});
      }
    );

    return deferred.promise;
  };


  /**
   * Change password for user
   */
  Profile.prototype.changePassword = function (passwords) 
  {    
    var deferred = $q.defer();

    Resources.save(
      null, 
      { askPass: MD5(passwords.new1) }, 
      function (result) 
      {
        deferred.resolve(result);
      },
      function (error)
      {
        deferred.resolve({error: error});
      }
    );

    return deferred.promise;
  };


  /**
   * Get profile of given user
   */
  Profile.prototype.get = function (id, localize) 
  {    
    var deferred = $q.defer();

    Profile.get({id: id}, function (result) 
    {
      if (id == $rootScope.app.resources.uuid) $rootScope.app.resources = result;

      if (localize) Storage.add('resources', angular.toJson(result));

      deferred.resolve({resources: result});
    });

    return deferred.promise;
  };


  /**
   * Get profile of given user with slots
   */
  Profile.prototype.getWithSlots = function (id, localize, params) 
  {
    var deferred = $q.defer();

    Profile.prototype.get(id, localize)
    .then(function (resources)
    {
      Slots.user({
        user: id,
        start: params.start,
        end: params.end
      }).then(function (slots)
      {
        deferred.resolve(angular.extend(resources, {
          slots: slots,
          synced: new Date().getTime(),
          periods: {
            start: params.start,
            end: params.end
          }
        }));        
      }); // user slots
    }); // profile get

    return deferred.promise;
  };


  /**
   * Get user slots
   */
  Profile.prototype.getSlots = function (id, params) 
  {
    var deferred = $q.defer();

    Slots.user(
    {
      user:   id,
      // start: params.start / 1000,
      // end: params.end / 1000
      start:  params.start,
      end:    params.end
    }).then(function (slots)
    {
      deferred.resolve({
        slots: slots,
        synced: new Date().getTime(),
        periods: {
          start: params.start,
          end: params.end
        }
      });        
    });

    return deferred.promise;
  };


  /**
   * Get local resource data
   */
  Profile.prototype.local = function () { return angular.fromJson(Storage.get('resources')) };


  /**
   * Save profile
   */
  Profile.prototype.save = function (id, resources) 
  {
    var deferred = $q.defer();

    Profile.save(
      {id: id}, 
      resources, 
      function (result) 
      {
        deferred.resolve(result);
      },
      function (error)
      {
        deferred.resolve({error: error});
      }
    );

    return deferred.promise;
  };


  /**
   * Create settings resources for user if it is missing
   */
  Profile.prototype.createSettings_ = function (id) 
  {
    var deferred = $q.defer();

    Profile.prototype.get(id, false)
    .then(function (result) 
    {
      if (result.settingsWebPaige == undefined || result.settingsWebPaige == null)
      {
        Profile.save(
          {id: result.resources.uuid}, 
          angular.toJson({ settingsWebPaige: $rootScope.config.defaults.settingsWebPaige }), 
          function (result)
          {
            deferred.resolve({
              status: 'modified',
              resources: result
            });
          },
          function (error)
          {
            deferred.resolve({error: error});
          }
        );
      }
      else
      {
        deferred.resolve({
          status: 'full',
          resources: result
        });
      }
    });

    return deferred.promise;
  };


  return new Profile;
}])



/**
 * Settings module
 */
.factory('Settings', ['$rootScope', '$config', '$resource', '$q', 'Storage', 'Profile',
function ($rootScope, $config, $resource, $q, Storage, Profile) 
{
  /**
   * Define settings resource
   * In this case it empty :)
   */
  var Settings = $resource();


  /**
   * Get settings from localStorage
   */
  Settings.prototype.get = function ()
  {
    return angular.fromJson(Storage.get('resources')).settingsWebPaige || {};
  };


  /**
   * Save settings
   */
  Settings.prototype.save = function (id, settings) 
  {
    var deferred = $q.defer();

    Profile.save(id, {
      settingsWebPaige: angular.toJson(settings)
    })
    .then(function (result)
    {
      deferred.resolve({
        saved: true
      });
    });

    return deferred.promise;
  };


  return new Settings;
}]);
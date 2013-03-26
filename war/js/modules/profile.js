'use strict';

/**
 * Profile Controller
 */
function profileCtrl($rootScope, $scope, $config, $q, $md5, data, Profile, $route, Storage, Groups, Dater, $location, $window, Slots, Sloter)
{
  /**
   * Fix styles
   */
  $rootScope.fixStyles();


  /**
   * Self this
   */
	var self = this,
      periods = Dater.getPeriods(),
      current = {
        day: Date.today().getDayOfYear() + 1,
        week: new Date().getWeek(),
        month: new Date().getMonth() + 1
      };


  /**
   * Set data for view
   */
  $scope.data = data;


  /**
   * Set user
   */
  $scope.user = { id: $route.current.params.userId };


  /**
   * Get groups of user
   */
  $scope.groups = Groups.getMemberGroups($route.current.params.userId);


  /**
   * Default values for passwords
   */
  $scope.passwords = {
    current: '',
    new1: '',
    new2: ''
  };


  /**
   * Default form views
   */
  $scope.forms = {
    add: false,
    edit: false
  };


  /**
   * Slot form toggler
   */
  $scope.toggleSlotForm = function ()
  {
    if ($scope.forms.add)
    {
      $scope.resetInlineForms();
    }
    else
    {
      $scope.slot = {};

      $scope.forms = {
        add: true,
        edit: false
      };
    }
  };


  /**
   * Reset inline forms
   */
  $scope.resetInlineForms = function ()
  {
    $scope.slot = {};

    $scope.original = {};

    $scope.forms = {
      add: false,
      edit: false
    };
  };


  /**
   * Extract view action from url and set view
   */
  setView($location.hash());


  /**
   * View setter
   */
  function setView (hash)
  {
    $scope.views = {
      profile:  false,
      edit:     false,
      password: false,
      timeline: false
    };

    $scope.views[hash] = true;

    $scope.views.user = ($rootScope.app.resources.uuid == $route.current.params.userId) ? true : false;
  };


  /**
   * Switch between the views and set hash ccordingly
   */
  $scope.setViewTo = function (hash)
  {
    $scope.$watch($location.hash(), function()
    {
      $location.hash(hash);

      setView(hash);
    });
  };


  /**
   * Save user
   */
  $scope.save = function(resources)
  {
    $rootScope.statusBar.display($rootScope.ui.profile.saveProfile);

    Profile.save($route.current.params.userId, resources)
    .then(function(result)
    {
      $rootScope.statusBar.display($rootScope.ui.profile.refreshing);

      var flag = ($route.current.params.userId == $rootScope.app.resources.uuid) ? true : false;

      Profile.get($route.current.params.userId, flag)
      .then(function(data)
      {
        $rootScope.notifier.success($rootScope.ui.profile.dataChanged);

        $scope.data = data;

        $rootScope.statusBar.off();
      });
    });
  };


  /**
   * Change passwords
   */
  $scope.change = function(passwords)
  {
    if (passwords.new1 == '' || 
        passwords.new2 == '')
    {


      $rootScope.notify({
        status: true,
        type: 'alert-error',
        message: $rootScope.ui.profile.pleaseFill,
        permanent: true
      });




      return false;
    };

    if (passwords.new1 != passwords.new2)
    {



      $rootScope.notify({
        status: true,
        type: 'alert-error',
        message: $rootScope.ui.profile.passNotMatch,
        permanent: true
      });




      return false;
    }
    else if ($rootScope.app.resources.askPass == $md5.process(passwords.current))
    {
      $rootScope.statusBar.display($rootScope.ui.profile.changingPass);

      Profile.changePassword(passwords)
      .then(function(result)
      {
        $rootScope.statusBar.display($rootScope.ui.profile.refreshing);

        Profile.get($rootScope.app.resources.uuid, true)
        .then(function(data)
        {
          $rootScope.notifier.success($rootScope.ui.profile.passChanged);

          $scope.data = data;

          $rootScope.statusBar.off();
        });
      });
    }
    else
    {



      $rootScope.notify({
        status: true,
        type: 'alert-error',
        message: $rootScope.ui.profile.passwrong,
        permanent: true
      });



    };
  };
  

  /**
   * Timeline (The big boy)
   */
  var timeliner = {

    /**
     * Init timeline
     */
    init: function ()
    {
      $scope.timeline = {
        current: current,
        options: {
          start:  new Date(periods.weeks[current.week].first.day),
          end:    new Date(periods.weeks[current.week].last.day),
          min:    new Date(periods.weeks[current.week].first.day),
          max:    new Date(periods.weeks[current.week].last.day)
        },
        range: {
          start: periods.weeks[current.week].first.day,
          end: periods.weeks[current.week].last.day
        },
        config: {
          states: $config.timeline.config.states
        }
      };

      var states = {};

      angular.forEach($scope.timeline.config.states, function(state, key)
      {
        states[key] = state.label;
      });

      $scope.states = states;

      $('#timeline').html('');
      $('#timeline').append('<div id="userTimeline"></div>');

      self.timeline = new links.Timeline(document.getElementById('userTimeline'));

      links.events.addListener(self.timeline, 'rangechanged',  timelineGetRange);
      links.events.addListener(self.timeline, 'add',           timelineOnAdd);
      links.events.addListener(self.timeline, 'delete',        timelineOnDelete);
      links.events.addListener(self.timeline, 'change',        timelineOnChange);
      links.events.addListener(self.timeline, 'select',        timelineOnSelect);

      this.render($scope.timeline.options);
    },

    /**
     * Render or re-render timeline
     */
    render: function (options)
    {
      angular.extend($scope.timeline.options, $rootScope.config.timeline.options);

      setTimeout( function() 
      {
        self.timeline.draw(
          Sloter.processSimple(
            $scope.data.slots.data, 
            $scope.timeline.config
          ), $scope.timeline.options);
      }, 100);

      self.timeline.setVisibleChartRange($scope.timeline.options.start, $scope.timeline.options.end);

      $scope.synced = data.synced;
    },

    /**
     * Grab new timeline data from backend and render timeline again
     */
    load: function (stamps)
    {
      var _this = this;

      $rootScope.statusBar.display($rootScope.ui.planboard.refreshTimeline);

      Profile.getSlots($scope.user.id, stamps)
      .then(function(data)
      {
        $scope.data.slots = data.slots;

        $scope.synced = data.synced;

        _this.render(stamps);

        $rootScope.statusBar.off();
      });
    },


    /**
     * Refresh timeline as it is
     */
    refresh: function ()
    {
      $scope.slot = {};

      $scope.forms = {
        add: true,
        edit: false
      };

      this.load({
        start:  data.periods.start,
        end:    data.periods.end
      });
    }

  };


  /**
   * Render timeline if hash is timeline
   */
  if ($location.hash() == 'timeline') timeliner.init();


  /**
   * Redraw timeline
   */
  $scope.redraw = function () { timeliner.init() };


  /**
   * Watch for changes in timeline range
   */
  $scope.$watch(function ()
  {
    if ($location.hash() == 'timeline')
    {
      var range = self.timeline.getVisibleChartRange();

      $scope.timeline.range = {
        start:  new Date(range.start).toString(),
        end:    new Date(range.end).toString()
      };
    };
  });


  /**
   * Timeline get ranges
   */
  function timelineGetRange ()
  {
    var range = self.timeline.getVisibleChartRange();

    $scope.$apply(function ()
    {
      $scope.timeline.range = {
        start:  new Date(range.from).toString(),
        end:    new Date(range.till).toString()
      };
    });
  };


  /**
   * Get information of the selected slot
   */
  function selectedSlot ()
  {
    var selection;

    if (selection = self.timeline.getSelection()[0])
    {
      var values  = self.timeline.getItem(selection.row),
          content = angular.fromJson(values.content.match(/<span class="secret">(.*)<\/span>/)[1]);

      $scope.original = {
        start:        values.start,
        end:          values.end,
        content: {
          recursive:  content.recursive,
          state:      content.state,
          id:         content.id
        }
      };

      /**
       * TODO
       * Convert to resetview?
       */
      $scope.forms = {
        add: false,
        edit: true
      };

      $scope.slot = {
        start: {
          date: new Date(values.start).toString($rootScope.config.formats.date),
          time: new Date(values.start).toString($rootScope.config.formats.time)
        },
        end: {
          date: new Date(values.end).toString($rootScope.config.formats.date),
          time: new Date(values.end).toString($rootScope.config.formats.time)
        },
        state:      content.state,
        recursive:  content.recursive,
        id:         content.id
      };

      return values;
    };
  };


  /**
   * Timeline on select
   */
  function timelineOnSelect ()
  {
    $scope.$apply(function ()
    {
      $scope.selectedOriginal = selectedSlot();
    });
  };


  /**
   * Timeline on add
   */
  function timelineOnAdd ()
  {
    var news = $('.timeline-event-content')
                .contents()
                .filter(function()
                { 
                  return this.nodeValue == 'New' 
                }),
        values = self.timeline.getItem(self.timeline.getSelection()[0].row);
      
    if (news.length > 1) self.timeline.cancelAdd();

    $scope.$apply(function()
    {
      $scope.forms = {
        add: true,
        edit: false
      };

      $scope.slot = {
        start: {
          date: new Date(values.start).toString($rootScope.config.formats.date),
          time: new Date(values.start).toString($rootScope.config.formats.time)
        },
        end: {
          date: new Date(values.end).toString($rootScope.config.formats.date),
          time: new Date(values.end).toString($rootScope.config.formats.time)
        },
        recursive: (values.group.match(/recursive/)) ? true : false,
        /**
         * INFO
         * First state is hard-coded
         * Maybe use the first one from array later on?
         */
        state: 'com.ask-cs.State.Available'
      };
    });
  };


  /**
   * Add slot trigger start view
   */
  $scope.slotAdd = function (slot)
  {
    $rootScope.statusBar.display($rootScope.ui.planboard.addTimeSlot);

    Slots.add(
    {
      start:      Dater.convert.absolute(slot.start.date, slot.start.time, true),
      end:        Dater.convert.absolute(slot.end.date, slot.end.time, true),
      recursive:  (slot.recursive) ? true : false,
      text:       slot.state
    }, 
    $scope.user.id)
    .then(function (result)
    {
      $rootScope.notifier.success($rootScope.ui.planboard.slotAdded);

      timeliner.refresh();
    });
  };


  /**
   * Timeline on change
   */
  function timelineOnChange (direct, original, slot, options)
  {
    if (!direct)
    {
      var values  = self.timeline.getItem(self.timeline.getSelection()[0].row),
          options = {
            start:    values.start,
            end:      values.end,
            content:  angular.fromJson(values.content.match(/<span class="secret">(.*)<\/span>/)[1])
          };
    };

    $rootScope.statusBar.display($rootScope.ui.planboard.changingSlot);

    Slots.change($scope.original, options, $scope.user.id)
    .then(function (result)
    {
      $rootScope.notifier.success($rootScope.ui.planboard.slotChanged);

      timeliner.refresh();
    });
  };


  /**
   * Change slot
   */
  $scope.slotChange = function (original, slot)
  {
    timelineOnChange(true, original, slot, 
    {
      start:  Dater.convert.absolute(slot.start.date, slot.start.time, false),
      end:    Dater.convert.absolute(slot.end.date, slot.end.time, false),
      content: angular.toJson({
        recursive:  slot.recursive, 
        state:      slot.state 
      })
    });
  };


  /**
   * Timeline on delete
   */
  function timelineOnDelete ()
  {
    $rootScope.statusBar.display($rootScope.ui.planboard.deletingTimeslot);

    Slots.remove($scope.original, $scope.user.id)
    .then(function (result)
    {
      $rootScope.notifier.success($rootScope.ui.planboard.timeslotDeleted);

      timeliner.refresh();
    });
  };


  /**
   * Delete trigger start view
   */
  $scope.slotRemove = function ()
  {
    timelineOnRemove();
  };


  /**
   * Go to this week
   */
  $scope.timelineThisWeek = function ()
  {
    if ($scope.timeline.current.week != new Date().getWeek())
    {
      loadTimeline(periods.weeks[new Date().getWeek()]);

      $scope.timeline.range = {
        start:  periods.weeks[new Date().getWeek()].first.day,
        end:    periods.weeks[new Date().getWeek()].last.day
      };
    }
  };


  /**
   * Go one week in past
   */
  $scope.timelineBefore = function (timelineScope)
  {
    if ($scope.timeline.current.week != 1)
    {
      $scope.timeline.current.week--;

      timeliner.load({
        start:  periods.weeks[$scope.timeline.current.week].first.timeStamp,
        end:    periods.weeks[$scope.timeline.current.week].last.timeStamp,
      });
    };

    $scope.timeline.range = {
      start:  periods.weeks[$scope.timeline.current.week].first.day,
      end:    periods.weeks[$scope.timeline.current.week].last.day
    };
  };


  /**
   * Go one week in future
   */
  $scope.timelineAfter = function (timelineScope)
  {
    if ($scope.timeline.current.week != 53)
    {
      $scope.timeline.current.week++;

      timeliner.load({
        start:  periods.weeks[$scope.timeline.current.week].first.timeStamp,
        end:    periods.weeks[$scope.timeline.current.week].last.timeStamp,
      });
    };

    $scope.timeline.range = {
      start:  periods.weeks[$scope.timeline.current.week].first.day,
      end:    periods.weeks[$scope.timeline.current.week].last.day
    };
  };


  /**
   * Redraw timeline on window resize
   */
  $window.onresize = function ()
  {
    self.timeline.redraw();
  };


  /**
   * Timeline zoom in
   */
  $scope.timelineZoomIn = function ()
  {
    self.timeline.zoom($rootScope.config.timeline.config.zoom);
  };


  /**
   * Timeline zoom out
   */
  $scope.timelineZoomOut = function ()
  {
    self.timeline.zoom(-$rootScope.config.timeline.config.zoom);
  };
};


/**
 * If no userId is supplied
 */
profileCtrl.setAccount = {
  data: function ($rootScope, $route, $location) 
  {
    if (!$route.current.params.userId || !$location.hash())
    {
      $location.path('/profile/' + $rootScope.app.resources.uuid).hash('profile');
    };
  }
};


/**
 * Profile resolver
 */
profileCtrl.resolve = {
  data: function ($rootScope, Profile, $route, $location, Dater) 
  {
    if ($route.current.params.userId != $rootScope.app.resources.uuid)
    {
      var periods = Dater.getPeriods(),
          current = new Date().getWeek(),
          ranges = {
            start: periods.weeks[current].first.timeStamp / 1000,
            end: periods.weeks[current].last.timeStamp / 1000,
          };

      return Profile.getWithSlots($route.current.params.userId, false, ranges);
    }
    else
    {
      return Profile.get($route.current.params.userId, false);
    }
  }
};


profileCtrl.$inject = ['$rootScope', '$scope', '$config', '$q', '$md5', 'data', 'Profile', 
'$route', 'Storage', 'Groups', 'Dater', '$location', '$window', 'Slots', 'Sloter'];


/**
 * Profile modal
 */
WebPaige.
factory('Profile', function ($resource, $config, $q, $route, $md5, Storage, $rootScope, Groups, Slots) 
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
      pass: $md5.process(profile.password),
      name: profile.name,
      phone: profile.PhoneAddress
    }, function (registered) 
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

          angular.forEach(profile.groups, function(group, index)
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
    }); // register
   
    return deferred.promise;
  };


  /**
   * Set role of given user
   */
  Profile.prototype.role = function (id, role) 
  {    
    var deferred = $q.defer();

    Profile.role({id: id}, role, function (result) 
    {
      deferred.resolve(result);
    });

    return deferred.promise;
  };


  /**
   * Change password for user
   */
  Profile.prototype.changePassword = function (passwords) 
  {    
    var deferred = $q.defer();

    Resources.save(null, {
      askPass: $md5.process(passwords.new1)
    }, function (result) 
    {
      deferred.resolve(result);
    });

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
      if (localize)
      {
        Storage.add('resources', angular.toJson(result));
      };

      deferred.resolve({
        resources: result
      });
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
      user: id,
      start: params.start,
      end: params.end
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
  Profile.prototype.local = function()
  {
    return angular.fromJson(Storage.get('resources'));
  };


  /**
   * Save profile
   */
  Profile.prototype.save = function (id, resources) 
  {
    var deferred = $q.defer();

    Profile.save({id: id}, resources, function(result) 
    {
      deferred.resolve(result);
    });

    return deferred.promise;
  };


  /**
   * Create settings resources for user if it is missing
   */
  Profile.prototype.createSettings_ = function (id) 
  {    
    var deferred = $q.defer();
        // /**
        //  * WebPaige settings defaults
        //  */
        // defaults = {
        //   settingsWebPaige: {
        //     lang: 'nl'
        //   }
        // };

    /**
     * Get profile data
     */
    Profile.prototype.get(id, false)
    .then(function (result) 
    {
      console.log('result ->', result.resources.uuid, 'settings ->', $config.defaults.settingsWebPaige);

      /**
       * If user has no default settings give settings
       */
      if (result.settingsWebPaige == undefined || result.settingsWebPaige == null)
      {
        Profile.save({id: result.resources.uuid}, angular.toJson({
          settingsWebPaige: $config.defaults.settingsWebPaige
        }), function(result)
        {
          /**
           * Return promised
           */
          deferred.resolve({
            status: 'modified',
            resources: result
          });
        })
      }
      else
      {
        /**
         * Return promised
         */
        deferred.resolve({
          status: 'full',
          resources: result
        });
      }

    });

    return deferred.promise;
  };


  return new Profile;
});
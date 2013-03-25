'use strict';

/**
 * Profile Controller
 */
function profileCtrl($rootScope, $scope, $config, $q, $md5, data, Profile, $route, Storage, Groups, Dater, $location, $window, Slots)
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
  $scope.user = {
    id: $route.current.params.userId
  };


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
   * Render timeline if hash is timeline
   */
  if ($location.hash() == 'timeline')
  {
    initTimeline();
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
    $rootScope.loading = {
      status: true,
      message: $rootScope.ui.profile.saveProfile
    };

    Profile.save($route.current.params.userId, resources)
    .then(function(result)
    {
      $rootScope.loading = {
        status: true,
        message: $rootScope.ui.profile.refreshing
      };

      var flag = ($route.current.params.userId == $rootScope.app.resources.uuid) ? true : false;

      Profile.get($route.current.params.userId, flag)
      .then(function(data)
      {
        $scope.data = data;

        $rootScope.loading = {
          status: false
        };

        $rootScope.notify({
          status: true,
          type: 'alert-success',
          message: $rootScope.ui.profile.dataChanged
        });
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
      $rootScope.loading = {
        status: true,
        message: $rootScope.ui.profile.changingPass
      };

      Profile.changePassword(passwords)
      .then(function(result)
      {
        $rootScope.loading = {
          status: true,
          message: $rootScope.ui.profile.refreshing
        };

        Profile.get($rootScope.app.resources.uuid, true)
        .then(function(data)
        {
          $scope.data = data;

          $rootScope.loading = {
            status: false
          };

          $rootScope.notify({
            status: true,
            type: 'alert-success',
            message: $rootScope.ui.profile.passChanged
          });
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
   * Redraw timeline
   */
  $scope.redraw = function ()
  {
    initTimeline();
  };
  

  /**
   * Watch for changes in timeline range
   */
  $scope.$watch(function()
  {
    if ($location.hash() == 'timeline')
    {
      var range = self.timeline.getVisibleChartRange();

      $scope.timeline.range = {
        start: new Date(range.start).toString($config.date.stringFormat),
        end: new Date(range.end).toString($config.date.stringFormat)
      };
    };
  });


  /**
   * TODO
   * Is it still needed?
   * 
   * Timeline get ranges
   */
  function timelineGetRange()
  {
    var range = self.timeline.getVisibleChartRange();

    $scope.$apply(function()
    {
      $scope.timeline.range = {
        start: new Date(range.from).toString($config.date.stringFormat),
        end: new Date(range.till).toString($config.date.stringFormat)
      };
    });
  };


  /**
   * Get information of the selected slot
   */
  function selectedSlot()
  {
    var selection;

    if (selection = self.timeline.getSelection()[0])
    {
      var values = self.timeline.getItem(selection.row),
          content = angular.fromJson(values.content.match(/<span class="secret">(.*)<\/span>/)[1]);

      $scope.original = {
        start: values.start,
        end: values.end,
        content: {
          recursive: content.recursive,
          state: content.state,
          id: content.id
        }
      };

      $scope.forms = {
        add: false,
        edit: true
      };

      $scope.slot = {
        start: {
          date: Dater.readableDate(values.start, $config.date.format),
          time: Dater.readableTime(values.start, $config.time.format)
        },
        end: {
          date: Dater.readableDate(values.end, $config.date.format),
          time: Dater.readableTime(values.end, $config.time.format)
        },
        state: content.state,
        recursive: content.recursive,
        id: content.id
      };

      return values;
    };
  };


  /**
   * Extract Slot ID of the selected slot
   */
  function selectedSlotID()
  {
    return angular.fromJson(selectedSlot().content).id;
  };


  /**
   * Timeline on select
   */
  function timelineOnSelect()
  {
    $scope.$apply(function()
    {
      $scope.selectedOriginal = selectedSlot();
    });
  };


  /**
   * Timeline on add
   */
  function timelineOnAdd()
  {
    var values = self.timeline.getItem(self.timeline.getSelection()[0].row);

    $scope.$apply(function()
    {
      $scope.forms = {
        add: true,
        edit: false
      };

      $scope.slot = {
        start: {
          date: new Date(values.start).toString('dd-MM-yyyy'),
          time: new Date(values.start).toString('HH:mm tt')
        },
        end: {
          date: new Date(values.end).toString('dd-MM-yyyy'),
          time: new Date(values.end).toString('HH:mm tt')
        },
        recursive: (values.group.match(/recursive/)) ? true : false
      };
    });
  };


  /**
   * Add slot trigger start view
   */
  $scope.slotAdd = function(slot)
  {
    $rootScope.loading = {
      status: true,
      message: $rootScope.ui.planning.addTimeSlot
    };

    Slots.add(
    {
      start: Date.parse(slot.start.date + ' ' + slot.start.time).getTime() / 1000,
      end: Date.parse(slot.end.date + ' ' + slot.end.time).getTime() / 1000,
      recursive: (slot.recursive) ? true : false,
      text: slot.state
    }, 
    $scope.user.id)
    .then(function (result)
    {
      $rootScope.notify({
        status: true,
        type: 'alert-success',
        message: $rootScope.ui.planboard.slotAdded
      });

      refreshTimeline();
    });
  };


  /**
   * Timeline on change
   */
  function timelineOnChange()
  {
    $rootScope.loading = {
      status: true,
      message: $rootScope.ui.planboard.changingSlot
    };

    var values = self.timeline.getItem(self.timeline.getSelection()[0].row);

    Slots.change($scope.original, 
    {
      start: values.start,
      end: values.end,
      content: angular.fromJson(values.content.match(/<span class="secret">(.*)<\/span>/)[1]), 
    }, 
    $scope.user.id)
    .then(function (result)
    {
      $rootScope.notify({
        status: true,
        type: 'alert-success',
        message: $rootScope.ui.planboard.slotChanged
      });

      refreshTimeline();
    });
  };


  /**
   * Change slot
   */
  $scope.slotChange = function(original, slot)
  {
    $rootScope.loading = {
      status: true,
      message: $rootScope.ui.profile.changingTimeslot
    };

    Slots.change($scope.original, 
    {
      start: Date.parse(slot.start.date + ' ' + slot.start.time),
      end: Date.parse(slot.end.date + ' ' + slot.end.time),
      recursive: (slot.recursive) ? true : false,
      text: slot.state,
      /**
       * REMOVE
       * Lose id and content later on!
       */
      id: (slot.id) ? slot.id : 0,
      content: angular.toJson({ 
        id: slot.id, 
        recursive: slot.recursive, 
        state: slot.state 
        })
    }, 
    $scope.user.id)
    .then(function (result)
    {
      $rootScope.notify({
        status: true,
        type: 'alert-success',
        message: $rootScope.ui.planboard.slotChanged
      });

      refreshTimeline();
    });
  };


  /**
   * Timeline on delete
   */
  function timelineOnDelete()
  {
    $rootScope.loading = {
      status: true,
      message: $rootScope.ui.planboard.deletingTimeslot
    };

    Slots.remove($scope.original, $scope.user.id)
    .then(function (result)
    {
      $rootScope.notify({
        status: true,
        type: 'alert-success',
        message: $rootScope.ui.planboard.timeslotDeleted
      });

      refreshTimeline();
    });
  };


  /**
   * Delete trigger start view
   */
  $scope.slotRemove = function()
  {
    $rootScope.loading = {
      status: true,
      message: $rootScope.ui.planboard.deletingTimeslot
    };

    Slots.remove($scope.original, $scope.user.id)
    .then(function (result)
    {
      $rootScope.notify({
        status: true,
        type: 'alert-success',
        message: $rootScope.ui.planboard.timeslotDeleted
      });

      refreshTimeline();
    });
  };


  /**
   * TODO
   * Look for ways to combine with other timeline refreshers
   *
   * Refresh timeline
   */
  function refreshTimeline ()
  {
    $rootScope.loading = {
      status: true,
      message: $rootScope.ui.planboard.refreshTimeline
    };

    $scope.slot = {};

    $scope.forms = {
      add: true,
      edit: false
    };

    Profile.getSlots($scope.user.id, 
    {
      start:  new Date($scope.timeline.range.start).getTime(),
      end:    new Date($scope.timeline.range.end).getTime()
    })
    .then(function(data)
    {
      $scope.slot = {};

      $scope.data.slots = data.slots;

      $scope.synced = data.synced;

      timeliner({
        start:  $scope.timeline.range.start,
        end:    $scope.timeline.range.end
      });

      $rootScope.loading = {
        status: false
      };
    });
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

      loadTimeline(periods.weeks[$scope.timeline.current.week]);
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

      loadTimeline(periods.weeks[$scope.timeline.current.week]);
    };

    $scope.timeline.range = {
      start:  periods.weeks[$scope.timeline.current.week].first.day,
      end:    periods.weeks[$scope.timeline.current.week].last.day
    };
  };


  /**
   * Generic data loader and timeline renderer
   */
  function loadTimeline (options)
  {
    $rootScope.loading = {
      status: true,
      message: $rootScope.ui.planboard.loadingTimeline
    };

    Profile.getSlots($scope.user.id, {
      start:  options.first.timeStamp,
      end:    options.last.timeStamp
    })
    .then(function(data)
    {
      $scope.data.slots = data.slots;

      $scope.synced = data.synced;

      timeliner({
        start:  options.first.day,
        end:    options.last.day
      });

      $rootScope.loading = {
        status: false
      };
    });
  };


  /**
   * Render timeline
   */
  function initTimeline ()
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

    angular.extend($scope.timeline.options, $config.timeline.options);

    setTimeout( function() 
    {
      self.timeline.draw(self.process(
          $scope.data.slots.data, 
          $scope.timeline.config
        ), $scope.timeline.options);
    }, 100);

    self.timeline.setVisibleChartRange($scope.timeline.options.start, $scope.timeline.options.end);

    $scope.synced = data.synced;
  };


  /**
   * Draw and limit timeline
   */
  function timeliner (options)
  {
    $scope.timeline = {
      current:  $scope.timeline.current,
      options: {
        start:  new Date(options.start),
        end:    new Date(options.end),
        min:    new Date(options.start),
        max:    new Date(options.end)
      },
      config: {
        states: $config.timeline.config.states
      },
      range: {
        start: $scope.timeline.range.start,
        end: $scope.timeline.range.end
      }
    };

    angular.extend($scope.timeline.options, $config.timeline.options);

    setTimeout( function ()
    {
      self.timeline.draw(
        self.process(
          $scope.data.slots.data, 
          $scope.timeline.config
        ), 
        $scope.timeline.options
      );
    }, 100);

    self.timeline.setVisibleChartRange($scope.timeline.options.start, $scope.timeline.options.end);
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
    self.timeline.zoom( $config.timeline.config.zoomValue );
  };


  /**
   * Timeline zoom out
   */
  $scope.timelineZoomOut = function ()
  {
    self.timeline.zoom( -$config.timeline.config.zoomValue );
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


/**
 * Profile prototypes
 */
profileCtrl.prototype = {
  constructor: profileCtrl,
  
  /**
   * Timeline data processing
   */
  process: function (data, config)
  {
    /**
     * Timedata container for all sort of slots
     */
    var timedata = [];

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
     * Process user slots
     */
    angular.forEach(data, function(slot, index)
    {
      /**
       * Push slot in the pool
       */
      timedata.push({
        start: Math.round(slot.start * 1000),
        end: Math.round(slot.end * 1000),
        group: (slot.recursive) ? wrapper('b') + 'Wekelijkse planning' + wrapper('recursive') : 
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
    });

    timedata.push({
      start: 0,
      end: 1,
      group: wrapper('b') + 'Wekelijkse planning' + wrapper('recursive'),
      content: '',
      className: null,
      editable: false
    });
    timedata.push({
      start: 0,
      end: 1,
      group: wrapper('a') + 'Planning' + wrapper('planning'),
      content: '',
      className: null,
      editable: false
    });

    return timedata;
  }
};



profileCtrl.$inject = ['$rootScope', '$scope', '$config', '$q', '$md5', 'data', 'Profile', '$route', 'Storage', 'Groups', 'Dater', '$location', '$window', 'Slots'];


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
          synced: new Date().getTime()
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
      start: params.start / 1000,
      end: params.end / 1000
    }).then(function (slots)
    {
      deferred.resolve({
        slots: slots,
        synced: new Date().getTime()
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
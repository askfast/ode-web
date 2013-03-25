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
      /**
       * Set current values
       */
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
    /**
     * If inline slot manager open close it
     */
    if ($scope.forms.add)
    {
      $scope.resetInlineForms();
    }
    /**
     * Open sesame open!
     */
    else
    {
      /**
       * Reset slot container
       */
      $scope.slot = {};
      /**
       * Set the view
       */
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
    /**
     * Reset slot container
     */
    $scope.slot = {};
    /**
     * Reset original container
     */
    $scope.original = {};
    /**
     * Reset views
     */
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
    /**
     * Kind of reset views
     */
    $scope.views = {
      profile:  false,
      edit:     false,
      password: false,
      timeline: false
    };
    /**
     * Set correct one true
     */
    $scope.views[hash] = true;
    /**
     * Check if it is user
     */
    $scope.views.user = ($rootScope.app.resources.uuid == $route.current.params.userId) ? true : false;
  };


  /**
   * Switch between the views and set hash ccordingly
   */
  $scope.setViewTo = function (hash)
  {
    /**
     * Let angular know things are chnaging
     */
    $scope.$watch($location.hash(), function()
    {
      /**
       * Set hash
       */
      $location.hash(hash);
      /**
       * Set view intern
       */
      setView(hash);
    });
  };


  /**
   * Save user
   */
  $scope.save = function(resources)
  {
    /**
     * Set preloader
     */
    $rootScope.loading = {
      status: true,
      message: $rootScope.ui.profile.saveProfile
    };
    /**
     * Save profile
     */
    Profile.save($route.current.params.userId, resources)
    .then(function(result)
    {
      /**
       * Set preloader for refresh loading
       */
      $rootScope.loading = {
        status: true,
        message: $rootScope.ui.profile.refreshing
      };
      /**
       * Determine if it is user
       */
      var flag = ($route.current.params.userId == $rootScope.app.resources.uuid) ? true : false;
      /**
       * Get fresh profile data
       */
      Profile.get($route.current.params.userId, flag)
      .then(function(data)
      {
        /**
         * Reload resources
         */
        $scope.data = data;
        /**
         * Turn off preloader
         */
        $rootScope.loading = {
          status: false
        };
        /**
         * Inform user
         */
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
    console.log('coming to change');
    /**
     * Checks on given passwords
     */
    if (passwords.new1 == '' || 
        passwords.new2 == '')
    {
      /**
       * Inform user for providing empty inputs
       */
      $rootScope.notify({
        status: true,
        type: 'alert-error',
        message: $rootScope.ui.profile.pleaseFill,
        permanent: true
      });
      return false;
    }
    if (passwords.new1 != passwords.new2)
    {
      /**
       * Inform user for providing empty inputs
       */
      $rootScope.notify({
        status: true,
        type: 'alert-error',
        message: $rootScope.ui.profile.passNotMatch,
        permanent: true
      });
      return false;
    }
    /**
     * Check if current password is correct
     */
    else if ($rootScope.app.resources.askPass == $md5.process(passwords.current))
    {
      /**
       * Set preloader
       */
      $rootScope.loading = {
        status: true,
        message: $rootScope.ui.profile.changingPass
      };
      /**
       * Save profile
       */
      Profile.changePassword(passwords)
      .then(function(result)
      {
        /**
         * Set preloader for refresh loading
         */
        $rootScope.loading = {
          status: true,
          message: $rootScope.ui.profile.refreshing
        };
        /**
         * Get fresh profile data
         */
        Profile.get($rootScope.app.resources.uuid, true)
        .then(function(data)
        {
          /**
           * Reload resources
           */
          $scope.data = data;
          /**
           * Set preloader
           */
          $rootScope.loading = {
            status: false
          };
          /**
           * Inform user
           */
          $rootScope.notify({
            status: true,
            type: 'alert-success',
            message: $rootScope.ui.profile.passChanged
          });
        });
      });
    }
    /**
     * Current password is wrong
     */
    else
    {
      /**
       * Inform user
       */
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
    /**
     * Do set range only if timeline is visible
     */
    if ($location.hash() == 'timeline')
    {
      /**
       * Get timeline range
       */
      var range = self.timeline.getVisibleChartRange();
      /**
       * Set ranges
       */
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
    /**
     * Get range from timeline
     */
    var range = self.timeline.getVisibleChartRange();
    /**
     * Let angular know about changes
     */
    $scope.$apply(function()
    {
      /**
       * Apply changes
       */
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
    /**
     * Init container
     */
    var selection;
    /**
     * Get selection info from timeline
     */
    if (selection = self.timeline.getSelection()[0])
    {
      /**
       * Init values and content of slot
       */
      var values = self.timeline.getItem(selection.row),
          content = angular.fromJson(values.content.match(/<span class="secret">(.*)<\/span>/)[1]);
      /**
       * Set original slot value
       */
      $scope.original = {
        start: values.start,
        end: values.end,
        content: {
          recursive: content.recursive,
          state: content.state,
          id: content.id
        }
      };
      /**
       * Switch to edit form view
       */
      $scope.forms = {
        add: false,
        edit: true
      };
      /**
       * Set selected slot for view
       */
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
      /**
       * Return values
       */
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
    /**
     * Let angular knows about it
     */
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
    /**
     * Get new slot and row information from timeline
     */
    var values = self.timeline.getItem(self.timeline.getSelection()[0].row);
    /**
     * Let angular know that model changed
     */
    $scope.$apply(function()
    {
      /**
       * Set the view
       */
      $scope.forms = {
        add: true,
        edit: false
      };
      /**
       * Set info in slot model
       */
      $scope.slot = {
        start: {
          date: new Date(values.start).toString('dd-MM-yyyy'),
          time: new Date(values.start).toString('HH:mm tt')
        },
        end: {
          date: new Date(values.end).toString('dd-MM-yyyy'),
          time: new Date(values.end).toString('HH:mm tt')
        },
        /**
         * Determine if it is recursive
         */
        recursive: (values.group.match(/recursive/)) ? true : false
      };
    });
  };


  /**
   * Add slot trigger start view
   */
  $scope.slotAdd = function(slot)
  {
    /**
     * Set preloader
     */
    $rootScope.loading = {
      status: true,
      message: $rootScope.ui.planning.addTimeSlot
    };
    /**
     * Add slot
     */
    Slots.add({
      start: Date.parse(slot.start.date + ' ' + slot.start.time).getTime() / 1000,
      end: Date.parse(slot.end.date + ' ' + slot.end.time).getTime() / 1000,
      recursive: (slot.recursive) ? true : false,
      text: slot.state
    }, $scope.user.id)
    .then(function (result)
    {
      /**
       * Inform user
       */
      $rootScope.notify({
        status: true,
        type: 'alert-success',
        message: $rootScope.ui.planboard.slotAdded
      });
      /**
       * Refresh timeline
       */
      refreshTimeline();
    });
  };


  /**
   * TODO
   * Finish it! No interaction needed actualty..
   * This can be redirected to edit slot form
   * 
   * Timeline on edit
   */
  function timelineOnEdit()
  {
    console.log('double click edit mode!');
  };


  /**
   * Timeline on change
   */
  function timelineOnChange()
  {
    /**
     * Set preloader
     */
    $rootScope.loading = {
      status: true,
      message: $rootScope.ui.planboard.changingSlot
    };
    /**
     * Get timeline item values
     */
    var values = self.timeline.getItem(self.timeline.getSelection()[0].row);
    /**
     * Add slot
     */
    Slots.change($scope.original, {
      start: values.start,
      end: values.end,
      content: angular.fromJson(values.content.match(/<span class="secret">(.*)<\/span>/)[1]), 
    }, $scope.user.id)
    .then(function (result)
    {
      /**
       * Inform user
       */
      $rootScope.notify({
        status: true,
        type: 'alert-success',
        message: $rootScope.ui.planboard.slotChanged
      });
      /**
       * Refresh timeline
       */
      refreshTimeline();
    });
  };


  /**
   * Change slot
   */
  $scope.slotChange = function(original, slot)
  {
    /**
     * Set preloader
     */
    $rootScope.loading = {
      status: true,
      message: $rootScope.ui.profile.changingTimeslot
    };
    /**
     * Add slot
     */
    Slots.change($scope.original, {
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
    }, $scope.user.id)
    .then(function (result)
    {
      /**
       * Inform user
       */
      $rootScope.notify({
        status: true,
        type: 'alert-success',
        message: $rootScope.ui.planboard.slotChanged
      });
      /**
       * Refresh timeline
       */
      refreshTimeline();
    });
  };


  /**
   * Timeline on delete
   */
  function timelineOnDelete()
  {
    /**
     * Set preloader
     */
    $rootScope.loading = {
      status: true,
      message: $rootScope.ui.planboard.deletingTimeslot
    };
    /**
     * Add slot
     */
    Slots.remove($scope.original, $scope.user.id)
    .then(function (result)
    {
      /**
       * Inform user
       */
      $rootScope.notify({
        status: true,
        type: 'alert-success',
        message: $rootScope.ui.planboard.timeslotDeleted
      });
      /**
       * Refresh timeline
       */
      refreshTimeline();
    });
  };


  /**
   * Delete trigger start view
   */
  $scope.slotRemove = function()
  {
    /**
     * Set preloader
     */
    $rootScope.loading = {
      status: true,
      message: $rootScope.ui.planboard.deletingTimeslot
    };
    /**
     * Add slot
     */
    Slots.remove($scope.original, $scope.user.id)
    .then(function (result)
    {
      /**
       * Inform user
       */
      $rootScope.notify({
        status: true,
        type: 'alert-success',
        message: $rootScope.ui.planboard.timeslotDeleted
      });
      /**
       * Refresh timeline
       */
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
    /**
     * Set loading to refresh
     */
    $rootScope.loading = {
      status: true,
      message: $rootScope.ui.planboard.refreshTimeline
    };
    /**
     * Reset slot container
     */
    $scope.slot = {};
    /**
     * Set view to default slot add
     */
    $scope.forms = {
      add: true,
      edit: false
    };
    /**
     * Ask for fresh data
     */
    Profile.getSlots($scope.user.id, {
      start:  new Date($scope.timeline.range.start).getTime(),
      end:    new Date($scope.timeline.range.end).getTime()
    })
    .then(function(data)
    {
      /**
       * Reset slot container
       */
      $scope.slot = {};
      /**
       * Set scope
       */
      $scope.data.slots = data.slots;
      /**
       * Set sync date
       */
      $scope.synced = data.synced;
      /**
       * Adjust timeline for new period
       */
      timeliner({
        start:  $scope.timeline.range.start,
        end:    $scope.timeline.range.end
      });
      /**
       * Turn off preloader
       */
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
    /**
     * Check if it is the current week
     */
    if ($scope.timeline.current.week != new Date().getWeek())
    {
      /**
       * Load timeline
       */
      loadTimeline(periods.weeks[new Date().getWeek()]);
      /**
       * Set ranges
       */
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
      /**
       * Load timeline
       */
      loadTimeline(periods.weeks[$scope.timeline.current.week]);
    };
    /**
     * Set ranges
     */
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
      /**
       * Load timeline
       */
      loadTimeline(periods.weeks[$scope.timeline.current.week]);
    };
    /**
     * Set ranges
     */
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
    /**
     * Set preloader
     */
    $rootScope.loading = {
      status: true,
      message: $rootScope.ui.planboard.loadingTimeline
    };
    /**
     * Fetch new data
     */
    Profile.getSlots($scope.user.id, {
      start:  options.first.timeStamp,
      end:    options.last.timeStamp
    })
    .then(function(data)
    {
      /**
       * Set scope
       */
      $scope.data.slots = data.slots;
      /**
       * Set synced
       */
      $scope.synced = data.synced;
      /**
       * Adjust timeline for new period
       */
      timeliner({
        start:  options.first.day,
        end:    options.last.day
      });
      /**
       * Turn off preloader
       */
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
    /**
     * Set defaults for timeline
     */
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
    /**
     * States for dropdown
     */
    var states = {};
    angular.forEach($scope.timeline.config.states, function(state, key)
    {
      states[key] = state.label;
    });
    $scope.states = states;
    /**
     * TODO
     * Still needed?
     * 
     * Create DOM for timeline
     */
    $('#timeline').html('');
    $('#timeline').append('<div id="userTimeline"></div>');
    /**
     * Where is my timeline landlord?
     */
    self.timeline = new links.Timeline(document.getElementById('userTimeline'));
    /**
     * Init timeline listeners
     */
    links.events.addListener(self.timeline, 'rangechanged',  timelineGetRange);
    links.events.addListener(self.timeline, 'edit',          timelineOnEdit);
    links.events.addListener(self.timeline, 'add',           timelineOnAdd);
    links.events.addListener(self.timeline, 'delete',        timelineOnDelete);
    links.events.addListener(self.timeline, 'change',        timelineOnChange);
    links.events.addListener(self.timeline, 'select',        timelineOnSelect);
    /**
     * Run timeline
     * Merge options with defaults
     */
    angular.extend($scope.timeline.options, $config.timeline.options);
    /**
     * Draw timeline
     *
     * Use setTimeout to prevent rendering issue
     * of DOM not ready while drawing data in timeline..
     */
    setTimeout( function() 
    {
      self.timeline.draw(self.process(
          $scope.data.slots.data, 
          $scope.timeline.config
        ), $scope.timeline.options);
    }, 100);
    /**
     * Set range dynamically
     */
    self.timeline.setVisibleChartRange($scope.timeline.options.start, $scope.timeline.options.end);
    /**
     * Set synced
     */
    $scope.synced = data.synced;
  };


  /**
   * Draw and limit timeline
   */
  function timeliner (options)
  {
    /**
     * Timeline options
     */
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
    /**
     * Merge options with defaults
     */
    angular.extend($scope.timeline.options, $config.timeline.options);
    /**
     * Draw timeline
     */
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
    /**
     * Set range dynamically
     */
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
    /**
     * If no hashes or userId given given in url
     */
    if (!$route.current.params.userId || !$location.hash())
    {
      /**
       * Set user and hash and adjust url
       */
      $location.path('/profile/' + $rootScope.app.resources.uuid)
      .hash('profile');
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



profileCtrl.$inject = ['$rootScope', '$scope', '$config', '$q', 
                      '$md5', 'data', 'Profile', '$route', 'Storage', 'Groups', 'Dater', '$location', '$window', 'Slots'];



'use strict';

WebPaige.
factory('Profile', function ($resource, $config, $q, $route, $md5, Storage, $rootScope, Groups, Slots) 
{

  /**
   * Profile resource
   */
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


  /**
   * Register resource
   */
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


  /**
   * Resources resource
   */
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

    /**
     * Register user
     */
    Register.profile({
      uuid: profile.username,
      pass: $md5.process(profile.password),
      name: profile.name,
      phone: profile.PhoneAddress
    }, function (registered) 
    {
      console.log('registered ->', registered);
      
      /**
       * Give user a role
       */
      Profile.prototype.role(profile.username, profile.role.id)
      .then(function(roled)
      {
        /**
         * Add missing resources to the account of user
         */
        Profile.prototype.save(profile.username, {
          EmailAddress: profile.EmailAddress,
          PostAddress: profile.PostAddress,
          PostZip: profile.PostZip,
          PostCity: profile.PostCity
        }).then(function(resourced)
        {
          /**
           * Add user to given groups
           */
          var calls = [];
          /**
           * Push selection into a calls pool
           */
          angular.forEach(profile.groups, function(group, index)
          {
            calls.push(Groups.addMember({
              id: profile.username,
              group: group
            }));
          });
          /**
           * Loop through and make calls
           */
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
        });
      });
    });
   
    return deferred.promise;
  };


  /**
   * Set role of given user
   */
  Profile.prototype.role = function (id, role) 
  {    
    var deferred = $q.defer();
    /**
     * Set role
     */
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
    /**
     * Change passwords
     */
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
    /**
     * Get profile data
     */
    Profile.get({id: id}, function (result) 
    {
      /**
       * If localize is true save it to localStorage
       */
      if (localize)
      {
        Storage.add('resources', angular.toJson(result));
      };
      /**
       * Return promised
       */
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

    /**
     * Get profile data
     */
    Profile.prototype.get(id, localize)
    .then(function (resources)
    {
      /**
       * Get user slots
       */
      Slots.user({
        user: id,
        start: params.start,
        end: params.end
      }).then(function (slots)
      {
        /**
         * Return promised baby!
         * Extend resources with slots
         */
        deferred.resolve(angular.extend(resources, {
          slots: slots,
          synced: new Date().getTime()
        }));        
      });
    });

    return deferred.promise;
  };


  /**
   * Get user slots
   */
  Profile.prototype.getSlots = function (id, params) 
  {
    var deferred = $q.defer();

    /**
     * Get user slots
     */
    Slots.user({
      user: id,
      start: params.start / 1000,
      end: params.end / 1000
    }).then(function (slots)
    {
      /**
       * Return promised baby!
       * Extend resources with slots
       */
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

    /**
     * Save profile data
     */
    Profile.save({id: id}, resources, function(result) 
    {
      /**
       * Return result
       */
      deferred.resolve(result);
    });
    /**
     * Return promise
     */
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
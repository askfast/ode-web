'use strict';

/**
 * Profile Controller
 */
function profileCtrl($rootScope, $scope, $config, $q, $md5, data, Profile, 
$route, Storage, Groups, Dater, $location)
{
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
     * Let angulr know things are chnaging
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
   * Set default alerts
   */
  $scope.alert = {
    edit: {
      display: false,
      type: '',
      message: ''
    },
    password: {
      display: false,
      type: '',
      message: ''
    },
    timeline: {
      display: false,
      type: '',
      message: ''
    }
  };


  /**
   * Default values for passwords
   */
  $scope.passwords = {
    current: '',
    new1: '',
    new2: ''
  };


  /**
   * Save user
   */
  $scope.save = function(resources)
  {
    /**
     * Set preloader
     */
    $rootScope.loading = true;
    /**
     * Save profile
     */
    Profile.save($route.current.params.userId, resources)
    .then(function(result)
    {
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
         * Set preloader
         */
        $rootScope.loading = false;
        /**
         * Inform user
         */
        $scope.alert = {
          edit: {
            display: true,
            type: 'alert-success',
            message: 'Profile data is succesfully changed.'
          }
        };
      });
    });
  };


  /**
   * Change passwords
   */
  $scope.change = function(passwords)
  {
    /**
     * Checks on given passwords
     */
    if (passwords.new1 == '' || 
        passwords.new2 == '')
    {
      /**
       * Inform user for providing empty inputs
       */
      $scope.alert = {
        password: {
          display: true,
          type: 'alert-error',
          message: 'Please fill all fields!'
        }
      };
      return false;
    }
    if (passwords.new1 != passwords.new2)
    {
      /**
       * Inform user for providing empty inputs
       */
      $scope.alert = {
        password: {
          display: true,
          type: 'alert-error',
          message: 'Provided passwords do not match! Please try it again.'
        }
      };
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
      $rootScope.loading = true;
      /**
       * Save profile
       */
      Profile.changePassword(passwords)
      .then(function(result)
      {
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
          $rootScope.loading = false;
          /**
           * Inform user
           */
          $scope.alert = {
            password: {
              display: true,
              type: 'alert-success',
              message: 'Password is succesfully changed.'
            }
          };
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
      $scope.alert = {
        password: {
          display: true,
          type: 'alert-error',
          message: 'Given current password is wrong! Please try it again.'
        }
      };
    };
  };



 

  // /**
  //  * TODO
  //  * Automatically initialize this function
  //  */
  // // if ($location.hash() == 'timeline')
  // // {
  // //   render();
  // // }


  // /**
  //  * TODO
  //  * Define a better way with dealing localStorage and Resolver
  //  *
  //  * Controller render
  //  */
  // // function render()
  // // {

  //   /**
  //    * Set defaults for timeline
  //    */
  //   $scope.timeline = {
  //     current: current,
  //     options: {
  //       start:  new Date(periods.weeks[current.week].first.day),
  //       end:    new Date(periods.weeks[current.week].last.day),
  //       min:    new Date(periods.weeks[current.week].first.day),
  //       max:    new Date(periods.weeks[current.week].last.day)
  //     },
  //     range: {
  //       start: periods.weeks[current.week].first.day,
  //       end: periods.weeks[current.week].last.day
  //     },
  //     config: {
  //       states: $config.timeline.config.states
  //     }
  //   };

  //   /**
  //    * Where is my timeline landlord?
  //    */
  //   $('#timeline_').html('');
  //   $('#timeline_').append('<div id="userTimeline"></div>');

  //   var timeline2 = new links.Timeline(document.getElementById('userTimeline'));
  //   /**
  //    * Init timeline listeners
  //    */
  //   links.events.addListener(timeline2, 'rangechanged',  timelineGetRange);
  //   links.events.addListener(timeline2, 'edit',          timelineOnEdit);
  //   links.events.addListener(timeline2, 'add',           timelineOnAdd);
  //   links.events.addListener(timeline2, 'delete',        timelineOnDelete);
  //   links.events.addListener(timeline2, 'change',        timelineOnChange);
  //   links.events.addListener(timeline2, 'select',        timelineOnSelect);
  //   /**
  //    * Run timeline
  //    */
  //   /**
  //    * Merge options with defaults
  //    */
  //   angular.extend($scope.timeline.options, $config.timeline.options);
  //   /**
  //    * Draw timeline
  //    */
  //   // console.log(
  //   //   self.process(
  //   //     $scope.data.slots.data, 
  //   //     $scope.timeline.config
  //   //   ), 
  //   //   $scope.timeline.options
  //   // );
    
  //   //console.warn('self 1 ->', self);

  //   var tdata = 
  //     self.process(
  //       $scope.data.slots.data, 
  //       $scope.timeline.config
  //     );
  //   var opts = $scope.timeline.options;

  //   // timeline2.draw([], opts);

  //   // timeline2.setData(tdata);

  //   //timeline2.draw(tdata, opts);

  //  // console.warn('db from timeline ->', timeline2.getData());

  //   timeline2.draw(tdata, opts);
  //   //timeline2.deleteAllItems();
  //   timeline2.setData(tdata);
  //   timeline2.redraw();
  //   console.warn('timeline ->', timeline2);
    
  //   //console.warn('self 2 ->', self);

  //   /**
  //    * Set range dynamically
  //    */
  //   //timeline2.setVisibleChartRange($scope.timeline.options.start, $scope.timeline.options.end);
  // // };


  /**
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
      /**
       * Daterange
       */
      $scope.daterange =  new Date(new Date(range.start).getTime()).toString('dd-MM-yyyy') + 
                          ' / ' + 
                          new Date(new Date(range.end).getTime()).toString('dd-MM-yyyy');
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
       * Switch over type of slot
       */
      switch (content.type)
      {
        case 'slot':
          $scope.views = {
            slot: {
              add: false,
              edit: true
            },
            group: false,
            wish: false,
            member: false
          };
        break;
        case 'group':
          $scope.views = {
            slot: {
              add: false,
              edit: false
            },
            group: true,
            wish: false,
            member: false
          };
        break;
        case 'wish':
          $scope.views = {
            slot: {
              add: false,
              edit: false
            },
            group: false,
            wish: true,
            member: false
          };
        break;
        case 'member':
          $scope.views = {
            slot: {
              add: false,
              edit: false
            },
            group: false,
            wish: false,
            member: true
          };
        break;
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
       * TODO
       * Check if this can be combined with switch later on!
       *
       * Set extra data based slot type for inline form
       */
      if (content.type == 'group') 
      {
        $scope.slot.diff = content.diff;
        $scope.slot.group = content.group;
      }
      else if (content.type == 'wish')
      {
        $scope.slot.wish = content.wish;
        $scope.slot.group = content.group;
        $scope.slot.groupId = content.groupId;
      }
      else if (content.type == 'member')
      {
        $scope.slot.member = content.mid;
      }
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
      $scope.views = {
        slot: {
          add: true,
          edit: false
        },
        group: false,
        wish: false,
        member: false
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
  $scope.add = function(slot)
  {
    /**
     * Set preloader
     */
    $rootScope.loading = true;
    /**
     * Add slot
     */
    Slots.add({
      start: Date.parse(slot.start.date + ' ' + slot.start.time).getTime() / 1000,
      end: Date.parse(slot.end.date + ' ' + slot.end.time).getTime() / 1000,
      recursive: (slot.recursive) ? true : false,
      text: slot.state
    }, $rootScope.app.resources.uuid)
    .then(function (result)
    {
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
    $rootScope.loading = true;

    var values = self.timeline.getItem(self.timeline.getSelection()[0].row);
    /**
     * Add slot
     */
    Slots.change($scope.original, {
      start: values.start,
      end: values.end,
      content: angular.fromJson(values.content.match(/<span class="secret">(.*)<\/span>/)[1]), 
    }, $rootScope.app.resources.uuid)
    .then(function (result)
    {
      /**
       * Refresh timeline
       */
      refreshTimeline();
    });
  };


  /**
   * Change slot
   */
  $scope.change = function(original, slot)
  {
    /**
     * Set preloader
     */
    $rootScope.loading = true;
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
    }, $rootScope.app.resources.uuid)
    .then(function (result)
    {
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
    $rootScope.loading = true;
    /**
     * Add slot
     */
    Slots.delete($scope.original, $rootScope.app.resources.uuid)
    .then(function (result)
    {
      /**
       * Refresh timeline
       */
      refreshTimeline();
    });
  };


  /**
   * Delete trigger start view
   */
  $scope.delete = function()
  {
    /**
     * Set preloader
     */
    $rootScope.loading = true;
    /**
     * Add slot
     */
    Slots.delete($scope.original, $rootScope.app.resources.uuid)
    .then(function (result)
    {
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
     * Reset slot container
     */
    $scope.slot = {};
    /**
     * Set view to default slot add
     */
    $scope.views = {
      slot: {
        add: true,
        edit: false
      },
      group: false,
      wish: false,
      member: false
    };
    /**
     * Ask for fresh data
     */
    Slots.all({
      groupId:  $scope.timeline.current.group,
      division: $scope.timeline.current.division,
      layouts:  $scope.timeline.current.layouts,
      month:    $scope.timeline.current.month,
      stamps: {
        start:  new Date($scope.timeline.range.start).getTime(),
        end:    new Date($scope.timeline.range.end).getTime()
      },
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
      $scope.data = data;
      /**
       * Adjust timeline for new period
       */
      timeliner({
        start:  $scope.timeline.range.start,
        end:    $scope.timeline.range.end
      });
      /**
       * Set preloader
       */
      $rootScope.loading = false;
    });    
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
  data: function (Profile, $route) 
  {
    return Profile.get($route.current.params.userId, false);
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

    //console.warn('timedata ->', angular.toJson(timedata));

    return timedata;
  }
};



profileCtrl.$inject = ['$rootScope', '$scope', '$config', '$q', 
                      '$md5', 'data', 'Profile', '$route', 'Storage', 'Groups', 'Dater', '$location'];



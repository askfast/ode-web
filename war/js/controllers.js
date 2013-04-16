'use strict';


angular.module('WebPaige.Controllers', [])


/**
 * Login controller
 */
.controller('login', 
[
	'$rootScope', '$location', '$q', '$scope', 'Session', 'User', 'Groups', 'Messages', 'Storage', '$routeParams', 'Settings', 'Profile', 'MD5', 
	function ($rootScope, $location, $q, $scope, Session, User, Groups, Messages, Storage, $routeParams, Settings, Profile, MD5) 
	{
	  /**
	   * Self this
	   */
		var self = this;

	  /**
	   * Redirect to dashboard if logged in
	   */
	  // if (Session.check()) redirectToDashboard();


	  /**
	   * Set default views
	   */
		if ($routeParams.uuid && $routeParams.key)
	  {
			$scope.views = {
				changePass: true,
			};

			$scope.changepass = {
				uuid: $routeParams.uuid,
				key:  $routeParams.key,
			}
		}
	  else
	  {
			$scope.views = {
				login: true,
				forgot: false
			};
		};


	  /**
	   * KNRM users for testing
	   */
	  if ($rootScope.config.demo_users) $scope.demo_users = demo_users;


	  /**
	   * Real KNRM users for testing
	   */
	   $scope.knrmLogin = function (user)
	   {
	     $('#login button[type=submit]')
	       .text('Login..')
	       .attr('disabled', 'disabled');

	    self.auth(user.uuid, user.resources.askPass);
	   };

	  
	  /**
	   * Set default alerts
	   */
	  $scope.alert = {
	    login: {
	      display: false,
	      type: '',
	      message: ''
	    },
	    forgot: {
	      display: false,
	      type: '',
	      message: ''
	    }
	  };


	  /**
	   * Init rootScope app info container
	   */
	  if (!Storage.session.get('app')) Storage.session.add('app', '{}');


	  /**
	   * TODO
	   * Lose this jQuery stuff later on!
	   * 
	   * Jquery solution of toggling between login and app view
	   */
	  $('.navbar').hide();
	  $('#footer').hide();
	  $('#watermark').hide();
	  $('body').css({
	    'background': 'url(../' + $rootScope.config.profile.background + ') no-repeat center center fixed',
	    'backgroundSize': 'cover'
	  });


	  /**
	   * TODO
	   * use native JSON functions of angular and Store service
	   */
	  var logindata = angular.fromJson(Storage.get('logindata'));

	  if (logindata && logindata.remember) $scope.logindata = logindata;


	  /**
	   * TODO
	   * Remove unneccessary DOM manipulation
	   * Use cookies for user credentials
	   * 
	   * Login trigger
	   */
	  $scope.login = function()
	  {
	    $('#alertDiv').hide();

	    if (!$scope.logindata ||
	        !$scope.logindata.username || 
	        !$scope.logindata.password)
	    {
	      $scope.alert = {
	        login: {
	          display: true,
	          type: 'alert-error',
	          message: $rootScope.ui.login.alert_fillfiled
	        }
	      };

	      $('#login button[type=submit]')
	        .text('Login')
	        .removeAttr('disabled');

	      return false;     
	    };

	    $('#login button[type=submit]')
	      .text('Login..')
	      .attr('disabled', 'disabled');

	    Storage.add('logindata', angular.toJson({
	      username: $scope.logindata.username,
	      password: $scope.logindata.password,
	      remember: $scope.logindata.remember
	    }));

	    self.auth( $scope.logindata.username, MD5($scope.logindata.password ));
	  };


	  /**
	   * Authorize user
	   */
	  self.auth = function (uuid, pass)
	  {
	    User.login(uuid.toLowerCase(), pass)
	    .then(function (result)
		  {
	      if (result.status == 400)
	      {
	        $scope.alert = {
	          login: {
	            display: true,
	            type: 'alert-error',
	            message: $rootScope.ui.login.alert_wrongUserPass
	          }
	        };

	        $('#login button[type=submit]')
	          .text('Login')
	          .removeAttr('disabled');

	        return false;
	      }
	      else
	      {
	        Session.set(result["X-SESSION_ID"]);

	        self.preloader();
	      };
		  });
	  };


	  /**
	   * TODO
	   * What happens if preloader stucks?
	   * Optimize preloader and messages
	   * 
	   * Initialize preloader
	   */
	  self.preloader = function()
	  {
	    $('#login').hide();
	    $('#download').hide();
	    $('#preloader').show();

	    self.progress(30, $rootScope.ui.login.loading_User);

	    User.resources()
	    .then(function (resources)
	    {
	      if (resources.error)
	      {
	        console.warn('error ->', resources);
	      }
	      else
	      {
	        $rootScope.app.resources = resources;

	        self.progress(70, $rootScope.ui.login.loading_Group);

	        Groups.query(true)
	        .then(function (groups)
	        {
	          if (groups.error)
	          {
	            console.warn('error ->', groups);
	          }
	          else
	          {
	            var settings  = angular.fromJson(resources.settingsWebPaige) || {},
	                sync      = false,
	                parenting = false,
	                defaults  = $rootScope.config.defaults.settingsWebPaige,
	                _groups   = function (groups)
	                {
	                  var _groups = {};
	                  angular.forEach(groups, function (group, index) { _groups[group.uuid] = true; });
	                  return _groups;
	                };

	            // Check if there is any settings at all
	            if (settings != null || settings != undefined)
	            {
	              // check for user settigns-all
	              if (settings.user)
	              {
	                // check for user-language settings
	                if (settings.user.language)
	                {
	                  // console.warn('user HAS language settings');
	                  $rootScope.changeLanguage(angular.fromJson(resources.settingsWebPaige).user.language);
	                  defaults.user.language = settings.user.language;
	                }
	                else
	                {
	                  // console.warn('user has NO language!!');
	                  $rootScope.changeLanguage($rootScope.config.defaults.settingsWebPaige.user.language);
	                  sync = true;
	                };             
	              }
	              else
	              {
	                // console.log('NO user settings at all !!');
	                sync = true;
	              };

	              // check for app settings-all
	              if (settings.app)
	              {
	                // check for app-widget settings
	                if (settings.app.widgets)
	                {
	                  // check for app-widget-groups setting
	                  if (settings.app.widgets.groups)
	                  {
	                    // console.warn('user HAS app widgets groups settings');
	                    defaults.app.widgets.groups = settings.app.widgets.groups;
	                  }
	                  else
	                  {
	                    // console.warn('user has NO app widgets groups!!');
	                    defaults.app.widgets.groups = _groups(groups);
	                    sync = true;
	                  }
	                }
	                else
	                {
	                  // console.warn('user has NO widget settings!!');
	                  defaults.app.widgets = { groups: _groups(groups) };
	                  sync = true;
	                };

	                // check for app group setting
	                if (settings.app.group && settings.app.group != undefined)
	                {
	                  // console.warn('user HAS app first group setting');
	                  defaults.app.group = settings.app.group;
	                }
	                else
	                {
	                  // console.warn('user has NO first group setting!!');
	                  parenting = true;
	                  sync      = true;
	                };          
	              }
	              else
	              {
	                // console.log('NO app settings!!');
	                defaults.app = { widgets: { groups: _groups(groups) } };
	                sync = true;
	              };
	            }
	            else
	            {
	              // console.log('NO SETTINGS AT ALL!!');
	              defaults = {
	                user: $rootScope.config.defaults.settingsWebPaige.user,
	                app: {
	                  widgets: {
	                    groups: _groups(groups)
	                  },
	                  group: groups[0].uuid
	                }
	              };
	              sync = true;
	            };

	            // sync settings with missing parts also parenting check
	            if (sync)
	            {
	              if (parenting)
	              {
	                // console.warn('setting up parent group for the user');

	                Groups.parents()
	                .then(function (_parent)
	                {
	                  // console.warn('parent group been fetched ->', _parent);

	                  if (_parent != null)
	                  {
	                    // console.warn('found parent parent -> ', _parent);

	                    defaults.app.group = _parent;
	                  }
	                  else
	                  {
	                    // console.warn('setting the first group in the list for user ->', groups[0].uuid);

	                    defaults.app.group = groups[0].uuid;
	                  };
	                                
	                  // console.warn('SAVE ME (with parenting) ->', defaults);

	                  Settings.save(resources.uuid, defaults)
	                  .then(function (setted)
	                  {
	                    User.resources()
	                    .then(function (got)
	                    {
	                      // console.log('gotted (with setting parent group) ->', got);
	                      $rootScope.app.resources = got;

	                      finalize();
	                    })
	                  });

	                });
	              }
	              else
	              {              
	                // console.warn('SAVE ME ->', defaults);
	                
	                defaults.app.group = groups[0].uuid;

	                Settings.save(resources.uuid, defaults)
	                .then(function (setted)
	                {
	                  User.resources()
	                  .then(function (got)
	                  {
	                    // console.log('gotted ->', got);
	                    $rootScope.app.resources = got;

	                    finalize();
	                  })
	                });
	              }
	            }
	            else
	            {
	              finalize();
	            }
	          };
	        });
	      };
	    });
	  };


	  /**
	   * Finalize the preloading
	   */
	  function finalize ()
	  {
	    // console.warn( 'settings ->',
	    //               'user ->', angular.fromJson($rootScope.app.resources.settingsWebPaige).user,
	    //               'widgets ->', angular.fromJson($rootScope.app.resources.settingsWebPaige).app.widgets,
	    //               'group ->', angular.fromJson($rootScope.app.resources.settingsWebPaige).app.group);

	    self.progress(100, $rootScope.ui.login.loading_everything);

	    self.redirectToDashboard();

	    self.getMessages();

	    self.getMembers();    
	  }

	  /**
	   * TODO
	   * Implement an error handling
	   *
	   * Get members list (SILENTLY)
	   */
	  self.getMembers = function ()
	  {
	    var groups = Storage.local.groups();

	    Groups.query()
	    .then(function (groups)
	    {
	      var calls = [];

	      angular.forEach(groups, function (group, index)
	      {
	        calls.push(Groups.get(group.uuid));
	      });

	      $q.all(calls)
	      .then(function (result)
	      {
	        // console.warn('members ->', result);
	        Groups.uniqueMembers();
	      });
	    });
	  };


	  /**
	   * TODO
	   * Implement an error handling
	   *
	   * Get messages (SILENTLY)
	   */
	  self.getMessages = function ()
	  {
	    Messages.query()
	    .then(function (messages)
	    {
	      if (messages.error)
	      {
	        console.warn('error ->', messages);
	      }
	      else
	      {
	        $rootScope.app.unreadMessages = Messages.unreadCount();

	        Storage.session.unreadMessages = Messages.unreadCount();
	      };
	    });
	  };


	  /**
	   * Redirect to dashboard
	   */
	  self.redirectToDashboard = function ()
	  {
	    $location.path('/dashboard');

	    setTimeout(function ()
	    {
	      $('body').css({ 'background': 'none' });
	      $('.navbar').show();
	      // $('#mobile-status-bar').show();
	      // $('#notification').show();
	      if (!$rootScope.browser.mobile) $('#footer').show();
	      $('#watermark').show();
	      $('body').css({ 'background': 'url(../img/bg.jpg) repeat' });
	    }, 100);
	  };


	  /**
	   * Progress bar
	   */
	  self.progress = function (ratio, message)
	  {
	    $('#preloader .progress .bar').css({ width: ratio + '%' }); 
	    $('#preloader span').text(message);    
	  };


	  /**
	   * RE-FACTORY
	   * TODO
	   * Make button state change!
	   * Finish it!
	   * 
	   * Forgot password
	   */
		$scope.forgot = function ()
	  {
			$('#forgot button[type=submit]').text('setting ...').attr('disabled', 'disabled');

			User.password($scope.remember.id)
	    .then(function (result)
			{
				if (result == "ok")
	      {
					$scope.alert = {
						forget : {
							display : true,
							type : 'alert-success',
							message : 'Please check your email to reset your password!'
						}
					};
				}
	      else 
	      {
					$scope.alert = {
						forget : {
							display : true,
							type : 'alert-error',
							message : 'Error, we can not find this account !'
						}
					};
				};

				$('#forgot button[type=submit]')
	        .text('change password')
	        .removeAttr('disabled');
			});
		};


	  /**
	   * RE-FACTORY
	   * Change password
	   */
		self.changePass =  function (uuid, newpass, key)
	  {
			User.changePass(uuid, newpass, key)
	    .then(function (result)
	    {
				if(result.status == 400 || result.status == 500 || result.status == 409)
	      {
					$scope.alert = {
						changePass : {
							display : true,
							type : 'alert-error',
							message : 'Something wrong with password changing!'
						}
					};
				}
	      else
	      { // successfully changed
					$scope.alert = {
						changePass : {
							display : true,
							type : 'alert-success',
							message : 'Password changed!'
						}
					}; 
					
					$location.path( "/message" );
				};

				$('#changePass button[type=submit]')
	        .text('change password')
	        .removeAttr('disabled');
			})
		};


	  /**
	   * RE-FACTORY
	   * Change password
	   */
		$scope.changePass = function ()
	  {
			$('#alertDiv').hide();

			if (!$scope.changeData || !$scope.changeData.newPass || !$scope.changeData.retypePass)
	    {
				$scope.alert = {
					changePass : {
						display : true,
						type : 'alert-error',
						message : 'Please fill all fields!'
					}
				};

				$('#changePass button[type=submit]')
	        .text('change password')
	        .removeAttr('disabled');

				return false;
			}
	    else if ($scope.changeData.newPass != $scope.changeData.retypePass)
	    {
				$scope.alert = {
					changePass : {
						display : true,
						type : 'alert-error',
						message : 'Please make the reType password is indentical !'
					}
				};

				$('#changePass button[type=submit]')
	        .text('change password')
	        .removeAttr('disabled');

				return false;
			};

			$('#changePass button[type=submit]')
	      .text('changing ...')
	      .attr('disabled', 'disabled');

			self.changePass($scope.changepass.uuid, MD5($scope.changeData.newPass), $scope.changepass.key);
		};

	}
])



/**
 * Logout controller
 */
.controller('logout', 
[
	'$rootScope', '$scope', '$window', 'Session', 'User', 'Storage', 
	function ($rootScope, $scope, $window, Session, User, Storage) 
	{
	  $('.navbar').hide();
	  $('#footer').hide();

	  var logindata = angular.fromJson(Storage.get('logindata'));

		User.logout()
		.then(function (result)
		{
	    if (result.error)
	    {
	      console.warn('error ->', result);
	    }
	    else
	    {
	      Storage.clearAll();

	      Storage.session.clearAll();

	      Storage.add('logindata', angular.toJson(logindata));

	      $window.location.href = 'logout.html';
	    };
		});
	}
])


/**
 * Dashboard controller
 */
.controller('dashboard', 
[
	'$scope', '$rootScope', '$q', 'Dashboard', 'Slots', 'Dater', 'Storage', 'Settings', 'Profile', 
	function ($scope, $rootScope, $q, Dashboard, Slots, Dater, Storage, Settings, Profile) 
	{
	  /**
	   * Fix styles
	   */
	  $rootScope.fixStyles();


	  /**
	   * Defaults for loaders
	   */
	  $scope.loading = {
	    pies:   true,
	    alerts: true
	  };
	  

	  /**
	   * Defaults for toggler
	   */
	  $scope.more = {
	    status: false,
	    text:   'show more' 
	  };


	  /**
	   * TODO
	   * Check somewhere that user-settings widget-groups are synced with the
	   * real groups list and if a group is missing in settings-groups add by
	   * default!
	   */
	  var groups    = Storage.local.groups(),
	      settings  = Storage.local.settings(),
	      selection = {};

	  angular.forEach(Storage.local.settings().app.widgets.groups, function (value, group)
	  {
	    selection[group] = value;
	  });

	  $scope.popover = {
	    groups: groups,
	    selection: selection
	  };


	  /**
	   * Get group overviews
	   */
	  function getOverviews ()
	  {
	    Dashboard.pies()
	    .then(function (pies)
	    {
	      if (pies.error)
	      {
	        $rootScope.notifier.error('Error with getting group overviews.');
	        console.warn('error ->', result);
	      }
	      else
	      {
	        $scope.shortageHolders = {};

	        $scope.loading.pies = false;

	        $scope.periods = {
	          start:  pies[0].weeks.current.start.date,
	          end:    pies[0].weeks.next.end.date
	        };

	        angular.forEach(pies, function (pie, index)
	        {
	          if (pie.weeks.current.state.diff == null) pie.weeks.current.state.diff = 0;
	          if (pie.weeks.current.state.wish == null) pie.weeks.current.state.wish = 0;
	              
	          if (pie.weeks.current.state.diff > 0)
	          {
	            pie.weeks.current.state.cls = 'more';
	          }
	          else if (pie.weeks.current.state.diff == 0)
	          {
	            pie.weeks.current.state.cls = 'even';
	          }
	          else if (pie.weeks.current.state.diff < 0)
	          {
	            pie.weeks.current.state.cls = 'less';
	          };

	          pie.weeks.current.state.start = (pie.weeks.current.state.start != undefined) 
	                                          ? new Date(pie.weeks.current.state.start * 1000).toString($rootScope.config.formats.datetime)
	                                          : 'undefined';

	          pie.weeks.current.state.end   = (pie.weeks.current.state.end != undefined)
	                                          ? new Date(pie.weeks.current.state.end * 1000).toString($rootScope.config.formats.datetime)
	                                          : 'undefined';
	          
	          pie.shortages = {
	            current:  pie.weeks.current.shortages,
	            next:     pie.weeks.next.shortages,
	            total:    pie.weeks.current.shortages.length + pie.weeks.next.shortages.length
	          };

	          pie.state = pie.weeks.current.state;

	          delete(pie.weeks.current.shortages);
	          delete(pie.weeks.current.state);

	          $scope.shortageHolders['shortages-' + pie.id] = false;
	        });

	        $scope.pies = pies;
	      };
	    })
	    .then( function (result)
	    {
	      angular.forEach($scope.pies, function (pie, index)
	      {
	        pieMaker('weeklyPieCurrent-', pie.id, pie.name, pie.weeks.current.ratios);
	        pieMaker('weeklyPieNext-', pie.id, pie.name, pie.weeks.next.ratios);
	      });

	      function pieMaker ($id, id, name, _ratios)
	      {    
	        setTimeout( function () 
	        {
	          document.getElementById($id + id).innerHTML = '';

	          var ratios    = [],
	              colorMap  = {
	                more: '#415e6b',
	                even: '#ba6a24',
	                less: '#a0a0a0'
	              },
	              colors    = [],
	              xratios   = [];

	          angular.forEach(_ratios, function (ratio, index)
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

	          var r   = Raphael($id + id),
	              pie = r.piechart(40, 40, 40, xratios, { colors: colors, stroke: 'white' });

	        }, 100);
	      };
	    });
	  };

	  getOverviews();

	  /**
	   * Save widget settings
	   */
	  $scope.saveOverviewWidget = function (selection)
	  {
	    $rootScope.statusBar.display($rootScope.ui.settings.saving);

	    Settings.save($rootScope.app.resources.uuid, {
	      user: Storage.local.settings().user,
	      app: {
	        widgets: {
	          groups: selection
	        }
	      }
	    })
	    .then(function (result)
	    {
	      $rootScope.statusBar.display('Refreshing group overviews..');

	      Profile.get($rootScope.app.resources.uuid, true)
	      .then(function (resources)
	      {
	        getOverviews();
	      })
	    });
	  };


	  /**
	   * P2000 annnouncements
	   */
	  Dashboard.p2000().
	  then(function (result)
	  {
	    if (result.error)
	    {
	      $rootScope.notifier.error('Error with getting p2000 alarm messages.');
	      console.warn('error ->', result);
	    }
	    else
	    {
	      $scope.loading.alerts = false;

	      $scope.alarms = result;

	      $scope.alarms.list = $scope.alarms.short;
	    };
	  });


	  /**
	   * Show more or less alarms
	   */
	  $scope.toggle = function (more)
	  {
	    $scope.alarms.list = (more) ? $scope.alarms.short :  $scope.alarms.long;

	    $scope.more.text = (more) ? 'show more' : 'show less';

	    $scope.more.status = !$scope.more.status;
	  };
	}
])



.controller('planboard', 
[
	'$rootScope', '$scope', '$q', '$window', '$location', 'data', 'Slots', 'Dater', 'Storage', 'Sloter', 
	function ($rootScope, $scope, $q, $window, $location, data, Slots, Dater, Storage, Sloter) 
	{
	  /**
	   * Fix styles
	   */
	  $rootScope.fixStyles();

	  
	  /**
	   * Set default currents
	   */
	  var self = this,
	      periods = Dater.getPeriods(),
	      groups  = Storage.local.groups(),
	      settings = Storage.local.settings(),
	      current = {
	        layouts: {
	          user:     true,
	          group:    true,
	          members:  false
	        },
	        day:      Dater.current.today(),
	        week:     Dater.current.week(),
	        month:    Dater.current.month(),
	        group:    settings.app.group,
	        // group:    groups[0].uuid,
	        division: 'all'
	      };


	  /**
	   * Reset views for default views
	   */
	  function resetViews ()
	  {
	    $scope.views = {
	      slot: {
	        add:  false,
	        edit: false
	      },
	      group:  false,
	      wish:   false,
	      member: false
	    };
	  };

	  resetViews();


	  /**
	   * Slot form toggler
	   */
	  $scope.toggleSlotForm = function ()
	  {
	    if ($scope.views.slot.add)
	    {
	      $scope.resetInlineForms();
	    }
	    else
	    {
	      $scope.slot = {};

	      $scope.slot = {
	        start: {
	          date: new Date().toString($rootScope.config.formats.date),
	          time: new Date().toString($rootScope.config.formats.time),
	          datetime: new Date().toISOString()
	        },
	        end: {
	          date: new Date().toString($rootScope.config.formats.date),
	          time: new Date().addHours(1).toString($rootScope.config.formats.time),
	          datetime: new Date().toISOString()
	        },
	        state:      '',
	        recursive:  false,
	        id:         ''
	      };

	      resetViews();

	      $scope.views.slot.add = true;
	    };
	  };


	  /**
	   * Reset inline forms
	   */
	  $scope.resetInlineForms = function ()
	  {
	    $scope.slot = {};

	    $scope.original = {};

	    resetViews();
	  };


	  /**
	   * Reset and init slot container which
	   * is used for adding or changing slots
	   */
	  $scope.slot = {};


	  /**
	   * Pass time slots data
	   */
	  $scope.data = data;


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
	      start:  periods.weeks[current.week].first.day,
	      end:    periods.weeks[current.week].last.day
	    },
	    scope: {
	      day:    false,
	      week:   true,
	      month:  false
	    },
	    config: {
	      bar:        $rootScope.config.timeline.config.bar,
	      wishes:     $rootScope.config.timeline.config.wishes,
	      legenda:    {},
	      legendarer: $rootScope.config.timeline.config.legendarer,
	      states:     $rootScope.config.timeline.config.states,
	      divisions:  $rootScope.config.timeline.config.divisions,
	      densities:  $rootScope.config.timeline.config.densities
	    }
	  };


	  /**
	   * Legenda defaults
	   */
	  angular.forEach($rootScope.config.timeline.config.states, function (state, index)
	  {
	    $scope.timeline.config.legenda[index] = true;
	  });


	  /**
	   * Timeline group legenda default configuration
	   */
	  $scope.timeline.config.legenda.groups = {
	    more: true,
	    even: true,
	    less: true
	  };


	  /**
	   * Prepeare timeline range for dateranger widget
	   */
	  $scope.daterange =  Dater.readable.date($scope.timeline.range.start) + 
	                      ' / ' + 
	                      Dater.readable.date($scope.timeline.range.end);


	  /**
	   * States for dropdown
	   */
	  var states = {};

	  angular.forEach($scope.timeline.config.states, function (state, key) { states[key] = state.label });

	  $scope.states = states;


	  /**
	   * Groups for dropdown
	   */
	  $scope.groups = groups;


	  /**
	   * Groups for dropdown
	   */
	  $scope.divisions = $scope.timeline.config.divisions;


	  /**
	   * Watch for changes in timeline range
	   */
	  $scope.$watch(function ()
	  {
	    var range = self.timeline.getVisibleChartRange(),
	        diff  = Dater.calculate.diff(range);

	    /**
	     * Scope is a day
	     * 
	     * TODO
	     * try later on!
	     * new Date(range.start).toString('d') == new Date(range.end).toString('d')
	     */
	    if (diff <= 86400000)
	    {
	      $scope.timeline.scope = {
	        day:    true,
	        week:   false,
	        month:  false
	      };
	    }
	    /**
	     * Scope is less than a week
	     */
	    else if (diff < 604800000)
	    {
	      $scope.timeline.scope = {
	        day:    false,
	        week:   true,
	        month:  false
	      };
	    }
	    /**
	     * Scope is more than a week
	     */
	    else if (diff > 604800000)
	    {
	      $scope.timeline.scope = {
	        day:    false,
	        week:   false,
	        month:  true
	      };
	    };

	    $scope.timeline.range = {
	      start:  new Date(range.start).toString(),
	      end:    new Date(range.end).toString()
	    };

	    $scope.daterange =  Dater.readable.date($scope.timeline.range.start) + 
	                        ' / ' + 
	                        Dater.readable.date($scope.timeline.range.end);
	  });


	  /**
	   * Timeline (The big boy)
	   */
	  var timeliner = {

	    /**
	     * Init timeline
	     */
	    init: function ()
	    {
	      self.timeline = new links.Timeline(document.getElementById('mainTimeline'));

	      links.events.addListener(self.timeline, 'rangechanged',  timelineGetRange);
	      links.events.addListener(self.timeline, 'add',           timelineOnAdd);
	      links.events.addListener(self.timeline, 'delete',        timelineOnRemove);
	      links.events.addListener(self.timeline, 'change',        timelineOnChange);
	      links.events.addListener(self.timeline, 'select',        timelineOnSelect);

	      this.render($scope.timeline.options);      
	    },

	    /**
	     * Render or re-render timeline
	     */
	    render: function (options)
	    {
	      $scope.timeline = {
	        current:  $scope.timeline.current,
	        scope:    $scope.timeline.scope,
	        config:   $scope.timeline.config,
	        options: {
	          start:  new Date(options.start),
	          end:    new Date(options.end),
	          min:    new Date(options.start),
	          max:    new Date(options.end)
	        }
	      };

	      angular.extend($scope.timeline.options, $rootScope.config.timeline.options);

	      self.timeline.draw(
	        Sloter.process(
	          $scope.data,
	          $scope.timeline.config,
	          $scope.divisions,
	          $rootScope.app.resources.role
	        ), 
	        $scope.timeline.options
	      );

	      self.timeline.setVisibleChartRange($scope.timeline.options.start, $scope.timeline.options.end);
	    },

	    /**
	     * Grab new timeline data from backend and render timeline again
	     */
	    load: function (stamps)
	    {
	      var _this = this;

	      $rootScope.statusBar.display($rootScope.ui.planboard.refreshTimeline);

	      Slots.all({
	        groupId:  $scope.timeline.current.group,
	        division: $scope.timeline.current.division,
	        layouts:  $scope.timeline.current.layouts,
	        month:    $scope.timeline.current.month,
	        stamps:   stamps
	      })
	      .then(function (data)
	      {
	        if (data.error)
	        {
	          $rootScope.notifier.error('Error with gettings timeslots.');
	          console.warn('error ->', result);
	        }
	        else
	        {
	          $scope.data = data;

	          _this.render(stamps);
	        };

	        $rootScope.statusBar.off();
	      });
	    },

	    /**
	     * Refresh timeline as it is
	     */
	    refresh: function ()
	    {
	      $scope.slot = {};

	      resetViews();

	      $scope.views.slot.add = true;

	      this.load({
	        start:  data.periods.start,
	        end:    data.periods.end
	      });
	    },

	    /**
	     * Redraw timeline
	     */
	    redraw: function ()
	    {
	      self.timeline.redraw();
	    },

	    /**
	     * Cancel add
	     */
	    cancelAdd: function ()
	    {
	      self.timeline.cancelAdd();
	    }
	  };
	 

	  /**
	   * Init timeline
	   */
	  timeliner.init();


	  /**
	   * Timeliner listener
	   */
	  $rootScope.$on('timeliner', function () 
	  {
	    timeliner.load({
	      start:  new Date(arguments[1].start).getTime(),
	      end:    new Date(arguments[1].end).getTime()
	    });
	  });


	  /**
	   * Handle new requests for timeline
	   */
	  $scope.requestTimeline = function (section)
	  {
	    switch (section)
	    {
	      case 'group':
	        $scope.timeline.current.layouts.group = !$scope.timeline.current.layouts.group;

	        if ($scope.timeline.current.layouts.members && !$scope.timeline.current.layouts.group)
	          $scope.timeline.current.layouts.members = false;
	      break;

	      case 'members':
	        $scope.timeline.current.layouts.members = !$scope.timeline.current.layouts.members;

	        if ($scope.timeline.current.layouts.members && !$scope.timeline.current.layouts.group)
	          $scope.timeline.current.layouts.group = true;
	      break;
	    };

	    timeliner.load({
	      start:  data.periods.start,
	      end:    data.periods.end
	    });
	  };


	  /**
	   * Day & Week & Month toggle actions
	   */
	  $scope.timelineScoper = function (period)
	  {
	    $scope.timeline.current.day   = current.day;
	    $scope.timeline.current.week  = current.week;
	    $scope.timeline.current.month = current.month;

	    switch (period)
	    {
	      case 'day':
	        $scope.timeline.scope = {
	          day:    true,
	          week:   false,
	          month:  false
	        };

	        timeliner.load({
	          start:  periods.days[$scope.timeline.current.day].first.timeStamp,
	          end:    periods.days[$scope.timeline.current.day].last.timeStamp,
	        });
	      break;

	      case 'week':
	        $scope.timeline.scope = {
	          day:    false,
	          week:   true,
	          month:  false
	        };

	        timeliner.load({
	          start:  periods.weeks[$scope.timeline.current.week].first.timeStamp,
	          end:    periods.weeks[$scope.timeline.current.week].last.timeStamp,
	        });
	      break;

	      case 'month':
	        $scope.timeline.scope = {
	          day:    false,
	          week:   false,
	          month:  true
	        };

	        timeliner.load({
	          start:  periods.months[$scope.timeline.current.month].first.timeStamp,
	          end:    periods.months[$scope.timeline.current.month].last.timeStamp,
	        });
	      break;
	    };
	  };


	  /**
	   * Go one period in past
	   */
	  $scope.timelineBefore = function (timelineScope)
	  {
	    if ($scope.timeline.scope.day)
	    {
	      if ($scope.timeline.current.day != 1)
	      {
	        $scope.timeline.current.day--;

	        timeliner.load({
	          start:  periods.days[$scope.timeline.current.day].first.timeStamp,
	          end:    periods.days[$scope.timeline.current.day].last.timeStamp,
	        });
	      };
	    }
	    else if ($scope.timeline.scope.week)
	    {
	      if ($scope.timeline.current.week != 1)
	      {
	        $scope.timeline.current.week--;

	        timeliner.load({
	          start:  periods.weeks[$scope.timeline.current.week].first.timeStamp,
	          end:    periods.weeks[$scope.timeline.current.week].last.timeStamp,
	        });
	      };
	    }
	    else if ($scope.timeline.scope.month)
	    {
	      if ($scope.timeline.current.month != 1)
	      {
	        $scope.timeline.current.month--;

	        timeliner.load({
	          start:  periods.months[$scope.timeline.current.month].first.timeStamp,
	          end:    periods.months[$scope.timeline.current.month].last.timeStamp,
	        });
	      };
	    };
	  };


	  /**
	   * Go one period in future
	   */
	  $scope.timelineAfter = function (timelineScope)
	  {
	    if ($scope.timeline.scope.day)
	    {
	      /**
	       * Total days in a month can change so get it start periods cache
	       */
	      if ($scope.timeline.current.day != periods.days.total)
	      {
	        $scope.timeline.current.day++;

	        timeliner.load({
	          start:  periods.days[$scope.timeline.current.day].first.timeStamp,
	          end:    periods.days[$scope.timeline.current.day].last.timeStamp,
	        });
	      };
	    }
	    else if ($scope.timeline.scope.week)
	    {
	      if ($scope.timeline.current.week != 53)
	      {
	        $scope.timeline.current.week++;

	        timeliner.load({
	          start:  periods.weeks[$scope.timeline.current.week].first.timeStamp,
	          end:    periods.weeks[$scope.timeline.current.week].last.timeStamp,
	        });
	      };
	    }
	    else if ($scope.timeline.scope.month)
	    {
	      if ($scope.timeline.current.month != 12)
	      {
	        $scope.timeline.current.month++;

	        timeliner.load({
	          start:  periods.months[$scope.timeline.current.month].first.timeStamp,
	          end:    periods.months[$scope.timeline.current.month].last.timeStamp,
	        });
	      };
	    };
	  };


	  /**
	   * Timeline zoom in
	   */
	  $scope.timelineZoomIn = function () { self.timeline.zoom($rootScope.config.timeline.config.zoom, Date.now()) };


	  /**
	   * Timeline zoom out
	   */
	  $scope.timelineZoomOut = function () { self.timeline.zoom(-$rootScope.config.timeline.config.zoom, Date.now()) };


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

	      $scope.daterange = {
	        start:  Dater.readable.date(new Date(range.start).getTime()),
	        end:    Dater.readable.date(new Date(range.end).getTime())
	      };

	    });
	  };


	  /**
	   * Get information of the selected slot
	   */
	  function selectedSlot ()
	  {
	    var selection;

	    /**
	     * TODO
	     * 
	     * Not working!!
	     */
	    timeliner.cancelAdd();

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

	      resetViews();

	      switch (content.type)
	      {
	        case 'slot':
	          $scope.views.slot.edit = true;
	        break;

	        case 'group':
	          $scope.views.group = true;
	        break;

	        case 'wish':
	          $scope.views.wish = true;
	        break;

	        case 'member':
	          $scope.views.member = true;
	        break;
	      };

	      $scope.slot = {
	        start: {
	          date: new Date(values.start).toString($rootScope.config.formats.date),
	          time: new Date(values.start).toString($rootScope.config.formats.time),
	          datetime: new Date(values.start).toISOString()
	        },
	        end: {
	          date: new Date(values.end).toString($rootScope.config.formats.date),
	          time: new Date(values.end).toString($rootScope.config.formats.time),
	          datetime: new Date(values.end).toISOString()
	        },
	        state:      content.state,
	        recursive:  content.recursive,
	        id:         content.id
	      };

	      /**
	       * TODO
	       * Check if this can be combined with switch later on!
	       * Set extra data based slot type for inline form
	       */
	      switch (content.type)
	      {
	        case 'group':
	          $scope.slot.diff  = content.diff;
	          $scope.slot.group = content.group;
	        break;

	        case 'wish':
	          $scope.slot.wish    = content.wish;
	          $scope.slot.group   = content.group;
	          $scope.slot.groupId = content.groupId;
	        break;

	        case 'member':
	          $scope.slot.member = content.mid;
	        break;
	      }

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
	                .filter(function ()
	                { 
	                  return this.nodeValue == 'New' 
	                }),
	        values = self.timeline.getItem(self.timeline.getSelection()[0].row);
	      
	    if (news.length > 1) self.timeline.cancelAdd();

	    $scope.$apply(function ()
	    {
	      resetViews();

	      $scope.views.slot.add = true;

	      $scope.slot = {
	        start: {
	          date: new Date(values.start).toString($rootScope.config.formats.date),
	          time: new Date(values.start).toString($rootScope.config.formats.time),
	          datetime: new Date(values.start).toISOString()
	        },
	        end: {
	          date: new Date(values.end).toString($rootScope.config.formats.date),
	          time: new Date(values.end).toString($rootScope.config.formats.time),
	          datetime: new Date(values.end).toISOString()
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
	  $scope.add = function (slot)
	  {
	    var now     = Date.now().getTime(),
	        values  = {
	                    start:      ($rootScope.browser.mobile) ? 
	                                  new Date(slot.start.datetime).getTime() / 1000 :
	                                  Dater.convert.absolute(slot.start.date, slot.start.time, true),
	                    end:        ($rootScope.browser.mobile) ? 
	                                  new Date(slot.end.datetime).getTime() / 1000 : 
	                                  Dater.convert.absolute(slot.end.date, slot.end.time, true),
	                    recursive:  (slot.recursive) ? true : false,
	                    text:       slot.state
	                  };

	    if (values.end * 1000 <= now && values.recursive == false)
	    {
	      $rootScope.notifier.error('You can not input timeslots in past.');

	      // timeliner.cancelAdd();
	      timeliner.refresh();
	    }
	    else
	    {
	      $rootScope.statusBar.display($rootScope.ui.planboard.addTimeSlot);

	      Slots.add(values, $rootScope.app.resources.uuid)
	      .then(
	        function (result)
	        {
	          if (result.error)
	          {
	            $rootScope.notifier.error('Error with adding a new timeslot.');
	            console.warn('error ->', result);
	          }
	          else
	          {
	            $rootScope.notifier.success($rootScope.ui.planboard.slotAdded);
	          };

	          timeliner.refresh();
	        }
	      );
	    };
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

	    var now = Date.now().getTime();

	    if (options.end <= now && options.content.recursive == false)
	    {
	      $rootScope.notifier.error('You can not change timeslots in past.');

	      timeliner.refresh();
	    }
	    else
	    {
	      $rootScope.statusBar.display($rootScope.ui.planboard.changingSlot);

	      Slots.change($scope.original, options, $rootScope.app.resources.uuid)
	      .then(
	        function (result)
	        {
	          if (result.error)
	          {
	            $rootScope.notifier.error('Error with changing timeslot.');
	            console.warn('error ->', result);
	          }
	          else
	          {
	            $rootScope.notifier.success($rootScope.ui.planboard.slotChanged);
	          };

	          timeliner.refresh();
	        }
	      );
	    };
	  };


	  /**
	   * Change slot
	   */
	  $scope.change = function (original, slot)
	  {
	    timelineOnChange(true, original, slot, 
	    {
	      start:  ($rootScope.browser.mobile) ?
	                new Date(slot.start.datetime).getTime() : 
	                Dater.convert.absolute(slot.start.date, slot.start.time, false),
	      end:    ($rootScope.browser.mobile) ? 
	                new Date(slot.end.datetime).getTime() :
	                Dater.convert.absolute(slot.end.date, slot.end.time, false),
	      content: angular.toJson({
	        recursive:  slot.recursive, 
	        state:      slot.state 
	      })
	    });
	  };


	  /**
	   * Set wish
	   */
	  $scope.setWish = function (slot)
	  {
	    $rootScope.statusBar.display($rootScope.ui.planboard.changingWish);

	    Slots.setWish(
	    {
	      id:     slot.groupId,
	      start:  ($rootScope.browser.mobile) ? 
	                new Date(slot.start.datetime).getTime() / 1000 : 
	                Dater.convert.absolute(slot.start.date, slot.start.time, true),
	      end:    ($rootScope.browser.mobile) ? 
	                new Date(slot.end.datetime).getTime() / 1000 : 
	                Dater.convert.absolute(slot.end.date, slot.end.time, true),
	      recursive:  false,
	      // recursive:  slot.recursive,
	      wish:       slot.wish
	    })
	    .then(
	      function (result)
	      {
	        if (result.error)
	        {
	          $rootScope.notifier.error('Error with changing wish value.');
	          console.warn('error ->', result);
	        }
	        else
	        {
	          $rootScope.notifier.success($rootScope.ui.planboard.wishChanged);
	        };

	        timeliner.refresh();
	      }
	    );
	  };


	  /**
	   * Timeline on delete
	   */
	  function timelineOnRemove ()
	  {
	    /**
	     * TODO
	     * Look ways to implement cancelAdd of timeline itself!!
	     */
	    var news = $('.timeline-event-content')
	                .contents()
	                .filter(function ()
	                { 
	                  return this.nodeValue == 'New' 
	                });
	      
	    if (news.length > 0)
	    {
	      self.timeline.cancelAdd();

	      $scope.$apply(function ()
	      {
	        $scope.resetInlineForms();
	      });
	    }
	    else
	    {
	      var now = Date.now().getTime();

	      if ($scope.original.end.getTime() <= now && $scope.original.recursive == false)
	      {
	        $rootScope.notifier.error('You can not delete timeslots in past.');

	        timeliner.refresh();
	      }
	      else
	      {
	        $rootScope.statusBar.display($rootScope.ui.planboard.deletingTimeslot);

	        Slots.remove($scope.original, $rootScope.app.resources.uuid)
	        .then(
	          function (result)
	          {
	            if (result.error)
	            {
	              $rootScope.notifier.error('Error with removing timeslot.');
	              console.warn('error ->', result);
	            }
	            else
	            {
	              $rootScope.notifier.success($rootScope.ui.planboard.timeslotDeleted);
	            };

	            timeliner.refresh();
	          }
	        );
	      };
	    };
	  };


	  /**
	   * Delete trigger start view
	   */
	  $scope.remove = function () { timelineOnRemove() };


	  /**
	   * Redraw timeline on window resize
	   */
	  $window.onresize = function () { self.timeline.redraw() };


	  /**
	   * Group aggs barCharts toggler
	   */
	  $scope.barCharts = function ()
	  {
	    $scope.timeline.config.bar = !$scope.timeline.config.bar;

	    timeliner.render({
	      start:  $scope.timeline.range.start,
	      end:    $scope.timeline.range.end
	    });
	  };
	  

	  /**
	   * Group wishes toggler
	   */
	  $scope.groupWishes = function ()
	  {
	    $scope.timeline.config.wishes = !$scope.timeline.config.wishes;

	    timeliner.render({
	      start:  $scope.timeline.range.start,
	      end:    $scope.timeline.range.end
	    });
	  };
	  

	  /**
	   * Timeline legenda toggler
	   */
	  $scope.showLegenda = function () { $scope.timeline.config.legendarer = !$scope.timeline.config.legendarer; };


	  /**
	   * Alter legenda settings
	   */
	  $scope.alterLegenda = function (legenda)
	  {
	    $scope.timeline.config.legenda = legenda;

	    timeliner.render({
	      start:  $scope.timeline.range.start,
	      end:    $scope.timeline.range.end
	    });
	  };


	  /**
	   * Send shortage message
	   */
	  $scope.sendShortageMessage = function (slot)
	  {
	    $rootScope.statusBar.display($rootScope.ui.planboard.preCompilingStortageMessage);

	    Storage.session.add('escalation', angular.toJson({
	      group: slot.group,
	      start: {
	        date: slot.start.date,
	        time: slot.start.time
	      },
	      end: {
	        date: slot.end.date,
	        time: slot.end.time
	      },
	      diff: slot.diff
	    }));

	    $location.path('/messages').search({ escalate: true }).hash('compose');
	  };


	  /**
	   * Prevent re-rendering issues with timeline
	   */
	  $scope.destroy = {
	    timeline: function ()
	    {
	      // Not working !! :(
	      // Sloter.pies($scope.data);
	    },
	    statistics: function ()
	    {
	      setTimeout(function ()
	      {
	        timeliner.redraw();
	      }, 10);
	    }
	  };

	}
])



/**
 * Messages controller
 */
.controller('messages', 
[
	'$scope', '$rootScope', '$q', '$location', '$route', 'data', 'Messages', 'Storage', 
	function ($scope, $rootScope, $q, $location, $route, data, Messages, Storage) 
	{
	  /**
	   * Fix styles
	   */
	  $rootScope.fixStyles();

	  
	  /**
	   * Self this
	   */
	  var self = this;


	  /**
	   * Receivers list
	   */
	  $scope.receviersList = Messages.receviers();


	  /**
	   * Set messages
	   */
	  $scope.messages = data;


	  /**
	   * Selections
	   */
	  $scope.selection = {
	    inbox: {},
	    outbox: {},
	    trash: {}
	  };


	  /**
	   * Selection masters
	   */
	  $scope.selectionMaster = {
	    inbox: '',
	    outbox: '',
	    trash: ''
	  };


	  /**
	   * Initial value for broadcasting
	   */
	  $scope.broadcast = {
	    sms: false,
	    email: false
	  };


	  /**
	   * Set origin container for returning back to origin box
	   */
	  $scope.origin = 'inbox';


	  /**
	   * View setter
	   */
	  function setView (hash)
	  {
	    $scope.views = {
	      compose: false,
	      message: false,
	      inbox:   false,
	      outbox:  false,
	      trash:   false
	    };

	    $scope.views[hash] = true;
	  };


	  /**
	   * Switch between the views and set hash accordingly
	   */
	  $scope.setViewTo = function (hash)
	  {
	    $scope.$watch(hash, function ()
	    {
	      $location.hash(hash);

	      setView(hash);
	    });
	  };


	  /**
	   * If no params or hashes given in url
	   */
	  if (!$location.hash())
	  {
	    var view = 'inbox';

	    $location.hash('inbox');
	  }
	  else
	  {
	    var view = $location.hash();
	  };


	  /**
	   * Set view
	   */
	  setView(view);

	    
	  /**
	   * Extract view action from url and set message view
	   */
	  if ($location.search().uuid) setMessageView($location.search().uuid);


	  /**
	   * TODO
	   * Possible bug..
	   * Still issues with changing state of the message
	   * 
	   * Set given group for view
	   */
	  function setMessageView (id)
	  {
	    $rootScope.statusBar.display($rootScope.ui.message.loadingMessage);

	    setView('message');

	    $scope.setViewTo('message');

	    $scope.message = Messages.find(id);

	    /**
	     * Change to read if message not seen yet
	     * Check only in inbox because other box messages
	     * can have 'NEW' state as well but those states are not shown
	     *
	     * Maybe only for 'trash' box to show state in later stages
	     */
	    if ($scope.message.state == "NEW" && $scope.message.box == 'inbox')
	    {
	      Messages.changeState([id], 'READ')
	      .then(function (result)
	      {
	        if (result.error)
	        {
	          $rootScope.notifier.error('Error with changing message state.');
	          console.warn('error ->', result);
	        }
	        else
	        {
	          console.log('state changed');
	        };
	      });

	      var _inbox = [];

	      angular.forEach($scope.messages.inbox, function (message, index)
	      {
	        if (message.uuid == $scope.message.uuid)
	        {
	          message.state = "READ";
	        };

	        _inbox.push(message);
	      });

	  	  $scope.messages.inbox = _inbox;

	      Messages.unreadCount(); 
	    };

	    $rootScope.statusBar.off();
	  };


	  /**
	   * Request for a message
	   */
	  $scope.requestMessage = function (current, origin)
	  {
	    $scope.origin = origin;

	    setMessageView(current);

	    $scope.$watch($location.search(), function ()
	    {
	      $location.search({uuid: current});
	    });
	  };


	  /**
	   * Compose message view toggler
	   */
	  $scope.composeMessage = function ()
	  {
	    if ($scope.views.compose)
	    {
	      $scope.closeTabs();
	    }
	    else
	    {
	      $scope.message = {};

	      $scope.setViewTo('inbox');
	    };

	  };


	  /**
	   * Reset views
	   */
	  $scope.closeTabs = function ()
	  {
	    $scope.message = {};

	    $location.search({});

	    setView($scope.origin);

	    $scope.setViewTo($scope.origin);

	    Storage.session.remove('escalation');
	  };


	  /**
	   * Toggle selections
	   */
	  $scope.toggleSelection = function (messages, inbox, master)
	  {
	    var flag = (master) ? true : false;

	    angular.forEach(messages, function (message, index)
	    {
	      $scope.selection[inbox][message.uuid] = flag;
	    });
	  };


	  /**
	   * Remove message
	   */
	  $scope.removeMessage = function (id)
	  {
	    $rootScope.statusBar.display($rootScope.ui.message.removing);

	    var bulk = [];

	    bulk.push(id);

	    Messages.remove(bulk)
	    .then(function (result)
	    {
	      if (result.error)
	      {
	        $rootScope.notifier.error('Error with removing message.');
	        console.warn('error ->', result);
	      }
	      else
	      {
	        $rootScope.notifier.success($rootScope.ui.message.removed);

	        $rootScope.statusBar.display($rootScope.ui.message.refreshing);

	        Messages.query()
	        .then(function (messages)
	        {
	          $scope.messages = messages;

	          $rootScope.loading = false;

	          $scope.closeTabs();

	          $rootScope.statusBar.off();
	        });
	      };
	    });
	  };


	  /**
	   * Remove messages
	   */
	  $scope.removeMessages = function (selection)
	  {
	    // console.log('it is coming to bulk remove ->', selection.length);

	    $rootScope.statusBar.display($rootScope.ui.message.removingSelected);

	    var ids = [];

	    angular.forEach(selection, function (flag, id)
	    {
	      if (flag) ids.push(id);
	    });

	    Messages.remove(ids)
	    .then(function (result)
	    {
	      if (result.error)
	      {
	        $rootScope.notifier.error('Error with removing messages.');
	        console.warn('error ->', result);
	      }
	      else
	      {
	        $rootScope.notifier.success($rootScope.ui.message.removed);

	        $rootScope.statusBar.display($rootScope.ui.message.refreshing);

	        Messages.query()
	        .then(function (messages)
	        {
	          $scope.messages = messages;

	          $rootScope.statusBar.off();
	        });
	      };
	    });
	  };


	  /**
	   * Restore a message
	   */
	  $scope.restoreMessage = function (id)
	  {
	    $rootScope.statusBar.display($rootScope.ui.message.restoring);

	    var bulk = [];

	    bulk.push(id);

	    Messages.restore(bulk)
	    .then(function (result)
	    {
	      if (result.error)
	      {
	        $rootScope.notifier.error('Error with restoring message.');
	        console.warn('error ->', result);
	      }
	      else
	      {
	        $rootScope.notifier.success($rootScope.ui.message.restored);

	        $rootScope.statusBar.display($rootScope.ui.message.refreshing);

	        Messages.query()
	        .then(function(messages)
	        {
	          $scope.messages = messages;

	          $rootScope.statusBar.off();
	        });
	      };
	    });
	  };


	  /**
	   * Restore messages
	   */
	  $scope.restoreMessages = function (selection)
	  {
	    $rootScope.statusBar.display($rootScope.ui.message.restoringSelected);

	    var ids = [];

	    angular.forEach(selection, function (flag, id)
	    {
	      if (flag) ids.push(id);
	    });

	    Messages.restore(ids)
	    .then(function (result)
	    {
	      if (result.error)
	      {
	        $rootScope.notifier.error('Error with restoring message.');
	        console.warn('error ->', result);
	      }
	      else
	      {
	        $rootScope.notifier.success($rootScope.ui.message.removed);

	        $rootScope.statusBar.display($rootScope.ui.message.refreshing);

	        Messages.query()
	        .then(function(messages)
	        {
	          $scope.messages = messages;

	          $rootScope.statusBar.off();
	        });
	      };      
	    });
	  };


	  /**
	   * Empty trash
	   */
	  $scope.emptyTrash = function ()
	  {
	    $rootScope.statusBar.display($rootScope.ui.message.emptying);

	    Messages.emptyTrash()
	    .then(function (result)
	    {
	      if (result.error)
	      {
	        $rootScope.notifier.error('Error with emting trash.');
	        console.warn('error ->', result);
	      }
	      else
	      {
	        $rootScope.notifier.success($rootScope.ui.message.empited);

	        $rootScope.statusBar.display($rootScope.ui.message.refreshing);

	        Messages.query()
	        .then(function (messages)
	        {
	          if (messages.error)
	          {
	            $rootScope.notifier.error('Error with getting messages.');
	            console.warn('error ->', messages);
	          }
	          else
	          {
	            $scope.messages = messages;

	            $rootScope.statusBar.off();
	          };
	        });
	      };
	    });    
	  };



		/**
	   * Fix for not displaying original sender in multiple receivers selector
	   * in the case that user wants to add more receivers to the list  
	   */
	  $("div#composeTab select.chzn-select").chosen()
	  .change(function (item)
	  {
	  	$.each($(this).next().find("ul li.result-selected"), function (i,li)
	    {
	  		var name = $(li).html();

	  		$.each($("div#composeTab select.chzn-select option"), function (j,opt)
	      {
		      if(opt.innerHTML == name) opt.selected = true;
		    });
	  	});
	  });


	  /**
	   * Reply a amessage
	   */
	  $scope.reply = function(message)
	  {
	    setView('compose');

	    $scope.setViewTo('compose');

	    var members = angular.fromJson(Storage.get('members')),
	        senderId = message.requester.split('personalagent/')[1].split('/')[0],
	        name = (typeof members[senderId] == 'undefined' ) ? senderId : members[senderId].name;

	    $scope.message = {
	      subject: 'RE: ' + message.subject,
	      receivers: [{
	        group: 'Users', 
	        id: senderId , 
	        name: name
	      }]
	    };

	    angular.forEach($("div#composeTab select.chzn-select option"), function (option, index)
	    {
	      if (option.innerHTML == name) option.selected = true;
	    });

	    $("div#composeTab select.chzn-select").trigger("liszt:updated");
	  };

	  
	  /**
	   * Send message
	   */
	  $scope.send = function (message, broadcast)
	  {
	    $rootScope.statusBar.display($rootScope.ui.message.sending);

	    if (message.receivers)
	    {
	      Messages.send(message, broadcast)
	      .then(function (uuid)
	      {
	        if (uuid.error)
	        {
	          $rootScope.notifier.error('Error with sending message.');
	          console.warn('error ->', uuid);
	        }
	        else
	        {
	          $rootScope.notifier.success($rootScope.ui.message.sent);

	          $rootScope.statusBar.display($rootScope.ui.message.refreshing);

	          Messages.query()
	          .then(function (messages)
	          {
	            if (messages.error)
	            {
	              $rootScope.notifier.error('Error with getting messages.');
	              console.warn('error ->', messages);
	            }
	            else
	            {
	              $scope.messages = messages;

	              $scope.closeTabs();

	              $scope.requestMessage(uuid, $scope.origin);

	              $rootScope.statusBar.off();
	            };
	          });
	        };
	      });
	    }
	    else
	    {
	      $rootScope.notifier.error($rootScope.ui.message.noReceivers);

	      $rootScope.statusBar.off();
	    };
	  };

	    
	  /**
	   * Extract escalation information
	   */
	  if ($location.search().escalate)
	  {
	    var escalation = angular.fromJson(Storage.session.get('escalation')),
	        name = escalation.group.split('>')[1].split('<')[0],
	        uuid = escalation.group.split('uuid=')[1].split('#view')[0];

	    setTimeout (function ()
	    {
	      angular.forEach($("div#composeTab select.chzn-select option"), function (option, index)
	      {
	        if (option.innerHTML == name) option.selected = true;
	      });

	      $("div#composeTab select.chzn-select").trigger("liszt:updated");
	    }, 100);

	    $scope.message = {
	      subject: $rootScope.ui.message.escalation,
	      receivers: [{
	        group: 'Groups', 
	        id: uuid, 
	        name: name
	      }],
	      body: $rootScope.ui.message.escalationBody(
	        escalation.diff, 
	        escalation.start.date, 
	        escalation.start.time,
	        escalation.end.date,
	        escalation.end.time)
	    };

	    $scope.broadcast = {
	      sms: true
	    };
	  };
	}
])



/**
 * Groups controller
 */
.controller('groups', 
[
	'$rootScope', '$scope', '$location', 'data', 'Groups', 'Profile', '$route', '$routeParams', 'Storage', 'Slots', 
	function ($rootScope, $scope, $location, data, Groups, Profile, $route, $routeParams, Storage, Slots) 
	{
	  /**
	   * Fix styles
	   */
	  $rootScope.fixStyles();

	  
	  /**
	   * Self this
	   */
		var self = this,
	      params = $location.search();


	  /**
	   * Init search query
	   */
	  $scope.search = {
	    query: ''
	  };


	  /**
	   * Reset selection
	   */
	  $scope.selection = {};


	  /**
	   * Set groups
	   */
	  $scope.data = data;


	  /**
	   * Grab and set roles for view
	   */
	  $scope.roles = $rootScope.config.roles;


	  /**
	   * Groups for dropdown
	   */
	  $scope.groups = data.groups;


	  /**
	   * If no params or hashes given in url
	   */
	  if (!params.uuid && !$location.hash())
	  {
	    var uuid = data.groups[0].uuid,
	        view = 'view';

	    $location.search({uuid: data.groups[0].uuid}).hash('view');
	  }
	  else
	  {
	    var uuid = params.uuid,
	        view = $location.hash();
	  };


	  /**
	   * Set group
	   */
	  setGroupView(uuid);


	  /**
	   * Set view
	   */
	  setView(view);


	  /**
	   * Set given group for view
	   */
	  function setGroupView (id)
	  {
	    angular.forEach(data.groups, function (group, index)
	    {
	      if (group.uuid == id) $scope.group = group;
	    });

	    $scope.members = data.members[id];

	    $scope.current = id;

	    wisher(id);
	  };


	  function wisher (id)
	  {
	    $scope.wished = false;

	    Groups.wish(id)
	    .then(function (wish)
	    {
	      $scope.wished = true;

	      $scope.wish = wish.count;

	      $scope.popover = {
	        id: id,
	        wish: wish.count
	      }
	    });
	  }


	  /**
	   * Set wish for the group
	   */
	  $scope.saveWish = function (id, wish)
	  {
	    console.warn('setting the wish:' + wish + ' for the group:', id);
	    
	    $rootScope.statusBar.display($rootScope.ui.planboard.changingWish);

	    Slots.setWish(
	    {
	      id:     id,
	      start:  255600,
	      end:    860400,
	      recursive:  true,
	      wish:   wish
	    })
	    .then(
	      function (result)
	      {
	        if (result.error)
	        {
	          $rootScope.notifier.error('Error with changing wish value.');
	          console.warn('error ->', result);
	        }
	        else
	        {
	          $rootScope.notifier.success($rootScope.ui.planboard.wishChanged);
	        };

	        wisher(id);
	      }
	    );

	  };


	  /**
	   * Request for a group
	   */
	  $scope.requestGroup = function (current, switched)
	  {
	    setGroupView(current);

	    $scope.$watch($location.search(), function ()
	    {
	      $location.search({uuid: current});
	    });

	    if (switched)
	    {
	      if ($location.hash() != 'view') $location.hash('view');

	      setView('view');
	    };
	  };
	  

	  /**
	   * View setter
	   */
	  function setView (hash)
	  {
	    $scope.views = {
	      view:   false,
	      add:    false,
	      edit:   false,
	      search: false,
	      member: false
	    };

	    $scope.views[hash] = true;
	  };


	  /**
	   * Switch between the views and set hash accordingly
	   */
	  $scope.setViewTo = function (hash)
	  {
	    $scope.$watch(hash, function ()
	    {
	      $location.hash(hash);

	      setView(hash);
	    });
	  };


	  /**
	   * Toggle new group button
	   */
	  $scope.addGroupForm = function ()
	  {
	    if ($scope.views.add)
	    {
	      $scope.closeTabs();
	    }
	    else
	    {
	      $scope.groupForm = {};

	      $scope.setViewTo('add');
	    };
	  };


	  /**
	   * New member
	   */
	  $scope.newMemberForm = function ()
	  {
	    if ($scope.views.member)
	    {
	      $scope.closeTabs();
	    }
	    else
	    {
	      $scope.memberForm = {};

	      $scope.setViewTo('member');
	    };
	  };


	  /**
	   * Edit a group
	   */
	  $scope.editGroup = function (group)
	  {
	    $scope.setViewTo('edit');

	    $scope.groupForm = {
	      id: group.uuid,
	      name: group.name
	    }; 
	  };


	  /**
	   * Close inline form
	   */
	  $scope.closeTabs = function ()
	  {
	    $scope.groupForm = {};

	    $scope.memberForm = {};

	    $scope.setViewTo('view');
	  };


	  /**
	   * Search for members
	   */
	  $scope.searchMembers = function (query)
	  {
	    $rootScope.statusBar.display($rootScope.ui.groups.searchingMembers);

	    Groups.search(query).
	    then(function (result)
	    {
	      if (result.error)
	      {
	        $rootScope.notifier.error('Error with search.');
	        console.warn('error ->', result);
	      }
	      else
	      {
	        $scope.search = {
	          query: '',
	          queried: query
	        };

	        $scope.candidates = result;

	        $scope.setViewTo('search');

	        $rootScope.statusBar.off();
	      };
	    });
	  };


	  /**
	   * Add member to a group
	   */
	  $scope.addMember = function (candidate)
	  {
	    $rootScope.statusBar.display($rootScope.ui.groups.addingNewMember);

	    Groups.addMember(candidate).
	    then(function (result)
	    {
	      if (result.error)
	      {
	        $rootScope.notifier.error('Error with adding a member.');
	        console.warn('error ->', result);
	      }
	      else
	      {
	        $rootScope.notifier.success($rootScope.ui.groups.memberAdded);

	        $rootScope.statusBar.display($rootScope.ui.groups.refreshingGroupMember);

	        Groups.query().
	        then(function (data)
	        {
	          if (data.error)
	          {
	            $rootScope.notifier.error('Error with getting groups and users.');
	            console.warn('error ->', data);
	          }
	          else
	          {
	            $scope.data = data;

	            $rootScope.statusBar.off();
	          };
	        });
	      };
	    });
	  };


	  /**
	   * Remove member from a group
	   */
	  $scope.removeMember = function (member, group)
	  {
	    $rootScope.statusBar.display($rootScope.ui.groups.removingMember);

	    Groups.removeMember(member, group).
	    then(function (result)
	    {
	      if (result.error)
	      {
	        $rootScope.notifier.error('Error with removing a member.');
	        console.warn('error ->', result);
	      }
	      else
	      {
	        $rootScope.notifier.success($rootScope.ui.groups.memberRemoved);

	        $rootScope.statusBar.display($rootScope.ui.groups.refreshingGroupMember);

	        Groups.query().
	        then(function (data)
	        {
	          if (data.error)
	          {
	            $rootScope.notifier.error('Error with getting groups and users.');
	            console.warn('error ->', data);
	          }
	          else
	          {
	            $scope.data = data;

	            $rootScope.statusBar.off();
	          };
	        });
	      };
	    });
	  };


	  /**
	   * Remove members
	   */
	  $scope.removeMembers = function (selection, group)
	  {
	    $rootScope.statusBar.display($rootScope.ui.groups.removingSelected);

	    Groups.removeMembers(selection, group).
	    then(function (result)
	    {
	      if (result.error)
	      {
	        $rootScope.notifier.error('Error with removing members.');
	        console.warn('error ->', result);
	      }
	      else
	      {
	        $rootScope.notifier.success($rootScope.ui.groups.removed);

	        $rootScope.statusBar.display($rootScope.ui.groups.refreshingGroupMember);

	        $scope.selection = {};

	        Groups.query().
	        then(function (data)
	        {
	          if (data.error)
	          {
	            $rootScope.notifier.error('Error with getting groups and users.');
	            console.warn('error ->', data);
	          }
	          else
	          {
	            $scope.data = data;

	            $rootScope.statusBar.off();
	          };
	        });
	      };
	    });

	    /**
	     * TODO
	     * not working to reset master checkbox!
	     */
	    //$scope.selectionMaster = {};
	  };


	  /**
	   * Save a group
	   */
	  $scope.groupSubmit = function (group)
	  {
	    $rootScope.statusBar.display($rootScope.ui.groups.saving);

	    Groups.save(group).
	    then(function (returned)
	    {
	      if (returned.error)
	      {
	        $rootScope.notifier.error('Error with saving group.');
	        console.warn('error ->', returned);
	      }
	      else
	      {
	        $rootScope.notifier.success($rootScope.ui.groups.groupSaved);

	        $rootScope.statusBar.display($rootScope.ui.groups.refreshingGroupMember);

	        Groups.query().
	        then(function (data)
	        {
	          if (data.error)
	          {
	            $rootScope.notifier.error('Error with getting groups and users.');
	            console.warn('error ->', data);
	          }
	          else
	          {
	            $scope.closeTabs();

	            $scope.data = data;

	            angular.forEach(data.groups, function (group, index)
	            {
	              if (group.uuid == returned)
	              {
	                $scope.groups = data.groups;

	                angular.forEach(data.groups, function (g, index)
	                {
	                  if (g.uuid == group.uuid) $scope.group = g;
	                });

	                $scope.members = data.members[group.uuid];

	                $scope.current = group.uuid;

	                $scope.$watch($location.search(), function ()
	                {
	                  $location.search({uuid: group.uuid});
	                }); // end of watch

	              }; // end of if

	            }); // end of foreach

	            $rootScope.statusBar.off();
	          };
	        });
	      };
	    });
	  };


	  /**
	   * Save a member
	   */
	  $scope.memberSubmit = function (member)
	  {
	    $rootScope.statusBar.display($rootScope.ui.groups.registerNew);

	    Profile.register(member).
	    then(function (result)
	    {
	      if (result.error)
	      {
	        $rootScope.notifier.error('Error with registering a member.');
	        console.warn('error ->', result);
	      }
	      else
	      {
	        $rootScope.notifier.success($rootScope.ui.groups.memberRegstered);

	        $rootScope.statusBar.display($rootScope.ui.groups.refreshingGroupMember);

	        Groups.query().
	        then(function (data)
	        {
	          if (data.error)
	          {
	            $rootScope.notifier.error('Error with getting groups and users.');
	            console.warn('error ->', data);
	          }
	          else
	          {
	            $scope.data = data;

	            $location.path('/profile/' + member.username).hash('profile');

	            $rootScope.statusBar.off();
	          };
	        });
	      };
	    });
	  };


	  /**
	   * Delete a group
	   */
	  $scope.deleteGroup = function (id)
	  {
	    $rootScope.statusBar.display($rootScope.ui.groups.deleting);

	    Groups.remove(id).
	    then(function (result)
	    {
	      if (result.error)
	      {
	        $rootScope.notifier.error('Error with deleting a group.');
	        console.warn('error ->', result);
	      }
	      else
	      {
	        $rootScope.notifier.success($rootScope.ui.groups.deleted);

	        $rootScope.statusBar.display($rootScope.ui.groups.refreshingGroupMember);

	        Groups.query().
	        then(function (data)
	        {
	          if (data.error)
	          {
	            $rootScope.notifier.error('Error with getting groups and users.');
	            console.warn('error ->', data);
	          }
	          else
	          {
	            $scope.data = data;

	            angular.forEach(data.groups, function (group, index)
	            {
	              $scope.groups = data.groups;

	              $scope.group = data.groups[0];

	              $scope.members = data.members[data.groups[0].uuid];

	              $scope.current = data.groups[0].uuid;

	              $scope.$watch($location.search(), function ()
	              {
	                $location.search({uuid: data.groups[0].uuid});
	              }); // end of watch
	            }); // end of foreach

	            $rootScope.statusBar.off();
	          };
	        });
	      };

	    });
	  };


	  /**
	   * Selection toggler
	   */
	  $scope.toggleSelection = function (group, master)
	  {
	    var flag = (master) ? true : false,
	        members = angular.fromJson(Storage.get(group.uuid));

	    angular.forEach(members, function (member, index)
	    {
	      $scope.selection[member.uuid] = flag;
	    });
	  };


	  /**
	   * Not used in groups yet but login uses modal call..
	   * 
	   * Fetch parent groups
	   */
	  $scope.fetchParent = function ()
	  {
	    Groups.parents()
	    .then(function (result)
	    {
	      console.warn('parent -> ', result);
	    });
	  };

	  /**
	   * Not used in groups yet..
	   * 
	   * Fetch parent groups
	   */
	  $scope.fetchContainers = function (id)
	  {
	    Groups.containers(id)
	    .then(function (result)
	    {
	      console.warn('containers -> ', result);
	    });
	  };

	}
])



/**
 * Profile controller
 */
.controller('profile', 
[
	'$rootScope', '$scope', '$q', '$location', '$window', '$route', 'data', 'Profile', 'Storage', 'Groups', 'Dater', 'Slots', 'Sloter', 'MD5', 
	function ($rootScope, $scope, $q, $location, $window, $route, data, Profile, Storage, Groups, Dater, Slots, Sloter, MD5) 
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
	        day:    Date.today().getDayOfYear() + 1,
	        week:   new Date().getWeek(),
	        month:  new Date().getMonth() + 1
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
	    add:  false,
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
	      add:  false,
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
	    $scope.$watch($location.hash(), function ()
	    {
	      $location.hash(hash);

	      setView(hash);
	    });
	  };


	  /**
	   * Save user
	   */
	  $scope.save = function (resources)
	  {
	    $rootScope.statusBar.display($rootScope.ui.profile.saveProfile);

	    Profile.save($route.current.params.userId, resources)
	    .then(function (result)
	    {
	      if (result.error)
	      {
	        $rootScope.notifier.error('Error with saving profile information.');
	        console.warn('error ->', result);
	      }
	      else
	      {
	        $rootScope.statusBar.display($rootScope.ui.profile.refreshing);

	        var flag = ($route.current.params.userId == $rootScope.app.resources.uuid) ? true : false;

	        Profile.get($route.current.params.userId, flag)
	        .then(function (data)
	        {
	          if (data.error)
	          {
	            $rootScope.notifier.error('Error with getting profile data.');
	            console.warn('error ->', data);
	          }
	          else
	          {
	            $rootScope.notifier.success($rootScope.ui.profile.dataChanged);

	            $scope.data = data;

	            $rootScope.statusBar.off();
	          };
	        });
	      };
	    });
	  };


	  /**
	   * Change passwords
	   */
	  $scope.change = function (passwords)
	  {
	    if (passwords.new1 == '' || passwords.new2 == '')
	    {
	      $rootScope.notifier.error($rootScope.ui.profile.pleaseFill, true);

	      return false;
	    };

	    if (passwords.new1 != passwords.new2)
	    {
	      $rootScope.notifier.error($rootScope.ui.profile.passNotMatch, true);

	      return false;
	    }
	    else if ($rootScope.app.resources.askPass == MD5(passwords.current))
	    {
	      $rootScope.statusBar.display($rootScope.ui.profile.changingPass);

	      Profile.changePassword(passwords)
	      .then(function (result)
	      {
	        if (result.error)
	        {
	          $rootScope.notifier.error('Error with changing password.');
	          console.warn('error ->', result);
	        }
	        else
	        {
	          $rootScope.statusBar.display($rootScope.ui.profile.refreshing);

	          Profile.get($rootScope.app.resources.uuid, true)
	          .then(function (data)
	          {
	            if (data.error)
	            {
	              $rootScope.notifier.error('Error with getting profile data.');
	              console.warn('error ->', data);
	            }
	            else
	            {
	              $rootScope.notifier.success($rootScope.ui.profile.passChanged);

	              $scope.data = data;

	              $rootScope.statusBar.off();
	            };
	          });
	        };
	      });
	    }
	    else
	    {
	      $rootScope.notifier.error($rootScope.ui.profile.passwrong, true);
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
	          legenda:    {},
	          legendarer: $rootScope.config.timeline.config.legendarer,
	          states:     $rootScope.config.timeline.config.states
	        }
	      };

	      var states = {};

	      angular.forEach($scope.timeline.config.states, function (state, key) { states[key] = state.label; });

	      $scope.states = states;

	      angular.forEach($rootScope.config.timeline.config.states, function (state, index)
	      {
	        $scope.timeline.config.legenda[index] = true;
	      });

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
	          Sloter.profile(
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
	      .then(function (data)
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
	        add:  true,
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
	        add:  false,
	        edit: true
	      };

	      $scope.slot = {
	        start: {
	          date: new Date(values.start).toString($rootScope.config.formats.date),
	          time: new Date(values.start).toString($rootScope.config.formats.time),
	          datetime: new Date(values.start).toISOString()

	        },
	        end: {
	          date: new Date(values.end).toString($rootScope.config.formats.date),
	          time: new Date(values.end).toString($rootScope.config.formats.time),
	          datetime: new Date(values.end).toISOString()
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
	                .filter(function () { return this.nodeValue == 'New' }),
	        values = self.timeline.getItem(self.timeline.getSelection()[0].row);
	      
	    if (news.length > 1) self.timeline.cancelAdd();

	    $scope.$apply(function ()
	    {
	      $scope.forms = {
	        add:  true,
	        edit: false
	      };

	      $scope.slot = {
	        start: {
	          date: new Date(values.start).toString($rootScope.config.formats.date),
	          time: new Date(values.start).toString($rootScope.config.formats.time),
	          datetime: new Date(values.start).toISOString()
	        },
	        end: {
	          date: new Date(values.end).toString($rootScope.config.formats.date),
	          time: new Date(values.end).toString($rootScope.config.formats.time),
	          datetime: new Date(values.end).toISOString()
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
	      start:      ($rootScope.browser.mobile) ? 
	                    new Date(slot.start.datetime).getTime() / 1000 :
	                    Dater.convert.absolute(slot.start.date, slot.start.time, true),
	      end:        ($rootScope.browser.mobile) ? 
	                    new Date(slot.end.datetime).getTime() / 1000 : 
	                    Dater.convert.absolute(slot.end.date, slot.end.time, true),
	      recursive:  (slot.recursive) ? true : false,
	      text:       slot.state
	    }, 
	    $scope.user.id)
	    .then(function (result)
	    {
	      if (result.error)
	      {
	        $rootScope.notifier.error('Error with adding a timeslot.');
	        console.warn('error ->', result);
	      }
	      else
	      {
	        $rootScope.notifier.success($rootScope.ui.planboard.slotAdded);
	      };

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
	      if (result.error)
	      {
	        $rootScope.notifier.error('Error with changing a timeslot.');
	        console.warn('error ->', result);
	      }
	      else
	      {
	        $rootScope.notifier.success($rootScope.ui.planboard.slotChanged);
	      };

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
	      start:  ($rootScope.browser.mobile) ?
	                new Date(slot.start.datetime).getTime() : 
	                Dater.convert.absolute(slot.start.date, slot.start.time, false),
	      end:    ($rootScope.browser.mobile) ? 
	                new Date(slot.end.datetime).getTime() :
	                Dater.convert.absolute(slot.end.date, slot.end.time, false),
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
	    var news = $('.timeline-event-content')
	                .contents()
	                .filter(function () { return this.nodeValue == 'New' });
	      
	    if (news.length > 0)
	    {
	      $scope.$apply(function ()
	      {
	        $scope.resetInlineForms();
	      });
	    }
	    else
	    {
	      $rootScope.statusBar.display($rootScope.ui.planboard.deletingTimeslot);

	      Slots.remove($scope.original, $scope.user.id)
	      .then(function (result)
	      {
	        if (result.error)
	        {
	          $rootScope.notifier.error('Error with deleting a timeslot.');
	          console.warn('error ->', result);
	        }
	        else
	        {
	          $rootScope.notifier.success($rootScope.ui.planboard.timeslotDeleted);
	        };

	        timeliner.refresh();
	      });
	    };
	  };


	  /**
	   * Delete trigger start view
	   */
	  $scope.slotRemove = function () { timelineOnDelete() };


	  /**
	   * Go to this week
	   */
	  $scope.timelineThisWeek = function ()
	  {
	    if ($scope.timeline.current.week != new Date().getWeek())
	    {
	      timeliner.load({
	        start:  periods.weeks[new Date().getWeek()].first.timeStamp,
	        end:    periods.weeks[new Date().getWeek()].last.timeStamp
	      });

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
	  $window.onresize = function () { self.timeline.redraw() };


	  /**
	   * Timeline zoom in
	   */
	  $scope.timelineZoomIn = function () { self.timeline.zoom($rootScope.config.timeline.config.zoom, Date.now()) };


	  /**
	   * Timeline zoom out
	   */
	  $scope.timelineZoomOut = function () { self.timeline.zoom(-$rootScope.config.timeline.config.zoom, Date.now()) };
	  

	  /**
	   * Timeline legenda toggler
	   */
	  $scope.showLegenda = function () { $scope.timeline.config.legendarer = !$scope.timeline.config.legendarer };


	  /**
	   * Alter legenda settings
	   */
	  $scope.alterLegenda = function (legenda)
	  {
	    $scope.timeline.config.legenda = legenda;

	    timeliner.render({
	      start:  $scope.timeline.range.start,
	      end:    $scope.timeline.range.end
	    });
	  };

	}
])



/**
 * Settings controller
 */
.controller('settings', 
[
	'$rootScope', '$scope', '$window', 'data', 'Settings', 'Profile', 'Storage', 
	function ($rootScope, $scope, $window, data, Settings, Profile, Storage) 
	{
		/**
		 * Fix styles
		 */
		$rootScope.fixStyles();


	  /**
	   * Pass the settings
	   */
	  $scope.settings = angular.fromJson(data);


	  /**
	   * User settings: Languages
	   */
	  var languages = {};

	  angular.forEach(ui, function (lang, index) { languages[lang.meta.name] = lang.meta.label; });

	  $scope.languages = languages;


	  /**
	   * Pass the groups
	   */
	   var groups = {};

	   angular.forEach(Storage.local.groups(), function (group, index)
	   {
	     groups[group.uuid] = group.name;
	   });

	   $scope.groups = groups;


	  /**
	   * Save user settings
	   */
	  $scope.save = function (settings)
	  {
	    $rootScope.statusBar.display($rootScope.ui.settings.saving);

	    Settings.save($rootScope.app.resources.uuid, settings)
	    .then(function (saved)
	    {
	      $rootScope.notifier.success($rootScope.ui.settings.saved);

	      $rootScope.statusBar.display($rootScope.ui.settings.refreshing);

	      Profile.get($rootScope.app.resources.uuid, true)
	      .then(function (result)
	      {
	        if (result.error)
	        {
	          $rootScope.notifier.error('Error with saving settings.');
	          console.warn('error ->', result);
	        }
	        else
	        {
	          $scope.settings = angular.fromJson(result.resources.settingsWebPaige);

	          $rootScope.changeLanguage(angular.fromJson(result.resources.settingsWebPaige).user.language);

	          $rootScope.statusBar.off();
	        };
	      })
	    });
	  };


	  /**
	   * Google authorization
	   */
	  $scope.authGoogle = function ()
	  {               
	    window.location = 'http://3rc2.ask-services.appspot.com/auth/google' + 
	                      '?agentUrl=http://3rc2.ask-services.appspot.com/eveagents/personalagent/' + 
	                      $rootScope.app.resources.uuid + 
	                      '/' + 
	                      '&agentMethod=createGoogleAgents' +
	                      '&applicationCallback=' + 
	                      location.protocol + "//" + location.hostname + (location.port && ":" + location.port) + 
	                      '/index.html' + 
	                      /**
	                       * Fix a return value
	                       */
	                      '?account=' +
	                      $rootScope.app.resources.uuid +
	                      encodeURIComponent('#') + 
	                      '/settings';
	  };

	}
])



/**
 * Help controller
 */
.controller('help', 
[
	'$rootScope', '$scope', 
	function ($rootScope, $scope) 
	{
		/**
		 * Fix styles
		 */
		$rootScope.fixStyles();

	}
]);
/*jslint node: true */
/*global angular */
'use strict';


angular.module('WebPaige.Controllers.Login', [])


/**
 * Login controller
 */
  .controller(
  'login',
  [
    '$rootScope',
    '$location',
    '$q',
    '$scope',
    'Session',
    'User',
    'Groups',
    'Storage',
    '$routeParams',
    'Settings',
    'Profile',
    'MD5',
    'Messages',
    function ($rootScope, $location, $q, $scope, Session, User, Groups, Storage,
              $routeParams, Settings, Profile, MD5, Messages)
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
          changePass: true
        };

        $scope.changepass = {
          uuid: $routeParams.uuid,
          key: $routeParams.key
        }
      }
      else
      {
        $scope.views = {
          login: true,
          forgot: false
        };
      }

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
      if (! Storage.session.get('app')) Storage.session.add('app', '{}');


      /**
       * TODO:  Lose this jQuery stuff later on!
       * Jquery solution of toggling between login and app view
       */
      $('.navbar').hide();
      $('#footer').hide();
      $('#watermark').hide();
      // $('#notification').hide();
      $('body').css(
        {
          'background': 'url(../' + $rootScope.config.profile.background + ') no-repeat center center fixed',
          'backgroundSize': 'cover'
        });

      /**
       * Disable the autocomplete username/password for Firefox users
       */
      if (navigator.userAgent.indexOf("Firefox") >= 0)
      {
        $('#login form').attr('autocomplete', 'off');
      }

      /**
       * TODO: Use native JSON functions of angular and Store service
       */
      var logindata = angular.fromJson(Storage.get('logindata'));

      if (logindata && logindata.remember) $scope.logindata = logindata;


      /**
       * TODO: Remove unnecessary DOM manipulation
       * Use cookies for user credentials
       *
       * Login trigger
       */
      $scope.login = function ()
      {
        var registeredNotifications = Storage.get('registeredNotifications');
        var periods = Storage.get('periods');
        var periodsNext = Storage.get('periodsNext');
        Storage.clearAll();
        Storage.session.clearAll();
        Storage.add('registeredNotifications', registeredNotifications);
        Storage.add('periods', periods);
        Storage.add('periodsNext', periodsNext);

        $('#alertDiv').hide();

        if (! $scope.logindata || ! $scope.logindata.username || ! $scope.logindata.password)
        {
          $scope.alert = {
            login: {
              display: true,
              type: 'alert-error',
              message: $rootScope.ui.login.alert_fillfiled
            }
          };

          $('#login button[type=submit]')
            .text($rootScope.ui.login.button_login)
            .removeAttr('disabled');

          return false;
        }

        $('#login button[type=submit]')
          .text($rootScope.ui.login.button_loggingIn)
          .attr('disabled', 'disabled');

        Storage.add(
          'logindata',
          angular.toJson(
            {
              username: $scope.logindata.username,
              password: $scope.logindata.password,
              remember: $scope.logindata.remember
            }
          )
        );

        Storage.add(
          'askPass',
          MD5($scope.logindata.password)
        );

        createLocalGuardContainer();

        self.auth($scope.logindata.username, MD5($scope.logindata.password));
      };


      function createLocalGuardContainer ()
      {
        /**
         * Create storage for smart alarming guard values
         */
        if ($rootScope.config.smartAlarm)
        {
          Storage.add(
            'guard',
            angular.toJson(
              {
                monitor: '',
                role: ''
              }
            )
          );
        }
      }


      /**
       * Authorize user
       */
      self.auth = function (uuid, pass)
      {
        User.login(
          uuid.toLowerCase(),
          pass
        ).then(
          function (result)
          {
            if (result.status == 400 || result.status == 404)
            {
              $scope.alert = {
                login: {
                  display: true,
                  type: 'alert-error',
                  message: $rootScope.ui.login.alert_wrongUserPass
                }
              };

              $('#login button[type=submit]')
                .text($rootScope.ui.login.button_login)
                .removeAttr('disabled');

              return false;
            }
            else
            {
              Session.set(result["X-SESSION_ID"]);

              self.preloader();
            }
          }
        );
      };

      if ($location.search().username && $location.search().password)
      {
        createLocalGuardContainer();

        self.auth($location.search().username, $location.search().password);
      }


      /**
       * TODO: What happens if preloader stucks?
       * Optimize preloader and messages
       *
       * Initialize preloader
       */
      self.preloader = function ()
      {
        $('#login').hide();
        $('#download').hide();
        $('#preloader').show();

        self.progress(30, $rootScope.ui.login.loading_User);

        User.states()
          .then(
          function (states)
          {
            Storage.add('states', angular.toJson(states));

            angular.forEach(
              states,
              function (state) { $rootScope.config.timeline.config.states[state] = $rootScope.config.statesall[state] }
            );

            User.divisions()
              .then(
              function (divisions)
              {
                $rootScope.config.timeline.config.divisions = divisions;

                Storage.add('divisions', angular.toJson(divisions));

                User.resources()
                  .then(
                  function (resources)
                  {
                    if (resources.error)
                    {
                      console.warn('error ->', resources);
                    }
                    else
                    {
                      $rootScope.app.resources = resources;

                      self.progress(60, $rootScope.ui.login.loading_Group);

                      User.domain()
                        .then(
                        function (domainnames)
                        {
                          // NOTE: Currently using the first domainname, could be expanded
                          // in case users can be in multiple domains
                          $rootScope.app.domain = domainnames.first();

                          self.progress(70, $rootScope.ui.login.loading_Group);

                          Groups.query(true)
                            .then(
                            function (groups)
                            {
                              if (groups.error)
                              {
                                console.warn('error ->', groups);
                              }
                              else
                              {
                                var calls = [];

                                angular.forEach(
                                  groups,
                                  function (group) { calls.push(Groups.get(group.uuid)) }
                                );

                                $q.all(calls)
                                  .then(
                                  function ()
                                  {
                                    Groups.uniqueMembers();

                                    // TODO: Move settings checkup to a module!
                                    var settings = angular.fromJson(resources.settingsWebPaige) || {},
                                        sync = false,
                                        parenting = false,
                                        defaults = $rootScope.config.defaults.settingsWebPaige,
                                        _groups = function (groups)
                                        {
                                          var _groups = {};
                                          angular.forEach(
                                            groups,
                                            function (group)
                                            {
                                              _groups[group.uuid] = {
                                                status: true,
                                                divisions: false
                                              };
                                            }
                                          );

                                          return _groups;
                                        };

                                    // Check if there is any settings at all
                                    if (settings != null || settings != undefined)
                                    {
                                      // check for user settings-all
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
                                        }
                                      }
                                      else
                                      {
                                        // console.log('NO user settings at all !!');

                                        sync = true;
                                      }

                                      // check for app settings-all
                                      if (settings.app)
                                      {
                                        // check for app-widget settings
                                        if (settings.app.widgets)
                                        {
                                          // check for app-widget-groups setting
                                          if (settings.app.widgets.groups)
                                          {
                                            // console.log('settings for groups =>', settings.app.widgets.groups);

                                            var oldGroupSetup = false;

                                            if (! jQuery.isEmptyObject(settings.app.widgets.groups))
                                            {
                                              angular.forEach(
                                                settings.app.widgets.groups,
                                                function (value)
                                                {
                                                  // console.log('value ->', value);

                                                  if (typeof value !== 'object' || value == {})
                                                  {
                                                    oldGroupSetup = true;
                                                  }
                                                }
                                              );
                                            }
                                            else
                                            {
                                              oldGroupSetup = true;
                                            }

                                            if (oldGroupSetup)
                                            {
                                              // console.warn('OLD SETUP => user has NO app widgets groups!!');

                                              defaults.app.widgets.groups = _groups(groups);
                                              sync = true;
                                            }
                                            else
                                            {
                                              // console.warn('user HAS app widgets groups settings');

                                              defaults.app.widgets.groups = settings.app.widgets.groups;
                                            }
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
                                        }

                                        // check for app group setting
                                        if (settings.app.group && settings.app.group != undefined)
                                        {
                                          var exists = true;

                                          angular.forEach(
                                            groups,
                                            function (_group)
                                            {
                                              var firstGroup = new RegExp(settings.app.group);

                                              if (! firstGroup.test(_group.uuid))
                                              {
                                                if (! exists)
                                                {
                                                  exists = false;
                                                }
                                              }
                                              else
                                              {
                                                exists = true;
                                              }
                                            }
                                          );

                                          if (! exists)
                                          {
                                            sync = true;
                                          }
                                        }
                                        else
                                        {
                                          // console.warn('user has NO first group setting!!');

                                          parenting = true;
                                          sync = true;
                                        }
                                      }
                                      else
                                      {
                                        // console.log('NO app settings!!');

                                        defaults.app = { widgets: { groups: _groups(groups) } };

                                        sync = true;
                                      }
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
                                    }

                                    // sync settings with missing parts also parenting check
                                    if (sync)
                                    {
                                      if (parenting)
                                      {
                                        // console.warn('setting up parent group for the user');

                                        Groups.parents()
                                          .then(
                                          function (_parent)
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
                                            }

                                            // console.warn('SAVE ME (with parenting) ->', defaults);

                                            Settings.save(
                                              resources.uuid,
                                              defaults
                                            ).then(
                                              function ()
                                              {
                                                User.resources()
                                                  .then(
                                                  function (got)
                                                  {
                                                    // console.log('gotted (with setting parent group) ->', got);

                                                    $rootScope.app.resources = got;

                                                    finalize();
                                                  }
                                                )
                                              }
                                            );
                                          }
                                        );
                                      }
                                      else
                                      {
                                        // console.warn('SAVE ME ->', defaults);

                                        defaults.app.group = groups[0].uuid;

                                        Settings.save(
                                          resources.uuid,
                                          defaults
                                        ).then(
                                          function ()
                                          {
                                            User.resources()
                                              .then(
                                              function (got)
                                              {
                                                // console.log('gotted ->', got);

                                                $rootScope.app.resources = got;

                                                finalize();
                                              }
                                            );
                                          }
                                        );
                                      }
                                    }
                                    else
                                    {
                                      try
                                      {
                                        ga(
                                          'send', 'pageview', {
                                            'dimension1': resources.uuid,
                                            'dimension2': $rootScope.app.domain
                                          }
                                        );

                                        ga('send', 'event', 'Login', resources.uuid);
                                      }
                                      catch (err)
                                      {
                                        // console.warn('Google analytics library!', err);
                                      }

                                      finalize();
                                    }
                                  }
                                );
                              }
                            }
                          );
                        }
                      );
                    }
                  }
                );
              }
            );
          }
        );

      };


      /**
       * Finalize the preloading
       */
      function finalize ()
      {
        self.progress(100, $rootScope.ui.login.loading_everything);

        self.redirectToDashboard();

        self.getMessages();
      }


      /**
       * TODO: Implement an error handling
       * Get messages (SILENTLY)
       */
      self.getMessages = function ()
      {
        Messages.query()
          .then(
          function (messages)
          {
            if (messages.error)
            {
              console.warn('error ->', messages);
            }
            else
            {
              $rootScope.app.unreadMessages = Messages.unreadCount();

              Storage.session.unreadMessages = Messages.unreadCount();
            }
          }
        );
      };


      /**
       * Redirect to dashboard
       */
      self.redirectToDashboard = function ()
      {
        $location.search({});

        $location.path('/dashboard');

        setTimeout(
          function ()
          {
            $('body').css({ 'background': 'none' });
            $('.navbar').show();
            // $('#mobile-status-bar').show();
            // $('#notification').show();
            if (! $rootScope.browser.mobile) $('#footer').show();
            $('#watermark').show();
            $('body').css({ 'background': 'url(../img/bg.jpg) repeat' });
          }, $rootScope.config.timers.TICKER);
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
       * TODO: RE-FACTORY Make button state change! Finish it!
       * Forgot password
       */
      $scope.forgot = function ()
      {
        $('#forgot button[type=submit]').text($rootScope.ui.login.setting).attr('disabled', 'disabled');

        User.password($scope.remember.id)
          .then(
          function (result)
          {
            if (result == "ok")
            {
              $scope.alert = {
                forget: {
                  display: true,
                  type: 'alert-success',
                  message: $rootScope.ui.login.checkYourMail
                }
              };
            }
            else
            {
              $scope.alert = {
                forget: {
                  display: true,
                  type: 'alert-error',
                  message: $rootScope.ui.errors.login.forgotCantFind
                }
              };
            }

            $('#forgot button[type=submit]')
              .text($rootScope.ui.login.button_changePassword)
              .removeAttr('disabled');
          });
      };


      /**
       * TODO: RE-FACTORY
       * Change password
       */
      self.changePass = function (uuid, newpass, key)
      {
        User.changePass(uuid, newpass, key)
          .then(
          function (result)
          {
            if (result.status == 400 || result.status == 500 || result.status == 409)
            {
              $scope.alert = {
                changePass: {
                  display: true,
                  type: 'alert-error',
                  message: $rootScope.ui.errors.login.changePass
                }
              };
            }
            else
            { // successfully changed
              $scope.alert = {
                changePass: {
                  display: true,
                  type: 'alert-success',
                  message: $rootScope.ui.login.passwordChanged
                }
              };

              $location.path("/message");
            }

            $('#changePass button[type=submit]')
              .text($rootScope.ui.login.button_changePassword)
              .removeAttr('disabled');
          })
      };


      /**
       * TODO: RE-FACTORY
       * Change password
       */
      $scope.changePass = function ()
      {
        $('#alertDiv').hide();

        if (! $scope.changeData || ! $scope.changeData.newPass || ! $scope.changeData.retypePass)
        {
          $scope.alert = {
            changePass: {
              display: true,
              type: 'alert-error',
              message: $rootScope.ui.errors.login.changePassAllFields
            }
          };

          $('#changePass button[type=submit]')
            .text($rootScope.ui.login.button_changePassword)
            .removeAttr('disabled');

          return false;
        }
        else if ($scope.changeData.newPass != $scope.changeData.retypePass)
        {
          $scope.alert = {
            changePass: {
              display: true,
              type: 'alert-error',
              message: $rootScope.ui.errors.login.changePassNoMatch
            }
          };

          $('#changePass button[type=submit]')
            .text($rootScope.ui.login.button_changePassword)
            .removeAttr('disabled');

          return false;
        }

        $('#changePass button[type=submit]')
          .text($rootScope.ui.login.button_changingPassword)
          .attr('disabled', 'disabled');

        self.changePass($scope.changepass.uuid, MD5($scope.changeData.newPass), $scope.changepass.key);
      };


      if (localStorage.hasOwnProperty('sessionTimeout'))
      {
        localStorage.removeItem('sessionTimeout');

        $scope.alert = {
          login: {
            display: true,
            type: 'alert-error',
            message: $rootScope.ui.login.sessionTimeout
          }
        };
      }

    }
  ])
;
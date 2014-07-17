/*jslint node: true */
/*global angular */
'use strict';


angular.module('WebPaige.Controllers.Profile', [])


/**
 * Profile controller
 */
  .controller(
  'profile',
  [
    '$rootScope',
    '$scope',
    '$q',
    '$location',
    '$window',
    '$route',
    'data',
    'Profile',
    'Storage',
    'Groups',
    'Dater',
    'MD5',
    '$timeout',
    function ($rootScope, $scope, $q, $location, $window, $route, data, Profile, Storage, Groups, Dater, MD5, $timeout)
    {
      $rootScope.notification.status = false;

      /**
       * Fix styles
       */
      $rootScope.fixStyles();

      $rootScope.resetPhoneNumberChecker();

      /**
       * Pass the self
       */
      $scope.self = this;

      $scope.deleteUserError = false;

      $scope.userPassword = '';

      $scope.showDeleteUserModal = function () { $('#deleteUserModal').modal('show') };

      $scope.deleteUser = function (userPassword)
      {
        $scope.deleteUserError = false;

        if (userPassword != '' && userPassword != undefined)
        {
          if ($rootScope.app.resources.role == 1)
          {
            if ($rootScope.app.resources.uuid.toLowerCase() != $route.current.params.userId)
            {
              // console.log('pass ->', MD5(userPassword), $rootScope.app.resources.askPass);
              // Switched from $rootScope.app.resources.askPass to localStorage
              if (MD5(userPassword) == Storage.get('askPass'))
              {
                $rootScope.statusBar.display($rootScope.ui.profile.remove.inProgress);

                Profile.remove(data.resources.uuid)
                  .then(
                  function (result)
                  {
                    $rootScope.statusBar.off();

                    $scope.userPassword = '';

                    if (result.hasOwnProperty('error'))
                    {
                      $scope.deleteUserError = true;
                      $scope.deleteUserErrorMessage = $rootScope.ui.errors.profile.remove.general;
                    }
                    else
                    {
                      $rootScope.notifier.success($rootScope.ui.profile.remove.success);

                      $location.path('/groups').hash('').search({});
                    }
                  }
                );
              }
              else
              {
                $rootScope.statusBar.off();

                $scope.userPassword = '';

                $scope.deleteUserError = true;
                $scope.deleteUserErrorMessage = $rootScope.ui.errors.profile.remove.password;
              }
            }
            else
            {
              $rootScope.statusBar.off();

              $scope.deleteUserError = true;
              $scope.deleteUserErrorMessage = $rootScope.ui.errors.profile.remove.self;
            }
          }
          else
          {
            $rootScope.statusBar.off();

            $scope.deleteUserError = true;
            $scope.deleteUserErrorMessage = $rootScope.ui.errors.profile.remove.auth;
          }
        }
        else
        {
          $rootScope.statusBar.off();

          $scope.deleteUserError = true;
          $scope.deleteUserErrorMessage = $rootScope.ui.errors.profile.remove.empty;
        }
      };

      /**
       * Pass periods
       */
      $scope.periods = Dater.getPeriods();

      /**
       * Pass current
       */
      $scope.current = {
        day: Dater.current.today() + 1,
        week: Dater.current.week(),
        month: Dater.current.month()
      };


      /**
       * Set data for view
       */
      if (($rootScope.app.resources.uuid.toLowerCase() != $route.current.params.userId))
      {
        if (data && data.slots)
        {
          data.user = data.slots.data;
        }
      }

      /**
       * Pass data container
       */
      $scope.data = data;

      $scope.profileRole = data.resources.role;

      /**
       * Grab and set roles for view
       */
      var roles = {};

      angular.forEach(
        $rootScope.config.roles,
        function (role) { roles[role.id] = role.label }
      );

      $scope.roles = roles;

      /**
       * Pass profile information
       */
      $scope.profilemeta = data && data.resources;

      /**
       * Get groups of user
       */
      $scope.groups = $route.current.params.userId && Groups.getMemberGroups($route.current.params.userId.toLowerCase());

      $scope.availableGroups = angular.fromJson(Storage.get('groups'));

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
       * Slot form toggle
       */
      $scope.toggleSlotForm = function ()
      {
        if ($scope.forms.add)
        {
          $scope.resetInlineForms();
        }
        else
        {
          $timeout(
            function ()
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
                state: '',
                recursive: false,
                id: ''
              };

              $scope.forms = {
                add: true,
                edit: false
              };
            }, 20
          );
        }
      };

      /**
       * Reset inline forms
       */
      $scope.resetInlineForms = function ()
      {
        $timeout(
          function ()
          {
            $scope.slot = {};

            $scope.original = {};

            $scope.forms = {
              add: false,
              edit: false
            };
          }, 20
        );
      };

      /**
       * Extract view action from url and set view
       */
      setView($location.hash());

      function setGroupSelection ()
      {
        $scope.userGroups = [];

        angular.forEach(
          $("div#editTab select.chzn-select option"),
          function (option)
          {
            angular.forEach(
              $scope.groups,
              function (userGroup)
              {
                if (option.innerHTML == userGroup.name)
                {
                  $scope.userGroups.push(userGroup);

                  option.selected = true;
                }
              }
            );
          }
        );

        $("div#editTab select.chzn-select").trigger("liszt:updated");
      }

      /**
       * View setter
       */
      function setView (hash)
      {
        $scope.views = {
          profile: false,
          edit: false,
          password: false,
          timeline: false
        };

        $timeout(
          function () { setGroupSelection() },
          100
        );

        if (hash == 'edit')
        {
          $rootScope.phoneNumberParser($scope.profilemeta.PhoneAddress);
        }

        $scope.views[hash] = true;

        $scope.views.user = ($rootScope.app.resources.uuid.toLowerCase() == $route.current.params.userId);
      }

      /**
       * Switch between the views and set hash accordingly
       */
      $scope.setViewTo = function (hash)
      {
        $scope.$watch(
          $location.hash(),
          function ()
          {
            $location.hash(hash);

            setView(hash);
          }
        );
      };

      $scope.$watch(
        'profilemeta.PhoneAddress',
        function (value)
        {
          if (value == '')
          {
            $rootScope.resetPhoneNumberChecker();
          }
        }
      );

      var CHECK_PINCODE_DELAY = 250;

      $scope.pincodeExistsValidation = true;

      $scope.pincodeExists = function ()
      {
        if ($scope.profilemeta.pincode != '' || $scope.profilemeta.pincode.length > 0)
        {
          if ($scope.checkPincode)
          {
            clearTimeout($scope.checkPincode);

            $scope.checkPincode = null;
          }

          $scope.checkPincode = setTimeout(
            function ()
            {
              $scope.checkPincode = null;

              Profile.pincodeExists($scope.profilemeta.pincode)
                .then(
                function (result) { $scope.pincodeExistsValidation = result }
              );
            }, CHECK_PINCODE_DELAY);
        }
        else
        {
          $scope.profilemeta.pincode = '';
        }
      };

      $scope.checkPincode = null;


      /**
       * Save user
       */
      $scope.save = function (resources)
      {
        if (! $rootScope.phoneNumberParsed.result && $scope.profilemeta.PhoneAddress != '')
        {
          $rootScope.notifier.error($rootScope.ui.errors.phone.notValidOnSubmit);

          $rootScope.statusBar.off();

          $('body').scrollTop(0);

          return false;
        }

        $rootScope.statusBar.display($rootScope.ui.profile.saveProfile);

        if (resources.Password)
        {
          resources.askPass = MD5(resources.Password);
        }

        if (resources.PhoneAddress)
        {
          var parsed = phoneNumberParser(resources.PhoneAddress, 'NL');

          resources.PhoneAddress = parsed.formatting.e164;
        }

        Profile.save(
          $route.current.params.userId,
          resources
        ).then(
          function (result)
          {
            if (result.error)
            {
              $rootScope.notifier.error($rootScope.ui.errors.profile.save);
              console.warn('error ->', result);
            }
            else
            {
              $rootScope.statusBar.display($rootScope.ui.profile.changingRole);

              console.log('$scope.profileRole ->', $scope.profileRole);

              if (!angular.isDefined($scope.profileRole) || $scope.profileRole == '')
              {
                $scope.profileRole = 3;
              }

              Profile.role(
                data.resources.uuid,
                $scope.profileRole
                // $scope.data.resources.role
              ).then(
                function (result)
                {
                  if (result.error)
                  {
                    console.warn('error with changing user role!');
                  }
                  else
                  {
                    $rootScope.statusBar.display($rootScope.ui.profile.settingGroups);

                    var userGroups = [];

                    angular.forEach(
                      $scope.userGroups,
                      function (group) { userGroups.push(group.uuid) }
                    );

                    Profile.membership(
                      $route.current.params.userId,
                      userGroups
                    ).then(
                      function (result)
                      {
                        if (result.error)
                        {
                          $rootScope.notifier.error($rootScope.ui.errors.profile.settingGroups);
                          console.warn('error ->', result);
                        }
                        else
                        {
                          $rootScope.statusBar.display($rootScope.ui.groups.refreshingGroupMember);

                          Groups.query().
                            then(
                            function (data)
                            {
                              if (data.error)
                              {
                                $rootScope.notifier.error($rootScope.ui.errors.groups.query);
                                console.warn('error ->', data);
                              }
                              else
                              {
                                $scope.groups = $route.current.params.userId &&
                                                Groups.getMemberGroups($route.current.params.userId.toLowerCase());

                                $rootScope.statusBar.display($rootScope.ui.profile.refreshing);

                                var flag = ($route.current.params.userId.toLowerCase() == $rootScope.app.resources.uuid);

                                Profile.get(
                                  $route.current.params.userId.toLowerCase(),
                                  flag
                                ).then(
                                  function (data)
                                  {
                                    if (data.error)
                                    {
                                      $rootScope.notifier.error($rootScope.ui.errors.profile.get);
                                      console.warn('error ->', data);
                                    }
                                    else
                                    {
                                      $rootScope.notifier.success($rootScope.ui.profile.dataChanged);

                                      $scope.data = data;

                                      $rootScope.statusBar.off();

                                      $('body').scrollTop(0);
                                    }
                                  }
                                );
                              }
                            }
                          );
                        }
                      }
                    );
                  }
                }
              );
            }
          }
        );
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
        }

        if (passwords.new1 != passwords.new2)
        {
          $rootScope.notifier.error($rootScope.ui.profile.passNotMatch, true);

          return false;
        }

        // console.log('askPass ->', $rootScope.app.resources.askPass);
        // console.log('current ->', passwords.current, MD5(passwords.current));

        if ($rootScope.app.resources.askPass == MD5(passwords.current))
        {
          $rootScope.statusBar.display($rootScope.ui.profile.changingPass);

          Profile.changePassword(passwords)
            .then(
            function (result)
            {
              if (result.error)
              {
                $rootScope.notifier.error($rootScope.ui.errors.profile.changePassword);
                console.warn('error ->', result);
              }
              else
              {
                $rootScope.statusBar.display($rootScope.ui.profile.refreshing);

                Profile.get($rootScope.app.resources.uuid, true)
                  .then(
                  function (data)
                  {
                    if (data.error)
                    {
                      $rootScope.notifier.error($rootScope.ui.errors.profile.get);
                      console.warn('error ->', data);
                    }
                    else
                    {
                      $rootScope.notifier.success($rootScope.ui.profile.passChanged);

                      $scope.data = data;

                      $rootScope.statusBar.off();
                    }
                  });
              }
            });
        }
        else
        {
          // console.log('passwrong ->', $rootScope.ui.profile.passwrong);
          $rootScope.notifier.error($rootScope.ui.profile.passwrong, true);
        }
      };

      /**
       * Render timeline if hash is timeline
       */
      if ($route.current.params.userId &&
          $rootScope.app.resources.uuid != $route.current.params.userId.toLowerCase())
      {
        timelinebooter();
      }

      /**
       * TODO: Is it really needed? Since the timeline-booter is disabled
       * Redraw timeline
       */
      $scope.redraw = function ()
      {
        setTimeout(
          function ()
          {
            if ($scope.self.timeline)
            {
              $scope.self.timeline.redraw();
            }
          }, $rootScope.config.timers.TICKER);
      };

      function timelinebooter ()
      {
        $scope.timeline = {
          id: 'userTimeline',
          main: false,
          user: {
            id: $route.current.params.userId
          },
          current: $scope.current,
          options: {
            start: new Date($scope.periods.weeks[$scope.current.week].first.day),
            end: new Date($scope.periods.weeks[$scope.current.week].last.day),
            min: new Date($scope.periods.weeks[$scope.current.week].first.day),
            max: new Date($scope.periods.weeks[$scope.current.week].last.day)
          },
          range: {
            start: $scope.periods.weeks[$scope.current.week].first.day,
            end: $scope.periods.weeks[$scope.current.week].last.day
          },
          config: {
            legenda: {},
            legendarer: $rootScope.config.timeline.config.legendarer,
            states: $rootScope.config.timeline.config.states
          }
        };

        var states = {};

        angular.forEach(
          $scope.timeline.config.states,
          function (state, key) { states[key] = state.label }
        );

        $scope.states = states;

        angular.forEach(
          $rootScope.config.timeline.config.states,
          function (state, index)
          {
            $scope.timeline.config.legenda[index] = true;
          }
        );


        /**
         * Prepare timeline range for date-ranger widget
         */
        $scope.daterange = Dater.readable.date($scope.timeline.range.start) + ' / ' +
                           Dater.readable.date($scope.timeline.range.end);


        $('#timeline').html('');
        $('#timeline').append('<div id="userTimeline"></div>');
      }
    }
  ]);
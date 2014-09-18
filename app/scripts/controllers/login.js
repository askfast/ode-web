define(['controllers/controllers'], function (controllers) {
  'use strict';

  controllers.controller('login', function ($rootScope, $location, $q, $scope, Session, UserLegacy, Groups, Messages, Storage, Store, $routeParams, Settings, Profile, MD5, User, Environment, Network) {
    if ($routeParams.uuid && $routeParams.key) {
      $scope.views = {
        changePass: true
      };

      $scope.changepass = {
        uuid: $routeParams.uuid,
        key: $routeParams.key
      }
    } else {
      $scope.views = {
        login: true,
        forgot: false
      };
    }

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

    // -----------------------------------------------------------------------
    // if (!Storage.session.get('app')) Storage.session.add('app', '{}');
    // -----------------------------------------------------------------------

    angular.element('.navbar').hide();
    angular.element('#footer').hide();
    angular.element('#watermark').hide();
    angular.element('body').css({
      'background': 'url(../' + $rootScope.StandBy.config.profile.background + ') no-repeat center center fixed',
      'backgroundSize': 'cover'
    });
    if (navigator.userAgent.indexOf("Firefox") >= 0)
      angular.element('#login form').attr('autocomplete', 'off');

    // -----------------------------------------------------------------------

    var logindata = Store('environment').get('logindata');
    if (logindata && logindata.remember) $scope.logindata = logindata;

    // -----------------------------------------------------------------------

    $scope.login = function () {
      var registeredNotifications = Store('notifications').get('registeredNotifications');
      var periods = Store('app').get('periods');
      var periodsNext = Store('app').get('periodsNext');

      Store('network').nuke();
      Store('environment').nuke();
      Store('messages').nuke();
      Store('records').nuke();
      Store('smartAlarm').nuke();
      Store('notifications').nuke();
      Store('user').nuke();
      Store('app').nuke();

      Storage.clearAll();
      Storage.session.clearAll();
      Store('notifications').save('registeredNotifications', registeredNotifications);
      Store('app').save('periods', periods);
      Store('app').save('periodsNext', periodsNext);

      angular.element('#alertDiv').hide();

      angular.element('#login button[type=submit]').text($rootScope.ui.login.button_loggingIn).attr('disabled', 'disabled');

      if (!$scope.logindata || !$scope.logindata.username || !$scope.logindata.password) {
        $scope.alert = {
          login: {
            display: true,
            type: 'alert-error',
            message: $rootScope.ui.login.alert_fillfiled
          }
        };

        angular.element('#login button[type=submit]').text($rootScope.ui.login.button_login).removeAttr('disabled');

        return false;
      }

      Store('environment').save('logindata', {
        username: $scope.logindata.username,
        password: $scope.logindata.password,
        remember: $scope.logindata.remember
      });

      Store('environment').save('askPass', MD5($scope.logindata.password));

      // Legacy
      // authenticate($scope.logindata.username, MD5($scope.logindata.password));

      // New code
      authenticate($scope.logindata.username, $scope.logindata.password);
    };

    if ($location.search().username && $location.search().password) {
      authenticate($location.search().username, $location.search().password);
    }

    function authenticate(uuid, pass) {
      if ($rootScope.StandBy.config.smartAlarm) {
        Store('smartAlarm').save('guard', {
          monitor: '',
          role: ''
        });
      }

      // New code

      User.login(uuid, pass).then(function (result) {
        if (result.error && result.error.status) {
          $scope.alert = {
            login: {
              display: true,
              type: 'alert-error',
              // message: $rootScope.ui.login.alert_wrongUserPass
              message: (result.error.status == 400 ||
                result.error.status == 403 ||
                result.error.status == 404) ?
                'Wrong username or password!' :
                'There has been an error with your login!'
            }
          };

          angular.element('#login button[type=submit]').text($rootScope.ui.login.button_login).removeAttr('disabled');

          return false;
        } else {

          angular.element('#login').hide();
          angular.element('#download').hide();
          angular.element('#preloader').show();

          progress(30, $rootScope.ui.login.loading_User);

          User.resources().then(function (resources) {
            progress(50, 'Setting up environment.');

            Environment.setup().then(function () {
              progress(70, $rootScope.ui.login.loading_Group);

              Network.groups().then(function (groups) {
                progress(70, 'Populating group members.');

                Network.population().then(function () {
                  configure(resources, groups);
//                  Planboard.clusters().then(function () {
//                    $scope.preloaded = 'Getting user availability.';
//
//                    Planboard.availability(resources.uuid).then(function () {
//                      $scope.preloaded = 'Getting member availabilities.';
//
//                      Planboard.availabilities().then(function () {
//                        $location.path('/dashboard')
//                      });
//                    });
//                  });
                });
              });
            });
          });
        }
      });
    }

    function configure(resources, groups) {
      var settings = angular.fromJson(resources.settingsWebPaige) || {},
        sync = false,
        parenting = false,
        defaults = $rootScope.StandBy.config.defaults.settingsWebPaige;

      var _groups = function (groups) {
        var _groups = {};
        _.each(groups, function (group) {
          _groups[group.uuid] = {
            status: true,
            divisions: false
          };
        });

        return _groups;
      };

      if (settings != null || settings != undefined) {
        if (settings.user) {
          if (settings.user.language) {
            $rootScope.changeLanguage(angular.fromJson(resources.settingsWebPaige).user.language);
            defaults.user.language = settings.user.language;
          } else {
            $rootScope.changeLanguage($rootScope.StandBy.config.defaults.settingsWebPaige.user.language);
            sync = true;
          }
        } else {
          sync = true;
        }

        if (settings.app) {
          if (settings.app.widgets) {
            if (settings.app.widgets.groups) {
              var oldGroupSetup = false;

              if (!jQuery.isEmptyObject(settings.app.widgets.groups)) {
                _.each(settings.app.widgets.groups, function (value) {
                  if (typeof value !== 'object' || value == {})
                    oldGroupSetup = true;
                });
              } else {
                oldGroupSetup = true;
              }

              if (oldGroupSetup) {
                defaults.app.widgets.groups = _groups(groups);
                sync = true;
              } else {
                defaults.app.widgets.groups = settings.app.widgets.groups;
              }
            } else {
              defaults.app.widgets.groups = _groups(groups);
              sync = true;
            }
          } else {
            defaults.app.widgets = { groups: _groups(groups) };
            sync = true;
          }

          if (settings.app.group && settings.app.group != undefined) {
            var exists = true;

            _.each(groups, function (_group) {
              var firstGroup = new RegExp(settings.app.group);

              if (!firstGroup.test(_group.uuid)) {
                if (!exists) exists = false;
              } else {
                exists = true;
              }
            });

            if (!exists) sync = true;
          } else {
            parenting = true;
            sync = true;
          }
        } else {
          defaults.app = {
            widgets: {
              groups: _groups(groups)
            }
          };

          sync = true;
        }
      } else {
        defaults = {
          user: $rootScope.StandBy.config.defaults.settingsWebPaige.user,
          app: {
            widgets: {
              groups: _groups(groups)
            },
            group: groups[0].uuid
          }
        };
        sync = true;
      }

      if (sync) {
        if (parenting) {
          Groups.parents().then(function (_parent) {
            if (_parent != null) {
              defaults.app.group = _parent;
            }
            else {
              defaults.app.group = groups[0].uuid;
            }

            Settings.save(resources.uuid, defaults).then(function () {
              User.resources().then(function (got) {
                $rootScope.StandBy.resources = got;
                finalize();
              });
            });
          });
        } else {
          defaults.app.group = groups[0].uuid;

          Settings.save(resources.uuid, defaults).then(function () {
            User.resources().then(function (got) {
              $rootScope.StandBy.resources = got;
              finalize();
            });
          });
        }
      } else {
        try {
          ga('send', 'pageview', {
            'dimension1': resources.uuid,
            'dimension2': $rootScope.StandBy.environment.domain
          });

          ga('send', 'event', 'Login', resources.uuid);
        } catch (err) {
          // console.warn('Google analytics library!', err);
        }

        finalize();
      }
    }

    function finalize() {
      progress(100, $rootScope.ui.login.loading_everything);

      $location.search({});

      setTimeout(function () {
        angular.element('body').css({ 'background': 'url(../images/bg.jpg) repeat' });
        angular.element('.navbar').show();
        angular.element('#watermark').show();
        if (!$rootScope.browser.mobile)
          angular.element('#footer').show();
      }, $rootScope.StandBy.config.timers.TICKER);

      Messages.query().then(function () {
        $rootScope.StandBy.unreadMessages = Messages.unreadCount();
        //Storage.session.unreadMessages = Messages.unreadCount();
      });

      $location.path('/dashboard');
    }

    function progress(ratio, message) {
      angular.element('#preloader .progress .bar').css({ width: ratio + '%' });
      angular.element('#preloader span').text(message);
    }

    // -----------------------------------------------------------------------

    $scope.forgot = function () {
      angular.element('#forgot button[type=submit]').text($rootScope.ui.login.setting).attr('disabled', 'disabled');

      User.password($scope.remember.id).then(function (result) {
        if (result == "ok") {
          $scope.alert = {
            forget: {
              display: true,
              type: 'alert-success',
              message: $rootScope.ui.login.checkYourMail
            }
          };
        } else {
          $scope.alert = {
            forget: {
              display: true,
              type: 'alert-error',
              message: $rootScope.ui.errors.login.forgotCantFind
            }
          };
        }

        angular.element('#forgot button[type=submit]').text($rootScope.ui.login.button_changePassword).removeAttr('disabled');
      });
    };

    $scope.changePass = function () {
      angular.element('#alertDiv').hide();

      if (!$scope.changeData || !$scope.changeData.newPass || !$scope.changeData.retypePass) {
        $scope.alert = {
          changePass: {
            display: true,
            type: 'alert-error',
            message: $rootScope.ui.errors.login.changePassAllFields
          }
        };

        angular.element('#changePass button[type=submit]').text($rootScope.ui.login.button_changePassword).removeAttr('disabled');

        return false;
      } else if ($scope.changeData.newPass != $scope.changeData.retypePass) {
        $scope.alert = {
          changePass: {
            display: true,
            type: 'alert-error',
            message: $rootScope.ui.errors.login.changePassNoMatch
          }
        };

        angular.element('#changePass button[type=submit]').text($rootScope.ui.login.button_changePassword).removeAttr('disabled');

        return false;
      }

      angular.element('#changePass button[type=submit]').text($rootScope.ui.login.button_changingPassword).attr('disabled', 'disabled');

      User.changePass($scope.changepass.uuid, MD5($scope.changeData.newPass), $scope.changepass.key).then(function (result) {
        if (result.status == 400 || result.status == 500 || result.status == 409) {
          $scope.alert = {
            changePass: {
              display: true,
              type: 'alert-error',
              message: $rootScope.ui.errors.login.changePass
            }
          };
        } else {
          $scope.alert = {
            changePass: {
              display: true,
              type: 'alert-success',
              message: $rootScope.ui.login.passwordChanged
            }
          };

          $location.path("/message");
        }

        angular.element('#changePass button[type=submit]').text($rootScope.ui.login.button_changePassword).removeAttr('disabled');
      });
    };

    // -----------------------------------------------------------------------
    Store('environment').has('sessionTimeout', function(res){
      if(res) {
        Store('environment').remove('sessionTimeout');

        $scope.alert = {
          login: {
            display: true,
            type: 'alert-error',
            message: $rootScope.ui.login.sessionTimeout
          }
        };
      }
    });
    /*if (Store('environment').has('sessionTimeout')) {
      Store('environment').remove('sessionTimeout');

      $scope.alert = {
        login: {
          display: true,
          type: 'alert-error',
          message: $rootScope.ui.login.sessionTimeout
        }
      };
    }*/
  });
});
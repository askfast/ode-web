define(['controllers/controllers'], function (controllers) {
  'use strict';

  controllers.controller('profile', function ($rootScope, $scope, $q, $location, $window, $route, data, Profile, Storage, Groups, Dater, MD5, $timeout) {
    $rootScope.notification.status = false;

    $rootScope.fixStyles();

    $rootScope.resetPhoneNumberChecker();

    $scope.self = this;

    $scope.deleteUserError = false;

    $scope.userPassword = '';

    $scope.showDeleteUserModal = function () {
      $('#deleteUserModal').modal('show')
    };

    $scope.deleteUser = function (userPassword) {
      $scope.deleteUserError = false;

      if (userPassword != '' && userPassword != undefined) {
        if ($rootScope.StandBy.resources.role <= 1) {
          if ($rootScope.StandBy.resources.uuid.toLowerCase() != $route.current.params.userId) {
            if (MD5(userPassword) == Storage.get('askPass')) {
              $rootScope.statusBar.display($rootScope.ui.profile.remove.inProgress);

              Profile.remove(data.resources.uuid).then(function (result) {
                $rootScope.statusBar.off();

                $scope.userPassword = '';

                if (result.hasOwnProperty('error')) {
                  $scope.deleteUserError = true;
                  $scope.deleteUserErrorMessage = $rootScope.ui.errors.profile.remove.general;
                } else {
                  $rootScope.notifier.success($rootScope.ui.profile.remove.success);

                  $location.path('/groups').hash('').search({});
                }
              });
            } else {
              $rootScope.statusBar.off();

              $scope.userPassword = '';

              $scope.deleteUserError = true;
              $scope.deleteUserErrorMessage = $rootScope.ui.errors.profile.remove.password;
            }
          } else {
            $rootScope.statusBar.off();

            $scope.deleteUserError = true;
            $scope.deleteUserErrorMessage = $rootScope.ui.errors.profile.remove.self;
          }
        } else {
          $rootScope.statusBar.off();

          $scope.deleteUserError = true;
          $scope.deleteUserErrorMessage = $rootScope.ui.errors.profile.remove.auth;
        }
      } else {
        $rootScope.statusBar.off();

        $scope.deleteUserError = true;
        $scope.deleteUserErrorMessage = $rootScope.ui.errors.profile.remove.empty;
      }
    };

    $scope.periods = Dater.getPeriods();

    $scope.current = {
      day: Dater.current.today() + 1,
      week: Dater.current.week(),
      month: Dater.current.month()
    };

    if (($rootScope.StandBy.resources.uuid.toLowerCase() != $route.current.params.userId)) {
      if (data && data.slots) {
        data.user = data.slots.data;
      }
    }

    $scope.data = data;

    $timeout(function () {
      if (data.hasOwnProperty('resources')) {
        $scope.profileRole = data.resources.role;

        if (!data.resources.hasOwnProperty('EmailAddress'))
          $scope.data.resources.EmailAddress = '';

        if (!data.resources.hasOwnProperty('pagerId'))
          $scope.data.resources.pagerId = '';

        if (!data.resources.hasOwnProperty('PostAddress'))
          $scope.data.resources.PostAddress = '';

        if (!data.resources.hasOwnProperty('PostZip'))
          $scope.data.resources.PostZip = '';

        if (!data.resources.hasOwnProperty('PostCity'))
          $scope.data.resources.PostCity = '';
      }
    }, 25);

    var roles = {};

    _.each($rootScope.StandBy.config.roles, function (role) {
      roles[role.id] = role.label;
    });

    $scope.roles = roles;

    if (!data.resources.PhoneAddresses) {
      data.resources.PhoneAddresses = [];
    }

    $scope.profilemeta = data && data.resources;

    $scope.profilemeta.phones = {
      1: data.resources.PhoneAddresses[0] || '',
      2: data.resources.PhoneAddresses[1],
      3: data.resources.PhoneAddresses[2]
    };

    $scope.phoneViews = {
      second: angular.isDefined(data.resources.PhoneAddresses[1]),
      third: angular.isDefined(data.resources.PhoneAddresses[2])
    };

    $scope.addPhoneNumber = function (index) {
      $scope.phoneViews[index] = true;
    };

    $scope.removePhoneNumber = function (num, index) {
      $scope.phoneViews[index] = false;

      $scope.profileResetPhoneNumberChecker(num);

      $timeout(function () {
        $scope.data.resources.PhoneAddresses.splice(num - 1, 1);

        delete $scope.profilemeta.phones[num];

        $scope.profilePhoneNumberParser();
      });
    };

    $scope.profilePhoneNumberParsed = {
      1: {},
      2: {},
      3: {}
    };

    $scope.profileResetPhoneNumberChecker = function (index) {
      $scope.profilePhoneNumberParsed[index] = {};

      $scope.profilePhoneNumberParsed[index].result = true;
    };

    $scope.$watch('profilemeta.phones[1]', function (value) {
      if (value == '')
        $scope.profileResetPhoneNumberChecker(1);
    });

    $scope.$watch('profilemeta.phones[2]', function (value) {
      if (value == '')
        $scope.profileResetPhoneNumberChecker(2);
    });

    $scope.$watch('profilemeta.phones[3]', function (value) {
      if (value == '')
        $scope.profileResetPhoneNumberChecker(3);
    });

    $scope.profileResetPhoneNumberChecker(1);
    $scope.profileResetPhoneNumberChecker(2);
    $scope.profileResetPhoneNumberChecker(3);

    $scope.profilePhoneNumberParser = function () {
      var checked;

      _.each([1, 2, 3], function (index) {
        checked = $scope.profilemeta.phones[index];

        if (checked != '') {
          if (checked && checked.length > 0) {
            var result,
              all;

            result = all = phoneNumberParser(checked, 'NL');

            $scope.profilePhoneNumberParsed[index].result = true;

            if (result) {
              var error = $rootScope.ui.errors.phone.notValid,
                invalidCountry = $rootScope.ui.errors.phone.invalidCountry,
                message;

              if (result.error) {
                $scope.profilePhoneNumberParsed[index] = {
                  result: false,
                  message: error
                };
              } else {
                if (!result.validation.isPossibleNumber) {
                  switch (result.validation.isPossibleNumberWithReason) {
                    case 'INVALID_COUNTRY_CODE':
                      message = invalidCountry;
                      break;
                    case 'TOO_SHORT':
                      message = error + $rootScope.ui.errors.phone.tooShort;
                      break;
                    case 'TOO_LONG':
                      message = error + $rootScope.ui.errors.phone.tooLong;
                      break;
                  }

                  $scope.profilePhoneNumberParsed[index] = {
                    result: false,
                    message: message
                  };
                } else {
                  if (!result.validation.isValidNumber) {
                    $scope.profilePhoneNumberParsed[index] = {
                      result: false,
                      message: error
                    };
                  } else {
                    if (!result.validation.isValidNumberForRegion) {
                      $scope.profilePhoneNumberParsed[index] = {
                        result: false,
                        message: invalidCountry
                      };
                    } else {
                      $scope.profilePhoneNumberParsed[index] = {
                        result: true,
                        message: $rootScope.ui.success.phone.message +
                          result.validation.phoneNumberRegion +
                          $rootScope.ui.success.phone.as +
                          result.validation.getNumberType
                      };

                      $scope.profilemeta.phones[index] = result.formatting.e164;

                      $('.inputPhoneNumbers').removeClass('error');

                      _.each([1, 2, 3], function (_index) {
                        if (index != _index) {
                          if ($scope.profilemeta.phones[_index] == result.formatting.e164) {
                            $scope.profilePhoneNumberParsed[index] = {
                              result: false,
                              message: $rootScope.ui.profile.duplicateNumber
                            };
                          }
                        }
                      });
                    }
                  }
                }
              }
            }

            $scope.profilePhoneNumberParsed[index].all = all;
          } else {
            $scope.profilePhoneNumberParsed[index].result = true;

            delete $scope.profilePhoneNumberParsed[index].message;

            $('.inputPhoneNumber-' + index).removeClass('error');
          }
        }
      });
    };

    $timeout(function () {
      $scope.profilePhoneNumberParser()
    }, 50);

    $scope.groups = $route.current.params.userId && Groups.getMemberGroups($route.current.params.userId.toLowerCase());

    $scope.availableGroups = angular.fromJson(Storage.get('groups'));

    $scope.passwords = {
      current: '',
      new1: '',
      new2: ''
    };

    $scope.forms = {
      add: false,
      edit: false
    };

    $scope.toggleSlotForm = function () {
      if ($scope.forms.add) {
        $scope.resetInlineForms();
      } else {
        $timeout(function () {
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
        }, 20);
      }
    };

    $scope.resetInlineForms = function () {
      $timeout(function () {
        $scope.slot = {};

        $scope.original = {};

        $scope.forms = {
          add: false,
          edit: false
        };
      }, 20);
    };

    setView($location.hash());

    function setGroupSelection() {
      $scope.userGroups = [];

      _.each($("div#editTab select.chzn-select option"), function (option) {
        _.each($scope.groups, function (userGroup) {
          if (option.innerHTML == userGroup.name) {
            $scope.userGroups.push(userGroup);

            option.selected = true;
          }
        });
      });

      $("div#editTab select.chzn-select").trigger("liszt:updated");
    }

    $scope.detectChanges = function () {
      $timeout(function () {
        var selectedGroups = [];

        _.each($(".chzn-choices .search-choice span"), function (option) {
          _.each(Storage.local.groups(), function (group) {
              var _g = new RegExp(option.innerHTML);

              if (_g.test(group.name))
                selectedGroups.push(group);
            }
          )
        });

        $scope.userGroups = selectedGroups;
      });
    };

    function setView(hash) {
      $scope.views = {
        profile: false,
        edit: false,
        password: false,
        timeline: false
      };

      $timeout(function () {
        setGroupSelection()
      }, 100);

      if (hash == 'edit')
        $rootScope.phoneNumberParser($scope.profilemeta.PhoneAddress);

      $scope.views[hash] = true;

      $scope.views.user = ($rootScope.StandBy.resources.uuid.toLowerCase() == $route.current.params.userId);
    }

    $scope.setViewTo = function (hash) {
      $scope.$watch($location.hash(), function () {
        $location.hash(hash);

        setView(hash);
      });
    };

    var CHECK_PINCODE_DELAY = 250;

    $scope.pincodeExistsValidation = true;

    $scope.pincodeExists = function () {
      if (!angular.isDefined($scope.profilemeta.pincode) ||
        $scope.profilemeta.pincode == '') {
        $scope.pincodeExistsValidation = false;
        $scope.pincodeExistsValidationMessage = $rootScope.ui.profile.pincodeNotValid;
      } else {
        if (angular.isDefined($scope.profilemeta.pincode)) {
          if ($scope.checkPincode) {
            clearTimeout($scope.checkPincode);

            $scope.checkPincode = null;
          }

          $scope.checkPincode = setTimeout(function () {
            $scope.checkPincode = null;

            Profile.pincodeExists($scope.profilemeta.uuid, $scope.profilemeta.pincode).then(function (result) {
              $scope.pincodeExistsValidation = result;
              $scope.pincodeExistsValidationMessage = $rootScope.ui.profile.pincodeInUse;
            });
          }, CHECK_PINCODE_DELAY);
        }
      }
    };

    $scope.checkPincode = null;

    $scope.save = function (resources) {
      if (!angular.isDefined($scope.profilemeta.pincode) ||
        $scope.profilemeta.pincode == '' || !$scope.pincodeExistsValidation) {
        $rootScope.notifier.error($rootScope.ui.profile.pincodeCorrect);

        $rootScope.statusBar.off();

        $(window).scrollTop(0);

        return false;
      }

      if (!$scope.pincodeExistsValidation) {
        $rootScope.notifier.error($rootScope.ui.profile.pincodeInUse);

        $rootScope.statusBar.off();

        $(window).scrollTop(0);

        return false;
      }

      $rootScope.statusBar.display($rootScope.ui.profile.saveProfile);

      if (resources.Password)
        resources.askPass = MD5(resources.Password);

      if ((!$scope.profilePhoneNumberParsed[1].result && $scope.profilemeta.phones[1] != '') ||
        (!$scope.profilePhoneNumberParsed[2].result && $scope.profilemeta.phones[2] != '') ||
        (!$scope.profilePhoneNumberParsed[3].result && $scope.profilemeta.phones[3] != '')) {
        $rootScope.notifier.error($rootScope.ui.errors.phone.notValidOnSubmit);

        $rootScope.statusBar.off();

        $(window).scrollTop(0);

        return false;
      }

      var parsed;

      _.each(resources.phones, function (phone, index) {
        if (angular.isDefined(phone) && phone.length > 0) {
          parsed = phoneNumberParser(resources.phones[index], 'NL');

          resources.PhoneAddresses[index - 1] = parsed.formatting.e164;
        } else if (index == 1) {
          resources.PhoneAddresses = [];
        }
      });

      // TODO: Long-term remove it since it will be depreciated!
      delete resources.PhoneAddress;

      var phones = [];

      _.each(resources.PhoneAddresses, function (phone) {
        if (phone !== undefined && phone !== null && phone !== "")
          phones.push(phone);
      });

      resources.PhoneAddresses = phones;

      Profile.save($route.current.params.userId, resources).then(function (result) {
        if (result.error) {
          $rootScope.notifier.error($rootScope.ui.errors.profile.save);
          console.warn('error ->', result);
        } else {
          $rootScope.statusBar.display($rootScope.ui.profile.changingRole);

          if (!angular.isDefined($scope.profileRole) || $scope.profileRole == '')
            $scope.profileRole = (data.resources.role == 0) ? '0' : '3';

          Profile.role(data.resources.uuid, $scope.profileRole).then(function (result) {
            if (result.error) {
              console.warn('error with changing user role!');
            } else {
              $rootScope.statusBar.display($rootScope.ui.profile.settingGroups);

              var userGroups = [];

              _.each($scope.userGroups, function (group) {
                userGroups.push(group.uuid)
              });

              Profile.membership($route.current.params.userId, userGroups).then(function (result) {
                if (result.error) {
                  $rootScope.notifier.error($rootScope.ui.errors.profile.settingGroups);
                  console.warn('error ->', result);
                } else {
                  $rootScope.statusBar.display($rootScope.ui.groups.refreshingGroupMember);

                  Groups.query().then(function (data) {
                    if (data.error) {
                      $rootScope.notifier.error($rootScope.ui.errors.groups.query);
                      console.warn('error ->', data);
                    } else {
                      var userId = $route.current.params.userId.toLowerCase();

                      $scope.groups = $route.current.params.userId && Groups.getMemberGroups(userId);

                      $rootScope.statusBar.display($rootScope.ui.profile.refreshing);

                      var flag = (userId == $rootScope.StandBy.resources.uuid);

                      Profile.get(userId, flag).then(function (data) {
                        if (data.error) {
                          $rootScope.notifier.error($rootScope.ui.errors.profile.get);
                          console.warn('error ->', data);
                        } else {
                          $rootScope.notifier.success($rootScope.ui.profile.dataChanged);

                          if ($scope.profilemeta.phones[1] == '' &&
                            $scope.profilemeta.phones[2] != '') {
                            $scope.profilemeta.phones[1] = $scope.profilemeta.phones[2];

                            $scope.phoneViews.second = false;

                            if ($scope.profilemeta.phones[3] != '') {
                              $scope.profilemeta.phones[2] = $scope.profilemeta.phones[3];

                              delete $scope.profilemeta.phones[3];

                              $scope.phoneViews.second = true;
                              $scope.phoneViews.third = false;
                            } else {
                              delete $scope.profilemeta.phones[2];
                            }
                          }

                          if ($scope.profilemeta.phones[2] == '' &&
                            $scope.profilemeta.phones[3] != '') {
                            $scope.profilemeta.phones[2] = $scope.profilemeta.phones[3];

                            $scope.phoneViews.third = false;

                            delete $scope.profilemeta.phones[3];
                          }

                          $timeout(function () {
                            $scope.data = data
                          });

                          _.each([
                            {id: 2, name: 'second'},
                            {id: 3, name: 'third'}
                          ], function (rank) {
                            if ($scope.profilemeta.phones[rank.id] == undefined ||
                              $scope.profilemeta.phones[rank.id] == '') {
                              $scope.phoneViews[rank.name] = false;
                            }
                          });

                          $rootScope.statusBar.off();

                          $(window).scrollTop(0);
                        }
                      });
                    }
                  });
                }
              });
            }
          });
        }
      });
    };

    $scope.change = function (passwords) {
      if (passwords.new1 == '' || passwords.new2 == '') {
        $rootScope.notifier.error($rootScope.ui.profile.pleaseFill, true);

        return false;
      }

      if (passwords.new1 != passwords.new2) {
        $rootScope.notifier.error($rootScope.ui.profile.passNotMatch, true);

        return false;
      }

      if ($rootScope.StandBy.resources.askPass == MD5(passwords.current)) {
        $rootScope.statusBar.display($rootScope.ui.profile.changingPass);

        Profile.changePassword(passwords).then(function (result) {
          if (result.error) {
            $rootScope.notifier.error($rootScope.ui.errors.profile.changePassword);
            console.warn('error ->', result);
          } else {
            $rootScope.statusBar.display($rootScope.ui.profile.refreshing);

            Profile.get($rootScope.StandBy.resources.uuid, true).then(function (data) {
              if (data.error) {
                $rootScope.notifier.error($rootScope.ui.errors.profile.get);
                console.warn('error ->', data);
              } else {
                $rootScope.notifier.success($rootScope.ui.profile.passChanged);

                $scope.data = data;

                $rootScope.statusBar.off();
              }
            });
          }
        });
      } else {
        $rootScope.notifier.error($rootScope.ui.profile.passwrong, true);
      }
    };

    if ($route.current.params.userId &&
      $rootScope.StandBy.resources.uuid != $route.current.params.userId.toLowerCase()) {
      timelinebooter();
    }

    $scope.redraw = function () {
      setTimeout(function () {
        if ($scope.self.timeline) {
          $scope.self.timeline.redraw();
        }
      }, $rootScope.config.timers.TICKER);
    };

    function timelinebooter() {
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

      _.each($scope.timeline.config.states, function (state, key) {
        states[key] = state.label
      });

      $scope.states = states;

      _.each($rootScope.config.timeline.config.states, function (state, index) {
        $scope.timeline.config.legenda[index] = true;
      });

      $scope.daterange = Dater.readable.date($scope.timeline.range.start) + ' / ' +
        Dater.readable.date($scope.timeline.range.end);


      $('#timeline').html('');
      $('#timeline').append('<div id="userTimeline"></div>');
    }
  });
});
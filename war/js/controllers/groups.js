/*jslint node: true */
/*global angular */
'use strict';


angular.module('WebPaige.Controllers.Groups', [])


/**
 * Groups controller
 */
  .controller(
  'groups',
  [
    '$rootScope',
    '$scope',
    '$location',
    'data',
    'Groups',
    'Profile',
    '$route',
    '$routeParams',
    'Storage',
    'Slots',
    '$timeout',
    function ($rootScope, $scope, $location, data, Groups, Profile, $route, $routeParams, Storage, Slots, $timeout)
    {
      /**
       * Fix styles
       */
      $rootScope.fixStyles();

      $rootScope.resetPhoneNumberChecker();

      var params = $location.search();


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


      var uuid,
          view;

      /**
       * If no params or hashes given in url
       */
      if (! params.uuid && ! $location.hash())
      {
        uuid = data.groups[0].uuid;
        view = 'view';

        $location.search({uuid: data.groups[0].uuid}).hash('view');
      }
      else
      {
        uuid = params.uuid;
        view = $location.hash();
      }


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
        angular.forEach(
          data.groups, function (group)
          {
            if (group.uuid == id) $scope.group = group;
          });

        $scope.members = data.members[id];

        $scope.members.sort(
          function (a, b)
          {
            var aName, bName;

            if ($rootScope.config.profile.meta != 'demo')
            {
              aName = a.resources.lastName.toLowerCase();
              bName = b.resources.lastName.toLowerCase();
            }
            else
            {
              if (typeof a.resources.lastName != 'undefined' &&
                  a.resources.lastName != null &&
                  typeof b.resources.lastName != 'undefined' &&
                  b.resources.lastName != null)
              {
                aName = a.resources.lastName.toLowerCase();
                bName = b.resources.lastName.toLowerCase();
              }
              else
              {
                aName = a.uuid.toLowerCase();
                bName = b.uuid.toLowerCase();
              }
            }

            if (aName < bName)
            {
              return - 1;
            }

            if (aName > bName)
            {
              return 1;
            }

            return 0;
          }
        );

        $scope.current = id;

        wisher(id);
      }


      /**
       * Set wish
       */
      function wisher (id)
      {
        $scope.wished = false;

        Groups.wish(id)
          .then(
          function (wish)
          {
            $scope.wished = true;

            $scope.wish = wish.count;

            $scope.popover = {
              id: id,
              wish: wish.count
            };
          });
      }


      /**
       * Set wish for the group
       */
      $scope.saveWish = function (id, wish)
      {
        $rootScope.statusBar.display($rootScope.ui.planboard.changingWish);

        Slots.setWish(
          {
            id: id,
            start: 255600,
            end: 860400,
            recursive: true,
            wish: wish
          })
          .then(
          function (result)
          {
            $rootScope.statusBar.off();

            if (result.error)
            {
              $rootScope.notifier.error($rootScope.ui.errors.groups.saveWish);

              console.warn('error ->', result);
            }
            else
            {
              $rootScope.notifier.success($rootScope.ui.planboard.wishChanged);
            }

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

        $scope.$watch(
          $location.search(), function ()
          {
            $location.search({uuid: current});
          });

        if (switched)
        {
          if ($location.hash() != 'view')
          {
            $location.hash('view');
          }

          setView('view');
        }
      };


      /**
       * View setter
       */
      function setView (hash)
      {
        $scope.views = {
          view: false,
          add: false,
          edit: false,
          search: false,
          member: false
        };

        $scope.views[hash] = true;
      }


      /**
       * Switch between the views and set hash accordingly
       */
      $scope.setViewTo = function (hash)
      {
        $scope.$watch(
          hash, function ()
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
        }
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
          $scope.memberForm.PhoneAddress = '';
          $scope.memberForm.username = '';
          $scope.memberForm.password = '';
          $scope.memberForm.role = {
            id: 3
          };

          $scope.setViewTo('member');
        }
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
        $timeout(
          function ()
          {
            $scope.groupForm = {};

            $scope.memberForm = {};

            $scope.selectionMaster = {};

            $scope.selection = {};

            $scope.setViewTo('view');
          }
        )
      };


      /**
       * Search for members
       */
      $scope.searchMembers = function (query)
      {
        $rootScope.statusBar.display($rootScope.ui.groups.searchingMembers);

        Groups.search(query).
          then(
          function (result)
          {
            if (result.error)
            {
              $rootScope.notifier.error($rootScope.ui.errors.groups.searchMembers);
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
            }
          });
      };


      /**
       * Add member to a group
       */
      $scope.addMember = function (candidate)
      {
        $rootScope.statusBar.display($rootScope.ui.groups.addingNewMember);

        Groups.addMember(candidate).
          then(
          function (result)
          {
            if (result.error)
            {
              $rootScope.notifier.error($rootScope.ui.errors.groups.addMember);

              console.warn('error ->', result);
            }
            else
            {
              $rootScope.notifier.success($rootScope.ui.groups.memberAdded);

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
                    $scope.data = data;

                    $rootScope.statusBar.off();

                    if ($location.hash() == 'search')
                    {
                      $scope.searchMembers($scope.search.query);
                    }
                  }
                });
            }
          });
      };


      /**
       * Remove member from a group
       */
      $scope.removeMember = function (member, group)
      {
        $rootScope.statusBar.display($rootScope.ui.groups.removingMember);

        Groups.removeMember(member, group).
          then(
          function (result)
          {
            if (result.error)
            {
              $rootScope.notifier.error($rootScope.ui.errors.groups.removeMember);

              console.warn('error ->', result);
            }
            else
            {
              $rootScope.notifier.success($rootScope.ui.groups.memberRemoved);

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
                    $scope.data = data;

                    $rootScope.statusBar.off();
                  }
                });
            }
          });
      };


      /**
       * Remove members
       */
      $scope.removeMembers = function (selection, group)
      {
        $rootScope.statusBar.display($rootScope.ui.groups.removingSelected);

        var selected = false;

        angular.forEach(
          selection,
          function (value)
          {
            if (value)
            { selected = true }
          }
        );

        if (selected)
        {
          Groups.removeMembers(selection, group)
            .then(
            function (result)
            {
              if (result.error)
              {
                $rootScope.notifier.error($rootScope.ui.errors.groups.removeMembers);
                console.warn('error ->', result);
              }
              else
              {
                $rootScope.notifier.success($rootScope.ui.groups.memberRemoved);

                $rootScope.statusBar.display($rootScope.ui.groups.refreshingGroupMember);

                $scope.selection = {};

                Groups.query()
                  .then(
                  function (data)
                  {
                    if (data.error)
                    {
                      $rootScope.notifier.error($rootScope.ui.errors.groups.query);
                      console.warn('error ->', data);
                    }
                    else
                    {
                      $scope.data = data;

                      $rootScope.statusBar.off();
                    }
                  }
                );
              }
            }
          );
        }
        else
        {
          $rootScope.notifier.error($rootScope.ui.errors.groups.noSelection);
        }
      };


      /**
       * Save a group
       */
      $scope.groupSubmit = function (group)
      {
        $rootScope.statusBar.display($rootScope.ui.groups.saving);

        Groups.save(group).
          then(
          function (returned)
          {
            if (returned.error)
            {
              $rootScope.notifier.error($rootScope.ui.errors.groups.groupSubmit);

              console.warn('error ->', returned);
            }
            else
            {
              $rootScope.notifier.success($rootScope.ui.groups.groupSaved);

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
                    $scope.closeTabs();

                    $scope.data = data;

                    angular.forEach(
                      data.groups, function (group)
                      {
                        if (group.uuid == returned)
                        {
                          $scope.groups = data.groups;

                          angular.forEach(
                            data.groups, function (g)
                            {
                              if (g.uuid == group.uuid)
                              {
                                $scope.group = g;
                              }
                            });

                          $scope.members = data.members[group.uuid];

                          $scope.current = group.uuid;

                          $scope.$watch(
                            $location.search(), function ()
                            {
                              $location.search({uuid: group.uuid});
                            });
                        }
                      });

                    $rootScope.statusBar.off();
                  }
                });
            }
          });
      };


      /**
       * Save a member
       */
      $scope.memberSubmit = function (member)
      {
        if (member.username == '' || member.password == '')
        {
          $rootScope.notifier.error($rootScope.ui.errors.groups.emptyUserCredentials);

          $('body').scrollTop(0);

          return;
        }

        $rootScope.statusBar.display($rootScope.ui.groups.registerNew);

        if (member == undefined || member.PhoneAddress == '')
        {
          $rootScope.phoneNumberParsed.result = true;
        }

        if ($rootScope.phoneNumberParsed.result)
        {
          Profile.register(member).
            then(
            function (result)
            {
              if (result.error)
              {
                if (result.error.status === 409)
                {
                  $rootScope.notifier.error($rootScope.ui.errors.groups.memberSubmitRegistered);

                  $rootScope.statusBar.off();
                }
                else if (result.error.status === 403)
                {
                  $rootScope.notifier.error($rootScope.ui.errors.groups.failedRegistration);

                  $rootScope.statusBar.off();

                  $('body').scrollTop(0);
                }
                else
                {
                  $rootScope.notifier.error($rootScope.ui.errors.groups.memberSubmitRegister);
                }

                console.warn('error ->', result);
              }
              else
              {
                $rootScope.notifier.success($rootScope.ui.groups.memberRegstered);

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
                      $scope.data = data;

                      $location.path('/profile/' + member.username).hash('profile');

                      $rootScope.statusBar.off();
                    }
                  });
              }
            }
          );
        }
        else
        {
          $rootScope.notifier.error($rootScope.ui.errors.phone.notValidOnSubmit);

          $rootScope.statusBar.off();

          $('body').scrollTop(0);
        }
      };


      /**
       * Confirm deleting a group
       */
      $scope.confirmGroupDelete = function (id)
      {
        $rootScope.notifier.alert('', false, true, { section: 'groups', id: id });
      };


      /**
       * Listen for incoming group delete calls
       */
      $rootScope.$on(
        'fireGroupDelete',
        function (event, group)
        {
          $scope.deleteGroup(group.id);
        }
      );


      /**
       * Delete a group
       */
      $scope.deleteGroup = function (id)
      {
        $rootScope.statusBar.display($rootScope.ui.groups.deleting);

        Groups.remove(id).
          then(
          function (result)
          {
            if (result.error)
            {
              $rootScope.notifier.error($rootScope.ui.errors.groups.deleteGroup);

              console.warn('error ->', result);
            }
            else
            {
              $rootScope.notifier.success($rootScope.ui.groups.deleted);

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
                    $scope.data = data;

                    /**
                     * TODO: Is this really supposed to be like this?
                     */
                    angular.forEach(
                      data.groups,
                      function (group, index)
                      {
                        $scope.groups = data.groups;

                        $scope.group = data.groups[0];

                        $scope.members = data.members[data.groups[0].uuid];

                        $scope.current = data.groups[0].uuid;

                        $scope.$watch(
                          $location.search(),
                          function ()
                          {
                            $location.search({uuid: data.groups[0].uuid});
                          }
                        );
                      }
                    );

                    $rootScope.statusBar.off();
                  }
                }
              );
            }
          }
        );
      };


      /**
       * TODO: Not used in groups yet but login uses modal call..
       * Fetch parent groups
       */
      $scope.fetchParent = function ()
      {
        Groups.parents()
          .then(
          function (result)
          {
            console.warn('parent -> ', result);
          });
      };

      /**
       * TODO: Not used in groups yet..
       * Fetch parent groups
       */
      $scope.fetchContainers = function (id)
      {
        Groups.containers(id)
          .then(
          function (result)
          {
            console.warn('containers -> ', result);
          });
      };


      /**
       * Selection toggle
       */
      $scope.toggleSelection = function (group, master)
      {
        var flag = (master) ? false : true,
            members = angular.fromJson(Storage.get(group.uuid));

        angular.forEach(
          members,
          function (member) { $scope.selection[member.uuid] = flag }
        );
      };


      /**
       * Set some defaults for sorting
       */
      $scope.reverse = false;
      $scope.sorter = 'resources.lastName';


      /**
       * Toggle sorting
       */
      $scope.toggleSorter = function (sorter)
      {
        $scope.reverse = ($scope.sorter == sorter) ? ! $scope.reverse : false;

        $scope.sorter = sorter;
      };

    }
  ]);
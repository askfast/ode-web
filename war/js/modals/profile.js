'use strict';


angular.module('WebPaige.Modals.Profile', ['ngResource'])


/**
 * Profile modal
 */
  .factory(
  'Profile',
  [
    '$rootScope', '$config', '$resource', '$q', 'Storage', 'Groups', 'Slots', 'MD5',
    function ($rootScope, $config, $resource, $q, Storage, Groups, Slots, MD5)
    {
      var Profile = $resource(
          $config.host + '/node/:id/:section',
          {},
          {
            get: {
              method: 'GET',
              params: { id: '', section: 'resource' }
            },
            save: {
              method: 'PUT',
              params: { section: 'resource' }
            },
            remove: {
              method: 'DELETE',
              params: {},
              isArray: true
            },
            role: {
              method: 'PUT',
              params: { section: 'role' },
              isArray: true
            },
            membership: {
              method: 'PUT',
              params: { id: '', section: 'membership' },
              isArray: true
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
              params: {uuid: '', pass: '', name: '', phone: ''},
              isArray: true
            }
          }
      );

      // http://dev.ask-cs.com/user_exists?username=devsven
      var UserExists = $resource(
          $config.host + '/user_exists',
          {},
          {
            check: {
              method: 'GET',
              params: {username: ''}
            }
          }
      );

      // http://dev.ask-cs.com/pincode_exists?pincode=1234
      var PincodeExists = $resource(
          $config.host + '/pincode_exists',
          {},
          {
            check: {
              method: 'GET',
              params: {pincode: ''}
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
              params: {},
              isArray: true
            }
          }
      );


      /**
       * Change password for user
       */
      Profile.prototype.register = function (profile)
      {
        var deferred = $q.defer();

        var uuid = profile.username.toLowerCase();

        // console.log('profile ->', profile);

        Register.profile(
          {
            uuid: uuid,
            // pass: 	($rootScope.config.profile.smartAlarm) ? profile.password : MD5(profile.password),
            pass: MD5(profile.password),
            name: String(profile.firstName + ' ' + profile.lastName),
            phone: profile.PhoneAddress || ''
          },
          function (registered)
          {
            // console.log('registered ->', registered);

            // Profile.prototype.role(uuid, ($rootScope.config.profile.smartAlarm) ? 1 : profile.role.id)
            Profile.prototype.role(uuid, profile.role.id)
              .then(
              function (roled)
              {
                Profile.prototype.save(
                  uuid, {
                    firstName: profile.firstName,
                    lastName: profile.lastName,
                    EmailAddress: profile.EmailAddress,
                    PostAddress: profile.PostAddress,
                    PostZip: profile.PostZip,
                    PostCity: profile.PostCity
                  }).then(
                  function (resourced)
                  {
                    var calls = [];

                    angular.forEach(
                      profile.groups, function (group)
                      {
                        calls.push(
                          Groups.addMember(
                            {
                              id: uuid,
                              group: group
                            }));
                      });

                    $q.all(calls)
                      .then(
                      function (grouped)
                      {
                        deferred.resolve(
                          {
                            registered: ($rootScope.config.profile.smartAlarm) ? registered[0] : registered,
                            roled: roled,
                            resourced: resourced,
                            grouped: grouped
                          });
                      });

                  }); // save profile

              }); // role
          },
          function (error)
          {
            deferred.resolve({error: error});
          }
        ); // register

        return deferred.promise;
      };


      /**
       * Check if username exists
       */
      Profile.prototype.userExists = function (username)
      {
        var deferred = $q.defer();

        if (username != '' || username.length > 0)
        {
          UserExists.check(
            { username: username },
            function () { deferred.resolve(true) },
            function () { deferred.resolve(false) }
          );
        }

        return deferred.promise;
      };


      /**
       * Check if pincode exists
       */
      Profile.prototype.pincodeExists = function (pincode)
      {
        var deferred = $q.defer();

        if (pincode != '' || pincode.length > 0)
        {
          PincodeExists.check(
            { pincode: pincode },
            function () { deferred.resolve(true) },
            function () { deferred.resolve(false) }
          );
        }

        return deferred.promise;
      };


      /**
       * Set role of given user
       */
      Profile.prototype.role = function (id, role)
      {
        var deferred = $q.defer();

        Profile.role(
          { id: id },
          role,
          function (result)
          {
            deferred.resolve(result);
          },
          function (error)
          {
            deferred.resolve({error: error});
          }
        );

        return deferred.promise;
      };


      /**
       * Change password for user
       */
      Profile.prototype.changePassword = function (passwords)
      {
        var deferred = $q.defer();

        Resources.save(
          null,
          { askPass: MD5(passwords.new1) },
          function (result)
          {
            deferred.resolve(result);
          },
          function (error)
          {
            deferred.resolve({error: error});
          }
        );

        return deferred.promise;
      };


      /**
       * Set the groups for user
       */
      Profile.prototype.membership = function (id, groups)
      {
        var deferred = $q.defer();

        Profile.membership(
          { id: id },
          groups,
          function (result)
          {
            deferred.resolve(result);
          },
          function (error)
          {
            deferred.resolve({error: error});
          }
        );

        return deferred.promise;
      };


      /**
       * Get profile of given user
       */
      Profile.prototype.get = function (id, localize)
      {
        var deferred = $q.defer();

        Profile.get(
          { id: id },
          function (result)
          {
            result.role = (result.role) ? result.role : 3;

            if (id == $rootScope.app.resources.uuid)
            {
              $rootScope.app.resources = result;
            }

            if (localize)
            {
              Storage.add('resources', angular.toJson(result));
            }

            deferred.resolve({resources: result});
          }
        );

        return deferred.promise;
      };


      /**
       * Get profile of given user with slots
       */
      Profile.prototype.getWithSlots = function (id, localize, params)
      {
        var deferred = $q.defer();

        Profile.prototype.get(id, localize)
          .then(
          function (resources)
          {
            Slots.user(
              {
                user: id,
                start: params.start,
                end: params.end
              }
            ).then(
              function (slots)
              {
                deferred.resolve(
                  angular.extend(
                    resources, {
                      slots: slots,
                      synced: new Date().getTime(),
                      periods: {
                        start: params.start * 1000,
                        end: params.end * 1000
                      }
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

        Slots.user(
          {
            user: id,
            start: params.start / 1000,
            end: params.end / 1000
          }).then(
          function (slots)
          {
            deferred.resolve(
              {
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
      Profile.prototype.local = function () { return angular.fromJson(Storage.get('resources')) };


      /**
       * Save profile
       */
      Profile.prototype.save = function (id, resources)
      {
        var deferred = $q.defer();

        if (resources.firstName != undefined && resources.lastName != undefined)
        {
          resources.name = resources.firstName + ' ' + resources.lastName;
        }

        Profile.save(
          { id: id },
          resources,
          function (result)
          {
            deferred.resolve(result);
          },
          function (error)
          {
            deferred.resolve({error: error});
          }
        );

        return deferred.promise;
      };


      /**
       * Save profile
       */
      Profile.prototype.remove = function (id)
      {
        var deferred = $q.defer();

        Profile.remove(
          {
            id: id
          },
          function (result)
          {
            deferred.resolve(result);
          },
          function (error)
          {
            deferred.resolve({error: error});
          }
        );

        return deferred.promise;
      };


      /**
       * DEPRECIATED
       *
       * Create settings resources for user if it is missing
       */
      //	  Profile.prototype.createSettings_ = function (id)
      //	  {
      //	    var deferred = $q.defer();
      //
      //	    Profile.prototype.get(id, false)
      //	    .then(function (result)
      //	    {
      //	      if (result.settingsWebPaige == undefined || result.settingsWebPaige == null)
      //	      {
      //	        Profile.save(
      //	          {id: result.resources.uuid},
      //	          angular.toJson({ settingsWebPaige: $rootScope.config.defaults.settingsWebPaige }),
      //	          function (result)
      //	          {
      //	            deferred.resolve({
      //	              status: 'modified',
      //	              resources: result
      //	            });
      //	          },
      //	          function (error)
      //	          {
      //	            deferred.resolve({error: error});
      //	          }
      //	        );
      //	      }
      //	      else
      //	      {
      //	        deferred.resolve({
      //	          status: 'full',
      //	          resources: result
      //	        });
      //	      }
      //	    });
      //
      //	    return deferred.promise;
      //	  };


      return new Profile;
    }
  ]);
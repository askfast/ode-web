/*jslint node: true */
/*global angular */
/*global profile */
'use strict';


/**
 * App configuration
 */
angular.module('WebPaige')
.value(
  '$config',
  {
    title:    'WebPaige',
    version:  '2.5.0 (Snapshot)',
    lang:     'nl',

    fullscreen: true,

    // REMOVE
    demo_users: false,

    smartAlarm: profile.smartAlarm,

    profile: {
      meta:   profile.meta,
      own:   profile.own,
      title:  profile.title,
      logos: {
        login:  'profiles/' + profile.meta + '/img/login_logo.png',
        app:    ''
      },
      background: 'profiles/' + profile.meta + '/img/login_bg.jpg', // jpg for smaller size,
      p2000:      profile.p2000,
      mobileApp:  profile.mobileApp,
      smartAlarm: profile.smartAlarm
    },

    statesall: {
      'com.ask-cs.State.Available':
      {
        className:'state-available',
        label:    'Beschikbaar',
        color:    '#4f824f',
        type:     'Beschikbaar',
        display:  true,
        minRole:  5
      },
      'com.ask-cs.State.KNRM.BeschikbaarNoord':
      {
        className:'state-available-north',
        label:    'Beschikbaar voor Noord',
        color:    '#000',
        type:     'Beschikbaar',
        display:  true,
        minRole:  5
      },
      'com.ask-cs.State.KNRM.BeschikbaarZuid':
      {
        className:'state-available-south',
        label:    'Beschikbaar voor Zuid',
        color:    '#e08a0c',
        type:     'Beschikbaar',
        display:  true,
        minRole:  5
      },
      'com.ask-cs.State.Unavailable':
      {
        className:'state-unavailable',
        label:    'Niet Beschikbaar',
        color:    '#a93232',
        type:     'Niet Beschikbaar',
        display:  true,
        minRole:  5
      },
      'com.ask-cs.State.KNRM.SchipperVanDienst':
      {
        className:'state-schipper-service',
        label:    'Schipper van Dienst',
        color:    '#e0c100',
        type:     'Beschikbaar',
        display:  true,
        minRole:  5
      },
      'com.ask-cs.State.Unreached':
      {
        className:'state-unreached',
        label:    'Niet Bereikt',
        color:    '#65619b',
        type:     'Niet Beschikbaar',
        display:  false,
        minRole:  5
      }
    },

    host: profile.host(),

    formats: {
      date:         'dd-MM-yyyy',
      time:         'HH:mm',
      datetime:     'dd-MM-yyyy HH:mm',
      datetimefull: 'dd-MM-yyyy HH:mm:ss'
    },

    roles: profile.roles,

    timeline: {
      options: {
        axisOnTop:        true,
        width:            '100%',
        height:           'auto',
        selectable:       true,
        editable:         true,
        style:            'box',
        groupsWidth:      '150px',
        eventMarginAxis:  0,
        showCustomTime:   false,
        groupsChangeable: false,
        showNavigation:   false,
        intervalMin:      1000 * 60 * 60 * 1
      },
      config: {
        zoom:       '0.4',
        bar:        false,
        layouts:    profile.timeline.config.layouts,
        wishes:     false,
        legenda:    {},
        legendarer: false,
        states:     {},
        // divisions:  profile.divisions,
        divisions:  [],
//        densities: {
//          // less:   '#a0a0a0',
//          less:   '#a93232',
//          even:   '#ba6a24',
//          one:    '#415e6b',
//          two:    '#3d5865',
//          three:  '#344c58',
//          four:   '#2f4550',
//          five:   '#2c424c',
//          six:    '#253943',
//          more:   '#486877'
//        },
        densities: {
          less:   '#a93232',
          even:   '#ba6a24',
          one:    '#4f824f',
          two:    '#477547',
          three:  '#436f43',
          four:   '#3d673d',
          five:   '#396039',
          six:    '#335833',
          more:   '#305330'
        }
      }
    },

    pie: {
      colors: ['#415e6b', '#ba6a24', '#a0a0a0']
    },

    defaults: {
      settingsWebPaige: {
        user: {
          language: 'nl'
        },
        app: {
          widgets: {
            groups: {}
          }
        }
      }
    },

    cookie: {
      expiry: 30,
      path:   '/'
    },

    // notifications: {
    //   webkit: {
    //     user: true,
    //     app: window.webkitNotifications && (window.webkitNotifications.checkPermission() == 0) ? true : false
    //   }
    // },

    timers: profile.timers,

    init: function ()
    {
      angular.forEach(
        profile.states,
        (function (state, index)
        {
          this.timeline.config.states[state] = this.statesall[state];
        }).bind(this)
      );
    }
  }
);
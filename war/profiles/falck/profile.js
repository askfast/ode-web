/**
 * Installation profile
 */
var profile = {

  meta: 'falck',

  own: false,

  title: 'Falck',

  showBackground: false,

  sublogo: 'falck_logo.png',

  host: function ()
  {
    return ($.browser.msie) ? '/proxy' : 'http://askpack.ask-cs.com';
  },

  states: [],

  timeline: {
    config: {
      layouts: {
        groups:  true,
        members: true
      }
    }
  },

  divisions: [],

  roles: [
    {
      id: 1,
      label: 'Planner'
    },
    {
      id: 2,
      label: 'Team leider'
    },
    {
      id: 3,
      label: 'Standaard'
    },
    {
      id: 4,
      label: 'Viewer'
    }
  ],

  p2000: {
    status: true,
    // url:    'http://backend.ask-cs.com/p2000/ob.php',
    // codes:  '1201999'
    // url:    'http://backend.ask-cs.com/~ask/p2000/p2000.php',
    url:    'http://couchdb.ask-cs.com:5984/p2000/_design/search/_view/standby?limit=4&descending=true',
    codes:  '1201958'
  },

  mobileApp: {
    status:       true,
    experimental: false
  },

  analytics: {
    url:    'falck.standby.ask-cs.com', // TODO: Does this url exist yet?
    // url:    'dev.standby.ask-cs.com',
    // url: 'test.standby.ask-cs.com',
    // url: 'brandweer.standby.ask-cs.com',

    // Depreciated
    status: false,
    code:   function ()
    {
    }
  },

  smartAlarm: false,

  timers: {
    TICKER:                 100,

    NOTIFICATION_DELAY:     5000,
    MEMBER_TIMELINE_RENDER: 2000,
    ALARM_SYNC:             60000,
    PLANBOARD_SYNC:         10000,
    TV_SYNC:                8000
  }
};

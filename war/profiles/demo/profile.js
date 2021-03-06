/**
 * Installation profile
 */
var profile = {

  meta: 'demo',

  own: true,

  title: 'Demo',

  host: function ()
  {
    // return ($.browser.msie) ? '/proxy/standby' : 'http://backend.ask-cs.com/standby';
    // return ($.browser.msie) ? '/proxy/standby-test' : 'http://askpack.ask-cs.com/standby-test';

    // return ($.browser.msie) ? '/proxy/standby-fair' : 'http://askpack.ask-cs.com';
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
    url:    'demo.standby.ask-cs.com', // TODO: Does this url exist yet?
    // url:    'dev.standby.ask-cs.com',
    // url: 'test.standby.ask-cs.com',
    // url: 'brandweer.standby.ask-cs.com',

    // Depreciated
    status: false,
    code:   function ()
    {
    }
  },

  smartAlarm: true,

  timers: {
    TICKER:                 100,

    NOTIFICATION_DELAY:     5000,
    MEMBER_TIMELINE_RENDER: 2000,
    ALARM_SYNC:             60000,
    PLANBOARD_SYNC:         10000,
    TV_SYNC:                8000
  }
};
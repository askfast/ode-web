/**
 * Installation profile
 */
var profile = {

  meta: 'standby',

  title: 'BRANDWEER',

  host: function ()
  {
    // return ($.browser.msie) ? '/proxy/standby' : 'http://backend.ask-cs.com/standby';
    // return ($.browser.msie) ? '/proxy/standby-test' : 'http://askpack.ask-cs.com/standby-test';
    return ($.browser.msie) ? '/proxy' : 'http://dev.ask-cs.com/';
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
      id:    1,
      label: 'Planner'
    },
    {
      id:    2,
      label: 'Schipper'
    },
    {
      id:    3,
      label: 'Opstapper'
    }
  ],

  p2000: {
    status: true,
    // url:    'http://backend.ask-cs.com/p2000/ob.php',
    // codes:  '1201999'
    url:    'http://couchdb.ask-cs.com:5984/p2000/_design/search/_view/standby?limit=4&descending=true',
    codes:  '1201958'
  },

  mobileApp: {
    status:       true,
    experimental: false
  },

  analytics: {
    url:    'dev.standby.ask-cs.com',
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
    PLANBOARD_SYNC:         60000,
    TV_SYNC:                60000
  }
};
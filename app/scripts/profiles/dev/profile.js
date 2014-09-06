/**
 * Installation profile
 */
var profile = {

  meta: 'dev',

  own: true,

  title: 'Development',

  host: 'http://dev.ask-cs.com',

  //  host: function ()
  //  {
  //    return ($.browser.msie) ? '/proxy' : 'http://dev.ask-cs.com';
  //  },

  states: [],

  timeline: {
    config: {
      layouts: {
        groups: true,
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
    url: 'http://couchdb.ask-cs.com:5984/p2000/_design/search/_view/standby?limit=4&descending=true',
    // url:    'http://backend.ask-cs.com/~ask/p2000/p2000.php',
    codes: '1201958'
  },

  mobileApp: {
    android: 'https://play.google.com/store/apps/details?id=com.askcs.standby',
    ios: 'https://itunes.apple.com/nl/app/standby/id655588325?mt=8&uo=4',
    status: true,
    experimental: false
  },

  analytics: {
    url: 'dev.standby.ask-cs.com',
    // url: 'test.standby.ask-cs.com',
    // url: 'brandweer.standby.ask-cs.com',

    // Depreciated
    status: false,
    code: function () {
    }
  },

  smartAlarm: true,

  timers: {
    TICKER: 100,
    NOTIFICATION_DELAY: 5000,
    MEMBER_TIMELINE_RENDER: 2000,
    ALARM_SYNC: 60000,
    PLANBOARD_SYNC: 60000,
    TV_SYNC: 60000
  }
};
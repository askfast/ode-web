/**
 * Installation profile
 */
var profile = {

  meta: 'isparaat',

  title: 'BRANDWEER',

	host: function ()
	{
    return ($.browser.msie) ? '/proxy/ns_knrmtest' : 'http://3rc2.ask-services.appspot.com/ns_knrmtest';
	},

  states: [],

  timeline: {
    config: {
      layouts: {
        groups:   true,
        members:  true
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
    url:    'http://knrmtest.myask.me/rpc/client/p2000.php',
    codes:  '0104517'
  },

  mobileApp: {
    status:   false,
    experimental: false
  },

  analytics: {
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
    PLANBOARD_SYNC:         60000,
    TV_SYNC:                60000
  }
};
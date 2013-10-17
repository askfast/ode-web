/**
 * Installation profile
 */
var profile = {

  meta: 'isparaat',

  title: 'BRANDWEER',

	host: function ()
	{
    return ($.browser.msie) ? '/proxy/standby-dev' : 'http://backend.ask-cs.com/standby-dev';
    // return ($.browser.msie) ? '/proxy/standby' : 'http://backend.ask-cs.com/standby-test';
	},

  states: [
    'com.ask-cs.State.Available',
    'com.ask-cs.State.Unavailable'
  ],

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
      label: 'Schipper'
    }, 
    {
      id: 3,
      label: 'Opstapper'
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

  smartAlarm: true
};
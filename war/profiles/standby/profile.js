/**
 * Installation profile
 */
var profile = {

  meta: 'isparaat',

  title: 'BRANDWEER',

	host: function ()
	{
    // return ($.browser.msie) ? '/proxy/standby' : 'http://backend.ask-cs.com/standby';
    // return ($.browser.msie) ? '/proxy/standby-test' : 'http://backend.ask-cs.com/standby-test';
    return ($.browser.msie) ? '/proxy/standby-dev' : 'http://backend.ask-cs.com/standby-dev';
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
    url:    'http://backend.ask-cs.com/p2000/ob.php',
    codes:  '1201999'
    // codes:  '1201958'
  },

  mobileApp: {
    status:       true,
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
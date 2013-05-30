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

  states: [
    'com.ask-cs.State.Available',
    'com.ask-cs.State.KNRM.BeschikbaarNoord',
    'com.ask-cs.State.KNRM.BeschikbaarZuid',
    'com.ask-cs.State.Unavailable',
    'com.ask-cs.State.KNRM.SchipperVanDienst',
    'com.ask-cs.State.Unreached'
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
    status: false,
    text:   'Download Android App',
    link:   'http://www.google.com/',
    subject:  'Some email subject',
    email:  function ()
    {
      return  'Dear user,\n\nThis is a sample message. Here is the link: ' + this.link + '\n\nGreetings,\nAsk Community Systems'
    }
  }
};
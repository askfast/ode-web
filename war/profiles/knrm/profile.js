/**
 * Installation profile
 */
var profile = {

  meta: 'knrm',

  own: false,

  title: 'KNRM',

  host: function ()
  {
    // Google
    // return ($.browser.msie) ? '/proxy/ns_knrm' : 'http://3rc2.ask-services.appspot.com/ns_knrm';
    return ($.browser.msie) ? '/proxy' : 'http://knrm-backend.ask-cs.com';
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
    // url:    'http://couchdb.ask-cs.com/~jordi/p2000/p2000.php',
    url:    'http://backend.ask-cs.com/~ask/p2000/p2000.php',
    codes:  '1405545, 1405546, 1735749, 1735748'
  },

  mobileApp: {
    status:   true,
    experimental: true
  },

  analytics: {
    status: true,
    code:   function ()
    {
      var _gaq = _gaq || [];
      _gaq.push(['_setAccount',     'UA-36532309-1']);
      _gaq.push(['_setDomainName',  'ask-cs.com']);
      _gaq.push(['_setAllowLinker', true]);
      _gaq.push(['_trackPageview']);
      (function() {
        var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
        ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
        var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
      })();
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








































/**
 * Demo users for testing
 */
var _demo_users = [
];


/**
 * Installation profile
 */
var profile = {

  meta: 'monster',

  own: false,

  title: 'REDDINGSBRIGADE',

	host: function ()
	{
    return ($.browser.msie) ? '/proxy' : 'http://backend.ask-cs.com';
	},

  states: [],

  timeline: {
    config: {
      layouts: {
        groups:   true,
        members:  false
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
    url:    'http://backend.ask-cs.com/~ask/p2000/p2000.php',
    codes:  '1500982'
  },

  mobileApp: {
    android: 'https://play.google.com/store/apps/details?id=com.askcs.standby',
    ios: 'https://itunes.apple.com/nl/app/standby/id655588325?mt=8&uo=4',
    status:   true,
    experimental: false
  },

  analytics: {
    status: true,
    code:   function ()
    {
      (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
      m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
      })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

      ga('create', 'UA-41638717-1', 'ask-cs.com');
      ga('send', 'pageview');
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
/**
 * Installation profile
 */
var profile = {

  meta: 'gvrb',

  title: 'REDDINGSBRIGADE',

	host: function ()
	{
    return ($.browser.msie) ? '/proxy/ns_gvrb' : 'http://3rc2.ask-services.appspot.com/ns_gvrb';
	},

  states: [
    'com.ask-cs.State.Available',
    'com.ask-cs.State.Unavailable',
    'com.ask-cs.State.Unreached'
  ],

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
  ]
};
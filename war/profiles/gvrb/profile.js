/**
 * Installation profile
 */
var profile = {

  meta: 'gvrb',

  title: 'REDDINGBRIGADE',

	host: function ()
	{
    return ($.browser.msie) ? '/proxy/ns_gvrb' : 'http://3rc2.ask-services.appspot.com/ns_gvrb';
	},

  states: {
    'com.ask-cs.State.Available': {
      'className': 'state-available',
      'label': 'Beschikbaar',
      'color': '#4f824f',
      'type': 'Beschikbaar'
    },
    'com.ask-cs.State.KNRM.BeschikbaarNoord': {
      'className': 'state-available-north',
      'label': 'Beschikbaar voor Noord',
      'color': '#000',
      'type': 'Beschikbaar'
    },
    'com.ask-cs.State.KNRM.BeschikbaarZuid': {
      'className': 'state-available-south',
      'label': 'Beschikbaar voor Zuid',
      'color': '#e08a0c',
      'type': 'Beschikbaar'
    },
    'com.ask-cs.State.Unavailable': {
      'className': 'state-unavailable',
      'label': 'Niet Beschikbaar',
      'color': '#a93232',
      'type': 'Niet Beschikbaar'
    },
    'com.ask-cs.State.KNRM.SchipperVanDienst': {
      'className': 'state-schipper-service',
      'label': 'Schipper van Dienst',
      'color': '#e0c100',
      'type': 'Beschikbaar'
    },
    'com.ask-cs.State.Unreached': {
      'className': 'state-unreached',
      'label': 'Niet Bereikt',
      'color': '#65619b',
      'type': 'Niet Beschikbaar'
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
  ]
};
/**
 * Installation profile
 */
var profile = {
	/**
	 * Host for app
	 */
	namespace: 'ns_knrmtest',
	host: function ()
	{
		return ($.browser.msie) ? '/proxy/ns_knrmtest' : 'http://3rc2.ask-services.appspot.com/ns_knrmtest';
	}	
}


/**
 * App config
 */
var config = {
  /**
   * App version
   */
  version: '2.0.0',
  /**
   * Default language
   */
  lang: 'nl',
  /**
   * Real users
   */
  demo_users: true,
  /**
   * Blacklisted browsers
   */
  blacklisted: ['msie'],
  /**
   * Data source host
   */
  host: profile.host(),
  /**
   * TODO
   * All date time related values into one place!
   */
  date: {
    format: 'dd-M-yyyy'
  },
  time: {
    format: 'HH:mm tt'
  },
  datetime: {
    format: 'dd-M-yyyy HH:mm tt'
  },
  /**
   * Roles
   */
  roles: [{
    id: 1,
    label: 'Planner'
  }, {
    id: 2,
    label: 'Schipper'
  }, {
    id: 3,
    label: 'Opstapper'
  }],
  /**
   * Timeline options
   */
  timeline: {
    /**
     * Plugin options
     */
    options: {
      axisOnTop: true,
      width: '100%',
      height: 'auto',
      selectable: true,
      editable: true,
      style: 'box',
      groupsWidth: '150px',
      eventMarginAxis: 0,
      showCustomTime: true,
      groupsChangeable: false,
      showNavigation: false,
      intervalMin: 1000 * 60 * 60 * 1
    },
    /**
     * Timeline app settings
     */
    config: {
      /**
       * Zoom value
       */
      zoomValue: '0.4',
      /**
       * Bar charts for group agg. data
       */
      bar: false,
      /**
       * Group wishes setting
       */
      wishes: false,
      /**
       * Timeline legenda settings
       */
      legenda: {},
      legendarer: false,
      /**
       * TODO
       * Take out KNRM stuff out of app config
       *
       * Availability states
       */
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
      /**
       * TODO
       * Take out KNRM stuff out of app config
       *
       * Any given divisions
       */
      divisions: [{
        id: 'all',
        label: 'All divisions'
      }, {
        id: 'knrm.StateGroup.BeschikbaarNoord',
        label: 'Noord'
      }, {
        id: 'knrm.StateGroup.BeschikbaarZuid',
        label: 'Zuid'
      }],
      /**
       * Density based colors for group aggs.
       */
      densities: {
        less: '#a0a0a0',
        even: '#ba6a24',
        one: '#415e6b',
        two: '#3d5865',
        three: '#344c58',
        four: '#2f4550',
        five: '#2c424c',
        six: '#253943',
        more: '#486877'
      }
    }
  }, // end timeline options
  pie: {
    colors: ['#415e6b', '#ba6a24', '#a0a0a0']
  },
  defaults: {
    settingsWebPaige: {
      user: {
        language: 'nl'
      },
      app: {}
    }
  }
	
}
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
    {
        "config": {},
        "name": "Chris  2Aldewereld",
        "personalAgentUrl": "http://sven.ask-services.appspot.com/eveagents/personalagent/4780aldewereld/",
        "rate": 1,
        "resources": {
            "id": "4780aldewereld",
            "askPass": "d9a6c9bad827746190792cf6f30d5271",
            "name": "Chris  2Aldewereld",
            "PhoneAddress": "+31648204528",
            "role": "3"
        },
        "state": "com.ask-cs.State.NoPlanning",
        "uuid": "4780aldewereld"
    },
    {
        "config": {},
        "name": "Joost  1 Smits",
        "personalAgentUrl": "http://sven.ask-services.appspot.com/eveagents/personalagent/4781smits/",
        "rate": 1,
        "resources": {
            "id": "4781smits",
            "askPass": "2d648681d9352378a5e567f08eaf9677",
            "name": "Joost  1 Smits",
            "PhoneAddress": "+31634458934",
            "role": "3"
        },
        "state": "com.ask-cs.State.NoPlanning",
        "uuid": "4781smits"
    },
    {
        "config": {},
        "name": "Mario  Vroon",
        "personalAgentUrl": "http://sven.ask-services.appspot.com/eveagents/personalagent/4783vroon/",
        "rate": 1,
        "resources": {
            "id": "4783vroon",
            "askPass": "d3745e9ed55d046445dda6ed33d0b660",
            "name": "Mario  Vroon",
            "PhoneAddress": "+31642479178",
            "role": "2"
        },
        "state": "com.ask-cs.State.NoPlanning",
        "uuid": "4783vroon"
    },
    {
        "config": {},
        "name": "Robert  1 Faase",
        "personalAgentUrl": "http://sven.ask-services.appspot.com/eveagents/personalagent/4782faase/",
        "rate": 1,
        "resources": {
            "id": "4782faase",
            "askPass": "29530e3085d6b3df773b4e1090605053",
            "name": "Robert  1 Faase",
            "PhoneAddress": "+31652588740",
            "role": "3"
        },
        "state": "com.ask-cs.State.NoPlanning",
        "uuid": "4782faase"
    },
    {
        "config": {},
        "name": "Michiel  1 Wondergem",
        "personalAgentUrl": "http://sven.ask-services.appspot.com/eveagents/personalagent/4534wondergem/",
        "rate": 1,
        "resources": {
            "id": "4534wondergem",
            "askPass": "8efb377daa5134ddbf895c1bdaf99415",
            "name": "Michiel  1 Wondergem",
            "PhoneAddress": "+31650909756",
            "role": "3"
        },
        "state": "com.ask-cs.State.NoPlanning",
        "uuid": "4534wondergem"
    },
    {
        "config": {},
        "name": "apptest  knrm",
        "personalAgentUrl": "http://sven.ask-services.appspot.com/eveagents/personalagent/apptestknrm/",
        "rate": 1,
        "resources": {
            "id": "apptestknrm",
            "askPass": "eadeb77d8fba90b42b32b7de13e8aaa6",
            "name": "apptest  knrm",
            "EmailAddress": "dferro@ask-cs.com",
            "PhoneAddress": "+31627033823",
            "role": "1"
        },
        "state": "com.ask-cs.State.NoPlanning",
        "uuid": "apptestknrm"
    },
    {
        "config": {},
        "name": "Cengiz TEST",
        "personalAgentUrl": "http://sven.ask-services.appspot.com/eveagents/personalagent/apptestknrm/",
        "rate": 1,
        "resources": {
            "id": "culusoy@ask-cs.com",
            "askPass": "eadeb77d8fba90b42b32b7de13e8aaa6",
            "name": "apptest  knrm",
            "EmailAddress": "dferro@ask-cs.com",
            "PhoneAddress": "+31627033823",
            "role": "1"
        },
        "state": "com.ask-cs.State.NoPlanning",
        "uuid": "apptestknrm"
    },
    {
        "config": {},
        "name": "Joris  2Rietveld",
        "personalAgentUrl": "http://sven.ask-services.appspot.com/eveagents/personalagent/4641rietveld/",
        "rate": 1,
        "resources": {
            "id": "4641rietveld",
            "askPass": "8aafe6da6bfdda3ea926d60d0fcb612b",
            "name": "Joris  2Rietveld",
            "PhoneAddress": "+31681539352",
            "role": "3"
        },
        "state": "com.ask-cs.State.NoPlanning",
        "uuid": "4641rietveld"
    },
    {
        "config": {},
        "name": "Peter  Kuiphof",
        "personalAgentUrl": "http://sven.ask-services.appspot.com/eveagents/personalagent/4640kuiphof/",
        "rate": 1,
        "resources": {
            "id": "4640kuiphof",
            "askPass": "8b9d6e5c2cab60fb8b044c7bf1acb9a9",
            "name": "Peter  Kuiphof",
            "PhoneAddress": "+31651262411",
            "role": "3"
        },
        "state": "com.ask-cs.State.NoPlanning",
        "uuid": "4640kuiphof"
    },
    // {
    //     "config": {},
    //     "name": "Schippers  GSM",
    //     "personalAgentUrl": "http://sven.ask-services.appspot.com/eveagents/personalagent//",
    //     "rate": 1,
    //     "resources": {
    //         "id": "",
    //         "name": "Schippers  GSM",
    //         "PhoneAddress": "+31646140402",
    //         "role": "3"
    //     },
    //     "state": "com.ask-cs.State.NoPlanning",
    //     "uuid": ""
    // },
    {
        "config": {},
        "name": "Gerben  1Hop",
        "personalAgentUrl": "http://sven.ask-services.appspot.com/eveagents/personalagent/4350hop/",
        "rate": 1,
        "resources": {
            "id": "4350hop",
            "askPass": "d2247713b3faf06b07f4c69e8850c8b6",
            "name": "Gerben  1Hop",
            "PhoneAddress": "+31651313950",
            "role": "3"
        },
        "state": "com.ask-cs.State.NoPlanning",
        "uuid": "4350hop"
    },
    {
        "config": {},
        "name": "Rolph  2 Herks",
        "personalAgentUrl": "http://sven.ask-services.appspot.com/eveagents/personalagent/4173herks/",
        "rate": 1,
        "resources": {
            "id": "4173herks",
            "askPass": "2db95e8e1a9267b7a1188556b2013b33",
            "name": "Rolph  2 Herks",
            "PhoneAddress": "+31611225522",
            "role": "2"
        },
        "state": "com.ask-cs.State.NoPlanning",
        "uuid": "4173herks"
    },
    {
        "config": {},
        "name": "Floris  1Visser",
        "personalAgentUrl": "http://sven.ask-services.appspot.com/eveagents/personalagent/4056visser/",
        "rate": 1,
        "resources": {
            "id": "4056visser",
            "askPass": "92a091ddab4daf576643bd29a50b1603",
            "name": "Floris  1Visser",
            "PhoneAddress": "+31613573885",
            "role": "2"
        },
        "state": "com.ask-cs.State.NoPlanning",
        "uuid": "4056visser"
    },
    {
        "config": {},
        "name": "Remco  2Verwaal",
        "personalAgentUrl": "http://sven.ask-services.appspot.com/eveagents/personalagent/4179verwaal/",
        "rate": 1,
        "resources": {
            "id": "4179verwaal",
            "askPass": "80975550806eb4c9abaf7bb3d6cd4868",
            "name": "Remco  2Verwaal",
            "PhoneAddress": "+31652052024",
            "role": "2"
        },
        "state": "com.ask-cs.State.NoPlanning",
        "uuid": "4179verwaal"
    },
    {
        "config": {},
        "name": "Lennard  2Theunisse",
        "personalAgentUrl": "http://sven.ask-services.appspot.com/eveagents/personalagent/4059theunisse/",
        "rate": 1,
        "resources": {
            "id": "4059theunisse",
            "askPass": "f5212ff3f9bac5439368462f2e791558",
            "name": "Lennard  2Theunisse",
            "PhoneAddress": "+31619348536",
            "role": "3"
        },
        "state": "com.ask-cs.State.NoPlanning",
        "uuid": "4059theunisse"
    },
    {
        "config": {},
        "name": "Johan  1Schouwenaar",
        "personalAgentUrl": "http://sven.ask-services.appspot.com/eveagents/personalagent/4171schouwenaar/",
        "rate": 1,
        "resources": {
            "id": "4171schouwenaar",
            "askPass": "b48406b7c7d88252468b62a54ccfa3ad",
            "name": "Johan  1Schouwenaar",
            "PhoneAddress": "+31620300692",
            "role": "1"
        },
        "state": "com.ask-cs.State.NoPlanning",
        "uuid": "4171schouwenaar"
    },
    {
        "config": {},
        "name": "Marco  1Prins",
        "personalAgentUrl": "http://sven.ask-services.appspot.com/eveagents/personalagent/4176prins/",
        "rate": 1,
        "resources": {
            "id": "4176prins",
            "askPass": "a5e10524dda9887ddb4efcee847e3a71",
            "name": "Marco  1Prins",
            "PhoneAddress": "+31651325066",
            "role": "3"
        },
        "state": "com.ask-cs.State.NoPlanning",
        "uuid": "4176prins"
    },
    {
        "config": {},
        "name": "Erik  2 van den Oever",
        "personalAgentUrl": "http://sven.ask-services.appspot.com/eveagents/personalagent/4057oever/",
        "rate": 1,
        "resources": {
            "id": "4057oever",
            "askPass": "fb0d51f344ff62db41260f958d320e63",
            "name": "Erik  2 van den Oever",
            "PhoneAddress": "+31653131607",
            "role": "2"
        },
        "state": "com.ask-cs.State.NoPlanning",
        "uuid": "4057oever"
    },
    {
        "config": {},
        "name": "Henk  2van der Meij",
        "personalAgentUrl": "http://sven.ask-services.appspot.com/eveagents/personalagent/4085meij/",
        "rate": 1,
        "resources": {
            "id": "4085meij",
            "askPass": "62d611788f7e38472db2c6836612e1c3",
            "name": "Henk  2van der Meij",
            "PhoneAddress": "+31648270131",
            "role": "3"
        },
        "state": "com.ask-cs.State.NoPlanning",
        "uuid": "4085meij"
    },
    {
        "config": {},
        "name": "Michael  2Hooijschuur",
        "personalAgentUrl": "http://sven.ask-services.appspot.com/eveagents/personalagent/4178hooijschuur/",
        "rate": 1,
        "resources": {
            "id": "4178hooijschuur",
            "askPass": "00c84a18619700858ebfd435e47de17e",
            "name": "Michael  2Hooijschuur",
            "PhoneAddress": "+31621243519",
            "role": "3"
        },
        "state": "com.ask-cs.State.NoPlanning",
        "uuid": "4178hooijschuur"
    },
    {
        "config": {},
        "name": "Robert  1 Herks",
        "personalAgentUrl": "http://sven.ask-services.appspot.com/eveagents/personalagent/4129herks/",
        "rate": 1,
        "resources": {
            "id": "4129herks",
            "askPass": "f5212ff3f9bac5439368462f2e791558",
            "name": "Robert  1 Herks",
            "PhoneAddress": "+31625321827",
            "role": "2"
        },
        "state": "com.ask-cs.State.NoPlanning",
        "uuid": "4129herks"
    },
    {
        "config": {},
        "name": "Jeroen  2Fok",
        "personalAgentUrl": "http://sven.ask-services.appspot.com/eveagents/personalagent/4058fok/",
        "rate": 1,
        "resources": {
            "id": "4058fok",
            "askPass": "288116504f5e303e4be4ff1765b81f5d",
            "name": "Jeroen  2Fok",
            "PhoneAddress": "+31653508293",
            "role": "2"
        },
        "state": "com.ask-cs.State.NoPlanning",
        "uuid": "4058fok"
    },
    {
        "config": {},
        "name": "Wim  1Durinck",
        "personalAgentUrl": "http://sven.ask-services.appspot.com/eveagents/personalagent/4170durinck/",
        "rate": 1,
        "resources": {
            "id": "4170durinck",
            "askPass": "f5212ff3f9bac5439368462f2e791558",
            "name": "Wim  1Durinck",
            "PhoneAddress": " 31653239466",
            "role": "3"
        },
        "state": "com.ask-cs.State.NoPlanning",
        "uuid": "4170durinck"
    },
    {
        "config": {},
        "name": "Arjen  1 de Bruin",
        "personalAgentUrl": "http://sven.ask-services.appspot.com/eveagents/personalagent/4125bruin/",
        "rate": 1,
        "resources": {
            "id": "4125bruin",
            "askPass": "a6988b18b93b884a8bb9aecef6b939c3",
            "name": "Arjen  1 de Bruin",
            "PhoneAddress": "+31654745489",
            "role": "3"
        },
        "state": "com.ask-cs.State.NoPlanning",
        "uuid": "4125bruin"
    },
    {
        "config": {},
        "name": "Andries  1Boneschansker",
        "personalAgentUrl": "http://sven.ask-services.appspot.com/eveagents/personalagent/4128boneschansker/",
        "rate": 1,
        "resources": {
            "id": "4128boneschansker",
            "askPass": "bbe207afad476fb61826071780defea9",
            "name": "Andries  1Boneschansker",
            "PhoneAddress": "+31681795624",
            "role": "3"
        },
        "state": "com.ask-cs.State.NoPlanning",
        "uuid": "4128boneschansker"
    }
];




var demo_users = [
  {
    "resources": {
      "settingsWebPaige": "{\"user\":{\"language\":\"nl\"},\"app\":{\"widgets\":{\"groups\":{\"0e34b897-101a-4a45-8047-b474bb1db286\":{\"status\":true,\"divisions\":false},\"005178ee-f89f-408f-917b-8d89b3b16d66\":{\"status\":true,\"divisions\":false},\"54e2e1a1-dce7-46ff-b1d3-610d04da11a7\":{\"status\":true,\"divisions\":false},\"8e694f0a-f01d-4230-9c8c-11ff0eaaaa0c\":{\"status\":true,\"divisions\":false},\"4d1d463d-e2be-43a2-992a-8ccd1014616e\":{\"status\":true,\"divisions\":false},\"cedf696d-d35d-44f8-93e7-d82baf7c397f\":{\"status\":true,\"divisions\":false},\"ba1328da-4b4f-4db8-89a9-a615b3cc94f6\":{\"status\":true,\"divisions\":false},\"d017837b-510a-44c3-bde6-e378854f987f\":{\"status\":true,\"divisions\":false}}},\"group\":\"0e34b897-101a-4a45-8047-b474bb1db286\"}}",
      "lastName": "van der Meer",
      "APNSKey": "8bfa1ea5881b5c81264a1bdb20bc79c3e44d7dd0a8521800698a5a01a6941435",
      "name": "van der Meer, Idris",
      "EmailAddress": "idrisvandermeer@gmail.com",
      "PhoneAddress": "+31652330350",
      "role": "3",
      "firstName": "Idris",
      "md5Password": "b8051988e1bb0ca8a4d6ee0e041fee8c"
    },
    "rate": "1.0",
    "name": "van der Meer, Idris",
    "config": {},
    "uuid": "1715meer",
    "personalAgentUrl": "xmpp:1715meer@xmpp.ask-cs.com/cloud"
  },
  {
    "resources": {
      "settingsWebPaige": "{\"user\":{\"language\":\"nl\"},\"app\":{\"widgets\":{\"groups\":{\"8e694f0a-f01d-4230-9c8c-11ff0eaaaa0c\":{\"status\":true,\"divisions\":false},\"cedf696d-d35d-44f8-93e7-d82baf7c397f\":{\"status\":true,\"divisions\":false},\"54e2e1a1-dce7-46ff-b1d3-610d04da11a7\":{\"status\":true,\"divisions\":false},\"ba1328da-4b4f-4db8-89a9-a615b3cc94f6\":{\"status\":true,\"divisions\":false},\"005178ee-f89f-408f-917b-8d89b3b16d66\":{\"status\":true,\"divisions\":false},\"0e34b897-101a-4a45-8047-b474bb1db286\":{\"status\":true,\"divisions\":false},\"4d1d463d-e2be-43a2-992a-8ccd1014616e\":{\"status\":true,\"divisions\":false},\"d017837b-510a-44c3-bde6-e378854f987f\":{\"status\":true,\"divisions\":false}}},\"group\":\"8e694f0a-f01d-4230-9c8c-11ff0eaaaa0c\"}}",
      "lastName": "Metselaar",
      "PostAddress": "Beurtschip 50",
      "APNSKey": "54531089fbb2da782c4d481c0ea6cb1e4fbd304072682b06da0a88270ef0ddcf",
      "PostCity": "Enkhuizen",
      "PostZip": "1602BA",
      "name": "Bart Metselaar",
      "EmailAddress": "bart.metselaar@hetnet.nl",
      "PhoneAddress": "+31651567736",
      "role": "3",
      "uuid": "1319metselaar",
      "firstName": "Bart",
      "md5Password": "d08e2895a898a68aab632e02dca80e49"
    },
    "rate": "1.0",
    "name": "Bart Metselaar",
    "config": {},
    "uuid": "1319metselaar",
    "personalAgentUrl": "xmpp:1319metselaar@xmpp.ask-cs.com/cloud"
  },
  {
    "resources": {
      "settingsWebPaige": "{\"user\":{\"language\":\"nl\"},\"app\":{\"group\":\"0e34b897-101a-4a45-8047-b474bb1db286\",\"widgets\":{\"groups\":{\"ba1328da-4b4f-4db8-89a9-a615b3cc94f6\":{\"status\":false,\"divisions\":false},\"54e2e1a1-dce7-46ff-b1d3-610d04da11a7\":{\"status\":false,\"divisions\":false},\"0e34b897-101a-4a45-8047-b474bb1db286\":{\"status\":true,\"divisions\":false},\"005178ee-f89f-408f-917b-8d89b3b16d66\":{\"status\":false,\"divisions\":false},\"cedf696d-d35d-44f8-93e7-d82baf7c397f\":{\"status\":true,\"divisions\":false},\"d017837b-510a-44c3-bde6-e378854f987f\":{\"status\":false,\"divisions\":false},\"4d1d463d-e2be-43a2-992a-8ccd1014616e\":{\"status\":false,\"divisions\":false},\"8e694f0a-f01d-4230-9c8c-11ff0eaaaa0c\":{\"status\":false,\"divisions\":false}}}}}",
      "lastName": "Lub",
      "name": "Chris Lub",
      "Password": "Welkom1",
      "EmailAddress": "chris_lub@hotmail.com",
      "PhoneAddress": "+31612151265",
      "role": "3",
      "uuid": "4431lub",
      "firstName": "Chris",
      "md5Password": "cb873f296c8f578b70bdfc61fd7ed7e7"
    },
    "rate": "1.0",
    "name": "Chris Lub",
    "config": {},
    "uuid": "4431lub",
    "personalAgentUrl": "xmpp:4431lub@xmpp.ask-cs.com/cloud"
  },
  {
    "resources": {
      "lastName": "de Vrij",
      "APNSKey": "d91cf7d870aa282bfd15dfc4cad7e983bfa3f57dd3a10e01141792b12a6ad1d7",
      "name": "de Vrij, Simone",
      "EmailAddress": "sdevrij@hetnet.nl",
      "role": "3",
      "PhoneAddress": "+31650215147",
      "firstName": "Simone",
      "md5Password": "f389947fc79da8e45846462f70e2548d"
    },
    "rate": "1.0",
    "name": "de Vrij, Simone",
    "config": {},
    "uuid": "4951vrij",
    "personalAgentUrl": "xmpp:4951vrij@xmpp.ask-cs.com/cloud"
  },
  {
    "resources": {
      "lastName": "Nauta",
      "name": "Nauta, Ben",
      "EmailAddress": "bnauta@quicknet.nl",
      "role": "3",
      "PhoneAddress": "+31611427475",
      "firstName": "Ben",
      "md5Password": "73f30a278c84dd30652ac99f229ed962"
    },
    "rate": "1.0",
    "name": "Nauta, Ben",
    "config": {},
    "uuid": "675nauta",
    "personalAgentUrl": "xmpp:675nauta@xmpp.ask-cs.com/cloud"
  },
  {
    "resources": {
      "settingsWebPaige": "{\"user\":{\"language\":\"nl\"},\"app\":{\"widgets\":{\"groups\":{\"8e694f0a-f01d-4230-9c8c-11ff0eaaaa0c\":{\"status\":true,\"divisions\":false},\"cedf696d-d35d-44f8-93e7-d82baf7c397f\":{\"status\":true,\"divisions\":false},\"4d1d463d-e2be-43a2-992a-8ccd1014616e\":{\"status\":true,\"divisions\":false},\"005178ee-f89f-408f-917b-8d89b3b16d66\":{\"status\":true,\"divisions\":false},\"54e2e1a1-dce7-46ff-b1d3-610d04da11a7\":{\"status\":true,\"divisions\":false},\"0e34b897-101a-4a45-8047-b474bb1db286\":{\"status\":true,\"divisions\":false},\"ba1328da-4b4f-4db8-89a9-a615b3cc94f6\":{\"status\":true,\"divisions\":false},\"d017837b-510a-44c3-bde6-e378854f987f\":{\"status\":true,\"divisions\":false}}},\"group\":\"8e694f0a-f01d-4230-9c8c-11ff0eaaaa0c\"}}",
      "lastName": "Bettonvil",
      "name": "Bettonvil, Leon",
      "EmailAddress": "dezwart@quicknet.nl",
      "PhoneAddress": "+31651866647",
      "role": "3",
      "firstName": "Leon",
      "md5Password": "95abfbf87554111d5d07ce1257f94c17"
    },
    "rate": "1.0",
    "name": "Bettonvil, Leon",
    "config": {},
    "uuid": "4922bettonvil",
    "personalAgentUrl": "xmpp:4922bettonvil@xmpp.ask-cs.com/cloud"
  },
  {
    "resources": {
      "settingsWebPaige": "{\"user\":{\"language\":\"nl\"},\"app\":{\"group\":\"0e34b897-101a-4a45-8047-b474bb1db286\",\"widgets\":{\"groups\":{\"0e34b897-101a-4a45-8047-b474bb1db286\":{\"status\":true,\"divisions\":false},\"d017837b-510a-44c3-bde6-e378854f987f\":{\"status\":false,\"divisions\":false},\"54e2e1a1-dce7-46ff-b1d3-610d04da11a7\":{\"status\":true,\"divisions\":false},\"cedf696d-d35d-44f8-93e7-d82baf7c397f\":{\"status\":true,\"divisions\":false},\"4d1d463d-e2be-43a2-992a-8ccd1014616e\":{\"status\":true,\"divisions\":false},\"8e694f0a-f01d-4230-9c8c-11ff0eaaaa0c\":{\"status\":true,\"divisions\":false},\"ba1328da-4b4f-4db8-89a9-a615b3cc94f6\":{\"status\":true,\"divisions\":false},\"005178ee-f89f-408f-917b-8d89b3b16d66\":{\"status\":true,\"divisions\":false}}}}}",
      "lastName": "Koopman",
      "name": "Koopman, Eddy",
      "EmailAddress": "koopmankok@quicknet.nl",
      "role": "3",
      "PhoneAddress": "+31653490056",
      "firstName": "Eddy",
      "md5Password": "4363f4f13ac535c56e657a50035ba42b"
    },
    "rate": "1.0",
    "name": "Koopman, Eddy",
    "config": {},
    "uuid": "664koopman",
    "personalAgentUrl": "http://knrm-backend.ask-cs.com/agents/664koopman/"
  },
  {
    "resources": {
      "settingsWebPaige": "{\"user\":{\"language\":\"nl\"},\"app\":{\"group\":\"4d1d463d-e2be-43a2-992a-8ccd1014616e\",\"widgets\":{\"groups\":{\"54e2e1a1-dce7-46ff-b1d3-610d04da11a7\":{\"status\":true,\"divisions\":false},\"005178ee-f89f-408f-917b-8d89b3b16d66\":{\"status\":true,\"divisions\":false},\"8e694f0a-f01d-4230-9c8c-11ff0eaaaa0c\":{\"status\":true,\"divisions\":false},\"4d1d463d-e2be-43a2-992a-8ccd1014616e\":{\"status\":true,\"divisions\":false},\"0e34b897-101a-4a45-8047-b474bb1db286\":{\"status\":true,\"divisions\":false},\"cedf696d-d35d-44f8-93e7-d82baf7c397f\":{\"status\":true,\"divisions\":false},\"ba1328da-4b4f-4db8-89a9-a615b3cc94f6\":{\"status\":true,\"divisions\":false},\"d017837b-510a-44c3-bde6-e378854f987f\":{\"status\":true,\"divisions\":false}}}}}",
      "lastName": "Stavenuiter",
      "name": "Stavenuiter, Nico",
      "EmailAddress": "nm.stavenuiter@quicknet.nl",
      "role": "3",
      "PhoneAddress": "+31630516777",
      "firstName": "Nico",
      "md5Password": "ba44ed86a0818f320471dc82500fac41"
    },
    "rate": "1.0",
    "name": "Stavenuiter, Nico",
    "config": {},
    "uuid": "4950stavenuiter",
    "personalAgentUrl": "xmpp:4950stavenuiter@xmpp.ask-cs.com/cloud"
  },
  {
    "resources": {
      "settingsWebPaige": "{\"user\":{\"language\":\"nl\"},\"app\":{\"widgets\":{\"groups\":{\"3db223b0-ab56-4811-ba8e-0df3e9037a25\":{\"status\":true,\"divisions\":false},\"cedf696d-d35d-44f8-93e7-d82baf7c397f\":{\"status\":true,\"divisions\":false},\"4d1d463d-e2be-43a2-992a-8ccd1014616e\":{\"status\":true,\"divisions\":false},\"54e2e1a1-dce7-46ff-b1d3-610d04da11a7\":{\"status\":true,\"divisions\":false},\"0e34b897-101a-4a45-8047-b474bb1db286\":{\"status\":true,\"divisions\":false},\"ba1328da-4b4f-4db8-89a9-a615b3cc94f6\":{\"status\":true,\"divisions\":false},\"005178ee-f89f-408f-917b-8d89b3b16d66\":{\"status\":true,\"divisions\":false},\"8e694f0a-f01d-4230-9c8c-11ff0eaaaa0c\":{\"status\":true,\"divisions\":false},\"d017837b-510a-44c3-bde6-e378854f987f\":{\"status\":true,\"divisions\":false}}},\"group\":\"3db223b0-ab56-4811-ba8e-0df3e9037a25\"}}",
      "lastName": "Wit",
      "name": "Wit, Robbin",
      "EmailAddress": "robbin_wit@hotmail.com",
      "role": "3",
      "PhoneAddress": "+31612376663",
      "firstName": "Robbin",
      "md5Password": "f5212ff3f9bac5439368462f2e791558"
    },
    "rate": "1.0",
    "name": "Wit, Robbin",
    "config": {},
    "uuid": "4512wit",
    "personalAgentUrl": "http://knrm-backend.ask-cs.com/agents/4512wit/"
  },
  {
    "resources": {
      "settingsWebPaige": "{\"user\":{\"language\":\"nl\"},\"app\":{\"group\":\"005178ee-f89f-408f-917b-8d89b3b16d66\",\"widgets\":{\"groups\":{\"005178ee-f89f-408f-917b-8d89b3b16d66\":{\"status\":true,\"divisions\":false},\"0e34b897-101a-4a45-8047-b474bb1db286\":{\"status\":true,\"divisions\":false},\"4d1d463d-e2be-43a2-992a-8ccd1014616e\":{\"status\":true,\"divisions\":false},\"8e694f0a-f01d-4230-9c8c-11ff0eaaaa0c\":{\"status\":true,\"divisions\":false},\"54e2e1a1-dce7-46ff-b1d3-610d04da11a7\":{\"status\":true,\"divisions\":false},\"cedf696d-d35d-44f8-93e7-d82baf7c397f\":{\"status\":true,\"divisions\":false},\"ba1328da-4b4f-4db8-89a9-a615b3cc94f6\":{\"status\":true,\"divisions\":false},\"d017837b-510a-44c3-bde6-e378854f987f\":{\"status\":true,\"divisions\":false},\"3db223b0-ab56-4811-ba8e-0df3e9037a25\":{\"divisions\":false,\"status\":true}}}}}",
      "lastName": "Frima",
      "name": "Frima, Rob",
      "EmailAddress": "hoirob@hotmail.com",
      "PhoneAddress": "+31652037721",
      "role": "3",
      "firstName": "Rob",
      "md5Password": "f088cdafd675b804248d0b11da4a0c19"
    },
    "rate": "1.0",
    "name": "Frima, Rob",
    "config": {},
    "uuid": "4963frima",
    "personalAgentUrl": "xmpp:4963frima@xmpp.ask-cs.com/cloud"
  },
  {
    "resources": {
      "settingsWebPaige": "{\"user\":{\"language\":\"nl\"},\"app\":{\"group\":\"005178ee-f89f-408f-917b-8d89b3b16d66\",\"widgets\":{\"groups\":{\"005178ee-f89f-408f-917b-8d89b3b16d66\":{\"status\":false,\"divisions\":false},\"ba1328da-4b4f-4db8-89a9-a615b3cc94f6\":{\"status\":false,\"divisions\":false},\"d017837b-510a-44c3-bde6-e378854f987f\":{\"status\":false,\"divisions\":false},\"0e34b897-101a-4a45-8047-b474bb1db286\":{\"status\":true,\"divisions\":false},\"4d1d463d-e2be-43a2-992a-8ccd1014616e\":{\"status\":false,\"divisions\":false},\"cedf696d-d35d-44f8-93e7-d82baf7c397f\":{\"status\":false,\"divisions\":false},\"8e694f0a-f01d-4230-9c8c-11ff0eaaaa0c\":{\"status\":false,\"divisions\":false},\"54e2e1a1-dce7-46ff-b1d3-610d04da11a7\":{\"status\":false,\"divisions\":false}}}}}",
      "lastName": "Post",
      "APNSKey": "6ab84c2678110a266fb3ca37d96e860ff7d327eb1f7d70371ee02764c29a74a0",
      "name": "Post, Rick",
      "EmailAddress": "rickpost@quicknet.nl",
      "PhoneAddress": "+31630673393",
      "role": "3",
      "firstName": "Rick",
      "md5Password": "267d7fddc4e8e359b326013ef98aa066"
    },
    "rate": "1.0",
    "name": "Post, Rick",
    "config": {},
    "uuid": "4583post",
    "personalAgentUrl": "xmpp:4583post@xmpp.ask-cs.com/cloud"
  },
  {
    "resources": {
      "settingsWebPaige": "{\"user\":{\"language\":\"nl\"},\"app\":{\"group\":\"005178ee-f89f-408f-917b-8d89b3b16d66\",\"widgets\":{\"groups\":{\"005178ee-f89f-408f-917b-8d89b3b16d66\":{\"status\":true,\"divisions\":false},\"4d1d463d-e2be-43a2-992a-8ccd1014616e\":{\"status\":true,\"divisions\":false},\"d017837b-510a-44c3-bde6-e378854f987f\":{\"status\":true,\"divisions\":false},\"cedf696d-d35d-44f8-93e7-d82baf7c397f\":{\"status\":true,\"divisions\":false},\"0e34b897-101a-4a45-8047-b474bb1db286\":{\"status\":true,\"divisions\":false},\"54e2e1a1-dce7-46ff-b1d3-610d04da11a7\":{\"status\":true,\"divisions\":false},\"ba1328da-4b4f-4db8-89a9-a615b3cc94f6\":{\"status\":true,\"divisions\":false},\"8e694f0a-f01d-4230-9c8c-11ff0eaaaa0c\":{\"status\":true,\"divisions\":false},\"3db223b0-ab56-4811-ba8e-0df3e9037a25\":{\"divisions\":false,\"status\":false}}}}}",
      "lastName": "Koopman",
      "APNSKey": "a16838885b39fbb57b49058fba6daca8c8161396874436cbb1240a5c9fa44f2f",
      "name": "Koopman, Jacco",
      "EmailAddress": "jacco70@hotmail.com",
      "PhoneAddress": "+31626674607",
      "role": "3",
      "firstName": "Jacco",
      "md5Password": "dd9eb27effd11bf34f17612d67275d6e"
    },
    "rate": "1.0",
    "name": "Koopman, Jacco",
    "config": {},
    "uuid": "666koopman",
    "personalAgentUrl": "xmpp:666koopman@xmpp.ask-cs.com/cloud"
  },
  {
    "resources": {
      "settingsWebPaige": "{\"user\":{\"language\":\"nl\"},\"app\":{\"group\":\"005178ee-f89f-408f-917b-8d89b3b16d66\",\"widgets\":{\"groups\":{\"005178ee-f89f-408f-917b-8d89b3b16d66\":{\"status\":true,\"divisions\":false},\"cedf696d-d35d-44f8-93e7-d82baf7c397f\":{\"status\":false,\"divisions\":false},\"0e34b897-101a-4a45-8047-b474bb1db286\":{\"status\":true,\"divisions\":false},\"3db223b0-ab56-4811-ba8e-0df3e9037a25\":{\"status\":false,\"divisions\":false},\"4d1d463d-e2be-43a2-992a-8ccd1014616e\":{\"status\":true,\"divisions\":false},\"d017837b-510a-44c3-bde6-e378854f987f\":{\"status\":false,\"divisions\":false},\"8e694f0a-f01d-4230-9c8c-11ff0eaaaa0c\":{\"status\":false,\"divisions\":false},\"54e2e1a1-dce7-46ff-b1d3-610d04da11a7\":{\"status\":true,\"divisions\":false},\"ba1328da-4b4f-4db8-89a9-a615b3cc94f6\":{\"status\":true,\"divisions\":false}}}}}",
      "lastName": "Kulk",
      "APNSKey": "8a57efd966145fc6fba9af0be61035e811653eb228849647afcd666152f88c75",
      "name": "Peter Kulk",
      "EmailAddress": "peterkulk@hetnet.nl",
      "role": "3",
      "PhoneAddress": "+31622244509",
      "firstName": "Peter",
      "md5Password": "d596fc1d6fdc2e7cdbc1490bde75e4ce"
    },
    "rate": "1.0",
    "name": "Peter Kulk",
    "config": {},
    "uuid": "1126kulk",
    "personalAgentUrl": "xmpp:1126kulk@xmpp.ask-cs.com/cloud"
  },
  {
    "resources": {
      "settingsWebPaige": "{\"user\":{\"language\":\"nl\"},\"app\":{\"group\":\"4d1d463d-e2be-43a2-992a-8ccd1014616e\",\"widgets\":{\"groups\":{\"4d1d463d-e2be-43a2-992a-8ccd1014616e\":{\"status\":false,\"divisions\":false},\"0e34b897-101a-4a45-8047-b474bb1db286\":{\"status\":true,\"divisions\":false},\"d017837b-510a-44c3-bde6-e378854f987f\":{\"status\":false,\"divisions\":false},\"ba1328da-4b4f-4db8-89a9-a615b3cc94f6\":{\"status\":false,\"divisions\":false},\"8e694f0a-f01d-4230-9c8c-11ff0eaaaa0c\":{\"status\":true,\"divisions\":false},\"54e2e1a1-dce7-46ff-b1d3-610d04da11a7\":{\"status\":false,\"divisions\":false},\"005178ee-f89f-408f-917b-8d89b3b16d66\":{\"status\":true,\"divisions\":false},\"cedf696d-d35d-44f8-93e7-d82baf7c397f\":{\"status\":true,\"divisions\":false}}}}}",
      "lastName": "Winter",
      "APNSKey": "2a91bf432199a7beba2a2a586a79956dcba34b3d9a43fd9c8ea694a784f09db7",
      "name": "Winter, Jarno",
      "EmailAddress": "noorderdiep@gmail.com",
      "PhoneAddress": "+31623326558",
      "role": "3",
      "firstName": "Jarno",
      "md5Password": "17e341d76f9287b20c93c01a53f5e0d5"
    },
    "rate": "1.0",
    "name": "Winter, Jarno",
    "config": {},
    "uuid": "4584winter",
    "personalAgentUrl": "xmpp:4584winter@xmpp.ask-cs.com/cloud"
  },
  {
    "resources": {
      "settingsWebPaige": "{\"user\":{\"language\":\"nl\"},\"app\":{\"group\":\"0e34b897-101a-4a45-8047-b474bb1db286\",\"widgets\":{\"groups\":{\"54e2e1a1-dce7-46ff-b1d3-610d04da11a7\":{\"status\":false,\"divisions\":false},\"005178ee-f89f-408f-917b-8d89b3b16d66\":{\"status\":true,\"divisions\":false},\"0e34b897-101a-4a45-8047-b474bb1db286\":{\"status\":true,\"divisions\":false},\"cedf696d-d35d-44f8-93e7-d82baf7c397f\":{\"status\":false,\"divisions\":false},\"d017837b-510a-44c3-bde6-e378854f987f\":{\"status\":false,\"divisions\":false},\"4d1d463d-e2be-43a2-992a-8ccd1014616e\":{\"status\":true,\"divisions\":false},\"ba1328da-4b4f-4db8-89a9-a615b3cc94f6\":{\"status\":false,\"divisions\":false},\"8e694f0a-f01d-4230-9c8c-11ff0eaaaa0c\":{\"status\":false,\"divisions\":false}}}}}",
      "lastName": "Roosendaal",
      "APNSKey": "",
      "name": "Roosendaal, Rob",
      "EmailAddress": "rob.roosendaal@quicknet.nl",
      "PhoneAddress": "+31622212778",
      "role": "1",
      "firstName": "Rob",
      "askPass": "52d4ad795b11479438beb09856dfef11",
      "md5Password": "52d4ad795b11479438beb09856dfef11"
    },
    "rate": "1.0",
    "name": "Roosendaal, Rob",
    "config": {},
    "uuid": "1038roosendaal",
    "personalAgentUrl": "xmpp:1038roosendaal@xmpp.ask-cs.com/cloud"
  },
  {
    "resources": {
      "settingsWebPaige": "{\"user\":{\"language\":\"nl\"},\"app\":{\"group\":\"d017837b-510a-44c3-bde6-e378854f987f\",\"widgets\":{\"groups\":{\"d017837b-510a-44c3-bde6-e378854f987f\":{\"status\":false,\"divisions\":false},\"cedf696d-d35d-44f8-93e7-d82baf7c397f\":{\"status\":false,\"divisions\":false},\"8e694f0a-f01d-4230-9c8c-11ff0eaaaa0c\":{\"status\":false,\"divisions\":false},\"005178ee-f89f-408f-917b-8d89b3b16d66\":{\"status\":true,\"divisions\":false},\"ba1328da-4b4f-4db8-89a9-a615b3cc94f6\":{\"status\":false,\"divisions\":false},\"4d1d463d-e2be-43a2-992a-8ccd1014616e\":{\"status\":false,\"divisions\":false},\"54e2e1a1-dce7-46ff-b1d3-610d04da11a7\":{\"status\":false,\"divisions\":false},\"0e34b897-101a-4a45-8047-b474bb1db286\":{\"status\":true,\"divisions\":false}}}}}",
      "lastName": "Schouten",
      "name": "Schouten, Stefan",
      "EmailAddress": "stefnr7@hotmail.com",
      "PhoneAddress": "+31624777148",
      "role": "3",
      "firstName": "Stefan",
      "md5Password": "f1a9f8cc181fe8dfd410437e49bafbfc"
    },
    "rate": "1.0",
    "name": "Schouten, Stefan",
    "config": {},
    "uuid": "4962schouten",
    "personalAgentUrl": "xmpp:4962schouten@xmpp.ask-cs.com/cloud"
  },
  {
    "resources": {
      "settingsWebPaige": "{\"user\":{\"language\":\"nl\"},\"app\":{\"widgets\":{\"groups\":{\"0e34b897-101a-4a45-8047-b474bb1db286\":{\"status\":true,\"divisions\":false},\"4d1d463d-e2be-43a2-992a-8ccd1014616e\":{\"status\":true,\"divisions\":false},\"005178ee-f89f-408f-917b-8d89b3b16d66\":{\"status\":true,\"divisions\":false},\"3db223b0-ab56-4811-ba8e-0df3e9037a25\":{\"status\":true,\"divisions\":false},\"54e2e1a1-dce7-46ff-b1d3-610d04da11a7\":{\"status\":true,\"divisions\":false},\"8e694f0a-f01d-4230-9c8c-11ff0eaaaa0c\":{\"status\":true,\"divisions\":false},\"d017837b-510a-44c3-bde6-e378854f987f\":{\"status\":true,\"divisions\":false},\"cedf696d-d35d-44f8-93e7-d82baf7c397f\":{\"status\":true,\"divisions\":false},\"ba1328da-4b4f-4db8-89a9-a615b3cc94f6\":{\"status\":true,\"divisions\":false}}},\"group\":\"0e34b897-101a-4a45-8047-b474bb1db286\"}}",
      "lastName": "Lijnsvelt",
      "APNSKey": "5714a110ccade0e3133714699bbefb2601de3468d96c76ddc132dac4b031b735",
      "name": "Lijnsvelt, Arjan",
      "EmailAddress": "arie.l@versatel.nl",
      "PhoneAddress": "+31622557761",
      "role": "3",
      "firstName": "Arjan",
      "md5Password": "43f8ae55bda680c41f12ab9808afcb3f"
    },
    "rate": "1.0",
    "name": "Lijnsvelt, Arjan",
    "config": {},
    "uuid": "1286lijnsvelt",
    "personalAgentUrl": "xmpp:1286lijnsvelt@xmpp.ask-cs.com/cloud"
  },
  {
    "resources": {
      "settingsWebPaige": "{\"user\":{\"language\":\"nl\"},\"app\":{\"widgets\":{\"groups\":{\"d017837b-510a-44c3-bde6-e378854f987f\":{\"status\":true,\"divisions\":false},\"cedf696d-d35d-44f8-93e7-d82baf7c397f\":{\"status\":true,\"divisions\":false},\"ba1328da-4b4f-4db8-89a9-a615b3cc94f6\":{\"status\":true,\"divisions\":false},\"4d1d463d-e2be-43a2-992a-8ccd1014616e\":{\"status\":true,\"divisions\":false},\"54e2e1a1-dce7-46ff-b1d3-610d04da11a7\":{\"status\":true,\"divisions\":false},\"8e694f0a-f01d-4230-9c8c-11ff0eaaaa0c\":{\"status\":true,\"divisions\":false},\"005178ee-f89f-408f-917b-8d89b3b16d66\":{\"status\":true,\"divisions\":false},\"0e34b897-101a-4a45-8047-b474bb1db286\":{\"status\":true,\"divisions\":false}}},\"group\":\"d017837b-510a-44c3-bde6-e378854f987f\"}}",
      "lastName": "Smeets",
      "name": "Smeets, Marc",
      "EmailAddress": "marcussmeets@hotmail.com",
      "PhoneAddress": "+31651812141",
      "role": "3",
      "firstName": "Marc",
      "md5Password": "9d21b3e1feec27bdacf34f8178ecdea6"
    },
    "rate": "1.0",
    "name": "Smeets, Marc",
    "config": {},
    "uuid": "2673smeets",
    "personalAgentUrl": "xmpp:2673smeets@xmpp.ask-cs.com/cloud"
  },
  {
    "resources": {
      "settingsWebPaige": "{\"user\":{\"language\":\"nl\"},\"app\":{\"widgets\":{\"groups\":{\"3db223b0-ab56-4811-ba8e-0df3e9037a25\":{\"status\":true,\"divisions\":false},\"8e694f0a-f01d-4230-9c8c-11ff0eaaaa0c\":{\"status\":true,\"divisions\":false},\"54e2e1a1-dce7-46ff-b1d3-610d04da11a7\":{\"status\":true,\"divisions\":false},\"cedf696d-d35d-44f8-93e7-d82baf7c397f\":{\"status\":true,\"divisions\":false},\"0e34b897-101a-4a45-8047-b474bb1db286\":{\"status\":true,\"divisions\":false},\"d017837b-510a-44c3-bde6-e378854f987f\":{\"status\":true,\"divisions\":false},\"005178ee-f89f-408f-917b-8d89b3b16d66\":{\"status\":true,\"divisions\":false},\"4d1d463d-e2be-43a2-992a-8ccd1014616e\":{\"status\":true,\"divisions\":false},\"ba1328da-4b4f-4db8-89a9-a615b3cc94f6\":{\"status\":true,\"divisions\":false}}},\"group\":\"3db223b0-ab56-4811-ba8e-0df3e9037a25\"}}",
      "lastName": "Pijfers",
      "name": "Rob Pijfers",
      "Password": "12345",
      "EmailAddress": "pijfers@quicknet.nl",
      "role": "3",
      "PhoneAddress": "+31640465879",
      "uuid": "1208pijfers",
      "firstName": "Rob",
      "md5Password": "827ccb0eea8a706c4c34a16891f84e7b"
    },
    "rate": "1.0",
    "name": "Rob Pijfers",
    "config": {},
    "uuid": "1208pijfers",
    "personalAgentUrl": "http://knrm-backend.ask-cs.com/agents/1208pijfers/"
  },
  {
    "resources": {
      "settingsWebPaige": "{\"user\":{\"language\":\"nl\"},\"app\":{\"widgets\":{\"groups\":{\"cedf696d-d35d-44f8-93e7-d82baf7c397f\":{\"status\":true,\"divisions\":false},\"0e34b897-101a-4a45-8047-b474bb1db286\":{\"status\":true,\"divisions\":false},\"005178ee-f89f-408f-917b-8d89b3b16d66\":{\"status\":true,\"divisions\":false},\"ba1328da-4b4f-4db8-89a9-a615b3cc94f6\":{\"status\":true,\"divisions\":false},\"4d1d463d-e2be-43a2-992a-8ccd1014616e\":{\"status\":true,\"divisions\":false},\"54e2e1a1-dce7-46ff-b1d3-610d04da11a7\":{\"status\":true,\"divisions\":false},\"d017837b-510a-44c3-bde6-e378854f987f\":{\"status\":true,\"divisions\":false},\"8e694f0a-f01d-4230-9c8c-11ff0eaaaa0c\":{\"status\":true,\"divisions\":false}}},\"group\":\"4d1d463d-e2be-43a2-992a-8ccd1014616e\"}}",
      "lastName": "van der Kleij",
      "name": "van der Kleij, Henk",
      "EmailAddress": "h.p.vanderkleij2@quicknet.nl",
      "role": "3",
      "PhoneAddress": "+31613124399",
      "firstName": "Henk",
      "md5Password": "d60722bdb31a35d5011afaaf7d298329"
    },
    "rate": "1.0",
    "name": "van der Kleij, Henk",
    "config": {},
    "uuid": "4948kleij",
    "personalAgentUrl": "xmpp:4948kleij@xmpp.ask-cs.com/cloud"
  },
  {
    "resources": {
      "settingsWebPaige": "{\"user\":{\"language\":\"nl\"},\"app\":{\"widgets\":{\"groups\":{\"54e2e1a1-dce7-46ff-b1d3-610d04da11a7\":{\"status\":true,\"divisions\":false},\"cedf696d-d35d-44f8-93e7-d82baf7c397f\":{\"status\":true,\"divisions\":false},\"d017837b-510a-44c3-bde6-e378854f987f\":{\"status\":true,\"divisions\":false},\"005178ee-f89f-408f-917b-8d89b3b16d66\":{\"status\":true,\"divisions\":false},\"8e694f0a-f01d-4230-9c8c-11ff0eaaaa0c\":{\"status\":true,\"divisions\":false},\"4d1d463d-e2be-43a2-992a-8ccd1014616e\":{\"status\":true,\"divisions\":false},\"0e34b897-101a-4a45-8047-b474bb1db286\":{\"status\":true,\"divisions\":false},\"ba1328da-4b4f-4db8-89a9-a615b3cc94f6\":{\"status\":true,\"divisions\":false}}},\"group\":\"54e2e1a1-dce7-46ff-b1d3-610d04da11a7\"}}",
      "lastName": "van Antwerpen",
      "name": "van Antwerpen, Ad",
      "EmailAddress": "ad.v.antwerpen@gmail.com",
      "PhoneAddress": "+31627581935",
      "role": "3",
      "firstName": "Ad",
      "md5Password": "ba44ed86a0818f320471dc82500fac41"
    },
    "rate": "1.0",
    "name": "van Antwerpen, Ad",
    "config": {},
    "uuid": "4949antwerpen",
    "personalAgentUrl": "xmpp:4949antwerpen@xmpp.ask-cs.com/cloud"
  },
  {
    "resources": {
      "lastName": "Folmer",
      "name": "Folmer, Bernt",
      "EmailAddress": "bfolmer@tiscali.nl",
      "role": "3",
      "PhoneAddress": "+31628450890",
      "firstName": "Bernt",
      "md5Password": "f5212ff3f9bac5439368462f2e791558"
    },
    "rate": "1.0",
    "name": "Folmer, Bernt",
    "config": {},
    "uuid": "1406folmer",
    "personalAgentUrl": "xmpp:1406folmer@xmpp.ask-cs.com/cloud"
  },
  {
    "resources": {
      "settingsWebPaige": "{\"user\":{\"language\":\"nl\"},\"app\":{\"widgets\":{\"groups\":{\"cedf696d-d35d-44f8-93e7-d82baf7c397f\":{\"status\":true,\"divisions\":false},\"4d1d463d-e2be-43a2-992a-8ccd1014616e\":{\"status\":true,\"divisions\":false},\"d017837b-510a-44c3-bde6-e378854f987f\":{\"status\":true,\"divisions\":false},\"ba1328da-4b4f-4db8-89a9-a615b3cc94f6\":{\"status\":true,\"divisions\":false},\"0e34b897-101a-4a45-8047-b474bb1db286\":{\"status\":true,\"divisions\":false},\"54e2e1a1-dce7-46ff-b1d3-610d04da11a7\":{\"status\":true,\"divisions\":false},\"005178ee-f89f-408f-917b-8d89b3b16d66\":{\"status\":true,\"divisions\":false},\"8e694f0a-f01d-4230-9c8c-11ff0eaaaa0c\":{\"status\":true,\"divisions\":false}}},\"group\":\"cedf696d-d35d-44f8-93e7-d82baf7c397f\"}}",
      "lastName": "Lub",
      "APNSKey": "01b702fd41534dc0a5071c8c255b9c9b7abe05cea2ea3b3ae45c9fa164a23a98",
      "name": "Lub, Jos",
      "EmailAddress": "jt.lub@quicknet.nl",
      "PhoneAddress": "+31653951698",
      "role": "1",
      "firstName": "Jos",
      "md5Password": "245bfeed0ec88d4a79d1c2e398ec4433"
    },
    "rate": "1.0",
    "name": "Lub, Jos",
    "config": {},
    "uuid": "665lub",
    "personalAgentUrl": "xmpp:665lub@xmpp.ask-cs.com/cloud"
  },
  {
    "resources": {
      "settingsWebPaige": "{\"user\":{\"language\":\"nl\"},\"app\":{\"group\":\"0e34b897-101a-4a45-8047-b474bb1db286\",\"widgets\":{\"groups\":{\"0e34b897-101a-4a45-8047-b474bb1db286\":{\"status\":true,\"divisions\":false},\"d017837b-510a-44c3-bde6-e378854f987f\":{\"status\":true,\"divisions\":false},\"4d1d463d-e2be-43a2-992a-8ccd1014616e\":{\"status\":true,\"divisions\":false},\"8e694f0a-f01d-4230-9c8c-11ff0eaaaa0c\":{\"status\":true,\"divisions\":false},\"cedf696d-d35d-44f8-93e7-d82baf7c397f\":{\"status\":true,\"divisions\":false},\"005178ee-f89f-408f-917b-8d89b3b16d66\":{\"status\":true,\"divisions\":false},\"54e2e1a1-dce7-46ff-b1d3-610d04da11a7\":{\"status\":true,\"divisions\":false},\"ba1328da-4b4f-4db8-89a9-a615b3cc94f6\":{\"status\":true,\"divisions\":false},\"3db223b0-ab56-4811-ba8e-0df3e9037a25\":{\"divisions\":false,\"status\":true}}}}}",
      "lastName": "Baya",
      "PostAddress": "Sint Janstraat 15",
      "PostCity": "Enkhuizen",
      "PostZip": "1601 HD",
      "name": "Jugo Baya",
      "EmailAddress": "jb@shiptron.nl",
      "PhoneAddress": "+31653958093",
      "role": "3",
      "uuid": "676baya",
      "firstName": "Jugo",
      "md5Password": "cd43585c6a4bd8bc91aeea04a6ad7c31"
    },
    "rate": "1.0",
    "name": "Jugo Baya",
    "config": {},
    "uuid": "676baya",
    "personalAgentUrl": "xmpp:676baya@xmpp.ask-cs.com/cloud"
  },
  {
    "resources": {
      "settingsWebPaige": "{\"user\":{\"language\":\"nl\"},\"app\":{\"widgets\":{\"groups\":{\"d017837b-510a-44c3-bde6-e378854f987f\":{\"status\":true,\"divisions\":false},\"0e34b897-101a-4a45-8047-b474bb1db286\":{\"status\":true,\"divisions\":false},\"4d1d463d-e2be-43a2-992a-8ccd1014616e\":{\"status\":true,\"divisions\":false},\"cedf696d-d35d-44f8-93e7-d82baf7c397f\":{\"status\":true,\"divisions\":false},\"ba1328da-4b4f-4db8-89a9-a615b3cc94f6\":{\"status\":true,\"divisions\":false},\"8e694f0a-f01d-4230-9c8c-11ff0eaaaa0c\":{\"status\":true,\"divisions\":false},\"54e2e1a1-dce7-46ff-b1d3-610d04da11a7\":{\"status\":true,\"divisions\":false},\"005178ee-f89f-408f-917b-8d89b3b16d66\":{\"status\":true,\"divisions\":false}}},\"group\":\"d017837b-510a-44c3-bde6-e378854f987f\"}}",
      "lastName": "Greiner",
      "name": "Greiner, Johan",
      "EmailAddress": "johangreiner@planet.nl",
      "role": "3",
      "PhoneAddress": "+31620851984",
      "firstName": "Johan",
      "md5Password": "c0629ed3fd58d90612744608963acc19"
    },
    "rate": "1.0",
    "name": "Greiner, Johan",
    "config": {},
    "uuid": "1248greiner",
    "personalAgentUrl": "http://knrm-backend.ask-cs.com/agents/1248greiner/"
  },
  {
    "resources": {
      "lastName": "de Jong",
      "name": "de Jong, Jacko",
      "EmailAddress": "jackodejong@hetnet.nl",
      "role": "3",
      "PhoneAddress": "+31610659748",
      "firstName": "Jacko",
      "md5Password": "8a9f281130702ecb5b97d8f7b0732dff"
    },
    "rate": "1.0",
    "name": "de Jong, Jacko",
    "config": {},
    "uuid": "1120jong",
    "personalAgentUrl": "xmpp:1120jong@xmpp.ask-cs.com/cloud"
  },
  {
    "resources": {
      "lastName": "Heering",
      "name": "Heering, Jan",
      "EmailAddress": "j.heering@quicknet.nl",
      "role": "3",
      "PhoneAddress": "+31624261022",
      "firstName": "Jan",
      "md5Password": "75c020357475334d3a46746ae4f73549"
    },
    "rate": "1.0",
    "name": "Heering, Jan",
    "config": {},
    "uuid": "1908heering",
    "personalAgentUrl": "xmpp:1908heering@xmpp.ask-cs.com/cloud"
  }
];


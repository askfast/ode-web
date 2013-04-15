// TODO
// Language settings
var ui = {
    en: {
      meta: {
        name: 'en',
        label: 'English'
      },
      login: {
        header: "Please sign in",
        placeholder_username: "Please enter your username",
        placeholder_password: "Your password",
        label_rememberMe: "Remember Me",
        button_login: "Login",
        button_loggingIn: "Logging...",
        forgot_password: "forgot your password?",
        forgetPassword: "Forgot password",
        resetPassword: "Reset Password",
        returnLogin: "return back to login",
        changePassword: "change password",
        downloadApp: "Download Mobile App",
        ph_username: "username",
        ph_newPass: "new  password",
        ph_retypePass: "retype password",
        alert_fillfiled: 'Please fill all fields!',
        alert_wrongUserPass: 'Wrong username or password!',
        loading_User: 'Loading user information...',
        loading_Message: 'Loading messages...',
        loading_Group:'Loading groups...',
        loading_Members: 'Loading members...',
        loading_everything: 'Everything loaded!',
        logout: 'Logout',
        loading: 'Loading..',
      },
      dashboard: {
          thisWeek: 'This Week',
          welcome: 'Welcome',
          newMessage: 'New Messages',
          goToInbox: 'Go to inbox',
          loadingPie: 'Loading pie charts...'
      },
      planboard: {
        planboard: 'Planboard',
        newAvail: 'New Availability',
        day: 'Day',
        week: 'Week',
        month: 'Month',
        updateAvail: 'Update Availability',
        from: 'From',
        till: 'Till',
        state: 'State',
        selectAState: 'select a state',
        reoccuring: 'Re-occuring',
        lessPeople: 'There $v less people than needed!',
        samePeople: 'There are just as many peopleas needed.',
        morePeople: 'There are $v more people than needed!',
        wished: 'Wished' ,
        combine_reoccuring: 'This is a combined row of planning with re-occuring rows.',
        sendMsgToMember: 'Send Message To Members',
        add: 'Add',
        del: 'Delete',
        change: 'Change',
        setWish: 'Set Wish',
        timeline: 'Timeline',
        statistics: 'Statistics',
        barCharts: 'Bar charts',
        wishes: 'Wishes',
        legenda: 'Legenda',
        group: 'Group',
        groups: 'Groups',
        members: 'Members',
        bothAvailable: 'Both available',
        northAavailable: 'available North' ,
        southAvailable: 'available South',
        skipperOutService: 'Skipper Of Service',
        notAvailable: 'Not Available', // Niet Beschikbaar
        notachieve: 'Not Achieved',
        morePeople: 'More people',
        enoughPeople: 'Just enough people',
        lessPeople: 'Less people',
        lastSyncTime: 'Last sync time:',
        dataRangeStart: 'Data range start: ',
        DataRangeEnd: 'Data range end: ',
        loadingTimeline: 'Loading timeline...',
        addTimeSlot: 'Adding a timeslot...',
        slotAdded: 'New timeslot added successfully.',
        changingSlot: 'Changing a timeslot...',
        slotChanged: 'Timeslot changed successfully.',
        changingWish: 'Changing wish value...',
        wishChanged: 'Wish value changed successfully.',
        deletingTimeslot: 'Deleting a timeslot...',
        timeslotDeleted: 'Timeslot deleted successfully.',
        refreshTimeline: 'Refreshing timeline...',
        preCompilingStortageMessage: 'Pre-compiling shortage message',
        weeklyPlanning: 'Weekly planning',
        planning: 'Planning',
        minNumber: 'Minimum number benodigden'
      },
      message: {
        messages: 'Messages',
        composeAMessage: 'Compose a message',
        compose: 'Compose',
        inbox: 'Inbox',
        outbox: 'Outbox',
        trash: 'Trash',
        composeMessage: 'Compose message',
        close: 'Close',
        broadcast: 'Broadcast',
        sms: 'SMS',
        email: 'Email',
        receviers: 'Recevier(s)',
        // troubled
        // chooseRecept: 'Choose a Recipient',
        //
        subject: 'Subject',
        message: 'Message',
        sendMessage: 'Send Message',
        sender: 'Sender',
        date: 'Date',
        questionText: 'Message',
        reply: 'Reply',
        del: 'Delete',
        noMessage: 'There are no messages.',
        from: 'From',
        newMsg: 'New',
        deleteSelected: 'Delete Selected Messages',
        someMessage: 'There are $v message(s)',
        emptyTrash: 'Empty Trash',
        noMsgInTrash: 'There are no messages in trash.',
        box: 'Box',
        persons: 'Person(s)',
        restoreSelected: 'Restore Selected Messages',
        loadingMessage: 'Loading message...',
        escalation: 'Escalation message',
        escalationBody: function (diff,startDate,startTime,endDate,endTime)
        {
            return 'We have ' +
            diff +
            ' shortage in between ' +
            startDate + ' ' +
            startTime + ' and ' +
            endDate + ' ' +
            endTime + '. ' + 
            'Would you please make yourself available if you are available for that period?';
        },
        removed: 'Message removed successfully.',
        removing: 'Removing the message...',
        refreshing: 'Refreshing messages...',
        removingSelected: 'Removing selected messages...',
        restoring: 'Restoring the message back...',
        restored: 'Message restored successfully.',
        restoringSelected: 'Restoring selected messages...',
        emptying: 'Emptying trash...',
        emptied: 'Trash bin emptied successfully.',
        sending: 'Sending the message...',
        sent: 'Message sent.',
        typeSubject: 'Type a subject',
        messages: 'Messages',
        ph_filterMessage: 'Filter messages..',
        noReceivers: 'Please select a receiver.'
      },
      groups: {
        groups: 'Groups',
        newGroup: 'New Group',
        newMember: 'New Member',
        serach: 'Search',
        addNewGroup: 'Add New Group',
        editGroup: 'Edit Group',
        searchResults: 'Search results',
        group: 'Group',
        close: 'Close',
        name: 'Name',
        saveGroup: 'Save Group',
        registerMember: 'Register Member',
        role: 'Role',
        selectRole: 'Select a role',
        selectGroup: 'Choose a group',
        email: 'Email',
        phone: 'Phone',
        address: 'Address',
        postCode: 'Postcode',
        tel: 'Tel',
        city: 'City',
        userName: 'Username',
        password: 'Password',
        saveMember: 'Save Member',
        serachFor: 'Search results for ',
        sorryCanNotFind: 'Sorry but we couldn\'t find what you are looking for.',
        // troubled
        // selectGroup: '-- select a group --',
        //
        addToGroup: 'Add to group',
        addMemberToGroup: 'Add Selected Members To Groups',
        resultCount: 'There are $v results in your query.',
        deleteGroup: 'Delete Group',
        noMembers: 'There are no members.',
        removeSelectedMembers: 'Remove Selected Members',
        memberCount:  'There are $v member(s)',
        searchingMembers: 'Searching members..',
        addingNewMember: 'Adding a new member..',
        memberAdded: 'Member added to group successfully.',
        refreshingGroupMember: 'Refreshing groups and members list..',
        removingMember: 'Removing member from group..',
        memberRemoved: 'Member removed from group successfully.',
        removingSelected: 'Removing selected members..',
        saving: 'Saving group..',
        groupSaved: 'Group saved successfully.',
        registerNew: 'Registering a new member..',
        memberRegstered: 'Member registered successfully.',
        deleting: 'Deleting group..',
        deleted: 'Group deleted successfully.',
        filterMembers: 'Filter members..',
        searchfor: 'firstname, lastname..'
      }, 
      profile: {
        profile: 'Profile',
        edit: 'Edit',
        password: 'Password',
        timeline: 'Timeline',
        profileView: 'Profile View',
        userGroups: 'User Groups',
        role: 'Role',
        email: 'Email',
        phone: 'Phone',
        address: 'Address',
        postcode: 'Postcode',
        city: 'City',
        editProfile: 'Edit Profile',
        name: 'Name',
        saveProfile: 'Save Profile',
        passChange: 'Password Change',
        currentPass: 'Current password',
        newPass: 'New password',
        newPassRepeat: 'New password (Repeat)',
        changePass: 'Change password',
        newAvail: 'New Availability',
        saveProfile: 'Saving profile information..', 
        refreshing: 'Refreshing profile information..',
        dataChanged: 'Profile data is succesfully changed.',
        pleaseFill: 'Please fill all fields!',
        passNotMatch: 'Provided passwords do not match! Please try it again.',
        changingPass: 'Changing password..',
        passChanged: 'Password is succesfully changed.',
        passwrong: 'Given current password is wrong! Please try it again.',
        newTimeslotAdded: 'New timeslot added successfully.',
        changingTimeslot: 'Changing a timeslot..',
        timeslotChanged: 'Timeslot is succesfully changed.',
      },
      settings: {
        settings: 'Settings',
        user: 'User',
        application: 'Application',
        userSettings: 'User Settings',
        appSettings: 'Application Settings',
        saveSettings: 'Save Settings',
        langSetting: 'Language',
        saving: 'Saving settings...',
        refreshing: 'Refreshing settings...',
        saved: 'Settings successfully saved.'
      },
      help: {
        header: 'Help & Support',
        support: 'Support'
      },
      downloads: {
        app: 'Soon it will be downloadable.<br>',
        manual: 'Download Manual'
      }
    },
    nl: {
      meta: {
        name: 'nl',
        label: 'Nederlands'
      },
      login: {
        header: "Inloggen",
        placeholder_username: "Vul uw gebruikersnaam in",
        placeholder_password: "Vul uw wachtwoord in",
        label_rememberMe: "Onthoud mij",
        button_login: "Login",
        button_loggingIn: "Inloggen...",
        forgot_password: "Wachtwoord vergeten?",
        forgetPassword: "Wachtwoord vergeten",
        resetPassword: "Wachtwoord opnieuw instellen",
        returnLogin: "Terugkeren om in te loggen",
        changePassword: "Wachtwoord wijzigen",
        downloadApp: "Download Mobiele App",
        ph_username: "gebruikersnaam",
        ph_newPass: "nieuw wachtwoord",
        ph_retypePass: "Typ wachtwoord",
        alert_fillfiled: 'Vul alle velden in!',
        alert_wrongUserPass: 'Onjuiste gebruikersnaam of wachtwoord!',
        loading_User: 'Gebruikersinformatie laden...',
        loading_Message: 'Berichten laden...',
        loading_Group:'Groepen laden...',
        loading_Members: 'Leden laden...',
        loading_everything: 'Alles is geladen!',
        logout: 'Logout',
        loading: 'Loading..',
      },
      dashboard: {
        thisWeek: 'Deze week',
        welcome: 'Welkom',
        newMessage: 'Nieuwe berichten',
        goToInbox: 'Ga naar inbox',
        loadingPie: 'Cirkeldiagrammen laden...'
      },
      planboard : {
        planboard: 'Planboard',
        newAvail: 'Nieuwe beschikbaarheid',
        day: 'Dag',
        week: 'Week',
        month: 'Maand',
        updateAvail: 'Update beschikbaarheid',
        from: 'Van',
        till: 'Tot',
        state: 'Status',
        selectAState: 'selecteer een status',
        reoccuring: 'Herhaling',
        lessPeople: 'Er is een tekort van $v mens(en)!',
        samePeople: 'Er zijn precies genoeg mensen.',
        morePeople: 'Er is een overschot van $v mens(en)!',
        wished: 'Gewenst' ,
        combine_reoccuring: 'Dit is een gecombineerde planning.',
        sendMsgToMember: 'Stuur bericht naar leden',
        add: 'Toevoegen',
        del: 'Verwijderen',
        change: 'Wijzigen',
        setWish: 'Behoefte instellen',
        timeline: 'Tijdlijn',
        statistics: 'Statistieken',
        barCharts: 'Staafdiagrammen',
        wishes: 'Behoefte',
        legenda: 'Legenda',
        group: 'Groep',
        groups: 'Groepen',
        members: 'Leden',
        bothAvailable: 'Beiden beschikbaar',
        northAavailable: 'Beschikbaar Noord' ,
        southAvailable: 'Beschikbaar Zuid',
        skipperOutService: 'Schipper van dienst',
        notAvailable: 'Niet beschikbaar', 
        notachieve: 'Niet behaald',
        morePeople: 'Meer mensen',
        enoughPeople: 'Precies genoeg mensen',
        lessPeople: 'Te weinig mensen',
        lastSyncTime: 'Laatste synchronisatietijd:',
        dataRangeStart: 'Begin gegevensscala: ',
        DataRangeEnd: 'Eind gegevensscala: ',
        loadingTimeline: 'Tijdlijn laden...',
        addTimeSlot: 'Tijdslot toevoegen...',
        slotAdded: 'Tijdslot succesvol toegevoegd.',
        changingSlot: 'Tijdslot wijzigen...',
        slotChanged: 'Tijdslot succesvol gewijzigd.',
        changingWish: 'Behoefte veranderen...',
        wishChanged: 'Behoefte succesvol veranderd.',
        deletingTimeslot: 'Tijdslot verwijderen...',
        timeslotDeleted: 'Tijdslot succesvol verwijderd.',
        refreshTimeline: 'Tijdlijn vernieuwen...',
        preCompilingStortageMessage: 'Opstellen tekortbericht',
        weeklyPlanning: 'Wekelijkse planning',
        planning: 'Planning',
        minNumber: 'Minimum aantal benodigde mensen'
      },
      message: {
        messages: 'Berichten',
        composeAMessage: 'Bericht opstellen',
        compose: 'Opstellen',
        inbox: 'Inbox',
        outbox: 'Outbox',
        trash: 'Prullenbak',
        composeMessage: 'Bericht opstellen',
        close: 'Sluiten',
        broadcast: 'Extra medium',
        sms: 'SMS',
        email: 'Email',
        receviers: 'Ontvanger(s)',
        // troubled
        // chooseRecept: 'Ontvanger(s) selecteren',
        //
        subject: 'Onderwerp',
        message: 'Bericht',
        sendMessage: 'Bericht versturen',
        sender: 'Zender',
        date: 'Datum',
        questionText: 'Bericht',
        reply: 'Antwoorden',
        del: 'Verwijderen',
        noMessage: 'Er zijn geen berichten.',
        from: 'Van',
        newMsg: 'Nieuw',
        deleteSelected: 'Verwijder geselecteerde berichten',
        someMessage: 'Er zijn $v berichten',
        emptyTrash: 'Prullenbak legen',
        noMsgInTrash: 'Er zijn geen berichten.',
        box: 'Box',
        persons: 'Personen',
        restoreSelected: 'Geselecteerde berichten terugplaatsen',
        loadingMessage: 'Bericht laden...',
        escalation: 'Escalatiebericht',
        escalationBody: function(diff,startDate,startTime,endDate,endTime)
        {
            return 'Er is een tekort van ' +
            diff +
            ' mensen tussen ' +
            startDate + ' ' +
            startTime + ' en ' +
            endDate + ' ' +
            endTime + '. ' + 
            'Zet uzelf a.u.b. op beschikbaar indien u beschikbaar bent voor die periode';
        },
        removed: 'Bericht succesvol verwijderd.',
        removing: 'Bericht verwijderen...',
        refreshing: 'Bericht vernieuwen...',
        removingSelected: 'Geselecteerde berichten verwijderen...',
        restoring: 'Bericht terugplaatsen...',
        restored: 'Bericht succesvol teruggeplaatst.',
        restoringSelected: 'Geselecteerde berichten terugplaatsen...',
        emptying: 'Prullenbak leegmaken...',
        emptied: 'Prullenbak succesvol geleegd.',
        sending: 'Bericht versturen...',
        sent: 'Bericht verstuurd.',
        typeSubject: 'Vul een onderwerp in',
        messages: 'Berichten',
        ph_filterMessage: 'Berichten filteren...',
        noReceivers: 'Graag een ontvanger selecteren.'
      },
      groups: {
        groups: 'Groepen',
        newGroup: 'Nieuwe Group',
        newMember: 'Nieuw lid',
        serach: 'Zoeken',
        addNewGroup: 'Nieuwe groep toevoegen',
        editGroup: 'Groep wijzigen',
        searchResults: 'Zoekresultaten',
        group: 'Groep',
        close: 'Sluiten',
        name: 'Naam',
        saveGroup: 'Groep opslaan',
        registerMember: 'Lid registreren',
        role: 'Functie',
        selectRole: 'Selecteer een functie',
        // troubled
        // selectGroup: 'Selecteer een group',
        //
        email: 'Email',
        phone: 'Telefoon',
        address: 'Adres',
        postCode: 'Postcode',
        tel: 'Tel',
        city: 'Stad',
        userName: 'Gebruikersnaam',
        password: 'Wachtwoord',
        saveMember: 'Lid opslaan',
        serachFor: 'Zoekresultaten voor ',
        sorryCanNotFind: 'Sorry, geen resultaten.',
        addToGroup: 'Aan groep toevoegen',
        addMemberToGroup: 'Voeg geselecteerde leden aan groep toe',
        resultCount: 'Er zijn $v resultaten.',
        deleteGroup: 'Groep verwijderen',
        noMembers: 'Er zijn geen leden.',
        removeSelectedMembers: 'Geselecteerde leden verwijderen',
        memberCount:  'Er zijn $v leden',
        searchingMembers: 'Leden zoeken...',
        addingNewMember: 'Nieuw lid toevoegen...',
        memberAdded: 'Lid succesvol aan groep toegevoegd.',
        refreshingGroupMember: 'Groepen- en ledenlijst vernieuwen...',
        removingMember: 'Lid van groep verwijderen...',
        memberRemoved: 'Lid succesvol van groep verwijderd.',
        removingSelected: 'Geselecteerde leden verwijderen...',
        saving: 'Groep opslaan...',
        groupSaved: 'Groep succesvol opgeslagen.',
        registerNew: 'Nieuw lid registreren...',
        memberRegstered: 'Lid succesvol geregistreerd.',
        deleting: 'Groep verwijderen...',
        deleted: 'Groep succesvol verwijderd.',
        filterMembers: 'Leden filteren...',
        searchfor: 'voornaam, achternaam..'
      }, 
      profile: {
        profile: 'Profiel',
        edit: 'Wijzigen',
        password: 'Wachtwoord',
        timeline: 'Tijdlijn',
        profileView: 'Profiel weergave',
        userGroups: 'Gebruikersgroepen',
        role: 'Functie',
        email: 'Email',
        phone: 'Telefoon',
        address: 'Adres',
        postcode: 'Postcode',
        city: 'Stad',
        editProfile: 'Profiel wijzigen',
        name: 'Naam',
        saveProfile: 'Profiel opslaan',
        passChange: 'Wachtwoord wijzigen',
        currentPass: 'Huidig wachtwoord',
        newPass: 'Nieuw wachtwoord',
        newPassRepeat: 'Herhaal nieuw wachtwoord',
        changePass: 'Wachtwoord wijzigen',
        newAvail: 'Nieuwe beschikbaarheid',
        saveProfile: 'Profielinformatie opslaan...', 
        refreshing: 'Profielinformatie vernieuwen...',
        dataChanged: 'Profielgegevens succesvol gewijzigd.',
        pleaseFill: 'Vul a.u.b. alle velden in!',
        passNotMatch: 'Ingevoerd wachtwoord komt niet overeen. Probeer het opnieuw.',
        changingPass: 'Wachtwoord wijzigen...',
        passChanged: 'Wachtwoord succesvol gewijzigd.',
        passwrong: 'Ingevoerd wachtwoord is foutief! Probeer het opnieuw.',
        newTimeslotAdded: 'Nieuw tijdslot succesvol toegevoegd.',
        changingTimeslot: 'Tijdslot wijzigen...',
        timeslotChanged: 'Tijdslot succesvol gewijzigd.',
      },
      settings: {
        settings: 'Instellingen',
        user: 'Gebruiker',
        application: 'Applicatie',
        userSettings: 'Gebruikersinstellingen',
        appSettings: 'Applicatie-instellingen',
        saveSettings: 'Instellingen Opslaan',
        langSetting: 'Taal',
        saving: 'Instellingen wijzigen...',
        refreshing: 'Instellingen vernieuwen...',
        saved: 'Instellingen succesvol gewijzigd.'
      },
      help: {
        header: 'Hulp & Ondersteuning',
        support: 'Ondersteuning'
      },
      downloads: {
        app: 'Binnenkort te downloaden.',
        manual: 'Download Handleiding'
      }
    }
}
;'use strict';


/**
 * Declare app level module which depends on filters, and services
 */
angular.module('WebPaige', 
[
  '$strap.directives', 
  'ngResource',
  'WebPaige.Controllers',
  'WebPaige.Directives',
  'WebPaige.Filters',
  'WebPaige.Modals',
  'WebPaige.Services'
]);



/**
 * Fetch libraries with AMD (if they are not present) and save in localStorage
 * If a library is presnet it wont be fetched from server
 */
basket
  .require(
    { url: 'js/libs/chosen/chosen.jquery.min.js' },
    { url: 'js/libs/chaps/timeline/2.4.0/timeline.js' },
    { url: 'js/libs/bootstrap-datepicker/bootstrap-datepicker.js' },
    { url: 'js/libs/bootstrap-timepicker/bootstrap-timepicker.js' },
    { url: 'js/libs/daterangepicker/1.1.0/daterangepicker.js' },
    { url: 'js/libs/sugar/1.3.7/sugar.min.js' },
    { url: 'js/libs/raphael/2.1.0/raphael-min.js' }
  )
  .then(function () 
    {
      basket
        .require(
          { url: 'js/libs/g-raphael/0.5.1/g.raphael-min.js' },
          { url: 'js/libs/g-raphael/0.5.1/g.pie-min.js' }
        )
        .then(function ()
        { 
          // console.warn('basket parsed scripts..');
      });
    }
  );;'use strict';


/**
 * App configuration
 */
angular.module('WebPaige')
.value(
  '$config', 
  {
    'title':    'WebPaige',
    'version':  '2.0.2 (snapshot)',
    'lang':     'nl',

    // REMOVE
    'demo_users': false,

    'profile': {
      'meta':   profile.meta,
      'title':  profile.title,
      'logos': {
        'login':  'js/profiles/' + profile.meta + '/img/login_logo.png',
        'app':    ''
      },
      'background': 'js/profiles/' + profile.meta + '/img/login_bg.jpg', // jpg for smaller size,
      'p2000':      profile.p2000
    },

    'statesall': {
      'com.ask-cs.State.Available': 
      {
        'className':'state-available',
        'label':    'Beschikbaar',
        'color':    '#4f824f',
        'type':     'Beschikbaar'
      },
      'com.ask-cs.State.KNRM.BeschikbaarNoord': 
      {
        'className':'state-available-north',
        'label':    'Beschikbaar voor Noord',
        'color':    '#000',
        'type':     'Beschikbaar'
      },
      'com.ask-cs.State.KNRM.BeschikbaarZuid': 
      {
        'className':'state-available-south',
        'label':    'Beschikbaar voor Zuid',
        'color':    '#e08a0c',
        'type':     'Beschikbaar'
      },
      'com.ask-cs.State.Unavailable': 
      {
        'className':'state-unavailable',
        'label':    'Niet Beschikbaar',
        'color':    '#a93232',
        'type':     'Niet Beschikbaar'
      },
      'com.ask-cs.State.KNRM.SchipperVanDienst': 
      {
        'className':'state-schipper-service',
        'label':    'Schipper van Dienst',
        'color':    '#e0c100',
        'type':     'Beschikbaar'
      },
      'com.ask-cs.State.Unreached': 
      {
        'className':'state-unreached',
        'label':    'Niet Bereikt',
        'color':    '#65619b',
        'type':     'Niet Beschikbaar'
      }
    },

    'host': profile.host(),

    'formats': {
      'date':         'dd-MM-yyyy',
      'time':         'HH:mm',
      'datetime':     'dd-MM-yyyy HH:mm',
      'datetimefull': 'dd-MM-yyyy HH:mm'
    },

    'roles': profile.roles,

    'timeline': {
      'options': {
        'axisOnTop':        true,
        'width':            '100%',
        'height':           'auto',
        'selectable':       true,
        'editable':         true,
        'style':            'box',
        'groupsWidth':      '150px',
        'eventMarginAxis':  0,
        'showCustomTime':   true,
        'groupsChangeable': false,
        'showNavigation':   false,
        'intervalMin':      1000 * 60 * 60 * 1
      },
      'config': {
        'zoom':       '0.4',
        'bar':        false,
        'wishes':     false,
        'legenda':    {},
        'legendarer': false,
        'states':     {},
        'divisions':  profile.divisions,
        'densities': {
          'less':   '#a0a0a0',
          'even':   '#ba6a24',
          'one':    '#415e6b',
          'two':    '#3d5865',
          'three':  '#344c58',
          'four':   '#2f4550',
          'five':   '#2c424c',
          'six':    '#253943',
          'more':   '#486877'
        }
      }
    },

    'pie': {
      'colors': 
      [
        '#415e6b', 
        '#ba6a24', 
        '#a0a0a0'
      ]
    },

    'defaults': {
      'settingsWebPaige': {
        'user': {
          'language': 'nl'
        },
        'app': {
          'widgets': {
            'groups': {}
          }
        }
      }
    },

    'cookie': {
      'expiry': 30, 
      'path':   '/'
    },

    init: function ()
    {
      var _this = this;

      angular.forEach(profile.states, function (state, index)
      {
        _this.timeline.config.states[state] = _this.statesall[state];
      });
    }
  }
);;'use strict';


/**
 * Providers & Routes
 */
angular.module('WebPaige')
.config(
[
  '$locationProvider', '$routeProvider', '$httpProvider',
  function ($locationProvider, $routeProvider, $httpProvider) 
  {
    /**
     * Login router
     */
    $routeProvider
    .when('/login',
    {
      templateUrl: 'js/views/login.html',
      controller: 'login' 
    })

    /**
     * Logout router
     */
    .when('/logout',
    { 
      templateUrl: 'js/views/logout.html',
      controller: 'logout'
    })

    /**
     * Dashboard router
     */
    .when('/dashboard', 
    { 
      templateUrl: 'js/views/dashboard.html',
      controller: 'dashboard'
    })

    /**
     * Planboard router
     */
    .when('/planboard', 
    { 
      templateUrl: 'js/views/planboard.html',
      controller: 'planboard',
      resolve: {
        data: 
        [
          '$route', 'Slots', 'Storage', 'Dater',
          function ($route, Slots, Storage, Dater) 
          {
            var periods = Storage.local.periods(),
                current = Dater.current.week(),
                initial = periods.weeks[current],
                groups  = Storage.local.groups(),
                settings = Storage.local.settings();

            return  Slots.all({
                      groupId:  settings.app.group,
                      division: 'all',
                      stamps: {
                        start:  initial.first.timeStamp,
                        end:    initial.last.timeStamp
                      },
                      month: Dater.current.month(),
                      layouts: {
                        user:     true,
                        group:    true,
                        members:  false
                      }
                    });
          }
        ]
      }
    })

    /**
     * Messages router
     */
    .when('/messages', 
    { 
      templateUrl: 'js/views/messages.html',    
      controller: 'messages',   
      resolve: {
        data: [
          '$route', 'Messages',
          function ($route, Messages) 
          {
            return Messages.query();
          }
        ]
      }, 
      reloadOnSearch: false
    })

    /**
     * Groups router
     */
    .when('/groups',
    {
      templateUrl: 'js/views/groups.html',
      controller: 'groups',
      resolve: {
        data: [
          'Groups',
          function (Groups) 
          {
            return Groups.query();
          }
        ]
      },
      reloadOnSearch: false
    })

    /**
     * Profile (user specific) router
     */
    .when('/profile/:userId', 
    { 
      templateUrl: 'js/views/profile.html',
      controller: 'profile',
      resolve: {
        data: [
          '$rootScope', 'Profile', '$route', '$location', 'Dater',
          function ($rootScope, Profile, $route, $location, Dater) 
          {
            if ($route.current.params.userId != $rootScope.app.resources.uuid)
            {
              var periods = Dater.getPeriods(),
                  current = Dater.current.week(),
                  ranges  = {
                    start:  periods.weeks[current].first.timeStamp / 1000,
                    end:    periods.weeks[current].last.timeStamp / 1000,
                  };

              return Profile.getWithSlots($route.current.params.userId, false, ranges);
            }
            else
            {
              return Profile.get($route.current.params.userId, false);
            };
          }
        ]
      },
      reloadOnSearch: false
    })

    /**
     * Profile (user hiself) router
     */
    .when('/profile', 
    { 
      templateUrl: 'js/views/profile.html', 
      controller: 'profile',
      resolve: {
        data: [
          '$rootScope', '$route', '$location',
          function ($rootScope, $route, $location) 
          {
            if (!$route.current.params.userId || !$location.hash())
              $location.path('/profile/' + $rootScope.app.resources.uuid).hash('profile');
          }
        ]
      }
    })

    /**
     * Settings router
     */
    .when('/settings',
    { 
      templateUrl: 'js/views/settings.html',
      controller: 'settings',
      resolve: {
        data: [
          'Settings',
          function (Settings) 
          {
            return angular.fromJson(Settings.get());
          }
        ]
      }
    })

    /**
     * Help router
     */
    .when('/help',
    {
      templateUrl: 'js/views/help.html',
      controller: 'help'
    })

    /**
     * Router fallback
     */
    .otherwise({ 
      redirectTo: '/login' 
    });

    /**
     * Define interceptor
     */
    $httpProvider.responseInterceptors.push('Interceptor');
  }
]);;'use strict';


/**
 * Initial run functions
 */
angular.module('WebPaige')
.run(
[
  '$rootScope', '$location', '$timeout', 'Session', 'Dater', 'Storage', 'Messages', '$config', '$window',
  function ($rootScope, $location, $timeout, Session, Dater, Storage, Messages, $config, $window) 
  {
    /**
     * Pass config and init dynamic config values
     */
    $rootScope.config = $config;

    $rootScope.config.init();


    /**
     * TODO
     * Move these checks to jquery.browser
     * 
     * Pass Jquery browser data to angular
     */
    $rootScope.browser = $.browser;

    angular.extend($rootScope.browser, {
      screen: $window.screen
    });

    if ($rootScope.browser.ios)
    {
      angular.extend($rootScope.browser, {
        landscape:    Math.abs($window.orientation) == 90 ? true : false,
        portrait:     Math.abs($window.orientation) != 90 ? true : false
      });
    }
    else
    {
      angular.extend($rootScope.browser, {
        landscape:    Math.abs($window.orientation) != 90 ? true : false,
        portrait:     Math.abs($window.orientation) == 90 ? true : false
      });
    };

    $window.onresize = function () { $rootScope.browser.screen = $window.screen };

    $window.onorientationchange = function ()
    {
      $rootScope.$apply(function ()
      {
        if ($rootScope.browser.ios)
        {
          angular.extend($rootScope.browser, {
            landscape:    Math.abs($window.orientation) == 90 ? true : false,
            portrait:     Math.abs($window.orientation) != 90 ? true : false
          });
        }
        else
        {
          angular.extend($rootScope.browser, {
            landscape:    Math.abs($window.orientation) != 90 ? true : false,
            portrait:     Math.abs($window.orientation) == 90 ? true : false
          });
        };
      });
    };
    

    /**
     * Default language and change language
     */
    $rootScope.changeLanguage = function (lang) { $rootScope.ui = ui[lang] };
    
    $rootScope.ui = ui[$rootScope.config.lang];


    /**
     * If periods are not present calculate them
     */
    if (!Storage.get('periods')) Dater.registerPeriods();


    /**
     * Set important info back if refreshed
     */
    $rootScope.app = $rootScope.app || {};


    /**
     * Set up resources
     */
    $rootScope.app.resources = angular.fromJson(Storage.get('resources'));


    /**
     * Count unread messages
     */
    if (!$rootScope.app.unreadMessages) Messages.unreadCount();


    /**
     * Show action loading messages
     */
    $rootScope.statusBar = 
    {
      init: function ()
      {
        $rootScope.loading = {
          status: false,
          message: 'Loading..'
        };
      },

      display: function (message)
      {
        $rootScope.loading = {
          status:   true,
          message:  message
        };
      },

      off: function ()
      {
        $rootScope.loading.status = false;
      }
    };

    $rootScope.statusBar.init();


    /**
     * Show notifications
     */
    $rootScope.notifier = 
    {
      init: function (status, type, message)
      {
        if ($rootScope.browser.mobile && status == true)
        {
          $window.alert(message);
        }
        else
        {
          $rootScope.notification = {
            status: status,
            type: type,
            message: message
          };
        };
      },

      success: function (message, permanent)
      {
        this.init(true, 'alert-success', message);

        if (!permanent) this.destroy();
      },

      error: function (message, permanent)
      {
        this.init(true, 'alert-danger', message);

        if (!permanent) this.destroy();
      },

      destroy: function ()
      {
        setTimeout(function ()
        {
          $rootScope.notification.status = false;
        }, 5000);
      }
    };

    $rootScope.notifier.init(false, '', '');


    /**
     * Detect route change start
     */
    $rootScope.$on("$routeChangeStart", function (event, next, current)
    {
      if (!Session.check()) $location.path("/login");

      $rootScope.loadingBig = true;

      $rootScope.statusBar.display('Loading..');

      $('div[ng-view]').hide();
    });


    /**
     * Route change successfull
     */
    $rootScope.$on("$routeChangeSuccess", function (event, current, previous)
    {
      $rootScope.newLocation = $location.path();

      $rootScope.loadingBig = false;

      $rootScope.statusBar.off();

      $('div[ng-view]').show();
    });


    /**
     * TODO
     * A better way of dealing with this error!
     * 
     * Route change is failed!
     */
    $rootScope.$on("$routeChangeError", function (event, current, previous, rejection)
    {
      $rootScope.notifier.error(rejection);
    });


    /**
     * Fix styles
     */
    $rootScope.fixStyles = function () 
    {    
      // var tabHeight = $('.tabs-left .nav-tabs').height();

      // $.each($('.tab-content').children(), function () 
      // {
      //   var $parent = $(this),
      //       $this = $(this).attr('id'),
      //       contentHeight = $('.tabs-left .tab-content #' + $this).height();

      //   /**
      //    * TODO
      //    * 
      //    * Append left border fix
      //    */
      //   // $parent.append('<div class="left-border-fix"></div>');
      //   // console.log('parent ->', $parent);
      //   // $('#' + $this + ' .left-border-fix').css({
      //   //   height: contentHeight
      //   // });
      //   /**
      //    * Check if one is bigger than another
      //    */
        
      //   if (tabHeight > contentHeight)
      //   {
      //     // console.log('tab is taller than content ->', $this);
      //     $('.tabs-left .tab-content #' + $this).css({
      //       height: $('.tabs-left .nav-tabs').height() - 41
      //     });
      //   }
      //   else if (contentHeight > tabHeight)
      //   {
      //     // console.log('content is taller than tabs ->', $this);
      //     // $('.tabs-left .nav-tabs').css( { height: contentHeight } );
      //   };
      // });

      /**
       * Correct icon-font-library icons for mac and linux
       */
      if ($.os.mac || $.os.linux)
      {
        $('.nav-tabs-app li a span').css({
          paddingTop: '10px', 
          marginBottom: '0px'
        });
        // $('#loading').css({
        //   //marginTop: '-160px'
        //   display: 'none'
        // });
      };
    };

  }
]);


/**
 * Avoid `console` errors in browsers that lack a console
 */
(function ()
{
  var method,
      noop = function() {},
      methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
      ],
      length = methods.length,
      console = (window.console = window.console || {});

  while (length--)
  {
    method = methods[length];

    if (!console[method]) console[method] = noop;
  };
}());


/**
 * Detect IE version for blocking IE6 and IE7
 */
if ($.browser.msie)
{
  var ver = $.browser.version || $.browser.version[0];

  if (ver == '6.0' || ver == '7.0') window.location = 'browsers.html';
};


/**
 * Sticky timeline header
 */
// $('#mainTimeline .timeline-frame div:first div:first').css({'top': '0px'});'use strict';


angular.module('WebPaige.Modals', ['ngResource'])

/**
 * User
 */
.factory('User', 
[
	'$resource', '$config', '$q', '$location', 'Storage', '$rootScope', 
	function ($resource, $config, $q, $location, Storage, $rootScope) 
	{
	  var self = this;


	  var User = $resource();


	  var Login = $resource(
	    $config.host + '/login',
	    {
	    },
	    {
	      process: {
	        method: 'GET',
	        params: {uuid:'', pass:''}
	      }
	    }
	  );


	  var Logout = $resource(
	    $config.host + '/logout',
	    {
	    },
	    {
	      process: {
	        method: 'GET',
	        params: {}
	      }
	    }
	  );


	  var Resources = $resource(
	    $config.host + '/resources',
	    {
	    },
	    {
	      get: {
	        method: 'GET',
	        params: {}
	      }
	    }
	  );


	  var Reset = $resource(
	    $config.host + '/passwordReset',
	    {
	    },
	    {
	      password: {
	        method: 'GET',
	        params: {uuid: '', path:''}
	      }
	    }
	  );

	  // var changePassword = $resource($config.host+'/passwordReset', 
	  //   {uuid: uuid,
	  //    pass: newpass,
	  //    key: key});
	  
	  
	  /**
	   * TODO
	   * RE-FACTORY
	   * 
	   * User login
	   */
	  User.prototype.password = function (uuid)
	  {
	    var deferred = $q.defer();

	    Reset.password(
	      {
	        uuid: uuid.toLowerCase(),
	        path: $location.absUrl()
	      }, 
	      function (result)
	      {
	        if (angular.equals(result, []))
	        {
	          deferred.resolve("ok");
	        }
	        else
	        {
	          deferred.resolve(result);
	        };
	      },
	      function (error)
	      {
	        deferred.resolve(error);
	      }
	    );

	    return deferred.promise;
	  };


	  /**
	   * User login
	   */
	  User.prototype.login = function (uuid, pass) 
	  {    
	    var deferred = $q.defer();

	    Login.process({uuid: uuid, pass: pass}, 
	      function (result) 
	      {
	        if (angular.equals(result, [])) 
	        {
	          deferred.reject("Something went wrong with login!");
	        }
	        else 
	        {
	          deferred.resolve(result);
	        };
	      },
	      function (error)
	      {
	        deferred.resolve(error);
	      }
	    );

	    return deferred.promise;
	  };
	  

	  /**
	   * RE-FACTORY
	   * change user password
	   */
	  User.prototype.changePass = function (uuid, newpass, key)
	  {
	    var deferred = $q.defer();
	    
	    /**
	     * RE-FACTORY
	     */
	    changePassword.get(
	      function (result)
	      {
	        deferred.resolve(result);
	      },
	      function (error)
	      {
	        deferred.resolve(error);
	      }
	    );
	    
	    return deferred.promise;
	  }


	  /**
	   * User logout
	   */
	  User.prototype.logout = function () 
	  {    
	    var deferred = $q.defer();

	    Logout.process(null, 
	      function (result) 
	      {
	        deferred.resolve(result);
	      },
	      function (error)
	      {
	        deferred.resolve({error: error});
	      }
	    );

	    return deferred.promise;
	  };


	  /**
	   * Get user resources
	   */
	  User.prototype.resources = function () 
	  {    
	    var deferred = $q.defer();

	    Resources.get(null, 
	      function (result) 
	      {
	        if (angular.equals(result, [])) 
	        {
	          deferred.reject("User has no resources!");
	        }
	        else 
	        {
	          Storage.add('resources', angular.toJson(result));

	          deferred.resolve(result);
	        }
	      },
	      function (error)
	      {
	        deferred.resolve({error: error});
	      }
	    );

	    return deferred.promise;
	  };

	  return new User;
	}
])



/**
 * Dashboard modal
 */
.factory('Dashboard', 
[
	'$rootScope', '$resource', '$config', '$q', 'Storage', 'Slots', 'Dater', 'Announcer', 
	function ($rootScope, $resource, $config, $q, Storage, Slots, Dater, Announcer) 
	{
	  var Dashboard = $resource(
	    'http://knrm.myask.me/rpc/client/p2000.php',
	    {
	    },
	    {
	      p2000: {
	        method: 'GET',
	        params: {},
	        isArray: true
	      }
	    }
	  );


	  /**
	   * Get group aggs for pie charts
	   */
	  Dashboard.prototype.pies = function () 
	  {
	    var deferred  = $q.defer(),
	        groups    = angular.fromJson(Storage.get('groups')),
	        settings  = Storage.local.settings().app.widgets.groups,
	        list      = [],
	        now       = new Date.now().getTime(),
	        calls     = [];

	    if (settings.length == 0) console.warn('no settings');

	    angular.forEach(groups, function(group, index)
	    {
	      if (settings[group.uuid]) list.push({ id: group.uuid, name: group.name});
	    });

	    angular.forEach(list, function (group, index)
	    {
	      calls.push(Slots.pie({
	        id:     group.id,
	        name:   group.name
	      }));
	    });

	    $q.all(calls)
	    .then(function (results)
	    {
	      $rootScope.statusBar.off();

	      deferred.resolve(results);
	    });

	    return deferred.promise;
	  };


	  /**
	   * Get p2000 announcements
	   */
	  Dashboard.prototype.p2000 = function () 
	  {
	    var deferred = $q.defer();

	    // Dashboard.p2000(null, 
	    //    function (result) 
	    //    {
	    //      deferred.resolve(result);

	    //      console.log('result ->', result);
	    //    },
	    //    function (error)
	    //    {
	    //      deferred.resolve({error: error});
	    //    }
	    //  );

	    $.ajax({
	      url: $config.profile.p2000.url,
	      dataType: 'jsonp',
	      success: function (results)
	      {
	        deferred.resolve( Announcer.process(results) );
	      },
	      error: function ()
	      {
	        deferred.resolve({error: error});
	      }
	    });

	    return deferred.promise;
	  };


	  return new Dashboard;
	}
])



/**
 * Slots
 */
.factory('Slots', 
[
	'$rootScope', '$config', '$resource', '$q', 'Storage', 'Dater', 'Sloter', 'Stats',
	function ($rootScope, $config, $resource, $q, Storage, Dater, Sloter, Stats) 
	{
	  /**
	   * Define Slot Resource from back-end
	   */
	  var Slots = $resource(
	    $config.host + '/askatars/:user/slots',
	    {
	      user: ''
	    },
	    {
	      query: {
	        method: 'GET',
	        params: {start:'', end:''},
	        isArray: true
	      },
	      change: {
	        method: 'PUT',
	        params: {start:'', end:'', text:'', recursive:''}        
	      },
	      save: {
	        method: 'POST',
	        params: {}
	      },
	      remove: {
	        method: 'DELETE',
	        params: {}
	      }
	    }
	  );


	  /**
	   * Group aggs resource
	   */
	  var Aggs = $resource(
	    $config.host + '/calc_planning/:id',
	    {
	    },
	    {
	      query: {
	        method: 'GET',
	        params: {id: '', start:'', end:''},
	        isArray: true
	      }
	    }
	  );


	  /**
	   * Wishes resource
	   */
	  var Wishes = $resource(
	    $config.host + '/network/:id/wish',
	    {
	    },
	    {
	      query: {
	        method: 'GET',
	        params: {id: '', start:'', end:''},
	        isArray: true
	      },
	      save: {
	        method: 'PUT',
	        params: {id: ''}
	      },
	    }
	  );


	  /**
	   * Get group wishes
	   */
	  Slots.prototype.wishes = function (options) 
	  {
	    var deferred  = $q.defer(),
	        params    = {
	          id:     options.id,
	          start:  options.start,
	          end:    options.end
	        };

	    Wishes.query(params, 
	      function (result) 
	      {
	        deferred.resolve(result);
	      },
	      function (error)
	      {
	        deferred.resolve({error: error});
	      }
	    );

	    return deferred.promise;
	  };


	  /**
	   * Set group wish
	   */
	  Slots.prototype.setWish = function (options) 
	  {
	    var deferred = $q.defer(),
	        params = {
	          start:      options.start,
	          end:        options.end,
	          wish:       options.wish,
	          recurring:  options.recursive
	        };

	    Wishes.save({id: options.id}, params, 
	      function (result) 
	      {
	        deferred.resolve(result);
	      },
	      function (error)
	      {
	        deferred.resolve({error: error});
	      }
	    );

	    return deferred.promise;
	  };


	  /**
	   * Get group aggs
	   */
	  Slots.prototype.aggs = function (options) 
	  {
	    var deferred = $q.defer(),
	        params = {
	          id:     options.id,
	          start:  options.start,
	          end:    options.end
	        };

	    if (options.division != undefined) params.stateGroup = options.division;

	    Aggs.query(params, 
	      function (result) 
	      {
	        var stats = Stats.aggs(result);

	        Slots.prototype.wishes(params)
	        .then(function (wishes)
	        {
	          deferred.resolve({
	            id:       options.id,
	            division: options.division,
	            wishes:   wishes,
	            data:     result,
	            ratios:   stats.ratios,
	            durations: stats.durations
	          });
	        });
	      },
	      function (error)
	      {
	        deferred.resolve({error: error});
	      }
	    );

	    return deferred.promise;
	  };


	  /**
	   * Get group aggs for pie charts
	   */
	  Slots.prototype.pie = function (options) 
	  {
	    var deferred  = $q.defer(),
	        now       = Math.floor(Date.now().getTime() / 1000),
	        periods   = Dater.getPeriods(),
	        current   = Dater.current.week(),
	        weeks      = {
	          current:  {
	            period: periods.weeks[current],
	            data:   [],
	            shortages: []
	          },
	          next: {
	            period: periods.weeks[current + 1],
	            data:   [],
	            shortages: []
	          }
	        },
	        slicer    = weeks.current.period.last.timeStamp;

	    Aggs.query({
	      id:     options.id,
	      start:  weeks.current.period.first.timeStamp / 1000,
	      end:    weeks.next.period.last.timeStamp / 1000
	    }, 
	      function (results)
	      {
	        var state;

	        // Check whether it is only one
	        if (results.length > 1)
	        {
	          angular.forEach(results, function (slot, index)
	          {
	            // Fish out the current
	            if (now >= slot.start && now <= slot.end) state = slot;

	            // Slice from end of first week
	            if (slicer <= slot.start * 1000)
	            {
	              weeks.next.data.push(slot);
	            }
	            else if (slicer >= slot.start * 1000)
	            {
	              weeks.current.data.push(slot)
	            };
	          });

	          // slice extra timestamp from the last of current week dataset and add that to week next
	          var last        = weeks.current.data[weeks.current.data.length-1],
	              next        = weeks.next.data[0],
	              difference  = (last.end * 1000 - slicer) / 1000,
	              currents    = [];

	          // if start of current of is before the start reset it to start
	          weeks.current.data[0].start = weeks.current.period.first.timeStamp / 1000;

	          // if there is a leak to next week adjust the last one of current week and add new slot to next week with same values
	          if (difference > 0)
	          {
	            last.end = slicer / 1000;

	            weeks.next.data.unshift({
	              diff: last.diff,
	              start: slicer / 1000,
	              end: last.end,
	              wish: last.wish
	            });
	          };

	          // shortages and back-end gives more than asked sometimes, with returning values out of the range which being asked !
	          angular.forEach(weeks.current.data, function (slot, index)
	          {
	            if (slot.end - slot.start > 0) currents.push(slot);

	            // add to shortages
	            if (slot.diff < 0) weeks.current.shortages.push(slot);
	          });

	          // reset to start of current weekly begin to week begin
	          currents[0].start = weeks.current.period.first.timeStamp / 1000;

	          // add to shortages
	          angular.forEach(weeks.next.data, function (slot, index)
	          {
	            if (slot.diff < 0) weeks.next.shortages.push(slot);
	          });

	          deferred.resolve({
	            id:       options.id,
	            name:     options.name,
	            weeks:    {
	              current: {
	                data:   currents,
	                state:  state,
	                shortages: weeks.current.shortages,
	                start: {
	                  date:       new Date(weeks.current.period.first.timeStamp).toString($config.formats.date),
	                  timeStamp:  weeks.current.period.first.timeStamp
	                },
	                end: {
	                  date:       new Date(weeks.current.period.last.timeStamp).toString($config.formats.date),
	                  timeStamp:  weeks.current.period.last.timeStamp
	                },
	                ratios: Stats.pies(currents)
	              },
	              next: {
	                data:   weeks.next.data,
	                shortages: weeks.next.shortages,
	                start: {
	                  date:       new Date(weeks.next.period.first.timeStamp).toString($config.formats.date),
	                  timeStamp:  weeks.next.period.first.timeStamp
	                },
	                end: {
	                  date:       new Date(weeks.next.period.last.timeStamp).toString($config.formats.date),
	                  timeStamp:  weeks.next.period.last.timeStamp
	                },
	                ratios: Stats.pies(weeks.next.data)
	              }
	            }
	          }); 
	        }
	        else
	        {
	          if (results[0].diff == null) results[0].diff = 0;
	          if (results[0].wish == null) results[0].wish = 0;

	          var currentWeek = [{
	                start:  weeks.current.period.first.timeStamp / 1000,
	                end:    weeks.current.period.last.timeStamp / 1000,
	                wish:   results[0].wish,
	                diff:   results[0].diff
	              }],
	              nextWeek = [{
	                start:  weeks.next.period.first.timeStamp / 1000,
	                end:    weeks.next.period.last.timeStamp / 1000,
	                wish:   results[0].wish,
	                diff:   results[0].diff
	              }];
	          
	          if (currentWeek[0].diff < 0) weeks.current.shortages.push(currentWeek[0]);
	          if (nextWeek[0].diff < 0) weeks.next.shortages.push(nextWeek[0]);

	          deferred.resolve({
	            id:       options.id,
	            name:     options.name,
	            weeks:    {
	              current: {
	                data: currentWeek,
	                state: currentWeek,
	                shortages: weeks.current.shortages,
	                start: {
	                  date:       new Date(weeks.current.period.first.timeStamp).toString($config.formats.date),
	                  timeStamp:  weeks.current.period.first.timeStamp
	                },
	                end: {
	                  date:       new Date(weeks.current.period.last.timeStamp).toString($config.formats.date),
	                  timeStamp:  weeks.current.period.last.timeStamp
	                },
	                ratios: Stats.pies(currentWeek)
	              },
	              next: {
	                data: nextWeek,
	                shortages: weeks.next.shortages,
	                start: {
	                  date:       new Date(weeks.next.period.first.timeStamp).toString($config.formats.date),
	                  timeStamp:  weeks.next.period.first.timeStamp
	                },
	                end: {
	                  date:       new Date(weeks.next.period.last.timeStamp).toString($config.formats.date),
	                  timeStamp:  weeks.next.period.last.timeStamp
	                },
	                ratios: Stats.pies(nextWeek)
	              }
	            }
	          });
	        };          
	      },
	      function (error)
	      {
	        deferred.resolve({error: error});
	      }
	    );

	    return deferred.promise;
	  };


	  /**
	   * Get slot bundels; user, group aggs and members
	   */
	  Slots.prototype.all = function (options) 
	  {
	    /**
	     * Define vars
	     */
	    var deferred  = $q.defer(),
	        periods   = Dater.getPeriods(),
	        params    = {
	          user:   angular.fromJson(Storage.get('resources')).uuid, // user hardcoded!!
	          start:  options.stamps.start / 1000,
	          end:    options.stamps.end / 1000
	        },
	        data      = {};
	    
	    Slots.query(params, 
	      function (user) 
	      {
	        if (options.layouts.group)
	        {
	          var groupParams = {
	              id:     options.groupId,
	              start:  params.start,
	              end:    params.end,
	              month:  options.month
	          };

	          if (options.division != 'all') groupParams.division = options.division;

	          Slots.prototype.aggs(groupParams)
	          .then(function (aggs)
	          {
	            if (options.layouts.members)
	            {
	              var members = angular.fromJson(Storage.get(options.groupId)),
	                  calls   = [];

	              angular.forEach(members, function(member, index)
	              {
	                calls.push(Slots.prototype.user({
	                  user: member.uuid,
	                  start:params.start,
	                  end:  params.end,
	                  type: 'both'
	                }));
	              });

	              $q.all(calls)
	              .then(function (members)
	              {
	                deferred.resolve({
	                  user:     user,
	                  groupId:  options.groupId,
	                  aggs:     aggs,
	                  members:  members,
	                  synced:   new Date().getTime(),
	                  periods: {
	                    start:  options.stamps.start,
	                    end:    options.stamps.end
	                  }
	                });
	              });
	            }
	            else
	            {
	              deferred.resolve({
	                user:     user,
	                groupId:  options.groupId,
	                aggs:     aggs,
	                synced:   new Date().getTime(),
	                periods: {
	                  start:  options.stamps.start,
	                  end:    options.stamps.end
	                }
	              });
	            };
	          });
	        }
	        else
	        {
	          deferred.resolve({
	            user:   user,
	            synced: new Date().getTime(),
	            periods: {
	              start:  options.stamps.start,
	              end:    options.stamps.end
	            }
	          });
	        };
	      },
	      function (error)
	      {
	        deferred.resolve({error: error});
	      }
	    );

	    return deferred.promise;
	  };


	  /**
	   * Fetch user slots
	   * This is needed as a seperate promise object
	   * for making the process wait in Slots.all call bundle
	   */
	  Slots.prototype.user = function (params) 
	  {
	    var deferred = $q.defer();

	    Slots.query(params, 
	      function (result) 
	      {
	        deferred.resolve({
	          id:     params.user,
	          data:   result,
	          stats:  Stats.member(result)
	        });
	      },
	      function (error)
	      {
	        deferred.resolve({error: error});
	      }
	    );

	    return deferred.promise;
	  };


	  /**
	   * Return local slots
	   */
	  Slots.prototype.local = function () { return angular.fromJson(Storage.get('slots')); };


	  /**
	   * Slot adding process
	   */
	  Slots.prototype.add = function (slot, user) 
	  {
	    var deferred = $q.defer();

	    Slots.save({user: user}, slot,
	      function (result) 
	      {
	        deferred.resolve(result);
	      },
	      function (error)
	      {
	        deferred.resolve({error: error});
	      }
	    );

	    return deferred.promise;
	  };


	  /**
	   * TODO
	   * Add back-end
	   *
	   * Check whether slot is being replaced on top of an another
	   * slot of same sort. If so combine them silently and show them as
	   * one slot but keep aligned with back-end, like two or more slots 
	   * in real.
	   * 
	   * Slot changing process
	   */
	  Slots.prototype.change = function (original, changed, user) 
	  {
	    var deferred = $q.defer();

	    Slots.change(angular.extend(naturalize(changed), {user: user}), naturalize(original), 
	      function (result) 
	      {
	        deferred.resolve(result);
	      },
	      function (error)
	      {
	        deferred.resolve({error: error});
	      }
	    );

	    return deferred.promise;
	  };


	  /**
	   * Slot delete process
	   */
	  Slots.prototype.remove = function (slot, user) 
	  {
	    var deferred = $q.defer();

	    Slots.remove(angular.extend(naturalize(slot), {user: user}), 
	      function (result) 
	      {
	        deferred.resolve(result);
	      },
	      function (error)
	      {
	        deferred.resolve({error: error});
	      }
	    );

	    return deferred.promise;
	  };
	  

	  /**
	   * Naturalize Slot for back-end injection
	   */
	  function naturalize (slot)
	  {
	    var content = angular.fromJson(slot.content);

	    return {
	      start:      new Date(slot.start).getTime() / 1000,
	      end:        new Date(slot.end).getTime() / 1000,
	      recursive:  content.recursive,
	      text:       content.state,
	      id:         content.id
	    }
	  };


	  /**
	   * Check whether slot extends from saturday to sunday and if recursive?
	   * 
	   * Produce timestamps for sunday 00:00 am through the year and
	   * check whether intended to change recursive slot has one of those
	   * timestamps, if so slice slot based on midnight and present as two
	   * slots in timeline.
	   */
	  // function checkForSatSun (slot) { };


	  /**
	   * Check for overlaping slots exists?
	   * 
	   * Prevent any overlaping slots by adding new slots or changing
	   * the current ones in front-end so back-end is almost always aligned with
	   * front-end.
	   */
	  // function preventOverlaps (slot) { };


	  /**
	   * Slice a slot from a give point
	   */
	  // function slice (slot, point) { };


	  /**
	   * Combine two slots
	   */
	  // function combine (slots) { };


	  return new Slots;
	}
])



/**
 * Messages model
 */
.factory('Messages', 
[
	'$rootScope', '$config', '$resource', '$q', 'Storage',
	function ($rootScope, $config, $resource, $q, Storage) 
	{
	  var Messages = $resource(
	    $config.host + '/question/:action',
	    {
	    },
	    {
	      query: {
	        method: 'GET',
	        params: {action: '', 0: 'dm'},
	        isArray: true
	      },
	      get: {
	        method: 'GET',
	        params: {}
	      },
	      send: {
	        method: 'POST',
	        params: {action: 'sendDirectMessage'}
	      },
	      save: {
	        method: 'POST',
	        params: {}
	      },
	      changeState: {
	        method: 'POST',
	        params: {action: 'changeState'}
	      },
	      remove : {
	        method: 'POST',
	        params: {action: 'deleteQuestions'}
	      }
	    }
	  );
	  

	  /**
	   * Query messages from back-end
	   */
	  Messages.prototype.query = function () 
	  {
	    var deferred = $q.defer();

	    Messages.query(
	      function (result) 
	      {
	        Storage.add('messages', angular.toJson(result));

	        Messages.prototype.unreadCount();

	        deferred.resolve(Messages.prototype.filter(result));
	      },
	      function (error)
	      {
	        deferred.resolve({error: error});
	      }
	    );

	    return deferred.promise;
	  };


	  /**
	   * TODO
	   * Extract this to a data processer
	   * 
	   * Filter messages based on box
	   */
	  Messages.prototype.filter = function (messages)
	  {
	    var filtered = {
	      inbox: [],
	      outbox: [],
	      trash: []
	    };

	    angular.forEach(messages, function (message, index)
	    {
	      if (message.subject == '') message.subject = '-No Subject-';

	      if (message.box == 'inbox' &&
	          message.state != 'TRASH')
	      {
	        filtered.inbox.push(message);
	      }
	      else if ( message.box == 'outbox' && 
	                message.state != 'TRASH')
	      {
	        filtered.outbox.push(message);
	      }
	      else if ( (message.box == 'inbox' || message.box == 'outbox') &&
	                message.state == 'TRASH')
	      {
	        filtered.trash.push(message);
	      };
	    });

	    return filtered;
	  };


	  /**
	   * Serve messages from localStorage
	   */
	  Messages.prototype.local = function () { return angular.fromJson(Storage.get('messages')) };


	  /**
	   * Find a message in cache
	   */
	  Messages.prototype.find = function (id)
	  {
	    var gem;

	    angular.forEach(Messages.prototype.local(), function (message, index)
	    {
	      if (message.uuid == id) gem = message;
	    });

	    return gem;
	  };


	  /**
	   * Serve receivers list
	   */
	  Messages.prototype.receviers = function ()
	  {
	    var members   = angular.fromJson(Storage.get('members')),
	        groups    = angular.fromJson(Storage.get('groups')),
	        receivers = [];

	    angular.forEach(members, function(member, index)
	    {
	        receivers.push({
	        id: member.uuid,
	        name: member.name,
	        group: 'Users'
	      });
	    });

	    angular.forEach(groups, function(group, index)
	    {
	        receivers.push({
	        id: group.uuid,
	        name: group.name,
	        group: 'Groups'
	      });
	    });

	    return receivers;
	  };


	  /**
	   * Send a message
	   */
	  Messages.prototype.send = function (message, broadcast) 
	  {
	    var deferred = $q.defer(),
	        members = [],
	        types = [];

	    angular.forEach(message.receivers, function (receiver, index)
	    {
	      members.push(receiver.id);
	    });

	    types.push('paige');

	    if (broadcast.sms) types.push('sms');

	    if (broadcast.email) types.push('email');

	    var message = {
	      members: members,
	      content: message.body,
	      subject: message.subject,
	      types: types
	    };

	    Messages.send(null, message, 
	      function (result) 
	      {
	        var returned = '';

	        angular.forEach(result, function (chr, i)
	        {
	          returned += chr;
	        });

	        deferred.resolve(returned);
	      },
	      function (error)
	      {
	        deferred.resolve({error: error});
	      }
	    );

	    return deferred.promise;
	  };


	  /**
	   * Get unread messages
	   */
	  Messages.prototype.unread = function ()
	  {
	    var messages = Messages.prototype.local(),
	        unread = [];

	    angular.forEach(messages, function (message, index)
	    {
	      if (message.box == 'inbox' && message.state == 'NEW') unread.push(message);
	    });

	    return unread;
	  };


	  /**
	   * Count unread messages
	   */
	  Messages.prototype.unreadCount = function ()
	  {
	    var messages = Messages.prototype.local(),
	        counter = 0;

	    angular.forEach(messages, function (message, index)
	    {
	      if (message.box == 'inbox' && message.state == 'NEW') counter++;
	    });

	    $rootScope.app.unreadMessages = counter;
	  };


	  /**
	   * Change message state
	   */
	  Messages.prototype.changeState = function (ids, state)
	  {
	    var deferred = $q.defer();

	    Messages.changeState(null, 
	      {
	        ids: ids, 
	        state: state 
	      }, 
	      function (result) 
	      {
	        deferred.resolve(result);
	      },
	      function (error)
	      {
	        deferred.resolve({error: error});
	      }
	    );

	    /**
	     * Change message state locally as well
	     * if it is READ
	     */
	    if (state == 'READ')
	    {
	      var messages = angular.fromJson(Storage.get('messages')),
	          converted = [];

	      angular.forEach(messages, function (message, index)
	      {
	        angular.forEach(ids, function (id, i)
	        {
	          if (message.uuid == id) message.state = 'READ';
	        });

	        converted.push(message);
	      });

	      Storage.remove('messages');

	      Storage.add(angular.toJson('messages', converted));

	      Messages.prototype.unreadCount();
	    };

	    return deferred.promise;
	  };



	  /**
	   * Delete message(s)
	   */
	  Messages.prototype.remove = function (id)
	  {
	    var deferred = $q.defer();

	    Messages.prototype.changeState(id, 'TRASH')
	    .then(function (result) 
	    {
	      deferred.resolve(result);
	    });

	    return deferred.promise;
	  };



	  /**
	   * Restore message(s)
	   */
	  Messages.prototype.restore = function (id)
	  {
	    var deferred = $q.defer();

	    Messages.prototype.changeState(id, 'SEEN')
	    .then(function (result) 
	    {
	      deferred.resolve(result);
	    });

	    return deferred.promise;
	  };


	  /**
	   * Delete forever
	   */
	  Messages.prototype.emptyTrash = function (ids)
	  {
	    var deferred = $q.defer(),
	        messages = Messages.prototype.local(),
	        bulk = [];

	    angular.forEach(messages, function(message, index)
	    {
	      if ((message.box == 'inbox' || message.box == 'outbox') && message.state == 'TRASH') bulk.push(message.uuid);
	    });

	    Messages.remove(null,
	      { 
	        members: bulk 
	      }, 
	      function (result) 
	      {
	        deferred.resolve(result);
	      },
	      function (error)
	      {
	        deferred.resolve({error: error});
	      }
	    );

	    return deferred.promise;
	  };


	  return new Messages;
	}
])


/**
 * Groups modal
 */
.factory('Groups', 
[
	'$resource', '$config', '$q', 'Storage', '$rootScope', 'Slots',
	function ($resource, $config, $q, Storage, $rootScope, Slots) 
	{
	  var Groups = $resource(
	    $config.host + '/network/:action/:id',
	    {
	    },
	    {
	      query: {
	        method: 'GET',
	        params: {},
	        isArray: true
	      },
	      get: {
	        method: 'GET',
	        params: {id:''}
	      },
	      save: {
	        method: 'POST',
	        params: {id:''}
	      },
	      edit: {
	        method: 'PUT',
	        params: {id:''}
	      },
	      remove: {
	        method: 'DELETE',
	        params: {id:''}
	      },
	      search: {
	        method: 'POST',
	        params: {id:'', action:'searchPaigeUser'},
	        isArray: true
	      }
	    }
	  );


	  var Containers = $resource(
	    $config.host + '/node/:id/container',
	    {
	    },
	    {
	      get: {
	        method: 'GET',
	        params: {id:''},
	        isArray: true
	      }
	    }
	  );


	  var Parents = $resource(
	    $config.host + '/parent',
	    {
	    },
	    {
	      get: {
	        method: 'GET',
	        params: {},
	        isArray: true
	      }
	    }
	  );


	  var Members = $resource(
	    $config.host + '/network/:id/members/:mid',
	    {
	    },
	    {
	      query: {
	        method: 'GET',
	        params: {id:'', fields: '[role, latlong, latlong_final, settingsWebPaige]'},
	        isArray: true
	      },
	      get: {
	        method: 'GET',
	        params: {id:''}
	      },
	      save: {
	        method: 'POST',
	        params: {}
	      },
	      add: {
	        method: 'POST',
	        params: {id:'', mid:''} 
	      },
	      remove: {
	        method: 'DELETE',
	        params: {id:'', mid:''} 
	      }
	    }
	  );


	  /**
	   * Get parent group data
	   */
	  Groups.prototype.parents = function (all) 
	  {   
	    var deferred = $q.defer();

	    Parents.get(
	      null, 
	      function (result) 
	      {
	        if (!all)
	        {
	          // console.warn('returned ===>', result.length);

	          if (result.length == 0)
	          {
	            deferred.resolve(null);
	          }
	          else
	          {
	            deferred.resolve(result[0].uuid);
	          }
	        }
	        else
	        {
	          deferred.resolve(result);
	        }
	      },
	      function (error)
	      {
	        deferred.resolve({error: error});
	      }
	    );

	    return deferred.promise;
	  };


	  /**
	   * TODO
	   * Extract only the groups which are in the local list
	   * 
	   * Get container (parent) group data
	   */
	  Groups.prototype.containers = function (id) 
	  {   
	    var deferred  = $q.defer(),
	        cons      = [];

	    Containers.get(
	      {id: id}, 
	      function (result) 
	      {
	        /**
	         * Group save call returns only uuid and that is parsed as json
	         * by angular, this is a fix for converting returned object to plain string
	         */
	        angular.forEach(result, function (_r, _i)
	        {
	          var returned = [];

	          angular.forEach(_r, function (chr, i) { returned += chr });

	          cons.push(returned);
	        });
	        
	        deferred.resolve(cons);
	      },
	      function (error)
	      {
	        deferred.resolve({error: error});
	      }
	    );

	    return deferred.promise;
	  };


	  /**
	   * Add Member to a group
	   */
	  Groups.prototype.addMember = function (candidate)
	  {
	    var deferred = $q.defer();

	    Members.add(
	      { 
	        id: candidate.group.uuid, 
	        mid: candidate.id 
	      }, 
	      {}, 
	      function (result) 
	      {
	        deferred.resolve(result);
	      },
	      function (error)
	      {
	        deferred.resolve({error: error});
	      }
	    );

	    return deferred.promise;    
	  };


	  /**
	   * Remove member from group
	   */
	  Groups.prototype.removeMember = function (memberId, groupId)
	  {
	    var deferred = $q.defer();

	    Members.remove(
	      { 
	        id: groupId, 
	        mid: memberId 
	      }, 
	      function (result) 
	      {
	        deferred.resolve(result);
	      },
	      function (error)
	      {
	        deferred.resolve({error: error});
	      }
	    );

	    return deferred.promise;    
	  };


	  /**
	   * Remove members from a group (bulk action)
	   */
	  Groups.prototype.removeMembers = function (selection, group)
	  {
	    var deferred = $q.defer(),
	        calls = [];

	    angular.forEach(selection, function (value, id)
	    {
	      if (id) calls.push(Groups.prototype.removeMember(id, group.uuid));
	    });

	    $q.all(calls)
	    .then(function (result)
	    {
	      deferred.resolve(result);
	    });

	    return deferred.promise; 
	  };


	  Groups.prototype.wish = function (id)
	  {
	    var deferred  = $q.defer(),
	        count     = 0;

	    Slots.wishes({
	      id: id,
	      start:  255600,
	      end:    860400
	    }).then(function (results)
	    {
	      angular.forEach(results, function (slot, index)
	      {
	        if (slot.start == 255600 && slot.end == 860400 && slot.count != null) count = slot.count;
	      });

	      deferred.resolve({
	        count: count
	      });
	    });

	    return deferred.promise; 
	  }


	  /**
	   * General query function from groups and their members
	   */
	  Groups.prototype.query = function (only)
	  {
	    var deferred = $q.defer();

	    Groups.query(
	      function (groups) 
	      {
	        Storage.add('groups', angular.toJson(groups));

	        if (!only)
	        {
	          var calls = [];

	          angular.forEach(groups, function (group, index)
	          {
	            calls.push(Groups.prototype.get(group.uuid));
	          });

	          $q.all(calls)
	          .then(function (results)
	          {
	            Groups.prototype.uniqueMembers();

	            var data = {};

	            data.members = {};

	            angular.forEach(groups, function (group, gindex)
	            {
	              data.groups = groups;

	              data.members[group.uuid] = [];

	              angular.forEach(results, function (result, mindex)
	              {
	                if (result.id == group.uuid) data.members[group.uuid] = result.data;
	              });
	            });

	            deferred.resolve(data);
	          });
	        }
	        else
	        {
	          deferred.resolve(groups);
	        };
	      },
	      function (error)
	      {
	        deferred.resolve({error: error});
	      }
	    );

	    return deferred.promise;
	  };


	  /**
	   * Get group data
	   */
	  Groups.prototype.get = function (id) 
	  {   
	    var deferred = $q.defer();

	    Members.query(
	      {id: id}, 
	      function (result) 
	      {
	        /**
	         * DIRTY CHECK!
	         * 
	         * Check for 'null' return from back-end
	         * if group is empty
	         */
	        var returned;

	        if (result.length == 4 && 
	            result[0][0] == 'n' && 
	            result[1][0] == 'u')
	        {
	          returned = [];
	        }
	        else
	        {
	          returned = result;
	        };

	        Storage.add(id, angular.toJson(returned));

	        deferred.resolve({
	          id: id,
	          data: returned
	        });
	      },
	      function (error)
	      {
	        deferred.resolve({error: error});
	      }
	    );

	    return deferred.promise;
	  };


	  /**
	   * Make an inuque list of members
	   */
	  Groups.prototype.uniqueMembers = function ()
	  {
	    angular.forEach(angular.fromJson(Storage.get('groups')), function (group, index)
	    {
	      var members = angular.fromJson(Storage.get('members')) || {};

	      angular.forEach(angular.fromJson(Storage.get(group.uuid)), function (member, index)
	      {
	        members[member.uuid] = member;
	      });

	      Storage.add('members', angular.toJson(members));
	    });
	  };


	  /**
	   * Save group
	   */
	  Groups.prototype.save = function (group) 
	  {
	    var deferred = $q.defer();

	    /**
	     * Check if group id supplied
	     * if save submitted from add / edit form
	     */
	    if (group.id)
	    {
	      Groups.edit({id: group.id}, {name: group.name}, function (result) 
	      {
	        deferred.resolve(group.id);
	      });
	    }
	    else
	    {
	      Groups.save(
	        { id: $rootScope.app.resources.uuid }, 
	        group, 
	        function (result) 
	        {
	          /**
	           * Group save call returns only uuid and that is parsed as json
	           * by angular, this is a fix for converting returned object to plain string
	           */
	          var returned = '';

	          angular.forEach(result, function (chr, i)
	          {
	            returned += chr;
	          });

	          deferred.resolve(returned);
	        },
	        function (error)
	        {
	          deferred.resolve({error: error});
	        }
	      ); 
	    };

	    return deferred.promise;
	  };


	  /**
	   * Delete group
	   */
	  Groups.prototype.remove = function (id) 
	  {
	    var deferred = $q.defer();

	    Groups.remove(
	      {id: id}, 
	      function (result) 
	      {
	        deferred.resolve(result);
	      },
	      function (error)
	      {
	        deferred.resolve({error: error});
	      }
	    );

	    return deferred.promise;
	  };


	  /**
	   * Search candidate mambers
	   */
	  Groups.prototype.search = function (query) 
	  {
	    var deferred = $q.defer();

	    Groups.search(
	      null, 
	      {key: query}, 
	      function (results) 
	      {
	        var processed = [];

	        angular.forEach(results, function (result, index)
	        {
	          processed.push({
	            id: result.id,
	            name: result.name,
	            groups: Groups.prototype.getMemberGroups(result.id)
	          });
	        });

	        deferred.resolve(processed);
	      },
	      function (error)
	      {
	        deferred.resolve({error: error});
	      }
	    );

	    return deferred.promise;
	  };


	  /**
	   * Get groups of given member
	   */
	  Groups.prototype.getMemberGroups = function (id)
	  {
	    var groups = angular.fromJson(Storage.get('groups')),
	        memberGroups = [];

	    angular.forEach(groups, function (group, index)
	    {
	      var localGroup = angular.fromJson(Storage.get(group.uuid));

	      angular.forEach(localGroup, function (member, index)
	      {
	        if (member.uuid === id)
	          memberGroups.push({
	            uuid: group.uuid,
	            name: group.name
	          });
	      });
	    });

	    return memberGroups;
	  };


	  return new Groups;
	}
])



/**
 * Profile modal
 */
.factory('Profile', 
[
	'$rootScope', '$config', '$resource', '$q', 'Storage', 'Groups', 'Slots',
	function ($rootScope, $config, $resource, $q, Storage, Groups, Slots) 
	{
	  var Profile = $resource(
	    $config.host + '/node/:id/:section',
	    {
	    },
	    {
	      get: {
	        method: 'GET',
	        params: {id: '', section: 'resource'}
	      },
	      save: {
	        method: 'PUT',
	        params: {section: 'resource'}
	      },
	      role: {
	        method: 'PUT',
	        params: {section: 'role'}
	      }
	    }
	  );


	  var Register = $resource(
	    $config.host + '/register',
	    {
	      direct: 'true',
	      module: 'default'
	    },
	    {
	      profile: {
	        method: 'GET',
	        params: {uuid: '', pass: '', name: '', phone: ''}
	      }
	    }
	  );


	  var Resources = $resource(
	    $config.host + '/resources',
	    {
	    },
	    {
	      get: {
	        method: 'GET',
	        params: {}
	      },
	      save: {
	        method: 'POST',
	        params: {
	          /**
	           * It seems like backend accepts data in request payload as body as well
	           */
	          //tags: ''
	        }
	      }
	    }
	  );


	  /**
	   * Change password for user
	   */
	  Profile.prototype.register = function (profile) 
	  {    
	    var deferred = $q.defer();

	    Register.profile(
	      {
	        uuid: profile.username,
	        pass: MD5(profile.password),
	        name: profile.name,
	        phone: profile.PhoneAddress
	      }, 
	      function (registered) 
	      {
	        Profile.prototype.role(profile.username, profile.role.id)
	        .then(function(roled)
	        {
	          Profile.prototype.save(profile.username, {
	            EmailAddress: profile.EmailAddress,
	            PostAddress: profile.PostAddress,
	            PostZip: profile.PostZip,
	            PostCity: profile.PostCity
	          }).then(function(resourced)
	          {
	            var calls = [];

	            angular.forEach(profile.groups, function (group, index)
	            {
	              calls.push(Groups.addMember({
	                id: profile.username,
	                group: group
	              }));
	            });

	            $q.all(calls)
	            .then(function(grouped)
	            {
	              deferred.resolve({
	                registered: registered,
	                roled: roled,
	                resourced: resourced,
	                grouped: grouped
	              });
	            });

	          }); // save profile

	        }); // role
	      },
	      function (error)
	      {
	        deferred.resolve({error: error});
	      }
	    ); // register
	   
	    return deferred.promise;
	  };


	  /**
	   * Set role of given user
	   */
	  Profile.prototype.role = function (id, role) 
	  {    
	    var deferred = $q.defer();

	    Profile.role(
	      {id: id}, 
	      role, 
	      function (result) 
	      {
	        deferred.resolve(result);
	      },
	      function (error)
	      {
	        deferred.resolve({error: error});
	      }
	    );

	    return deferred.promise;
	  };


	  /**
	   * Change password for user
	   */
	  Profile.prototype.changePassword = function (passwords) 
	  {    
	    var deferred = $q.defer();

	    Resources.save(
	      null, 
	      { askPass: MD5(passwords.new1) }, 
	      function (result) 
	      {
	        deferred.resolve(result);
	      },
	      function (error)
	      {
	        deferred.resolve({error: error});
	      }
	    );

	    return deferred.promise;
	  };


	  /**
	   * Get profile of given user
	   */
	  Profile.prototype.get = function (id, localize) 
	  {    
	    var deferred = $q.defer();

	    Profile.get({id: id}, function (result) 
	    {
	      if (id == $rootScope.app.resources.uuid) $rootScope.app.resources = result;

	      if (localize) Storage.add('resources', angular.toJson(result));

	      deferred.resolve({resources: result});
	    });

	    return deferred.promise;
	  };


	  /**
	   * Get profile of given user with slots
	   */
	  Profile.prototype.getWithSlots = function (id, localize, params) 
	  {
	    var deferred = $q.defer();

	    Profile.prototype.get(id, localize)
	    .then(function (resources)
	    {
	      Slots.user({
	        user: id,
	        start: params.start,
	        end: params.end
	      }).then(function (slots)
	      {
	        deferred.resolve(angular.extend(resources, {
	          slots: slots,
	          synced: new Date().getTime(),
	          periods: {
	            start: params.start,
	            end: params.end
	          }
	        }));        
	      }); // user slots
	    }); // profile get

	    return deferred.promise;
	  };


	  /**
	   * Get user slots
	   */
	  Profile.prototype.getSlots = function (id, params) 
	  {
	    var deferred = $q.defer();

	    Slots.user(
	    {
	      user:   id,
	      // start: params.start / 1000,
	      // end: params.end / 1000
	      start:  params.start,
	      end:    params.end
	    }).then(function (slots)
	    {
	      deferred.resolve({
	        slots: slots,
	        synced: new Date().getTime(),
	        periods: {
	          start: params.start,
	          end: params.end
	        }
	      });        
	    });

	    return deferred.promise;
	  };


	  /**
	   * Get local resource data
	   */
	  Profile.prototype.local = function () { return angular.fromJson(Storage.get('resources')) };


	  /**
	   * Save profile
	   */
	  Profile.prototype.save = function (id, resources) 
	  {
	    var deferred = $q.defer();

	    Profile.save(
	      {id: id}, 
	      resources, 
	      function (result) 
	      {
	        deferred.resolve(result);
	      },
	      function (error)
	      {
	        deferred.resolve({error: error});
	      }
	    );

	    return deferred.promise;
	  };


	  /**
	   * Create settings resources for user if it is missing
	   */
	  Profile.prototype.createSettings_ = function (id) 
	  {
	    var deferred = $q.defer();

	    Profile.prototype.get(id, false)
	    .then(function (result) 
	    {
	      if (result.settingsWebPaige == undefined || result.settingsWebPaige == null)
	      {
	        Profile.save(
	          {id: result.resources.uuid}, 
	          angular.toJson({ settingsWebPaige: $rootScope.config.defaults.settingsWebPaige }), 
	          function (result)
	          {
	            deferred.resolve({
	              status: 'modified',
	              resources: result
	            });
	          },
	          function (error)
	          {
	            deferred.resolve({error: error});
	          }
	        );
	      }
	      else
	      {
	        deferred.resolve({
	          status: 'full',
	          resources: result
	        });
	      }
	    });

	    return deferred.promise;
	  };


	  return new Profile;
	}
])



/**
 * Settings module
 */
.factory('Settings', 
[
	'$rootScope', '$config', '$resource', '$q', 'Storage', 'Profile',
	function ($rootScope, $config, $resource, $q, Storage, Profile) 
	{
	  /**
	   * Define settings resource
	   * In this case it empty :)
	   */
	  var Settings = $resource();


	  /**
	   * Get settings from localStorage
	   */
	  Settings.prototype.get = function ()
	  {
	    return angular.fromJson(Storage.get('resources')).settingsWebPaige || {};
	  };


	  /**
	   * Save settings
	   */
	  Settings.prototype.save = function (id, settings) 
	  {
	    var deferred = $q.defer();

	    Profile.save(id, {
	      settingsWebPaige: angular.toJson(settings)
	    })
	    .then(function (result)
	    {
	      deferred.resolve({
	        saved: true
	      });
	    });

	    return deferred.promise;
	  };


	  return new Settings;
	}
]);;'use strict';


angular.module('WebPaige.Controllers', [])


/**
 * Login controller
 */
.controller('login', 
[
	'$rootScope', '$location', '$q', '$scope', 'Session', 'User', 'Groups', 'Messages', 'Storage', '$routeParams', 'Settings', 'Profile', 'MD5', 
	function ($rootScope, $location, $q, $scope, Session, User, Groups, Messages, Storage, $routeParams, Settings, Profile, MD5) 
	{
	  /**
	   * Self this
	   */
		var self = this;

	  /**
	   * Redirect to dashboard if logged in
	   */
	  // if (Session.check()) redirectToDashboard();


	  /**
	   * Set default views
	   */
		if ($routeParams.uuid && $routeParams.key)
	  {
			$scope.views = {
				changePass: true,
			};

			$scope.changepass = {
				uuid: $routeParams.uuid,
				key:  $routeParams.key,
			}
		}
	  else
	  {
			$scope.views = {
				login: true,
				forgot: false
			};
		};


	  /**
	   * KNRM users for testing
	   */
	  if ($rootScope.config.demo_users) $scope.demo_users = demo_users;


	  /**
	   * Real KNRM users for testing
	   */
	   $scope.knrmLogin = function (user)
	   {
	     $('#login button[type=submit]')
	       .text('Login..')
	       .attr('disabled', 'disabled');

	    self.auth(user.uuid, user.resources.askPass);
	   };

	  
	  /**
	   * Set default alerts
	   */
	  $scope.alert = {
	    login: {
	      display: false,
	      type: '',
	      message: ''
	    },
	    forgot: {
	      display: false,
	      type: '',
	      message: ''
	    }
	  };


	  /**
	   * Init rootScope app info container
	   */
	  if (!Storage.session.get('app')) Storage.session.add('app', '{}');


	  /**
	   * TODO
	   * Lose this jQuery stuff later on!
	   * 
	   * Jquery solution of toggling between login and app view
	   */
	  $('.navbar').hide();
	  $('#footer').hide();
	  $('#watermark').hide();
	  $('body').css({
	    'background': 'url(../' + $rootScope.config.profile.background + ') no-repeat center center fixed',
	    'backgroundSize': 'cover'
	  });


	  /**
	   * TODO
	   * use native JSON functions of angular and Store service
	   */
	  var logindata = angular.fromJson(Storage.get('logindata'));

	  if (logindata && logindata.remember) $scope.logindata = logindata;


	  /**
	   * TODO
	   * Remove unneccessary DOM manipulation
	   * Use cookies for user credentials
	   * 
	   * Login trigger
	   */
	  $scope.login = function()
	  {
	    $('#alertDiv').hide();

	    if (!$scope.logindata ||
	        !$scope.logindata.username || 
	        !$scope.logindata.password)
	    {
	      $scope.alert = {
	        login: {
	          display: true,
	          type: 'alert-error',
	          message: $rootScope.ui.login.alert_fillfiled
	        }
	      };

	      $('#login button[type=submit]')
	        .text('Login')
	        .removeAttr('disabled');

	      return false;     
	    };

	    $('#login button[type=submit]')
	      .text('Login..')
	      .attr('disabled', 'disabled');

	    Storage.add('logindata', angular.toJson({
	      username: $scope.logindata.username,
	      password: $scope.logindata.password,
	      remember: $scope.logindata.remember
	    }));

	    self.auth( $scope.logindata.username, MD5($scope.logindata.password ));
	  };


	  /**
	   * Authorize user
	   */
	  self.auth = function (uuid, pass)
	  {
	    User.login(uuid.toLowerCase(), pass)
	    .then(function (result)
		  {
	      if (result.status == 400)
	      {
	        $scope.alert = {
	          login: {
	            display: true,
	            type: 'alert-error',
	            message: $rootScope.ui.login.alert_wrongUserPass
	          }
	        };

	        $('#login button[type=submit]')
	          .text('Login')
	          .removeAttr('disabled');

	        return false;
	      }
	      else
	      {
	        Session.set(result["X-SESSION_ID"]);

	        self.preloader();
	      };
		  });
	  };


	  /**
	   * TODO
	   * What happens if preloader stucks?
	   * Optimize preloader and messages
	   * 
	   * Initialize preloader
	   */
	  self.preloader = function()
	  {
	    $('#login').hide();
	    $('#download').hide();
	    $('#preloader').show();

	    self.progress(30, $rootScope.ui.login.loading_User);

	    User.resources()
	    .then(function (resources)
	    {
	      if (resources.error)
	      {
	        console.warn('error ->', resources);
	      }
	      else
	      {
	        $rootScope.app.resources = resources;

	        self.progress(70, $rootScope.ui.login.loading_Group);

	        Groups.query(true)
	        .then(function (groups)
	        {
	          if (groups.error)
	          {
	            console.warn('error ->', groups);
	          }
	          else
	          {
	            var settings  = angular.fromJson(resources.settingsWebPaige) || {},
	                sync      = false,
	                parenting = false,
	                defaults  = $rootScope.config.defaults.settingsWebPaige,
	                _groups   = function (groups)
	                {
	                  var _groups = {};
	                  angular.forEach(groups, function (group, index) { _groups[group.uuid] = true; });
	                  return _groups;
	                };

	            // Check if there is any settings at all
	            if (settings != null || settings != undefined)
	            {
	              // check for user settigns-all
	              if (settings.user)
	              {
	                // check for user-language settings
	                if (settings.user.language)
	                {
	                  // console.warn('user HAS language settings');
	                  $rootScope.changeLanguage(angular.fromJson(resources.settingsWebPaige).user.language);
	                  defaults.user.language = settings.user.language;
	                }
	                else
	                {
	                  // console.warn('user has NO language!!');
	                  $rootScope.changeLanguage($rootScope.config.defaults.settingsWebPaige.user.language);
	                  sync = true;
	                };             
	              }
	              else
	              {
	                // console.log('NO user settings at all !!');
	                sync = true;
	              };

	              // check for app settings-all
	              if (settings.app)
	              {
	                // check for app-widget settings
	                if (settings.app.widgets)
	                {
	                  // check for app-widget-groups setting
	                  if (settings.app.widgets.groups)
	                  {
	                    // console.warn('user HAS app widgets groups settings');
	                    defaults.app.widgets.groups = settings.app.widgets.groups;
	                  }
	                  else
	                  {
	                    // console.warn('user has NO app widgets groups!!');
	                    defaults.app.widgets.groups = _groups(groups);
	                    sync = true;
	                  }
	                }
	                else
	                {
	                  // console.warn('user has NO widget settings!!');
	                  defaults.app.widgets = { groups: _groups(groups) };
	                  sync = true;
	                };

	                // check for app group setting
	                if (settings.app.group && settings.app.group != undefined)
	                {
	                  // console.warn('user HAS app first group setting');
	                  defaults.app.group = settings.app.group;
	                }
	                else
	                {
	                  // console.warn('user has NO first group setting!!');
	                  parenting = true;
	                  sync      = true;
	                };          
	              }
	              else
	              {
	                // console.log('NO app settings!!');
	                defaults.app = { widgets: { groups: _groups(groups) } };
	                sync = true;
	              };
	            }
	            else
	            {
	              // console.log('NO SETTINGS AT ALL!!');
	              defaults = {
	                user: $rootScope.config.defaults.settingsWebPaige.user,
	                app: {
	                  widgets: {
	                    groups: _groups(groups)
	                  },
	                  group: groups[0].uuid
	                }
	              };
	              sync = true;
	            };

	            // sync settings with missing parts also parenting check
	            if (sync)
	            {
	              if (parenting)
	              {
	                // console.warn('setting up parent group for the user');

	                Groups.parents()
	                .then(function (_parent)
	                {
	                  // console.warn('parent group been fetched ->', _parent);

	                  if (_parent != null)
	                  {
	                    // console.warn('found parent parent -> ', _parent);

	                    defaults.app.group = _parent;
	                  }
	                  else
	                  {
	                    // console.warn('setting the first group in the list for user ->', groups[0].uuid);

	                    defaults.app.group = groups[0].uuid;
	                  };
	                                
	                  // console.warn('SAVE ME (with parenting) ->', defaults);

	                  Settings.save(resources.uuid, defaults)
	                  .then(function (setted)
	                  {
	                    User.resources()
	                    .then(function (got)
	                    {
	                      // console.log('gotted (with setting parent group) ->', got);
	                      $rootScope.app.resources = got;

	                      finalize();
	                    })
	                  });

	                });
	              }
	              else
	              {              
	                // console.warn('SAVE ME ->', defaults);
	                
	                defaults.app.group = groups[0].uuid;

	                Settings.save(resources.uuid, defaults)
	                .then(function (setted)
	                {
	                  User.resources()
	                  .then(function (got)
	                  {
	                    // console.log('gotted ->', got);
	                    $rootScope.app.resources = got;

	                    finalize();
	                  })
	                });
	              }
	            }
	            else
	            {
	              finalize();
	            }
	          };
	        });
	      };
	    });
	  };


	  /**
	   * Finalize the preloading
	   */
	  function finalize ()
	  {
	    // console.warn( 'settings ->',
	    //               'user ->', angular.fromJson($rootScope.app.resources.settingsWebPaige).user,
	    //               'widgets ->', angular.fromJson($rootScope.app.resources.settingsWebPaige).app.widgets,
	    //               'group ->', angular.fromJson($rootScope.app.resources.settingsWebPaige).app.group);

	    self.progress(100, $rootScope.ui.login.loading_everything);

	    self.redirectToDashboard();

	    self.getMessages();

	    self.getMembers();    
	  }

	  /**
	   * TODO
	   * Implement an error handling
	   *
	   * Get members list (SILENTLY)
	   */
	  self.getMembers = function ()
	  {
	    var groups = Storage.local.groups();

	    Groups.query()
	    .then(function (groups)
	    {
	      var calls = [];

	      angular.forEach(groups, function (group, index)
	      {
	        calls.push(Groups.get(group.uuid));
	      });

	      $q.all(calls)
	      .then(function (result)
	      {
	        // console.warn('members ->', result);
	        Groups.uniqueMembers();
	      });
	    });
	  };


	  /**
	   * TODO
	   * Implement an error handling
	   *
	   * Get messages (SILENTLY)
	   */
	  self.getMessages = function ()
	  {
	    Messages.query()
	    .then(function (messages)
	    {
	      if (messages.error)
	      {
	        console.warn('error ->', messages);
	      }
	      else
	      {
	        $rootScope.app.unreadMessages = Messages.unreadCount();

	        Storage.session.unreadMessages = Messages.unreadCount();
	      };
	    });
	  };


	  /**
	   * Redirect to dashboard
	   */
	  self.redirectToDashboard = function ()
	  {
	    $location.path('/dashboard');

	    setTimeout(function ()
	    {
	      $('body').css({ 'background': 'none' });
	      $('.navbar').show();
	      // $('#mobile-status-bar').show();
	      // $('#notification').show();
	      if (!$rootScope.browser.mobile) $('#footer').show();
	      $('#watermark').show();
	      $('body').css({ 'background': 'url(../img/bg.jpg) repeat' });
	    }, 100);
	  };


	  /**
	   * Progress bar
	   */
	  self.progress = function (ratio, message)
	  {
	    $('#preloader .progress .bar').css({ width: ratio + '%' }); 
	    $('#preloader span').text(message);    
	  };


	  /**
	   * RE-FACTORY
	   * TODO
	   * Make button state change!
	   * Finish it!
	   * 
	   * Forgot password
	   */
		$scope.forgot = function ()
	  {
			$('#forgot button[type=submit]').text('setting ...').attr('disabled', 'disabled');

			User.password($scope.remember.id)
	    .then(function (result)
			{
				if (result == "ok")
	      {
					$scope.alert = {
						forget : {
							display : true,
							type : 'alert-success',
							message : 'Please check your email to reset your password!'
						}
					};
				}
	      else 
	      {
					$scope.alert = {
						forget : {
							display : true,
							type : 'alert-error',
							message : 'Error, we can not find this account !'
						}
					};
				};

				$('#forgot button[type=submit]')
	        .text('change password')
	        .removeAttr('disabled');
			});
		};


	  /**
	   * RE-FACTORY
	   * Change password
	   */
		self.changePass =  function (uuid, newpass, key)
	  {
			User.changePass(uuid, newpass, key)
	    .then(function (result)
	    {
				if(result.status == 400 || result.status == 500 || result.status == 409)
	      {
					$scope.alert = {
						changePass : {
							display : true,
							type : 'alert-error',
							message : 'Something wrong with password changing!'
						}
					};
				}
	      else
	      { // successfully changed
					$scope.alert = {
						changePass : {
							display : true,
							type : 'alert-success',
							message : 'Password changed!'
						}
					}; 
					
					$location.path( "/message" );
				};

				$('#changePass button[type=submit]')
	        .text('change password')
	        .removeAttr('disabled');
			})
		};


	  /**
	   * RE-FACTORY
	   * Change password
	   */
		$scope.changePass = function ()
	  {
			$('#alertDiv').hide();

			if (!$scope.changeData || !$scope.changeData.newPass || !$scope.changeData.retypePass)
	    {
				$scope.alert = {
					changePass : {
						display : true,
						type : 'alert-error',
						message : 'Please fill all fields!'
					}
				};

				$('#changePass button[type=submit]')
	        .text('change password')
	        .removeAttr('disabled');

				return false;
			}
	    else if ($scope.changeData.newPass != $scope.changeData.retypePass)
	    {
				$scope.alert = {
					changePass : {
						display : true,
						type : 'alert-error',
						message : 'Please make the reType password is indentical !'
					}
				};

				$('#changePass button[type=submit]')
	        .text('change password')
	        .removeAttr('disabled');

				return false;
			};

			$('#changePass button[type=submit]')
	      .text('changing ...')
	      .attr('disabled', 'disabled');

			self.changePass($scope.changepass.uuid, MD5($scope.changeData.newPass), $scope.changepass.key);
		};

	}
])


/**
 * Logout controller
 */
.controller('logout', 
[
	'$rootScope', '$scope', '$window', 'Session', 'User', 'Storage', 
	function ($rootScope, $scope, $window, Session, User, Storage) 
	{
	  $('.navbar').hide();
	  $('#footer').hide();

	  var logindata = angular.fromJson(Storage.get('logindata'));

		User.logout()
		.then(function (result)
		{
	    if (result.error)
	    {
	      console.warn('error ->', result);
	    }
	    else
	    {
	      Storage.clearAll();

	      Storage.session.clearAll();

	      Storage.add('logindata', angular.toJson(logindata));

	      $window.location.href = 'logout.html';
	    };
		});
	}
])


/**
 * Dashboard controller
 */
.controller('dashboard', 
[
	'$scope', '$rootScope', '$q', 'Dashboard', 'Slots', 'Dater', 'Storage', 'Settings', 'Profile', 
	function ($scope, $rootScope, $q, Dashboard, Slots, Dater, Storage, Settings, Profile) 
	{
	  /**
	   * Fix styles
	   */
	  $rootScope.fixStyles();


	  /**
	   * Defaults for loaders
	   */
	  $scope.loading = {
	    pies:   true,
	    alerts: true
	  };
	  

	  /**
	   * Defaults for toggler
	   */
	  $scope.more = {
	    status: false,
	    text:   'show more' 
	  };


	  /**
	   * TODO
	   * Check somewhere that user-settings widget-groups are synced with the
	   * real groups list and if a group is missing in settings-groups add by
	   * default!
	   */
	  var groups    = Storage.local.groups(),
	      settings  = Storage.local.settings(),
	      selection = {};

	  angular.forEach(Storage.local.settings().app.widgets.groups, function (value, group)
	  {
	    selection[group] = value;
	  });

	  $scope.popover = {
	    groups: groups,
	    selection: selection
	  };


	  /**
	   * Get group overviews
	   */
	  function getOverviews ()
	  {
	    Dashboard.pies()
	    .then(function (pies)
	    {
	      if (pies.error)
	      {
	        $rootScope.notifier.error('Error with getting group overviews.');
	        console.warn('error ->', result);
	      }
	      else
	      {
	        $scope.shortageHolders = {};

	        $scope.loading.pies = false;

	        $scope.periods = {
	          start:  pies[0].weeks.current.start.date,
	          end:    pies[0].weeks.next.end.date
	        };

	        angular.forEach(pies, function (pie, index)
	        {
	          if (pie.weeks.current.state.diff == null) pie.weeks.current.state.diff = 0;
	          if (pie.weeks.current.state.wish == null) pie.weeks.current.state.wish = 0;
	              
	          if (pie.weeks.current.state.diff > 0)
	          {
	            pie.weeks.current.state.cls = 'more';
	          }
	          else if (pie.weeks.current.state.diff == 0)
	          {
	            pie.weeks.current.state.cls = 'even';
	          }
	          else if (pie.weeks.current.state.diff < 0)
	          {
	            pie.weeks.current.state.cls = 'less';
	          };

	          pie.weeks.current.state.start = (pie.weeks.current.state.start != undefined) 
	                                          ? new Date(pie.weeks.current.state.start * 1000).toString($rootScope.config.formats.datetime)
	                                          : 'undefined';

	          pie.weeks.current.state.end   = (pie.weeks.current.state.end != undefined)
	                                          ? new Date(pie.weeks.current.state.end * 1000).toString($rootScope.config.formats.datetime)
	                                          : 'undefined';
	          
	          pie.shortages = {
	            current:  pie.weeks.current.shortages,
	            next:     pie.weeks.next.shortages,
	            total:    pie.weeks.current.shortages.length + pie.weeks.next.shortages.length
	          };

	          pie.state = pie.weeks.current.state;

	          delete(pie.weeks.current.shortages);
	          delete(pie.weeks.current.state);

	          $scope.shortageHolders['shortages-' + pie.id] = false;
	        });

	        $scope.pies = pies;
	      };
	    })
	    .then( function (result)
	    {
	      angular.forEach($scope.pies, function (pie, index)
	      {
	        pieMaker('weeklyPieCurrent-', pie.id, pie.name, pie.weeks.current.ratios);
	        pieMaker('weeklyPieNext-', pie.id, pie.name, pie.weeks.next.ratios);
	      });

	      function pieMaker ($id, id, name, _ratios)
	      {    
	        setTimeout( function () 
	        {
	          document.getElementById($id + id).innerHTML = '';

	          var ratios    = [],
	              colorMap  = {
	                more: '#415e6b',
	                even: '#ba6a24',
	                less: '#a0a0a0'
	              },
	              colors    = [],
	              xratios   = [];

	          angular.forEach(_ratios, function (ratio, index)
	          {
	            if (ratio != 0)
	            {
	              ratios.push({
	                ratio: ratio, 
	                color: colorMap[index]
	              });
	            };
	          });

	          ratios = ratios.sort(function (a, b) { return b.ratio - a.ratio });

	          angular.forEach(ratios, function (ratio, index)
	          {
	            colors.push(ratio.color);
	            xratios.push(ratio.ratio);
	          });

	          var r   = Raphael($id + id),
	              pie = r.piechart(40, 40, 40, xratios, { colors: colors });

	        }, 100);
	      };
	    });
	  };

	  getOverviews();

	  /**
	   * Save widget settings
	   */
	  $scope.saveOverviewWidget = function (selection)
	  {
	    $rootScope.statusBar.display($rootScope.ui.settings.saving);

	    Settings.save($rootScope.app.resources.uuid, {
	      user: Storage.local.settings().user,
	      app: {
	        widgets: {
	          groups: selection
	        }
	      }
	    })
	    .then(function (result)
	    {
	      $rootScope.statusBar.display('Refreshing group overviews..');

	      Profile.get($rootScope.app.resources.uuid, true)
	      .then(function (resources)
	      {
	        getOverviews();
	      })
	    });
	  };


	  /**
	   * P2000 annnouncements
	   */
	  Dashboard.p2000().
	  then(function (result)
	  {
	    if (result.error)
	    {
	      $rootScope.notifier.error('Error with getting p2000 alarm messages.');
	      console.warn('error ->', result);
	    }
	    else
	    {
	      $scope.loading.alerts = false;

	      $scope.alarms = result;

	      $scope.alarms.list = $scope.alarms.short;
	    };
	  });


	  /**
	   * Show more or less alarms
	   */
	  $scope.toggle = function (more)
	  {
	    $scope.alarms.list = (more) ? $scope.alarms.short :  $scope.alarms.long;

	    $scope.more.text = (more) ? 'show more' : 'show less';

	    $scope.more.status = !$scope.more.status;
	  };
	}
])



.controller('planboard', 
[
	'$rootScope', '$scope', '$q', '$window', '$location', 'data', 'Slots', 'Dater', 'Storage', 'Sloter', 
	function ($rootScope, $scope, $q, $window, $location, data, Slots, Dater, Storage, Sloter) 
	{
	  /**
	   * Fix styles
	   */
	  $rootScope.fixStyles();


	  console.warn('Storage size: ', Storage.size());

	  
	  /**
	   * Set default currents
	   */
	  var self = this,
	      periods = Dater.getPeriods(),
	      groups  = Storage.local.groups(),
	      settings = Storage.local.settings(),
	      current = {
	        layouts: {
	          user:     true,
	          group:    true,
	          members:  false
	        },
	        day:      Dater.current.today(),
	        week:     Dater.current.week(),
	        month:    Dater.current.month(),
	        group:    settings.app.group,
	        // group:    groups[0].uuid,
	        division: 'all'
	      };


	  /**
	   * Reset views for default views
	   */
	  function resetViews ()
	  {
	    $scope.views = {
	      slot: {
	        add:  false,
	        edit: false
	      },
	      group:  false,
	      wish:   false,
	      member: false
	    };
	  };

	  resetViews();


	  /**
	   * Slot form toggler
	   */
	  $scope.toggleSlotForm = function ()
	  {
	    if ($scope.views.slot.add)
	    {
	      $scope.resetInlineForms();
	    }
	    else
	    {
	      $scope.slot = {};

	      resetViews();

	      $scope.views.slot.add = true;
	    };
	  };


	  /**
	   * Reset inline forms
	   */
	  $scope.resetInlineForms = function ()
	  {
	    $scope.slot = {};

	    $scope.original = {};

	    resetViews();
	  };


	  /**
	   * Reset and init slot container which
	   * is used for adding or changing slots
	   */
	  $scope.slot = {};


	  /**
	   * Pass time slots data
	   */
	  $scope.data = data;


	  /**
	   * Set defaults for timeline
	   */
	  $scope.timeline = {
	    current: current,
	    options: {
	      start:  new Date(periods.weeks[current.week].first.day),
	      end:    new Date(periods.weeks[current.week].last.day),
	      min:    new Date(periods.weeks[current.week].first.day),
	      max:    new Date(periods.weeks[current.week].last.day)
	    },
	    range: {
	      start:  periods.weeks[current.week].first.day,
	      end:    periods.weeks[current.week].last.day
	    },
	    scope: {
	      day:    false,
	      week:   true,
	      month:  false
	    },
	    config: {
	      bar:        $rootScope.config.timeline.config.bar,
	      wishes:     $rootScope.config.timeline.config.wishes,
	      legenda:    {},
	      legendarer: $rootScope.config.timeline.config.legendarer,
	      states:     $rootScope.config.timeline.config.states,
	      divisions:  $rootScope.config.timeline.config.divisions,
	      densities:  $rootScope.config.timeline.config.densities
	    }
	  };


	  /**
	   * Legenda defaults
	   */
	  angular.forEach($rootScope.config.timeline.config.states, function (state, index)
	  {
	    $scope.timeline.config.legenda[index] = true;
	  });


	  /**
	   * Timeline group legenda default configuration
	   */
	  $scope.timeline.config.legenda.groups = {
	    more: true,
	    even: true,
	    less: true
	  };


	  /**
	   * Prepeare timeline range for dateranger widget
	   */
	  $scope.daterange =  Dater.readable.date($scope.timeline.range.start) + 
	                      ' / ' + 
	                      Dater.readable.date($scope.timeline.range.end);


	  /**
	   * States for dropdown
	   */
	  var states = {};

	  angular.forEach($scope.timeline.config.states, function (state, key) { states[key] = state.label });

	  $scope.states = states;


	  /**
	   * Groups for dropdown
	   */
	  $scope.groups = groups;


	  /**
	   * Groups for dropdown
	   */
	  $scope.divisions = $scope.timeline.config.divisions;


	  /**
	   * Watch for changes in timeline range
	   */
	  $scope.$watch(function ()
	  {
	    var range = self.timeline.getVisibleChartRange(),
	        diff  = Dater.calculate.diff(range);

	    /**
	     * Scope is a day
	     * 
	     * TODO
	     * try later on!
	     * new Date(range.start).toString('d') == new Date(range.end).toString('d')
	     */
	    if (diff <= 86400000)
	    {
	      $scope.timeline.scope = {
	        day:    true,
	        week:   false,
	        month:  false
	      };
	    }
	    /**
	     * Scope is less than a week
	     */
	    else if (diff < 604800000)
	    {
	      $scope.timeline.scope = {
	        day:    false,
	        week:   true,
	        month:  false
	      };
	    }
	    /**
	     * Scope is more than a week
	     */
	    else if (diff > 604800000)
	    {
	      $scope.timeline.scope = {
	        day:    false,
	        week:   false,
	        month:  true
	      };
	    };

	    $scope.timeline.range = {
	      start:  new Date(range.start).toString(),
	      end:    new Date(range.end).toString()
	    };

	    $scope.daterange =  Dater.readable.date($scope.timeline.range.start) + 
	                        ' / ' + 
	                        Dater.readable.date($scope.timeline.range.end);
	  });


	  /**
	   * Timeline (The big boy)
	   */
	  var timeliner = {

	    /**
	     * Init timeline
	     */
	    init: function ()
	    {
	      self.timeline = new links.Timeline(document.getElementById('mainTimeline'));

	      links.events.addListener(self.timeline, 'rangechanged',  timelineGetRange);
	      links.events.addListener(self.timeline, 'add',           timelineOnAdd);
	      links.events.addListener(self.timeline, 'delete',        timelineOnRemove);
	      links.events.addListener(self.timeline, 'change',        timelineOnChange);
	      links.events.addListener(self.timeline, 'select',        timelineOnSelect);

	      this.render($scope.timeline.options);      
	    },

	    /**
	     * Render or re-render timeline
	     */
	    render: function (options)
	    {
	      $scope.timeline = {
	        current:  $scope.timeline.current,
	        scope:    $scope.timeline.scope,
	        config:   $scope.timeline.config,
	        options: {
	          start:  new Date(options.start),
	          end:    new Date(options.end),
	          min:    new Date(options.start),
	          max:    new Date(options.end)
	        }
	      };

	      angular.extend($scope.timeline.options, $rootScope.config.timeline.options);

	      self.timeline.draw(
	        Sloter.process(
	          $scope.data,
	          $scope.timeline.config,
	          $scope.divisions,
	          $rootScope.app.resources.role
	        ), 
	        $scope.timeline.options
	      );

	      self.timeline.setVisibleChartRange($scope.timeline.options.start, $scope.timeline.options.end);
	    },

	    /**
	     * Grab new timeline data from backend and render timeline again
	     */
	    load: function (stamps)
	    {
	      var _this = this;

	      $rootScope.statusBar.display($rootScope.ui.planboard.refreshTimeline);

	      Slots.all({
	        groupId:  $scope.timeline.current.group,
	        division: $scope.timeline.current.division,
	        layouts:  $scope.timeline.current.layouts,
	        month:    $scope.timeline.current.month,
	        stamps:   stamps
	      })
	      .then(function (data)
	      {
	        if (data.error)
	        {
	          $rootScope.notifier.error('Error with gettings timeslots.');
	          console.warn('error ->', result);
	        }
	        else
	        {
	          $scope.data = data;

	          _this.render(stamps);
	        };

	        $rootScope.statusBar.off();
	      });
	    },

	    /**
	     * Refresh timeline as it is
	     */
	    refresh: function ()
	    {
	      $scope.slot = {};

	      resetViews();

	      $scope.views.slot.add = true;

	      this.load({
	        start:  data.periods.start,
	        end:    data.periods.end
	      });
	    },

	    /**
	     * Redraw timeline
	     */
	    redraw: function ()
	    {
	      self.timeline.redraw();
	    },

	    /**
	     * Cancel add
	     */
	    cancelAdd: function ()
	    {
	      self.timeline.cancelAdd();
	    }
	  };
	 

	  /**
	   * Init timeline
	   */
	  timeliner.init();


	  /**
	   * Timeliner listener
	   */
	  $rootScope.$on('timeliner', function () 
	  {
	    timeliner.load({
	      start:  new Date(arguments[1].start).getTime(),
	      end:    new Date(arguments[1].end).getTime()
	    });
	  });


	  /**
	   * Handle new requests for timeline
	   */
	  $scope.requestTimeline = function (section)
	  {
	    switch (section)
	    {
	      case 'group':
	        $scope.timeline.current.layouts.group = !$scope.timeline.current.layouts.group;

	        if ($scope.timeline.current.layouts.members && !$scope.timeline.current.layouts.group)
	          $scope.timeline.current.layouts.members = false;
	      break;

	      case 'members':
	        $scope.timeline.current.layouts.members = !$scope.timeline.current.layouts.members;

	        if ($scope.timeline.current.layouts.members && !$scope.timeline.current.layouts.group)
	          $scope.timeline.current.layouts.group = true;
	      break;
	    };

	    timeliner.load({
	      start:  data.periods.start,
	      end:    data.periods.end
	    });
	  };


	  /**
	   * Day & Week & Month toggle actions
	   */
	  $scope.timelineScoper = function (period)
	  {
	    $scope.timeline.current.day   = current.day;
	    $scope.timeline.current.week  = current.week;
	    $scope.timeline.current.month = current.month;

	    switch (period)
	    {
	      case 'day':
	        $scope.timeline.scope = {
	          day:    true,
	          week:   false,
	          month:  false
	        };

	        timeliner.load({
	          start:  periods.days[$scope.timeline.current.day].first.timeStamp,
	          end:    periods.days[$scope.timeline.current.day].last.timeStamp,
	        });
	      break;

	      case 'week':
	        $scope.timeline.scope = {
	          day:    false,
	          week:   true,
	          month:  false
	        };

	        timeliner.load({
	          start:  periods.weeks[$scope.timeline.current.week].first.timeStamp,
	          end:    periods.weeks[$scope.timeline.current.week].last.timeStamp,
	        });
	      break;

	      case 'month':
	        $scope.timeline.scope = {
	          day:    false,
	          week:   false,
	          month:  true
	        };

	        timeliner.load({
	          start:  periods.months[$scope.timeline.current.month].first.timeStamp,
	          end:    periods.months[$scope.timeline.current.month].last.timeStamp,
	        });
	      break;
	    };
	  };


	  /**
	   * Go one period in past
	   */
	  $scope.timelineBefore = function (timelineScope)
	  {
	    if ($scope.timeline.scope.day)
	    {
	      if ($scope.timeline.current.day != 1)
	      {
	        $scope.timeline.current.day--;

	        timeliner.load({
	          start:  periods.days[$scope.timeline.current.day].first.timeStamp,
	          end:    periods.days[$scope.timeline.current.day].last.timeStamp,
	        });
	      };
	    }
	    else if ($scope.timeline.scope.week)
	    {
	      if ($scope.timeline.current.week != 1)
	      {
	        $scope.timeline.current.week--;

	        timeliner.load({
	          start:  periods.weeks[$scope.timeline.current.week].first.timeStamp,
	          end:    periods.weeks[$scope.timeline.current.week].last.timeStamp,
	        });
	      };
	    }
	    else if ($scope.timeline.scope.month)
	    {
	      if ($scope.timeline.current.month != 1)
	      {
	        $scope.timeline.current.month--;

	        timeliner.load({
	          start:  periods.months[$scope.timeline.current.month].first.timeStamp,
	          end:    periods.months[$scope.timeline.current.month].last.timeStamp,
	        });
	      };
	    };
	  };


	  /**
	   * Go one period in future
	   */
	  $scope.timelineAfter = function (timelineScope)
	  {
	    if ($scope.timeline.scope.day)
	    {
	      /**
	       * Total days in a month can change so get it start periods cache
	       */
	      if ($scope.timeline.current.day != periods.days.total)
	      {
	        $scope.timeline.current.day++;

	        timeliner.load({
	          start:  periods.days[$scope.timeline.current.day].first.timeStamp,
	          end:    periods.days[$scope.timeline.current.day].last.timeStamp,
	        });
	      };
	    }
	    else if ($scope.timeline.scope.week)
	    {
	      if ($scope.timeline.current.week != 53)
	      {
	        $scope.timeline.current.week++;

	        timeliner.load({
	          start:  periods.weeks[$scope.timeline.current.week].first.timeStamp,
	          end:    periods.weeks[$scope.timeline.current.week].last.timeStamp,
	        });
	      };
	    }
	    else if ($scope.timeline.scope.month)
	    {
	      if ($scope.timeline.current.month != 12)
	      {
	        $scope.timeline.current.month++;

	        timeliner.load({
	          start:  periods.months[$scope.timeline.current.month].first.timeStamp,
	          end:    periods.months[$scope.timeline.current.month].last.timeStamp,
	        });
	      };
	    };
	  };


	  /**
	   * Timeline zoom in
	   */
	  $scope.timelineZoomIn = function () { self.timeline.zoom($rootScope.config.timeline.config.zoom, Date.now()) };


	  /**
	   * Timeline zoom out
	   */
	  $scope.timelineZoomOut = function () { self.timeline.zoom(-$rootScope.config.timeline.config.zoom, Date.now()) };


	  /**
	   * Timeline get ranges
	   */
	  function timelineGetRange ()
	  {
	    var range = self.timeline.getVisibleChartRange();

	    $scope.$apply(function ()
	    {
	      $scope.timeline.range = {
	        start:  new Date(range.from).toString(),
	        end:    new Date(range.till).toString()
	      };

	      $scope.daterange = {
	        start:  Dater.readable.date(new Date(range.start).getTime()),
	        end:    Dater.readable.date(new Date(range.end).getTime())
	      };

	    });
	  };


	  /**
	   * Get information of the selected slot
	   */
	  function selectedSlot ()
	  {
	    var selection;

	    /**
	     * TODO
	     * 
	     * Not working!!
	     */
	    timeliner.cancelAdd();

	    if (selection = self.timeline.getSelection()[0])
	    {
	      var values  = self.timeline.getItem(selection.row),
	          content = angular.fromJson(values.content.match(/<span class="secret">(.*)<\/span>/)[1]);

	      $scope.original = {
	        start:        values.start,
	        end:          values.end,
	        content: {
	          recursive:  content.recursive,
	          state:      content.state,
	          id:         content.id
	        }
	      };

	      resetViews();

	      switch (content.type)
	      {
	        case 'slot':
	          $scope.views.slot.edit = true;
	        break;

	        case 'group':
	          $scope.views.group = true;
	        break;

	        case 'wish':
	          $scope.views.wish = true;
	        break;

	        case 'member':
	          $scope.views.member = true;
	        break;
	      };

	      $scope.slot = {
	        start: {
	          date: new Date(values.start).toString($rootScope.config.formats.date),
	          time: new Date(values.start).toString($rootScope.config.formats.time),
	          datetime: new Date(values.start).toISOString()
	        },
	        end: {
	          date: new Date(values.end).toString($rootScope.config.formats.date),
	          time: new Date(values.end).toString($rootScope.config.formats.time),
	          datetime: new Date(values.end).toISOString()
	        },
	        state:      content.state,
	        recursive:  content.recursive,
	        id:         content.id
	      };

	      /**
	       * TODO
	       * Check if this can be combined with switch later on!
	       * Set extra data based slot type for inline form
	       */
	      switch (content.type)
	      {
	        case 'group':
	          $scope.slot.diff  = content.diff;
	          $scope.slot.group = content.group;
	        break;

	        case 'wish':
	          $scope.slot.wish    = content.wish;
	          $scope.slot.group   = content.group;
	          $scope.slot.groupId = content.groupId;
	        break;

	        case 'member':
	          $scope.slot.member = content.mid;
	        break;
	      }

	      return values;
	    };
	  };


	  /**
	   * Timeline on select
	   */
	  function timelineOnSelect ()
	  {
	    $scope.$apply(function ()
	    {
	      $scope.selectedOriginal = selectedSlot();
	    });
	  };


	  /**
	   * Timeline on add
	   */
	  function timelineOnAdd ()
	  {
	    var news = $('.timeline-event-content')
	                .contents()
	                .filter(function ()
	                { 
	                  return this.nodeValue == 'New' 
	                }),
	        values = self.timeline.getItem(self.timeline.getSelection()[0].row);
	      
	    if (news.length > 1) self.timeline.cancelAdd();

	    $scope.$apply(function ()
	    {
	      resetViews();

	      $scope.views.slot.add = true;

	      $scope.slot = {
	        start: {
	          date: new Date(values.start).toString($rootScope.config.formats.date),
	          time: new Date(values.start).toString($rootScope.config.formats.time),
	          datetime: new Date(values.start).toISOString()
	        },
	        end: {
	          date: new Date(values.end).toString($rootScope.config.formats.date),
	          time: new Date(values.end).toString($rootScope.config.formats.time),
	          datetime: new Date(values.end).toISOString()
	        },
	        recursive: (values.group.match(/recursive/)) ? true : false,
	        /**
	         * INFO
	         * First state is hard-coded
	         * Maybe use the first one from array later on?
	         */
	        state: 'com.ask-cs.State.Available'
	      };
	    });
	  };


	  /**
	   * Add slot trigger start view
	   */
	  $scope.add = function (slot)
	  {
	    var now     = Date.now().getTime(),
	        values  = {
	                    start:      ($rootScope.browser.mobile) ? 
	                                  new Date(slot.start.datetime).getTime() / 1000 :
	                                  Dater.convert.absolute(slot.start.date, slot.start.time, true),
	                    end:        ($rootScope.browser.mobile) ? 
	                                  new Date(slot.end.datetime).getTime() / 1000 : 
	                                  Dater.convert.absolute(slot.end.date, slot.end.time, true),
	                    recursive:  (slot.recursive) ? true : false,
	                    text:       slot.state
	                  };

	    if (values.end * 1000 <= now && values.recursive == false)
	    {
	      $rootScope.notifier.error('You can not input timeslots in past.');

	      // timeliner.cancelAdd();
	      timeliner.refresh();
	    }
	    else
	    {
	      $rootScope.statusBar.display($rootScope.ui.planboard.addTimeSlot);

	      Slots.add(values, $rootScope.app.resources.uuid)
	      .then(
	        function (result)
	        {
	          if (result.error)
	          {
	            $rootScope.notifier.error('Error with adding a new timeslot.');
	            console.warn('error ->', result);
	          }
	          else
	          {
	            $rootScope.notifier.success($rootScope.ui.planboard.slotAdded);
	          };

	          timeliner.refresh();
	        }
	      );
	    };
	  };


	  /**
	   * Timeline on change
	   */
	  function timelineOnChange (direct, original, slot, options)
	  {
	    if (!direct)
	    {
	      var values  = self.timeline.getItem(self.timeline.getSelection()[0].row),
	          options = {
	            start:    values.start,
	            end:      values.end,
	            content:  angular.fromJson(values.content.match(/<span class="secret">(.*)<\/span>/)[1])
	          };
	    };

	    var now = Date.now().getTime();

	    if (options.end <= now && options.content.recursive == false)
	    {
	      $rootScope.notifier.error('You can not change timeslots in past.');

	      timeliner.refresh();
	    }
	    else
	    {
	      $rootScope.statusBar.display($rootScope.ui.planboard.changingSlot);

	      Slots.change($scope.original, options, $rootScope.app.resources.uuid)
	      .then(
	        function (result)
	        {
	          if (result.error)
	          {
	            $rootScope.notifier.error('Error with changing timeslot.');
	            console.warn('error ->', result);
	          }
	          else
	          {
	            $rootScope.notifier.success($rootScope.ui.planboard.slotChanged);
	          };

	          timeliner.refresh();
	        }
	      );
	    };
	  };


	  /**
	   * Change slot
	   */
	  $scope.change = function (original, slot)
	  {
	    timelineOnChange(true, original, slot, 
	    {
	      start:  ($rootScope.browser.mobile) ?
	                new Date(slot.start.datetime).getTime() : 
	                Dater.convert.absolute(slot.start.date, slot.start.time, false),
	      end:    ($rootScope.browser.mobile) ? 
	                new Date(slot.end.datetime).getTime() :
	                Dater.convert.absolute(slot.end.date, slot.end.time, false),
	      content: angular.toJson({
	        recursive:  slot.recursive, 
	        state:      slot.state 
	      })
	    });
	  };


	  /**
	   * Set wish
	   */
	  $scope.setWish = function (slot)
	  {
	    $rootScope.statusBar.display($rootScope.ui.planboard.changingWish);

	    Slots.setWish(
	    {
	      id:     slot.groupId,
	      start:  ($rootScope.browser.mobile) ? 
	                new Date(slot.start.datetime).getTime() / 1000 : 
	                Dater.convert.absolute(slot.start.date, slot.start.time, true),
	      end:    ($rootScope.browser.mobile) ? 
	                new Date(slot.end.datetime).getTime() / 1000 : 
	                Dater.convert.absolute(slot.end.date, slot.end.time, true),
	      recursive:  false,
	      // recursive:  slot.recursive,
	      wish:       slot.wish
	    })
	    .then(
	      function (result)
	      {
	        if (result.error)
	        {
	          $rootScope.notifier.error('Error with changing wish value.');
	          console.warn('error ->', result);
	        }
	        else
	        {
	          $rootScope.notifier.success($rootScope.ui.planboard.wishChanged);
	        };

	        timeliner.refresh();
	      }
	    );
	  };


	  /**
	   * Timeline on delete
	   */
	  function timelineOnRemove ()
	  {
	    /**
	     * TODO
	     * Look ways to implement cancelAdd of timeline itself!!
	     */
	    var news = $('.timeline-event-content')
	                .contents()
	                .filter(function ()
	                { 
	                  return this.nodeValue == 'New' 
	                });
	      
	    if (news.length > 0)
	    {
	      self.timeline.cancelAdd();

	      $scope.$apply(function ()
	      {
	        $scope.resetInlineForms();
	      });
	    }
	    else
	    {
	      var now = Date.now().getTime();

	      if ($scope.original.end.getTime() <= now && $scope.original.recursive == false)
	      {
	        $rootScope.notifier.error('You can not delete timeslots in past.');

	        timeliner.refresh();
	      }
	      else
	      {
	        $rootScope.statusBar.display($rootScope.ui.planboard.deletingTimeslot);

	        Slots.remove($scope.original, $rootScope.app.resources.uuid)
	        .then(
	          function (result)
	          {
	            if (result.error)
	            {
	              $rootScope.notifier.error('Error with removing timeslot.');
	              console.warn('error ->', result);
	            }
	            else
	            {
	              $rootScope.notifier.success($rootScope.ui.planboard.timeslotDeleted);
	            };

	            timeliner.refresh();
	          }
	        );
	      };
	    };
	  };


	  /**
	   * Delete trigger start view
	   */
	  $scope.remove = function () { timelineOnRemove() };


	  /**
	   * Redraw timeline on window resize
	   */
	  $window.onresize = function () { self.timeline.redraw() };


	  /**
	   * Group aggs barCharts toggler
	   */
	  $scope.barCharts = function ()
	  {
	    $scope.timeline.config.bar = !$scope.timeline.config.bar;

	    timeliner.render({
	      start:  $scope.timeline.range.start,
	      end:    $scope.timeline.range.end
	    });
	  };
	  

	  /**
	   * Group wishes toggler
	   */
	  $scope.groupWishes = function ()
	  {
	    $scope.timeline.config.wishes = !$scope.timeline.config.wishes;

	    timeliner.render({
	      start:  $scope.timeline.range.start,
	      end:    $scope.timeline.range.end
	    });
	  };
	  

	  /**
	   * Timeline legenda toggler
	   */
	  $scope.showLegenda = function () { $scope.timeline.config.legendarer = !$scope.timeline.config.legendarer; };


	  /**
	   * Alter legenda settings
	   */
	  $scope.alterLegenda = function (legenda)
	  {
	    $scope.timeline.config.legenda = legenda;

	    timeliner.render({
	      start:  $scope.timeline.range.start,
	      end:    $scope.timeline.range.end
	    });
	  };


	  /**
	   * Send shortage message
	   */
	  $scope.sendShortageMessage = function (slot)
	  {
	    $rootScope.statusBar.display($rootScope.ui.planboard.preCompilingStortageMessage);

	    Storage.session.add('escalation', angular.toJson({
	      group: slot.group,
	      start: {
	        date: slot.start.date,
	        time: slot.start.time
	      },
	      end: {
	        date: slot.end.date,
	        time: slot.end.time
	      },
	      diff: slot.diff
	    }));

	    $location.path('/messages').search({ escalate: true }).hash('compose');
	  };


	  /**
	   * Prevent re-rendering issues with timeline
	   */
	  $scope.destroy = {
	    timeline: function ()
	    {
	      // Not working !! :(
	      // Sloter.pies($scope.data);
	    },
	    statistics: function ()
	    {
	      setTimeout(function ()
	      {
	        timeliner.redraw();
	      }, 10);
	    }
	  };
	}
])


/**
 * Messages controller
 */
.controller('messages', 
[
	'$scope', '$rootScope', '$q', '$location', '$route', 'data', 'Messages', 'Storage', 
	function ($scope, $rootScope, $q, $location, $route, data, Messages, Storage) 
	{
	  /**
	   * Fix styles
	   */
	  $rootScope.fixStyles();

	  
	  /**
	   * Self this
	   */
	  var self = this;


	  /**
	   * Receivers list
	   */
	  $scope.receviersList = Messages.receviers();


	  /**
	   * Set messages
	   */
	  $scope.messages = data;


	  /**
	   * Selections
	   */
	  $scope.selection = {
	    inbox: {},
	    outbox: {},
	    trash: {}
	  };


	  /**
	   * Selection masters
	   */
	  $scope.selectionMaster = {
	    inbox: '',
	    outbox: '',
	    trash: ''
	  };


	  /**
	   * Initial value for broadcasting
	   */
	  $scope.broadcast = {
	    sms: false,
	    email: false
	  };


	  /**
	   * Set origin container for returning back to origin box
	   */
	  $scope.origin = 'inbox';


	  /**
	   * View setter
	   */
	  function setView (hash)
	  {
	    $scope.views = {
	      compose: false,
	      message: false,
	      inbox:   false,
	      outbox:  false,
	      trash:   false
	    };

	    $scope.views[hash] = true;
	  };


	  /**
	   * Switch between the views and set hash accordingly
	   */
	  $scope.setViewTo = function (hash)
	  {
	    $scope.$watch(hash, function ()
	    {
	      $location.hash(hash);

	      setView(hash);
	    });
	  };


	  /**
	   * If no params or hashes given in url
	   */
	  if (!$location.hash())
	  {
	    var view = 'inbox';

	    $location.hash('inbox');
	  }
	  else
	  {
	    var view = $location.hash();
	  };


	  /**
	   * Set view
	   */
	  setView(view);

	    
	  /**
	   * Extract view action from url and set message view
	   */
	  if ($location.search().uuid) setMessageView($location.search().uuid);


	  /**
	   * TODO
	   * Possible bug..
	   * Still issues with changing state of the message
	   * 
	   * Set given group for view
	   */
	  function setMessageView (id)
	  {
	    $rootScope.statusBar.display($rootScope.ui.message.loadingMessage);

	    setView('message');

	    $scope.setViewTo('message');

	    $scope.message = Messages.find(id);

	    /**
	     * Change to read if message not seen yet
	     * Check only in inbox because other box messages
	     * can have 'NEW' state as well but those states are not shown
	     *
	     * Maybe only for 'trash' box to show state in later stages
	     */
	    if ($scope.message.state == "NEW" && $scope.message.box == 'inbox')
	    {
	      Messages.changeState([id], 'READ')
	      .then(function (result)
	      {
	        if (result.error)
	        {
	          $rootScope.notifier.error('Error with changing message state.');
	          console.warn('error ->', result);
	        }
	        else
	        {
	          console.log('state changed');
	        };
	      });

	      var _inbox = [];

	      angular.forEach($scope.messages.inbox, function (message, index)
	      {
	        if (message.uuid == $scope.message.uuid)
	        {
	          message.state = "READ";
	        };

	        _inbox.push(message);
	      });

	  	  $scope.messages.inbox = _inbox;

	      Messages.unreadCount(); 
	    };

	    $rootScope.statusBar.off();
	  };


	  /**
	   * Request for a message
	   */
	  $scope.requestMessage = function (current, origin)
	  {
	    $scope.origin = origin;

	    setMessageView(current);

	    $scope.$watch($location.search(), function ()
	    {
	      $location.search({uuid: current});
	    });
	  };


	  /**
	   * Compose message view toggler
	   */
	  $scope.composeMessage = function ()
	  {
	    if ($scope.views.compose)
	    {
	      $scope.closeTabs();
	    }
	    else
	    {
	      $scope.message = {};

	      $scope.setViewTo('inbox');
	    };

	  };


	  /**
	   * Reset views
	   */
	  $scope.closeTabs = function ()
	  {
	    $scope.message = {};

	    $location.search({});

	    setView($scope.origin);

	    $scope.setViewTo($scope.origin);

	    Storage.session.remove('escalation');
	  };


	  /**
	   * Toggle selections
	   */
	  $scope.toggleSelection = function (messages, inbox, master)
	  {
	    var flag = (master) ? true : false;

	    angular.forEach(messages, function (message, index)
	    {
	      $scope.selection[inbox][message.uuid] = flag;
	    });
	  };


	  /**
	   * Remove message
	   */
	  $scope.removeMessage = function (id)
	  {
	    $rootScope.statusBar.display($rootScope.ui.message.removing);

	    var bulk = [];

	    bulk.push(id);

	    Messages.remove(bulk)
	    .then(function (result)
	    {
	      if (result.error)
	      {
	        $rootScope.notifier.error('Error with removing message.');
	        console.warn('error ->', result);
	      }
	      else
	      {
	        $rootScope.notifier.success($rootScope.ui.message.removed);

	        $rootScope.statusBar.display($rootScope.ui.message.refreshing);

	        Messages.query()
	        .then(function (messages)
	        {
	          $scope.messages = messages;

	          $rootScope.loading = false;

	          $scope.closeTabs();

	          $rootScope.statusBar.off();
	        });
	      };
	    });
	  };


	  /**
	   * Remove messages
	   */
	  $scope.removeMessages = function (selection)
	  {
	    // console.log('it is coming to bulk remove ->', selection.length);

	    $rootScope.statusBar.display($rootScope.ui.message.removingSelected);

	    var ids = [];

	    angular.forEach(selection, function (flag, id)
	    {
	      if (flag) ids.push(id);
	    });

	    Messages.remove(ids)
	    .then(function (result)
	    {
	      if (result.error)
	      {
	        $rootScope.notifier.error('Error with removing messages.');
	        console.warn('error ->', result);
	      }
	      else
	      {
	        $rootScope.notifier.success($rootScope.ui.message.removed);

	        $rootScope.statusBar.display($rootScope.ui.message.refreshing);

	        Messages.query()
	        .then(function (messages)
	        {
	          $scope.messages = messages;

	          $rootScope.statusBar.off();
	        });
	      };
	    });
	  };


	  /**
	   * Restore a message
	   */
	  $scope.restoreMessage = function (id)
	  {
	    $rootScope.statusBar.display($rootScope.ui.message.restoring);

	    var bulk = [];

	    bulk.push(id);

	    Messages.restore(bulk)
	    .then(function (result)
	    {
	      if (result.error)
	      {
	        $rootScope.notifier.error('Error with restoring message.');
	        console.warn('error ->', result);
	      }
	      else
	      {
	        $rootScope.notifier.success($rootScope.ui.message.restored);

	        $rootScope.statusBar.display($rootScope.ui.message.refreshing);

	        Messages.query()
	        .then(function(messages)
	        {
	          $scope.messages = messages;

	          $rootScope.statusBar.off();
	        });
	      };
	    });
	  };


	  /**
	   * Restore messages
	   */
	  $scope.restoreMessages = function (selection)
	  {
	    $rootScope.statusBar.display($rootScope.ui.message.restoringSelected);

	    var ids = [];

	    angular.forEach(selection, function (flag, id)
	    {
	      if (flag) ids.push(id);
	    });

	    Messages.restore(ids)
	    .then(function (result)
	    {
	      if (result.error)
	      {
	        $rootScope.notifier.error('Error with restoring message.');
	        console.warn('error ->', result);
	      }
	      else
	      {
	        $rootScope.notifier.success($rootScope.ui.message.removed);

	        $rootScope.statusBar.display($rootScope.ui.message.refreshing);

	        Messages.query()
	        .then(function(messages)
	        {
	          $scope.messages = messages;

	          $rootScope.statusBar.off();
	        });
	      };      
	    });
	  };


	  /**
	   * Empty trash
	   */
	  $scope.emptyTrash = function ()
	  {
	    $rootScope.statusBar.display($rootScope.ui.message.emptying);

	    Messages.emptyTrash()
	    .then(function (result)
	    {
	      if (result.error)
	      {
	        $rootScope.notifier.error('Error with emting trash.');
	        console.warn('error ->', result);
	      }
	      else
	      {
	        $rootScope.notifier.success($rootScope.ui.message.empited);

	        $rootScope.statusBar.display($rootScope.ui.message.refreshing);

	        Messages.query()
	        .then(function (messages)
	        {
	          if (messages.error)
	          {
	            $rootScope.notifier.error('Error with getting messages.');
	            console.warn('error ->', messages);
	          }
	          else
	          {
	            $scope.messages = messages;

	            $rootScope.statusBar.off();
	          };
	        });
	      };
	    });    
	  };



		/**
	   * Fix for not displaying original sender in multiple receivers selector
	   * in the case that user wants to add more receivers to the list  
	   */
	  $("div#composeTab select.chzn-select").chosen()
	  .change(function (item)
	  {
	  	$.each($(this).next().find("ul li.result-selected"), function (i,li)
	    {
	  		var name = $(li).html();

	  		$.each($("div#composeTab select.chzn-select option"), function (j,opt)
	      {
		      if(opt.innerHTML == name) opt.selected = true;
		    });
	  	});
	  });


	  /**
	   * Reply a amessage
	   */
	  $scope.reply = function(message)
	  {
	    setView('compose');

	    $scope.setViewTo('compose');

	    var members = angular.fromJson(Storage.get('members')),
	        senderId = message.requester.split('personalagent/')[1].split('/')[0],
	        name = (typeof members[senderId] == 'undefined' ) ? senderId : members[senderId].name;

	    $scope.message = {
	      subject: 'RE: ' + message.subject,
	      receivers: [{
	        group: 'Users', 
	        id: senderId , 
	        name: name
	      }]
	    };

	    angular.forEach($("div#composeTab select.chzn-select option"), function (option, index)
	    {
	      if (option.innerHTML == name) option.selected = true;
	    });

	    $("div#composeTab select.chzn-select").trigger("liszt:updated");
	  };

	  
	  /**
	   * Send message
	   */
	  $scope.send = function (message, broadcast)
	  {
	    $rootScope.statusBar.display($rootScope.ui.message.sending);

	    if (message.receivers)
	    {
	      Messages.send(message, broadcast)
	      .then(function (uuid)
	      {
	        if (uuid.error)
	        {
	          $rootScope.notifier.error('Error with sending message.');
	          console.warn('error ->', uuid);
	        }
	        else
	        {
	          $rootScope.notifier.success($rootScope.ui.message.sent);

	          $rootScope.statusBar.display($rootScope.ui.message.refreshing);

	          Messages.query()
	          .then(function (messages)
	          {
	            if (messages.error)
	            {
	              $rootScope.notifier.error('Error with getting messages.');
	              console.warn('error ->', messages);
	            }
	            else
	            {
	              $scope.messages = messages;

	              $scope.closeTabs();

	              $scope.requestMessage(uuid, $scope.origin);

	              $rootScope.statusBar.off();
	            };
	          });
	        };
	      });
	    }
	    else
	    {
	      $rootScope.notifier.error($rootScope.ui.message.noReceivers);

	      $rootScope.statusBar.off();
	    };
	  };

	    
	  /**
	   * Extract escalation information
	   */
	  if ($location.search().escalate)
	  {
	    var escalation = angular.fromJson(Storage.session.get('escalation')),
	        name = escalation.group.split('>')[1].split('<')[0],
	        uuid = escalation.group.split('uuid=')[1].split('#view')[0];

	    setTimeout (function ()
	    {
	      angular.forEach($("div#composeTab select.chzn-select option"), function (option, index)
	      {
	        if (option.innerHTML == name) option.selected = true;
	      });

	      $("div#composeTab select.chzn-select").trigger("liszt:updated");
	    }, 100);

	    $scope.message = {
	      subject: $rootScope.ui.message.escalation,
	      receivers: [{
	        group: 'Groups', 
	        id: uuid, 
	        name: name
	      }],
	      body: $rootScope.ui.message.escalationBody(
	        escalation.diff, 
	        escalation.start.date, 
	        escalation.start.time,
	        escalation.end.date,
	        escalation.end.time)
	    };

	    $scope.broadcast = {
	      sms: true
	    };
	  };
	}
])



/**
 * Groups controller
 */
.controller('groups', 
[
	'$rootScope', '$scope', '$location', 'data', 'Groups', 'Profile', '$route', '$routeParams', 'Storage', 'Slots', 
	function ($rootScope, $scope, $location, data, Groups, Profile, $route, $routeParams, Storage, Slots) 
	{
	  /**
	   * Fix styles
	   */
	  $rootScope.fixStyles();

	  
	  /**
	   * Self this
	   */
		var self = this,
	      params = $location.search();


	  /**
	   * Init search query
	   */
	  $scope.search = {
	    query: ''
	  };


	  /**
	   * Reset selection
	   */
	  $scope.selection = {};


	  /**
	   * Set groups
	   */
	  $scope.data = data;


	  /**
	   * Grab and set roles for view
	   */
	  $scope.roles = $rootScope.config.roles;


	  /**
	   * Groups for dropdown
	   */
	  $scope.groups = data.groups;


	  /**
	   * If no params or hashes given in url
	   */
	  if (!params.uuid && !$location.hash())
	  {
	    var uuid = data.groups[0].uuid,
	        view = 'view';

	    $location.search({uuid: data.groups[0].uuid}).hash('view');
	  }
	  else
	  {
	    var uuid = params.uuid,
	        view = $location.hash();
	  };


	  /**
	   * Set group
	   */
	  setGroupView(uuid);


	  /**
	   * Set view
	   */
	  setView(view);


	  /**
	   * Set given group for view
	   */
	  function setGroupView (id)
	  {
	    angular.forEach(data.groups, function (group, index)
	    {
	      if (group.uuid == id) $scope.group = group;
	    });

	    $scope.members = data.members[id];

	    $scope.current = id;

	    wisher(id);
	  };


	  function wisher (id)
	  {
	    $scope.wished = false;

	    Groups.wish(id)
	    .then(function (wish)
	    {
	      $scope.wished = true;

	      $scope.wish = wish.count;

	      $scope.popover = {
	        id: id,
	        wish: wish.count
	      }
	    });
	  }


	  /**
	   * Set wish for the group
	   */
	  $scope.saveWish = function (id, wish)
	  {
	    console.warn('setting the wish:' + wish + ' for the group:', id);
	    
	    $rootScope.statusBar.display($rootScope.ui.planboard.changingWish);

	    Slots.setWish(
	    {
	      id:     id,
	      start:  255600,
	      end:    860400,
	      recursive:  true,
	      wish:   wish
	    })
	    .then(
	      function (result)
	      {
	        if (result.error)
	        {
	          $rootScope.notifier.error('Error with changing wish value.');
	          console.warn('error ->', result);
	        }
	        else
	        {
	          $rootScope.notifier.success($rootScope.ui.planboard.wishChanged);
	        };

	        wisher(id);
	      }
	    );

	  };


	  /**
	   * Request for a group
	   */
	  $scope.requestGroup = function (current, switched)
	  {
	    setGroupView(current);

	    $scope.$watch($location.search(), function ()
	    {
	      $location.search({uuid: current});
	    });

	    if (switched)
	    {
	      if ($location.hash() != 'view') $location.hash('view');

	      setView('view');
	    };
	  };
	  

	  /**
	   * View setter
	   */
	  function setView (hash)
	  {
	    $scope.views = {
	      view:   false,
	      add:    false,
	      edit:   false,
	      search: false,
	      member: false
	    };

	    $scope.views[hash] = true;
	  };


	  /**
	   * Switch between the views and set hash accordingly
	   */
	  $scope.setViewTo = function (hash)
	  {
	    $scope.$watch(hash, function ()
	    {
	      $location.hash(hash);

	      setView(hash);
	    });
	  };


	  /**
	   * Toggle new group button
	   */
	  $scope.addGroupForm = function ()
	  {
	    if ($scope.views.add)
	    {
	      $scope.closeTabs();
	    }
	    else
	    {
	      $scope.groupForm = {};

	      $scope.setViewTo('add');
	    };
	  };


	  /**
	   * New member
	   */
	  $scope.newMemberForm = function ()
	  {
	    if ($scope.views.member)
	    {
	      $scope.closeTabs();
	    }
	    else
	    {
	      $scope.memberForm = {};

	      $scope.setViewTo('member');
	    };
	  };


	  /**
	   * Edit a group
	   */
	  $scope.editGroup = function (group)
	  {
	    $scope.setViewTo('edit');

	    $scope.groupForm = {
	      id: group.uuid,
	      name: group.name
	    }; 
	  };


	  /**
	   * Close inline form
	   */
	  $scope.closeTabs = function ()
	  {
	    $scope.groupForm = {};

	    $scope.memberForm = {};

	    $scope.setViewTo('view');
	  };


	  /**
	   * Search for members
	   */
	  $scope.searchMembers = function (query)
	  {
	    $rootScope.statusBar.display($rootScope.ui.groups.searchingMembers);

	    Groups.search(query).
	    then(function (result)
	    {
	      if (result.error)
	      {
	        $rootScope.notifier.error('Error with search.');
	        console.warn('error ->', result);
	      }
	      else
	      {
	        $scope.search = {
	          query: '',
	          queried: query
	        };

	        $scope.candidates = result;

	        $scope.setViewTo('search');

	        $rootScope.statusBar.off();
	      };
	    });
	  };


	  /**
	   * Add member to a group
	   */
	  $scope.addMember = function (candidate)
	  {
	    $rootScope.statusBar.display($rootScope.ui.groups.addingNewMember);

	    Groups.addMember(candidate).
	    then(function (result)
	    {
	      if (result.error)
	      {
	        $rootScope.notifier.error('Error with adding a member.');
	        console.warn('error ->', result);
	      }
	      else
	      {
	        $rootScope.notifier.success($rootScope.ui.groups.memberAdded);

	        $rootScope.statusBar.display($rootScope.ui.groups.refreshingGroupMember);

	        Groups.query().
	        then(function (data)
	        {
	          if (data.error)
	          {
	            $rootScope.notifier.error('Error with getting groups and users.');
	            console.warn('error ->', data);
	          }
	          else
	          {
	            $scope.data = data;

	            $rootScope.statusBar.off();
	          };
	        });
	      };
	    });
	  };


	  /**
	   * Remove member from a group
	   */
	  $scope.removeMember = function (member, group)
	  {
	    $rootScope.statusBar.display($rootScope.ui.groups.removingMember);

	    Groups.removeMember(member, group).
	    then(function (result)
	    {
	      if (result.error)
	      {
	        $rootScope.notifier.error('Error with removing a member.');
	        console.warn('error ->', result);
	      }
	      else
	      {
	        $rootScope.notifier.success($rootScope.ui.groups.memberRemoved);

	        $rootScope.statusBar.display($rootScope.ui.groups.refreshingGroupMember);

	        Groups.query().
	        then(function (data)
	        {
	          if (data.error)
	          {
	            $rootScope.notifier.error('Error with getting groups and users.');
	            console.warn('error ->', data);
	          }
	          else
	          {
	            $scope.data = data;

	            $rootScope.statusBar.off();
	          };
	        });
	      };
	    });
	  };


	  /**
	   * Remove members
	   */
	  $scope.removeMembers = function (selection, group)
	  {
	    $rootScope.statusBar.display($rootScope.ui.groups.removingSelected);

	    Groups.removeMembers(selection, group).
	    then(function (result)
	    {
	      if (result.error)
	      {
	        $rootScope.notifier.error('Error with removing members.');
	        console.warn('error ->', result);
	      }
	      else
	      {
	        $rootScope.notifier.success($rootScope.ui.groups.removed);

	        $rootScope.statusBar.display($rootScope.ui.groups.refreshingGroupMember);

	        $scope.selection = {};

	        Groups.query().
	        then(function (data)
	        {
	          if (data.error)
	          {
	            $rootScope.notifier.error('Error with getting groups and users.');
	            console.warn('error ->', data);
	          }
	          else
	          {
	            $scope.data = data;

	            $rootScope.statusBar.off();
	          };
	        });
	      };
	    });

	    /**
	     * TODO
	     * not working to reset master checkbox!
	     */
	    //$scope.selectionMaster = {};
	  };


	  /**
	   * Save a group
	   */
	  $scope.groupSubmit = function (group)
	  {
	    $rootScope.statusBar.display($rootScope.ui.groups.saving);

	    Groups.save(group).
	    then(function (returned)
	    {
	      if (returned.error)
	      {
	        $rootScope.notifier.error('Error with saving group.');
	        console.warn('error ->', returned);
	      }
	      else
	      {
	        $rootScope.notifier.success($rootScope.ui.groups.groupSaved);

	        $rootScope.statusBar.display($rootScope.ui.groups.refreshingGroupMember);

	        Groups.query().
	        then(function (data)
	        {
	          if (data.error)
	          {
	            $rootScope.notifier.error('Error with getting groups and users.');
	            console.warn('error ->', data);
	          }
	          else
	          {
	            $scope.closeTabs();

	            $scope.data = data;

	            angular.forEach(data.groups, function (group, index)
	            {
	              if (group.uuid == returned)
	              {
	                $scope.groups = data.groups;

	                angular.forEach(data.groups, function (g, index)
	                {
	                  if (g.uuid == group.uuid) $scope.group = g;
	                });

	                $scope.members = data.members[group.uuid];

	                $scope.current = group.uuid;

	                $scope.$watch($location.search(), function ()
	                {
	                  $location.search({uuid: group.uuid});
	                }); // end of watch

	              }; // end of if

	            }); // end of foreach

	            $rootScope.statusBar.off();
	          };
	        });
	      };
	    });
	  };


	  /**
	   * Save a member
	   */
	  $scope.memberSubmit = function (member)
	  {
	    $rootScope.statusBar.display($rootScope.ui.groups.registerNew);

	    Profile.register(member).
	    then(function (result)
	    {
	      if (result.error)
	      {
	        $rootScope.notifier.error('Error with registering a member.');
	        console.warn('error ->', result);
	      }
	      else
	      {
	        $rootScope.notifier.success($rootScope.ui.groups.memberRegstered);

	        $rootScope.statusBar.display($rootScope.ui.groups.refreshingGroupMember);

	        Groups.query().
	        then(function (data)
	        {
	          if (data.error)
	          {
	            $rootScope.notifier.error('Error with getting groups and users.');
	            console.warn('error ->', data);
	          }
	          else
	          {
	            $scope.data = data;

	            $location.path('/profile/' + member.username).hash('profile');

	            $rootScope.statusBar.off();
	          };
	        });
	      };
	    });
	  };


	  /**
	   * Delete a group
	   */
	  $scope.deleteGroup = function (id)
	  {
	    $rootScope.statusBar.display($rootScope.ui.groups.deleting);

	    Groups.remove(id).
	    then(function (result)
	    {
	      if (result.error)
	      {
	        $rootScope.notifier.error('Error with deleting a group.');
	        console.warn('error ->', result);
	      }
	      else
	      {
	        $rootScope.notifier.success($rootScope.ui.groups.deleted);

	        $rootScope.statusBar.display($rootScope.ui.groups.refreshingGroupMember);

	        Groups.query().
	        then(function (data)
	        {
	          if (data.error)
	          {
	            $rootScope.notifier.error('Error with getting groups and users.');
	            console.warn('error ->', data);
	          }
	          else
	          {
	            $scope.data = data;

	            angular.forEach(data.groups, function (group, index)
	            {
	              $scope.groups = data.groups;

	              $scope.group = data.groups[0];

	              $scope.members = data.members[data.groups[0].uuid];

	              $scope.current = data.groups[0].uuid;

	              $scope.$watch($location.search(), function ()
	              {
	                $location.search({uuid: data.groups[0].uuid});
	              }); // end of watch
	            }); // end of foreach

	            $rootScope.statusBar.off();
	          };
	        });
	      };

	    });
	  };


	  /**
	   * Selection toggler
	   */
	  $scope.toggleSelection = function (group, master)
	  {
	    var flag = (master) ? true : false,
	        members = angular.fromJson(Storage.get(group.uuid));

	    angular.forEach(members, function (member, index)
	    {
	      $scope.selection[member.uuid] = flag;
	    });
	  };


	  /**
	   * Not used in groups yet but login uses modal call..
	   * 
	   * Fetch parent groups
	   */
	  $scope.fetchParent = function ()
	  {
	    Groups.parents()
	    .then(function (result)
	    {
	      console.warn('parent -> ', result);
	    });
	  };

	  /**
	   * Not used in groups yet..
	   * 
	   * Fetch parent groups
	   */
	  $scope.fetchContainers = function (id)
	  {
	    Groups.containers(id)
	    .then(function (result)
	    {
	      console.warn('containers -> ', result);
	    });
	  };

	}
])



/**
 * Profile controller
 */
.controller('profile', 
[
	'$rootScope', '$scope', '$q', '$location', '$window', '$route', 'data', 'Profile', 'Storage', 'Groups', 'Dater', 'Slots', 'Sloter', 'MD5', 
	function ($rootScope, $scope, $q, $location, $window, $route, data, Profile, Storage, Groups, Dater, Slots, Sloter, MD5) 
	{
	  /**
	   * Fix styles
	   */
	  $rootScope.fixStyles();

	  /**
	   * Self this
	   */
		var self = this,
	      periods = Dater.getPeriods(),
	      current = {
	        day:    Date.today().getDayOfYear() + 1,
	        week:   new Date().getWeek(),
	        month:  new Date().getMonth() + 1
	      };


	  /**
	   * Set data for view
	   */
	  $scope.data = data;


	  /**
	   * Set user
	   */
	  $scope.user = { id: $route.current.params.userId };


	  /**
	   * Get groups of user
	   */
	  $scope.groups = Groups.getMemberGroups($route.current.params.userId);


	  /**
	   * Default values for passwords
	   */
	  $scope.passwords = {
	    current: '',
	    new1: '',
	    new2: ''
	  };


	  /**
	   * Default form views
	   */
	  $scope.forms = {
	    add:  false,
	    edit: false
	  };


	  /**
	   * Slot form toggler
	   */
	  $scope.toggleSlotForm = function ()
	  {
	    if ($scope.forms.add)
	    {
	      $scope.resetInlineForms();
	    }
	    else
	    {
	      $scope.slot = {};

	      $scope.forms = {
	        add: true,
	        edit: false
	      };
	    }
	  };


	  /**
	   * Reset inline forms
	   */
	  $scope.resetInlineForms = function ()
	  {
	    $scope.slot = {};

	    $scope.original = {};

	    $scope.forms = {
	      add:  false,
	      edit: false
	    };
	  };


	  /**
	   * Extract view action from url and set view
	   */
	  setView($location.hash());


	  /**
	   * View setter
	   */
	  function setView (hash)
	  {
	    $scope.views = {
	      profile:  false,
	      edit:     false,
	      password: false,
	      timeline: false
	    };

	    $scope.views[hash] = true;

	    $scope.views.user = ($rootScope.app.resources.uuid == $route.current.params.userId) ? true : false;
	  };


	  /**
	   * Switch between the views and set hash ccordingly
	   */
	  $scope.setViewTo = function (hash)
	  {
	    $scope.$watch($location.hash(), function ()
	    {
	      $location.hash(hash);

	      setView(hash);
	    });
	  };


	  /**
	   * Save user
	   */
	  $scope.save = function (resources)
	  {
	    $rootScope.statusBar.display($rootScope.ui.profile.saveProfile);

	    Profile.save($route.current.params.userId, resources)
	    .then(function (result)
	    {
	      if (result.error)
	      {
	        $rootScope.notifier.error('Error with saving profile information.');
	        console.warn('error ->', result);
	      }
	      else
	      {
	        $rootScope.statusBar.display($rootScope.ui.profile.refreshing);

	        var flag = ($route.current.params.userId == $rootScope.app.resources.uuid) ? true : false;

	        Profile.get($route.current.params.userId, flag)
	        .then(function (data)
	        {
	          if (data.error)
	          {
	            $rootScope.notifier.error('Error with getting profile data.');
	            console.warn('error ->', data);
	          }
	          else
	          {
	            $rootScope.notifier.success($rootScope.ui.profile.dataChanged);

	            $scope.data = data;

	            $rootScope.statusBar.off();
	          };
	        });
	      };
	    });
	  };


	  /**
	   * Change passwords
	   */
	  $scope.change = function (passwords)
	  {
	    if (passwords.new1 == '' || passwords.new2 == '')
	    {
	      $rootScope.notifier.error($rootScope.ui.profile.pleaseFill, true);

	      return false;
	    };

	    if (passwords.new1 != passwords.new2)
	    {
	      $rootScope.notifier.error($rootScope.ui.profile.passNotMatch, true);

	      return false;
	    }
	    else if ($rootScope.app.resources.askPass == MD5(passwords.current))
	    {
	      $rootScope.statusBar.display($rootScope.ui.profile.changingPass);

	      Profile.changePassword(passwords)
	      .then(function (result)
	      {
	        if (result.error)
	        {
	          $rootScope.notifier.error('Error with changing password.');
	          console.warn('error ->', result);
	        }
	        else
	        {
	          $rootScope.statusBar.display($rootScope.ui.profile.refreshing);

	          Profile.get($rootScope.app.resources.uuid, true)
	          .then(function (data)
	          {
	            if (data.error)
	            {
	              $rootScope.notifier.error('Error with getting profile data.');
	              console.warn('error ->', data);
	            }
	            else
	            {
	              $rootScope.notifier.success($rootScope.ui.profile.passChanged);

	              $scope.data = data;

	              $rootScope.statusBar.off();
	            };
	          });
	        };
	      });
	    }
	    else
	    {
	      $rootScope.notifier.error($rootScope.ui.profile.passwrong, true);
	    };
	  };
	  

	  /**
	   * Timeline (The big boy)
	   */
	  var timeliner = {

	    /**
	     * Init timeline
	     */
	    init: function ()
	    {
	      $scope.timeline = {
	        current: current,
	        options: {
	          start:  new Date(periods.weeks[current.week].first.day),
	          end:    new Date(periods.weeks[current.week].last.day),
	          min:    new Date(periods.weeks[current.week].first.day),
	          max:    new Date(periods.weeks[current.week].last.day)
	        },
	        range: {
	          start: periods.weeks[current.week].first.day,
	          end: periods.weeks[current.week].last.day
	        },
	        config: {
	          legenda:    {},
	          legendarer: $rootScope.config.timeline.config.legendarer,
	          states:     $rootScope.config.timeline.config.states
	        }
	      };

	      var states = {};

	      angular.forEach($scope.timeline.config.states, function (state, key) { states[key] = state.label; });

	      $scope.states = states;

	      angular.forEach($rootScope.config.timeline.config.states, function (state, index)
	      {
	        $scope.timeline.config.legenda[index] = true;
	      });

	      $('#timeline').html('');
	      $('#timeline').append('<div id="userTimeline"></div>');

	      self.timeline = new links.Timeline(document.getElementById('userTimeline'));

	      links.events.addListener(self.timeline, 'rangechanged',  timelineGetRange);
	      links.events.addListener(self.timeline, 'add',           timelineOnAdd);
	      links.events.addListener(self.timeline, 'delete',        timelineOnDelete);
	      links.events.addListener(self.timeline, 'change',        timelineOnChange);
	      links.events.addListener(self.timeline, 'select',        timelineOnSelect);

	      this.render($scope.timeline.options);
	    },

	    /**
	     * Render or re-render timeline
	     */
	    render: function (options)
	    {
	      angular.extend($scope.timeline.options, $rootScope.config.timeline.options);

	      setTimeout( function() 
	      {
	        self.timeline.draw(
	          Sloter.profile(
	            $scope.data.slots.data, 
	            $scope.timeline.config
	          ), $scope.timeline.options);
	      }, 100);

	      self.timeline.setVisibleChartRange($scope.timeline.options.start, $scope.timeline.options.end);

	      $scope.synced = data.synced;
	    },

	    /**
	     * Grab new timeline data from backend and render timeline again
	     */
	    load: function (stamps)
	    {
	      var _this = this;

	      $rootScope.statusBar.display($rootScope.ui.planboard.refreshTimeline);

	      Profile.getSlots($scope.user.id, stamps)
	      .then(function (data)
	      {
	        $scope.data.slots = data.slots;

	        $scope.synced = data.synced;

	        _this.render(stamps);

	        $rootScope.statusBar.off();
	      });
	    },

	    /**
	     * Refresh timeline as it is
	     */
	    refresh: function ()
	    {
	      $scope.slot = {};

	      $scope.forms = {
	        add:  true,
	        edit: false
	      };

	      this.load({
	        start:  data.periods.start,
	        end:    data.periods.end
	      });
	    }
	  };


	  /**
	   * Render timeline if hash is timeline
	   */
	  if ($location.hash() == 'timeline') timeliner.init();


	  /**
	   * Redraw timeline
	   */
	  $scope.redraw = function () { timeliner.init() };


	  /**
	   * Watch for changes in timeline range
	   */
	  $scope.$watch(function ()
	  {
	    if ($location.hash() == 'timeline')
	    {
	      var range = self.timeline.getVisibleChartRange();

	      $scope.timeline.range = {
	        start:  new Date(range.start).toString(),
	        end:    new Date(range.end).toString()
	      };
	    };
	  });


	  /**
	   * Timeline get ranges
	   */
	  function timelineGetRange ()
	  {
	    var range = self.timeline.getVisibleChartRange();

	    $scope.$apply(function ()
	    {
	      $scope.timeline.range = {
	        start:  new Date(range.from).toString(),
	        end:    new Date(range.till).toString()
	      };
	    });
	  };


	  /**
	   * Get information of the selected slot
	   */
	  function selectedSlot ()
	  {
	    var selection;

	    if (selection = self.timeline.getSelection()[0])
	    {
	      var values  = self.timeline.getItem(selection.row),
	          content = angular.fromJson(values.content.match(/<span class="secret">(.*)<\/span>/)[1]);

	      $scope.original = {
	        start:        values.start,
	        end:          values.end,
	        content: {
	          recursive:  content.recursive,
	          state:      content.state,
	          id:         content.id
	        }
	      };

	      /**
	       * TODO
	       * Convert to resetview?
	       */
	      $scope.forms = {
	        add:  false,
	        edit: true
	      };

	      $scope.slot = {
	        start: {
	          date: new Date(values.start).toString($rootScope.config.formats.date),
	          time: new Date(values.start).toString($rootScope.config.formats.time),
	          datetime: new Date(values.start).toISOString()

	        },
	        end: {
	          date: new Date(values.end).toString($rootScope.config.formats.date),
	          time: new Date(values.end).toString($rootScope.config.formats.time),
	          datetime: new Date(values.end).toISOString()
	        },
	        state:      content.state,
	        recursive:  content.recursive,
	        id:         content.id
	      };

	      return values;
	    };
	  };


	  /**
	   * Timeline on select
	   */
	  function timelineOnSelect ()
	  {
	    $scope.$apply(function ()
	    {
	      $scope.selectedOriginal = selectedSlot();
	    });
	  };


	  /**
	   * Timeline on add
	   */
	  function timelineOnAdd ()
	  {
	    var news = $('.timeline-event-content')
	                .contents()
	                .filter(function () { return this.nodeValue == 'New' }),
	        values = self.timeline.getItem(self.timeline.getSelection()[0].row);
	      
	    if (news.length > 1) self.timeline.cancelAdd();

	    $scope.$apply(function ()
	    {
	      $scope.forms = {
	        add:  true,
	        edit: false
	      };

	      $scope.slot = {
	        start: {
	          date: new Date(values.start).toString($rootScope.config.formats.date),
	          time: new Date(values.start).toString($rootScope.config.formats.time),
	          datetime: new Date(values.start).toISOString()
	        },
	        end: {
	          date: new Date(values.end).toString($rootScope.config.formats.date),
	          time: new Date(values.end).toString($rootScope.config.formats.time),
	          datetime: new Date(values.end).toISOString()
	        },
	        recursive: (values.group.match(/recursive/)) ? true : false,
	        /**
	         * INFO
	         * First state is hard-coded
	         * Maybe use the first one from array later on?
	         */
	        state: 'com.ask-cs.State.Available'
	      };
	    });
	  };


	  /**
	   * Add slot trigger start view
	   */
	  $scope.slotAdd = function (slot)
	  {
	    $rootScope.statusBar.display($rootScope.ui.planboard.addTimeSlot);

	    Slots.add(
	    {
	      start:      ($rootScope.browser.mobile) ? 
	                    new Date(slot.start.datetime).getTime() / 1000 :
	                    Dater.convert.absolute(slot.start.date, slot.start.time, true),
	      end:        ($rootScope.browser.mobile) ? 
	                    new Date(slot.end.datetime).getTime() / 1000 : 
	                    Dater.convert.absolute(slot.end.date, slot.end.time, true),
	      recursive:  (slot.recursive) ? true : false,
	      text:       slot.state
	    }, 
	    $scope.user.id)
	    .then(function (result)
	    {
	      if (result.error)
	      {
	        $rootScope.notifier.error('Error with adding a timeslot.');
	        console.warn('error ->', result);
	      }
	      else
	      {
	        $rootScope.notifier.success($rootScope.ui.planboard.slotAdded);
	      };

	      timeliner.refresh();
	    });
	  };


	  /**
	   * Timeline on change
	   */
	  function timelineOnChange (direct, original, slot, options)
	  {
	    if (!direct)
	    {
	      var values  = self.timeline.getItem(self.timeline.getSelection()[0].row),
	          options = {
	            start:    values.start,
	            end:      values.end,
	            content:  angular.fromJson(values.content.match(/<span class="secret">(.*)<\/span>/)[1])
	          };
	    };

	    $rootScope.statusBar.display($rootScope.ui.planboard.changingSlot);

	    Slots.change($scope.original, options, $scope.user.id)
	    .then(function (result)
	    {
	      if (result.error)
	      {
	        $rootScope.notifier.error('Error with changing a timeslot.');
	        console.warn('error ->', result);
	      }
	      else
	      {
	        $rootScope.notifier.success($rootScope.ui.planboard.slotChanged);
	      };

	      timeliner.refresh();
	    });
	  };


	  /**
	   * Change slot
	   */
	  $scope.slotChange = function (original, slot)
	  {
	    timelineOnChange(true, original, slot, 
	    {
	      start:  ($rootScope.browser.mobile) ?
	                new Date(slot.start.datetime).getTime() : 
	                Dater.convert.absolute(slot.start.date, slot.start.time, false),
	      end:    ($rootScope.browser.mobile) ? 
	                new Date(slot.end.datetime).getTime() :
	                Dater.convert.absolute(slot.end.date, slot.end.time, false),
	      content: angular.toJson({
	        recursive:  slot.recursive, 
	        state:      slot.state 
	      })
	    });
	  };


	  /**
	   * Timeline on delete
	   */
	  function timelineOnDelete ()
	  {
	    var news = $('.timeline-event-content')
	                .contents()
	                .filter(function () { return this.nodeValue == 'New' });
	      
	    if (news.length > 0)
	    {
	      $scope.$apply(function ()
	      {
	        $scope.resetInlineForms();
	      });
	    }
	    else
	    {
	      $rootScope.statusBar.display($rootScope.ui.planboard.deletingTimeslot);

	      Slots.remove($scope.original, $scope.user.id)
	      .then(function (result)
	      {
	        if (result.error)
	        {
	          $rootScope.notifier.error('Error with deleting a timeslot.');
	          console.warn('error ->', result);
	        }
	        else
	        {
	          $rootScope.notifier.success($rootScope.ui.planboard.timeslotDeleted);
	        };

	        timeliner.refresh();
	      });
	    };
	  };


	  /**
	   * Delete trigger start view
	   */
	  $scope.slotRemove = function () { timelineOnDelete() };


	  /**
	   * Go to this week
	   */
	  $scope.timelineThisWeek = function ()
	  {
	    if ($scope.timeline.current.week != new Date().getWeek())
	    {
	      timeliner.load({
	        start:  periods.weeks[new Date().getWeek()].first.timeStamp,
	        end:    periods.weeks[new Date().getWeek()].last.timeStamp
	      });

	      $scope.timeline.range = {
	        start:  periods.weeks[new Date().getWeek()].first.day,
	        end:    periods.weeks[new Date().getWeek()].last.day
	      };
	    }
	  };


	  /**
	   * Go one week in past
	   */
	  $scope.timelineBefore = function (timelineScope)
	  {
	    if ($scope.timeline.current.week != 1)
	    {
	      $scope.timeline.current.week--;

	      timeliner.load({
	        start:  periods.weeks[$scope.timeline.current.week].first.timeStamp,
	        end:    periods.weeks[$scope.timeline.current.week].last.timeStamp,
	      });
	    };

	    $scope.timeline.range = {
	      start:  periods.weeks[$scope.timeline.current.week].first.day,
	      end:    periods.weeks[$scope.timeline.current.week].last.day
	    };
	  };


	  /**
	   * Go one week in future
	   */
	  $scope.timelineAfter = function (timelineScope)
	  {
	    if ($scope.timeline.current.week != 53)
	    {
	      $scope.timeline.current.week++;

	      timeliner.load({
	        start:  periods.weeks[$scope.timeline.current.week].first.timeStamp,
	        end:    periods.weeks[$scope.timeline.current.week].last.timeStamp,
	      });
	    };

	    $scope.timeline.range = {
	      start:  periods.weeks[$scope.timeline.current.week].first.day,
	      end:    periods.weeks[$scope.timeline.current.week].last.day
	    };
	  };


	  /**
	   * Redraw timeline on window resize
	   */
	  $window.onresize = function () { self.timeline.redraw() };


	  /**
	   * Timeline zoom in
	   */
	  $scope.timelineZoomIn = function () { self.timeline.zoom($rootScope.config.timeline.config.zoom, Date.now()) };


	  /**
	   * Timeline zoom out
	   */
	  $scope.timelineZoomOut = function () { self.timeline.zoom(-$rootScope.config.timeline.config.zoom, Date.now()) };
	  

	  /**
	   * Timeline legenda toggler
	   */
	  $scope.showLegenda = function () { $scope.timeline.config.legendarer = !$scope.timeline.config.legendarer };


	  /**
	   * Alter legenda settings
	   */
	  $scope.alterLegenda = function (legenda)
	  {
	    $scope.timeline.config.legenda = legenda;

	    timeliner.render({
	      start:  $scope.timeline.range.start,
	      end:    $scope.timeline.range.end
	    });
	  };

	}
])



/**
 * Settings controller
 */
.controller('settings', 
[
	'$rootScope', '$scope', '$window', 'data', 'Settings', 'Profile', 'Storage', 
	function ($rootScope, $scope, $window, data, Settings, Profile, Storage) 
	{
		/**
		 * Fix styles
		 */
		$rootScope.fixStyles();


	  /**
	   * Pass the settings
	   */
	  $scope.settings = angular.fromJson(data);


	  /**
	   * User settings: Languages
	   */
	  var languages = {};

	  angular.forEach(ui, function (lang, index) { languages[lang.meta.name] = lang.meta.label; });

	  $scope.languages = languages;


	  /**
	   * Pass the groups
	   */
	   var groups = {};

	   angular.forEach(Storage.local.groups(), function (group, index)
	   {
	     groups[group.uuid] = group.name;
	   });

	   $scope.groups = groups;


	  /**
	   * Save user settings
	   */
	  $scope.save = function (settings)
	  {
	    $rootScope.statusBar.display($rootScope.ui.settings.saving);

	    Settings.save($rootScope.app.resources.uuid, settings)
	    .then(function (saved)
	    {
	      $rootScope.notifier.success($rootScope.ui.settings.saved);

	      $rootScope.statusBar.display($rootScope.ui.settings.refreshing);

	      Profile.get($rootScope.app.resources.uuid, true)
	      .then(function (result)
	      {
	        if (result.error)
	        {
	          $rootScope.notifier.error('Error with saving settings.');
	          console.warn('error ->', result);
	        }
	        else
	        {
	          $scope.settings = angular.fromJson(result.resources.settingsWebPaige);

	          $rootScope.changeLanguage(angular.fromJson(result.resources.settingsWebPaige).user.language);

	          $rootScope.statusBar.off();
	        };
	      })
	    });
	  };


	  /**
	   * Google authorization
	   */
	  $scope.authGoogle = function ()
	  {               
	    window.location = 'http://3rc2.ask-services.appspot.com/auth/google' + 
	                      '?agentUrl=http://3rc2.ask-services.appspot.com/eveagents/personalagent/' + 
	                      $rootScope.app.resources.uuid + 
	                      '/' + 
	                      '&agentMethod=createGoogleAgents' +
	                      '&applicationCallback=' + 
	                      location.protocol + "//" + location.hostname + (location.port && ":" + location.port) + 
	                      '/index.html' + 
	                      /**
	                       * Fix a return value
	                       */
	                      '?account=' +
	                      $rootScope.app.resources.uuid +
	                      encodeURIComponent('#') + 
	                      '/settings';
	  };

	}
])



/**
 * Help controller
 */
.controller('help', 
[
	'$rootScope', '$scope', 
	function ($rootScope, $scope) 
	{
		/**
		 * Fix styles
		 */
		$rootScope.fixStyles();

	}
]);;'use strict';


angular.module('WebPaige.Directives', ['ngResource'])


/**
 * Chosen
 */
.directive('chosen', 
  function ()
  {
    var linker = function (scope,element,attr)
    {
      scope.$watch('receviersList', function ()
      {   
         element.trigger('liszt:updated');
      });
      
      scope.$watch('message.receviers', function ()
      {   
         $(element[0]).trigger('liszt:updated');
      });
      
      element.chosen();
    };

    return {
      restrict: 'A',
      link:     linker
    }
  }
)


/**
 * Daterangepicker
 */
.directive('daterangepicker', 
[
  '$rootScope', 
  function ($rootScope)
  {
    return {
      restrict: 'A',

      link: function postLink(scope, element, attrs, controller)
      {
        // var startDate = Date.create().addDays(-6),
        //     endDate   = Date.create();       
        //element.val(startDate.format('{MM}-{dd}-{yyyy}') + ' / ' + endDate.format('{MM}-{dd}-{yyyy}'));
        
        element.daterangepicker({
          // startDate: startDate,
          // endDate: endDate,
          ranges: {
            'Today': ['today', 'tomorrow'],
            'Tomorrow': ['tomorrow', new Date.today().addDays(2)],
            'Yesterday': ['yesterday', 'today'],
            'Next 3 Days': ['today', new Date.create().addDays(3)],
            'Next 7 Days': ['today', new Date.create().addDays(7)]
          }
        },
        function (start, end)
        {
          scope.$apply(function ()
          {
            var diff = end.getTime() - start.getTime();

            /**
             * Scope is a day
             */
            if (diff <= 86400000)
            {
              scope.timeline.range = {
                start: start,
                end: start
              };
              scope.timeline.scope = {
                day: true,
                week: false,
                month: false
              };
            }
            /**
             * Scope is less than a week
             */
            else if (diff < 604800000)
            {
              scope.timeline.range = {
                start: start,
                end: end
              };
              scope.timeline.scope = {
                day: false,
                week: true,
                month: false
              };
            }
            /**
             * Scope is more than a week
             */
            else if (diff > 604800000)
            {
              scope.timeline.range = {
                start: start,
                end: end
              };
              scope.timeline.scope = {
                day: false,
                week: false,
                month: true
              };
            };

            $rootScope.$broadcast('timeliner', {
              start: start,
              end: end
            });
            
          });
        });

        /**
         * Set data toggle
         */
        element.attr('data-toggle', 'daterangepicker');

        /**
         * TODO
         * Investigate if its really needed!!
         */
        element.daterangepicker({
          autoclose: true
        });
      }
    };
  }
])


/**
 * ???
 */
.directive('wpName', 
[
  'Storage', 
  function (Storage)
  {
    return {
      restrict : 'A',
      link : function linkfn(scope, element, attrs)
      {
        var getmemberName = function (uid)
        {
          var members = angular.fromJson(Storage.get('members')),
              retName = uid;

          angular.forEach(members , function (mem, i)
          {
            if (mem.uuid == uid)
            {
              retName = mem.name;

              return false;
            };
          });

          return retName;
        };
        
        scope.$watch(attrs.wpName, function (uid)
        {
          element.text(getmemberName(uid)); 
        });
      }
    }
  }
]);


/**
 * 
 */
// .directive('signIn', 
// [
//   '$rootScope', 
//   function ($rootScope)
//   {
//     return {
//       restrict: 'E',
//       // templateUrl: 'views/directive/signin.html', // using this method causes the tests to fail
//       template: '<section class="sign-in" ng-show="show==true"><form class="well form-inline"><input type="email" placeholder="Username" ng-model="username" required /><input type="password" placeholder="Password" ng-model="password" required /><button ng-click="signin()">Signin</button></form><button ng-click="signout()">Signout</button></section>',
//       replace: true,
//       scope: true,
//       link: function (scope, element, attrs) {

//           // scope.$on('event:auth:bad-request', function (event) {
//           //     scope.show = true;
//           // });

//           // scope.$on('event:auth:not-authorised', function (event) {
//           //     scope.show = true;
//           // });

//           // scope.$on('event:auth:success', function (event) {
//           //     scope.show = false;
//           // });

//           // scope.signin = function() {
//           //     if(scope.username && scope.password) {
//           //         Authentication.login(scope.username, scope.password);
//           //     }
//           // };
//       }
//     }
//   }
// ]);

;
/**
 * AngularStrap - Twitter Bootstrap directives for AngularJS
 * @version v0.7.2 - 2013-04-13
 * @link http://mgcrea.github.com/angular-strap
 * @author Olivier Louvignes <olivier@mg-crea.com>
 * @license MIT License, http://www.opensource.org/licenses/MIT
 */

angular.module('$strap.config', []).value('$strap.config', {});
angular.module('$strap.filters', ['$strap.config']);
angular.module('$strap.directives', ['$strap.config']);
angular.module('$strap', ['$strap.filters', '$strap.directives', '$strap.config']);


angular.module('$strap.directives')

.directive('bsAlert', ['$parse', '$timeout', '$compile', function($parse, $timeout, $compile) {
  'use strict';

  return {
    restrict: 'A',
    link: function postLink(scope, element, attrs) {

      var getter = $parse(attrs.bsAlert),
        setter = getter.assign,
        value = getter(scope);

      // For static alerts
      if(!attrs.bsAlert) {

        // Setup close button
        if(angular.isUndefined(attrs.closeButton) || (attrs.closeButton !== '0' && attrs.closeButton !== 'false')) {
          element.prepend('<button type="button" class="close" data-dismiss="alert">&times;</button>');
        }

      } else {

        scope.$watch(attrs.bsAlert, function(newValue, oldValue) {
          value = newValue;

          // Set alert content
          element.html((newValue.title ? '<strong>' + newValue.title + '</strong>&nbsp;' : '') + newValue.content || '');

          if(!!newValue.closed) {
            element.hide();
          }

          // Compile alert content
          //$timeout(function(){
          $compile(element.contents())(scope);
          //});

          // Add proper class
          if(newValue.type || oldValue.type) {
            oldValue.type && element.removeClass('alert-' + oldValue.type);
            newValue.type && element.addClass('alert-' + newValue.type);
          }

          // Setup close button
          if(angular.isUndefined(attrs.closeButton) || (attrs.closeButton !== '0' && attrs.closeButton !== 'false')) {
            element.prepend('<button type="button" class="close" data-dismiss="alert">&times;</button>');
          }

        }, true);

      }

      element.addClass('alert').alert();

      // Support fade-in effect
      if(element.hasClass('fade')) {
        element.removeClass('in');
        setTimeout(function() {
          element.addClass('in');
        });
      }

      var parentArray = attrs.ngRepeat && attrs.ngRepeat.split(' in ').pop();

      element.on('close', function(ev) {
        var removeElement;

        if(parentArray) { // ngRepeat, remove from parent array
          ev.preventDefault();

          element.removeClass('in');

          removeElement = function() {
            element.trigger('closed');
            if(scope.$parent) {
              scope.$parent.$apply(function() {
                var path = parentArray.split('.');
                var curr = scope.$parent;

                for (var i = 0; i < path.length; ++i) {
                  if (curr) {
                    curr = curr[path[i]];
                  }
                }

                if (curr) {
                  curr.splice(scope.$index, 1);
                }
              });
            }
          };

          $.support.transition && element.hasClass('fade') ?
            element.on($.support.transition.end, removeElement) :
            removeElement();

        } else if(value) { // object, set closed property to 'true'
          ev.preventDefault();

          element.removeClass('in');

          removeElement = function() {
            element.trigger('closed');
            scope.$apply(function() {
              value.closed = true;
            });
          };

          $.support.transition && element.hasClass('fade') ?
            element.on($.support.transition.end, removeElement) :
            removeElement();

        } else { // static, regular behavior
        }

      });

    }
  };
}]);


angular.module('$strap.directives')

.directive('bsButton', ['$parse', '$timeout', function($parse, $timeout) {
  'use strict';

  return {
    restrict: 'A',
    require: '?ngModel',
    link: function postLink(scope, element, attrs, controller) {

      // If we have a controller (i.e. ngModelController) then wire it up
      if(controller) {

        // Set as single toggler if not part of a btn-group
        if(!element.parent('[data-toggle="buttons-checkbox"], [data-toggle="buttons-radio"]').length) {
          element.attr('data-toggle', 'button');
        }

        // Handle start state
        var startValue = !!scope.$eval(attrs.ngModel);
        if(startValue) {
          element.addClass('active');
        }

        // Watch model for changes
        scope.$watch(attrs.ngModel, function(newValue, oldValue) {
          var bNew = !!newValue, bOld = !!oldValue;
          if(bNew !== bOld) {
            $.fn.button.Constructor.prototype.toggle.call(button);
          // Handle $q promises
          } else if(bNew && !startValue) {
            element.addClass('active');
          }
        });

      }

      // Support buttons without .btn class
      if(!element.hasClass('btn')) {
        element.on('click.button.data-api', function (ev) {
          element.button('toggle');
        });
      }

      // Initialize button
      element.button();

      // Bootstrap override to handle toggling
      var button = element.data('button');
      button.toggle = function() {

        if(!controller) {
          return $.fn.button.Constructor.prototype.toggle.call(this);
        }

        var $parent = element.parent('[data-toggle="buttons-radio"]');

        if($parent.length) {
          element.siblings('[ng-model]').each(function(k, v) {
            $parse($(v).attr('ng-model')).assign(scope, false);
          });
          scope.$digest();
          if(!controller.$modelValue) {
            controller.$setViewValue(!controller.$modelValue);
            scope.$digest();
          }
        } else {
          scope.$apply(function () {
            controller.$setViewValue(!controller.$modelValue);
          });
        }

      };

      /*Provide scope display functions
      scope._button = function(event) {
        element.button(event);
      };
      scope.loading = function() {
        element.tooltip('loading');
      };
      scope.reset = function() {
        element.tooltip('reset');
      };

      if(attrs.loadingText) element.click(function () {
        //var btn = $(this)
        element.button('loading')
        setTimeout(function () {
        element.button('reset')
        }, 1000)
      });*/

    }
  };

}])

.directive('bsButtonsCheckbox', ['$parse', function($parse) {
  'use strict';
  return {
    restrict: 'A',
    require: '?ngModel',
    compile: function compile(tElement, tAttrs, transclude) {
      tElement.attr('data-toggle', 'buttons-checkbox').find('a, button').each(function(k, v) {
        $(v).attr('bs-button', '');
      });
    }
  };

}])

.directive('bsButtonsRadio', ['$timeout', function($timeout) {
  'use strict';
  return {
    restrict: 'A',
    require: '?ngModel',
    compile: function compile(tElement, tAttrs, transclude) {

      tElement.attr('data-toggle', 'buttons-radio');

      // Delegate to children ngModel
      if(!tAttrs.ngModel) {
        tElement.find('a, button').each(function(k, v) {
          $(v).attr('bs-button', '');
        });
      }

      return function postLink(scope, iElement, iAttrs, controller) {

        // If we have a controller (i.e. ngModelController) then wire it up
        if(controller) {

          $timeout(function() {
            iElement
              .find('[value]').button()
              .filter('[value="' + controller.$viewValue + '"]')
              .addClass('active');
          });

          iElement.on('click.button.data-api', function (ev) {
            scope.$apply(function () {
              controller.$setViewValue($(ev.target).closest('button').attr('value'));
            });
          });

          // Watch model for changes
          scope.$watch(iAttrs.ngModel, function(newValue, oldValue) {
            if(newValue !== oldValue) {
              var $btn = iElement.find('[value="' + scope.$eval(iAttrs.ngModel) + '"]');
              if($btn.length) {
                $btn.button('toggle');
                // $.fn.button.Constructor.prototype.toggle.call($btn.data('button'));
              }
            }
          });

        }

      };
    }
  };

}]);


angular.module('$strap.directives')

.directive('bsButtonSelect', ['$parse', '$timeout', function($parse, $timeout) {
  'use strict';

  return {
    restrict: 'A',
    require: '?ngModel',
    link: function postLink(scope, element, attrs, ctrl) {

      var getter = $parse(attrs.bsButtonSelect),
        setter = getter.assign;

      // Bind ngModelController
      if(ctrl) {
        element.text(scope.$eval(attrs.ngModel));
        // Watch model for changes
        scope.$watch(attrs.ngModel, function(newValue, oldValue) {
          element.text(newValue);
        });
      }

      // Click handling
      var values, value, index, newValue;
      element.bind('click', function(ev) {
        values = getter(scope);
        value = ctrl ? scope.$eval(attrs.ngModel) : element.text();
        index = values.indexOf(value);
        newValue = index > values.length - 2 ? values[0] : values[index + 1];
        console.warn(values, newValue);

        scope.$apply(function() {
          element.text(newValue);
          if(ctrl) {
            ctrl.$setViewValue(newValue);
          }
        });
      });
    }
  };

}]);

// https://github.com/eternicode/bootstrap-datepicker

angular.module('$strap.directives')

.directive('bsDatepicker', ['$timeout', '$strap.config', function($timeout, config) {
  'use strict';

  var isAppleTouch = navigator.userAgent.match(/(iPad|iPhone|iPod)/g) ? true : false;

  var regexpMap = function regexpMap(language) {
    language = language || 'en';
    return {
      '/'    : '[\\/]',
      '-'    : '[-]',
      '.'    : '[.]',
      ' '    : '[\\s]',
      'dd'   : '(?:(?:[0-2]?[0-9]{1})|(?:[3][01]{1}))',
      'd'    : '(?:(?:[0-2]?[0-9]{1})|(?:[3][01]{1}))',
      'mm'   : '(?:[0]?[1-9]|[1][012])',
      'm'    : '(?:[0]?[1-9]|[1][012])',
      'DD'   : '(?:' + $.fn.datepicker.dates[language].days.join('|') + ')',
      'D'    : '(?:' + $.fn.datepicker.dates[language].daysShort.join('|') + ')',
      'MM'   : '(?:' + $.fn.datepicker.dates[language].months.join('|') + ')',
      'M'    : '(?:' + $.fn.datepicker.dates[language].monthsShort.join('|') + ')',
      'yyyy' : '(?:(?:[1]{1}[0-9]{1}[0-9]{1}[0-9]{1})|(?:[2]{1}[0-9]{3}))(?![[0-9]])',
      'yy'   : '(?:(?:[0-9]{1}[0-9]{1}))(?![[0-9]])'
    };
  };

  var regexpForDateFormat = function regexpForDateFormat(format, language) {
    var re = format, map = regexpMap(language), i;
    // Abstract replaces to avoid collisions
    i = 0; angular.forEach(map, function(v, k) {
      re = re.split(k).join('${' + i + '}'); i++;
    });
    // Replace abstracted values
    i = 0; angular.forEach(map, function(v, k) {
      re = re.split('${' + i + '}').join(v); i++;
    });
    return new RegExp('^' + re + '$', ['i']);
  };

  return {
    restrict: 'A',
    require: '?ngModel',
    link: function postLink(scope, element, attrs, controller) {

      var options = config.datepicker || {},
          language = attrs.language || options.language || 'en',
          type = attrs.dateType || options.type || 'date',
          format = attrs.dateFormat || options.format || ($.fn.datepicker.dates[language] && $.fn.datepicker.dates[language].format) || 'yyyy-mm-dd';

      var dateFormatRegexp = isAppleTouch ? regexpForDateFormat('yyyy-mm-dd', language) : regexpForDateFormat(format, language);

      // Handle date validity according to dateFormat
      if(controller) {

        // controller.$formatters.unshift(function(viewValue) {
        //   console.warn('$formatters', arguments);
        // });

        // ngModel validity
        controller.$parsers.unshift(function(viewValue) {
          if(!viewValue) {
            controller.$setValidity('date', true);
            return null;
          } else if(type === 'date' && angular.isDate(viewValue)) {
            controller.$setValidity('date', true);
            return viewValue;
          } else if(angular.isString(viewValue) && dateFormatRegexp.test(viewValue)) {
            controller.$setValidity('date', true);
            if(isAppleTouch) return new Date(viewValue);
            return type === 'string' ? viewValue : $.fn.datepicker.DPGlobal.parseDate(viewValue, $.fn.datepicker.DPGlobal.parseFormat(format), language);
          } else {
            controller.$setValidity('date', false);
            return undefined;
          }
        });

        // ngModel rendering
        controller.$render = function ngModelRender() {
          return controller.$modelValue && element.datepicker('update', controller.$modelValue);
        };

      }

      // Use native interface for touch devices
      if(isAppleTouch) {

        element.prop('type', 'date').css('-webkit-appearance', 'textfield');

      } else {

        // If we have a ngModelController then wire it up
        if(controller) {
          element.on('changeDate', function(ev) {
            scope.$apply(function () {
              controller.$setViewValue(type === 'string' ? element.val() : ev.date);
            });
          });
        }

        // Create datepicker
        element.attr('data-toggle', 'datepicker');
        element.datepicker({
          autoclose: true,
          format: format,
          language: language,
          forceParse: attrs.forceParse || false
        });

        // Garbage collection
        scope.$on('$destroy', function() {
          console.warn('$destroy');
          var datepicker = element.data('datepicker');
          if(datepicker) {
            datepicker.picker.remove();
            element.data('datepicker', null);
          }
        });

      }

      // Support add-on
      var component = element.siblings('[data-toggle="datepicker"]');
      if(component.length) {
        component.on('click', function() {
          element.trigger('focus');
        });
      }

    }

  };

}]);


angular.module('$strap.directives')

.directive('bsDropdown', ['$parse', '$compile', '$timeout', function($parse, $compile, $timeout) {
  'use strict';

  var buildTemplate = function(items, ul) {
    if(!ul) ul = ['<ul class="dropdown-menu" role="menu" aria-labelledby="drop1">', '</ul>'];
    angular.forEach(items, function(item, index) {
      if(item.divider) return ul.splice(index + 1, 0, '<li class="divider"></li>');
      var li = '<li' + (item.submenu && item.submenu.length ? ' class="dropdown-submenu"' : '') + '>' +
        '<a tabindex="-1" ng-href="' + (item.href || '') + '"' + (item.click ? '" ng-click="' + item.click + '"' : '') + (item.target ? '" target="' + item.target + '"' : '') + '>' +
        (item.text || '') + '</a>';
      if(item.submenu && item.submenu.length) li += buildTemplate(item.submenu).join("\n");
      li += '</li>';
      ul.splice(index + 1, 0, li);
    });
    return ul;
  };

  return {
    restrict: 'EA',
    scope: true,
    link: function postLink(scope, iElement, iAttrs) {

      var getter = $parse(iAttrs.bsDropdown),
          items = getter(scope);

      // Defer after any ngRepeat rendering
      $timeout(function() {

        if(!angular.isArray(items)) {
          // @todo?
        }

        var dropdown = angular.element(buildTemplate(items).join(''));
        dropdown.insertAfter(iElement);

        // Compile dropdown-menu
        $compile(iElement.next('ul.dropdown-menu'))(scope);

      });

      iElement
        .addClass('dropdown-toggle')
        .attr('data-toggle', "dropdown");

    }
  };

}]);

angular.module('$strap.directives')

.factory('$modal', ['$rootScope', '$compile', '$http', '$timeout', '$q', '$templateCache', function($rootScope, $compile, $http, $timeout, $q, $templateCache) {

  var ModalFactory = function ModalFactory(options) {

    function Modal(options) {
      if(!options) options = {};

      var scope = options.scope || $rootScope.$new(),
          templateUrl = options.template;

      //@todo support {title, content} object

      return $q.when($templateCache.get(templateUrl) || $http.get(templateUrl, {cache: true}).then(function(res) { return res.data; }))
      .then(function onSuccess(template) {

        // Build modal object
        var id = templateUrl.replace('.html', '').replace(/[\/|\.|:]/g, "-") + '-' + scope.$id;
        var $modal = $('<div class="modal hide" tabindex="-1"></div>').attr('id', id).addClass('fade').html(template);
        if(options.modalClass) $modal.addClass(options.modalClass);

        $('body').append($modal);

        // Compile modal content
        $timeout(function() {
          $compile($modal)(scope);
        });

        // Provide scope display functions
        scope.$modal = function(name) {
          $modal.modal(name);
        };
        scope.hide = function() {
          $modal.modal('hide');
        };
        scope.show = function() {
          $modal.modal('show');
        };
        scope.dismiss = scope.hide;

        // Emit modal events
        angular.forEach(['show', 'shown', 'hide', 'hidden'], function(name) {
          $modal.on(name, function(ev) {
            scope.$emit('modal-' + name, ev);
          });
        });

        // Support autofocus attribute
        $modal.on('shown', function(event) {
          $('input[autofocus]', $modal).first().trigger('focus');
        });

        if(options.show) {
          $modal.modal('show');
        }

        return $modal;

      });

    }

    return new Modal(options);

  };

  return ModalFactory;

}])

.directive('bsModal', ['$q', '$modal', function($q, $modal) {
  'use strict';

  return {
    restrict: 'A',
    scope: true,
    link: function postLink(scope, iElement, iAttrs, controller) {

      var options = {
        template: scope.$eval(iAttrs.bsModal),
        scope: scope,
        modalClass: iAttrs.modalClass || '',
        backdrop: iAttrs.backdrop*1 || true,
        keyboard: iAttrs.keyboard*1 || true,
        show: iAttrs.show*1 || false
      };

      $q.when($modal(options)).then(function onSuccess(modal) {
        iElement.attr('data-target', '#' + modal.attr('id')).attr('data-toggle', 'modal');
      });

    }
  };
}]);


angular.module('$strap.directives')

.directive('bsNavbar', ['$location', function($location) {
  'use strict';

  return {
    restrict: 'A',
    link: function postLink(scope, element, attrs, controller) {
      // Watch for the $location
      scope.$watch(function() {
        return $location.path();
      }, function(newValue, oldValue) {

        $('li[data-match-route]', element).each(function(k, li) {
          var $li = angular.element(li),
            // data('match-rout') does not work with dynamic attributes
            pattern = $li.attr('data-match-route'),
            regexp = new RegExp('^' + pattern + '$', ["i"]);

          if(regexp.test(newValue)) {
            $li.addClass('active');
          } else {
            $li.removeClass('active');
          }

        });
      });
    }
  };
}]);


angular.module('$strap.directives')

.directive('bsPopover', ['$parse', '$compile', '$http', '$timeout', '$q', '$templateCache', function($parse, $compile, $http, $timeout, $q, $templateCache) {
  'use strict';

  // Hide popovers when pressing esc
  $("body").on("keyup", function(ev) {
    if(ev.keyCode === 27) {
      $(".popover.in").each(function() {
        $(this).popover('hide');
      });
    }
  });

  return {
    restrict: 'A',
    scope: true,
    link: function postLink(scope, element, attr, ctrl) {

      var getter = $parse(attr.bsPopover),
        setter = getter.assign,
        value = getter(scope),
        options = {};

      if(angular.isObject(value)) {
        options = value;
      }

      $q.when(options.content || $templateCache.get(value) || $http.get(value, {cache: true})).then(function onSuccess(template) {

        // Handle response from $http promise
        if(angular.isObject(template)) {
          template = template.data;
        }

        // Handle data-unique attribute
        if(!!attr.unique) {
          element.on('show', function(ev) { // requires bootstrap 2.3.0+
            // Hide any active popover except self
            $(".popover.in").each(function() {
              var $this = $(this),
                popover = $this.data('popover');
              if(popover && !popover.$element.is(element)) {
                $this.popover('hide');
              }
            });
          });
        }

        // Handle data-hide attribute to toggle visibility
        if(!!attr.hide) {
          scope.$watch(attr.hide, function(newValue, oldValue) {
            if(!!newValue) {
              popover.hide();
            } else if(newValue !== oldValue) {
              popover.show();
            }
          });
        }

        // Initialize popover
        element.popover(angular.extend({}, options, {
          content: template,
          html: true
        }));

        // Bootstrap override to provide tip() reference & compilation
        var popover = element.data('popover');
        popover.hasContent = function() {
          return this.getTitle() || template; // fix multiple $compile()
        };
        popover.getPosition = function() {
          var r = $.fn.popover.Constructor.prototype.getPosition.apply(this, arguments);

          // Compile content
          $compile(this.$tip)(scope);
          scope.$digest();

          // Bind popover to the tip()
          this.$tip.data('popover', this);

          return r;
        };

        // Provide scope display functions
        scope._popover = function(name) {
          element.popover(name);
        };
        scope.hide = function() {
          element.popover('hide');
        };
        scope.show = function() {
          element.popover('show');
        };
        scope.dismiss = scope.hide;

      });

    }
  };

}]);

angular.module('$strap.directives')

.directive('bsSelect', ['$timeout', function($timeout) {
  'use strict';

  var NG_OPTIONS_REGEXP = /^\s*(.*?)(?:\s+as\s+(.*?))?(?:\s+group\s+by\s+(.*))?\s+for\s+(?:([\$\w][\$\w\d]*)|(?:\(\s*([\$\w][\$\w\d]*)\s*,\s*([\$\w][\$\w\d]*)\s*\)))\s+in\s+(.*)$/;

  return {
    restrict: 'A',
    require: '?ngModel',
    link: function postLink(scope, element, attrs, controller) {

      var options = scope.$eval(attrs.bsSelect) || {};
      // console.warn('postLink', options, arguments);

      $timeout(function() {
        element.selectpicker(options);
        element.next().removeClass('ng-scope');
      });

      // If we have a controller (i.e. ngModelController) then wire it up
      if(controller) {

        // Watch for changes to the model value
        scope.$watch(attrs.ngModel, function(newValue, oldValue) {
          if (newValue !== oldValue) {
            element.selectpicker('refresh');
          }
        });

      }

    }

  };

}]);


angular.module('$strap.directives')

.directive('bsTabs', ['$parse', '$compile', '$timeout', function($parse, $compile, $timeout) {
  'use strict';

  var template = '<div class="tabs">' +
  '<ul class="nav nav-tabs">' +
    '<li ng-repeat="pane in panes" ng-class="{active:pane.active}">' +
      '<a data-target="#{{pane.id}}" data-index="{{$index}}" data-toggle="tab">{{pane.title}}</a>' +
    '</li>' +
  '</ul>' +
  '<div class="tab-content" ng-transclude>' +
    // '<div ng-repeat="pane in panes" ng-class="{active:pane.selected}">{{pane.content}}</div>' +
  '</div>';

  return {
    restrict: 'A',
    require: '?ngModel',
    priority: 0,
    scope: true,
    template: template,//'<div class="tabs"><ul class="nav nav-tabs"></ul><div class="tab-content"></div></div>',
    replace: true,
    transclude: true,
    compile: function compile(tElement, tAttrs, transclude) {

      return function postLink(scope, iElement, iAttrs, controller) {

        var getter = $parse(iAttrs.bsTabs),
            setter = getter.assign,
            value = getter(scope);

        scope.panes = [];
        var $tabs = iElement.find('ul.nav-tabs');
        var $panes = iElement.find('div.tab-content');


        var activeTab = 0, id, title, active;
        $timeout(function() {

          $panes.find('[data-title], [data-tab]').each(function(index) {
            var $this = angular.element(this);

            id = 'tab-' + scope.$id + '-' + index;
            title = $this.data('title') || $this.data('tab');
            active = !active && $this.hasClass('active');

            $this.attr('id', id).addClass('tab-pane');
            if(iAttrs.fade) $this.addClass('fade');

            scope.panes.push({
              id: id,
              title: title,
              content: this.innerHTML,
              active: active
            });

          });

          if(scope.panes.length && !active) {
            $panes.find('.tab-pane:first').addClass('active' + (iAttrs.fade ? ' in' : ''));
            scope.panes[0].active = true;
          }

        });

        // If we have a controller (i.e. ngModelController) then wire it up
        if(controller) {

          iElement.on('show', function(ev) {
            var $target = $(ev.target);
            scope.$apply(function() {
              controller.$setViewValue($target.data('index'));
            });
          });

          // Watch ngModel for changes
          scope.$watch(iAttrs.ngModel, function(newValue, oldValue) {
            if(angular.isUndefined(newValue)) return;
            activeTab = newValue; // update starting activeTab before first build
            setTimeout(function() {
              var $next = $tabs.find('li:eq(' + newValue*1 + ')');
              if(!$next.hasClass('active')) {
                $next.children('a').tab('show');
              }
            });
          });

        }

    };

  }

};

}]);


angular.module('$strap.directives')

.directive('bsTimepicker', ['$timeout', function($timeout) {
  'use strict';

  var TIME_REGEXP = '((?:(?:[0-1][0-9])|(?:[2][0-3])|(?:[0-9])):(?:[0-5][0-9])(?::[0-5][0-9])?(?:\\s?(?:am|AM|pm|PM))?)';

  return {
    restrict: 'A',
    require: '?ngModel',
    link: function postLink(scope, element, attrs, controller) {

      // If we have a controller (i.e. ngModelController) then wire it up
      if(controller) {
        element.on('changeTime.timepicker', function(ev) {
          $timeout(function() {
            controller.$setViewValue(element.val());
          });
        });
      }

      // Handle input time validity
      var timeRegExp = new RegExp('^' + TIME_REGEXP + '$', ['i']);
      controller.$parsers.unshift(function(viewValue) {
        // console.warn('viewValue', viewValue, timeRegExp,  timeRegExp.test(viewValue));
        if (!viewValue || timeRegExp.test(viewValue)) {
          controller.$setValidity('time', true);
          return viewValue;
        } else {
          controller.$setValidity('time', false);
          return;
        }
      });

      // Create datepicker
      element.attr('data-toggle', 'timepicker');
      element.parent().addClass('bootstrap-timepicker');
      element.timepicker();
      var timepicker = element.data('timepicker');

      // Support add-on
      var component = element.siblings('[data-toggle="timepicker"]');
      if(component.length) {
        component.on('click', $.proxy(timepicker.showWidget, timepicker));
      }

    }
  };

}]);


angular.module('$strap.directives')

.directive('bsTooltip', ['$parse', '$compile',  function($parse, $compile) {
  'use strict';

  return {
    restrict: 'A',
    scope: true,
    link: function postLink(scope, element, attrs, ctrl) {

      var getter = $parse(attrs.bsTooltip),
        setter = getter.assign,
        value = getter(scope);

      // Watch bsTooltip for changes
      scope.$watch(attrs.bsTooltip, function(newValue, oldValue) {
        if(newValue !== oldValue) {
          value = newValue;
        }
      });

      if(!!attrs.unique) {
        element.on('show', function(ev) {
          // Hide any active popover except self
          $(".tooltip.in").each(function() {
            var $this = $(this),
              tooltip = $this.data('tooltip');
            if(tooltip && !tooltip.$element.is(element)) {
              $this.tooltip('hide');
            }
          });
        });
      }

      // Initialize tooltip
      element.tooltip({
        title: function() { return angular.isFunction(value) ? value.apply(null, arguments) : value; },
        html: true
      });

      // Bootstrap override to provide events & tip() reference
      var tooltip = element.data('tooltip');
      tooltip.show = function() {
        var r = $.fn.tooltip.Constructor.prototype.show.apply(this, arguments);
        // Bind tooltip to the tip()
        this.tip().data('tooltip', this);
        return r;
      };

      //Provide scope display functions
      scope._tooltip = function(event) {
        element.tooltip(event);
      };
      scope.hide = function() {
        element.tooltip('hide');
      };
      scope.show = function() {
        element.tooltip('show');
      };
      scope.dismiss = scope.hide;

    }
  };

}]);

angular.module('$strap.directives')

.directive('bsTypeahead', ['$parse', function($parse) {
  'use strict';

  return {
    restrict: 'A',
    require: '?ngModel',
    link: function postLink(scope, element, attrs, controller) {

      var getter = $parse(attrs.bsTypeahead),
          setter = getter.assign,
          value = getter(scope);

      // Watch bsTypeahead for changes
      scope.$watch(attrs.bsTypeahead, function(newValue, oldValue) {
        if(newValue !== oldValue) {
          value = newValue;
        }
      });

      element.attr('data-provide', 'typeahead');
      element.typeahead({
        source: function(query) { return angular.isFunction(value) ? value.apply(null, arguments) : value; },
        minLength: attrs.minLength || 1,
        items: attrs.items,
        updater: function(value) {
          // If we have a controller (i.e. ngModelController) then wire it up
          if(controller) {
            scope.$apply(function () {
              controller.$setViewValue(value);
            });
          }
          scope.$emit('typeahead-updated', value);
          return value;
        }
      });

      // Bootstrap override
      var typeahead = element.data('typeahead');
      // Fixes #2043: allows minLength of zero to enable show all for typeahead
      typeahead.lookup = function (ev) {
        var items;
        this.query = this.$element.val() || '';
        if (this.query.length < this.options.minLength) {
          return this.shown ? this.hide() : this;
        }
        items = $.isFunction(this.source) ? this.source(this.query, $.proxy(this.process, this)) : this.source;
        return items ? this.process(items) : this;
      };

      // Support 0-minLength
      if(attrs.minLength === "0") {
        setTimeout(function() { // Push to the event loop to make sure element.typeahead is defined (breaks tests otherwise)
          element.on('focus', function() {
            element.val().length === 0 && setTimeout(element.typeahead.bind(element, 'lookup'), 200);
          });
        });
      }

    }
  };

}]);;'use strict';


angular.module('WebPaige.Services', ['ngResource'])

/**
 * Timer service
 *
 * Timer.start('timerExample', function () { console.warn('timer started') }, 5);
 * $scope.stopTimer = function () { Timer.stop('timerExample') };
 */
.factory('Timer', 
[
  '$rootScope', '$timeout', 
  function ($rootScope, $timeout)
  {
    var initer = 0,
        timers = [];

    var addTimer = function (id, event, delay)
    {
      timers[id] = {
        event: event, 
        delay: delay, 
        counter: 0
      };

      var onTimeout = function ()
      {
        timers[id].counter++;

        timers[id].mytimeout = $timeout(onTimeout, 1000);

        if (timers[id].delay == timers[id].counter)
        {
          timers[id].event.call();

          timers[id].counter = 0;
        };
      };

      timers[id].mytimeout = $timeout(onTimeout, 1000);  
    };

    var stopTimer = function (id)
    {
      $timeout.cancel(timers[id].mytimeout);
    };

    return {
      start:  addTimer,
      stop:   stopTimer
    };
  }
])


/**
 * Session Service
 */
.factory('Session', 
[
  '$rootScope', '$http', 'Storage', 
  function ($rootScope, $http, Storage)
  {
    return {
      /**
       * Check session
       */
      check: function()
      {
        var session = angular.fromJson(Storage.cookie.get('session'));

        if (session)
        {
          this.set(session.id);

          return true;
        }
        else
        {
          return false;
        };
      },

      /**
       * Read cookie value
       */
      cookie: function(session)
      {
        var values,
            pairs = document.cookie.split(";");

        for (var i=0; i < pairs.length; i++)
        {
          values = pairs[i].split("=");

          if (values[0].trim() == "WebPaige.session") return angular.fromJson(values[1]);
        };

      },

      /**
       * Get session
       * Prolong session time by every check
       */
      get: function(session)
      {
        this.check(session);

        this.set(session.id);

        return session.id;
      },

      /**
       * Set session
       */
      set: function(sessionId)
      {
        var session = {
          id: sessionId,
          time: new Date()
        };

        Storage.cookie.add('session', angular.toJson(session));

        $rootScope.session = session;

        $http.defaults.headers.common['X-SESSION_ID'] = $rootScope.session.id;

        return session;
      },

      /**
       * Clear session
       */
      clear: function()
      {
        $rootScope.session = null;

        $http.defaults.headers.common['X-SESSION_ID'] = null;
      }
    }
  }
])


/**
 * Dater service (Wrapper on Date)
 */
.factory('Dater', 
[
  '$rootScope', 'Storage', 
  function ($rootScope, Storage)
  {
    return {

      current:
      {
        today: function ()
        {
          return Date.today().getDayOfYear() + 1;
        },

        week: function ()
        {
          return new Date().getWeek();
        },

        month: function ()
        {
          return new Date().getMonth() + 1;
        }
      },

      readable: 
      {
        date: function (date)
        {
          return  new Date(date).toString($rootScope.config.formats.date);
        }
      },

      convert:
      {
        absolute: function (date, time, flag)
        {
          var dates   = date.split('-'),
              result  = new Date(Date.parse(dates[2] + 
                                      '-' + 
                                      dates[1] + 
                                      '-' + 
                                      dates[0] + 
                                      ' ' + 
                                      time)).getTime();
          
          return (flag) ? result / 1000 : result;
        }
      },

      calculate:
      {
        diff: function (range)
        {
          return new Date(range.end).getTime() - new Date(range.start).getTime()
        }
      },

      /**
       * Get the current month
       */
      getThisMonth: function ()
      {
        return new Date().toString('M');
      },

      /**
       * Get the current year
       */
      getThisYear: function ()
      {
        return new Date().toString('yyyy');
      },

      /**
       * Get begin and end timestamps of months
       * in the current year
       */
      getMonthTimeStamps: function ()
      {
        var months  = {}, 
            year    = this.getThisYear();

        for (var i = 0; i < 12; i++)
        {
          var firstDay  = new Date(year, i).moveToFirstDayOfMonth(),
              lastDay   = new Date(year, i).moveToLastDayOfMonth(),
              month     = {
                first: {
                  day: firstDay,
                  timeStamp: firstDay.getTime()
                },
                last: { 
                  day: lastDay,
                  timeStamp: lastDay.getTime() 
                },
                totalDays: Date.getDaysInMonth(year, i)
              };

          months[i+1] = month;
        };

        return months;
      },

      /**
       * Get begin and end timestamps of weeks
       */
      getWeekTimeStamps: function()
      {
        var nweeks    = [],
            weeks     = {},
            nextMonday,
            year      = this.getThisYear(), 
            firstDayInYear    = new Date(year, 0).moveToFirstDayOfMonth(),
            firstMondayOfYear = new Date(year, 0).moveToFirstDayOfMonth().last().sunday().addWeeks(0),
            firstMonday       = new Date(firstMondayOfYear);

        for (var i = 0; i < 53; i++)
        {
          if (i == 0)
          {
            nextMonday = firstMondayOfYear.addWeeks(1);
          }
          else
          {
            nextMonday = new Date(nweeks[i-1]).addWeeks(1);
          };

          nweeks.push(new Date(nextMonday));
        };

        nweeks.unshift(firstMonday);

        var firstMondayofNextYear = new Date(nweeks[51].addWeeks(1));

        for (var i = 0; i < 55; i++)
        {
          weeks[i+1] = {
            first: {
              day: nweeks[i],
              timeStamp: new Date(nweeks[i]).getTime()
            },
            last: {
              day: nweeks[i+1],
              timeStamp: new Date(nweeks[i+1]).getTime()
            }
          }
        };

        /**
         * Remove unneccessary periods
         */
        delete weeks[54];
        delete weeks[55];

        return weeks;
      },

      /**
       */
      getDayTimeStamps: function()
      {
        var nextDay,
            ndays = [],
            days = {},
            year = this.getThisYear(),
            firstDayInYear = new Date(year, 0).moveToFirstDayOfMonth();
        
        for (var i = 0; i < 366; i++)
        {
          if (i == 0)
          {
            nextDay = firstDayInYear;
          }
          else
          {
            nextDay = new Date(ndays[i-1]).addDays(1);
          };

          ndays.push(new Date(nextDay));
        };

        for (var i = 0; i < 366; i++)
        {
          days[i+1] = {
            first: {
              day: ndays[i],
              timeStamp: new Date(ndays[i]).getTime()
            },
            last: {
              day: ndays[i+1],
              timeStamp: new Date(ndays[i+1]).getTime()
            }
          };
        };

        /**
         * Remove not existing date
         */
        if (!days[366].timeStamp)
        {
          delete days[366];

          days.total = 365;
        }
        else
        {
          days.total = 366;
        };

        return days;
      },

      registerPeriods: function ()
      {
        var periods = angular.fromJson(Storage.get('periods') || '{}');

        Storage.add('periods', angular.toJson({
          months: this.getMonthTimeStamps(),
          weeks: this.getWeekTimeStamps(),
          days: this.getDayTimeStamps()
        }));      
      },

      getPeriods: function ()
      {
        return angular.fromJson(Storage.get('periods'));
      }
    }
  }
])


/**
 * EventBus Service
 */
.factory('EventBus', 
[
  '$rootScope', 
  function ($rootScope)
  {
    var self      = this,
        listeners = {},
        history   = {};
   
    self.emit = function (eventName) 
    {
      var args = Array.prototype.slice.call(arguments, 1);

      angular.forEach(listeners, function(fns, eventName) 
      {
        angular.forEach(fns, function(fn, key)
        {
          if (!args.length)
          {
            $rootScope.$emit(eventName, fn());
          }
          else
          {
            $rootScope.$emit(eventName, fn(args));
          };
        });
      });
    };
   
    self.on = function (eventName, fn) 
    {
      if (!(listeners[eventName] instanceof Array)) listeners[eventName] = [];

      listeners[eventName].push(fn);

      $rootScope.$on(listeners[eventName], fn);
    };
   
    self.remove = function (eventName, fn) 
    {
      var lsnrs = listeners[eventName],
          ind   = lsnrs instanceof Array ? lsnrs.indexOf(fn) : -1;

      if (ind > -1) listeners[eventName].splice(ind,1);
    };
   
    self.removeAll = function (eventName) 
    {
      if (eventName)
      {
        listeners[eventName] = [];
      }
      else
      {
        listeners = {};
      }
    };
  }
])


/**
 * TODO
 * Implement a call registering system with general error handling
 * 
 * Intercepts *all* angular ajax http calls
 */
.factory('Interceptor', 
[
  '$q', '$location', 
  function ($q, $location)
  {
    return function (promise)
    {
      return promise.then(
      /**
       * Succeded
       */
      function (response) 
      {
        // console.log('call ->', arguments[0].config.url, 'method ->', arguments[0].config.method, arguments);
        return response;
      },
      /**
       * Failed
       */
      function (response) 
      {
        /**
         * TODO
         * Possible bug !
         */
        // if (response.status == 403)
        // {
        //   alert("Session timeout , please re-login");
        //   $location.path("/login");
        // };

        return $q.reject(response);
      });
    }
  }
])


/**
 * MD5
 */
.factory('MD5', 
  function ()
  {
    return function (string)
    {
      function RotateLeft(lValue, iShiftBits)
      {
        return (lValue<<iShiftBits) | (lValue>>>(32-iShiftBits));
      }
     
      function AddUnsigned(lX,lY)
      {
        var lX4,lY4,lX8,lY8,lResult;
        lX8 = (lX & 0x80000000);
        lY8 = (lY & 0x80000000);
        lX4 = (lX & 0x40000000);
        lY4 = (lY & 0x40000000);
        lResult = (lX & 0x3FFFFFFF)+(lY & 0x3FFFFFFF);

        if (lX4 & lY4) return (lResult ^ 0x80000000 ^ lX8 ^ lY8);

        if (lX4 | lY4)
        {
          if (lResult & 0x40000000)
          {
            return (lResult ^ 0xC0000000 ^ lX8 ^ lY8);
          }
          else
          {
            return (lResult ^ 0x40000000 ^ lX8 ^ lY8);
          }
        }
        else
        {
          return (lResult ^ lX8 ^ lY8);
        }
      }
     
      function F(x,y,z) { return (x & y) | ((~x) & z) }
      function G(x,y,z) { return (x & z) | (y & (~z)) }
      function H(x,y,z) { return (x ^ y ^ z) }
      function I(x,y,z) { return (y ^ (x | (~z))) }
     
      function FF(a,b,c,d,x,s,ac)
      {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(F(b, c, d), x), ac));

        return AddUnsigned(RotateLeft(a, s), b);
      }
     
      function GG(a,b,c,d,x,s,ac)
      {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(G(b, c, d), x), ac));

        return AddUnsigned(RotateLeft(a, s), b);
      }
     
      function HH(a,b,c,d,x,s,ac)
      {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(H(b, c, d), x), ac));

        return AddUnsigned(RotateLeft(a, s), b);
      }
     
      function II(a,b,c,d,x,s,ac)
      {
        a = AddUnsigned(a, AddUnsigned(AddUnsigned(I(b, c, d), x), ac));

        return AddUnsigned(RotateLeft(a, s), b);
      }
     
      function ConvertToWordArray(string)
      {
        var lWordCount,
            lMessageLength = string.length,
            lNumberOfWords_temp1 = lMessageLength + 8,
            lNumberOfWords_temp2 = (lNumberOfWords_temp1 - (lNumberOfWords_temp1 % 64)) / 64,
            lNumberOfWords = (lNumberOfWords_temp2 + 1) * 16,
            lWordArray = Array(lNumberOfWords - 1),
            lBytePosition = 0,
            lByteCount = 0;

        while ( lByteCount < lMessageLength )
        {
          lWordCount = (lByteCount - (lByteCount % 4)) / 4;
          lBytePosition = (lByteCount % 4)*8;
          lWordArray[lWordCount] = (lWordArray[lWordCount] | (string.charCodeAt(lByteCount)<<lBytePosition));
          lByteCount++;
        }

        lWordCount = (lByteCount - (lByteCount % 4)) / 4;
        lBytePosition = (lByteCount % 4) * 8;
        lWordArray[lWordCount] = lWordArray[lWordCount] | (0x80<<lBytePosition);
        lWordArray[lNumberOfWords-2] = lMessageLength<<3;
        lWordArray[lNumberOfWords-1] = lMessageLength>>>29;
        return lWordArray;
      }
     
      function WordToHex(lValue)
      {
        var WordToHexValue = "", 
            WordToHexValue_temp = "",
            lByte,
            lCount;

        for (lCount = 0; lCount<=3; lCount++)
        {
          lByte = (lValue>>>(lCount*8)) & 255;
          WordToHexValue_temp = "0" + lByte.toString(16);
          WordToHexValue = WordToHexValue + WordToHexValue_temp.substr(WordToHexValue_temp.length - 2, 2);
        }

        return WordToHexValue;
      };
     
      function Utf8Encode(string)
      {
        string = string.replace(/\r\n/g, "\n");

        var utftext = "";
     
        for (var n = 0; n < string.length; n++)
        {
          var c = string.charCodeAt(n);
     
          if (c < 128)
          {
            utftext += String.fromCharCode(c);
          }
          else if((c > 127) && (c < 2048))
          {
            utftext += String.fromCharCode((c >> 6) | 192);
            utftext += String.fromCharCode((c & 63) | 128);
          }
          else
          {
            utftext += String.fromCharCode((c >> 12) | 224);
            utftext += String.fromCharCode(((c >> 6) & 63) | 128);
            utftext += String.fromCharCode((c & 63) | 128);
          }
        }
     
        return utftext;
      };
     
      var x = Array();
      var k,AA,BB,CC,DD,a,b,c,d;
      var S11=7, S12=12, S13=17, S14=22;
      var S21=5, S22=9 , S23=14, S24=20;
      var S31=4, S32=11, S33=16, S34=23;
      var S41=6, S42=10, S43=15, S44=21;
     
      string = Utf8Encode(string);
     
      x = ConvertToWordArray(string);
     
      a = 0x67452301; b = 0xEFCDAB89; c = 0x98BADCFE; d = 0x10325476;
     
      for (k=0; k<x.length; k+=16)
      {
        AA=a; BB=b; CC=c; DD=d;
        a=FF(a,b,c,d,x[k+0], S11,0xD76AA478);
        d=FF(d,a,b,c,x[k+1], S12,0xE8C7B756);
        c=FF(c,d,a,b,x[k+2], S13,0x242070DB);
        b=FF(b,c,d,a,x[k+3], S14,0xC1BDCEEE);
        a=FF(a,b,c,d,x[k+4], S11,0xF57C0FAF);
        d=FF(d,a,b,c,x[k+5], S12,0x4787C62A);
        c=FF(c,d,a,b,x[k+6], S13,0xA8304613);
        b=FF(b,c,d,a,x[k+7], S14,0xFD469501);
        a=FF(a,b,c,d,x[k+8], S11,0x698098D8);
        d=FF(d,a,b,c,x[k+9], S12,0x8B44F7AF);
        c=FF(c,d,a,b,x[k+10],S13,0xFFFF5BB1);
        b=FF(b,c,d,a,x[k+11],S14,0x895CD7BE);
        a=FF(a,b,c,d,x[k+12],S11,0x6B901122);
        d=FF(d,a,b,c,x[k+13],S12,0xFD987193);
        c=FF(c,d,a,b,x[k+14],S13,0xA679438E);
        b=FF(b,c,d,a,x[k+15],S14,0x49B40821);
        a=GG(a,b,c,d,x[k+1], S21,0xF61E2562);
        d=GG(d,a,b,c,x[k+6], S22,0xC040B340);
        c=GG(c,d,a,b,x[k+11],S23,0x265E5A51);
        b=GG(b,c,d,a,x[k+0], S24,0xE9B6C7AA);
        a=GG(a,b,c,d,x[k+5], S21,0xD62F105D);
        d=GG(d,a,b,c,x[k+10],S22,0x2441453);
        c=GG(c,d,a,b,x[k+15],S23,0xD8A1E681);
        b=GG(b,c,d,a,x[k+4], S24,0xE7D3FBC8);
        a=GG(a,b,c,d,x[k+9], S21,0x21E1CDE6);
        d=GG(d,a,b,c,x[k+14],S22,0xC33707D6);
        c=GG(c,d,a,b,x[k+3], S23,0xF4D50D87);
        b=GG(b,c,d,a,x[k+8], S24,0x455A14ED);
        a=GG(a,b,c,d,x[k+13],S21,0xA9E3E905);
        d=GG(d,a,b,c,x[k+2], S22,0xFCEFA3F8);
        c=GG(c,d,a,b,x[k+7], S23,0x676F02D9);
        b=GG(b,c,d,a,x[k+12],S24,0x8D2A4C8A);
        a=HH(a,b,c,d,x[k+5], S31,0xFFFA3942);
        d=HH(d,a,b,c,x[k+8], S32,0x8771F681);
        c=HH(c,d,a,b,x[k+11],S33,0x6D9D6122);
        b=HH(b,c,d,a,x[k+14],S34,0xFDE5380C);
        a=HH(a,b,c,d,x[k+1], S31,0xA4BEEA44);
        d=HH(d,a,b,c,x[k+4], S32,0x4BDECFA9);
        c=HH(c,d,a,b,x[k+7], S33,0xF6BB4B60);
        b=HH(b,c,d,a,x[k+10],S34,0xBEBFBC70);
        a=HH(a,b,c,d,x[k+13],S31,0x289B7EC6);
        d=HH(d,a,b,c,x[k+0], S32,0xEAA127FA);
        c=HH(c,d,a,b,x[k+3], S33,0xD4EF3085);
        b=HH(b,c,d,a,x[k+6], S34,0x4881D05);
        a=HH(a,b,c,d,x[k+9], S31,0xD9D4D039);
        d=HH(d,a,b,c,x[k+12],S32,0xE6DB99E5);
        c=HH(c,d,a,b,x[k+15],S33,0x1FA27CF8);
        b=HH(b,c,d,a,x[k+2], S34,0xC4AC5665);
        a=II(a,b,c,d,x[k+0], S41,0xF4292244);
        d=II(d,a,b,c,x[k+7], S42,0x432AFF97);
        c=II(c,d,a,b,x[k+14],S43,0xAB9423A7);
        b=II(b,c,d,a,x[k+5], S44,0xFC93A039);
        a=II(a,b,c,d,x[k+12],S41,0x655B59C3);
        d=II(d,a,b,c,x[k+3], S42,0x8F0CCC92);
        c=II(c,d,a,b,x[k+10],S43,0xFFEFF47D);
        b=II(b,c,d,a,x[k+1], S44,0x85845DD1);
        a=II(a,b,c,d,x[k+8], S41,0x6FA87E4F);
        d=II(d,a,b,c,x[k+15],S42,0xFE2CE6E0);
        c=II(c,d,a,b,x[k+6], S43,0xA3014314);
        b=II(b,c,d,a,x[k+13],S44,0x4E0811A1);
        a=II(a,b,c,d,x[k+4], S41,0xF7537E82);
        d=II(d,a,b,c,x[k+11],S42,0xBD3AF235);
        c=II(c,d,a,b,x[k+2], S43,0x2AD7D2BB);
        b=II(b,c,d,a,x[k+9], S44,0xEB86D391);
        a=AddUnsigned(a,AA);
        b=AddUnsigned(b,BB);
        c=AddUnsigned(c,CC);
        d=AddUnsigned(d,DD);
      }
     
      var temp = WordToHex(a) + WordToHex(b) + WordToHex(c) + WordToHex(d);
     
      return temp.toLowerCase();
    }
  }
)


/**
 * Storage service for localStorage, Session and cookies management
 */
.factory('Storage', ['$rootScope', '$config', function ($rootScope, $config)
{
  // If there is a prefix set in the config lets use that with an appended 
  // period for readability
  // var prefix = angularLocalStorage.constant;
  
  if ($config.title.substr(-1) !== '.') $config.title = !!$config.title ? $config.title + '.' : '';

  // Checks the browser to see if local storage is supported
  var browserSupportsLocalStorage = function ()
  {
    try {
      return ('localStorage' in window && window['localStorage'] !== null);           
    }
    catch (e) {
      return false;
    }
  };

  // Directly adds a value to local storage
  // If local storage is not available in the browser use cookies
  // Example use: Storage.add('library','angular');
  var addToLocalStorage = function (key, value)
  {
    if (!browserSupportsLocalStorage()) return false;

    // 0 and "" is allowed as a value but let's limit other falsey values like "undefined"
    if (!value && value !== 0 && value !== "") return false;

    try {
      localStorage.setItem($config.title + key, value);
    }
    catch (e) {
      return false;
    };

    return true;
  };


  // Directly get a value from local storage
  // Example use: Storage.get('library'); // returns 'angular'
  var getFromLocalStorage = function (key)
  {
    if (!browserSupportsLocalStorage()) return false;

    var item = localStorage.getItem($config.title + key);

    if (!item) return null;

    return item;
  };


  // Remove an item from local storage
  // Example use: Storage.remove('library'); // removes the key/value pair of library='angular'
  var removeFromLocalStorage = function (key) 
  {
    if (!browserSupportsLocalStorage()) return false;

    try {
      localStorage.removeItem($config.title + key);
    } 
    catch (e) {
      return false;
    };

    return true;
  };


  // Remove all data for this app from local storage
  // Example use: Storage.clearAll();
  // Should be used mostly for development purposes
  var clearAllFromLocalStorage = function () 
  {
    if (!browserSupportsLocalStorage()) return false;

    var prefixLength = $config.title.length;

    for (var key in localStorage) 
    {
      // Only remove items that are for this app
      if (key.substr(0, prefixLength) === $config.title) 
      {
        try {
          removeFromLocalStorage(key.substr(prefixLength));
        } 
        catch (e) {
          return false;
        };
      };
    };

    return true;
  };


  /**
   * Checks the browser to see if session storage is supported
   */
  var browserSupportsSessionStorage = function ()
  {
    try {
      return ('sessionStorage' in window && window['sessionStorage'] !== null);           
    }
    catch (e) {
      return false;
    }
  };


  /**
   * Directly adds a value to session storage
   */
  var addToSessionStorage = function (key, value)
  {
    if (!browserSupportsSessionStorage()) return false;

    if (!value && value !== 0 && value !== "") return false;

    try {
      sessionStorage.setItem($config.title + key, value);
    }
    catch (e) {
      return false;
    };

    return true;
  };


  /**
   * Get value from session storage
   */
  var getFromSessionStorage = function (key)
  {
    if (!browserSupportsSessionStorage()) return false;

    var item = sessionStorage.getItem($config.title + key);

    if (!item) return null;

    return item;
  };


  /**
   * Remove item from session storage
   */
  var removeFromSessionStorage = function (key) 
  {
    if (!browserSupportsSessionStorage()) return false;

    try {
      sessionStorage.removeItem($config.title + key);
    } 
    catch (e) {
      return false;
    };

    return true;
  };


  /**
   * Remove all data from session storage
   */
  var clearAllFromSessionStorage = function () 
  {
    if (!browserSupportsSessionStorage()) return false;

    var prefixLength = $config.title.length;

    for (var key in sessionStorage) 
    {
      // Only remove items that are for this app
      if (key.substr(0, prefixLength) === $config.title) 
      {
        try {
          removeFromSessionStorage(key.substr(prefixLength));
        } 
        catch (e) {
          return false;
        };
      };
    };

    return true;
  };


  // Checks the browser to see if cookies are supported
  var browserSupportsCookies = function () 
  {
    try {
      return navigator.cookieEnabled ||
        ("cookie" in document && (document.cookie.length > 0 ||
        (document.cookie = "test").indexOf.call(document.cookie, "test") > -1));
    } 
    catch (e) {
      return false;
    }
  };


  // Directly adds a value to cookies
  // Typically used as a fallback is local storage is not available in the browser
  // Example use: Storage.cookie.add('library','angular');
  var addToCookies = function (key, value) 
  {
    if (typeof value == "undefined") return false;

    if (!browserSupportsCookies())  return false;

    try {
      var expiry      = '', 
          expiryDate  = new Date();

      if (value === null) 
      {
        $config.cookie.expiry = -1;

        value = '';
      };

      if ($config.cookie.expiry !== 0) 
      {
        expiryDate.setTime(expiryDate.getTime() + ($config.cookie.expiry * 60 * 60 * 1000));

        expiry = "; expires=" + expiryDate.toGMTString();
      };

      document.cookie = $config.title + 
                        key + 
                        "=" + 
                        //encodeURIComponent(value) + 
                        value + 
                        expiry + 
                        "; path=" + 
                        $config.cookie.path;
    } 
    catch (e) {
      return false;
    };

    return true;
  };


  // Directly get a value from a cookie
  // Example use: Storage.cookie.get('library'); // returns 'angular'
  var getFromCookies = function (key) 
  {
    if (!browserSupportsCookies()) 
    {
      $rootScope.$broadcast('StorageModule.notification.error', 'COOKIES_NOT_SUPPORTED');
      return false;
    }

    var cookies = document.cookie.split(';');
    
    for (var i=0; i < cookies.length; i++) 
    {
      var thisCookie = cookies[i];
      
      while (thisCookie.charAt(0)==' ')
        thisCookie = thisCookie.substring(1, thisCookie.length);

      if (thisCookie.indexOf($config.title + key + '=') == 0)
        return decodeURIComponent(thisCookie.substring($config.title.length + key.length + 1, thisCookie.length));
    };

    return null;
  };


  var removeFromCookies = function (key) 
  {
    addToCookies(key, null);
  };


  var clearAllFromCookies = function () 
  {
    var thisCookie    = null, 
        thisKey       = null,
        prefixLength  = $config.title.length,
        cookies       = document.cookie.split(';');
    
    for (var i=0; i < cookies.length; i++) 
    {
      thisCookie = cookies[i];
      
      while (thisCookie.charAt(0) == ' ') 
        thisCookie = thisCookie.substring(1, thisCookie.length);

      key = thisCookie.substring(prefixLength, thisCookie.indexOf('='));

      removeFromCookies(key);
    };
  };


  var storageSize = function (key)
  {
    var item = (key) ? localStorage.key : localStorage;

    return ((3 + ((item.length * 16) / (8 * 1024))) * 0.0009765625).toPrecision(2) + ' MB';
  }


  var getPeriods = function ()
  {
    return angular.fromJson(getFromLocalStorage('periods'));
  };


  var getGroups = function ()
  {
    return angular.fromJson(getFromLocalStorage('groups'));
  };


  var getMembers = function ()
  {
    return angular.fromJson(getFromLocalStorage('members'));
  };


  var getSettings = function ()
  {
    var settings = angular.fromJson(getFromLocalStorage('resources'));

    return (!settings.settingsWebPaige) ? $rootScope.config.defaults.settingsWebPaige : angular.fromJson(settings.settingsWebPaige);
  };


  return {
    isSupported: browserSupportsLocalStorage,
    add:        addToLocalStorage,
    get:        getFromLocalStorage,
    remove:     removeFromLocalStorage,
    clearAll:   clearAllFromLocalStorage,
    session: {
      add:      addToSessionStorage,
      get:      getFromSessionStorage,
      remove:   removeFromSessionStorage,
      clearAll: clearAllFromSessionStorage
    },
    cookie: {
      add:      addToCookies,
      get:      getFromCookies,
      remove:   removeFromCookies,
      clearAll: clearAllFromCookies
    },
    size: storageSize,
    local: {
      periods:  getPeriods,
      groups:   getGroups,
      members:  getMembers,
      settings: getSettings
    }
  }

}])


/**
 * TODO
 * Add example usage!
 * 
 * String manupulators
 */
.factory('Strings', 
  function ()
  {
    return {
      /**
       * Truncate string from words with ..
       */
      truncate: function (txt, n, useWordBoundary)
      {
         var toLong = txt.length > n,
             s_ = toLong ? txt.substr(0, n-1) : txt,
             s_ = useWordBoundary && toLong ? s_.substr(0,s_.lastIndexOf(' ')) : s_;

         return toLong ? s_ + '..' : s_;
      }
    }
  }
)



/**
 * Announcer
 */
.factory('Announcer', 
  function ()
  {
    return {
      /**
       * TODO
       * Modify p2000 script in ask70 for date conversions!!
       *
       * p2000 messages processor
       */
      process: function (results)
      {
        var alarms  = {
              short:  [],
              long:   [] 
            },
            limit   = 4,
            count   = 0;

        angular.forEach(results, function (alarm, index)
        {
          if (alarm.body)
          {
            if (alarm.body.match(/Prio 1/) || alarm.body.match(/PRIO 1/))
            {
              alarm.body = alarm.body.replace('Prio 1 ', '');
              alarm.prio = {
                1:    true,
                test: false
              };
            };

            if (alarm.body.match(/Prio 2/) || alarm.body.match(/PRIO 2/))
            {
              alarm.body = alarm.body.replace('Prio 2 ', '');
              alarm.prio = {
                2:    true,
                test: false
              };
            };

            if (alarm.body.match(/Prio 3/) || alarm.body.match(/PRIO 3/))
            {
              alarm.body = alarm.body.replace('Prio 3 ', '');
              alarm.prio = {
                3:    true,
                test: false
              }
            };

            if (alarm.body.match(/PROEFALARM/))
            {
              alarm.prio = {
                test: true
              };
            };

            // var dates     = alarm.day.split('-'),
            //     swap      = dates[0] + 
            //                 '-' + 
            //                 dates[1] + 
            //                 '-' + 
            //                 dates[2],
            //     dstr      = swap + ' ' + alarm.time,
            //     datetime  = new Date(alarm.day + ' ' + alarm.time).toString('dd-MM-yy HH:mm:ss'),
            //     timeStamp = new Date(datetime).getTime();
            // alarm.datetime = datetime;
            // alarm.timeStamp = timeStamp;

            if (count < 4) alarms.short.push(alarm);

            alarms.long.push(alarm);

            count++;
          }
        });

        return alarms;
      }
    }
  }
)


/**
 * Planboard data processors
 */
.factory('Sloter', 
[
  '$rootScope', 'Storage', 
  function ($rootScope, Storage) 
  {
    return {

      /**
       * Getters
       */
      get: {
        groups: function ()
        {
          var groups = {};

          angular.forEach(Storage.local.groups(), function (group, index)
          {
            groups[group.uuid] = group.name;
          });

          return groups;
        },

        members: function ()
        {
          var members = {};

          angular.forEach(Storage.local.members(), function (member, index)
          {
            members[member.uuid] = member.name;
          });

          return members;
        }
      },

      /**
       * Wrap for sorting in list
       */
      wrapper: function (rank) { return '<span style="display:none;">' + rank + '</span>' },

      /**
       * Wrap secrets in slot contents
       */
      secret: function (content) { return '<span class="secret">' + content + '</span>' },

      /**
       * Add loading bars on both ends
       */
      addLoading: function (data, timedata, rows)
      {
        angular.forEach(rows, function(row, index)
        {
          timedata.push({
            start:  data.periods.end,
            end:    1577836800000,
            group:  row,
            content:    'loading',
            className:  'state-loading-right',
            editable:   false
          });

          timedata.push({
            start:  0,
            end:    data.periods.start,
            group:  row,
            content:    'loading',
            className:  'state-loading-left',
            editable:   false
          });
        });

        return timedata;
      },

      /**
       * Handle user slots
       */
      user: function (data, timedata, config)
      {
        var _this = this;

        angular.forEach(data.user, function (slot, index)
        {
          angular.forEach(config.legenda, function (value, legenda)
          {
            if (slot.text == legenda && value)
            {
              timedata.push({
                start:  Math.round(slot.start * 1000),
                end:    Math.round(slot.end * 1000),
                group:  (slot.recursive) ?  _this.wrapper('b') + $rootScope.ui.planboard.weeklyPlanning + _this.wrapper('recursive') : 
                                            _this.wrapper('a') + $rootScope.ui.planboard.planning + _this.wrapper('planning'),
                content:  _this.secret(angular.toJson({
                  type:   'slot',
                  id:     slot.id, 
                  recursive: slot.recursive, 
                  state:  slot.text 
                  })),
                className:  config.states[slot.text].className,
                editable:   true
              });
            };
          });       
        });

        timedata = _this.addLoading(data, timedata, [
          _this.wrapper('b') + $rootScope.ui.planboard.weeklyPlanning + _this.wrapper('recursive'),
          _this.wrapper('a') + $rootScope.ui.planboard.planning + _this.wrapper('planning')
        ]);

        return timedata;
      },
    
      /**
       * TODO
       * Look for ways to combine with user
       * 
       * Profile timeline data processing
       */
      profile: function (data, config)
      {
        var _this = this,
            timedata = [];

        angular.forEach(data, function (slot, index)
        {
          angular.forEach(config.legenda, function (value, legenda)
          {
            if (slot.text == legenda && value)
            {
              timedata.push({
                start:  Math.round(slot.start * 1000),
                end:    Math.round(slot.end * 1000),
                group:  (slot.recursive) ?  _this.wrapper('b') + $rootScope.ui.planboard.weeklyPlanning + _this.wrapper('recursive') : 
                                            _this.wrapper('a') + $rootScope.ui.planboard.planning + _this.wrapper('planning'),
                content: _this.secret(angular.toJson({
                  type: 'slot',
                  id:   slot.id, 
                  recursive:  slot.recursive, 
                  state:      slot.text 
                  })),
                className:  config.states[slot.text].className,
                editable:   true
              });  
            };
          });       
        });

        timedata.push({
          start:  0,
          end:    1,
          group:  _this.wrapper('b') + $rootScope.ui.planboard.weeklyPlanning + _this.wrapper('recursive'),
          content:    '',
          className:  null,
          editable:   false
        });

        timedata.push({
          start:  0,
          end:    1,
          group:  _this.wrapper('a') + $rootScope.ui.planboard.planning + _this.wrapper('planning'),
          content:    '',
          className:  null,
          editable:   false
        });

        return timedata;
      },

      /**
       * Handle group name whether divisions selected
       */
      namer: function (data, divisions, privilage)
      {
        var groups  = this.get.groups(),
            name    = groups[data.aggs.id],
            link    = '<a href="#/groups?uuid=' + 
                      data.aggs.id + 
                      '#view">' +
                      name +
                      '</a>',
                      title;

        if (data.aggs.division == 'all' || data.aggs.division == undefined)
        {
          title = (privilage == 1) ? link : '<span>' + name + '</span>';
        }
        else
        {
          var label;

          angular.forEach(divisions, function (division, index) { if (division.id == data.aggs.division) label = division.label; });

          title = (privilage == 1) ? link : '<span>' + name + '</span>';

          title += ' <span class="label">' + label + '</span>';
        };

        return title;
      },

      /**
       * Handle group aggs (with divisions) with bars
       */
      bars: function (data, timedata, config, name)
      {
        var _this = this,
            maxh = 0;

        angular.forEach(data.aggs.data, function (slot, index) { if (slot.wish > maxh)  maxh = slot.wish; });

        angular.forEach(data.aggs.data, function (slot, index)
        {
          var maxNum      = maxh,
              num         = slot.wish,
              xwish       = num,
              height      = Math.round(num / maxNum * 80 + 20), // a percentage, with a lower bound on 20%
              minHeight   = height,
              style       = 'height:' + height + 'px;',
              requirement = '<div class="requirement" style="' + 
                            style + 
                            '" ' + 

                            'title="'+'Minimum aantal benodigden'+': ' + 

                            num + 
                            ' personen"></div>';

          num = slot.wish + slot.diff;

          var xcurrent = num;

          height = Math.round(num / maxNum * 80 + 20);

          if (slot.diff >= 0 && slot.diff < 7)
          {
            switch (slot.diff)
            {
              case 0:
                var color = config.densities.even;
              break
              case 1:
                var color = config.densities.one;
              break;
              case 2:
                var color = config.densities.two;
              break;
              case 3:
                var color = config.densities.three;
              break;
              case 4:
                var color = config.densities.four;
              break;
              case 5:
                var color = config.densities.five;
              break;
              case 6:
                var color = config.densities.six;
              break;
            }
          }
          else if (slot.diff >= 7)
          {
            var color = config.densities.more;
          }
          else
          {
            var color = config.densities.less;
          };

          var span = '<span class="badge badge-inverse">' + slot.diff + '</span>';

          if (xcurrent > xwish) height = minHeight;

          style = 'height:' + height + 'px;' + 'background-color: ' + color + ';';

          var actual = '<div class="bar" style="' + 
                        style + 
                        '" ' + 

                        ' title="Huidig aantal beschikbaar: ' + 

                        num + 
                        ' personen">' + 
                        span + 
                        '</div>';

          if (  (slot.diff > 0  && config.legenda.groups.more) ||
                (slot.diff == 0 && config.legenda.groups.even) || 
                (slot.diff < 0  && config.legenda.groups.less) )
          {
            timedata.push({
              start:    Math.round(slot.start * 1000),
              end:      Math.round(slot.end * 1000),
              group:    _this.wrapper('c') + name,
              content:  requirement + 
                        actual +
                        _this.secret(angular.toJson({
                          type: 'group',
                          diff: slot.diff,
                          group: name
                        })),
              className: 'group-aggs',
              editable: false
            });
          };

          timedata = _this.addLoading(data, timedata, [
            _this.wrapper('c') + name
          ]);
        });

        return timedata;
      },

      /**
       * Process plain group aggs
       */
      aggs: function (data, timedata, config, name)
      {
        var _this = this;

        angular.forEach(data.aggs.data, function (slot, index)
        {
          var cn;

          if (slot.diff >= 0 && slot.diff < 7)
          {
            switch (slot.diff)
            {
              case 0: cn = 'even';  break
              case 1: cn = 1;       break
              case 2: cn = 2;       break
              case 3: cn = 3;       break
              case 4: cn = 4;       break
              case 5: cn = 5;       break
              case 6: cn = 6;       break
            }
          }
          else if (slot.diff >= 7)
          {
            cn = 'more';
          }
          else
          {
            cn = 'less'
          };

          if (  (slot.diff > 0  && config.legenda.groups.more) ||
                (slot.diff == 0 && config.legenda.groups.even) || 
                (slot.diff < 0  && config.legenda.groups.less) )
          {
            timedata.push({
              start:  Math.round(slot.start * 1000),
              end:    Math.round(slot.end * 1000),
              group: _this.wrapper('c') + name,
              content:  cn +
                        _this.secret(angular.toJson({
                          type: 'group',
                          diff: slot.diff,
                          group: name
                        })),
              className:  'agg-' + cn,
              editable:   false
            });
          };

          timedata = _this.addLoading(data, timedata, [
            _this.wrapper('c') + name
          ]);
        });

        return timedata;
      },

      /**
       * Wish slots
       */
      wishes: function (data, timedata, name)
      {
        var _this = this;

        angular.forEach(data.aggs.wishes, function (wish, index)
        {
          if ( wish.count >= 7 )
          {
            var cn = 'wishes-more';
          }
          else if ( wish.count == 0 )
          {
            var cn = 'wishes-even';
          }
          else
          {
            var cn = 'wishes-' + wish.count;
          };

          timedata.push({
            start:  Math.round(wish.start * 1000),
            end:    Math.round(wish.end * 1000),
            group:  _this.wrapper('c') + name + ' (Wishes)',
            content: '<span class="badge badge-inverse">' + wish.count + '</span>' + 
                      _this.secret(angular.toJson({
                        type: 'wish',
                        wish: wish.count,
                        group: name,
                        groupId: data.aggs.id
                      })),
            className:  cn,
            editable:   false
          });

          timedata = _this.addLoading(data, timedata, [
            _this.wrapper('c') + name + ' (Wishes)'
          ]);
        });

        return timedata;
      },

      /**
       * Process members
       */
      members: function (data, timedata, config, privilage)
      {
        var _this   = this,
            members = this.get.members();          

        angular.forEach(data.members, function (member, index)
        {
          var link = (privilage == 1) ? 
                        _this.wrapper('d') + 
                        '<a href="#/profile/' + 
                        member.id + 
                        '#timeline">' + 
                        members[member.id] + 
                        '</a>' :
                        _this.wrapper('d') + 
                        members[member.id];

          angular.forEach(member.data, function (slot, i)
          {
            angular.forEach(config.legenda, function (value, legenda)
            {
              if (slot.text == legenda && value)
              {
                timedata.push({
                  start:  Math.round(slot.start * 1000),
                  end:    Math.round(slot.end * 1000),
                  group:  link,
                  content: _this.secret(angular.toJson({ 
                    type: 'member',
                    id:   slot.id, 
                    mid:  member.id,
                    recursive: slot.recursive, 
                    state: slot.text 
                    })),
                  className:  config.states[slot.text].className,
                  editable:   false
                });
              };
            });
          });

          timedata.push({
            start:    0,
            end:      0,
            group:    link,
            content:  null,
            className:null,
            editable: false
          });

          timedata = _this.addLoading(data, timedata, [ link ]);

          /**
           * TODO
           * Good place to host this here?
           */
          angular.forEach(member.stats, function (stat, index)
          {
            var state = stat.state.split('.');
            state.reverse();
            stat.state = 'bar-' + state[0];
          });
        });

        return timedata;
      },

      /**
       * Produce pie charts
       */
      pies: function (data)
      {
        document.getElementById("groupPie").innerHTML = '';

        var ratios    = [],
            colorMap  = {
              more: '#415e6b',
              even: '#ba6a24',
              less: '#a0a0a0'
            },
            colors    = [],
            xratios   = [];

        angular.forEach(data.aggs.ratios, function (ratio, index)
        {
          if (ratio != 0)
          {
            ratios.push({
              ratio: ratio, 
              color: colorMap[index]
            });
          };
        });

        ratios = ratios.sort(function (a, b) { return b.ratio - a.ratio });

        angular.forEach(ratios, function (ratio, index)
        {
          colors.push(ratio.color);
          xratios.push(ratio.ratio);
        });

        var r   = Raphael("groupPie"),
            pie = r.piechart(120, 120, 100, xratios, { colors: colors });
      },
      
      /**
       * Timeline data processing
       */
      process: function (data, config, divisions, privilage)
      {
        var _this     = this,
            timedata  = [];

        if (data.user) timedata = _this.user(data, timedata, config);

        if (data.aggs)
        {
          var name = _this.namer(data, divisions, privilage);

          if (config.bar) 
          {
            timedata = _this.bars(data, timedata, config, name);
          }
          else
          {
            timedata = _this.aggs(data, timedata, config, name);
          };
        };

        if (config.wishes) timedata = _this.wishes(data, timedata, name);

        if (data.members) timedata = _this.members(data, timedata, config, privilage);

        if (data.aggs && data.aggs.ratios) _this.pies(data);

        return timedata;
      }

    }
  }
])


/**
 * Planboard stats processors
 */
.factory('Stats', 
[
  '$rootScope', 'Storage', 
  function ($rootScope, Storage) 
  {
    return {
      /**
       * Group agg stats
       */
      aggs: function (data)
      {
        var stats = {
              less: 0,
              even: 0,
              more: 0        
            },
            durations = {
              less: 0,
              even: 0,
              more: 0,
              total: 0
            },
            total = data.length;

        angular.forEach(data, function (slot, index)
        {
          if (slot.diff < 0)
          {
            stats.less++;
          }
          else if (slot.diff == 0)
          {
            stats.even++;
          }
          else
          {
            stats.more++;
          };

          var slotDiff = slot.end - slot.start;

          if (slot.diff < 0)
          {
            durations.less = durations.less + slotDiff;
          }
          else if (slot.diff == 0)
          {
            durations.even = durations.even + slotDiff;
          }
          else
          {
            durations.more = durations.more + slotDiff;
          };

          durations.total = durations.total + slotDiff;
        });

        return {
          ratios: {
            less: Math.round((stats.less / total) * 100),
            even: Math.round((stats.even / total) * 100),
            more: Math.round((stats.more / total) * 100)
          },
          durations: durations
        }
      },

      /**
       * Group pie stats
       */
      pies: function (data)
      {
        var stats = {
              less: 0,
              even: 0,
              more: 0        
            },
            total = data.length;

        angular.forEach(data, function (slot, index)
        {
          if (slot.diff < 0)
          {
            stats.less++;
          }
          else if (slot.diff == 0)
          {
            stats.even++;
          }
          else
          {
            stats.more++;
          };
        });

        return {
          less: Math.round((stats.less / total) * 100),
          even: Math.round((stats.even / total) * 100),
          more: Math.round((stats.more / total) * 100)
        };
      },

      /**
       * Member stats
       */
      member: function (data)
      {
        var stats = {},
            total = 0;

        angular.forEach(data, function (slot, index)
        {
          if (stats[slot.text])
          {
            stats[slot.text]++;
          }
          else
          {
            stats[slot.text] = 1;
          };

          total++;
        });

        //console.warn('stats ->', stats, total);

        var ratios = [];

        angular.forEach(stats, function (stat, index)
        {
          ratios.push({
            state: index,
            ratio: (stat / total) * 100
          });

          //console.warn(stat, index);
          //ratios[index] = (stat / total) * 100;
        });

        //console.warn('ratios ->', ratios);

        // var confirm = 0;
        // angular.forEach(ratios, function(ratio, index)
        // {
        //   confirm = confirm + ratio;
        // });
        // console.warn('confirm ->', confirm);
        
        return ratios;
      }

    }
  }
]);;'use strict';


angular.module('WebPaige.Filters', ['ngResource'])


/**
 * Translate roles
 */
.filter('translateRole', 
[
	'$config', 
	function ($config)
	{
		return function (role)
		{
			var urole;

			angular.forEach($config.roles, function (prole, index)
			{
				if (prole.id == role) urole = prole.label;
			});

			return urole;
		}
	}
])


/**
 * Main range filter
 */
.filter('rangeMainFilter', 
[
	'Dater', 'Storage', 
	function (Dater, Storage)
	{
		var periods = Dater.getPeriods();

		return function (dates)
		{
			if ((new Date(dates.end).getTime() - new Date(dates.start).getTime()) == 86401000)
				dates.start = new Date(dates.end).addDays(-1);

			var dates = {
						start: {
							real: new Date(dates.start).toString('dddd, MMMM d'),
							month: new Date(dates.start).toString('MMMM'),
							day: new Date(dates.start).toString('d')
						},
						end: {
							real: new Date(dates.end).toString('dddd, MMMM d'),
							month: new Date(dates.end).toString('MMMM'),
							day: new Date(dates.end).toString('d')
						}
					},
					monthNumber = Date.getMonthNumberFromName(dates.start.month);

			if ((((Math.round(dates.start.day) + 1) == dates.end.day && 
							dates.start.hour == dates.end.hour) || 
							dates.start.day == dates.end.day) && 
							dates.start.month == dates.end.month)
			{
				return 	dates.start.real + 
								', ' + 
								Dater.getThisYear();
			}
			else if(dates.start.day == 1 && 
							dates.end.day == periods.months[monthNumber + 1].totalDays)
			{
				return 	dates.start.month + 
								', ' + 
								Dater.getThisYear();
			}
			else
			{
				return 	dates.start.real + 
								' / ' + 
								dates.end.real + 
								', ' + 
								Dater.getThisYear();
			};

		}
	}
])


/**
 * Main range week filter
 */
.filter('rangeMainWeekFilter', 
[
	'Dater', 'Storage', 
	function (Dater, Storage)
	{
		var periods = Dater.getPeriods();

		return function (dates)
		{
			if (dates)
			{
				var dates = {
					start: new Date(dates.start).toString('dddd, MMMM d'),
					end: new Date(dates.end).toString('dddd, MMMM d')
				};

				return 	dates.start + 
								' / ' + 
								dates.end + 
								', ' + 
								Dater.getThisYear();
			};
		}
	}
])


/**
 * Range info filter
 */
.filter('rangeInfoFilter', 
[
	'Dater', 'Storage', 
	function (Dater, Storage)
	{
		var periods = Dater.getPeriods();

		return function (timeline)
		{
			var diff = new Date(timeline.range.end).getTime() - new Date(timeline.range.start).getTime();

			if (diff > (2419200000 + 259200000))
			{
				return 'Total selected days: ' + Math.round(diff / 86400000);
			}
			else
			{
				if (timeline.scope.day)
				{
					var hours = {
						start: new Date(timeline.range.start).toString('HH:mm'),
						end: new Date(timeline.range.end).toString('HH:mm')
					};

					/**
					 *  00:00 fix => 24:00
					 */
					if (hours.end == '00:00') hours.end = '24:00';

					return 	'Time: ' + 
									hours.start + 
									' / ' + 
									hours.end;
				}
				else if (timeline.scope.week)
				{
					return 	'Week number: ' + 
									timeline.current.week;
				}
				else if (timeline.scope.month)
				{
					return 	'Month number: ' + 
									timeline.current.month + 
									', Total days: ' + 
									periods.months[timeline.current.month].totalDays;
				};
			};
		};
	}
])


/**
 * Range info week filter
 */
.filter('rangeInfoWeekFilter', 
[
	'Dater', 'Storage', 
	function (Dater, Storage)
	{
		var periods = Dater.getPeriods();

		return function (timeline)
		{
			if (timeline) return 'Week number: ' + timeline.current.week;
		};
	}
])


/**
 * BUG!
 * Maybe not replace bar- ?
 * 
 * TODO
 * Implement state conversion from config later on!
 * 
 * Convert ratios to readable formats
 */
.filter('convertRatios', 
[
	'$config', 
	function ($config)
	{
		return function (stats)
		{
			var ratios = '';

			angular.forEach(stats, function (stat, index)
			{
				ratios += stat.ratio.toFixed(1) + '% ' + stat.state.replace(/^bar-+/, '') + ', ';
			});

			return ratios.substring(0, ratios.length - 2);
		};
	}
])


/** 
 * Calculate time in days
 */
.filter('calculateTimeInDays', 
	function ()
	{
		return function (stamp)
		{
			var day 		= 1000 * 60 * 60 * 24,
					hour		=	1000 * 60 * 60,
					days 		= 0,
					hours 	= 0,
					stamp 	= stamp * 1000,
					hours 	= stamp % day,
					days 		= stamp - hours;

			return 	Math.floor(days / day);
		};
	}
)


/**
 * Calculate time in hours
 */
.filter('calculateTimeInHours', 
	function ()
	{
		return function (stamp)
		{
			var day 		= 1000 * 60 * 60 * 24,
					hour		=	1000 * 60 * 60,
					days 		= 0,
					hours 	= 0,
					stamp 	= stamp * 1000,
					hours 	= stamp % day,
					days 		= stamp - hours;

			return 	Math.floor(hours / hour);
		};
	}
)


/**
 * Calculate time in minutes
 */
.filter('calculateTimeInMinutes', 
	function ()
	{
		return function (stamp)
		{
			var day 		= 1000 * 60 * 60 * 24,
					hour		=	1000 * 60 * 60,
					minute 	= 1000 * 60,
					days 		= 0,
					hours 	= 0,
					minutes = 0,
					stamp 	= stamp * 1000,
					hours 	= stamp % day,
					days 		= stamp - hours,
					minutes = stamp % hour;

			return 	Math.floor(minutes / minute);
		};
	}
)


/**
 * Convert eve urls to ids
 */
.filter('convertEve', 
	function ()
	{
	  return function (url)
	  {
	  	var eve = url;

	  	eve = (typeof url != "undefined") ? url.split("/") : ["", url, ""];

	    return eve[eve.length-2];
	  };
	}
)


/** 
 * Convert user uuid to name
 */
.filter('convertUserIdToName', 
[
	'Storage', 
	function (Storage)
	{
		var members = angular.fromJson(Storage.get('members'));

		return function (id)
		{	
	    if (members == null || typeof members[id] == "undefined")
	    {
	      return id;
	    }
	    else
	    {
	      return members[id].name;
	    };
		};
	}
])


/**
 * Convert timeStamps to dates
 */
.filter('nicelyDate', 
[
	'$rootScope', 
	function ($rootScope)
	{
	 	return function (date)
	 	{
	 		if (typeof date == 'string') date = Number(date);

	 		return new Date(date).toString($rootScope.config.formats.datetime);
	 	};
	}
])


/**
 * TODO
 * Not used probably!
 *
 * Combine this either with nicelyDate or terminate!
 * 
 * Convert timeStamp to readable date and time
 */
.filter('convertTimeStamp', 
	function ()
	{
		return function (stamp)
		{
			console.warn(typeof stamp);

			return new Date(stamp).toString('dd-MM-yyyy HH:mm');
		};
	}
)


/**
 * TODO
 * Still used?
 * 
 * No title filter
 */
.filter('noTitle',
	function ()
	{
		return function (title)
		{
			return (title == "") ? "- No Title -" : title;
		}
	}
)


/**
 * TODO
 * Finish it!
 * 
 * Strip span tags
 */
.filter('stripSpan', 
	function ()
	{
	  return function (string)
	  {
	    return string.match(/<span class="label">(.*)<\/span>/);
	  }
	}
)


/**
 * Strip html tags
 */
.filter('stripHtml', 
	function ()
	{
	  return function (string)
	  {
	  	if (string) return string.split('>')[1].split('<')[0];
	  }
	}
)


/**
 * Convert group id to name
 */
.filter('groupIdToName', 
[
	'Storage', 
	function (Storage)
	{
	  return function (id)
	  {
	  	var groups = angular.fromJson(Storage.get('groups'));

	  	for (var i in groups)
	  	{
	  		if (groups[i].uuid == id) return groups[i].name;
	  	};
	  }
	}
])



/**
 * TODO
 * Unknown filter
 */
.filter('i18n_spec',
[
	'$rootScope', 
	function ($rootScope)
	{
		return function (string, type)
		{
			var types = type.split("."),
					ret = $rootScope.ui[types[0]][types[1]],
					ret = ret.replace('$v',string);
			
			return ret;
		}
	}
])


/**
 * Truncate group titles for dashboard pie widget
 */
.filter('truncateGroupTitle', 
[
	'Strings', 
	function (Strings) 
	{
		return function (title)
		{
	     return Strings.truncate(title, 20, true);
	  }
	}
]);
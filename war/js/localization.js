/*jslint node: true */
'use strict';

/**
 * Localizations
 */
var ui = {
    en: {
      meta: {
        name: 'en',
        label: 'English'
      },
      login: {
        setting_up_app: 'Setting up the application...',
        header: "Please sign in",
        placeholder_username: "Please enter your username",
        placeholder_password: "Your password",
        label_rememberMe: "Remember Me",
        button_login: "Login",
        button_loggingIn: "Logging...",
        forgot_password: "forgot your password?",
        forgetPassword: "Forgot password",
        emailAddress: "Email address",
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
        setting: 'Setting..',
        passwordChanged: 'Password changed!',
        button_changePassword: 'Change password',
        button_changingPassword: 'Changing password..',
        checkYourMail: 'Please check your email to reset your password!'
      },
      dashboard: {
        dashboard: 'Dashboard',
        groupOverviews: 'Loading and analyzing group overviews...',
        thisWeek: 'This week',
        nextWeek: 'Next week',
        welcome: 'Welcome',
        newMessage: 'New Messages',
        goToInbox: 'Go to inbox',
        announcements: 'Announcements',
        loadingPie: 'Loading pie charts...',
        loadingP2000: 'Loading alarm messages',
        noP2000: 'There are no alarm messages',
        widgetSave: 'Save',
        widgetCancel: 'Cancel',
        currentState: 'Current state',
        overview: 'Overview',
        statMore: 'more',
        statEven: 'enough',
        statLess: 'less',
        periods: 'Periods',
        refreshGroupOverviews: 'Refreshing group overviews..',
        showMore: 'meer tonen',
        showLess: 'minder tonen',
        gettingAlarms: 'Getting P2000 alarm messages'
      },
      planboard: {
        planboard: 'Agenda',
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
        legendaLabels: {
          morePeople: 'More people',
          enoughPeople: 'Just enough people',
          lessPeople: 'Less people'
        },
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
        minNumber: 'Minimum number benodigden',
        statDays: 'days',
        statHours: 'hours',
        statMinutes: 'minutes',
        statPeopleLess: 'Less people than expected',
        statPeopleEven: 'Just enough people as expected',
        statPeopleMore: 'More people than expected',
        getWishes: 'Getting minimum required value...',
        daterangerToday: 'Today',
        daterangerTomorrow: 'Tomorrow',
        daterangerYesterday: 'Yesterday',
        daterangerNext3Days: 'Next 3 days',
        daterangerNext7Days: 'Next 7 days',
        rangeInfoTotalSelectedDays: 'Total selected days: ',
        rangeInfoTime: 'Time: ',
        rangeInfoWeekNumber: 'Week number: ',
        rangeInfoMonth: 'Month: ',
        rangeInfoTotalDays: ', Total days: '
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
        // messages: 'Messages',
        ph_filterMessage: 'Filter messages..',
        noReceivers: 'Please select a receiver.',
        days: {
          monday:     'monday',
          tuesday:    'tuesday',
          wednesday:  'wednesday',
          thursday:   'thursday',
          friday:     'friday',
          saturday:   'saturday',
          sunday:     'sunday'
        },
        repeat: 'Repeat',
        repeatOn: 'On',
        repeatOff: 'Off',
        enabled: 'Enabled',
        disabled: 'Disabled',
        repeatNew: 'New repeat',
        notificationLabel: 'Notification label',
        notifications: 'Notifications',
        notificationsEmpty: 'There are currently no notifications.Er zijn (nog) geen herhalingen.',
        notificationStatus: 'Notification status',
        notificationSave: 'Save',
        notificationHeaderLabel: 'Label',
        notificationHeaderReceivers: 'Receivers',
        notificationHeaderFrequency: 'Frequency',
        paginationPage: 'Page',
        paginationOf: 'of',
        paginationInTotal: 'in total',
        paginationPrevious: 'Previous',
        paginationNext: 'Next',
        filterMessages: 'Filter messages...',
        inTotal: 'In total:',
        loadingNotifications: 'Getting notifications...',
        receiversUsers: 'Users',
        receiversGroups: 'Groups',
        notificationsRefresh: 'Refreshing scheduled notifications...',
        notificationsAdd: 'Adding a new scheduled notification...',
        notificationSaved: 'Scheduled notification is successfully saved.',
        notificationsEditing: 'Editing scheduled notification...',
        notificationsEdited: 'Scheduled notification is successfully edited.',
        notificationsDeleting: 'Deleting a scheduled notification...',
        notificationsDeleted: 'Scheduled notification is successfully deleted.'
      },
      groups: {
        groups: 'Groups',
        newGroup: 'New Group',
        newMember: 'New Member',
        search: 'Search',
        addNewGroup: 'Add New Group',
        editGroup: 'Edit Group',
        searchResults: 'Search results',
        group: 'Group',
        close: 'Close',
        name: 'Name',
        firstName: 'First Name',
        lastName: 'Last Name',
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
        searchedFor: 'Search results for ',
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
        memberRemoved: 'Member(s) removed from group successfully.',
        removingSelected: 'Removing selected members..',
        saving: 'Saving group..',
        groupSaved: 'Group saved successfully.',
        registerNew: 'Registering a new member..',
        memberRegstered: 'Member registered successfully.',
        deleting: 'Deleting group..',
        deleted: 'Group deleted successfully.',
        filterMembers: 'Filter members..',
        searchFor: 'firstname, lastname..',
        widgetSave: 'Save',
        widgetCancel: 'Cancel',
        requiredPeople: 'Required'
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
        // saveProfile: 'Saving profile information..',
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
        passwordChangeWarning: 'Warning! with this option you will change password this user.'
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
        help: 'Help',
        header: 'Help & Support',
        support: 'Support'
      },
      downloads: {
        app: 'Soon it will be downloadable.<br>',
        manual: 'Download Manual'
      },
      loading: {
        general:    'Loading',
        dashboard:  'dashboard',
        planboard:  'agenda',
        messages:   'messages',
        groups:     'groups',
        profile:    'profile',
        settings:   'settings',
        loggingOut: 'Logging out...'
      },
      errors: {
        dashboard: {
          getOverviews: 'Error with getting group overviews!'
        },
        groups: {
          query: 'Error with getting groups and users!',
          saveWish: 'Error with changing wish value!',
          searchMembers: 'Error with searching members!',
          addMember: 'Error with adding a member to a group!',
          removeMember: 'Error with removing a member from a group!',
          removeMembers: 'Error with removing members from a group!',
          groupSubmit: 'Error with saving group!',
          memberSubmitRegistered: 'Username is already registered!',
          memberSubmitRegister: 'Error with registering a member!',
          deleteGroup: 'Error with deleting a group!'
        },
        login: {
          changePass: 'Something wrong with password changing!',
          forgotCantFind: 'Error this account does not exist!',
          changePassAllFields: 'Please fill all fields!',
          changePassNoMatch: 'Error, passwords do not match!' 
        },
        settings: {
          save: 'Error with saving settings!'
        },
        profile: {
          save: 'Error with saving profile information!',
          get: 'Error with getting profile data!',
          changePassword: 'Error with changing password!'
        },
        messages: {
          query: 'Error with getting messages!',
          changeState: 'Error with changing message state!',
          removeMessage: 'Error with removing message!',
          removeMessages: 'Error with removing messages!',
          restoreMessage: 'Error with restoring message!',
          restoreMessages: 'Error with restoring message!',
          emptyTrash: 'Error with empting trash!',
          send: 'Error with sending message!',
          notificationsList: 'Error with getting scheduled notifictions!',
          notificationsGet: 'Error with getting scheduled notification!',
          notificationsAdd: 'Error with creating scheduled notification!',
          notificationsEdit: 'Error with editing scheduled notification!',
          notificationsDelete: 'Error with deleting scheduled notification!'
        },
        timeline: {
          query: 'There has been some problems with syncing planboard information. Please refresh your browser for getting the latest planboard information.',
          pastAdding: 'Invoer van tijden in het verleden is niet toegestaan!',
          add: 'Error with adding a new timeslot!',
          change: 'Error with changing timeslot!',
          pastChanging: 'Veranderen van tijden in het verleden is niet toegestaan!',
          pastDeleting: 'Verwijderen van tijden in het verleden is niet toegestaan!',
          remove: 'Error with removing timeslot!',
          wisher: 'Error with changing wish value!'
        }
      },
      confirms: {
        remove: 'Are you sure you want to delete it? You can not undo this action.'
      }
    },
    nl: {
      meta: {
        name: 'nl',
        label: 'Nederlands'
      },
      login: {
        setting_up_app: 'Applicatie laden...',
        header: "Inloggen",
        placeholder_username: "Vul uw gebruikersnaam in",
        placeholder_password: "Vul uw wachtwoord in",
        label_rememberMe: "Onthoud mij",
        button_login: "Login",
        button_loggingIn: "Inloggen...",
        forgot_password: "Wachtwoord vergeten?",
        forgetPassword: "Wachtwoord vergeten",
        emailAddress: "Email adres",
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
        logout: 'Uitloggen',
        loading: 'Aan het laden..',
        setting: 'Aan het toepassen..',
        passwordChanged: 'Wachtwoord gewijzigd!',
        button_changePassword: 'Wachtwoord wijzigen',
        button_changingPassword: 'Wachtwoord aan het wijzigen..',
        checkYourMail: 'Controleer uw mailbox voor de instructies!'
      },
      dashboard: {
        dashboard: 'Dashboard',
        groupOverviews: 'Laden en analyseren groepsoverzichten...',
        thisWeek: 'Deze week',
        nextWeek: 'Volgende week',
        welcome: 'Welkom',
        newMessage: 'Nieuwe berichten',
        goToInbox: 'Ga naar inbox',
        loadingPie: 'Cirkeldiagrammen laden...',
        announcements: 'Alarm berichten',
        loadingP2000: 'Alarm berichten laden...',
        noP2000: 'Er zijn geen alarm berichten.',
        widgetSave: 'Opslaan',
        widgetCancel: 'Annuleren',
        currentState: 'Huidige status',
        overview: 'Overzicht',
        statMore: 'meer',
        statEven: 'genoeg',
        statLess: 'minder',
        periods: 'Perioden',
        refreshGroupOverviews: 'Groep overzichten laden...',
        showMore: 'show more',
        showLess: 'show less',
        gettingAlarms: 'P2000 alarm berichten aan het ophalen...'
      },
      planboard : {
        planboard: 'Agenda',
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
        legendaLabels: {
          morePeople: 'Meer mensen',
          enoughPeople: 'Precies genoeg mensen',
          lessPeople: 'Te weinig mensen'
        },
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
        minNumber: 'Minimum aantal benodigde mensen',
        statDays: 'dagen',
        statHours: 'uren',
        statMinutes: 'minuten',
        statPeopleLess: 'Te weinig mensen',
        statPeopleEven: 'Precies genoeg mensen',
        statPeopleMore: 'Meer mensen',
        getWishes: 'Groep behoefte getal aan het ophalen...',
        daterangerToday: 'Vandaag',
        daterangerTomorrow: 'Morgen',
        daterangerYesterday: 'Gisteren',
        daterangerNext3Days: 'Komende 3 dagen',
        daterangerNext7Days: 'Komende 7 dagen',
        rangeInfoTotalSelectedDays: 'Totaal aantal geselecteerde dagen: ',
        rangeInfoTime: 'Tijd: ',
        rangeInfoWeekNumber: 'Weeknummer: ',
        rangeInfoMonth: 'Maand: ',
        rangeInfoTotalDays: ', Totaal aantal dagen: '
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
        // messages: 'Berichten',
        ph_filterMessage: 'Berichten filteren...',
        noReceivers: 'Graag een ontvanger selecteren.',
        days: {
          monday:     'maandag',
          tuesday:    'dinsdag',
          wednesday:  'woensdag',
          thursday:   'donderdag',
          friday:     'vrijdag',
          saturday:   'zaterdag',
          sunday:     'zondag'
        },
        repeat: 'Herhaling',
        repeatOn: 'Aan',
        repeatOff: 'Uit',
        enabled: 'Ingeschakeld',
        disabled: 'Uitgeschakeld',
        repeatNew: 'Nieuwe herhaling',
        notificationLabel: 'Notificatie label',
        notifications: 'Herinneringen',
        notificationsEmpty: 'Er zijn (nog) geen herhalingen.',
        notificationStatus: 'Notificatie status',
        notificationSave: 'Opslaan',
        notificationHeaderLabel: 'Label',
        notificationHeaderReceivers: 'Ontvangers',
        notificationHeaderFrequency: 'Frequentie',
        paginationPage: 'Pagina',
        paginationOf: 'van',
        paginationInTotal: 'in totaal',
        paginationPrevious: 'Vorige',
        paginationNext: 'Volgende',
        filterMessages: 'Berichten filteren...',
        inTotal: 'In totaal:',
        loadingNotifications: 'Notificaties aan het laden...',
        receiversUsers: 'Gebruikers',
        receiversGroups: 'Groepen',
        notificationsRefresh: 'Notificaties aan het laden...',
        notificationsAdd: 'Notificatie aan het toevoegen...',
        notificationSaved: 'Notificatie is met success opgeslagen.',
        notificationsEditing: 'Notificatie wordt gewijzigd...',
        notificationsEdited: 'Notificatie is met succes gewijzigd.',
        notificationsDeleting: 'Notificatie wordt verwijderd...',
        notificationsDeleted: 'Notificatie is met succes verwijderd.'
      },
      groups: {
        groups: 'Groepen',
        newGroup: 'Nieuwe groep',
        newMember: 'Nieuw lid',
        search: 'Zoeken',
        addNewGroup: 'Nieuwe groep toevoegen',
        editGroup: 'Groep wijzigen',
        searchResults: 'Zoekresultaten',
        group: 'Groep',
        close: 'Sluiten',
        name: 'Naam',
        firstName: 'Voornaam',
        lastName: 'Achternaam',
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
        searchedFor: 'Zoekresultaten voor ',
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
        memberRemoved: 'Lid/leden succesvol van groep verwijderd.',
        removingSelected: 'Geselecteerde leden verwijderen...',
        saving: 'Groep opslaan...',
        groupSaved: 'Groep succesvol opgeslagen.',
        registerNew: 'Nieuw lid registreren...',
        memberRegstered: 'Lid succesvol geregistreerd.',
        deleting: 'Groep verwijderen...',
        deleted: 'Groep succesvol verwijderd.',
        filterMembers: 'Leden filteren...',
        searchFor: 'voornaam, achternaam..',
        widgetSave: 'Opslaan',
        widgetCancel: 'Annuleren',
        requiredPeople: 'Behoefte'
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
        // saveProfile: 'Profielinformatie opslaan...',
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
        passwordChangeWarning: 'Let op! Hiermee wijzigt u het wachtwoord van deze persoon.'
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
        help: 'Hulp',
        header: 'Hulp & Ondersteuning',
        support: 'Ondersteuning'
      },
      downloads: {
        app: 'Binnenkort te downloaden.',
        manual: 'Download Handleiding'
      },
      loading: {
        general:    'Laden',
        dashboard:  'dashboard',
        planboard:  'agenda',
        messages:   'berichten',
        groups:     'groepen',
        profile:    'profiel',
        settings:   'instellingen',
        loggingOut: 'Aan het uitloggen...'
      },
      errors: {
        dashboard: {
          getOverviews: 'Fout bij het ophalen van groep overzichten!'
        },
        groups: {
          query: 'Fout bij het ophalen van groepen en gebruikers!',
          saveWish: 'Fout bij het veranderen van de behoefte!',
          searchMembers: 'Fout bij het zoeken van leden!',
          addMember: 'Fout bij het toevoegen van een lid aan een groep!',
          removeMember: 'Fout bij het verwijderen van een lid uit een groep!',
          removeMembers: 'Fout bij het verwijderen van leden uit een groep!',
          groupSubmit: 'Fout bij het opslaan van de groep!',
          memberSubmitRegistered: 'Gebruikersnaam bestaat al!',
          memberSubmitRegister: 'Fout bij het registreren van een gebruiker!',
          deleteGroup: 'Fout bij het verwijderen van een groep!'
        },
        login: {
          changePass: 'Er ging iets mis met het wijzigen van het wachtwoord!',
          forgotCantFind: 'Fout, deze account bestaat niet!',
          changePassAllFields: 'Vul alstublieft alle velden in!',
          changePassNoMatch: 'Fout, de wachtwoorden komen niet overeen!'
        },
        settings: {
          save: 'Fout bij het opslaan van de instellingen!'
        },
        profile: {
          save: 'Fout bij het opslaan van het profiel!',
          get: 'Fout bij het ophalen van het profiel!',
          changePassword: 'Fout bij het wijzigen van het wachtwoord!'
        },
        messages: {
          query: 'Fout bij het ophalen van berichten!',
          changeState: 'Fout bij het wijzigen van bericht status!',
          removeMessage: 'Fout bij het verwijderen van het bericht!',
          removeMessages: 'Fout bij het verwijderen van de berichten!',
          restoreMessage: 'Fout bij het terugzetten van het bericht!',
          restoreMessages: 'Fout bij het terugzetten van de berichten!',
          emptyTrash: 'Fout bij het leegmaken van de prullenbak!',
          send: 'Fout bij het verzenden van bericht!',
          notificationsList: 'Fout bij het ophalen van de geplande notificaties!',
          notificationsGet: 'Fout bij het ophalen van een geplande notificatie!',
          notificationsAdd: 'Fout bij het aanmaken van een geplande notificatie!',
        },
        timeline: {
          query: 'Er is iets fout gegaan bij het laden van de tijdlijndata. Vernieuw deze webpagina om het nogmaals te proberen.',
          pastAdding: 'Invoer van tijden in het verleden is niet toegestaan!',
          add: 'Error with adding a new timeslot!',
          change: 'Error with changing timeslot!',
          pastChanging: 'Veranderen van tijden in het verleden is niet toegestaan!',
          pastDeleting: 'Verwijderen van tijden in het verleden is niet toegestaan!',
          remove: 'Error with removing timeslot!',
          wisher: 'Error with changing wish value!'
        }
      },
      confirms: {
        remove: 'Weet u zeker dat u dit wilt verwijderen? U kunt dit niet ongedaan maken.'
      }
    }
};
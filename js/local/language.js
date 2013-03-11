
// TODO
// Language settings
// $rootScope.ui.XXX.XXX
var ui = {
    en: {
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
        loading_User : 'Loading user information...',
        loading_Message : 'Loading messages...',
        loading_Group :'Loading groups...',
        loading_Members : 'Loading members...',
        loading_everything : 'Everything loaded!',
      },
      dashboard : {
          thisWeek : 'This Week',
          welcome : 'Welcome',
          newMessage : 'New Messages',
          goToInbox : 'Go to inbox',
          loadingPie : 'Loading pie charts...'
      },
      planboard : {
          newAvail : 'New Availability',
          day: 'Day',
          week: 'Week',
          month: 'Month',
          updateAvail : 'Update Availability',
          from : 'From',
          till : 'Till',
          state : 'State',
          selectAState : 'select a state',
          reoccuring : 'Re-occuring',
          lessPeople : 'There $v less people than needed!',
          samePeople : 'There are just as many peopleas needed.',
          morePeople : 'There are $v more people than needed!',
          wished: 'Wished' ,
          combine_reoccuring : 'This is a combined row of planning with re-occuring rows.',
          sendMsgToMember : 'Send Message To Members',
          add : 'Add',
          del : 'Delete',
          change : 'Change',
          setWish : 'Set Wish',
          timeline : 'Timeline',
          statistics : 'Statistics',
          barCharts : 'Bar charts',
          wishes : 'Wishes',
          legenda : 'Legenda',
          group : 'Group',
          groups : 'Groups',
          members : 'Members',
          bothAvailable : 'Both available',
          northAavailable : 'available North' ,
          southAvailable : 'available South',
          skipperOutService : 'Skipper Of Service',
          notAvailable : 'Not Availlable', // Niet Beschikbaar
          notachieve : 'Not Achieved',
          morePeople : 'More people',
          enoughPeople : 'Just enough people',
          lessPeople : 'Less people',
          lastSyncTime : 'Last sync time:',
          dataRangeStart : 'Data range start: ',
          DataRangeEnd : 'Data range end: ',
          loadingTimeline : 'Loading timeline...',
          addTimeSlot : 'Adding a timeslot...',
          slotAdded : 'New timeslot added successfully.',
          changingSlot : 'Changing a timeslot...',
          slotChanged : 'Timeslot changed successfully.',
          changingWish : 'Changing wish value...',
          wishChanged : 'Wish value changed successfully.',
          deletingTimeslot : 'Deleting a timeslot...',
          timeslotDeleted : 'Timeslot deleted successfully.',
          refreshTimeline : 'Refreshing timeline...',
          preCompilingStortageMessage : 'Pre-compiling shortage message',
          weeklyPlanning : 'Weekly planning',
          minNumber : 'Minimum number benodigden'
      },
      message : {
          composeAMessage : 'Compose a message',
          compose : 'Compose',
          message : 'Message',
          inbox : 'Inbox',
          outbox : 'Outbox',
          trash : 'Trash',
          composeMessage : 'Compose message',
          close : 'Close',
          broadcast : 'Broadcast',
          sms : 'SMS',
          email : 'Email',
          receviers : 'Recevier(s)',
          chooseRecept : 'Choose a Recipient',
          subject : 'Subject',
          message : 'Message',
          sendMessage : 'Send Message',
          sender : 'Sender',
          date : 'Date',
          questionText : 'Message',
          reply : 'Reply',
          del: 'Delete',
          noMessage : 'There are no messages.',
          from: 'From',
          newMsg : 'New',
          deleteSelected : 'Delete Selected Messages',
          someMessage : 'There are $v message(s)',
          noMessage : 'There are no messages in outbox.',
          emptyTrash : 'Empty Trash',
          noMsgInTrash : 'There are no messages in trash.',
          box : 'Box',
          persons : 'Person(s)',
          restoreSelected : 'Restore Selected Messages',
          loadingMessage : 'Loading message...',
          escalation : 'Escalation message',
          escalationBody : function(diff,startDate,startTime,endDate,endTime){
              return 'We have ' +
              diff +
              ' shortage in between ' +
              startDate + ' ' +
              startTime + ' and ' +
              endDate + ' ' +
              endTime + '. ' + 
              'Would you please make yourself available if you are available for that period?';
          },
          removed : 'Message removed successfully.',
          removing : 'Removing the message...',
          refreshing : 'Refreshing messages...',
          removingSelected : 'Removing selected messages...',
          restoring : 'Restoring the message back...',
          restored : 'Message restored successfully.',
          restoringSelected : 'Restoring selected messages...',
          emptying : 'Emptying trash...',
          emptied : 'Trash bin emptied successfully.',
          sending : 'Sending the message...',
          sent : 'Message sent.'
      },
             
      gropus : {
          
      }
    },
    nl: {
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
        loading_User : 'Gebruikersinformatie laden...',
        loading_Message : 'Berichten laden...',
        loading_Group :'Groepen laden...',
        loading_Members : 'Leden laden...',
        loading_everything : 'Alles is geladen!',
      },
      dashboard : {
          thisWeek : 'Deze week',
          welcome : 'Welkom',
          newMessage : 'Nieuwe berichten',
          goToInbox : 'Ga naar inbox',
          loadingPie : 'Cirkeldiagrammen laden...'
      },
      planboard : {
          newAvail : 'Nieuwe beschikbaarheid',
          day: 'Dag',
          week: 'Week',
          month: 'Maand',
          updateAvail : 'Update beschikbaarheid',
          from : 'Van',
          till : 'Tot',
          state : 'Status',
          selectAState : 'selecteer een status',
          reoccuring : 'Herhaling',
          lessPeople : 'Er is een tekort van $v mens(en)!',
          samePeople : 'Er zijn precies genoeg mensen.',
          morePeople : 'Er is een overschot van $v mens(en)!',
          wished: 'Gewenst' ,
          combine_reoccuring : 'Dit is een gecombineerde planning.',
          sendMsgToMember : 'Stuur bericht naar leden',
          add : 'Toevoegen',
          del : 'Verwijderen',
          change : 'Wijzigen',
          setWish : 'Behoefte instellen',
          timeline : 'Tijdlijn',
          statistics : 'Statistieken',
          barCharts : 'Staafdiagrammen',
          wishes : 'Behoefte',
          legenda : 'Legenda',
          group : 'Groep',
          groups : 'Groepen',
          members : 'Leden',
          bothAvailable : 'Beiden beschikbaar',
          northAavailable : 'Beschikbaar Noord' ,
          southAvailable : 'Beschikbaar Zuid',
          skipperOutService : 'Schipper van dienst',
          notAvailable : 'Niet beschikbaar', 
          notachieve : 'Niet behaald',
          morePeople : 'Meer mensen',
          enoughPeople : 'Precies genoeg mensen',
          lessPeople : 'Te weinig mensen',
          lastSyncTime : 'Laatste synchronisatietijd:',
          dataRangeStart : 'Begin gegevensscala: ',
          DataRangeEnd : 'Eind gegevensscala: ',
          loadingTimeline : 'Tijdlijn laden...',
          addTimeSlot : 'Tijdslot toevoegen...',
          slotAdded : 'Tijdslot succesvol toegevoegd.',
          changingSlot : 'Tijdslot wijzigen...',
          slotChanged : 'Tijdslot succesvol gewijzigd.',
          changingWish : 'Behoefte veranderen...',
          wishChanged : 'Behoefte succesvol veranderd.',
          deletingTimeslot : 'Tijdslot verwijderen...',
          timeslotDeleted : 'Tijdslot succesvol verwijderd.',
          refreshTimeline : 'Tijdlijn vernieuwen...',
          preCompilingStortageMessage : 'Opstellen tekortbericht',
          weeklyPlanning : 'Wekelijkse planning',
          minNumber : 'Minimum aantal benodigde mensen'
      },
      message : {
          composeAMessage : 'Bericht opstellen',
          compose : 'Opstellen',
          message : 'Bericht',
          inbox : 'Inbox',
          outbox : 'Outbox',
          trash : 'Prullenbak',
          composeMessage : 'Bericht opstellen',
          close : 'Sluiten',
          broadcast : 'Extra medium',
          sms : 'SMS',
          email : 'Email',
          receviers : 'Ontvanger(s)',
          chooseRecept : 'Ontvanger(s) selecteren',
          subject : 'Onderwerp',
          message : 'Bericht',
          sendMessage : 'Bericht versturen',
          sender : 'Zender',
          date : 'Datum',
          questionText : 'Bericht',
          reply : 'Antwoorden',
          del: 'Verwijderen',
          noMessage : 'Er zijn geen berichten.',
          from: 'Van',
          newMsg : 'Nieuw',
          deleteSelected : 'Verwijder geselecteerde berichten',
          someMessage : 'Er zijn $v berichten',
          noMessage : 'Er zijn geen berichten.',
          emptyTrash : 'Prullenbak legen',
          noMsgInTrash : 'Er zijn geen berichten.',
          box : 'Box',
          persons : 'Personen',
          restoreSelected : 'Geselecteerde berichten terugplaatsen',
          loadingMessage : 'Bericht laden...',
          escalation : 'Escalatiebericht',
          escalationBody : function(diff,startDate,startTime,endDate,endTime){
              return 'Er is een tekort van ' +
              diff +
              ' mensen tussen ' +
              startDate + ' ' +
              startTime + ' en ' +
              endDate + ' ' +
              endTime + '. ' + 
              'Zet uzelf a.u.b. op beschikbaar indien u beschikbaar bent voor die periode';
          },
          removed : 'Bericht succesvol verwijderd.',
          removing : 'Bericht verwijderen...',
          refreshing : 'Bericht vernieuwen...',
          removingSelected : 'Geselecteerde berichten verwijderen...',
          restoring : 'Bericht terugplaatsen...',
          restored : 'Bericht succesvol teruggeplaatst.',
          restoringSelected : 'Geselecteerde berichten terugplaatsen...',
          emptying : 'Prullenbak leegmaken...',
          emptied : 'Prullenbak succesvol geleegd.',
          sending : 'Bericht versturen...',
          sent : 'Bericht verstuurd.'
      },
      gropus : {
          
      }
    }
}




/**
 * Micheal most of the parts are not matching with front-end anymore but you
 * I think there are still some that you can use.. That's why I leave it like
 * it is to you
 */

// var ui = {
//     en: {

//       login: {
//         title: "Login",
//         header: "Login",
//         label_username: "Please enter your username",
//         placeholder_username: "Username",
//         label_password: "Your password",
//         placeholder_password: "Password",
//         label_rememberMe: "Remember Me",
//         button_login: "Login",
//         button_loggingIn: "Logging.."
//       },


//       error: {
//         required: "This field is required.",
//         remote: "Please fix this field.",
//         email: "Please enter a valid email address.",
//         url: "Please enter a valid URL.",
//         date: "Please enter a valid date.",
//         dateISO: "Please enter a valid date (ISO).",
//         number: "Please enter a valid number.",
//         digits: "Please enter only digits.",
//         creditcard: "Please enter a valid credit card number.",
//         equalTo: "Please enter the same value again.",
//         maxlength: "Please enter no more than {0} characters.",
//         minlength: "Please enter at least {0} characters.",
//         rangelength: "Please enter a value between {0} and {1} characters long.",
//         range: "Please enter a value between {0} and {1}.",
//         max: "Please enter a value less than or equal to {0}.",
//         min: "Please enter a value greater than or equal to {0}.",

//         messages: {
//           login: "<strong>Login failed!</strong><br>Wrong username or password."
//         },

//         ajax: {
//           noConnection: "Not connected! Verify your network.",
//           badRequest: "Bad request!",
//           notFound: "Requested page not found!",
//           serverError: "Internal server error",
//           parserError: "Requested JSON parse failed",
//           timeout: "Timeout error!",
//           abort: "Ajax request aborted.",
//           uncaughtError: "Uncaught Error. "
//         }
//       }
//     },
//     nl: {
//       login: {
//         title: "Login",
//         header: "Login",
//         label_username: "Vul uw gebruikersnaam in",
//         placeholder_username: "Gebruikersnaam",
//         label_password: "Vul uw wachtwoord in",
//         placeholder_password: "Wachtwoord",
//         label_rememberMe: "Onthoud mij",
//         button_login: "Login",
//         button_loggingIn: "Inloggen.."
//       },
//       error: {
//         required: "Dit is een verplicht veld.",
//         remote: "Controleer dit veld.",
//         email: "Vul hier een geldig e-mailadres in.",
//         url: "Vul hier een geldige URL in.",
//         date: "Vul hier een geldige datum in.",
//         dateISO: "Vul hier een geldige datum in (ISO-formaat).",
//         number: "Vul hier een geldig getal in.",
//         digits: "Vul hier alleen getallen in.",
//         creditcard: "Vul hier een geldig creditcardnummer in.",
//         equalTo: "Vul hier dezelfde waarde in.",
//         accept: "Vul hier een waarde in met een geldige extensie.",
//         maxlength: "Vul hier maximaal {0} tekens in.",
//         minlength: "Vul hier minimaal {0} tekens in.",
//         rangelength: "Vul hier een waarde in van minimaal {0} en maximaal {1} tekens.",
//         range: "Vul hier een waarde in van minimaal {0} en maximaal {1}.",
//         max: "Vul hier een waarde in kleiner dan of gelijk aan {0}.",
//         min: "Vul hier een waarde in groter dan of gelijk aan {0}.",

//         messages: {
//           login: "<strong>Inloggen is mislukt!</strong><br>Onjuiste gebruikersnaam of wachtwoord."
//         },

//         ajax: {
//           noConnection: "Niet verbonden met Internet! Controleer uw netwerk instellingen.",
//           badRequest: "Ongeldig verzoek!",
//           notFound: "De verzochte pagina wordt niet gevonden!",
//           serverError: "Interne server foutmelding!",
//           parserError: "Het is niet lukt om de verzochte JSON te ontleden!",
//           timeout: "Timeout foutmelding!",
//           abort: "Ajax verzoek is afgebroken!",
//           uncaughtError: "De oorzak van de foutmelding is onbekend. "
//         }
//       }         
//     }
// }

window.location.port=="8080"&&document.getElementsByTagName("html")[0].setAttribute("ng-app"),require.config({paths:{profile:"profiles/ode/profile",config:"config",date:"libs/date/1.0/date.min",angular:"../vendors/angular/angular.min",jquery:"../vendors/jquery/dist/jquery.min",plugins:"plugins",domReady:"../vendors/requirejs-domready/domReady",bootstrap:"../vendors/bootstrap/dist/js/bootstrap","angular-resource":"../vendors/angular-resource/angular-resource.min","angular-route":"../vendors/angular-route/angular-route.min","angular-md5":"../vendors/angular-md5/angular-md5.min","angular-strap":"../vendors/angular-strap/dist/angular-strap.min","angular-strap-tpl":"../vendors/angular-strap/dist/angular-strap.tpl.min",lawnchair:"../vendors/lawnchair/src/Lawnchair",dom:"../vendors/lawnchair/src/adapters/dom",chosen:"libs/chosen/chosen.jquery.min",timeline:"libs/chaps/timeline/2.4.0/timeline_modified",daterangepicker:"../vendors/bootstrap-daterangepicker/daterangepicker",moment:"../vendors/moment/moment",sugar:"libs/sugar/1.3.7/sugar.min",eve:"libs/raphael/2.1.0/eve",raphael:"libs/raphael/2.1.0/raphael-min","g-raphael":"libs/g-raphael/0.5.1/g.raphael-min","g-pie":"libs/g-raphael/0.5.1/g.pie-min",underscore:"../vendors/underscore/underscore",mask:"libs/angular-ui-utils/modules/mask/mask",phone:"../vendors/web-lib-phonenumber/libphonenumber",log:"../vendors/web-lib-log/dist/log",locale_nl:"i18n/angular-locale_nl"},shim:{profile:{deps:["jquery"],exports:"profile"},config:{deps:["profile"],exports:"config"},date:{deps:[],exports:"date"},plugins:{deps:["jquery"],exports:"plugins"},angular:{deps:["jquery","config"],exports:"angular"},"angular-resource":{deps:["angular"]},"angular-route":{deps:["angular"]},"angular-md5":{deps:["angular"]},"angular-strap":{deps:["angular"]},"angular-strap-tpl":{deps:["angular","angular-strap"]},bootstrap:{deps:["jquery"],exports:"bootstrap"},lawnchair:{deps:[],exports:"lawnchair"},dom:{deps:["lawnchair"],exports:"dom"},chosen:{deps:["jquery"],exports:"chosen"},timeline:{deps:[],exports:"timeline"},daterangepicker:{deps:["jquery","moment"],exports:"daterangepicker"},sugar:{exports:"sugar"},eve:{exports:"eve"},raphael:{deps:["eve"],exports:"raphael"},"g-raphael":{deps:["raphael"]},"g-pie":{deps:["raphael"]},underscore:{exports:"underscore"},mask:{deps:["angular"]},phone:{deps:["angular"]},log:{deps:["angular"]},locale_nl:{deps:["angular"]}}}),require(["angular","domReady","date","jquery","plugins","angular-resource","angular-route","angular-md5","angular-strap","angular-strap-tpl","locals","profile","config","app","run","routes","states","services/announcer","services/browsers","services/dater","services/interceptor","services/log","services/md5","services/notifications","services/offline","services/offsetter","services/phone","services/session","services/settings","services/sloter","services/standby","services/stats","services/storage","services/store","services/strings","modals/_user","modals/dashboard","modals/environment","modals/groups","modals/messages","modals/network","modals/planboard","modals/profile","modals/slots","modals/user","modals/logs","directives/login/change-password","directives/login/download-mobile-app","directives/login/forgot-password","directives/login/login-form","directives/login/login-help","directives/login/preloaded","directives/dashboard/smart-alarming","directives/dashboard/snapshots","directives/dashboard/summaries","directives/dashboard/alarms","directives/planboard/time-travel","directives/planboard/time-slot","directives/planboard/time-quick-availability","directives/planboard/time-toolbar","directives/planboard/time-legends","directives/messages/compose","directives/messages/view","directives/messages/inbox","directives/messages/outbox","directives/messages/trash","directives/messages/notifications","directives/chosen","directives/date-range-picker","directives/notification-item","directives/logos","directives/log-ranger","directives/profile-img","filters/all-filters","controllers/dashboard","controllers/faq","controllers/groups","controllers/help","controllers/login","controllers/logout","controllers/messages","controllers/planboard","controllers/presence","controllers/profile","controllers/scheaduler","controllers/settings","controllers/timeline","controllers/timeline-navigation","controllers/tv","controllers/logs","bootstrap","lawnchair","dom","chosen","timeline","daterangepicker","sugar","eve","raphael","g-raphael","g-pie","mask","underscore","phone","log","locale_nl"],function(e,t){t(function(){e.bootstrap(document,["StandBy"])})});
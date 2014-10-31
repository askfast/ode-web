define(["controllers/controllers"],function(e){e.controller("login",["$rootScope","$location","$q","$scope","$timeout","Session","UserLegacy","Groups","Messages","Storage","Store","$routeParams","Settings","Profile","MD5","User","Environment","Network",function(e,t,n,r,i,s,o,u,a,f,l,c,h,p,d,v,m,g){function b(t,n){e.StandBy.config.smartAlarm&&l("smartAlarm").save("guard",{monitor:"",role:""}),v.login(t,n).then(function(t){if(t.error&&t.error.status)return r.alert={login:{display:!0,type:"alert-danger",message:t.error.status==400||t.error.status==403||t.error.status==404?"Wrong username or password!":"There has been an error with your login!"}},angular.element("#login button[type=submit]").text(e.ui.login.button_login).removeAttr("disabled"),!1;w()})}function w(){$("download-mobile-app").hide(),v.locations().then(function(e){$("#login").hide();if(e.length<=1){$("#preloader").show(),E();return}$("#locations").show(),r.locations=e})}function E(){T(30,e.ui.login.loading_User),v.resources().then(function(t){T(50,"Setting up environment."),m.setup().then(function(){T(70,e.ui.login.loading_Group),g.groups().then(function(e){T(70,"Populating group members."),g.population().then(function(){S(t,e)})})})})}function S(t,n){var r=angular.fromJson(t.settingsWebPaige)||{},i=!1,s=!1,o=e.StandBy.config.defaults.settingsWebPaige,a=function(e){var t={};return _.each(e,function(e){t[e.uuid]={status:!0,divisions:!1}}),t};if(r!=null||r!=undefined){r.user?r.user.language?(e.changeLanguage(angular.fromJson(t.settingsWebPaige).user.language),o.user.language=r.user.language):(e.changeLanguage(e.StandBy.config.defaults.settingsWebPaige.user.language),i=!0):i=!0;if(r.app){if(r.app.widgets)if(r.app.widgets.groups){var f=!1;jQuery.isEmptyObject(r.app.widgets.groups)?f=!0:_.each(r.app.widgets.groups,function(e){if(typeof e!="object"||e=={})f=!0}),f?(o.app.widgets.groups=a(n),i=!0):o.app.widgets.groups=r.app.widgets.groups}else o.app.widgets.groups=a(n),i=!0;else o.app.widgets={groups:a(n)},i=!0;if(r.app.group&&r.app.group!=undefined){var l=!0;_.each(n,function(e){var t=new RegExp(r.app.group);t.test(e.uuid)?l=!0:l||(l=!1)}),l||(i=!0)}else s=!0,i=!0}else o.app={widgets:{groups:a(n)}},i=!0}else o={user:e.StandBy.config.defaults.settingsWebPaige.user,app:{widgets:{groups:a(n)},group:n[0].uuid}},i=!0;if(i)s?u.parents().then(function(r){r!=null?o.app.group=r:o.app.group=n[0].uuid,h.save(t.uuid,o).then(function(){v.resources().then(function(t){e.StandBy.resources=t,x()})})}):(o.app.group=n[0].uuid,h.save(t.uuid,o).then(function(){v.resources().then(function(t){e.StandBy.resources=t,x()})}));else{try{ga("send","pageview",{dimension1:t.uuid,dimension2:e.StandBy.environment.domain}),ga("send","event","Login",t.uuid)}catch(c){}x()}}function x(){T(100,e.ui.login.loading_everything),t.search({}),i(function(){angular.element("body").css({background:""}),angular.element(".navbar").show(),angular.element("#watermark").show(),e.browser.mobile||angular.element("#footer").show()},e.StandBy.config.timers.TICKER),a.query().then(function(){i(function(){a.unreadCount()},e.StandBy.config.timers.TICKER)}),t.path("/dashboard")}function T(e,t){angular.element("#preloader .progress .progress-bar").css({width:e+"%"}),angular.element("#preloader span").text(t)}c.uuid&&c.key?(r.views={changePass:!0},r.changepass={uuid:c.uuid,key:c.key}):r.views={login:!0,forgot:!1},r.alert={login:{display:!1,type:"",message:""},forgot:{display:!1,type:"",message:""}},angular.element(".navbar").hide(),angular.element("#footer").hide(),angular.element("#watermark").hide(),e.StandBy.config.profile.showBackground&&angular.element("body").css({background:"url(../"+e.StandBy.config.profile.background+") no-repeat center center fixed",backgroundSize:"cover"}),navigator.userAgent.indexOf("Firefox")>=0&&angular.element("#login form").attr("autocomplete","off");var y=l("environment").get("logindata");y&&y.remember&&(r.logindata=y),r.login=function(){var t=l("notifications").get("registeredNotifications"),n=l("app").get("periods"),i=l("app").get("periodsNext");l("network").nuke(),l("environment").nuke(),l("messages").nuke(),l("records").nuke(),l("smartAlarm").nuke(),l("notifications").nuke(),l("user").nuke(),l("app").nuke(),f.clearAll(),f.session.clearAll(),l("notifications").save("registeredNotifications",t),l("app").save("periods",n),l("app").save("periodsNext",i),angular.element("#alertDiv").hide(),angular.element("#login button[type=submit]").text(e.ui.login.button_loggingIn).attr("disabled","disabled");if(!r.logindata||!r.logindata.username||!r.logindata.password)return r.alert={login:{display:!0,type:"alert-danger",message:e.ui.login.alert_fillfiled}},angular.element("#login button[type=submit]").text(e.ui.login.button_login).removeAttr("disabled"),!1;l("environment").save("logindata",{username:r.logindata.username,password:r.logindata.password,remember:r.logindata.remember}),l("environment").save("askPass",d(r.logindata.password)),b(r.logindata.username,r.logindata.password)},t.search().username&&t.search().password&&b(t.search().username,t.search().password),r.setLocation=function(t){v.locate(t).then(function(n){e.app.location=t,$("#locations").hide(),$("#preloader").show(),E()})},r.forgot=function(){angular.element("#forgot button[type=submit]").text(e.ui.login.setting).attr("disabled","disabled"),v.password(r.remember.id).then(function(t){t=="ok"?r.alert={forget:{display:!0,type:"alert-success",message:e.ui.login.checkYourMail}}:r.alert={forget:{display:!0,type:"alert-danger",message:e.ui.errors.login.forgotCantFind}},angular.element("#forgot button[type=submit]").text(e.ui.login.button_changePassword).removeAttr("disabled")})},r.changePass=function(){angular.element("#alertDiv").hide();if(!r.changeData||!r.changeData.newPass||!r.changeData.retypePass)return r.alert={changePass:{display:!0,type:"alert-danger",message:e.ui.errors.login.changePassAllFields}},angular.element("#changePass button[type=submit]").text(e.ui.login.button_changePassword).removeAttr("disabled"),!1;if(r.changeData.newPass!=r.changeData.retypePass)return r.alert={changePass:{display:!0,type:"alert-danger",message:e.ui.errors.login.changePassNoMatch}},angular.element("#changePass button[type=submit]").text(e.ui.login.button_changePassword).removeAttr("disabled"),!1;angular.element("#changePass button[type=submit]").text(e.ui.login.button_changingPassword).attr("disabled","disabled"),v.changePass(r.changepass.uuid,d(r.changeData.newPass),r.changepass.key).then(function(n){n.status==400||n.status==500||n.status==409?r.alert={changePass:{display:!0,type:"alert-danger",message:e.ui.errors.login.changePass}}:(r.alert={changePass:{display:!0,type:"alert-success",message:e.ui.login.passwordChanged}},t.path("/message")),angular.element("#changePass button[type=submit]").text(e.ui.login.button_changePassword).removeAttr("disabled")})},l("environment").has("sessionTimeout",function(t){t&&(l("environment").remove("sessionTimeout"),r.alert={login:{display:!0,type:"alert-danger",message:e.ui.login.sessionTimeout}})})}])});
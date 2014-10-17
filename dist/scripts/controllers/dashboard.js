define(["controllers/controllers"],function(e){e.controller("dashboard",function(e,t,n,r,i,s,o,u,a,f,l,c,h,p){function y(){e.loadingPies=!0,e.checkAnyPies()?t.statusBar.off():s.pies().then(function(n){e.loadingPies=!1,n.error?(t.notifier.error(t.ui.errors.dashboard.getOverviews),console.warn("error ->",n.error)):(e.shortageHolders={},e.loading.pies=!1,e.periods={start:n[0].weeks.current.start.date,end:n[0].weeks.next.end.date},_.each(n,function(n){n.weeks.current.state instanceof Array&&(n.weeks.current.state=n.weeks.current.state[0]),n.weeks.current.state.diff===null&&(n.weeks.current.state.diff=0),n.weeks.current.state.wish===null&&(n.weeks.current.state.wish=0),n.weeks.current.state.wish==0?n.weeks.current.state.cls="disabled":n.weeks.current.state.diff>0?n.weeks.current.state.cls="more":n.weeks.current.state.diff===0?n.weeks.current.state.cls="even":n.weeks.current.state.diff<0&&(n.weeks.current.state.cls="less"),n.weeks.current.state.start=n.weeks.current.state.start!==undefined?(new Date(n.weeks.current.state.start*1e3)).toString(t.StandBy.config.formats.datetime):t.ui.dashboard.possiblyAvailable,n.weeks.current.state.end=n.weeks.current.state.end!==undefined?(new Date(n.weeks.current.state.end*1e3)).toString(t.StandBy.config.formats.datetime):t.ui.dashboard.possiblyAvailable,n.shortages={current:n.weeks.current.shortages,next:n.weeks.next.shortages,total:n.weeks.current.shortages.length+n.weeks.next.shortages.length},n.state=n.weeks.current.state,delete n.weeks.current.shortages,delete n.weeks.current.state,e.shortageHolders["shortages-"+n.id]=!1}),e.pies=n)}).then(function(){function n(e,n,r){h(function(){$.browser.msie&&$.browser.version=="8.0"?$("#"+e+n).html(""):document.getElementById(e+n)&&(document.getElementById(e+n).innerHTML="");var t=[],i={more:"#6cad6c",even:"#e09131",less:"#d34545"},s=[],o=[];_.each(r,function(e,n){e!==0&&t.push({ratio:e,color:i[n]})}),t=t.sort(function(e,t){return t.ratio-e.ratio}),_.each(t,function(e){s.push(e.color),o.push(e.ratio)});try{(new Raphael(e+n)).piechart(40,40,40,o,{colors:s,stroke:"white"})}catch(u){console.warn(" Raphael error ->",u)}},t.StandBy.config.timers.TICKER)}_.each(e.pies,function(e){n("weeklyPieCurrent-",e.id+"-"+e.division,e.weeks.current.ratios),n("weeklyPieNext-",e.id+"-"+e.division,e.weeks.next.ratios)})})}function b(n){var r=p("smartAlarm").get("guard");e.saMembers={truck:[],reserves:[]},e.saSynced=r.synced,_.each(n.selection,function(r){function i(e){return e!==null?n.users[e].name:t.ui.dashboard.notAssigned}var s=r.user==null?"sa-icon-not-assigned":null;switch(r.role){case"bevelvoerder":e.saMembers.truck.push({rank:1,icon:t.ui.dashboard.alarmRoles.commanderInitial,role:t.ui.dashboard.alarmRoles.commander,"class":r.user==null?"sa-icon-not-assigned":"sa-icon-commander",name:i(r.user),uuid:r.user});break;case"chauffeur":e.saMembers.truck.push({rank:0,icon:t.ui.dashboard.alarmRoles.driverInitial,role:t.ui.dashboard.alarmRoles.driver,"class":r.user==null?"sa-icon-not-assigned":"sa-icon-driver",name:i(r.user),uuid:r.user});break;case"manschap.1":e.saMembers.truck.push({rank:2,icon:"M1",role:t.ui.dashboard.alarmRoles.manpower+" 1",name:i(r.user),uuid:r.user,"class":s});break;case"manschap.2":e.saMembers.truck.push({rank:3,icon:"M2",role:t.ui.dashboard.alarmRoles.manpower+" 2",name:i(r.user),uuid:r.user,"class":s});break;case"manschap.3":e.saMembers.truck.push({rank:4,icon:"M3",role:t.ui.dashboard.alarmRoles.manpower+" 3",name:i(r.user),uuid:r.user,"class":s});break;case"manschap.4":e.saMembers.truck.push({rank:5,icon:"M4",role:t.ui.dashboard.alarmRoles.manpower+" 4",name:i(r.user),uuid:r.user,"class":s})}t.StandBy.guard.role=n.role,n.users[t.StandBy.resources.uuid]?t.StandBy.guard.currentState=n.users[t.StandBy.resources.uuid].state:o.currentState().then(function(e){t.StandBy.guard.currentState=e.label});var u={},a=["available","unavailable","noplanning"];_.each(a,function(e){u[e]=[],_.each(n.reserves[e],function(t){_.each(t,function(t,n){t.role!=0&&u[e].push({id:n,name:t.name,state:t.state})})})}),e.saMembers.reserves=u,e.loading.smartAlarm=!1})}t.notification.status=!1,t.fixStyles(),e.loading={pies:!0,alerts:!0,smartAlarm:!0},e.more={status:!1,text:t.ui.dashboard.showMore},e.synced={alarms:(new Date).getTime(),pies:(new Date).getTime()};var d=p("network").get("groups"),v={},m=angular.fromJson(p("user").get("resources").settingsWebPaige);_.each(m.app.widgets.groups,function(e,t){v[t]=e}),_.each(d,function(e){v[e.uuid]||(v[e.uuid]={divisions:t.StandBy.config.timeline.config.divisions.length>0,status:!1})});var g=[];_.each(d,function(e){e.uuid!="all"&&g.push(e)}),e.popover={groups:g,selection:v,divisions:t.StandBy.environment.divisions.length>0},e.checkAnyPies=function(){var t=!0;return e.loading.pies=!1,_.each(m.app.widgets.groups,function(e){e.status===!0&&(t=!1)}),t},e.loadingPies=!0,h(function(){y()},25),t.StandBy.config.profile.smartAlarm&&(p("smartAlarm").get("guard").selection&&(e.loading.smartAlarm=!1,b(p("smartAlarm").get("guard"))),l.guardMonitor().then(function(){l.guardRole().then(function(e){b(e)})}));var w=p("network").get("unique");_.each(d,function(e){e.name=e.name.replace(/\w\S*/g,function(e){return e.charAt(0).toUpperCase()+e.substr(1).toLowerCase()})});var E;d.unshift({name:t.ui.dashboard.everyone,uuid:"all"}),E="all",e.groups=d,e.states=t.StandBy.config.timeline.config.states,e.states["no-state"]={className:"no-state",label:t.ui.dashboard.possiblyAvailable,color:"#ececec",type:t.ui.dashboard.noPlanning,display:!1},e.divisions=t.StandBy.environment.divisions||[],e.divisions.length>0&&e.divisions[0].id!=="all"&&e.divisions.unshift({id:"all",label:t.ui.dashboard.allDivisions}),e.current={group:E,division:"all"},e.loadingAvailability=!0,e.getAvailability=function(n,r){n||(n=e.current.group),r||(r=e.current.division),o.getMemberAvailabilities(n,r).then(function(n){var r={};_.each(angular.fromJson(angular.toJson(n.members)),function(n,i){if(w[i]&&w[i].resources.role!=0&&w[i].resources.role!=4){var s={id:i,state:n.length>0?n[0].state:"no-state",label:n.length>0?e.states[n[0].state].label[0]:"",end:n.length>0&&n[0].end!==undefined?n[0].end*1e3:t.ui.dashboard.possiblyAvailable,name:w&&w[i]?w[i].resources.firstName+" "+w[i].resources.lastName:i};n.length>0?(r.available||(r.available=[]),r.unavailable||(r.unavailable=[]),n[0].state=="com.ask-cs.State.Unreached"?r.unavailable.push(s):n[0].state=="com.ask-cs.State.Unavailable"?r.unavailable.push(s):(n[0].state=="com.ask-cs.State.Available"&&(s.style="sa-icon-reserve-available"),n[0].state=="com.ask-cs.State.KNRM.BeschikbaarNoord"&&(s.style="sa-icon-reserve-available-north"),n[0].state=="com.ask-cs.State.KNRM.BeschikbaarZuid"&&(s.style="sa-icon-reserve-available-south"),n[0].state=="com.ask-cs.State.KNRM.SchipperVanDienst"&&(s.style="sa-icon-reserve-available-schipper"),r.available.push(s))):(r.possible||(r.possible=[]),r.possible.push(s))}}),e.loadingAvailability=!1;var i=function(e,t){return e.end<t.end?-1:e.end>t.end?1:0};r.hasOwnProperty("available")&&r.available.sort(i),r.hasOwnProperty("unavailable")&&r.unavailable.sort(i);var s=[];_.each(r.available,function(e){e.state=="com.ask-cs.State.KNRM.SchipperVanDienst"&&s.push(e)}),_.each(r.available,function(e){e.state=="com.ask-cs.State.Available"&&s.push(e)}),_.each(r.available,function(e){e.state=="com.ask-cs.State.KNRM.BeschikbaarNoord"&&s.push(e)}),_.each(r.available,function(e){e.state=="com.ask-cs.State.KNRM.BeschikbaarZuid"&&s.push(e)}),r.available=s,e.availability={members:r,synced:n.synced*1e3}})},e.getGroupAvailability=function(){e.current.division="all",e.getAvailability(e.current.group,e.current.division)},e.getDivisionAvailability=function(){e.getAvailability(e.current.group,e.current.division)},e.getGroupAvailability(),e.saveOverviewWidget=function(e){t.statusBar.display(t.ui.settings.saving),_.each(e,function(e){e.status||(e.divisions=!1)}),a.save(t.StandBy.resources.uuid,{user:angular.fromJson(p("user").get("resources").settingsWebPaige).user,app:{group:angular.fromJson(p("user").get("resources").settingsWebPaige).app.group,widgets:{groups:e}}}).then(function(){t.statusBar.display(t.ui.dashboard.refreshGroupOverviews),f.get(t.StandBy.resources.uuid,!0).then(function(){y()})})},e.getP2000=function(){s.p2000().then(function(t){e.loading.alerts=!1,e.alarms=t.alarms,e.alarms.list=e.alarms.short,e.synced.alarms=t.synced})},t.alarmSync={start:function(){r.planboardSync=r.setInterval(function(){i.path()=="/dashboard"&&(e.$apply(),e.getP2000(),t.StandBy.config.profile.smartAlarm?(p("smartAlarm").get("guard").selection&&(console.log("Guard",p("smartAlarm").get("guard").selection),b(p("smartAlarm").get("guard"))),l.guardRole().then(function(e){b(e)})):e.getAvailability(e.current.group))},t.StandBy.config.timers.ALARM_SYNC)},clear:function(){r.clearInterval(r.alarmSync)}},t.alarmSync.start(),e.toggle=function(n){e.alarms.list=n?e.alarms.short:e.alarms.long,e.more.text=n?t.ui.dashboard.showMore:t.ui.dashboard.showLess,e.more.status=!e.more.status},t.StandBy.config.profile.smartAlarm?$.ajax({url:t.StandBy.config.profile.p2000.url,dataType:"json",success:function(n){t.statusBar.off();var r=c.process(n,!0),i={alarms:r,synced:(new Date).getTime()};e.$apply(function(){e.loading.alerts=!1,e.alarms=i.alarms,e.alarms.list=e.alarms.short,e.synced.alarms=i.synced})},error:function(){console.log("ERROR with getting p2000 for the first time!")}}):s.getCapcodes().then(function(n){var r="";n=n.sort(),_.each(n,function(e){r+=e+", "}),e.capcodes=r.substring(0,r.length-2),$.ajax({url:t.StandBy.config.profile.p2000.url+"?code="+n,dataType:"jsonp",success:function(n){t.statusBar.off();var r=c.process(n),i={alarms:r,synced:(new Date).getTime()};e.$apply(function(){e.loading.alerts=!1,e.alarms=i.alarms,e.alarms.list=e.alarms.short,e.synced.alarms=i.synced})},error:function(){console.log("ERROR with getting p2000 for the first time!")}})}),e.setPrefixedAvailability=function(e,t){p("environment").save("setPrefixedAvailability",{availability:e,period:t}),i.path("/planboard").search({setPrefixedAvailability:!0})}})});
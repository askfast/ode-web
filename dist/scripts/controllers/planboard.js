define(["controllers/controllers"],function(e){e.controller("planboard",function(e,t,n,r,i,s,o,u,a,f){e.notification.status=!1,e.fixStyles(),t.self=this,t.data=s;var l=f("network").get("groups"),c=angular.fromJson(f("user").get("resources").settingsWebPaige),h,p=!1;_.each(l,function(e){e.uuid==c.app.group&&(p=!0)}),h=p?c.app.group:l[0].uuid,t.current={layouts:{user:!0,group:!0,members:!1},day:u.current.today()+1,week:u.current.week(),month:u.current.month(),year:u.current.year(),group:h,division:"all"},t.periods=u.getPeriods(),t.periodsNext=u.getPeriods(!0),t.slot={};var d=u.current.today()>360?{start:t.periods.days[358].last.timeStamp,end:t.periods.days[365].last.timeStamp}:{start:t.periods.days[u.current.today()-1].last.timeStamp,end:t.periods.days[u.current.today()+6].last.timeStamp};t.timeline={id:"mainTimeline",main:!0,user:{id:e.StandBy.resources.uuid,role:e.StandBy.resources.role},current:t.current,options:{start:d.start,end:d.end,min:d.start,max:d.end},range:{start:d.start,end:d.end},scope:{day:!1,week:!0,month:!1},config:{bar:e.StandBy.config.timeline.config.bar,layouts:e.StandBy.config.timeline.config.layouts,wishes:e.StandBy.config.timeline.config.wishes,legenda:{},legendarer:e.StandBy.config.timeline.config.legendarer,states:e.StandBy.config.timeline.config.states,divisions:e.StandBy.config.timeline.config.divisions,densities:e.StandBy.config.timeline.config.densities}},$.browser.msie&&$.browser.version=="8.0"&&(t.timeline.options={start:t.periods.days[u.current.today()].last.timeStamp,end:t.periods.days[u.current.today()+7].last.timeStamp,min:t.periods.days[u.current.today()].last.timeStamp,max:t.periods.days[u.current.today()+7].last.timeStamp}),_.each(e.StandBy.config.timeline.config.states,function(e,n){t.timeline.config.legenda[n]=!0}),t.timeline.config.legenda.groups={more:!0,even:!0,less:!0},t.daterange=u.readable.date(t.timeline.range.start)+" / "+u.readable.date(t.timeline.range.end),a(function(){var n={};_.each(t.timeline.config.states,function(t,r){t.display&&e.StandBy.resources.role<=t.minRole&&(n[r]=t.label)}),t.states=n}),t.groups=l,t.divisions=t.timeline.config.divisions,t.timeline.config.divisions.length>0&&(t.divisions[0].id!=="all"&&t.divisions.unshift({id:"all",label:"Alle divisies"}),t.groupPieHide={},_.each(t.divisions,function(e){t.groupPieHide[e.id]=!1})),t.resetViews=function(){t.views={slot:{add:!1,edit:!1},group:!1,wish:!1,member:!1}},t.resetViews(),e.$on("resetPlanboardViews",function(){t.resetViews()}),t.toggleSlotForm=function(){t.views.slot.add?(e.planboardSync.start(),t.resetInlineForms()):(e.planboardSync.clear(),e.$broadcast("slotInitials"),t.resetViews(),t.views.slot.add=!0)},t.resetInlineForms=function(){t.slot={},t.original={},t.resetViews()},t.sendShortageMessage=function(t){e.statusBar.display(e.ui.planboard.preCompilingStortageMessage),f("environment").save("escalation",{group:t.group,start:{date:t.start.date,time:t.start.time},end:{date:t.end.date,time:t.end.time},diff:t.diff}),i.path("/messages").search({escalate:!0}).hash("compose")}})});
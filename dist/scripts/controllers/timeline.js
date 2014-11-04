define(["controllers/controllers","config"],function(e,t){e.controller("timeline",["$rootScope","$scope","$q","$location","$route","$window","Slots","Dater","Sloter","Profile","Store",function(e,t,n,r,i,s,o,u,a,f,l){function p(){t.timeline.current.layouts.group&&(e.statusBar.display(e.ui.message.getWishes),o.wishes({id:t.timeline.current.group,start:t.data.periods.start/1e3,end:t.data.periods.end/1e3}).then(function(n){e.statusBar.off(),t.data.aggs.wishes=n,t.timeliner.render({start:t.timeline.range.start,end:t.timeline.range.end},!0)}))}var c,h;t.$watch(function(){if(t.timeline&&t.timeline.main){c=t.self.timeline.getVisibleChartRange();var n={hour:36e5,day:864e5,week:6048e5};s=u.calculate.diff(c)-n.hour,s<=n.day?t.timeline.scope={day:!0,week:!1,month:!1}:s<=n.week?t.timeline.scope={day:!1,week:!0,month:!1}:t.timeline.scope={day:!1,week:!1,month:!0},t.timeline.range={start:(new Date(c.start)).toString(),end:(new Date(c.end)).toString()},t.daterange=u.readable.date(t.timeline.range.start)+" / "+u.readable.date(t.timeline.range.end)}else i.current.params.userId!=e.StandBy.resources.uuid&&t.self.timeline&&(c=t.self.timeline.getVisibleChartRange(),t.timeline.range={start:(new Date(c.start)).toString(),end:(new Date(c.end)).toString()});if(t.timeline){var r=(new Date(Number(u.current.year())+1,11)).moveToLastDayOfMonth().addDays(1),s=r-new Date(c.end);if(s<=0)$("#timelineAfterBtn").attr("disabled","disabled");else if(t.timeline.current.year==u.current.year()&&(t.timeline.scope.month&&t.timeline.current.month===1||t.timeline.scope.week&&t.timeline.current.week===1&&t.timeline.current.month!=12||t.timeline.scope.day&&t.timeline.current.day===1))$("#timelineBeforeBtn").attr("disabled","disabled");else{var o=$("#timelineBeforeBtn"),a=$("#timelineAfterBtn"),f=o.attr("disabled"),l=a.attr("disabled");typeof f!="undefined"&&f!==!1&&o.removeAttr("disabled"),typeof l!="undefined"&&l!==!1&&a.removeAttr("disabled")}}}),e.$on("slotInitials",function(){t.slot={},t.slot={start:{date:(new Date).toString(e.StandBy.config.formats.date),time:(new Date).toString(e.StandBy.config.formats.time),datetime:(new Date).toString("yyyy-MM-ddTHH:mm:ss")},end:{date:(new Date).toString(e.StandBy.config.formats.date),time:(new Date).addHours(1).toString("HH:00"),datetime:(new Date).addHours(1).toString("yyyy-MM-ddTHH:00:00")},state:"com.ask-cs.State.Available",recursive:!1,id:""}}),t.timeliner={init:function(){t.self.timeline=new links.Timeline(document.getElementById(t.timeline.id)),links.events.addListener(t.self.timeline,"rangechanged",this.getRange),links.events.addListener(t.self.timeline,"add",this.onAdd),links.events.addListener(t.self.timeline,"delete",this.onRemove),links.events.addListener(t.self.timeline,"change",this.onChange),links.events.addListener(t.self.timeline,"select",this.onSelect),this.render(t.timeline.options)},getRange:function(){t.timelineGetRange()},onAdd:function(){t.timelineOnAdd()},onRemove:function(){t.timelineOnRemove()},onChange:function(){t.timelineChanging()},onSelect:function(){t.timelineOnSelect()},render:function(n,i){var s,o;t.timeline.range?(typeof t.timeline.range.start!=Date&&(t.timeline.range.start=new Date(t.timeline.range.start)),typeof t.timeline.range.end!=Date&&(t.timeline.range.end=new Date(t.timeline.range.end)),s=t.timeline.range.start,o=t.timeline.range.end):(s=new Date(n.start),o=new Date(n.end)),t.timeline={id:t.timeline.id,main:t.timeline.main,user:t.timeline.user,current:t.timeline.current,scope:t.timeline.scope,config:t.timeline.config,options:{start:i?s:new Date(n.start),end:i?o:new Date(n.end),min:new Date(n.start),max:new Date(n.end)}},$.browser.msie&&$.browser.version=="8.0"&&(t.timeline.options.start=new Date(n.start),t.timeline.options.end=new Date(n.end)),angular.extend(t.timeline.options,e.StandBy.config.timeline.options);if(t.timeline.main)t.self.timeline.draw(a.process(t.data,t.timeline.config,t.divisions,t.timeline.user.role,t.timeline.current),t.timeline.options);else{var u=r.hash()=="timeline"?e.StandBy.config.timers.TICKER:e.StandBy.config.timers.MEMBER_TIMELINE_RENDER;e.timelineLoaded=!1,setTimeout(function(){e.timelineLoaded=!0,e.$apply(),t.self.timeline.draw(a.profile(t.data.slots.data,t.timeline.config),t.timeline.options)},u)}t.self.timeline.setVisibleChartRange(t.timeline.options.start,t.timeline.options.end)},load:function(n,r){var i=this;e.statusBar.display(e.ui.planboard.refreshTimeline),t.timeline.main?o.all({groupId:t.timeline.current.group,division:t.timeline.current.division,layouts:t.timeline.current.layouts,month:t.timeline.current.month,stamps:n}).then(function(s){s.error?(e.notifier.error(e.ui.errors.timeline.query),console.warn("error ->",s)):(t.data=s,i.render(n,r)),e.statusBar.off(),t.timeline.config.wishes&&p()}):f.getSlots(t.timeline.user.id,n).then(function(s){s.error?(e.notifier.error(e.ui.errors.timeline.query),console.warn("error ->",s)):(s.user=s.slots.data,t.data=s,i.render(n,r),e.statusBar.off())})},refresh:function(){t.slot={},t.timeline.main?e.$broadcast("resetPlanboardViews"):t.forms={add:!0,edit:!1},this.load({start:t.data.periods.start,end:t.data.periods.end},!0)},redraw:function(){t.self.timeline.redraw()},isAdded:function(){return $(".state-new").length},cancelAdd:function(){t.self.timeline.cancelAdd()}},t.timeline&&t.timeliner.init(),e.$on("timeliner",function(){var e={start:(new Date(arguments[1].start)).getTime(),end:(new Date(arguments[1].end)).getTime()};e.start==e.end&&(e.end=(new Date.create(arguments[1].end)).addDays(1)),t.timeliner.load(e)}),t.requestTimeline=function(e){switch(e){case"group":t.timeline.current.layouts.group=!t.timeline.current.layouts.group,t.timeline.current.layouts.members&&!t.timeline.current.layouts.group&&(t.timeline.current.layouts.members=!1);break;case"members":t.timeline.current.layouts.members=!t.timeline.current.layouts.members,t.timeline.current.layouts.members&&!t.timeline.current.layouts.group&&(t.timeline.current.layouts.group=!0)}t.timeliner.load({start:t.data.periods.start,end:t.data.periods.end})},t.timelineGetRange=function(){var e=t.self.timeline.getVisibleChartRange();t.$apply(function(){t.timeline.range={start:(new Date(e.from)).toString(),end:(new Date(e.till)).toString()},t.timeline.main&&(t.daterange={start:u.readable.date((new Date(e.start)).getTime()),end:u.readable.date((new Date(e.end)).getTime())})})},t.selectedSlot=function(){var n;t.timeliner.isAdded()>0;if(n=t.self.timeline.getSelection()[0]){var r=t.self.timeline.getItem(n.row),i=angular.fromJson(r.content.match(/<span class="secret">(.*)<\/span>/)[1])||null;t.original={start:r.start,end:r.end,content:{recursive:i.recursive,state:i.state}},t.timeline.main?e.$broadcast("resetPlanboardViews"):t.forms={add:!1,edit:!0};if(i.type){if(t.timeline.main)switch(i.type){case"slot":t.views.slot.edit=!0;break;case"group":t.views.group=!0;break;case"wish":t.views.wish=!0;break;case"member":t.views.member=!0}var s=function(e){var t=new Date(e);return t.setMinutes(t.getMinutes()-t.getTimezoneOffset()),t.toISOString().replace("Z","")};t.slot={start:{date:(new Date(r.start)).toString(e.StandBy.config.formats.date),time:(new Date(r.start)).toString(e.StandBy.config.formats.time),datetime:s(r.start)},end:{date:(new Date(r.end)).toString(e.StandBy.config.formats.date),time:(new Date(r.end)).toString(e.StandBy.config.formats.time),datetime:s(r.end)},state:i.state,recursive:i.recursive,id:i.id};if(t.timeline.main)switch(i.type){case"group":t.slot.diff=i.diff,t.slot.group=i.group;break;case"wish":t.slot.wish=i.wish,t.slot.group=i.group,t.slot.groupId=i.groupId;break;case"member":t.slot.member=i.mid}}return r}},t.timelineOnSelect=function(){e.planboardSync.clear(),t.$apply(function(){t.selectedOriginal=t.selectedSlot()})},t.destroy={timeline:function(){},statistics:function(){setTimeout(function(){t.timeliner.redraw()},e.StandBy.config.timers.TICKER)}},t.changeDivision=function(){_.each(t.divisions,function(e){t.groupPieHide[e.id]=!1}),t.timeline.current.division!=="all"&&(t.groupPieHide[t.timeline.current.division]=!0),t.timeliner.render({start:t.timeline.range.start,end:t.timeline.range.end})},t.barCharts=function(){t.timeline.config.bar=!t.timeline.config.bar,t.timeliner.render({start:t.timeline.range.start,end:t.timeline.range.end})},t.groupWishes=function(){t.timeline.config.wishes?(t.timeline.config.wishes=!1,delete t.data.aggs.wishes,t.timeliner.render({start:t.timeline.range.start,end:t.timeline.range.end},!0)):(t.timeline.config.wishes=!0,p())},t.showLegenda=function(){t.timeline.config.legendarer=!t.timeline.config.legendarer},t.alterLegenda=function(e){t.timeline.config.legenda=e,t.timeliner.render({start:t.timeline.range.start,end:t.timeline.range.end})},t.setAvailability=function(n,r){var i=Math.abs(Math.floor(Date.now().getTime()/1e3)),s=3600,u={start:i,end:Number(i+r*s),state:n?"com.ask-cs.State.Available":"com.ask-cs.State.Unavailable"},a={start:u.start,end:u.end,recursive:!1,text:u.state};e.statusBar.display(e.ui.planboard.addTimeSlot),o.add(a,t.timeline.user.id).then(function(n){l("environment").remove("setPrefixedAvailability"),e.$broadcast("resetPlanboardViews"),n.error?(e.notifier.error(e.ui.errors.timeline.add),console.warn("error ->",n)):e.notifier.success(e.ui.planboard.slotAdded),t.timeliner.refresh(),e.planboardSync.start()})};if(r.search().setPrefixedAvailability){var d=l("environment").get("setPrefixedAvailability");t.setAvailability(d.availability,d.period)}var v=function(e){if(typeof e=="undefined"||e==null||e=="")return"";var t=new Date(e),n=t.getTimezoneOffset(),r=t.addMinutes(n);return r.toISOString()};t.timelineOnAdd=function(n,r){e.planboardSync.clear();var i,s=Date.now().getTime(),a=Math.abs(Math.floor(s/1e3));if(!n){i=t.self.timeline.getItem(t.self.timeline.getSelection()[0].row);var f=angular.element(i.content),l=angular.fromJson(f.html());if(l.recursive||(new Date(i.start)).getTime()>=s&&(new Date(i.end)).getTime()>s)t.timeliner.isAdded()>1&&t.self.timeline.cancelAdd(),t.$apply(function(){t.timeline.main?(e.$broadcast("resetPlanboardViews"),t.views.slot.add=!0):t.forms={add:!0,edit:!1},t.slot={start:{date:(new Date(i.start)).toString(e.StandBy.config.formats.date),time:(new Date(i.start)).toString(e.StandBy.config.formats.time),datetime:(new Date(i.start)).toISOString()},end:{date:(new Date(i.end)).toString(e.StandBy.config.formats.date),time:(new Date(i.end)).toString(e.StandBy.config.formats.time),datetime:(new Date(i.end)).toISOString()},recursive:i.group.match(/recursive/)?!0:!1,state:"com.ask-cs.State.Available"}});else{var c=/#timeline/.test(i.group)?e.ui.errors.timeline.notAuth:e.ui.errors.timeline.pastAdding;t.self.timeline.cancelAdd(),e.notifier.error(c),e.$apply()}}else{var h=e.browser.mobile?Math.abs(Math.floor((new Date(v(r.start.datetime))).getTime()/1e3)):u.convert.absolute(r.start.date,r.start.time,!0),p=e.browser.mobile?Math.abs(Math.floor((new Date(v(r.end.datetime))).getTime()/1e3)):u.convert.absolute(r.end.date,r.end.time,!0);h<a&&p<a&&r.recursive==0?(e.notifier.error(e.ui.errors.timeline.pastAdding),t.timeliner.refresh()):(h<a&&r.recursive==0&&(h=a),i={start:h,end:p,recursive:r.recursive?!0:!1,text:r.state},i.start*1e3+12e4<s&&i.recursive==0?(e.notifier.error(e.ui.errors.timeline.pastAdding),t.timeliner.refresh()):(e.statusBar.display(e.ui.planboard.addTimeSlot),o.add(i,t.timeline.user.id).then(function(n){e.$broadcast("resetPlanboardViews"),n.error?(e.notifier.error(e.ui.errors.timeline.add),console.warn("error ->",n)):e.notifier.success(e.ui.planboard.slotAdded),t.timeliner.refresh(),e.planboardSync.start()})))}},t.timelineChanging=function(){e.planboardSync.clear();var n=t.self.timeline.getItem(t.self.timeline.getSelection()[0].row),r={start:n.start,end:n.end,content:angular.fromJson(n.content.match(/<span class="secret">(.*)<\/span>/)[1])},i=function(e){var t=new Date(e);return t.setMinutes(t.getMinutes()-t.getTimezoneOffset()),t.toISOString().replace("Z","")};t.$apply(function(){t.slot={start:{date:(new Date(n.start)).toString(e.StandBy.config.formats.date),time:(new Date(n.start)).toString(e.StandBy.config.formats.time),datetime:i(n.start)},end:{date:(new Date(n.end)).toString(e.StandBy.config.formats.date),time:(new Date(n.end)).toString(e.StandBy.config.formats.time),datetime:i(n.end)},state:r.content.state,recursive:r.content.recursive,id:r.content.id}})},t.timelineOnChange=function(n,r,i,s){e.planboardSync.clear();var a=t.self.timeline.getItem(t.self.timeline.getSelection()[0].row);n?s={start:e.browser.mobile?(new Date(v(i.start.datetime))).getTime():u.convert.absolute(i.start.date,i.start.time,!1),end:e.browser.mobile?(new Date(v(i.end.datetime))).getTime():u.convert.absolute(i.end.date,i.end.time,!1),content:{recursive:i.recursive,state:i.state}}:s={start:a.start,end:a.end,content:angular.fromJson(a.content.match(/<span class="secret">(.*)<\/span>/)[1])},r.start=(new Date(r.start)).getTime(),r.end=(new Date(r.end)).getTime();var f=Date.now().getTime(),l=function(n,r,i){e.$broadcast("resetPlanboardViews"),n.error?(e.notifier.error(r.error),console.warn("error ->",n)):(!i&&e.notifier.success(r.success),i&&h(i)),t.timeliner.refresh(),e.planboardSync.start()},c=function(n,r){e.statusBar.display(e.ui.planboard.changingSlot),o.change(t.original,n,t.timeline.user.id).then(function(t){l(t,{error:e.ui.errors.timeline.change,success:e.ui.planboard.slotChanged},r)})},h=function(n){o.add(n,t.timeline.user.id).then(function(t){l(t,{error:e.ui.errors.timeline.add,success:e.ui.planboard.slotChanged})})},p=function(e,t){c(e,{start:Math.abs(Math.floor(t.start/1e3)),end:Math.abs(Math.floor(t.end/1e3)),recursive:t.content.recursive?!0:!1,text:t.content.state})},d=function(){e.notifier.error(e.ui.errors.timeline.pastChanging),t.timeliner.refresh()};if(/#timeline/.test(a.group))e.notifier.error(e.ui.errors.timeline.notAuth),t.timeliner.refresh();else if(s.content.recursive)c(s);else{if(s.start<f&&s.end<f){d();return}if(s.start>f&&s.end>f){if(r.start<f&&r.end<f){d();return}r.start<f&&r.end>f&&p({start:t.original.start,end:f,content:{recursive:t.original.content.recursive,state:t.original.content.state}},{start:s.start+(f-t.original.start),end:s.end,content:{recursive:s.content.recursive,state:s.content.state}}),r.start>f&&r.end>f&&c(s)}if(s.start<f&&s.end>f){if(r.start<f&&r.end<f){d();return}r.start<f&&r.end>f&&(s.content.state==r.content.state?c({start:t.original.start,end:s.end,content:{recursive:s.content.recursive,state:s.content.state}}):p({start:t.original.start,end:f,content:{recursive:t.original.content.recursive,state:t.original.content.state}},{start:f,end:s.end,content:{recursive:s.content.recursive,state:s.content.state}})),r.start>f&&r.end>f&&c({start:f,end:s.end,content:{recursive:s.content.recursive,state:s.content.state}})}}},t.timelineOnRemove=function(){e.planboardSync.clear();if(t.timeliner.isAdded()>0)t.self.timeline.cancelAdd(),t.$apply(function(){t.resetInlineForms()});else{var n=function(n){e.$broadcast("resetPlanboardViews"),n.error?(e.notifier.error(e.ui.errors.timeline.remove),console.warn("error ->",n)):e.notifier.success(e.ui.planboard.timeslotDeleted),t.timeliner.refresh(),e.planboardSync.start()},r=Date.now().getTime();t.original.end.getTime()<=r&&t.original.content.recursive==0?(e.notifier.error(e.ui.errors.timeline.pastDeleting),t.timeliner.refresh()):t.original.start.getTime()<=r&&t.original.end.getTime()>=r&&t.original.content.recursive==0?o.change(t.original,{start:Math.abs(Math.floor((new Date(t.original.start)).getTime())),end:Math.abs(Math.floor(r)),content:{recursive:t.original.content.recursive,state:t.original.content.state}},t.timeline.user.id).then(function(e){n(e)}):(e.statusBar.display(e.ui.planboard.deletingTimeslot),o.remove(t.original,t.timeline.user.id).then(function(e){n(e)}))}},t.wisher=function(n){e.statusBar.display(e.ui.planboard.changingWish),o.setWish({id:n.groupId,start:e.browser.mobile?(new Date(n.start.datetime)).getTime()/1e3:u.convert.absolute(n.start.date,n.start.time,!0),end:e.browser.mobile?(new Date(n.end.datetime)).getTime()/1e3:u.convert.absolute(n.end.date,n.end.time,!0),recursive:!1,wish:n.wish}).then(function(n){e.$broadcast("resetPlanboardViews"),n.error?(e.notifier.error(e.ui.errors.timeline.wisher),console.warn("error ->",n)):e.notifier.success(e.ui.planboard.wishChanged),t.timeliner.refresh()})},t.timeline&&t.timeline.main&&setTimeout(function(){t.self.timeline.redraw()},e.StandBy.config.timers.TICKER),e.planboardSync={start:function(){s.planboardSync=s.setInterval(function(){r.path()=="/planboard"&&(t.slot={},e.$broadcast("resetPlanboardViews"),t.timeliner.load({start:t.data.periods.start,end:t.data.periods.end},!0))},e.StandBy.config.timers.PLANBOARD_SYNC)},clear:function(){s.clearInterval(s.planboardSync)}},e.planboardSync.start()}])});
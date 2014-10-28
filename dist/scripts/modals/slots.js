define(["services/services","config"],function(e,t){e.factory("Slots",["$rootScope","$resource","$q","Dater","Sloter","Stats","Store",function(e,n,r,i,s,o,u){function h(e){var t=angular.fromJson(e.content);return{start:Math.floor((new Date(e.start)).getTime()/1e3),end:Math.floor((new Date(e.end)).getTime()/1e3),recursive:t.recursive,text:t.state,id:t.id}}var a=n(t.host+"/askatars/:user/slots",{user:""},{query:{method:"GET",params:{start:"",end:""},isArray:!0},change:{method:"PUT",params:{start:"",end:"",text:"",recursive:""}},save:{method:"POST",params:{}},remove:{method:"DELETE",params:{}}}),f=n(t.host+"/calc_planning/:id",{},{query:{method:"GET",params:{id:"",start:"",end:""},isArray:!0}}),l=n(t.host+"/network/:id/wish",{},{query:{method:"GET",params:{id:"",start:"",end:""},isArray:!0},save:{method:"PUT",params:{id:""}}}),c=n(t.host+"/network/:id/member/slots2",{},{query:{method:"GET",params:{id:"",start:"",end:""}}});return a.prototype.wishes=function(e){var t=r.defer(),n={id:e.id,start:e.start,end:e.end};return l.query(n,function(e){t.resolve(e)},function(e){t.resolve({error:e})}),t.promise},a.prototype.setWish=function(e){var t=r.defer(),n={start:e.start,end:e.end,wish:e.wish,recurring:e.recursive};return l.save({id:e.id},n,function(e){t.resolve(e)},function(e){t.resolve({error:e})}),t.promise},a.prototype.aggs=function(t){var n=r.defer(),i=[];return e.StandBy.config.timeline.config.divisions.length>0?_.each(e.StandBy.config.timeline.config.divisions,function(e){if(e.id!=="all"){var n={id:t.id,start:t.start,end:t.end,stateGroup:e.id,division:{id:e.id,label:e.label}};i.push(a.prototype.agg(n))}}):i.push(a.prototype.agg({id:t.id,start:t.start,end:t.end})),r.all(i).then(function(e){n.resolve(e)}),n.promise},a.prototype.agg=function(e){var t=r.defer();return f.query(e,function(n){var r=o.aggs(n,e.start,e.end);t.resolve({id:e.id,division:e.division,data:n,ratios:r.ratios,durations:r.durations})},function(e){t.resolve({error:e})}),t.promise},a.prototype.pie=function(e){function p(n){var r;if(n.length>1){_.each(n,function(e){s>=e.start&&s<=e.end&&(r=e),c<=e.start*1e3?l.next.data.push(e):c>=e.start*1e3&&l.current.data.push(e)});var i=l.current.data[l.current.data.length-1],u=l.next.data[0],a=i.end*1e3-c,f=[];return l.current.data[0].start=l.current.period.first.timeStamp/1e3,a>0&&l.next.data.unshift({diff:i.diff,start:c/1e3,end:i.end,wish:i.wish}),_.each(l.current.data,function(e){e.end-e.start>0&&f.push(e),e.diff<0&&l.current.shortages.push(e)}),f[0].start=l.current.period.first.timeStamp/1e3,_.each(l.next.data,function(e){e.diff<0&&l.next.shortages.push(e)}),{id:e.id,division:e.division,name:e.name,weeks:{current:{data:f,state:r,shortages:l.current.shortages,start:{date:(new Date(l.current.period.first.timeStamp)).toString(t.formats.date),timeStamp:l.current.period.first.timeStamp},end:{date:(new Date(l.current.period.last.timeStamp)).toString(t.formats.date),timeStamp:l.current.period.last.timeStamp},ratios:o.pies(f,h.start,h.end)},next:{data:l.next.data,shortages:l.next.shortages,start:{date:(new Date(l.next.period.first.timeStamp)).toString(t.formats.date),timeStamp:l.next.period.first.timeStamp},end:{date:(new Date(l.next.period.last.timeStamp)).toString(t.formats.date),timeStamp:l.next.period.last.timeStamp},ratios:o.pies(l.next.data,h.start,h.end)}}}}n[0].diff==null&&(n[0].diff=0),n[0].wish==null&&(n[0].wish=0);var p=[{start:l.current.period.first.timeStamp/1e3,end:l.current.period.last.timeStamp/1e3,wish:n[0].wish,diff:n[0].diff}],d=[{start:l.next.period.first.timeStamp/1e3,end:l.next.period.last.timeStamp/1e3,wish:n[0].wish,diff:n[0].diff}];return p[0].diff<0&&l.current.shortages.push(p[0]),d[0].diff<0&&l.next.shortages.push(d[0]),{id:e.id,division:e.division,name:e.name,weeks:{current:{data:p,state:p,shortages:l.current.shortages,start:{date:(new Date(l.current.period.first.timeStamp)).toString(t.formats.date),timeStamp:l.current.period.first.timeStamp},end:{date:(new Date(l.current.period.last.timeStamp)).toString(t.formats.date),timeStamp:l.current.period.last.timeStamp},ratios:o.pies(p,h.start,h.end)},next:{data:d,shortages:l.next.shortages,start:{date:(new Date(l.next.period.first.timeStamp)).toString(t.formats.date),timeStamp:l.next.period.first.timeStamp},end:{date:(new Date(l.next.period.last.timeStamp)).toString(t.formats.date),timeStamp:l.next.period.last.timeStamp},ratios:o.pies(d,h.start,h.end)}}}}var n=r.defer(),s=Math.floor(Date.now().getTime()/1e3),u=i.getPeriods(),a=i.current.week(),l={current:{period:u.weeks[a],data:[],shortages:[]},next:{period:u.weeks[a+1],data:[],shortages:[]}},c=l.current.period.last.timeStamp,h={id:e.id,start:l.current.period.first.timeStamp/1e3,end:l.next.period.last.timeStamp/1e3};return e.division!="both"&&(h.stateGroup=e.division),f.query(h,function(e){n.resolve(p(e))},function(e){n.resolve({error:e})}),n.promise},a.prototype.currentState=function(){var t=r.defer(),n=u("user").get("resources");if(n){var i;i=String(Date.now().getTime()),i=Number(i.substr(0,i.length-3));var s={user:n.uuid,start:i,end:i+1};a.query(s,function(n){t.resolve(n.length>0?e.StandBy.config.statesall[n[0].text]:{color:"gray",label:"Mogelijk inzetbaar"})})}else t.resolve([]);return t.promise},a.prototype.all=function(e){var t=r.defer(),n=i.getPeriods(),s={user:u("user").get("resources").uuid,start:e.stamps.start/1e3,end:e.stamps.end/1e3},f={};return a.query(s,function(n){_.each(n,function(e){e.recursive||(e.recursive=!1)});if(e.layouts.group){var r={id:e.groupId,start:s.start,end:s.end,month:e.month};a.prototype.aggs(r).then(function(r){if(e.layouts.members){var i=u("network").get("group."+e.groupId),a=[];c.query({id:e.groupId,start:s.start,end:s.end,type:"both"},function(u){var a=[];_.each(u,function(e,t){_.each(e,function(e){e.text=e.state});var n;_.each(i,function(e){t==e.uuid&&(n=e)}),n!=null&&a.push({id:t,lastName:n.resources.lastName,role:n.resources.role,data:e,stats:o.member(e,s.start,s.end)})}),t.resolve({user:n,groupId:e.groupId,aggs:r,members:a,synced:(new Date).getTime(),periods:{start:e.stamps.start,end:e.stamps.end}})},function(e){t.resolve({error:e})})}else t.resolve({user:n,groupId:e.groupId,aggs:r,synced:(new Date).getTime(),periods:{start:e.stamps.start,end:e.stamps.end}})})}else t.resolve({user:n,synced:(new Date).getTime(),periods:{start:e.stamps.start,end:e.stamps.end}})},function(e){t.resolve({error:e})}),t.promise},a.prototype.getMemberAvailabilities=function(e,t){var n=r.defer(),i=Math.floor(Date.now().getTime()/1e3);return c.query({id:e,type:t,start:i,end:i+1e3},function(e){n.resolve({members:e,synced:i})},function(e){n.reject({error:e})}),n.promise},a.prototype.user=function(e){var t=r.defer();return a.query(e,function(n){t.resolve({id:e.user,data:n,stats:o.member(n,e.start,e.end)})},function(e){t.resolve({error:e})}),t.promise},a.prototype.local=function(){return u("user").get("slots")},a.prototype.add=function(e,t){var n=r.defer(),i=moment.unix(e.start).seconds(0);return e.start=i.unix(),a.save({user:t},e,function(e){n.resolve(e)},function(e){n.resolve({error:e})}),n.promise},a.prototype.change=function(e,t,n){var i=r.defer();return a.change(angular.extend(h(t),{user:n}),h(e),function(e){i.resolve(e)},function(e){i.resolve({error:e})}),i.promise},a.prototype.remove=function(e,t){var n=r.defer();return a.remove(angular.extend(h(e),{user:t}),function(e){n.resolve(e)},function(e){n.resolve({error:e})}),n.promise},new a}])});
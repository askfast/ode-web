define(["services/services","config"],function(e,t){e.factory("Groups",["$resource","$q","$rootScope","Slots","$location","Strings","Store",function(e,n,r,i,s,o,u){var a=e(t.host+"/network/:action/:id",{},{query:{method:"GET",params:{},isArray:!0},get:{method:"GET",params:{id:""}},save:{method:"POST",params:{id:""},isArray:!0},edit:{method:"PUT",params:{id:""}},remove:{method:"DELETE",params:{id:""},isArray:!0},search:{method:"POST",params:{id:"",action:"searchPaigeUser",fields:"role"},isArray:!0}}),f=e(t.host+"/node/:id/container",{},{get:{method:"GET",params:{id:""},isArray:!0}}),l=e(t.host+"/parent",{},{get:{method:"GET",params:{},isArray:!0}}),c=e(t.host+"/network/:id/members/:mid",{},{query:{method:"GET",params:{id:"",fields:"[role, settingsWebPaige, PhoneAddresses]"},isArray:!0},get:{method:"GET",params:{id:""}},save:{method:"POST",params:{}},add:{method:"POST",params:{id:"",mid:""}},remove:{method:"DELETE",params:{id:"",mid:""}}}),h=e(t.host+"/network/guard/:id/:team",{},{global:{method:"GET",isArray:!0},position:{method:"GET",params:{id:"",team:""}}});return a.prototype.guardMonitor=function(){var e=n.defer(),t=u("smartAlarm").get("guard")||{};return h.global(null,function(n){var i="";angular.forEach(n[0],function(e){i+=e}),t.monitor=i,u("smartAlarm").save("guard",t),r.StandBy.guard.monitor=i,e.resolve(i)},function(t){e.resolve({error:t})}),e.promise},a.prototype.guardRole=function(){var e=n.defer(),t=this;return t.guard=u("smartAlarm").get("guard"),h.position({id:t.guard.monitor,team:"status"},function(n){var i=_.indexBy(u("network").get("unique"),function(e){return e.uuid});t.guard.synced=(new Date).getTime(),t.guard.users={},angular.forEach(n.station,function(e){var n;if(e[0]!="agent"||e[1]!="state")n={name:i&&i[e[0]]&&i[e[0]].name||e[0],state:e[1]},i[e[0]]?n.role=i[e[0]].resources.role:n.role="0",t.guard.users[e[0]]=n}),t.guard.truck=[],t.guard.selection={},angular.forEach(n.selection,function(e,i){t.guard.selection[i]={user:e.agentID},e.agentID!=null&&t.guard.truck.push(e.agentID),s.path()!="/tv"&&e.agentID==r.StandBy.resources.uuid&&(t.guard.role=n.map[i].name)}),angular.forEach(n.map,function(e,n){t.guard.selection[n].role=e.name}),t.guard.reserves={available:[],unavailable:[],noplanning:[]},angular.forEach(t.guard.users,function(e,n){if(t.guard.truck.indexOf(n)==-1){var r={};r[n]=e,t.guard.reserves[e.state].push(r)}}),u("smartAlarm").save("guard",t.guard),e.resolve(t.guard)},function(t){e.resolve({error:t})}),e.promise},a.prototype.parents=function(e){var t=n.defer();return l.get(null,function(n){e?t.resolve(n):n.length==0?t.resolve(null):t.resolve(n[0].uuid)},function(e){t.resolve({error:e})}),t.promise},a.prototype.containers=function(e){var t=n.defer(),r=[];return f.get({id:e},function(e){angular.forEach(e,function(e){var t=[];angular.forEach(e,function(e){t+=e}),r.push(t)}),t.resolve(r)},function(e){t.resolve({error:e})}),t.promise},a.prototype.addMember=function(e){var t=n.defer();return c.add({id:e.group.uuid,mid:e.id},{},function(e){t.resolve(e)},function(e){t.resolve({error:e})}),t.promise},a.prototype.removeMember=function(e,t){var r=n.defer();return c.remove({id:t,mid:e},function(e){r.resolve(e)},function(e){r.resolve({error:e})}),r.promise},a.prototype.removeMembers=function(e,t){var r=n.defer(),i=[];return angular.forEach(e,function(e,n){e&&i.push(a.prototype.removeMember(n,t.uuid))}),n.all(i).then(function(e){r.resolve(e)}),r.promise},a.prototype.wish=function(e){var t=n.defer(),r=0;return i.wishes({id:e,start:255600,end:860400}).then(function(e){angular.forEach(e,function(e){e.start==255600&&e.end==860400&&e.count!=null&&(r=e.count)}),t.resolve({count:r})}),t.promise},a.prototype.query=function(e){var t=n.defer();return a.query(function(r){u("network").save("groups",r);if(!e){var i=[];angular.forEach(r,function(e){i.push(a.prototype.get(e.uuid))}),n.all(i).then(function(e){a.prototype.uniqueMembers();var n={};n.members={},angular.forEach(r,function(t){n.groups=r,n.members[t.uuid]=[],angular.forEach(e,function(e){e.id==t.uuid&&(n.members[t.uuid]=e.data)})}),t.resolve(n)})}else t.resolve(r)},function(e){t.resolve({error:e})}),t.promise},a.prototype.get=function(e){var t=n.defer();return c.query({id:e},function(n){var r;n.length==4&&n[0][0]=="n"&&n[1][0]=="u"?r=[]:r=n,u("network").save("group".id,r),t.resolve({id:e,data:r})},function(e){t.resolve({error:e})}),t.promise},a.prototype.uniqueMembers=function(){angular.forEach(u("network").get("groups"),function(e){var t=u("network").get("unique")||{};angular.forEach(u("network").get("group."+e.uuid),function(e){e.resources&&e.resources.role!=0&&e.resources.role!=4&&(t[e.uuid]=e)}),u("network").save("unique",t)})},a.prototype.save=function(e){var t=n.defer();return e.id?a.edit({id:e.id},{name:e.name},function(){t.resolve(e.id)}):a.save({id:r.StandBy.resources.uuid},e,function(e){var n="";angular.forEach(e[0],function(e){e.length==1&&!angular.isObject(e)&&(n+=e)}),t.resolve(n)},function(e){t.resolve({error:e})}),t.promise},a.prototype.remove=function(e){var t=n.defer();return a.remove({id:e},function(e){t.resolve(e)},function(e){t.resolve({error:e})}),t.promise},a.prototype.search=function(e){var t=n.defer();return a.search(null,{key:e},function(e){var n=[];e.sort(function(e,t){var n=e.name.toLowerCase(),r=t.name.toLowerCase();return n<r?-1:n>r?1:0}),angular.forEach(e,function(e){n.push({id:e.id,name:e.name,fields:e.fields,groups:a.prototype.getMemberGroups(e.id)})}),t.resolve(n)},function(e){t.resolve({error:e})}),t.promise},a.prototype.getMemberGroups=function(e){var t=u("network").get("groups"),n=[];return angular.forEach(t,function(t){var r=u("network").get("group."+t.uuid);angular.forEach(r,function(r){r.uuid===e&&n.push({uuid:t.uuid,name:t.name})})}),n},new a}])});
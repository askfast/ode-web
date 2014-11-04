define(["services/services","config"],function(e,t){e.factory("Messages",["$rootScope","$resource","$q","Store","$http",function(e,n,r,i,s){var o=n(t.host+"/question/:action",{},{query:{method:"GET",params:{action:"",0:"dm"},isArray:!0},get:{method:"GET",params:{}},send:{method:"POST",params:{action:"sendDirectMessage"}},save:{method:"POST",params:{}},changeState:{method:"POST",params:{action:"changeState"},isArray:!0},remove:{method:"POST",params:{action:"deleteQuestions"}}}),u=n(t.host+"/notification/:uuid",{},{query:{method:"GET",params:{},isArray:!0},get:{method:"GET",params:{uuid:""}},save:{method:"POST",params:{},isArray:!0},edit:{method:"PUT",params:{uuid:""},isArray:!0},remove:{method:"DELETE",params:{uuid:""},isArray:!0}});return o.prototype.query=function(){var t=r.defer();return o.query(function(n){var r=[];angular.forEach(n,function(t){if(t.subject==null||t.subject==undefined||t.subject=="")t.subject=e.ui.message.noSubject;r.push(t)}),i("messages").save("all",r),o.prototype.unreadCount(),o.prototype.scheaduled.list().then(function(e){t.resolve({messages:o.prototype.filter(r),scheadules:e})})},function(e){t.resolve({error:e})}),t.promise},o.prototype.scheaduled={list:function(){var e=r.defer();return u.query(function(t){i("notifications").save("all",t),angular.forEach(t,function(e){angular.forEach(e.types,function(t){t=="sms"&&(e.sms=!0),t=="email"&&(e.mail=!0)})}),e.resolve(t)},function(t){e.resolve({error:t})}),e.promise},create:function(e){var t=r.defer();return u.save(null,angular.toJson(e),function(e){var n="";angular.forEach(e,function(e){n+=e}),t.resolve(n)},function(e){t.resolve({error:e})}),t.promise},edit:function(e,t){var n=r.defer();return u.edit({uuid:e},angular.toJson(t),function(e){n.resolve(e)},function(e){n.resolve({error:e})}),n.promise},get:function(e){var t=r.defer();return u.get({uuid:e},function(e){t.resolve(e)},function(e){t.resolve({error:e})}),t.promise},find:function(e){var t;return angular.forEach(this.local(),function(n){n.uuid==e&&(t=n)}),t},local:function(){return i("notifications").get("all")},remove:function(e){var t=r.defer();return u.remove({uuid:e},function(e){t.resolve(e)},function(e){t.resolve({error:e})}),t.promise}},o.prototype.filter=function(e){var t={inbox:[],outbox:[],trash:[]};angular.forEach(e,function(e){e.subject==""&&(e.subject="-No Subject-"),e.box=="inbox"&&e.state!="TRASH"?t.inbox.push(e):e.box=="outbox"&&e.state!="TRASH"?t.outbox.push(e):(e.box=="inbox"||e.box=="outbox")&&e.state=="TRASH"&&t.trash.push(e)});var n=function(e){var t=50,n=e.length,r=0,i=[];while(r*t<n)i[r]=e.slice(r*t,(r+1)*t),r++;return i};return t.inbox=n(t.inbox),t.outbox=n(t.outbox),t.trash=n(t.trash),t},o.prototype.local=function(){return i("messages").get("all")},o.prototype.find=function(e){var t;return angular.forEach(o.prototype.local(),function(n){n.uuid==e&&(t=n)}),t},o.prototype.receviers=function(){var t=i("network").get("unique"),n=i("network").get("groups"),r=[];return angular.forEach(t,function(t){t.uuid!=null&&r.push({id:t.uuid,name:t.resources.firstName+" "+t.resources.lastName,lastName:t.resources.lastName,firstName:t.resources.firstName,group:e.ui.message.receiversUsers})}),angular.forEach(n,function(t){r.push({id:t.uuid,name:t.name,lastName:t.name,group:e.ui.message.receiversGroups})}),r},o.prototype.send=function(e,t){var n=r.defer(),i=[],s=[];angular.forEach(e.receivers,function(e){i.push(e.id)}),s.push("paige"),t.sms&&s.push("sms"),t.email&&s.push("email");var e={members:i,content:e.body||"",subject:e.subject,types:s};return o.send(null,e,function(e){var t="",r=angular.isArray(e)?e[0]:e;angular.forEach(r,function(e){e.length==1&&!angular.isObject(e)&&(t+=e)}),n.resolve(t)},function(e){n.resolve({error:e})}),n.promise},o.prototype.email=function(e){var n=r.defer(),i;return e=="regular"?i="/mail/mobile_app.html":e=="experimental"&&(i="/mail/mobile_app_experimental.html"),s({method:"GET",url:"../profiles/"+t.profile.meta+i}).success(function(e,t,r,i){var s={content:e,subject:"Mobiele App Instructies",types:["email"],contenttype:"text/html"};o.send(null,s,function(e){var t="";angular.forEach(e,function(e){t+=e}),n.resolve(t)},function(e){n.resolve({error:e})})}).error(function(e,t,n,r){console.log("Something went wrong terribly with emailing the message!",e,t,n,r)}),n.promise},o.prototype.unread=function(){var e=o.prototype.local(),t=[];return angular.forEach(e,function(e){e.box=="inbox"&&e.state=="NEW"&&t.push(e)}),t},o.prototype.unreadCount=function(){var t=o.prototype.local(),n=0;angular.forEach(t,function(e){e.box=="inbox"&&e.state=="NEW"&&n++}),e.StandBy.unreadMessages=n},o.prototype.changeState=function(e,t){var n=r.defer();o.changeState(null,{ids:e,state:t},function(e){n.resolve(e)},function(e){n.resolve({error:e})});if(t=="READ"){var s=i("message").get("all"),u=[];angular.forEach(s,function(t){angular.forEach(e,function(e){t.uuid==e&&(t.state="READ")}),u.push(t)}),i("messages").remove("all"),i("messages").save("all",u),o.prototype.unreadCount()}return n.promise},o.prototype.remove=function(e){var t=r.defer();return o.prototype.changeState(e,"TRASH").then(function(e){t.resolve(e)}),t.promise},o.prototype.restore=function(e){var t=r.defer();return o.prototype.changeState(e,"SEEN").then(function(e){t.resolve(e)}),t.promise},o.prototype.emptyTrash=function(e){var t=r.defer(),n=o.prototype.local(),i=[];return angular.forEach(n,function(e){(e.box=="inbox"||e.box=="outbox")&&e.state=="TRASH"&&i.push(e.uuid)}),o.remove(null,{members:i},function(e){t.resolve(e)},function(e){t.resolve({error:e})}),t.promise},o.prototype.clean=function(e){var t=r.defer(),n=[];return angular.forEach(e,function(e){var t=[];angular.forEach(e,function(e){t.push(e.uuid)}),n.push(o.remove(null,{members:t}))}),r.all(n).then(function(e){t.resolve(e)}),t.promise},new o}])});
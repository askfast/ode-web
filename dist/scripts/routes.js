define(["app"],function(e){e.config(function(e,t,n){t.when("/login",{templateUrl:"views/login.html",controller:"login"}).when("/logout",{templateUrl:"views/logout.html",controller:"logout"}).when("/dashboard",{templateUrl:"views/dashboard.html",controller:"dashboard"}).when("/tv",{templateUrl:"views/tv.html",controller:"tv",resolve:{data:function(e,t){e.current.params.sessionID&&(t.defaults.headers.common["X-SESSION_ID"]=e.current.params.sessionID)}}}).when("/planboard",{templateUrl:"views/planboard.html",controller:"planboard",resolve:{data:function(e,t,n,r,i){var s=i("app").get("periods"),o=angular.fromJson(i("user").get("resources").settingsWebPaige),u=i("network").get("groups"),a,f=!1;return _.each(u,function(e){e.uuid==o.app.group&&(f=!0)}),a=f?o.app.group:u[0].uuid,t.all({groupId:a,stamps:r.current.today()>360?{start:s.days[358].last.timeStamp,end:s.days[365].last.timeStamp}:{start:s.days[r.current.today()-1].last.timeStamp,end:s.days[r.current.today()+6].last.timeStamp},month:r.current.month(),layouts:{user:!0,group:!0,members:!1}})}},reloadOnSearch:!1}).when("/messages",{templateUrl:"views/messages.html",controller:"messages",resolve:{data:function(e){return e.query()}},reloadOnSearch:!1}).when("/groups",{templateUrl:"views/groups.html",controller:"groups",resolve:{data:function(e){return e.query()}},reloadOnSearch:!1}).when("/profile/:userId",{templateUrl:"views/profile.html",controller:"profile",resolve:{data:function(e,t,n,r){if(n.current.params.userId.toLowerCase()!=e.StandBy.resources.uuid){var i=Store("app").get("periods");return t.getWithSlots(n.current.params.userId.toLowerCase(),!1,{start:i.weeks[r.current.week()].first.timeStamp/1e3,end:i.weeks[r.current.week()].last.timeStamp/1e3})}return t.get(n.current.params.userId.toLowerCase(),!1)}},reloadOnSearch:!1}).when("/profile",{templateUrl:"views/profile.html",controller:"profile",resolve:{data:function(e,t,n){(!t.current.params.userId||!n.hash())&&n.path("/profile/"+e.StandBy.resources.uuid).hash("profile")}}}).when("/settings",{templateUrl:"views/settings.html",controller:"settings",resolve:{data:function(e){return angular.fromJson(e.get())}}}).when("/faq",{templateUrl:"views/faq.html",controller:"faq"}).when("/help",{templateUrl:"views/help.html",controller:"help"}).otherwise({redirectTo:"/login"}),n.interceptors.push(function(e,t,n,r){return{request:function(t){return t||e.when(t)},requestError:function(t){return e.reject(t)},response:function(t){return t||e.when(t)},responseError:function(t){return t.status==403&&(r("environment").remove("sessionTimeout"),n.path("/logout"),window.location.href="logout.html"),e.reject(t)}}})})});
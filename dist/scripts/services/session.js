define(["services/services"],function(e){e.factory("Session",["$rootScope","$http",function(e,t){return{check:function(){return this.get()},get:function(){var e=angular.fromJson(sessionStorage.getItem("session"));return!t.defaults.headers.common["X-SESSION_ID"]&&e&&(t.defaults.headers.common["X-SESSION_ID"]=e.id),e?e.id:!1},set:function(n){t.defaults.headers.common["X-SESSION_ID"]=n;var r={id:n,time:new Date};sessionStorage.setItem("session",angular.toJson(r)),e.app.session=r},clear:function(){sessionStorage.removeItem("session"),delete e.app.session,t.defaults.headers.common["X-SESSION_ID"]=null}}}])});
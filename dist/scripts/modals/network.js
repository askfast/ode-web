define(["services/services"],function(e){e.factory("Network",["$rootScope","$resource","$q","Log","StandBy","Store",function(e,t,n,r,i,s){var o=t(),u=function(e){return e},a=function(e){return e.resources.role>0&&e.resources.role<4};return o.prototype.groups=function(){var e=n.defer();try{i._("groups").then(function(t){_.each(t,function(e){e.name=u(e.name)}),t=_.sortBy(t,"name"),s("network").save("groups",t),e.resolve(t)})}catch(t){r.error("Something went wrong with network groups call:",t)}return e.promise},o.prototype.members=function(e){var t=n.defer();try{i._("members",{second:e}).then(function(n){s("network").save("group."+e,_.filter(n,a)),t.resolve(n)})}catch(o){r.error("Something went wrong with network group members call for:",e,o)}return t.promise},o.prototype.population=function(){var e=n.defer(),t=[],o={},u=s("network").get("groups");try{_.each(u,function(e){t.push(i._("members",{second:e.uuid}).then(function(t){s("network").save("group."+e.uuid,_.filter(t,a)),o[e.uuid]=t}))}),n.all(t).then(function(){var t=function(e){var t=[];return _.each(e,function(e){e.length>0&&_.each(e,function(e){t.push(e)})}),_.indexBy(_.filter(_.map(_.indexBy(t,function(e){return e.uuid}),function(e){return e}),a),function(e){return e.uuid})};s("network").save("population",o),s("network").save("unique",t(o)),e.resolve(o)}.bind(o))}catch(f){r.error("Something went wrong with network group members population call:",f)}return e.promise},new o}])});
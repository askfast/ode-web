define(["services/services"],function(e){e.factory("Sloter",["$rootScope","Store",function(e,t){return{get:{groups:function(){var e={};return _.each(t("network").get("groups"),function(t){e[t.uuid]=t.name}),e},members:function(){var e={};return _.each(t("network").get("unique"),function(t){t!=null&&t.uuid!=null&&(e[t.uuid]=t.resources.firstName+" "+t.resources.lastName)}),e}},wrapper:function(e){return'<span style="display:none;">'+e+"</span>"},secret:function(e){return'<span class="secret">'+e+"</span>"},addLoading:function(e,t,n){return _.each(n,function(n){t.push({start:e.periods.end,end:15778368e5,group:n,content:"loading",className:"state-loading-right",editable:!1}),t.push({start:0,end:e.periods.start,group:n,content:"loading",className:"state-loading-left",editable:!1})}),t},tooltip:function(t){var n=function(t){return(new Date(t*1e3)).toString(e.StandBy.config.formats.datetime)},r=n(t.start)+" / "+n(t.end);return t.hasOwnProperty("min")&&(r+=" / Huidig aantal beschikbaar: "+t.min),t.hasOwnProperty("wish")&&(r+=" / Gewenst aantal mensen: "+t.wish),t.hasOwnProperty("member")&&(r+=" / "+t.member),t.hasOwnProperty("state")&&(r+=" / "+t.state),'<div class="time-tip" title="'+r+'">'+r+"</div>"},user:function(t,n,r){var i=this;return _.each(t.user,function(t,s){_.each(r.legenda,function(o,u){t.text==u&&o&&n.push({start:Math.round(t.start*1e3),end:Math.round(t.end*1e3),group:t.recursive?i.wrapper("b")+e.ui.planboard.weeklyPlanning+i.wrapper("recursive"):i.wrapper("a")+e.ui.planboard.planning+i.wrapper("planning"),content:this.tooltip({start:t.start,end:t.end})+i.secret(angular.toJson({type:"slot",id:s,recursive:t.recursive,state:t.text})),className:"slot-"+s+" "+r.states[t.text].className,editable:!0})}.bind(this))}.bind(this)),n=i.addLoading(t,n,[i.wrapper("b")+e.ui.planboard.weeklyPlanning+i.wrapper("recursive"),i.wrapper("a")+e.ui.planboard.planning+i.wrapper("planning")]),n},profile:function(t,n){var r=this,i=[];return _.each(t,function(t,s){_.each(n.legenda,function(o,u){t.text==u&&o&&i.push({start:Math.round(t.start*1e3),end:Math.round(t.end*1e3),group:t.recursive?r.wrapper("b")+e.ui.planboard.weeklyPlanning+r.wrapper("recursive"):r.wrapper("a")+e.ui.planboard.planning+r.wrapper("planning"),content:r.secret(angular.toJson({type:"slot",id:s,recursive:t.recursive,state:t.text})),className:"slot-"+s+" "+n.states[t.text].className,editable:!0})})}),i.push({start:0,end:1,group:r.wrapper("b")+e.ui.planboard.weeklyPlanning+r.wrapper("recursive"),content:"",className:null,editable:!1}),i.push({start:0,end:1,group:r.wrapper("a")+e.ui.planboard.planning+r.wrapper("planning"),content:"",className:null,editable:!1}),i},namer:function(e,t){var n=this.get.groups(),r=n[e.id];r=r.charAt(0).toUpperCase()+r.slice(1);var i='<a href="#/groups?uuid='+e.id+'#view">'+r+"</a>",s;if(!e.division)s=t<=1?i:"<span>"+r+"</span>";else{var o;s=t<=1?i:"<span>"+r+"</span>",s+=' <span class="label label-default">'+e.division.label+"</span>"}return s},bars:function(e,t,n,r,i){var s=this,o=0;return _.each(s.filtered(e,i),function(i){var u=s.namer(i,r);_.each(i.data,function(e){e.wish>o&&(o=e.wish)}),_.each(i.data,function(r){var i=o,a=r.wish,f=a,l=Math.round(a/i*80+20),c=l,h="height:"+l+"px;",p='<div class="requirement" style="'+h+'" '+'title="'+"Minimum aantal benodigden"+": "+a+' personen"></div>';a=r.wish+r.diff;var d=a;l=Math.round(a/i*80+20);if(r.diff>=0&&r.diff<7){var v;switch(r.diff){case 0:v="bars-even";break;case 1:v="bars-more";break;case 2:v="bars-more";break;case 3:v="bars-more";break;case 4:v="bars-more";break;case 5:v="bars-more";break;case 6:v="bars-more"}}else r.diff>=7?v="bars-more":v="bars-less";var m='<span class="badge badge-inverse">'+r.diff+"</span>";d>f&&(l=c),h="height:"+l+"px;";var g='<div class="bar '+v+'" style="'+h+'" '+' title="Huidig aantal beschikbaar: '+a+' personen">'+m+"</div>";(r.diff>0&&n.legenda.groups.more||r.diff==0&&n.legenda.groups.even||r.diff<0&&n.legenda.groups.less)&&t.push({start:Math.round(r.start*1e3),end:Math.round(r.end*1e3),group:s.wrapper("c")+u,content:p+g+s.secret(angular.toJson({type:"group",diff:r.diff,group:u})),className:"group-aggs",editable:!1}),t=s.addLoading(e,t,[s.wrapper("c")+u])})}),t},aggs:function(e,t,n,r,i){var s=this;return _.each(s.filtered(e,i),function(i){var o=s.namer(i,r);_.each(i.data,function(r){var i;if(r.diff>=0&&r.diff<7)switch(r.diff){case 0:i="even";break;case 1:i=1;break;case 2:i=2;break;case 3:i=3;break;case 4:i=4;break;case 5:i=5;break;case 6:i=6}else r.diff>=7?i="more":i="less";(r.diff>0&&n.legenda.groups.more||r.diff==0&&n.legenda.groups.even||r.diff<0&&n.legenda.groups.less)&&t.push({start:Math.round(r.start*1e3),end:Math.round(r.end*1e3),group:s.wrapper("c")+o,content:this.tooltip({start:r.start,end:r.end,min:r.wish+r.diff})+s.secret(angular.toJson({type:"group",diff:r.diff,group:o})),className:"agg-"+i,editable:!1}),t=s.addLoading(e,t,[s.wrapper("c")+o])}.bind(this))}.bind(this)),t},wishes:function(e,t,n){var r=this,i=this.get.groups(),s=i[e.aggs[0].id],o='<a href="#/groups?uuid='+e.aggs[0].id+'#view">'+s+"</a>",u;return u=n==1?o:"<span>"+s+"</span>",u+=' <span class="label label-default">Behoefte (elke divisie)</span>',_.each(e.aggs.wishes,function(n){var i;n.count>=7?i="wishes-more":n.count==0?i="wishes-even":i="wishes-"+n.count,t.push({start:Math.round(n.start*1e3),end:Math.round(n.end*1e3),group:r.wrapper("c")+u,content:this.tooltip({start:n.start,end:n.end,wish:n.count})+r.secret(angular.toJson({type:"wish",wish:n.count,group:u,groupId:e.aggs[0].id})),className:i,editable:!1}),t=r.addLoading(e,t,[r.wrapper("c")+u])}.bind(this)),t},members:function(t,n,r,i){var s=this,o=this.get.members(),u=[];return _.each(t.members,function(e){e.lastName!=undefined&&e.role!=4&&e.role!=0&&u.push(e)}),t.members=u,t.members.sort(function(e,t){var n=e.lastName.toLowerCase(),r=t.lastName.toLowerCase();return n<r?-1:n>r?1:0}),_.each(t.members,function(u){var a=e.StandBy.resources.uuid==u.id?"profile":"timeline",f=i<=1?s.wrapper("d-"+u.lastName[0].toLowerCase())+'<a href="#/profile/'+u.id+"#"+a+'">'+o[u.id]+"</a>":s.wrapper("d-"+u.lastName[0].toLowerCase())+o[u.id];_.each(u.data,function(e){_.each(r.legenda,function(t,i){if(e.text==i&&t){var a={start:e.start,end:e.end,member:o[u.id],state:r.states[e.text].label};n.push({start:Math.round(e.start*1e3),end:Math.round(e.end*1e3),group:f,content:this.tooltip(a)+s.secret(angular.toJson({type:"member",id:e.id,mid:u.id,recursive:e.recursive,state:e.text})),className:r.states[e.text].className,editable:!1})}}.bind(this))}.bind(this)),n.push({start:0,end:0,group:f,content:null,className:null,editable:!1}),n=s.addLoading(t,n,[f]),_.each(u.stats,function(e){var t=e.state.split(".");t.reverse(),e.state=e.state.match(/bar-(.*)/)?e.state:"bar-"+t[0]})}.bind(this)),n},pies:function(t,n){var r=this;_.each(r.filtered(t,n),function(t){var n;n=e.StandBy.config.timeline.config.divisions.length>0?t.division.id:"",$.browser.msie&&$.browser.version=="8.0"?$("#groupPie-"+n).html(""):document.getElementById("groupPie-"+n).innerHTML="";var r=[],i={more:"#6cad6c",even:"#e09131",less:"#d34545"},s=[],o=[];_.each(t.ratios,function(e,t){e!=0&&r.push({ratio:e,color:i[t]})}),r=r.sort(function(e,t){return t.ratio-e.ratio}),_.each(r,function(e){s.push(e.color),o.push(e.ratio)});var u=Raphael("groupPie-"+n),a=u.piechart(120,120,100,o,{colors:s})})},filtered:function(e,t){var n=[];return t.division=="all"?n=e.aggs:_.each(e.aggs,function(e){t.division==e.division.id&&n.push(e)}),n},process:function(t,n,r,i,s){var o=this,u=[];return t.user&&(u=o.user(t,u,n)),t.aggs&&(n.bar?u=o.bars(t,u,n,i,s):u=o.aggs(t,u,n,i,s)),n.wishes&&t.aggs&&(u=o.wishes(t,u,i)),t.members&&(u=o.members(t,u,n,i)),t.aggs&&setTimeout(function(){o.pies(t,s)},e.StandBy.config.timers.TICKER),u}}}])});
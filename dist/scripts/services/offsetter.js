define(["services/services","config"],function(e,t){e.factory("Offsetter",["$rootScope",function(e){var t={factory:function(e){var t=604800,n=86400,r=3600,i=60,s=Math.abs(Number(Date.today().getUTCOffset()))*1/100*r,o=[];angular.forEach(e,function(e,t){var u=0,a=0,f=0,l;e+=s,a=e%n,u=e-a,f=e%r;var c={days:Math.floor(u/n),hours:Math.floor(a/r),minutes:Math.floor(f/i)};l={value:e,exact:e%n,mon:!1,tue:!1,wed:!1,thu:!1,fri:!1,sat:!1,sun:!1,hour:c.hours,minute:c.minutes},c.hours<10&&(c.hours="0"+c.hours),c.minutes<10&&(c.minutes="0"+c.minutes),l.time=c.hours+":"+c.minutes;switch(c.days){case 1:l.mon=!0;break;case 2:l.tue=!0;break;case 3:l.wed=!0;break;case 4:l.thu=!0;break;case 5:l.fri=!0;break;case 6:l.sat=!0;break;case 7:l.sun=!0}o.push(l)});var u={};return angular.forEach(o,function(e,t){u[e.exact]=u[e.exact]||{},u[e.exact].hour=e.hour,u[e.exact].minute=e.minute,u[e.exact].time=e.time,u[e.exact].exact=e.exact,u[e.exact].mon=u[e.exact].mon?u[e.exact].mon:e.mon,u[e.exact].tue=u[e.exact].tue?u[e.exact].tue:e.tue,u[e.exact].wed=u[e.exact].wed?u[e.exact].wed:e.wed,u[e.exact].thu=u[e.exact].thu?u[e.exact].thu:e.thu,u[e.exact].fri=u[e.exact].fri?u[e.exact].fri:e.fri,u[e.exact].sat=u[e.exact].sat?u[e.exact].sat:e.sat,u[e.exact].sun=u[e.exact].sun?u[e.exact].sun:e.sun}),u},arrayed:function(e){var t=86400,n=3600,r=60,i=[];return angular.forEach(e,function(e,s){var o=Math.abs(Number(Date.today().getUTCOffset()))*-1/100,u=(Number(e.hour)+o)*n,a=Number(e.minute)*r,f=u+a;e.mon&&i.push(f+t),e.tue&&i.push(f+t*2),e.wed&&i.push(f+t*3),e.thu&&i.push(f+t*4),e.fri&&i.push(f+t*5),e.sat&&i.push(f+t*6),e.sun&&i.push(f+t*7)}),i}};return{factory:t.factory,arrayed:t.arrayed}}])});
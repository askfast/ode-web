define(["controllers/controllers"],function(e){e.controller("logs",["$scope","$rootScope","$filter","$timeout","data","Logs",function(e,t,n,r,i,s){t.fixStyles(),e.data=i,e.orderBy=function(t){e.ordered=t,e.reversed=!e.reversed},e.ordered="started.stamp",e.reversed=!0,e.daterange=n("date")(i.periods.start,"dd-MM-yyyy")+" / "+n("date")(i.periods.end,"dd-MM-yyyy"),t.$on("getLogRange",function(){r(function(){t.statusBar.display("Logs aan het laden..")});var n=arguments[1];s.fetch(n).then(function(n){e.data=n,t.statusBar.off()})})}])});
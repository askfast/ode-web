describe("uiCalendar",function(){var e,t;beforeEach(module("ui")),beforeEach(inject(function(n,r){e=n.$new(),t=r;var i=new Date,s=i.getDate(),o=i.getMonth(),u=i.getFullYear();e.events=[{title:"All Day Event",start:new Date(u,o,1),url:"http://www.angularjs.org"},{title:"Long Event",start:new Date(u,o,s-5),end:new Date(u,o,s-2)},{id:999,title:"Repeating Event",start:new Date(u,o,s-3,16,0),allDay:!1},{id:999,title:"Repeating Event",start:new Date(u,o,s+4,16,0),allDay:!0}],e.events2=[{title:"All Day Event 2",start:new Date(u,o,1),url:"http://www.atlantacarlocksmith.com"},{title:"Long Event 2",start:new Date(u,o,s-5),end:new Date(u,o,s-2)},{id:998,title:"Repeating Event 2",start:new Date(u,o,s-3,16,0),allDay:!1},{id:998,title:"Repeating Event 2",start:new Date(u,o,s+4,16,0),allDay:!0}],e.events3=[{title:"All Day Event 3",start:new Date(u,o,1),url:"http://www.atlantacarlocksmith.com"},{title:"Long Event 3",start:new Date(u,o,s-5),end:new Date(u,o,s-2)},{id:998,title:"Repeating Event 3",start:new Date(u,o,s-3,16,0),allDay:!1},{id:998,title:"Repeating Event 3",start:new Date(u,o,s+4,16,0),allDay:!0}],e.events4=[{title:"All Day Event 3",start:new Date(u,o,1),url:"http://www.yoyoyo.com"}],e.equalsTracker=0,e.eventSources=[e.events,e.events2],e.addSource=function(t){e.eventSources.push(t)},e.addChild=function(t){t.push({title:"Click for Google "+e.events.length,start:new Date(u,o,28),end:new Date(u,o,29),url:"http://google.com/"})},e.remove=function(e,t){e.splice(t,1)},e.uiConfig={calendar:{height:200,weekends:!1,defaultView:"month"}}})),afterEach(function(){angular.module("ui.config").value("ui.config",{})}),describe("compiling this directive and checking for events inside the calendar",function(){it("should excpect to load 4 events to scope",function(){spyOn($.fn,"fullCalendar"),t('<div ui-calendar="uiConfig.calendar" ng-model="eventSources"></div>')(e),expect($.fn.fullCalendar.mostRecentCall.args[0].eventSources[0].length).toBe(4)}),it("should excpect to be All Day Event",function(){spyOn($.fn,"fullCalendar"),t('<div ui-calendar="uiConfig.calendar" ng-model="eventSources"></div>')(e),expect($.fn.fullCalendar.mostRecentCall.args[0].eventSources[0][0].title).toBe("All Day Event")}),it("should expect the url to = http://www.angularjs.org",function(){spyOn($.fn,"fullCalendar"),t('<div ui-calendar="uiConfig.calendar" ng-model="eventSources"></div>')(e),expect($.fn.fullCalendar.mostRecentCall.args[0].eventSources[0][0].url).toBe("http://www.angularjs.org"),expect($.fn.fullCalendar.mostRecentCall.args[0].eventSources[1][0].url).toBe("http://www.atlantacarlocksmith.com")}),it("should expect the fourth Events all Day field to equal true",function(){spyOn($.fn,"fullCalendar"),t('<div ui-calendar="uiConfig.calendar" ng-model="eventSources"></div>')(e),expect($.fn.fullCalendar.mostRecentCall.args[0].eventSources[0][3].allDay).toNotBe(!1)}),it("should expect the calendar attribute height to be 200",function(){spyOn($.fn,"fullCalendar"),t('<div ui-calendar="uiConfig.calendar" ng-model="eventSources"></div>')(e),expect($.fn.fullCalendar.mostRecentCall.args[0].height).toEqual(200)}),it("should expect the calendar attribute weekends to be false",function(){spyOn($.fn,"fullCalendar"),t('<div ui-calendar="uiConfig.calendar" ng-model="eventSources"></div>')(e),expect($.fn.fullCalendar.mostRecentCall.args[0].weekends).toEqual(!1)}),it("should expect the scopes events to increase by 2",function(){spyOn($.fn,"fullCalendar"),t('<div ui-calendar="uiConfig.calendar" ng-model="eventSources"></div>')(e),expect($.fn.fullCalendar.mostRecentCall.args[0].eventSources[0].length).toEqual(4),e.addChild(e.events),e.addChild(e.events),expect($.fn.fullCalendar.mostRecentCall.args[0].eventSources[0].length).toEqual(6)}),it("should expect the calendar to update itself with new events",function(){spyOn($.fn,"fullCalendar"),t('<div ui-calendar="uiConfig.calendar" ng-model="eventSources"></div>')(e);var n=$.fn.fullCalendar.mostRecentCall.args[0].eventSources[0].length;expect(n).toEqual(4),e.remove(e.events,0),n=$.fn.fullCalendar.mostRecentCall.args[0].eventSources[0].length,expect(n).toEqual(3)}),it("should overwrite default header options",function(){spyOn($.fn,"fullCalendar"),e.uiConfig2={calendar:{header:{center:"title"}}},t('<div ui-calendar="uiConfig2.calendar" ng-model="eventSources"></div>')(e),expect($.fn.fullCalendar.mostRecentCall.args[0].hasOwnProperty("header")).toEqual(!0);var n=$.fn.fullCalendar.mostRecentCall.args[0].header;expect(n).toEqual({center:"title"})}),it("should update the calendar if any eventSource array contains a delta",function(){spyOn($.fn,"fullCalendar"),t('<div ui-calendar="uiConfig.calendar" ng-model="eventSources"></div>')(e);var n=$.fn.fullCalendar.mostRecentCall.args[0].eventSources[0].length,r=$.fn.fullCalendar.mostRecentCall.args[0].eventSources[1].length;expect(n).toEqual(4),expect(r).toEqual(4),e.remove(e.events2,0),n=$.fn.fullCalendar.mostRecentCall.args[0].eventSources[0].length,r=$.fn.fullCalendar.mostRecentCall.args[0].eventSources[1].length,expect(n).toEqual(4),expect(r).toEqual(3),e.remove(e.events,0),n=$.fn.fullCalendar.mostRecentCall.args[0].eventSources[0].length,expect(n).toEqual(3)}),it("should update the calendar if an eventSource is Added",function(){spyOn($.fn,"fullCalendar"),t('<div ui-calendar="uiConfig.calendar" ng-model="eventSources"></div>')(e);var n=$.fn.fullCalendar.mostRecentCall.args[0].eventSources.length;expect(n).toEqual(2),e.addSource(e.events4),n=$.fn.fullCalendar.mostRecentCall.args[0].eventSources.length,expect(n).toEqual(3),e.addChild(e.events4);var r=$.fn.fullCalendar.mostRecentCall.args[0].eventSources[2].length;expect(r).toEqual(2)}),it("should update the calendar if an eventSource has same length as prior eventSource",function(){spyOn($.fn,"fullCalendar"),t('<div ui-calendar="uiConfig.calendar" ng-model="eventSources" equals-tracker="equalsTracker"></div>')(e);var n=$.fn.fullCalendar.mostRecentCall.args[0].eventSources,r=$.fn.fullCalendar.mostRecentCall.args[0].eventSources[0].length;expect(r).toEqual(4),expect(n.length).toEqual(2),expect(n[1][0].title).toEqual("All Day Event 2"),e.eventSources.splice(1,1,e.events3),e.equalsTracker++,n=$.fn.fullCalendar.mostRecentCall.args[0].eventSources,expect(n.length).toEqual(2),expect(n[1][0].title).toEqual("All Day Event 3"),e.remove(e.events,0),r=$.fn.fullCalendar.mostRecentCall.args[0].eventSources[0].length,expect(r).toEqual(3)})})});
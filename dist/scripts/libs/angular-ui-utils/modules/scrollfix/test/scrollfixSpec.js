describe("uiScrollfix",function(){var e,t,n;beforeEach(module("ui.scrollfix")),beforeEach(inject(function(r,i,s){e=r.$new(),t=i,n=s})),describe("compiling this directive",function(){it('should bind and unbind to window "scroll" event in the absence of a uiScrollfixTarget',function(){spyOn($.fn,"on").andCallThrough(),t('<div ui-scrollfix="100"></div>')(e),expect($.fn.on).toHaveBeenCalled(),expect($.fn.on.mostRecentCall.args[0]).toBe("scroll"),expect($._data(n,"events")).toBeDefined(),expect($._data(n,"events").scroll.length).toBe(1),spyOn($.fn,"off").andCallThrough(),e.$destroy(),expect($.fn.off).toHaveBeenCalled(),expect($.fn.off.mostRecentCall.args[0]).toBe("scroll"),expect($._data(n,"events")).toBeUndefined()}),it('should bind and unbind to a parent uiScrollfixTarget element "scroll" event',function(){var r=t('<div ui-scrollfix-target><div ui-scrollfix="100"></div></div>')(e);expect($._data(n,"events")).toBeUndefined(),expect($._data(r[0],"events")).toBeDefined(),expect($._data(r[0],"events").scroll.length).toBe(1),e.$destroy(),expect($._data(r[0],"events")).toBeUndefined()})}),describe("scrolling the window",function(){it("should add the ui-scrollfix class if the offset is greater than specified",function(){var r=t('<div ui-scrollfix="-100"></div>')(e);angular.element(n).trigger("scroll"),expect(r.hasClass("ui-scrollfix")).toBe(!0)}),it("should remove the ui-scrollfix class if the offset is less than specified (using absolute coord)",function(){var r=t('<div ui-scrollfix="100" class="ui-scrollfix"></div>')(e);angular.element(n).trigger("scroll"),expect(r.hasClass("ui-scrollfix")).toBe(!1)}),it("should remove the ui-scrollfix class if the offset is less than specified (using relative coord)",function(){var r=t('<div ui-scrollfix="+100" class="ui-scrollfix"></div>')(e);angular.element(n).trigger("scroll"),expect(r.hasClass("ui-scrollfix")).toBe(!1)})})});
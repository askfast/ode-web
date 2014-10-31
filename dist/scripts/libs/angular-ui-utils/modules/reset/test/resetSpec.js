describe("uiReset",function(){var e,t;beforeEach(module("ui.reset")),beforeEach(inject(function(n,r){e=n.$new(),t=r})),describe("compiling this directive",function(){it("should throw an error if we have no model defined",function(){function n(){t('<input type="text" ui-reset/>')(e)}expect(n).toThrow()}),it("should proper DOM structure",function(){e.foo="bar",e.$digest();var n=t('<input type="text" ui-reset ng-model="foo"/>')(e);expect(n.parent().is("span")).toBe(!0),expect(n.next().is("a")).toBe(!0)})}),describe("clicking on the created anchor tag",function(){it("should prevent the default action",function(){var n=t('<input type="text" ui-reset ng-model="foo"/>')(e);spyOn($.Event.prototype,"preventDefault"),n.next().triggerHandler("click"),expect($.Event.prototype.preventDefault).toHaveBeenCalled()}),it("should set the model value to null and clear control when no options given",function(){e.foo="bar";var n=t('<input type="text" ui-reset ng-model="foo"/>')(e);e.$digest(),expect(n.val()).toBe("bar"),n.next().triggerHandler("click"),expect(e.foo).toBe(null),expect(n.val()).toBe("")}),it("should set the model value to the options scope variable when a string is passed in options",function(){e.foo="bar",e.resetTo="i was reset";var n=t('<input type="text" ui-reset="resetTo" ng-model="foo"/>')(e);e.$digest(),expect(n.val()).toBe("bar"),n.next().triggerHandler("click"),expect(e.foo).toBe("i was reset"),expect(n.val()).toBe("i was reset")})})});
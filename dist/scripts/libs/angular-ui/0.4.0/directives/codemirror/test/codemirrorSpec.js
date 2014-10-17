describe("uiCodemirror",function(){var e,t,n,r=angular.module("ui.config");beforeEach(module("ui.directives")),beforeEach(function(){r.value("ui.config",{codemirror:{bar:"baz"}})}),beforeEach(inject(function(r,i,s){e=r.$new(),t=i,n=s})),afterEach(function(){r.value("ui.config",{})}),describe("compiling this directive",function(){it("should throw an error if used against a non-textarea",function(){function n(){t('<div ui-codemirror ng-model="foo"></div>')(e)}expect(n).toThrow()}),it("should not throw an error when used against a textarea",function(){function n(){t('<textarea ui-codemirror ng-model="foo"></textarea>')(e)}expect(n).not.toThrow()}),it("should throw an error when no ngModel attribute defined",function(){function n(){t("<textarea ui-codemirror></textarea>")(e)}expect(n).toThrow()}),it("should watch the uiCodemirror attribute",function(){spyOn(e,"$watch"),t('<textarea ui-codemirror ng-model="foo"></textarea>')(e),n.flush(),expect(e.$watch).toHaveBeenCalled()})}),describe("while spying on the CodeMirror instance",function(){var r;beforeEach(function(){var e=CodeMirror.fromTextArea;spyOn(CodeMirror,"fromTextArea").andCallFake(function(){return r=e.apply(this,arguments),r})}),describe("verify the directive options",function(){it("should include the passed options",function(){t('<textarea ui-codemirror="{oof: \'baar\'}" ng-model="foo"></textarea>')(e),n.flush(),expect(CodeMirror.fromTextArea.mostRecentCall.args[1].oof).toEqual("baar")}),it("should include the default options",function(){t('<textarea ui-codemirror ng-model="foo"></textarea>')(e),n.flush(),expect(CodeMirror.fromTextArea.mostRecentCall.args[1].bar).toEqual("baz")})}),describe("when uiRefresh is added",function(){it("should trigger the CodeMirror.refresh() method",function(){t('<textarea ui-codemirror ng-model="foo" ui-refresh="bar"></textarea>')(e),n.flush(),spyOn(r,"refresh"),e.$apply("bar = true"),n.flush(),expect(r.refresh).toHaveBeenCalled()})}),describe("when the IDE changes",function(){it("should update the model",function(){t('<textarea ui-codemirror ng-model="foo"></textarea>')(e),e.$apply("foo = 'bar'"),n.flush();var i="baz";r.setValue(i),expect(e.foo).toBe(i)})}),describe("when the model changes",function(){it("should update the IDE",function(){var i=t('<textarea ui-codemirror ng-model="foo"></textarea>')(e);e.foo="bar",e.$apply(),n.flush(),expect(r.getValue()).toBe(e.foo)})}),describe("when the model is undefined/null",function(){it("should update the IDE with an empty string",function(){var i=t('<textarea ui-codemirror ng-model="foo"></textarea>')(e);e.$apply(),n.flush(),expect(e.foo).toBe(undefined),expect(r.getValue()).toBe(""),e.$apply('foo = "bar"'),expect(e.foo).toBe("bar"),expect(r.getValue()).toBe("bar"),e.$apply("foo = null"),expect(e.foo).toBe(null),expect(r.getValue()).toBe("")})})}),describe("when the model is an object or an array",function(){it("should throw an error",function(){function r(){t('<textarea ui-codemirror ng-model="foo"></textarea>')(e),n.flush(),e.foo={},e.$apply()}function i(){t('<textarea ui-codemirror ng-model="foo"></textarea>')(e),n.flush(),e.foo=[],e.$apply()}expect(r).toThrow(),expect(i).toThrow()})})});
describe("\njqLite: testing against jQuery\n",function(){var e=angular.element("<div/>"),t;beforeEach(module("ui.scroll.jqlite")),beforeEach(function(){angular.element(document).find("body").append(e=angular.element("<div></div>")),inject(function(e){t=function(){},e.registerFor(t)})}),afterEach(function(){e.remove()}),describe("height() getter for window\n",function(){it("should work for window element",function(){var e=angular.element(window);expect(t.prototype.height.call(e)).toBe(e.height())})}),describe("getters height() and outerHeight()\n",function(){function n(t){var n=angular.element(t);return e.append(n),n}angular.forEach(["<div>some text</div>",'<div style="height:30em">some text (height in em)</div>','<div style="height:30px">some text height in px</div>','<div style="border-width: 3px; border-style: solid; border-color: red">some text w border</div>','<div style="border-width: 3em; border-style: solid; border-color: red">some text w border</div>','<div style="padding: 3px">some text w padding</div>','<div style="padding: 3em">some text w padding</div>','<div style="margin: 3px">some text w margin</div>','<div style="margin: 3em">some text w margin</div>'],function(e){it("should be the same as jQuery height() for "+e,function(){(function(e){expect(t.prototype.height.call(e)).toBe(e.height())})(n(e))}),it("should be the same as jQuery outerHeight() for "+e,function(){(function(e){expect(t.prototype.outerHeight.call(e)).toBe(e.outerHeight())})(n(e))}),it("should be the same as jQuery outerHeight(true) for "+e,function(){(function(e){expect(t.prototype.outerHeight.call(e,!0)).toBe(e.outerHeight(!0))})(n(e))})})}),describe("height(value) setter\n",function(){function n(t){var n=angular.element(t);return e.append(n),n}angular.forEach(["<div>some text</div>",'<div style="height:30em">some text (height in em)</div>','<div style="height:30px">some text height in px</div>','<div style="border-width: 3px; border-style: solid; border-color: red">some text w border</div>','<div style="border-width: 3em; border-style: solid; border-color: red">some text w border</div>','<div style="padding: 3px">some text w padding</div>','<div style="padding: 3em">some text w padding</div>','<div style="margin: 3px">some text w margin</div>','<div style="margin: 3em">some text w margin</div>','<div style="margin: 3pt">some text w margin</div>','<div style="line-height: 1.1em">some text w line height</div>'],function(e){it("height(value) for "+e,function(){(function(e){expect(t.prototype.height.call(e)).toBe(e.height());var n=e.height();t.prototype.height.call(e,n*2),expect(t.prototype.height.call(e)).toBe(n*2)})(n(e))})})}),describe("offset() getter\n",function(){function n(t){var n=angular.element(t);return e.append(n),n}angular.forEach(["<div><div>some text</div></div>",'<div style="height:30em"><div>some text (height in em)</div></div>','<div style="margin: 3em"><p>some text w margin</p></div>'],function(e){it("should be the same as jQuery offset() for "+e,function(){(function(e){var n=$(e.contents()[0]);expect(t.prototype.offset.call(n)).toEqual(e.offset())})(n(e))})})}),describe("scrollTop()\n",function(){function n(t){var n=angular.element(t);return e.append(n),n}it("should be the same as jQuery scrollTop() for window",function(){n('<div style="height:10000px; width:10000px"></div>');var e=$(window);expect(t.prototype.scrollTop.call(e)).toBe(e.scrollTop()),e.scrollTop(100),expect(t.prototype.scrollTop.call(e)).toBe(e.scrollTop()),t.prototype.scrollTop.call(e,200),expect(t.prototype.scrollTop.call(e)).toBe(e.scrollTop())}),it("should be the same as jQuery scrollTop() for window",function(){var e=n('<div style="height:100px; width:100px; overflow: auto"><div style="height:10000px; width:10000px"></div></div>');expect(t.prototype.scrollTop.call(e)).toBe(e.scrollTop()),e.scrollTop(100),expect(t.prototype.scrollTop.call(e)).toBe(e.scrollTop()),t.prototype.scrollTop.call(e,200),expect(t.prototype.scrollTop.call(e)).toBe(e.scrollTop())})})});
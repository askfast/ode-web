describe("highlight",function(){var e,t="Prefix Highlight Suffix";beforeEach(module("ui.highlight")),beforeEach(inject(function(t){e=t("highlight")})),describe("case insensitive",function(){it("should highlight a matching phrase",function(){expect(e(t,"highlight")).toEqual('Prefix <span class="ui-match">Highlight</span> Suffix')}),it("should highlight nothing if no match found",function(){expect(e(t,"no match")).toEqual(t)}),it("should highlight nothing for the undefined filter",function(){expect(e(t,undefined)).toEqual(t)}),it("should work correctly if text is null",function(){expect(e(null,"highlight")).toEqual(null)}),it("should work correctly for number filters",function(){expect(e("3210123",0)).toEqual('321<span class="ui-match">0</span>123')}),it("should work correctly for number text",function(){expect(e(3210123,"0")).toEqual('321<span class="ui-match">0</span>123')})}),describe("case sensitive",function(){it("should highlight a matching phrase",function(){expect(e(t,"Highlight",!0)).toEqual('Prefix <span class="ui-match">Highlight</span> Suffix')}),it("should highlight nothing if no match found",function(){expect(e(t,"no match",!0)).toEqual(t)}),it("should highlight nothing for the undefined filter",function(){expect(e(t,undefined,!0)).toEqual(t)}),it("should work correctly if text is null",function(){expect(e(null,"Highlight")).toEqual(null)}),it("should work correctly for number filters",function(){expect(e("3210123",0,!0)).toEqual('321<span class="ui-match">0</span>123')}),it("should work correctly for number text",function(){expect(e(3210123,"0",!0)).toEqual('321<span class="ui-match">0</span>123')}),it("should not highlight a phrase with different letter-casing",function(){expect(e(t,"highlight",!0)).toEqual(t)})}),it("should highlight nothing if empty filter string passed - issue #114",function(){expect(e(t,"")).toEqual(t)})});
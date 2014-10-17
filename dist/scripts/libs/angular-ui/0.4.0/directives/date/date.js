angular.module("ui.directives").directive("uiDate",["ui.config",function(e){var t;return t={},angular.isObject(e.date)&&angular.extend(t,e.date),{require:"?ngModel",link:function(t,n,r,i){var s=function(){return angular.extend({},e.date,t.$eval(r.uiDate))},o=function(){var e=s();if(i){var r=function(){t.$apply(function(){var e=n.datepicker("getDate");n.datepicker("setDate",n.val()),i.$setViewValue(e),n.blur()})};if(e.onSelect){var o=e.onSelect;e.onSelect=function(e,n){r(),t.$apply(function(){o(e,n)})}}else e.onSelect=r;n.bind("change",r),i.$render=function(){var e=i.$viewValue;if(angular.isDefined(e)&&e!==null&&!angular.isDate(e))throw new Error("ng-Model value must be a Date object - currently it is a "+typeof e+" - use ui-date-format to convert it from a string");n.datepicker("setDate",e)}}n.datepicker("destroy"),n.datepicker(e),i&&i.$render()};t.$watch(s,o,!0)}}}]).directive("uiDateFormat",["ui.config",function(e){var t={require:"ngModel",link:function(t,n,r,i){var s=r.uiDateFormat||e.dateFormat;s?(i.$formatters.push(function(e){if(angular.isString(e))return $.datepicker.parseDate(s,e)}),i.$parsers.push(function(e){if(e)return $.datepicker.formatDate(s,e)})):(i.$formatters.push(function(e){if(angular.isString(e))return new Date(e)}),i.$parsers.push(function(e){if(e)return e.toISOString()}))}};return t}]);
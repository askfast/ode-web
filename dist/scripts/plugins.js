/*!
* screenfull
* v1.2.0 - 2014-04-29
* (c) Sindre Sorhus; MIT License
*/

(function(e,t){var n,r;e.uaMatch=function(e){e=e.toLowerCase();var t=/(chrome)[ \/]([\w.]+)/.exec(e)||/(webkit)[ \/]([\w.]+)/.exec(e)||/(opera)(?:.*version|)[ \/]([\w.]+)/.exec(e)||/(msie) ([\w.]+)/.exec(e)||e.indexOf("compatible")<0&&/(mozilla)(?:.*? rv:([\w.]+)|)/.exec(e)||[],n=/(ipad)/.exec(e)||/(iphone)/.exec(e)||/(android)/.exec(e)||[];return{browser:t[1]||"",version:t[2]||"0",platform:n[0]||""}},n=e.uaMatch(t.navigator.userAgent),r={},n.browser&&(r[n.browser]=!0,r.version=n.version),n.platform&&(r[n.platform]=!0),r.chrome?r.webkit=!0:r.webkit&&(r.safari=!0),/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(t.navigator.userAgent)?(r.mobile=!0,r.android=/Android/i.test(t.navigator.userAgent)?!0:!1,r.ios=/iPhone|iPad|iPod/i.test(t.navigator.userAgent)?!0:!1):r.mobile=!1,e.browser=r})(jQuery,window),function(e,t){var n={},r=t.navigator.appVersion;r.indexOf("Win")!=-1&&(n.windows=!0),r.indexOf("Mac")!=-1&&(n.mac=!0),r.indexOf("X11")!=-1&&(n.unix=!0),r.indexOf("Linux")!=-1&&(n.linux=!0),e.os=n}(jQuery,window),function(){var e=typeof module!="undefined"&&module.exports,t=typeof Element!="undefined"&&"ALLOW_KEYBOARD_INPUT"in Element,n=function(){var e,t,n=[["requestFullscreen","exitFullscreen","fullscreenElement","fullscreenEnabled","fullscreenchange","fullscreenerror"],["webkitRequestFullscreen","webkitExitFullscreen","webkitFullscreenElement","webkitFullscreenEnabled","webkitfullscreenchange","webkitfullscreenerror"],["webkitRequestFullScreen","webkitCancelFullScreen","webkitCurrentFullScreenElement","webkitCancelFullScreen","webkitfullscreenchange","webkitfullscreenerror"],["mozRequestFullScreen","mozCancelFullScreen","mozFullScreenElement","mozFullScreenEnabled","mozfullscreenchange","mozfullscreenerror"],["msRequestFullscreen","msExitFullscreen","msFullscreenElement","msFullscreenEnabled","MSFullscreenChange","MSFullscreenError"]],r=0,i=n.length,s={};for(;r<i;r++){e=n[r];if(e&&e[1]in document){for(r=0,t=e.length;r<t;r++)s[n[0][r]]=e[r];return s}}return!1}(),r={request:function(e){var r=n.requestFullscreen;e=e||document.documentElement,/5\.1[\.\d]* Safari/.test(navigator.userAgent)?e[r]():e[r](t&&Element.ALLOW_KEYBOARD_INPUT)},exit:function(){document[n.exitFullscreen]()},toggle:function(e){this.isFullscreen?this.exit():this.request(e)},onchange:function(){},onerror:function(){},raw:n};if(!n){e?module.exports=!1:window.screenfull=!1;return}Object.defineProperties(r,{isFullscreen:{get:function(){return!!document[n.fullscreenElement]}},element:{enumerable:!0,get:function(){return document[n.fullscreenElement]}},enabled:{enumerable:!0,get:function(){return!!document[n.fullscreenEnabled]}}}),document.addEventListener(n.fullscreenchange,function(e){r.onchange.call(r,e)}),document.addEventListener(n.fullscreenerror,function(e){r.onerror.call(r,e)}),e?module.exports=r:window.screenfull=r}(),function(){var e,t=function(){},n=["assert","clear","count","debug","dir","dirxml","error","exception","group","groupCollapsed","groupEnd","info","log","markTimeline","profile","profileEnd","table","time","timeEnd","timeStamp","trace","warn"],r=n.length,i=window.console=window.console||{};while(r--)e=n[r],i[e]||(i[e]=t)}();if($.browser.msie){var ver=$.browser.version||$.browser.version[0];if(ver=="6.0"||ver=="7.0")window.location="browsers.html"};
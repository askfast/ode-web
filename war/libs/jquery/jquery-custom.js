/**
 * Avoid `console` errors in browsers that lack a console
 */
(function() {
    var method;
    var noop = function () {};
    var methods = [
        'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
        'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
        'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
        'timeStamp', 'trace', 'warn'
    ];
    var length = methods.length;
    var console = (window.console = window.console || {});

    while (length--) {
        method = methods[length];

        // Only stub undefined methods.
        if (!console[method]) {
            console[method] = noop;
        }
    }
}());


/**
 * TODO
 * Have one single place for jQuery stuff!
 * 
 * jQuery $.browser plugin
 * Depreciated since 1.9
 */
(function( jQuery, window, undefined ) {
"use strict";
 
var matched, browser;
 
jQuery.uaMatch = function( ua ) {
  ua = ua.toLowerCase();
 
  var match = /(chrome)[ \/]([\w.]+)/.exec( ua ) ||
    /(webkit)[ \/]([\w.]+)/.exec( ua ) ||
    /(opera)(?:.*version|)[ \/]([\w.]+)/.exec( ua ) ||
    /(msie) ([\w.]+)/.exec( ua ) ||
    ua.indexOf("compatible") < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec( ua ) ||
    [];

  var platform_match = /(ipad)/.exec( ua ) ||
    /(iphone)/.exec( ua ) ||
    /(android)/.exec( ua ) ||
    [];
 
  return {
    browser: match[ 1 ] || "",
    version: match[ 2 ] || "0",
    platform: platform_match[0] || ""
  };
};
 
matched = jQuery.uaMatch( window.navigator.userAgent );
browser = {};
 
if ( matched.browser ) {
  browser[ matched.browser ] = true;
  browser.version = matched.version;
}

if ( matched.platform) {
  browser[ matched.platform ] = true
}
 
// Chrome is Webkit, but Webkit is also Safari.
if ( browser.chrome ) {
  browser.webkit = true;
} else if ( browser.webkit ) {
  browser.safari = true;
}
 
jQuery.browser = browser;
 
})( jQuery, window );



/**
 * Detect IE version for blocking IE6 and IE7
 */
if ($.browser.msie)
{
  var ver = $.browser.version || $.browser.version[0];
  if (ver == '6.0' || ver == '7.0')
  {
    $('#browser-safe').hide();
    $('#browser-not-compatible').show();
    $('body').css({
      'background': 'none'
    });
  }
}
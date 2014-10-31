(function (jQuery, window) {
  'use strict';

  var matched, browser;

  jQuery.uaMatch = function (ua) {
    ua = ua.toLowerCase();

    var match = /(chrome)[ \/]([\w.]+)/.exec(ua) ||
      /(webkit)[ \/]([\w.]+)/.exec(ua) ||
      /(opera)(?:.*version|)[ \/]([\w.]+)/.exec(ua) ||
      /(msie) ([\w.]+)/.exec(ua) || ua.indexOf('compatible') < 0 && /(mozilla)(?:.*? rv:([\w.]+)|)/.exec(ua) || [];

    var platform_match = /(ipad)/.exec(ua) ||
      /(iphone)/.exec(ua) ||
      /(android)/.exec(ua) || [];

    return {
      browser: match[1] || '',
      version: match[2] || '0',
      platform: platform_match[0] || ''
    };
  };

  matched = jQuery.uaMatch(window.navigator.userAgent);
  browser = {};

  if (matched.browser) {
    browser[matched.browser] = true;
    browser.version = matched.version;
  }

  if (matched.platform) {
    browser[matched.platform] = true;
  }

  if (browser.chrome) {
    browser.webkit = true;
  }
  else if (browser.webkit) {
    browser.safari = true;
  }

  if (/Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(window.navigator.userAgent)) {
    browser.mobile = true;

    browser.android = (/Android/i.test(window.navigator.userAgent)) ? true : false;

    browser.ios = (/iPhone|iPad|iPod/i.test(window.navigator.userAgent)) ? true : false;
  }
  else {
    browser.mobile = false;
  }

  jQuery.browser = browser;

})(jQuery, window);

(function (jQuery, window) {
  'use strict';

  var os = {},
    navOS = window.navigator.appVersion;

  if (navOS.indexOf('Win') != -1)   os.windows = true;
  if (navOS.indexOf('Mac') != -1)   os.mac = true;
  if (navOS.indexOf('X11') != -1)   os.unix = true;
  if (navOS.indexOf('Linux') != -1) os.linux = true;

  jQuery.os = os;

})(jQuery, window);

/*!
* screenfull
* v1.2.0 - 2014-04-29
* (c) Sindre Sorhus; MIT License
*/
(function () {
  'use strict';

  var isCommonjs = typeof module !== 'undefined' && module.exports;
  var keyboardAllowed = typeof Element !== 'undefined' && 'ALLOW_KEYBOARD_INPUT' in Element;

  var fn = (function () {
    var val;
    var valLength;

    var fnMap = [
      [
        'requestFullscreen',
        'exitFullscreen',
        'fullscreenElement',
        'fullscreenEnabled',
        'fullscreenchange',
        'fullscreenerror'
      ],
      // new WebKit
      [
        'webkitRequestFullscreen',
        'webkitExitFullscreen',
        'webkitFullscreenElement',
        'webkitFullscreenEnabled',
        'webkitfullscreenchange',
        'webkitfullscreenerror'

      ],
      // old WebKit (Safari 5.1)
      [
        'webkitRequestFullScreen',
        'webkitCancelFullScreen',
        'webkitCurrentFullScreenElement',
        'webkitCancelFullScreen',
        'webkitfullscreenchange',
        'webkitfullscreenerror'

      ],
      [
        'mozRequestFullScreen',
        'mozCancelFullScreen',
        'mozFullScreenElement',
        'mozFullScreenEnabled',
        'mozfullscreenchange',
        'mozfullscreenerror'
      ],
      [
        'msRequestFullscreen',
        'msExitFullscreen',
        'msFullscreenElement',
        'msFullscreenEnabled',
        'MSFullscreenChange',
        'MSFullscreenError'
      ]
    ];

    var i = 0;
    var l = fnMap.length;
    var ret = {};

    for (; i < l; i++) {
      val = fnMap[i];
      if (val && val[1] in document) {
        for (i = 0, valLength = val.length; i < valLength; i++) {
          ret[fnMap[0][i]] = val[i];
        }
        return ret;
      }
    }

    return false;
  })();

  var screenfull = {
    request: function (elem) {
      var request = fn.requestFullscreen;

      elem = elem || document.documentElement;

      // Work around Safari 5.1 bug: reports support for
      // keyboard in fullscreen even though it doesn't.
      // Browser sniffing, since the alternative with
      // setTimeout is even worse.
      if (/5\.1[\.\d]* Safari/.test(navigator.userAgent)) {
        elem[request]();
      } else {
        elem[request](keyboardAllowed && Element.ALLOW_KEYBOARD_INPUT);
      }
    },
    exit: function () {
      document[fn.exitFullscreen]();
    },
    toggle: function (elem) {
      if (this.isFullscreen) {
        this.exit();
      } else {
        this.request(elem);
      }
    },
    onchange: function () {},
    onerror: function () {},
    raw: fn
  };

  if (!fn) {
    if (isCommonjs) {
      module.exports = false;
    } else {
      window.screenfull = false;
    }

    return;
  }

  Object.defineProperties(screenfull, {
    isFullscreen: {
      get: function () {
        return !!document[fn.fullscreenElement];
      }
    },
    element: {
      enumerable: true,
      get: function () {
        return document[fn.fullscreenElement];
      }
    },
    enabled: {
      enumerable: true,
      get: function () {
        // Coerce to boolean in case of old WebKit
        return !!document[fn.fullscreenEnabled];
      }
    }
  });

  document.addEventListener(fn.fullscreenchange, function (e) {
    screenfull.onchange.call(screenfull, e);
  });

  document.addEventListener(fn.fullscreenerror, function (e) {
    screenfull.onerror.call(screenfull, e);
  });

  if (isCommonjs) {
    module.exports = screenfull;
  } else {
    window.screenfull = screenfull;
  }
})();

(function () {
  var method,
    noop = function () {
    },
    methods = [
      'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
      'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
      'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
      'timeStamp', 'trace', 'warn'
    ],
    length = methods.length,
    console = (
      window.console = window.console || {});

  while (length--) {
    method = methods[length];

    if (!console[method]) console[method] = noop;
  }
}());

if ($.browser.msie) {
  var ver = $.browser.version || $.browser.version[0];

  if (ver == '6.0' || ver == '7.0') window.location = 'browsers.html';
}
/**
 * Avoid `console` errors in browsers that lack a console
 */
(function()
{
  var method;
  var noop = function() {};
  var methods = [
    'assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error',
    'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log',
    'markTimeline', 'profile', 'profileEnd', 'table', 'time', 'timeEnd',
    'timeStamp', 'trace', 'warn'];
  var length = methods.length;
  var console = (window.console = window.console || {});

  while (length--)
  {
    method = methods[length];

    // Only stub undefined methods.
    if (!console[method])
    {
      console[method] = noop;
    }
  }
}());


/**
 * Detect IE version for blocking IE6 and IE7
 */
if ($.browser.msie)
{
  var ver = $.browser.version || $.browser.version[0];
  if (ver == '6.0' || ver == '7.0')
  {
    /**
     * DEPRECIATED
     * Since we just redirect to an another page
     */
    // $('#browser-safe').hide();
    // $('#browser-not-compatible').show();
    // $('body').css({
    //   'background': 'none'
    // });
    window.location = 'browse-happy.html';
  }
};
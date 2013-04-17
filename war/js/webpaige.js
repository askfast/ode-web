'use strict';


/**
 * Declare app level module which depends on filters, and services
 */
angular.module('WebPaige', 
[
  'ngResource',
  // modals
  'WebPaige.Modals.User',
  'WebPaige.Modals.Dashboard',
  'WebPaige.Modals.Slots',
  'WebPaige.Modals.Messages',
  'WebPaige.Modals.Groups',
  'WebPaige.Modals.Profile',
  'WebPaige.Modals.Settings',
  // controller
  'WebPaige.Controllers.Login',
  'WebPaige.Controllers.Logout',
  'WebPaige.Controllers.Dashboard',
  'WebPaige.Controllers.Planboard',
  'WebPaige.Controllers.Messages',
  'WebPaige.Controllers.Groups',
  'WebPaige.Controllers.Profile',
  'WebPaige.Controllers.Settings',
  'WebPaige.Controllers.Help',
  // directives
  'WebPaige.Directives',
  '$strap.directives', 
  // filters
  'WebPaige.Filters',
  // services
  'WebPaige.Services.Timer',
  'WebPaige.Services.Session',
  'WebPaige.Services.Dater',
  'WebPaige.Services.EventBus',
  'WebPaige.Services.Interceptor',
  'WebPaige.Services.MD5',
  'WebPaige.Services.Storage',
  'WebPaige.Services.Strings',
  'WebPaige.Services.Announcer',
  'WebPaige.Services.Sloter',
  'WebPaige.Services.Stats'
]);



/**
 * Fetch libraries with AMD (if they are not present) and save in localStorage
 * If a library is presnet it wont be fetched from server
 */
basket
  .require(
    { url: 'js/libs/chosen/chosen.jquery.min.js' },
    { url: 'js/libs/chaps/timeline/2.4.0/timeline_modified.min.js' },
    { url: 'js/libs/bootstrap-datepicker/bootstrap-datepicker.min.js' },
    { url: 'js/libs/bootstrap-timepicker/bootstrap-timepicker.min.js' },
    { url: 'js/libs/daterangepicker/1.1.0/daterangepicker.min.js' },
    { url: 'js/libs/sugar/1.3.7/sugar.min.js' },
    { url: 'js/libs/raphael/2.1.0/raphael-min.js' }
  )
  .then(function () 
    {
      basket
        .require(
          { url: 'js/libs/g-raphael/0.5.1/g.raphael-min.js' },
          { url: 'js/libs/g-raphael/0.5.1/g.pie-min.js' }
        )
        .then(function ()
        { 
          // console.warn('basket parsed scripts..');
      });
    }
  );
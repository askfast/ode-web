'use strict';


/**
 * Declare app level module which depends on filters, and services
 */
angular.module('WebPaige', 
[
  '$strap.directives', 
  'ngResource',
  'WebPaige.Controllers',
  'WebPaige.Directives',
  'WebPaige.Filters',
  'WebPaige.Modals',
  'WebPaige.Services'
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
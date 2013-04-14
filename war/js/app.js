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
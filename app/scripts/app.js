'use strict';

// TODO: 'ui.bootstrap.modal', '$strap.directives',
define([
    'angular',
    'controllers/controllers',
    'services/services',
    'filters/filters',
    'directives/directives',
    'angular-resource',
    'angular-route',
    'angular-md5',
    'angular-strap'
    // 'ui-bootstrap',
    // 'ng-vis',
    // 'angular-google-maps',
    // 'angular-dragdrop',
    // 'ui-sortable',
    // 'ui.bootstrap.pagination'
  ],
  function (angular) {
    return angular.module('StandBy', [
      'controllers',
      'services',
      'filters',
      'directives',
      'ngResource',
      'ngRoute',
      'ngMd5',
      'mgcrea.ngStrap',
      // '$strap.directives',
      // 'ui.bootstrap.modal',
      // 'NgVis',
      // 'google-maps',
      // 'ngDragDrop',
      // 'ui.sortable',
      // 'collapse',
      // 'ui.bootstrap.pagination'
    ]);
  });
'use strict';

if (window.location.port == '8080')
{
  document.getElementsByTagName('html')[0].setAttribute('ng-app');
}

require.config (
  {
    paths: {
      angular:  '../vendors/angular/angular.min',
      jquery:   '../vendors/jquery/dist/jquery.min',
      domReady: '../vendors/requirejs-domready/domReady',
      bootstrap:          '../vendors/bootstrap-sass/dist/js/bootstrap.min',
      'angular-resource': '../vendors/angular-resource/angular-resource.min',
      'angular-route':    '../vendors/angular-route/angular-route.min',
      //signet:   '../vendors/signet/signet.min',
      lawnchair: '../vendors/lawnchair/src/Lawnchair',
      dom: '../vendors/lawnchair/src/adapters/dom'
    },
    shim: {
      angular:            { deps: ['jquery'], exports:  'angular' },
      'angular-resource': { deps: ['angular'] },
      'angular-route':    { deps: ['angular'] },
      bootstrap:          { deps: ['jquery'], exports:  'bootstrap' },
      lawnchair:          { exports: 'lawnchair' },
      dom:                { deps: ['lawnchair'], exports: 'dom' }
    }
  }
);

require (
  [
    'angular',
    'domReady',
    'jquery',
    'angular-resource',
    'angular-route',
//    'localization',
    'config',
    'app',
    'routes',
    'run',
//    'modals/askfast',
    'controllers/home',
//    'controllers/register',
//    'controllers/login',
//    'controllers/logout',
    'directives/appVersion',
    'filters/interpolate',
    //'filters/all',
    'services/version',
    'services/session',
    'services/md5',
    'services/storage',

    'services/store',

//    'services/strings',
    'bootstrap',
    //'signet',
    'lawnchair',
    'dom'
  ],
  function (angular, domReady)
  {
    'use strict';

    domReady(function ()
      {
        angular.bootstrap(document, ['MyApp']);
      }
    );
  }
);
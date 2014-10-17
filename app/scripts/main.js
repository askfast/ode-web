'use strict';

if (window.location.port == '8080')
  document.getElementsByTagName('html')[0].setAttribute('ng-app');

require.config({
  paths: {
    date: 'libs/date/1.0/date.min',
    angular: '../vendors/angular/angular.min',
    jquery: '../vendors/jquery/dist/jquery.min',
    plugins: 'plugins',
    domReady: '../vendors/requirejs-domready/domReady',
    // bootstrap: '../vendors/bootstrap-sass-official/vendor/assets/javascripts/bootstrap',
    bootstrap: '../vendors/bootstrap/dist/js/bootstrap',
    'angular-resource': '../vendors/angular-resource/angular-resource.min',
    'angular-route': '../vendors/angular-route/angular-route.min',
    'angular-md5': '../vendors/angular-md5/angular-md5.min',
    'angular-strap':    '../vendors/angular-strap/dist/angular-strap.min',
    'angular-strap-tpl':    '../vendors/angular-strap/dist/angular-strap.tpl.min',
    // 'angular-strap': 'removables/angular-strap.min',
    // 'ui-bootstrap': 'removables/ui-bootstrap-custom',
    lawnchair: '../vendors/lawnchair/src/Lawnchair',
    dom: '../vendors/lawnchair/src/adapters/dom',
    // moment: '../vendors/momentjs/min/moment.min',
    chosen: 'libs/chosen/chosen.jquery.min',
    timeline: 'libs/chaps/timeline/2.4.0/timeline_modified',
    // datepicker: 'libs/bootstrap-datepicker/bootstrap-datepicker.min',
    // timepicker: 'libs/bootstrap-timepicker/bootstrap-timepicker.min',
    daterangepicker: '../vendors/bootstrap-daterangepicker/daterangepicker',
    moment: '../vendors/moment/moment',
    // daterangepicker: 'libs/daterangepicker/1.1.0/daterangepicker.min',
    // TODO: Still needed?
    sugar: 'libs/sugar/1.3.7/sugar.min',
    eve: 'libs/raphael/2.1.0/eve',
    raphael: 'libs/raphael/2.1.0/raphael-min',
    'g-raphael': 'libs/g-raphael/0.5.1/g.raphael-min',
    'g-pie': 'libs/g-raphael/0.5.1/g.pie-min',
    underscore: '../vendors/underscore/underscore',
    // md5: '../vendors/web-lib-md5/md5.min',
    mask: 'libs/angular-ui-utils/modules/mask/mask',
    // store: '../vendors/web-lib-store/dist/store',
    // offline: '../vendors/web-lib-offline/dist/offline',
    phone: '../vendors/web-lib-phonenumber/libphonenumber',
    // interceptor: '../vendors/web-lib-interceptor/dist/interceptor',
    log: '../vendors/web-lib-log/dist/log',
    // _moment: '../vendors/web-lib-moment/dist/moment',
    // session: '../vendors/web-lib-session/dist/session',
    // vis: '../vendors/vis/dist/vis.min',
    // 'ng-vis': '../vendors/web-lib-vis/public/dist/ng-vis',
    // 'jquery-form': '../vendors/jquery-form/jquery.form',
    //'async':            '../vendors/requirejs-plugins/src/async',
    // 'angular-google-maps': '../vendors/angular-google-maps/dist/angular-google-maps.min',
    // 'lodash': '../vendors/lodash/dist/lodash.min',
    // 'jquery-ui':        '../vendors/jquery-ui/ui/jquery-ui',
    // 'ui-sortable':      '../vendors/angular-ui-sortable/sortable',
    // 'ui.bootstrap.pagination': '../vendors/angular-ui-bootstrap/src/pagination/pagination',
    'locale_nl': 'i18n/angular-locale_nl'
  },
  shim: {
    date: { deps: [], exports: 'date' },
    plugins: { deps: ['jquery'], exports: 'plugins' },
    angular: { deps: ['jquery', 'config'], exports: 'angular' },
    'angular-resource': { deps: ['angular'] },
    'angular-route': { deps: ['angular'] },
    'angular-md5': { deps: ['angular'] },
    'angular-strap': { deps: ['angular'] },
    'angular-strap-tpl': { deps: ['angular','angular-strap'] },
    // 'ui-bootstrap': { deps: ['angular', 'bootstrap'], exports: 'ui-bootstrap' },
    bootstrap: { deps: ['jquery'], exports: 'bootstrap' },
    lawnchair: { deps: [], exports: 'lawnchair' },
    dom: { deps: ['lawnchair'], exports: 'dom' },
    config: {deps: ['jquery'], exports: 'config' },
    // moment: { deps: [], exports: 'moment' },
    chosen: { deps: ['jquery'], exports: 'chosen' },
    timeline: { deps: [], exports: 'timeline' },
    // datepicker: { deps: ['jquery', 'bootstrap'], exports: 'datepicker' },
    // timepicker: { deps: ['jquery', 'bootstrap'], exports: 'timepicker' },
    daterangepicker: { deps: ['jquery', 'moment'], exports: 'daterangepicker' },
    // daterangepicker: { deps: ['jquery', 'bootstrap'], exports: 'daterangepicker' },
    sugar: { exports: 'sugar' },
    eve: { exports: 'eve' },
    raphael: { deps: ['eve'], exports: 'raphael' },
    'g-raphael': { deps: ['raphael'] },
    'g-pie': { deps: ['raphael'] },
    // md5: { exports: 'md5'},
    underscore: { exports: 'underscore'},
    mask: { deps: ['angular'] },
    // store: { deps: ['angular', 'underscore']},
    // offline: { deps: ['angular'] },
    phone: { deps: ['angular'] },
    // interceptor: { deps: ['angular'] },
    log: { deps: ['angular'] },
    // _moment: { deps: ['angular', 'moment'] },
    // session: { deps: ['angular'] },
    // vis: { exports: 'vis' },
    // 'ng-vis': { deps: ['angular', 'vis'], exports: 'ng-vis' },
    // 'jquery-form': { deps: ['jquery'], exports: 'jquery-form' },
    // 'angular-google-maps': { deps: ['angular'] },
    // lodash: { deps: [], exports: 'lodash' },
    // 'jquery-ui':        { deps: ['jquery'], exports: 'jquery-ui'},
    // 'angular-dragdrop': { deps: ['jquery','jquery-ui'], exports: 'dragdrop'},
    // 'ui-sortable':      { deps: ['jquery','jquery-ui'], exports: 'ui-sortable' },
    // 'ui.bootstrap.pagination': { deps: ['angular'] },
    'locale_nl': { deps: ['angular'] }
  }
});

require([
  'angular',
  'domReady',
  'date',
  'jquery',
  'plugins',
  'angular-resource',
  'angular-route',
  'angular-md5',
  'angular-strap',
  'angular-strap-tpl',
  // 'ui-bootstrap',
  'locals',
  'config',
  'app',
  'run',
  'routes',
  'states',
  'services/announcer',
  'services/browsers',
  'services/dater',
  'services/interceptor',
  'services/log',
  'services/md5',
  'services/notifications',
  'services/offline',
  'services/offsetter',
  'services/phone',
  'services/session',
  'services/settings',
  'services/sloter',
  'services/standby',
  'services/stats',
  'services/storage',
  'services/store',
  'services/strings',
  'modals/_user',
  'modals/dashboard',
  'modals/environment',
  'modals/groups',
  'modals/messages',
  'modals/network',
  'modals/planboard',
  'modals/profile',
  'modals/slots',
  'modals/user',
  'directives/login/change-password',
  'directives/login/download-mobile-app',
  'directives/login/forgot-password',
  'directives/login/login-form',
  'directives/login/login-help',
  'directives/login/preloaded',
  'directives/dashboard/smart-alarming',
  'directives/dashboard/snapshots',
  'directives/dashboard/summaries',
  'directives/dashboard/alarms',
  'directives/planboard/time-travel',
  'directives/planboard/time-slot',
  'directives/planboard/time-quick-availability',
  'directives/planboard/time-toolbar',
  'directives/planboard/time-legends',
  'directives/messages/compose',
  'directives/messages/view',
  'directives/messages/inbox',
  'directives/messages/outbox',
  'directives/messages/trash',
  'directives/messages/notifications',
  'directives/chosen',
  'directives/date-range-picker',
  'directives/notification-item',
  'directives/logos',
  'filters/all-filters',
  'controllers/dashboard',
  'controllers/faq',
  'controllers/groups',
  'controllers/help',
  'controllers/login',
  'controllers/logout',
  'controllers/messages',
  'controllers/planboard',
  'controllers/profile',
  'controllers/scheaduler',
  'controllers/settings',
  'controllers/timeline',
  'controllers/timeline-navigation',
  'controllers/tv',
  'bootstrap',
  'lawnchair',
  'dom',
  // 'moment',
  'chosen',
  'timeline',
  // 'datepicker',
  // 'timepicker',
  'daterangepicker',
  'sugar',
  'eve',
  'raphael',
  'g-raphael',
  'g-pie',
  // 'md5',
  'mask',
  'underscore',
  // 'store',
  // 'offline',
  'phone',
  // 'interceptor',
  'log',
  // '_moment',
  // 'session',
  // 'vis',
  // 'ng-vis',
  // 'jquery-form',
  // 'lodash',
  // 'angular-google-maps',
  // 'jquery-ui',
  // 'angular-dragdrop',
  // 'ui-sortable',
  'locale_nl'
], function (angular, domReady) {
  'use strict';

  domReady(function () {
    angular.bootstrap(document, ['StandBy']);
  });
});
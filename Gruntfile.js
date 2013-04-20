/**
 * Main compiler for app
 */
module.exports = function(grunt)
{
  grunt.initConfig(
  {
    pkg: grunt.file.readJSON('package.json'),

    concat: {

      options: {
        separator: ';'
      },

      dist: {
        files: {

          'war/src/app.js': [
            'war/js/localization.js',
            'war/js/webpaige.js',
            'war/js/config.js',
            'war/js/routes.js',
            'war/js/bootstrap.js',
            // modals
            'war/js/modals/user.js',
            'war/js/modals/dashboard.js',
            'war/js/modals/slots.js',
            'war/js/modals/messages.js',
            'war/js/modals/groups.js',
            'war/js/modals/profile.js',
            'war/js/modals/settings.js',
            // controllers
            'war/js/controllers/login.js',
            'war/js/controllers/logout.js',
            'war/js/controllers/dashboard.js',
            'war/js/controllers/planboard.js',
            'war/js/controllers/timeline.js',
            'war/js/controllers/timeline-navigation.js',
            'war/js/controllers/messages.js',
            'war/js/controllers/groups.js',
            'war/js/controllers/profile.js',
            'war/js/controllers/settings.js',
            'war/js/controllers/help.js',
            // directives
            'war/js/directives/directives.js',
            'war/libs/angular-strap/0.7.0/angular-strap.min.js',
            // services
            'war/js/services/timer.js',
            'war/js/services/session.js',
            'war/js/services/dater.js',
            'war/js/services/eventbus.js',
            'war/js/services/interceptor.js',
            'war/js/services/md5.js',
            'war/js/services/storage.js',
            'war/js/services/strings.js',
            'war/js/services/announcer.js',
            'war/js/services/sloter.js',
            'war/js/services/stats.js',
            // filters
            'war/js/filters/filters.js'
          ],

          'war/src/plugins.js': [
            'war/js/plugins/browser.js',
            'war/js/plugins/os.js',
            'war/js/plugins/basket.js',
            'war/js/plugins/screenfull.js'
          ]

        } 
      }
    },

    uglify: {

      options: {
        banner: '/*!\n * WebPaige v2.0.2 (snapshot)\n * Ask Community Systems\n * Authors: Cengiz Ulusoy\n * <%= grunt.template.today("dd-mm-yyyy hh:mm") %>\n */\n'
      },

      dist: {
        files: {
          'war/dist/app.min.js':     'war/src/app.js',
          'war/dist/plugins.min.js': 'war/src/plugins.js'
        }
      }
    },

    qunit: {
      files: ['test/**/*.html']
    },

    jshint: {

      files: [
        'Gruntfile.js',
        'war/js/controllers/*.js',
        'war/js/directives/*.js',
        'war/js/filters/*.js',
        'war/js/modals/*.js',
        'war/js/plugins/*.js',
        'war/js/services/**/*.js',
        'war/js/*.js'
      ],

      src: ['war/src/*.js'],

      options: {
        // options here to override JSHint defaults
        globals: {
          jQuery:   true,
          console:  true,
          module:   true,
          document: true
        }
      }
    },

    watch: {
      files: ['<%= jshint.files %>'],
      tasks: ['concat', 'uglify']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('webpaige', ['concat', 'uglify']);

};
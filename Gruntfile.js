module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: [
          'war/js/app.js',
          'war/js/modals.js',
          'war/js/login.js',
          'war/js/dashboard.js',
          'war/js/planboard.js',
          'war/js/messages.js',
          'war/js/groups.js',
          'war/js/profile.js',
          'war/js/settings.js',
          'war/js/help.js',
          'war/js/directives.js',
          'war/js/services.js',
          'war/js/filters.js'
        ],
        dest: 'war/js/_all.js'
      }
    },
    uglify: {
      options: {
        banner: '/*! WebPaige <%= grunt.template.today("dd-mm-yyyy") %> */\n'
      },
      dist: {
        files: {
          'war/js/_all.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    qunit: {
      files: ['test/**/*.html']
    },
    jshint: {
      files: [
              'Gruntfile.js'
              ],
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
      tasks: ['jshint', 'qunit']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-qunit');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-concat');

  grunt.registerTask('test', ['jshint', 'qunit']);

  grunt.registerTask('default', ['jshint', 'qunit', 'concat', 'uglify']);

  grunt.registerTask('webpaige', ['concat', 'uglify']);

};
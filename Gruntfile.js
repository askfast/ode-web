/**
 * Main compiler for app
 */
module.exports = function(grunt) {

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: [
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
          'war/js/libs/angular-strap/0.7.0/angular-strap.min.js',
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
        dest: 'war/js/dist/app.js'
      }
    },

    uglify: {
      options: {
        banner: '/*!\n * WebPaige v2.0.2 (snapshot)\n * Ask Community Systems\n * Authors: Cengiz Ulusoy\n * <%= grunt.template.today("dd-mm-yyyy hh:mm") %>\n */\n'
      },
      dist: {
        files: {
          'war/js/dist/app.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },

    qunit: {
      files: ['test/**/*.html']
    },

    jshint: {
      files: [
              'Gruntfile.js', 'war/js/**/*.js'
              ],
      src: ['war/js/src/*.js'],
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

  grunt.registerTask('webpaige', ['jshint', 'qunit', 'concat', 'uglify']);

};









/**
 * Timeline configuration
 */
// module.exports = function(grunt) {

//   grunt.initConfig({

//     pkg: grunt.file.readJSON('package.json'),

//     concat: {
//       options: {
//         separator: ';'
//       },
//       dist: {
//         src: [
//           'war/js/libs/chaps/timeline/2.4.0/timeline.js'
//         ],
//         dest: 'war/js/libs/chaps/timeline/2.4.0/timeline_modified.js'
//       }
//     },

//     uglify: {
//       options: {
//         banner: '/*! timeline 2.4.0 modified */\n'
//       },
//       dist: {
//         files: {
//           'war/js/libs/chaps/timeline/2.4.0/timeline_modified.min.js': ['<%= concat.dist.dest %>']
//         }
//       }
//     },

//     qunit: {
//       files: ['test/**/*.html']
//     },

//     jshint: {
//       files: [
//               'Gruntfile.js'
//               ],
//       options: {
//         // options here to override JSHint defaults
//         globals: {
//           jQuery:   true,
//           console:  true,
//           module:   true,
//           document: true
//         }
//       }
//     },

//     watch: {
//       files: ['<%= jshint.files %>'],
//       tasks: ['jshint', 'qunit']
//     }
//   });

//   grunt.loadNpmTasks('grunt-contrib-uglify');
//   grunt.loadNpmTasks('grunt-contrib-jshint');
//   grunt.loadNpmTasks('grunt-contrib-qunit');
//   grunt.loadNpmTasks('grunt-contrib-watch');
//   grunt.loadNpmTasks('grunt-contrib-concat');

//   grunt.registerTask('timeline', ['concat', 'uglify']);

// };









/**
 * Bootstrap datepicker configuration
 */
// module.exports = function(grunt) {

//   grunt.initConfig({

//     pkg: grunt.file.readJSON('package.json'),

//     concat: {
//       options: {
//         separator: ';'
//       },
//       dist: {
//         src: [
//           'war/js/libs/bootstrap-datepicker/bootstrap-datepicker.js'
//         ],
//         dest: 'war/js/libs/bootstrap-datepicker/bootstrap-datepicker.js'
//       }
//     },

//     uglify: {
//       options: {
//         banner: '/*! bootstrap datepicker */\n'
//       },
//       dist: {
//         files: {
//           'war/js/libs/bootstrap-datepicker/bootstrap-datepicker.min.js': ['<%= concat.dist.dest %>']
//         }
//       }
//     },

//     qunit: {
//       files: ['test/**/*.html']
//     },

//     jshint: {
//       files: [
//               'Gruntfile.js'
//               ],
//       options: {
//         // options here to override JSHint defaults
//         globals: {
//           jQuery:   true,
//           console:  true,
//           module:   true,
//           document: true
//         }
//       }
//     },

//     watch: {
//       files: ['<%= jshint.files %>'],
//       tasks: ['jshint', 'qunit']
//     }
//   });

//   grunt.loadNpmTasks('grunt-contrib-uglify');
//   grunt.loadNpmTasks('grunt-contrib-jshint');
//   grunt.loadNpmTasks('grunt-contrib-qunit');
//   grunt.loadNpmTasks('grunt-contrib-watch');
//   grunt.loadNpmTasks('grunt-contrib-concat');

//   grunt.registerTask('datepicker', ['concat', 'uglify']);

// };









/**
 * Bootstrap timepicker configuration
 */
// module.exports = function(grunt) {

//   grunt.initConfig({

//     pkg: grunt.file.readJSON('package.json'),

//     concat: {
//       options: {
//         separator: ';'
//       },
//       dist: {
//         src: [
//           'war/js/libs/bootstrap-timepicker/bootstrap-timepicker.js'
//         ],
//         dest: 'war/js/libs/bootstrap-timepicker/bootstrap-timepicker.js'
//       }
//     },

//     uglify: {
//       options: {
//         banner: '/*! bootstrap timepicker */\n'
//       },
//       dist: {
//         files: {
//           'war/js/libs/bootstrap-timepicker/bootstrap-timepicker.min.js': ['<%= concat.dist.dest %>']
//         }
//       }
//     },

//     qunit: {
//       files: ['test/**/*.html']
//     },

//     jshint: {
//       files: [
//               'Gruntfile.js'
//               ],
//       options: {
//         // options here to override JSHint defaults
//         globals: {
//           jQuery:   true,
//           console:  true,
//           module:   true,
//           document: true
//         }
//       }
//     },

//     watch: {
//       files: ['<%= jshint.files %>'],
//       tasks: ['jshint', 'qunit']
//     }
//   });

//   grunt.loadNpmTasks('grunt-contrib-uglify');
//   grunt.loadNpmTasks('grunt-contrib-jshint');
//   grunt.loadNpmTasks('grunt-contrib-qunit');
//   grunt.loadNpmTasks('grunt-contrib-watch');
//   grunt.loadNpmTasks('grunt-contrib-concat');

//   grunt.registerTask('timepicker', ['concat', 'uglify']);

// };









/**
 * Bootstrap daterangepicker configuration
 */
// module.exports = function(grunt) {

//   grunt.initConfig({

//     pkg: grunt.file.readJSON('package.json'),

//     concat: {
//       options: {
//         separator: ';'
//       },
//       dist: {
//         src: [
//           'war/js/libs/daterangepicker/1.1.0/daterangepicker.js'
//         ],
//         dest: 'war/js/libs/daterangepicker/1.1.0/daterangepicker.js'
//       }
//     },

//     uglify: {
//       options: {
//         banner: '/*! bootstrap daterangepicker */\n'
//       },
//       dist: {
//         files: {
//           'war/js/libs/daterangepicker/1.1.0/daterangepicker.min.js': ['<%= concat.dist.dest %>']
//         }
//       }
//     },

//     qunit: {
//       files: ['test/**/*.html']
//     },

//     jshint: {
//       files: [
//               'Gruntfile.js'
//               ],
//       options: {
//         // options here to override JSHint defaults
//         globals: {
//           jQuery:   true,
//           console:  true,
//           module:   true,
//           document: true
//         }
//       }
//     },

//     watch: {
//       files: ['<%= jshint.files %>'],
//       tasks: ['jshint', 'qunit']
//     }
//   });

//   grunt.loadNpmTasks('grunt-contrib-uglify');
//   grunt.loadNpmTasks('grunt-contrib-jshint');
//   grunt.loadNpmTasks('grunt-contrib-qunit');
//   grunt.loadNpmTasks('grunt-contrib-watch');
//   grunt.loadNpmTasks('grunt-contrib-concat');

//   grunt.registerTask('daterangepicker', ['concat', 'uglify']);

// };









/**
 * Date configuration
 */
// module.exports = function(grunt) {

//   grunt.initConfig({

//     pkg: grunt.file.readJSON('package.json'),

//     concat: {
//       options: {
//         separator: ';'
//       },
//       dist: {
//         src: [
//           'war/js/libs/date/1.0/date.js'
//         ],
//         dest: 'war/js/libs/date/1.0/date.js'
//       }
//     },

//     uglify: {
//       options: {
//         banner: '/*! date 1.0 */\n'
//       },
//       dist: {
//         files: {
//           'war/js/libs/date/1.0/date.min.js': ['<%= concat.dist.dest %>']
//         }
//       }
//     },

//     qunit: {
//       files: ['test/**/*.html']
//     },

//     jshint: {
//       files: [
//               'Gruntfile.js'
//               ],
//       options: {
//         // options here to override JSHint defaults
//         globals: {
//           jQuery:   true,
//           console:  true,
//           module:   true,
//           document: true
//         }
//       }
//     },

//     watch: {
//       files: ['<%= jshint.files %>'],
//       tasks: ['jshint', 'qunit']
//     }
//   });

//   grunt.loadNpmTasks('grunt-contrib-uglify');
//   grunt.loadNpmTasks('grunt-contrib-jshint');
//   grunt.loadNpmTasks('grunt-contrib-qunit');
//   grunt.loadNpmTasks('grunt-contrib-watch');
//   grunt.loadNpmTasks('grunt-contrib-concat');

//   grunt.registerTask('date', ['concat', 'uglify']);

// };









/**
 * jQuery plugins configuration
 */
// module.exports = function(grunt) {

//   grunt.initConfig({

//     pkg: grunt.file.readJSON('package.json'),

//     concat: {
//       options: {
//         separator: ';'
//       },
//       dist: {
//         src: [
//           'war/js/plugins/browser.js',
//           'war/js/plugins/os.js',
//           'war/js/plugins/basket.js',
//           'war/js/plugins/screenfull.js'
//         ],
//         dest: 'war/js/plugins/plugins.js'
//       }
//     },

//     uglify: {
//       options: {
//         banner: '/*! jquery plugins */\n'
//       },
//       dist: {
//         files: {
//           'war/js/plugins/plugins.min.js': ['<%= concat.dist.dest %>']
//         }
//       }
//     },

//     qunit: {
//       files: ['test/**/*.html']
//     },

//     jshint: {
//       files: [
//               'Gruntfile.js'
//               ],
//       options: {
//         // options here to override JSHint defaults
//         globals: {
//           jQuery:   true,
//           console:  true,
//           module:   true,
//           document: true
//         }
//       }
//     },

//     watch: {
//       files: ['<%= jshint.files %>'],
//       tasks: ['jshint', 'qunit']
//     }
//   });

//   grunt.loadNpmTasks('grunt-contrib-uglify');
//   grunt.loadNpmTasks('grunt-contrib-jshint');
//   grunt.loadNpmTasks('grunt-contrib-qunit');
//   grunt.loadNpmTasks('grunt-contrib-watch');
//   grunt.loadNpmTasks('grunt-contrib-concat');

//   grunt.registerTask('plugins', ['concat', 'uglify']);

// };
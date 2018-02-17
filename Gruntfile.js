'use strict';


module.exports = function (grunt) {
  grunt.initConfig({
    less: {
      all: {
        options: {
          strictMath: true,
          outputSourceFiles: true
        },
        files: {
          'public/assets/css/bootstrap.css': 'src/less/bootstrap.less',
          'public/assets/css/app.css': 'src/less/app.less'
        }
      }
    },
    autoprefixer: {
      options: {
        browsers: [
          'Android 2.3',
          'Android >= 4',
          'Chrome >= 20',
          'Firefox >= 24', // Firefox 24 is the latest ESR
          'Explorer >= 8',
          'iOS >= 6',
          'Opera >= 12',
          'Safari >= 6'
        ]
      },
      all: {
        src: [
          'public/assets/css/bootstrap.css',
          'public/assets/css/app.css'
        ]
      }
    },
    csscomb: {
      options: {
        config: 'bower_components/bootstrap/less/.csscomb.json'
      },
      all: {
        expand: true,
        cwd: 'public/assets/css',
        src: [
          'bootstrap.css',
          'app.css'
        ],
        dest: 'public/assets/css'
      }
    },
    cssmin: {
      options: {
        compatibility: 'ie8',
        keepSpecialComments: 0,
        advanced: false
      },
      all: {
        files: {
          'public/assets/css/bootstrap.css': 'public/assets/css/bootstrap.css',
          'public/assets/css/app.css': 'public/assets/css/app.css'
        }
      }
    },
    concat: {
      common: {
        files: {
          'public/assets/js/jquery.plugins.js': [
            'bower_components/bootstrap/js/collapse.js',
            'bower_components/bootstrap/js/dropdown.js',
            'bower_components/bootstrap/js/modal.js',
            'bower_components/bootstrap/js/tab.js'
          ]
        }
      }
    },
    uglify: {
      all: {
        files: {
          'public/assets/js/jquery.plugins.js': 'public/assets/js/jquery.plugins.js'
        }
      }
    },
    filerev: {
      options: {
        algorithm: 'sha256',
        length: 8
      },
      js: {
        src: [
          'public/assets/js/jquery.plugins.js'
        ]
      },
      css: {
        src: [
          'public/assets/css/app.css',
          'public/assets/css/bootstrap.css'
        ]
      }
    },
    filerev_replace: {
      options: {
        assets_root: 'public'
      },
      views: {
        src: 'public/**/*.html'
      }
    },
    watch: {
      "css": {
        files: [
          'src/less/**/*.less'
        ],
        tasks: ['less']
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-autoprefixer');
  grunt.loadNpmTasks('grunt-csscomb');
  grunt.loadNpmTasks('grunt-contrib-cssmin');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-filerev');
  grunt.loadNpmTasks('grunt-filerev-replace');
  grunt.loadNpmTasks('grunt-contrib-watch');

  grunt.registerTask('devel', ['less', 'autoprefixer', 'csscomb', 'concat']);
  grunt.registerTask('default', ['devel', 'cssmin', 'uglify', 'filerev', 'filerev_replace']);
};

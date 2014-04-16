module.exports = function(grunt) {
  "use strict";

  var DIST_PATH = "./dist/";
  var DEV_PATH  = "./dev/";

  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      dist: [DIST_PATH]
    },
    copy: {
      dist: {
        files: [
          {
            expand: true, 
            cwd: 'dev/', 
            src: ['index.html'], 
            dest: DIST_PATH, 
            filter: 'isFile'
          },
          {
            expand: true, 
            cwd: 'dev/', 
            src: ['fonts/**'], 
            dest: DIST_PATH 
          },
          {
            expand: true, 
            cwd: 'dev/', 
            src: ['img/**'], 
            dest: DIST_PATH 
          }
        ]
      }
    },
    connect: {
      server: {
        options: {
          hostname: 'localhost',
          base: DIST_PATH,
          port: 9001,
          keepalive: true
        }
      }
    },
    sass: {                         
      dist: {                          
        options: {                      
          style: 'compressed',
          sourcemap: false
        },
        files: {
          'dist/css/main.css' : 'dev/sass/**/*.scss'
        }
      },
      dev: {                          
        options: {                      
          style: 'compressed',
          sourcemap: true
        },
        files: {
          'dist/css/main.css' : 'dev/sass/**/*.scss'
        }
      }
    },
    browserify: {
      dist: {
        files: {
          'dist/js/main.min.js': [DEV_PATH + '**/*.js']
        }
      }
    },
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: [DEV_PATH + 'js/**/*.js'],
        dest: DIST_PATH + 'js/main.js'
      }
    },

    uglify: {
      dist: {
        options: {
          compress: {
            drop_console: true
          },
          mangle: true,
          sourceMap: false
        },
        files: {
          'dist/js/main.min.js': ['dist/js/main.min.js'],
          'dist/js/modernizr.min.js': ['dev/js/vendor/modernizr/modernizr.js']

        }
      },

      dev: {
        options: {
          compress: {
            drop_console: false
          },
          mangle: false,
          sourceMap: true
        },
        files: {
          'dist/js/main.min.js': ['dist/js/main.min.js'],
          'dist/js/modernizr.min.js': ['dev/js/vendor/modernizr/modernizr.js']

        }  
      }
    },

    jshint: {
      files: ['Gruntfile.js', './' + DEV_PATH + '/js/**/*.js', '!./' + DEV_PATH + '/js/vendor/**/*.js', '!./' + DIST_PATH + '/js/main.js', '!./' + DIST_PATH + '/js/main.min.js'],
      jshintrc: ".jshintrc",
      options: {
        reporter: require('jshint-stylish')
      }
    },

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {                                   
          'dist/index.html': 'dev/index.html'
        }
      },
      dev: {
        files: {
          'dist/index.html': 'dev/index.html'
        }
      }
    },
    imagemin: {
      dev: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          cwd: DEV_PATH,
          src: ['**/*.{png,jpg,gif}'], 
          dest: DIST_PATH            
        }]
      },
      dist: {
        options: {
          optimizationLevel: 7,
          interlaced: true,
          pngquant: true,
          progressive: true
        },
        files: [{
          expand: true,
          cwd: DEV_PATH,
          src: ['**/*.{png,jpg,gif}'],
          dest: DIST_PATH 
        }]
      }
    },

    responsive_images: {
      options: {
        engine: 'im',
        sizes: [{ name: 'small', width: 320 },{ name: 'medium', width: 640 },{ name: 'large', width: 1024 }],
        quality: 0.2,
        aspectRatio: true
      },
      dist: {
        files: [{
          expand: true,
          src: ['img/**.{jpg,gif,png}'],
          cwd: DEV_PATH,
          dest: DIST_PATH
        }]
      }
    },

    watch: {
      options: {
        livereload: {
          port: 9000
        }
      },
      styles: {
        files: [DEV_PATH + 'sass/**/*.sass'],
        tasks: ['newer:sass:dev']
      },
      scripts: {
        files: [DEV_PATH + 'js/**/*.js'],
        tasks: ['newer:jshint', 'newer:browserify', 'newer:uglify:dev']
      },
      html: {
        files: [DEV_PATH + '**/*.html'],
        tasks: ['copy', 'newer:htmlmin:dev']
      },
      images: {
        files: [DEV_PATH + 'img/**/*.{jpg,gif,png}'],
        tasks: ['newer:responsive_images', 'newer:imagemin:dev']
      }
    }
  });

  grunt.registerTask('dev', ['clean', 'copy', 'newer:jshint', 'newer:browserify', 'newer:uglify:dev', 'newer:sass:dev', 'newer:htmlmin:dev', 'newer:imagemin:dev', 'responsive_images', 'watch']);

  grunt.registerTask('dist', ['clean', 'copy', 'jshint', 'browserify', 'uglify:dist', 'sass:dist', 'htmlmin:dist', 'imagemin:dist', 'responsive_images']);

  grunt.registerTask('server', ['connect']);

};
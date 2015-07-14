module.exports = function(grunt) {
  "use strict";

  var DIST_PATH = "dist/";
  var DEV_PATH  = "dev/";
  var BROWSERIFY_CONFIG = require('./browserify-config.js');

  require('load-grunt-tasks')(grunt, {
    pattern: ['grunt-*', 'assemble', '!grunt-template-jasmine-istanbul']
  });

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),

    // Clean
    // Clear files and folders.
    // https://github.com/gruntjs/grunt-contrib-clean

    clean: {
      dist: [DIST_PATH],
      styleGuide: [DIST_PATH + 'style_guide']
    },

    // Copy
    // Copy files and folders.
    // https://github.com/gruntjs/grunt-contrib-copy

    copy: {
      dist: {
        files: [
          {
            expand: true, 
            cwd: 'dev/', 
            src: ['*.html'], 
            dest: DIST_PATH 
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
          },
          {
            expand: true, 
            cwd: 'dev/', 
            src: ['data/**'], 
            dest: DIST_PATH 
          },
          {
            expand: true, 
            cwd: 'dev/', 
            src: ['favicon.ico'], 
            dest: DIST_PATH 
          }
        ]
      }
    },


    // Grunt Connect
    // https://github.com/gruntjs/grunt-contrib-connect
    // Used to create a static web server for dev
    connect: {
        options: {
            port: 9000,
            livereload: 35729,
            // change this to '0.0.0.0' to access the server from outside
            hostname: '0.0.0.0'
        },
        livereload: {
            options: {
                open: true,
                base: [DIST_PATH]
            }
        }
    },

    // SASS
    // Compile Sass to CSS.
    // https://github.com/gruntjs/grunt-contrib-sass

    sass: { 
      styleGuide: {
        options: {                      
          style: 'compressed',
          sourcemap: false
        },
        files: {
          'dist/style_guide/css/main.css' : 'dev/style_guide/sass/*.{scss,sass}'
        }  
      },                      
      dist: {                          
        options: {                      
          style: 'compressed',
          sourcemap: false
        },
        files: {
          'dist/css/main.css' : 'dev/sass/main.scss'
        }
      },
      dev: {                          
        options: {                      
          style: 'expanded',
          sourcemap: true
        },
        files: {
          'dist/css/main.css' : 'dev/sass/main.scss'
        }
      }
    },

    // Browserify
    // Grunt task for node-browserify
    // https://github.com/jmreidy/grunt-browserify

    browserify: {
      dist: {
        files: {
          'dist/js/main.min.js' : [DEV_PATH + 'js/main.js']
        },
        options: {
            alias: BROWSERIFY_CONFIG,
            debug: true
        }
      },
      test: {
          src: [DEV_PATH + 'specs/**/*.js'],
          dest: 'dist/tests/test_bundle.js'
      }
    },

    // Concat
    // Concatenate files.
    // https://github.com/gruntjs/grunt-contrib-concat
    
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: [DEV_PATH + 'js/**/*.js'],
        dest: DIST_PATH + 'js/main.js'
      }
    },

    // Uglify
    // Minify files with UglifyJS.
    // https://github.com/gruntjs/grunt-contrib-uglify

    uglify: {
      modernizr: {
        options: {
          compress: {
            drop_console: false
          },
          mangle: false,
          sourceMap: false
        },
        files: {
          'dist/js/modernizr.min.js': ['dev/js/vendor/modernizr/modernizr.js']
        }
      },
      dist: {
        options: {
          compress: {
            drop_console: true
          },
          mangle: true,
          sourceMap: false
        },
        files: {
          'dist/js/main.min.js': ['dist/js/main.min.js']
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
          'dist/js/main.min.js': ['dist/js/main.min.js']
        }  
      }
    },

    // JSHint
    // Validate files with JSHint.
    // https://github.com/gruntjs/grunt-contrib-jshint

    jshint: {
      files: ['Gruntfile.js', './' + DEV_PATH + '/js/**/*.js', '!./' + DEV_PATH + '/js/vendor/**/*.js', '!./' + DIST_PATH + '/js/main.js', '!./' + DIST_PATH + '/js/main.min.js'],
      jshintrc: ".jshintrc",
      options: {
        reporter: require('jshint-stylish')
      }
    },

    // HTMLMin
    // Minify HTML.
    // https://github.com/gruntjs/grunt-contrib-htmlmin

    htmlmin: {
      dist: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: [{
          expand: true,
          cwd: DIST_PATH,
          src: ['*.html'], 
          dest: DIST_PATH            
        }]
      },
      dev: {
        files: [{
          expand: true,
          cwd: DIST_PATH,
          src: ['*.html'], 
          dest: DIST_PATH            
        }]
      }
    },

    // Imagemin
    // Minify PNG and JPEG images.
    // https://github.com/gruntjs/grunt-contrib-imagemin

    imagemin: {
      dev: {
        options: {
          optimizationLevel: 3
        },
        files: [{
          expand: true,
          cwd: DEV_PATH,
          src: ['img/**/*.{png,jpg,gif}'], 
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
          src: ['img/**/*.{png,jpg,gif}'],
          dest: DIST_PATH 
        }]
      }
    },

    // Responsive Images
    // Produce images at different sizes for responsive websites.
    // https://github.com/andismith/grunt-responsive-images

    responsive_images: {
      options: {
        engine: 'gm',
        sizes: [{ name: 'small', width: 320 },{ name: 'medium', width: 640 },{ name: 'large', width: 1024 }],
        quality: 70,
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

    // AutoPrefixer
    // Parse CSS and add vendor-prefixed CSS properties using the Can I Use database. Based on Autoprefixer.
    // https://github.com/nDmitry/grunt-autoprefixer

    autoprefixer: {
      options: {
        browsers: ['last 2 version', 'ie 8', 'ie 9']
      },
      dist: {
        expand: true,
        flatten: true,
        src: DIST_PATH + 'css/**/*.css',
        dest: DIST_PATH + 'css/'
      }
    },


    // Jasmine
    // Jasmine is a behavior-driven development framework for testing JavaScript code..
    // https://github.com/pivotal/jasmine

    jasmine: {
        coverage: {
            src: ['dist/js/main.min.js'],
            options: {
                specs: ['dist/tests/test_bundle.js'],
                template: require('grunt-template-jasmine-istanbul'),
                templateOptions: {
                    type: 'lcov',
                    coverage: 'dist/coverage/coverage.lcov',
                    report: 'dist/coverage'
                }
            }
        }
    },

    // YUIDoc
    // Compile YUIDoc Documentation.
    // https://github.com/gruntjs/grunt-contrib-yuidoc

    yuidoc: {
      compile: {
        name: '<%= pkg.name %>',
        description: '<%= pkg.description %>',
        version: '<%= pkg.version %>',
        url: '<%= pkg.homepage %>',
        options: {
          paths: DEV_PATH,
          outdir: DIST_PATH + 'docs/'
        }
      }
    },

    // Assemble
    // Static site generator for Node.js, Grunt.js, and Yeoman (and soon, Gulp).
    // https://github.com/assemble/assemble

    assemble: {
      dev: {
        options: {
          assets: DEV_PATH,
          partials: [DEV_PATH + 'views/partials/**/*.hbs'],
          layout: [DEV_PATH + 'views/layout/default.hbs'],
          data: [DEV_PATH + 'views/data/**/*.{json,yaml}'],
          production: false
        },
        files: [{
          expand: true,
          src: ['*.hbs'],
          cwd: DEV_PATH + 'views/pages/',
          dest: DIST_PATH
        }]
      },
      dist: {
        options: {
          assets: DEV_PATH,
          partials: [DEV_PATH + 'views/partials/**/*.hbs'],
          layout: [DEV_PATH + 'views/layout/default.hbs'],
          data: [DEV_PATH + 'data/*.{json,yml}'],
          production: true
        },
        files: [{
          expand: true,
          src: ['views/pages/*.hbs'],
          cwd: DEV_PATH,
          dest: DIST_PATH
        }]
      }
    },


    // Watch
    // Run tasks whenever watched files change.
    // https://github.com/gruntjs/grunt-contrib-watch

    watch: {
      options: {
        livereload: {
          port: 35729
        }
      },
      styles: {
        files: [DEV_PATH + 'sass/**/*.{sass,scss}'],
        tasks: ['newer:sass:dev', 'sass:styleGuide']
      },
      data: {
        files: [DEV_PATH + "data/**/*.{json,yaml}", DEV_PATH + "views/data/**/*.{json,yaml}"],
        tasks: ['dev']
      },
      gruntFile: {
        files: ['Gruntfile.js'],
        tasks: ['dev']
      },
      scripts: {
        files: [DEV_PATH + 'js/**/*.js'],
        tasks: ['newer:jshint', 'browserify', 'newer:uglify:dev']
      },
      html: {
        files: [DEV_PATH + 'views/**/*.hbs', DEV_PATH + 'style_guide/**/*.hbs', DEV_PATH + '*.html'],
        tasks: ['assemble:dev', 'htmlmin:dev']
      },
      images: {
        files: [DEV_PATH + 'img/**/*.{jpg,gif,png}'],
        tasks: ['responsive_images', 'imagemin:dev']
      }
    }
  });
  
  grunt.registerTask('styleguide', ['clean:styleGuide', 'sass:styleGuide', 'assemble:styleGuide', 'watch']);

  grunt.registerTask('docs', ['yuidoc']);

  grunt.registerTask('dev', ['clean', 'copy', 'newer:jshint', 'browserify', 'newer:uglify:modernizr', 'newer:uglify:dev', 'newer:sass:dev', 'autoprefixer', 'newer:assemble:dev', 'newer:htmlmin:dev', 'imagemin:dev', 'responsive_images', 'connect:livereload', 'watch']);

  grunt.registerTask('dist', ['clean', 'copy', 'jshint', 'browserify', 'newer:uglify:modernizr', 'uglify:dist', 'sass:dist', 'autoprefixer', 'newer:assemble:dev', 'htmlmin:dist', 'imagemin:dist', 'responsive_images', 'yuidoc']);

  grunt.registerTask('server', ['connect']);

};

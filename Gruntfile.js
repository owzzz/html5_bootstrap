module.exports = function(grunt) {
  "use strict";

  require("matchdep").filterDev("grunt-*").forEach(grunt.loadNpmTasks);

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    clean: {
      dist: ['js/main.js', 'js/main.min.js', 'js/main.min.map', 'css/main.css', 'css/main.css.map']
    },
    connect: {
      server: {
        options: {
          hostname: 'localhost',
          port: 9001,
          keepalive: true
        }
      }
    },
    sass: {                         
      dist: {                          
        options: {                      
          style: 'compressed',
          sourcemap: true
        },
        files: {
          'css/main.css': 'sass/**/*.scss'
        }
      }
    },
    concat: {
      options: {
        separator: ';'
      },
      dist: {
        src: ['js/**/*.js'],
        dest: 'js/main.js'
      }
    },
    uglify: {
      options: {
        compress: {
          drop_console: true
        },
        mangle: true,
        sourceMap: true
      },
      dist: {
        files: {
          'js/main.min.js': ['<%= concat.dist.dest %>']
        }
      }
    },
    jshint: {
      files: ['Gruntfile.js', 'src/**/*.js', '!src/vendor/**/*.js'],
      jshintrc: ".jshintrc",
      options: {
        reporter: require('jshint-stylish')
      }
    },
    watch: {
      options: {
        livereload: {
          port: 9000
        }
      },
      styles: {
        files: 'sass/**/*.sass',
        tasks: ['sass']
      },
      scripts: {
        files: ['js/modules/**/*.js', 'js/partials/**/*.js', 'misc/**/*.js'],
        tasks: ['jshint', 'concat', 'uglify'],
      }
    }
  });

  grunt.registerTask('default', ['clean', 'jshint', 'concat', 'uglify', 'sass', 'watch']);

};
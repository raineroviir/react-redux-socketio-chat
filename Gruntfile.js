'use strict';
var path = require('path');

module.exports = function(grunt) {

  var serverFiles = ['lib/**/*.js', 'tests/srv/**/*.js', 'models/**/*.js', 'routes/**/*.js', '*.js'];

 	var clientFiles = ['client/**/*', 'server/**/*', 'index.js', 'Gruntfile.js'];

  // load npm tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-jsxhint');
  grunt.loadNpmTasks('grunt-contrib-clean');


  // configure tasks
  grunt.initConfig({
    webpack: {
      production: {
        entry: [
          './index'
        ],
        output: {
          path: path.join(__dirname, 'dist'),
          filename: '/static/bundle.js',
        },
        module: {
          loaders: [{
            test: /\.js?$/,
            loaders: ['babel?stage=0'],
            exclude: /node_modules/
          }, {
            test: /\.css?$/,
            loaders: ['style', 'raw']
          }]
        },
        resolve: {
          extensions: ['', '.js', '.jsx']
        }
      }
    },

    copy: {
      html: {
        expand: true,
        flatten: false,
        src: ['*.html', 'favicon.ico'],
        dest: 'dist/',
        filter: 'isFile'
      }
    },

    clean: {
      dev: {
        src: 'dist/'
      }
    },

    jshint: {
      server: {
        files: {
          src: serverFiles
        },
        options: {
          jshintrc: true
        }
      },
      client: {
      	files: {
      		src: clientFiles
      	},
      	options: {
      		"globals": {
	          "require": true,
	          "window": true,
	          "module": true,
	          "document": true
          }
        }
      }
    },

    simplemocha: {
      dev: {
        src:['test/*.js']
      },
      options: {
        globals: ['should'],
        timeout: 3000,
        ignoreLeaks: true,
        ul: 'bdd',
        reporter: 'tap'
      }
    },

    watch: {
      build: {
      	files: [clientFiles],
      	tasks: ['build'],
      	options: {
          spawn: false
        }
      }
    },

    nodemon: {
      dev: {
        script: './server/server.js'
      }
    }
  });

  // register custom task chains
  grunt.registerTask('lint', ['jshint:server:files']);
  grunt.registerTask('test', ['simplemocha:dev']);
  grunt.registerTask('default', ['lint', 'test']);
  grunt.registerTask('build', ['clean:dev', 'webpack:production', 'copy:html']);
};

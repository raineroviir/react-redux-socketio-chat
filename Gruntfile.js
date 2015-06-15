'use strict';

module.exports = function(grunt) {
  var serverFiles = ['lib/**/*.js', 'tests/srv/**/*.js', 'models/**/*.js', 'routes/**/*.js', '*.js', 'app/**/*.js', 'app/**/*.jsx', 'app/app.jsx', 'app/index.html'];

  // load npm tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-contrib-copy');

  // configure tasks
  grunt.initConfig({
    webpack: {
      client: {
        entry: __dirname + '/app/app.jsx',
        output: {
        path: 'build/',
        file: 'bundle.js'
        },
        module: {
          loaders: [{
            test: /\.jsx$/,
            loader: 'jsx-loader'
            }]
        }
      }
    },

    copy: {
      html: {
        expand: true,
        flatten: false,
        src: '*.html',
        dest: 'build/',
        filter: 'isFile'
      }
    },

    clean: {
      dev: {
        src: 'build/'
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
      }
    },

    simplemocha: {
      dev: {
        src:['test/**/*.js']
      },
      options: {
        globals: ['should'],
        timeout: 3000,
        ignoreLeaks: false,
        ul: 'bdd',
        reporter: 'tap'
      }
    },

    watch: {
      lint: {
        files: serverFiles,
        tasks: ['jshint:server:dev', 'build:dev'],
          options: {
          spawn: false,
        }
      }
    },

    nodemon: {
      dev: {
        script: 'server.js'
      }
    }
  });

  // register custom task chains
  grunt.registerTask('lint', ['jshint:server:files']);
  grunt.registerTask('test', ['simplemocha:dev']);
  grunt.registerTask('default', ['lint', 'test', 'build:dev']);
  grunt.registerTask('build:dev', ['webpack:client', 'copy:html']);
};

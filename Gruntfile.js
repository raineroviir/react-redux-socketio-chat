'use strict';

module.exports = function(grunt) {
  var serverFiles = ['lib/**/*.js', 'tests/srv/**/*.js', 'models/**/*.js', 'routes/**/*.js', '*.js', 'app/**/*.js'];

  // load npm tasks
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-simple-mocha');
  grunt.loadNpmTasks('grunt-nodemon');
  grunt.loadNpmTasks('grunt-webpack');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-eslint');

  // configure tasks
  grunt.initConfig({
  	eslint: {
        target: ['app/**/*.jsx','app/app.jsx']
    },

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
      lint: {
        files: serverFiles,
        tasks: ['jshint:server:dev'],
          options: {
          spawn: false,
        }
      },
      build_client: {
      	files: [serverFiles, 'app/**/*.jsx', 'app/app.jsx', 'app/index.html'],
      	tasks: ['client'],
      	options: {
          spawn: false
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
  grunt.registerTask('default', ['lint', 'test']);
  grunt.registerTask('client', ['build:dev']);
  grunt.registerTask('build', ['webpack:client', 'copy:html']);
};

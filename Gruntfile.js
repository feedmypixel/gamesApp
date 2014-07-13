module.exports = function( grunt ){
    'use strict';

    var pkg = grunt.file.readJSON( 'package.json' );

    grunt.initConfig( {

        pkg: pkg,

        nodemon: {

            dev: {

                script: 'src/application/server.js',

                options: {

                    args: [ 'dev' ],

                    nodeArgs: [ '--debug' ],

                    callback: function ( nodemon ) {

                        nodemon.on( 'log', function ( event ) {

                            console.log( event.colour );
                        });
                    },

                    env: {

                        PORT: '8090'
                    },

                    cwd: __dirname,

                    ignore: [ 'node_modules/**' ],

                    ext: 'js',

                    watch: [ 'src/application' ],

                    delay: 1,

                    legacyWatch: true
                }
            }
        },

        karma: {

            options: {

                configFile: 'karma.conf.js'
            },

            unit: {}
        }
    } );

    // tasks
    grunt.loadNpmTasks( 'grunt-karma' );
    grunt.loadNpmTasks('grunt-nodemon');

    grunt.registerTask( 'run-application', 'Run app', [
        'nodemon'
    ] );

    grunt.registerTask( 'run-karma', 'Run tests via karma', [
            'karma'
    ] );
};

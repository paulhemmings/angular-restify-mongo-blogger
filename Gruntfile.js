module.exports = function(grunt) {

    // 1. All configuration goes here

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        project: {
            root: './',
            public: '<%= project.root %>/public',
            app: '<%= project.root %>/app',
            scss: [
                '<%= project.public %>/scss/*.scss'
            ],
            js: [
                '<%= project.public %>/scripts/*.js',
                '<%= project.app %>/**/*.js'
            ]
        },

        sass : {
            dev: {
                options: {
                    style: 'expanded',
                    compass: false
                },
                files: '<%= project.public %>/scss/{,*/}*.{scss,sass}'
            },
            dist: {
                options: {
                    style: 'compressed',
                    compass: true
                },
                files: {
                    '<%= project.public %>/styles/global.css': '<%= project.scss %>'
                }
            }
        },

        watch: {
            sass: {
                files: '<%= project.public %>/scss/{,*/}*.{scss,sass}',
                tasks: ['sass:dev']
            }
        },

        concat: {
            dist: {
                src: [
                    '<%= project.public %>/scripts/*.js', // All public scripts
                    '<%= project.app %>/**/*.js'   // All the app scripts
                ],
                dest: '<%= project.public %>/build/production.js'
            }
        },

        uglify: {
            build: {
                src: '<%= project.public %>/build/production.js',
                dest: '<%= project.public %>/build/production.min.js'
            }
        }

    });

    // 3. Where we tell Grunt which plugins we intend to use

    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    // If we want to use the official SASS compiler, comment out this and add watch to default task
    // (after installing the sass and compass gems)
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // 4. Where we tell Grunt what to do when we type "grunt" into the terminal.

    grunt.registerTask('default', ['karma', 'watch:sass' ]);

    // 5. Where we tell Grunt what other tasks to run

    grunt.registerTask('test', ['karma']);
    grunt.registerTask('build', ['sass:dev', 'karma']);
    grunt.registerTask('pre-deploy', ['sass:dist', 'concat', 'uglify']);

};

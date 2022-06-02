module.exports = function(grunt) {
    const sass = require('node-sass');
    // configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        // concat for concat css files or js files
        concat: {
            options: {
                separator: "\n",
                banner: '  <%= pkg.name %>  - <%= grunt.template.today("yyyy") %>\n' +
                    '  Last Modified  : <%= grunt.template.today("dd-mm-yyyy") %>\n'

            },
            js: {
                src: ['js/*.js'],
                dest: 'build/script.js'
            },
            css: {
                src: ['css/*.css'],
                dest: 'build/style.css'
            }
        },
        // sass for compiling scss fill into css files
        sass: {
            options: {
                implementation: sass,

            },
            build: {
                files: {
                    'css/styles.css': 'css/sass/styles.scss'
                }
            }
        },
        // uglify for compressed js file
        uglify: {

            build: {
                files: [{
                    src: 'build/script.js',
                    dest: 'build/script-uglified.js'
                }]
            }
        },
        // autoprefixer for add vendor prefixes
        autoprefixer: {
            options: {
                browsers: ["last 2 versions", "ie 8", "ie 9"],
            },
            build: {
                files: {
                    'css/styles.css': 'css/styles.css'
                },
            },
        },
        // cssmin for minimize css file
        cssmin: {
            target: {
                files: [{
                    src: 'build/style.css',
                    dest: 'build/style.min.css'
                }]
            }
        },
        // watch for doing multiple tasks 
        watch: {

            grunt: {
                files: ['Gruntfile.js']
            },
            options: { reload: true },
            tasks: ["sass", "autoprefixer", "concat", "cssmin", "uglify"],
        },

    })

    // load plugins
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-sass');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-autoprefixer');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-watch');

    // register tasks
    grunt.registerTask("concat-js", ["concat :js"])



}
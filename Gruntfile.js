
/* global module: true */
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        bower_depend: {
            dummy: {}
        },
        copy: {
            "componentjs": {
                files: [{
                    expand: true,
                    cwd:    "bower_components/componentjs",
                    src:    [ "component.js", "component.plugin.debugger.js", "component.plugin.jquery.js" ],
                    dest:   "lib/"
                }]
            },
            "jquery": {
                files: [{
                    expand: true,
                    cwd:    "bower_components/jquery",
                    src:    [ "jquery.js" ],
                    dest:   "lib/"
                }]
            },
            "jquery-markup": {
                files: [{
                    expand: true,
                    cwd:    "bower_components/jquery-markup",
                    src:    [ "jquery.markup.js" ],
                    dest:   "lib/"
                }]
            },
            "nunjucks": {
                files: [{
                    expand: true,
                    cwd:    "bower_components/nunjucks/browser",
                    src:    [ "nunjucks.js" ],
                    dest:   "lib/"
                }]
            },
            "director": {
                files: [{
                    expand: true,
                    cwd:    "bower_components/director/build",
                    src:    [ "director.js" ],
                    dest:   "lib/"
                }]
            },
            "lodash": {
                files: [{
                    expand: true,
                    cwd:    "bower_components/lodash/dist",
                    src:    [ "lodash.js" ],
                    dest:   "lib/"
                }]
            },
            options: {
            }
        },
        jshint: {
            options: {
                jshintrc: "jshint.json"
            },
            gruntfile: [ "Gruntfile.js" ],
            "src": [ "app/**/*.js" ]
        },
        connect: {
            server: {
                options: {
                    hostname: "*",
                    port: 8080,
                    base: "."
                }
            }
        },
        watch: {
            "app": {
                files: [ "app/**/*.js" ],
                tasks: [ "jshint" ]
            },
            options: {
                nospawn: true
            }
        },
        clean: {
            clean:     [ ],
            distclean: [ "bower_components", "node_modules" ]
        }
    });

    grunt.loadNpmTasks("grunt-bower-depend");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-clean");

    grunt.registerTask("default", [ "bower_depend", "copy", "jshint" ]);
    grunt.registerTask("dev",     [ "connect", "watch" ]);
};


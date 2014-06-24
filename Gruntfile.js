
/* global module: true */
module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON("package.json"),
        "bower-install-simple": {
            options: {
                directory: "bower_components"
            }
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
            "uuid-js": {
                files: [{
                    expand: true,
                    cwd:    "bower_components/uuid-js/lib",
                    src:    [ "uuid.js" ],
                    dest:   "lib/"
                }]
            },
            "todomvc-common": {
                files: [{
                    expand: true,
                    cwd:    "bower_components/todomvc-common",
                    src:    [ "bg.png", "base.js" ],
                    rename: function (dest, src) { return dest + "todomvc-common-" + src },
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
        complexity: {
            generic: {
                src: [ "app/**/*.js" ],
                options: {
                    errorsOnly:      false,
                    cyclomatic:      4,
                    halstead:        17,
                    maintainability: 80
                }
            }
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
            clean:     [ "lib" ],
            distclean: [ "bower_components", "node_modules" ]
        }
    });

    grunt.loadNpmTasks("grunt-bower-install-simple");
    grunt.loadNpmTasks("grunt-complexity");
    grunt.loadNpmTasks("grunt-contrib-copy");
    grunt.loadNpmTasks("grunt-contrib-jshint");
    grunt.loadNpmTasks("grunt-contrib-connect");
    grunt.loadNpmTasks("grunt-contrib-watch");
    grunt.loadNpmTasks("grunt-contrib-clean");

    grunt.registerTask("default", [ "build", "dev" ]);
    grunt.registerTask("build",   [ "bower-install-simple", "copy", "jshint", "complexity" ]);
    grunt.registerTask("dev",     [ "connect", "watch" ]);
};


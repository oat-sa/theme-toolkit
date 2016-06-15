var fs = require('fs');

var profiles = require('./profiles.json');

module.exports = function(grunt) {
    'use strict';

    var profile = getSelectedProfile(grunt);

    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean : {
            options: {
                force: true
            },
            sass : [profile.dest]
        },

        sass : {
            options: {
                noCache: true,
                unixNewlines : true,
                lineNumbers : false
            },
            compile : {
                files: [{
                    expand: true,
                    cwd: profile.src,
                    src: ['themes/*/*/theme.scss', '!themes/*/_common/theme.scss'],
                    dest: profile.dest,
                    ext : '.css'
                }]
            }
        },

        watch: {
            sass : {
                files : [profile.src + '/**/*.scss'],
                tasks : ['sass:compile', 'notify:sass'],
                options : {
                    debounceDelay : 500,
                    livereload : true
                }
            }
        },

        notify : {
            sass: {
                options: {
                    title: '<%=pkg.description%>',
                    message: 'Sass files compiled'
                }
            }
        }
    });

    function getSelectedProfile(grunt) {
        var profile = grunt.option('profile');

        //todo: define a default behaviour with scss and dist folders ?
        if (!profile) {
            throw new Error('Please select a profile: grunt compile -profile={PROFILE}');
        }
        if (!profiles[profile]) {
            throw new Error('Unknow profile ' + profile + ', please check your profiles.js');
        }
        return profiles[profile];
    }

    grunt.registerTask('compile', "Compile themes", ['clean:sass', 'sass:compile']);
};

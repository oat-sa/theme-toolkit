var fs = require('fs');
var allProfiles;

try {
    allProfiles = require('./profiles.json');
} catch (e) {
    throw new Error('no profiles.json found. Please copy and customize profiles.json.dist');
}

module.exports = function(grunt) {
    'use strict';

    var profile = getSelectedProfile(grunt.option('p'));

    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            options: {
                force: true
            },
            sass: [profile.dest]
        },

        sass: {
            options: {
                linefeed: 'lf',
                sourceMap: true,
                outputStyle: 'compressed'
            },
            compile: {
                files: [{
                    expand: true,
                    cwd: profile.src,
                    src: ['themes/*/*/theme.scss', '!themes/*/_common/theme.scss'],
                    dest: profile.dest,
                    ext: '.css'
                }]
            }
        },

        watch: {
            sass: {
                files: [profile.src + '/**/*.scss'],
                tasks: ['sass:compile', 'notify:sass'],
                options: {
                    debounceDelay: 500,
                    livereload: true
                }
            }
        },

        notify: {
            sass: {
                options: {
                    title: '<%=pkg.description%>',
                    message: 'Sass files compiled'
                }
            }
        }
    });

    function getSelectedProfile(profile) {
        if (!profile) {
            throw new Error('Please select a profile: grunt compile -p={PROFILE}');
        }
        if (!allProfiles[profile]) {
            throw new Error('Unknown profile ' + profile + '');
        }
        return allProfiles[profile];
    }

    grunt.registerTask('compile', 'Compile themes', ['clean:sass', 'sass:compile']);
    grunt.registerTask('dev', 'automatically recompile themes upon file change', ['watch:sass']);
};

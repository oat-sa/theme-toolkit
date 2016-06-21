var fs = require('fs');

module.exports = function(grunt) {
    'use strict';

    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        clean: {
            options: {
                force: true
            },
            sass: [grunt.option('profile').dest]
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
                    cwd: grunt.option('profile').src,
                    src: ['themes/*/*/theme.scss', '!themes/*/_common/theme.scss'],
                    dest: grunt.option('profile').dest,
                    ext: '.css'
                }]
            }
        },

        watch: {
            sass: {
                files: [grunt.option('profile').src + '/**/*.scss'],
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

    grunt.registerTask('loadProfile', function() {
        var allProfiles,
            profile = grunt.option('p');

        try {
            allProfiles = require('./profiles.json');
        } catch (err) {
            grunt.fail.fatal('no profiles.json found. Please copy and customize profiles.json.dist');
        }
        if (!profile) {
            grunt.fail.fatal('Please select a profile: grunt compile -p={PROFILE}');
        }
        if (!allProfiles[profile]) {
            grunt.fail.fatal('Unknown profile ' + profile + '');
        }
        console.log('i\'m setting the profile optoion');
        grunt.option.set('profile', allProfiles[profile]);
    });


    grunt.registerTask('compile', 'Compile themes', ['loadProfile', 'clean:sass', 'sass:compile']);
    grunt.registerTask('dev', 'automatically recompile themes upon file change', ['loadProfile', 'watch:sass']);

};

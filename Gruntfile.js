const sass = require('sass');

module.exports = function(grunt) {
    'use strict';

    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    let allProfiles;
    try {
        allProfiles = require('./profiles.json');
    } catch (err) {
        grunt.fail.fatal('no profiles.json found. Please copy and customize profiles.json.dist');
    }

    function getSelectedProfile(grunt) {
        const profile = grunt.option('profile');
        if (!profile) {
            grunt.fail.fatal('Please select a profile: grunt compile -profile={PROFILE}');
        }
        if (!allProfiles[profile]) {
            grunt.fail.fatal('Unknown profile ' + profile + '');
        }
        return allProfiles[profile];
    }

    const profile = getSelectedProfile(grunt);

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
                outputStyle: 'compressed',
                implementation: sass
            },
            compile: {
                files: [{
                    expand: true,
                    cwd: profile.src,
                    src: ['**/theme.scss'],
                    dest: profile.dest,
                    ext: '.css'
                }]
            }
        },

        watch: {
            sass: {
                files:  [profile.src + '/**/*.scss'],
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

    grunt.registerTask('compile', 'Compile themes', ['clean:sass', 'sass:compile']);
    grunt.registerTask('dev', 'automatically recompile themes upon file change', ['watch:sass']);
};

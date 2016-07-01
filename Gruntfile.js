var fs = require('fs');

module.exports = function(grunt) {
    'use strict';

    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    var profile = getProfile(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        devDir: 'dev-tmp',

        clean: {
            options: {
                force: true
            },
            sass: [profile.dest],
            git: ['<%=devDir%>/tao', '<%=devDir%>/taoItems', '<%=devDir%>/taoQtiItem']
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
                    src: ['**/theme.scss'],
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
        },

        connect: {
            server: {
                options: {
                    port: 9001,
                    base: 'dev'
                    // , open: true
                }
            }
        },

        gitclone: {
            tao: {
                options: {
                    cwd: '<%=devDir%>',
                    repository: 'https://github.com/oat-sa/tao-core.git',
                    // branch: 'develop',
                    directory: 'tao'
                }
            },
            taoItems: {
                options: {
                    cwd: '<%=devDir%>',
                    repository: 'https://github.com/oat-sa/extension-tao-item.git',
                    // branch: 'develop',
                    directory: 'taoItems'
                }
            },
            taoQtiItem: {
                options: {
                    cwd: '<%=devDir%>',
                    repository: 'https://github.com/oat-sa/extension-tao-itemqti.git',
                    // branch: 'develop',
                    directory: 'taoQtiItem'
                }
            }
        }

    });

    function getProfile(grunt) {
        var allProfiles,
            profile = grunt.option('p'),
            selectedProfile = {};

        if (profile) {
            try {
                allProfiles = require('./profiles.json');
            } catch (err) {
                grunt.fail.fatal('no profiles.json found. Please copy and customize profiles.json.dist');
            }
            if (!allProfiles[profile]) {
                grunt.fail.fatal('Unknown profile ' + profile + '');
            }
            selectedProfile = allProfiles[profile];
        } else {
            grunt.log.subhead('WARNING: as no profile has been specified with -p={PROFILE}, any compile task will fail');
        }

        return selectedProfile;
    }

    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('init', 'Initialize development directory', ['clean:git', 'gitclone']);
    grunt.registerTask('compile', 'Compile themes', ['clean:sass', 'sass:compile']);
    grunt.registerTask('dev', 'automatically recompile themes upon file change', ['watch:sass']); //todo: remove this ?

};

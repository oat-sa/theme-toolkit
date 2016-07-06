var fs = require('fs');
var path = require('path');
var walker = require('walker');


module.exports = function(grunt) {
    'use strict';

    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    var profile = getProfile(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        devDir: 'dev-items',

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
                    base: '<%=devDir%>'
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
        },

        copy: {
            initConfig: {
                src: '<%=devDir%>/config/config.js.dist',
                dest: '<%=devDir%>/config/config.js',
                options: {
                    process: function (content) {
                        return content
                            .replace(/__UI\/THEMES__/g, JSON.stringify(uiThemesTemplate))
                            .replace(/__LOCALHOST__/g, 'http://localhost:9001')
                            ;
                    }
                }
            },
            initLocales: {
                src: '<%=devDir%>/config/messages.json.dist',
                dest: '<%=devDir%>/tao/views/locales/en-US/messages.json'
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
            grunt.log.subhead('WARNING: as no profile has been specified with -p={PROFILE}, any compile or watch task will fail');
        }

        return selectedProfile;
    }

    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('init', 'Initialize development directory', ['clean:git', 'gitclone']);
    grunt.registerTask('compile', 'Compile themes', ['clean:sass', 'sass:compile']);
    grunt.registerTask('dev', 'automatically recompile themes upon file change', ['watch:sass']); //todo: remove this ?

    grunt.registerTask('getCssFiles', 'retrieves all available css files', function getCssFiles(grunt) {
        var done = this.async();
        var defaultTheme;

        function isItemCssTheme(file) {
            return file.indexOf('.css', file.length - '.css'.length) !== -1
                && file.indexOf('items') !== -1;
        }

        walker(path.join('dev-tmp', 'css'))
            .on('file', function(file) {
                if (isItemCssTheme(file)) {
                    var pathArray = file.split(path.sep);
                    var themeId;

                    // replace root dir with localhost
                    pathArray[0] = '__LOCALHOST__';

                    // use the last folder as id
                    themeId = pathArray[pathArray.length - 2];

                    // add new entry
                    uiThemesTemplate.items.available.push({
                        id: themeId,
                        name: themeId,
                        path: pathArray.join('/')
                    });
                    if (typeof defaultTheme === "undefined") {
                        defaultTheme = themeId; // we set the first found theme to be the default
                    }
                }
            })
            .on('end', function() {
                uiThemesTemplate.items.default = defaultTheme;
                done();
            });
    });

    var uiThemesTemplate = {
        items: {
            base: "__LOCALHOST__/taoQtiItem/views/css/qti-runner.css",
            available: [
                {
                    id: "tao",
                    name: "TAO",
                    path: "__LOCALHOST__/taoQtiItem/views/css/themes/default.css"
                }
            ]
        }
    };
};

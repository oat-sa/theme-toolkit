var fs = require('fs');
var path = require('path');
var walker = require('walker');

var HOST = 'localhost',
    PORT = 9001;

module.exports = function(grunt) {
    'use strict';

    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        profiles: {
            user:   '',   // this will receive the content of profiles.json
            active: ''    // this will receive the profile selected in the command line (grunt compile:profileId)
        },

        itemsDir:  'dev-items',
        itemsHost: 'localhost',
        itemsPort: '9001',

        clean: {
            options: {
                force: true
            },
            sass: [
                '<%=profiles.active.dest%>/*/',
                '!<%=profiles.active.dest%>/.gitignore',
                '!<%=profiles.active.dest%>/readme.md'
            ],
            gitItems: [
                '<%=itemsDir%>/tao',
                '<%=itemsDir%>/taoItems',
                '<%=itemsDir%>/taoQtiItem'
            ]
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
                    cwd: '<%=profiles.active.src%>',
                    src: ['**/theme.scss'],
                    dest: '<%=profiles.active.dest%>',
                    ext: '.css'
                }]
            }
        },

        watch: {
            sass: {
                files: ['<%=profiles.active.src%>/**/*.scss'],
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
                    message: 'Sass files compiled to <%=profiles.active.dest%>'
                }
            }
        },

        connect: {
            items: {
                options: {
                    port: PORT,
                    base: '<%=itemsDir%>'
                }
            }
        },

        gitclone: {
            tao: {
                options: {
                    cwd: '<%=itemsDir%>',
                    repository: 'https://github.com/oat-sa/tao-core.git',
                    // branch: 'develop',
                    directory: 'tao'
                }
            },
            taoItems: {
                options: {
                    cwd: '<%=itemsDir%>',
                    repository: 'https://github.com/oat-sa/extension-tao-item.git',
                    // branch: 'develop',
                    directory: 'taoItems'
                }
            },
            taoQtiItem: {
                options: {
                    cwd: '<%=itemsDir%>',
                    repository: 'https://github.com/oat-sa/extension-tao-itemqti.git',
                    // branch: 'develop',
                    directory: 'taoQtiItem'
                }
            }
        },

        copy: {
            itemsConfig: {
                src: '<%=itemsDir%>/config/config.js.dist',
                dest: '<%=itemsDir%>/config/config.js',
                options: {
                    process: function (content) {
                        return content
                            .replace(/__UI\/THEMES__/g, JSON.stringify(uiThemesTemplate))
                            .replace(/__LOCALHOST__/g, 'http://' + HOST + ':' + PORT);
                    }
                }
            },
            itemsLocales: {
                src: '<%=itemsDir%>/config/messages.json.dist',
                dest: '<%=itemsDir%>/tao/views/locales/en-US/messages.json'
            }
        }
    });


    grunt.loadNpmTasks('grunt-contrib-connect');

    grunt.registerTask('compile', 'to be used with a profile id, for example: grunt compile:profileId', function(target) {
        grunt.task.run([
            'setUserProfiles',
            'setActiveProfile:' + target,
            'clean:sass',
            'sass:compile',
            'notify:sass'
        ]);
    });

    grunt.registerTask('dev', 'to be used with a profile id, for example: grunt dev:profileId', function(target) {
        grunt.task.run([
            'setUserProfiles',
            'setActiveProfile:' + target,
            'watch:sass'
        ]);
    });

    grunt.registerTask('setUserProfiles', function setUserProfiles() {
        var userProfiles;
        try {
            userProfiles = require('./profiles.json');
        } catch (err) {
            grunt.fail.fatal('invalid or missing profiles.json');
        }
        grunt.config(['profiles', 'user'], userProfiles);
    });

    grunt.registerTask('setActiveProfile', function setActiveProfile(activeProfileId) {
        var activeProfile = grunt.config(['profiles', 'user', activeProfileId]);
        if (! activeProfile) {
            grunt.fail.fatal('invalid or missing profile id: ' + activeProfileId);
        }
        grunt.config(['profiles', 'active'], activeProfile);
    });


    // Item themes toolkit specific

    grunt.registerTask('items-init', 'initialize the item theme toolkit', [
        'clean:gitItems',
        'gitclone',
        'getItemsCssFiles',
        'copy:itemsConfig',
        'copy:itemsLocales'
    ]);

    grunt.registerTask('items-run', 'launch the item theme toolkit', [
        'connect:items::keepalive'
    ]);

    grunt.registerTask('items-refresh', 'scan the css folder for item themes', [
        'getItemsCssFiles',
        'copy:itemsConfig'
    ]);

    grunt.registerTask('getItemsCssFiles', 'detect all available css files', function getItemsCssFiles() {
        var done = this.async();
        var defaultTheme;

        function isItemCssTheme(file) {
            return file.indexOf('.css', file.length - '.css'.length) !== -1
                && file.indexOf('themes/items/') !== -1;
        }

        walker(path.join(grunt.config('itemsDir'), 'css'))
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
        },
        default: 'tao'
    };
};

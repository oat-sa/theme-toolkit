var fs = require('fs');
var path = require('path');
var walker = require('walker');


module.exports = function(grunt) {
    'use strict';

    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        devDir: 'dev-items',
        //devPort: '9001', //todo: implement this as a variable

        clean: {
            options: {
                force: true
            },
            sass: [
                '<%=profiles.active.dest%>/*/',
                '!<%=profiles.active.dest%>/.gitignore',
                '!<%=profiles.active.dest%>/readme.md'
            ],
            git: [
                '<%=devDir%>/tao',
                '<%=devDir%>/taoItems',
                '<%=devDir%>/taoQtiItem'
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

        // fixme: what am I doing here?
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
                            .replace(/__LOCALHOST__/g, 'http://localhost:9001') //fixme: I need to become a paramter
                            ;
                    }
                }
            },
            initLocales: {
                src: '<%=devDir%>/config/messages.json.dist',
                dest: '<%=devDir%>/tao/views/locales/en-US/messages.json'
            }
        },

        profiles: {
            active: '',
            user: ''
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

    grunt.registerTask('setUserProfiles', function setUserProfiles() {
        var userProfiles;
        try {
            userProfiles = require('./profiles.json');
        } catch (err) {
            grunt.fail.fatal('profiles.json does not exists or is invalid. Please copy and customize profiles.json.dist');
        }
        grunt.config(['profiles', 'user'], userProfiles);
    });

    grunt.registerTask('setActiveProfile', function setActiveProfile(activeProfileId) {
        var activeProfile = grunt.config(['profiles', 'user', activeProfileId]);
        if (! activeProfile) {
            grunt.fail.fatal('no profile found for id ' + activeProfileId);
        }
        grunt.config(['profiles', 'active'], activeProfile);
    });


    // Item themes toolkit specific

    grunt.registerTask('init', 'Initialize development directory', [/* */ 'clean:git', 'gitclone', /* */'getItemsCssFiles', 'copy']);
    grunt.registerTask('dev', 'automatically recompile themes upon file change', ['watch:sass']); //todo: remove this ?

    grunt.registerTask('getItemsCssFiles', 'detect all available css files', function getItemsCssFiles() {
        var done = this.async();
        var defaultTheme;

        function isItemCssTheme(file) {
            return file.indexOf('.css', file.length - '.css'.length) !== -1
                && file.indexOf('items') !== -1;
        }

        walker(path.join(grunt.config('devDir'), 'css'))
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

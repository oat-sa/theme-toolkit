var fs = require('fs');
var through = require('through2');
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
        },

        connect : {
            dev : {
                options: {
                    base : '.',
                    host : '<%=pkg.config.host%>',
                    port : '<%=pkg.config.port%>',
                    livereload : true,
                    middleware: function(connect, options, middlewares) {
                        middlewares.unshift(function indexHtml(req, res, next){
                            if(/index\.html$/.test(req.url)){

                                return fs.createReadStream('test/index.html')
                                  .pipe(through(function(chunk, enc, done){
                                        done(null, chunk.toString().replace('{{target}}', target).replace('{{theme}}', theme));
                                  }))
                                  .pipe(res);
                            }
                            return next();
                        });
                        return middlewares;
                    }
                }
            }
        },

        open : {
            dev : {
                path : 'http://<%=pkg.config.host%>:<%=pkg.config.port%>/test/index.html',
                app : '<%=pkg.config.browser%>'
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
    grunt.registerTask('dev', "Develop themes", ['compile', 'connect:dev', 'open:dev', 'watch:sass']);
};

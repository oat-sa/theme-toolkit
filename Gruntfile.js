var fs = require('fs');
var through = require('through2');
var profiles = require('./profiles');

module.exports = function(grunt) {
    'use strict';

    var target = grunt.option('target') || '*';
    var theme  = grunt.option('theme') || '*';
    var profile  = grunt.option('profile');

    if (!profile) {
        throw new Error('Please select a profile: grunt compile -profile={PROFILE}');
    }

    if (!profiles[profile]) {
        throw new Error('Unknow profile ' + profile + ', please check your profiles.js');
    }

    var src = profiles[profile].src;
    var dest = profiles[profile].dest;

    require('time-grunt')(grunt);
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({

        pkg    : grunt.file.readJSON('package.json'),
        target : target,
        theme  : theme,
        style  : grunt.option('style') || 'compressed',

        clean : {
            options: {
                force: true
            },
            sass : [dest]
        },

        sass : {
            options: {
                noCache: true,
                unixNewlines : true,
                loadPath : [src],
                lineNumbers : false,
                style : '<%=style%>'
            },
            compile : {
                files: [{
                    expand: true,
                    cwd: src,
                    src: ['themes/<%=target%>/<%=theme%>/theme.scss', '!themes/<%=target%>/_common/theme.scss'],
                    dest: dest,
                    ext : '.css'
                }]
            }
        },

        watch: {
            sass : {
                files : ['scss/**/*.scss'],
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

    grunt.registerTask('compile', "Compile themes", ['clean:sass', 'sass:compile']);
    grunt.registerTask('dev', "Develop themes", ['compile', 'connect:dev', 'open:dev', 'watch:sass']);
};

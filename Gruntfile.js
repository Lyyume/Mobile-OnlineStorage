'use strict';

module.exports = function (grunt){

    require('load-grunt-tasks')(grunt);
    require('time-grunt')(grunt);

    var config = {
        src: 'src',
        dist: 'dist'
    };

    grunt.initConfig({
        config: config,
        watch: {
            haml:{
                files: [
                    '<%= config.src %>/.open/{,*/}*.haml',
                    '<%= config.src %>/{,*/}*.haml'
                ],
                tasks: ['haml:go'],
                options: {
                    livereload: true
                }
            },
            sass: {
                files: [
                    '<%= config.src %>/.src/css/{,*/}*.{scss,sass}'
                ],
                tasks: ['sass:go','autoprefixer:go'],
                options: {
                    livereload: true
                }
            },
            sass2: { //.open
                files: [
                    '<%= config.src %>/.open/css/{,*/}*.{scss,sass}'
                ],
                tasks: ['sass:go2','autoprefixer:go2'],
                options: {
                    livereload: true
                }
            },
            reload: {
                files: [
                    '<%= config.src %>/.src/js/{,*/}*.js',
                    '<%= config.src %>/.src/img/{,*/}*',
                    '<%= config.src %>/.open/js/{,*/}*.js',
                    '<%= config.src %>/.open/img/{,*/}*',
                    '<%= config.src %>/.src/img/{,*/}*'
                ],
                options: {
                    livereload: true
                }
            }
        },
        haml:{
            go: {
                files: grunt.file.expandMapping(['src/*.haml','src/.open/*.haml'], './', {
                    rename: function(base, path) {
                        return base + path.replace(/\.haml$/, '.html');
                    }
                })
            }
        },
        sass:{
            go:{
                expand: true,
                cwd: '<%= config.src %>/.src/css/',
                src: ['*.{scss,sass}'],
                dest: '<%= config.src %>/.src/css/',
                ext: '.css'
            },
            go2:{ //.open
                expand: true,
                cwd: '<%= config.src %>/.open/css/',
                src: ['*.{scss,sass}'],
                dest: '<%= config.src %>/.open/css/',
                ext: '.css'
            }
        },
        autoprefixer: {
            options: {
                browsers: ['> 1%', 'last 2 versions', 'Firefox ESR', 'Opera 12.1']
            },
            go: {
                files: [{
                    expand: true,
                    cwd: 'src/.src/css/',
                    src: '{,*/}*.css',
                    dest: 'src/.src/css/'
                }]
            },
            go2: { //.open
                files: [{
                    expand: true,
                    cwd: 'src/.open/css/',
                    src: '{,*/}*.css',
                    dest: 'src/.open/css/'
                }]
            }
        },
        clean: {
            pack: {
                files: [{
                    dot: true,
                    src: [
                        '<%= config.dist %>/*'
                    ]
                }]
            }
        },
        concat: {
            options: {
                separator: ';'
            },
            pack: {
                src: [
                    '<%= config.src %>/.src/js/tool.js',
                    '<%= config.src %>/.src/js/worker.js',
                    '<%= config.src %>/.src/js/ajax.js',
                    '<%= config.src %>/.src/js/renderAndroid.js',
                    '<%= config.src %>/.src/js/main.js'
                ],
                dest: '<%= config.dist %>/.src/js/index.js'
            },
            pack2: { //.open/audio
                src: [
                    '<%= config.src %>/.open/js/audio/tool.js',
                    '<%= config.src %>/.open/js/audio/worker.js',
                    '<%= config.src %>/.open/js/audio/render.js',
                    '<%= config.src %>/.open/js/audio/main.js'
                ],
                dest: '<%= config.dist %>/.open/js/audio/audio.js'
            },
            pack3: { //.open/image
                src: [
                    '<%= config.src %>/.open/js/image/tool.js',
                    '<%= config.src %>/.open/js/image/worker.js',
                    '<%= config.src %>/.open/js/image/render.js',
                    '<%= config.src %>/.open/js/image/main.js'
                ],
                dest: '<%= config.dist %>/.open/js/image/image.js'
            },
            pack4: { //.open/text
                src: [
                    '<%= config.src %>/.open/js/text/tool.js',
                    '<%= config.src %>/.open/js/text/worker.js',
                    '<%= config.src %>/.open/js/text/ajax.js',
                    '<%= config.src %>/.open/js/text/render.js',
                    '<%= config.src %>/.open/js/text/main.js'
                ],
                dest: '<%= config.dist %>/.open/js/text/text.js'
            },
            pack5: { //.open/video
                src: [
                    '<%= config.src %>/.open/js/video/tool.js',
                    '<%= config.src %>/.open/js/video/worker.js',
                    '<%= config.src %>/.open/js/video/ajax.js',
                    '<%= config.src %>/.open/js/video/render.js',
                    '<%= config.src %>/.open/js/video/main.js'
                ],
                dest: '<%= config.dist %>/.open/js/video/video.js'
            }
        },
        cssmin: {
            pack: {
                files: {
                    '<%= config.dist %>/.src/css/android.css':[
                        '<%= config.src %>/.src/css/android.css'
                    ]
                }
            }
        },
        uglify: {
            pack: {
                files: {
                    '<%= config.dist %>/.src/js/index.js':[
                        '<%= config.dist %>/.src/js/index.js'
                    ],
                    '<%= config.dist %>/.open/js/audio/audio.js':[
                        '<%= config.dist %>/.open/js/audio/audio.js'
                    ],
                    '<%= config.dist %>/.open/js/image/image.js':[
                        '<%= config.dist %>/.open/js/image/image.js'
                    ],
                    '<%= config.dist %>/.open/js/text/text.js':[
                        '<%= config.dist %>/.open/js/text/text.js'
                    ],
                    '<%= config.dist %>/.open/js/video/video.js':[
                        '<%= config.dist %>/.open/js/video/video.js'
                    ]
                }
            }
        },
        copy: {
            pack:{
                files: [{
                    expand: true,
                    dot: true,
                    cwd: '<%= config.src %>',
                    dest: '<%= config.dist %>',
                    src: [
                        '*.html',
                        '*.command',
                        '.src/img/*.png',
                        '.src/css/fonts/*.*',
                        '.src/css/*.css',
                        '.open/*.html',
                        '.open/img/*.png',
                        '.open/css/fonts/*.*',
                        '.open/css/*.css'
                    ]
                }]
            },
            test:{
                src: '<%= config.src %>/index.html',
                dest: '<%= config.dist %>/index.html'
            }
        }
    });

    grunt.registerTask('go', [
        'haml:go',
        'sass:go',
        'autoprefixer:go',
        'sass:go2',
        'autoprefixer:go2',
        'watch'
    ]);
    grunt.registerTask('pack', [
        'clean:pack',
        'concat:pack',
        'concat:pack2',
        'concat:pack3',
        'concat:pack4',
        'concat:pack5',
//        'cssmin:pack',
        'uglify:pack',
        'copy:pack'
    ]);
};
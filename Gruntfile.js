module.exports = function(grunt) {



    grunt.loadNpmTasks('grunt-contrib-htmlmin');
    grunt.loadNpmTasks("grunt-modernizr");
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-prettysass');
    grunt.loadNpmTasks('grunt-postcss');
    grunt.loadNpmTasks("csswring");
    grunt.loadNpmTasks('grunt-contrib-csslint');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-browser-sync');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-cleanempty');
    grunt.loadNpmTasks('grunt-text-replace');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks("grunt-jsbeautifier");
    grunt.loadNpmTasks("grunt-strip-json-comments");
    grunt.loadNpmTasks('grunt-contrib-imagemin');

    /* 
        =====================================================
        Tasks config options
        =====================================================
    */
    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        globalConfig: {
            src_dir: 'src',
            bower_dir: 'bower_components',
            dest_dir: 'build'
        },


        'copy': {
            /* 
                =====================================================
                grunt-contrib-copy copy files 
                =====================================================
            */
            font_awesome: { // copy font to build directory
                files: [{
                    cwd: '<%= globalConfig.bower_dir %>/onsenui/build/css/font_awesome/fonts',
                    src: '**/*',
                    dest: '<%= globalConfig.dest_dir %>/fonts/',
                    expand: true
                }]
            },
            ionicons: { // copy font to build directory
                files: [{
                    cwd: '<%= globalConfig.bower_dir %>/onsenui/build/css/ionicons/fonts',
                    src: '**/*',
                    dest: '<%= globalConfig.dest_dir %>/fonts/',
                    expand: true
                }]
            }
        },

        'replace': {
            /* 
                =====================================================
                grunt-text-replace replaces strings in files
                =====================================================
            */
            strip_onsen_css_import: {
                src: [
                    '<%= globalConfig.dest_dir %>/css/*.css'
                ],
                overwrite: true,
                replacements: [{
                    from: '@import url("font_awesome/css/font-awesome.min.css");',
                    to: '/* @import url("font_awesome/css/font-awesome.min.css"); --- concatenated with grunt */'
                }, {
                    from: '@import url("ionicons/css/ionicons.min.css");',
                    to: '/* @import url("ionicons/css/ionicons.min.css"); --- concatenated with grunt */'
                }]
            }
        },

        'htmlmin': {
            /* 
                =====================================================
                grunt-contrib-htmlmin minifies HTML
                =====================================================
            */
            build: {
                options: {
                    removeComments: true,
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    preserveLineBreaks: true,
                },
                files: [{
                    expand: true,
                    cwd: '<%= globalConfig.src_dir %>/',
                    src: ['**/*.html'],
                    dest: '<%= globalConfig.dest_dir %>/',
                    ext: '.html',
                    extDot: 'first'
                }]
            }
        },

        'modernizr': {
            /* 
                =====================================================
                grunt-modernizr sifts through your project files, 
                gathers up your references to Modernizr tests 
                and outputs a lean, mean Modernizr machine. 
                =====================================================
            */
            build: {

                // [REQUIRED] Path to the build you're using for development.
                "devFile": "<%= globalConfig.bower_dir %>/modernizr/modernizr.js",

                // When parseFiles = true, this task will crawl all *.js, *.css, *.scss and *.sass files,
                // except files that are in node_modules/.
                // You can override this by defining a "files" array below.
                "files": {
                    "src": [
                        "<%= globalConfig.src_dir %>/scss/**/*.scss"
                    ]
                },

                // Path to save out the built file.
                "outputFile": "<%= globalConfig.dest_dir %>/js/modernizr-custom.js",

                // Based on default settings on http://modernizr.com/download/
                "extra": {
                    "shiv": false, // adds HTML5 tags support to old, old desktop browsers
                    "printshiv": false, // same
                    "load": false, // conditional loader
                    "mq": true, // tests mediaqueries in js 
                    "cssclasses": true // adds classes to html tag
                },

                // Based on default settings on http://modernizr.com/download/
                "extensibility": {
                    "addtest": false,
                    "prefixed": false,
                    "teststyles": false,
                    "testprops": false,
                    "testallprops": false,
                    "hasevents": false,
                    "prefixes": false,
                    "domprefixes": false,
                    "cssclassprefix": ""
                },

                // By default, source is uglified before saving
                "uglify": true,

                // Define any tests you want to implicitly include.
                "tests": [],

                // By default, this task will crawl your project for references to Modernizr tests.
                // Set to false to disable.
                "parseFiles": true,

                // This handler will be passed an array of all the test names passed to the Modernizr API, and will run after the API call has returned
                // "handler": function (tests) {},

                // When parseFiles = true, matchCommunityTests = true will attempt to
                // match user-contributed tests.
                "matchCommunityTests": false,

                // Have custom Modernizr tests? Add paths to their location here.
                "customTests": []
            }
        },

        'prettysass': {
            /* 
                    =====================================================
                    Normalizes indentation in SASS files
                    =====================================================
            */
            options: {
                alphabetize: false
            },
            app: {
                src: ['<%= globalConfig.src_dir %>/scss/**/*.scss']
            },
        },

        'sass': {
            /* 
              =====================================================
              grunt-contrib-sass compiles .scss files (Sass) into
              .css files. Sass is a preprocessor that adds nested 
              rules, variables, mixins and functions, selector 
              inheritance, and more to CSS. Sass files compile 
              into well-formatted, standard CSS to use in your 
              site or application.
              =====================================================
            */
            dist: {
                options: {
                    style: 'compressed',
                    sourcemap: 'inline',
                    trace: true,
                    lineNumbers: false
                },
                files: [{
                    expand: true,
                    cwd: '<%= globalConfig.src_dir %>/scss/',
                    src: ['**/*.scss'],
                    dest: '<%= globalConfig.dest_dir %>/css/',
                    ext: '.compiled.css',
                    extDot: 'first'
                }]
            }
        },

        'concat': {
            /* 
              =====================================================
              grunt-contrib-concat concatenates styles and scripts
              =====================================================
            */
            options: {
                sourceMap: true,
                sourceMapStyle: 'file',
                stripBanners: false,
                banner: '/*! <%= pkg.name %> - v<%= pkg.version %> - ' +
                    '<%= grunt.template.today("yyyy-mm-dd") %> */',
            },
            css: {
                src: [
                    '<%= globalConfig.bower_dir %>/onsenui/build/css/onsenui.css',
                    '<%= globalConfig.bower_dir %>/onsenui/build/css/onsen-css-components.css',
                    '<%= globalConfig.bower_dir %>/onsenui/build/css/ionicons/css/ionicons.css',
                    '<%= globalConfig.bower_dir %>/onsenui/build/css/font_awesome/css/font-awesome.css',
                    '<%= globalConfig.dest_dir %>/css/common.compiled.css'
                ],
                dest: '<%= globalConfig.dest_dir %>/css/concat.css',
            },
            js: {
                src: [
                    '<%= globalConfig.dest_dir %>/js/modernizr-custom.js',
                    '<%= globalConfig.bower_dir %>/angular/angular.js',
                    '<%= globalConfig.bower_dir %>/onsenui/build/js/onsenui.js',
                    '<%= globalConfig.src_dir %>/js/app.js'
                ],
                dest: '<%= globalConfig.dest_dir %>/js/concat.js'
            }
        },

        'postcss': {
            /* 
                  =====================================================
                  grunt-postCSS is a tool for transforming CSS with JS 
                  plugins. These plugins can support variables and 
                  mixins, transpile future CSS syntax, inline images, 
                  and more. PostCSS can do the same work as 
                  preprocessors like Sass, Less, and Stylus. 
                  But PostCSS is modular, 3-30 times faster, and much 
                  more powerful.
                  =====================================================
            */

            options: {
                map: true,
                processors: [
                    require('pixrem')(), // add fallbacks for rem units
                    require('autoprefixer-core')({ // add vendor prefixes
                        browsers: [
                            'and_chr >41',
                            'chrome >41',
                            'and_uc >9.9',
                            'firefox >38',
                            'ie >9',
                            'ie_mob >9',
                            'edge >1',
                            'ios_saf >6',
                            'safari >7'
                        ]
                    }),
                    require('csswring')({
                      map: true
                    })
                    //                    require('cssnano')()
                ]
            },
            dist: {
                src: '<%= globalConfig.dest_dir %>/css/concat.css',
                dest: '<%= globalConfig.dest_dir %>/css/app.min.css'
            }
        },

        'csslint': {
            /* 
                =====================================================
                grunt-contrib-htmlmin minifies HTML
                =====================================================
            */
            sass: {
                options: {
                    "important": false,
                    "adjoining-classes": false,
                    "known-properties": true,
                    "box-sizing": false,
                    "box-model": false,
                    "overqualified-elements": true,
                    "display-property-grouping": true,
                    "bulletproof-font-face": 2,
                    "compatible-vendor-prefixes": false,
                    "regex-selectors": false,
                    "errors": true,
                    "duplicate-background-images": false,
                    "duplicate-properties": true,
                    "empty-rules": true,
                    "selector-max-approaching": true,
                    "gradients": false,
                    "fallback-colors": false,
                    "font-sizes": false,
                    "font-faces": false,
                    "floats": false,
                    "star-property-hack": false,
                    "outline-none": false,
                    "import": false,
                    "ids": false,
                    "underscore-property-hack": false,
                    "rules-count": false,
                    "qualified-headings": false,
                    "selector-max": false,
                    "shorthand": true,
                    "text-indent": false,
                    "unique-headings": false,
                    "universal-selector": true,
                    "unqualified-attributes": true,
                    "vendor-prefix": true,
                    "zero-units": true,
                },
                src: ['<%= globalConfig.dest_dir %>/css/**/*.compiled.css']
            }
        },

        'uglify': {
            /* 
                    =====================================================
                    JavaScript minification and obfuscation
                    =====================================================
            */
            js: {
                files: {
                    '<%= globalConfig.dest_dir %>/js/app.min.js': '<%= globalConfig.dest_dir %>/js/concat.js'
                },
                options: {

                    /* 
                      this should allow minification of Angular code; if it doesn't, try ngAnnotate grunt plugin. 
                      https://www.reddit.com/r/angularjs/comments/2dvh97/why_exactly_cant_you_uglify_mangletrue_angular/
                      https://www.reddit.com/r/angularjs/comments/2dvh97/why_exactly_cant_you_uglify_mangletrue_angular/
                      http://www.sitepoint.com/5-minutes-to-min-safe-angular-code-with-grunt/
                    */
                    mangle: false,

                    ASCIIOnly: true,

                    sourceMap: true,
                    sourceMapIn: '<%= globalConfig.dest_dir %>/js/concat.js.map'
                }
            }
        },

        'jsbeautifier': {
            /* 
                    =====================================================
                    Normalizes indentation in JS and HTML files
                    =====================================================
            */
            files: [
                "<%= globalConfig.src_dir %>/js/**/*.js",
                "<%= globalConfig.src_dir %>/**/*.json",
                "<%= globalConfig.src_dir %>/**/*.html"
            ],
            options: {

                html: {
                    braceStyle: "collapse",
                    indentChar: " ",
                    indentScripts: "keep",
                    indentSize: 2,
                    maxPreserveNewlines: 10,
                    preserveNewlines: true,
                    unformatted: ["a", "sub", "sup", "b", "i", "u"],
                    wrapLineLength: 0
                },
                css: {
                    indentChar: " ",
                    indentSize: 2
                },
                js: {
                    braceStyle: "collapse",
                    breakChainedMethods: false,
                    e4x: false,
                    evalCode: false,
                    indentChar: " ",
                    indentLevel: 0,
                    indentSize: 2,
                    indentWithTabs: false,
                    jslintHappy: false,
                    keepArrayIndentation: false,
                    keepFunctionIndentation: false,
                    maxPreserveNewlines: 10,
                    preserveNewlines: true,
                    spaceBeforeConditional: true,
                    spaceInParen: false,
                    unescapeStrings: false,
                    wrapLineLength: 0,
                    endWithNewline: true
                }
            }
        },

        'stripJsonComments': {
            build: {
                files: [{
                    expand: true,
                    cwd: '<%= globalConfig.src_dir %>/',
                    src: ['**/*.json'],
                    dest: '<%= globalConfig.dest_dir %>/'
                }]
            }
        },

        'imagemin': {
            build: {
                options: {
                    optimizationLevel: 3,
                    progressive: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= globalConfig.src_dir %>/',
                    src: ['**/*.{png,jpg,gif}'],
                    dest: '<%= globalConfig.dest_dir %>/'
                }]
            }
        },

        'clean': {
            /* 
                    =====================================================
                    delete temporary or generated files 
                    =====================================================
            */
            dest_dir: ["<%= globalConfig.dest_dir %>/**/*.*"],
    
            css: [
                "<%= globalConfig.dest_dir %>/css/**/*.css", "!<%= globalConfig.dest_dir %>/css/**/*.min.css",
                "<%= globalConfig.dest_dir %>/css/**/*.map", "!<%= globalConfig.dest_dir %>/css/**/*.min.css.map",
            ],

            js: [
                "<%= globalConfig.dest_dir %>/js/**/*.js",  "!<%= globalConfig.dest_dir %>/js/**/*.min.js",
                "<%= globalConfig.dest_dir %>/js/**/*.map", "!<%= globalConfig.dest_dir %>/js/**/*.min.js.map"
            ]
        },

        'cleanempty': {
            options: {
                folders: true,
                files: false,
                noJunk: true
            },
            src: ['build/**/*']
        },

        'watch': {
            /* 
                    =====================================================
                    Run tasks whenever watched files change
                    =====================================================
            */
            html: {
                files: ['<%= globalConfig.src_dir %>/**/*.html'],
                tasks: ['jsbeautifier', 'htmlmin']
            },
            css: {
                // We watch and compile sass files but don't live reload here
                files: ['<%= globalConfig.src_dir %>/**/*.scss'],
                tasks: ['stylesheets']
            },
            js: {
                files: ['<%= globalConfig.src_dir %>/**/*.{js,json}'],
                tasks: ['javascripts']
            }
        },

        'browserSync': {
            /* 
                    =====================================================
                    Live reload the browser, synchs URLs, interactions 
                    and code changes across multiple devices. 
                    =====================================================
            */
            bsFiles: {
                src: ['<%= globalConfig.dest_dir %>/css/*.css', '<%= globalConfig.dest_dir %>/*.html']
            },
            options: {
                watchTask: true,
                server: {
                    baseDir: "./<%= globalConfig.dest_dir %>/"
                }
            }
        }

    });


    /* 
        =====================================================
        If you're not behind a proxy you should call directly
        the modernizr task and not cache-modernizr.
        =====================================================
    */
    var fs = require('fs');
    grunt.registerTask('modernizr-pre', function() {

        grunt.log.write("\n\n\n*** WARNING: use cache-modernizr only if you can't bypass proxy\n\n\n");

        var now = new Date();
        grunt.file.recurse('node_modules/grunt-modernizr/lib/cache', function(abspath) {
            fs.utimesSync(abspath, now, now);
        });

    });


    grunt.registerTask('copy-fonts', [
        'copy:font_awesome',
        'copy:ionicons'
    ]);

    grunt.registerTask('javascripts', [
        'jsbeautifier',
        'stripJsonComments',
        'concat:js',
        'uglify:js',
        'clean:js'
    ]);

    grunt.registerTask('stylesheets', [
        'prettysass',
        'sass',
        'csslint:sass',
        'concat:css',
        'replace:strip_onsen_css_import',        
        'postcss',
        'clean:css',
    ]);

    grunt.registerTask('cache-modernizr', [
        'modernizr-pre',
        'modernizr'
    ]);

    grunt.registerTask('default', [
        "clean:dest_dir",
        "cleanempty",
        "htmlmin",
        "imagemin",
        "copy",
        "cache-modernizr",
        "stylesheets",
        "javascripts",
        "browserSync",
        "watch" /* must be after BrowserSync*/
    ]);



};

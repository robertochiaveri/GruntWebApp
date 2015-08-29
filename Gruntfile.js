module.exports = function(grunt) {
  "use strict";


  grunt.loadNpmTasks("grunt-contrib-htmlmin");
  grunt.loadNpmTasks("grunt-modernizr");
  grunt.loadNpmTasks("grunt-contrib-sass");
  grunt.loadNpmTasks("grunt-prettysass");
  grunt.loadNpmTasks("grunt-postcss");
  grunt.loadNpmTasks("csswring");
  grunt.loadNpmTasks("grunt-scss-lint");
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-browser-sync");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-cleanempty");
  grunt.loadNpmTasks("grunt-text-replace");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-jsbeautifier");
  grunt.loadNpmTasks("grunt-strip-json-comments");
  grunt.loadNpmTasks("grunt-contrib-imagemin");

  grunt.initConfig({


    /* 
      =====================================================
      Global options
      =====================================================
    */
    pkg: grunt.file.readJSON("package.json"),

    globalConfig: {
      srcDir: "src",
      bowerDir: "bower_components",
      destDir: "build"
    },



    "copy": {
      /* 
        =====================================================
        grunt-contrib-copy copy files 
        =====================================================
      */
      fonts: { // copy font to build directory
        files: [{
          src: "<%= globalConfig.srcDir %>/fonts/**/fonts/**/*.{eot,svg,ttf,woff}",
          dest: "<%= globalConfig.destDir %>/fonts/",
          expand: true,
          flatten: true
        }]
      }
    },

    "replace": {
      /* 
        =====================================================
        grunt-text-replace replaces strings in files
        =====================================================
      */
      build: {
        src: [
          /*"<%= globalConfig.destDir %>/subdir/*.ext"*/
        ],
        overwrite: true,
        replacements: [{
          from: "/* something */",
          to: "/* something else*/"
        }]
      }
    },

    "htmlmin": {
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
          cwd: "<%= globalConfig.srcDir %>/",
          src: ["**/*.html","!fonts/**"],
          dest: "<%= globalConfig.destDir %>/",
          ext: ".html",
          extDot: "first"
        }]
      }
    },

    "modernizr": {
      /* 
        =====================================================
        grunt-modernizr sifts through your project files, 
        gathers up your references to Modernizr tests 
        and outputs a lean, mean Modernizr machine. 
        =====================================================
      */
      build: {

        // [REQUIRED] Path to the build you"re using for development.
        "devFile": "<%= globalConfig.bowerDir %>/modernizr/modernizr.js",

        // When parseFiles = true, this task will crawl all *.js, *.css, *.scss and *.sass files,
        // except files that are in node_modules/.
        // You can override this by defining a "files" array below.
        "files": {
          "src": [
            "<%= globalConfig.srcDir %>/scss/**/*.scss",
            "<%= globalConfig.srcDir %>/js/**/*.js"
          ]
        },

        // Path to save out the built file.
        "outputFile": "<%= globalConfig.destDir %>/js/modernizr-custom.js",

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

    "prettysass": {
      /* 
          =====================================================
          Normalizes indentation in SASS files
          =====================================================
      */
      options: {
        alphabetize: false
      },
      app: {
        src: ["<%= globalConfig.srcDir %>/scss/**/*.scss"]
      },
    },

    "scsslint": {
      /* 
        =====================================================
        grunt-scss-lint lints the scss source
        =====================================================
      */

      build: [
        "<%= globalConfig.srcDir %>/scss/**/*.scss",
      ],
      options: {
        config: ".scss-lint.yml",
        compact: true,
        colorizeOutput: true,
        force: true
      },
    },

    "sass": {
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
          style: "compressed",
          sourcemap: "inline",
          trace: true,
          lineNumbers: false
        },
        files: [{
          expand: true,
          cwd: "<%= globalConfig.srcDir %>/scss/",
          src: ["**/*.scss"],
          dest: "<%= globalConfig.destDir %>/css/",
          ext: ".compiled.css",
          extDot: "first"
        }]
      }
    },

    "concat": {
      /* 
        =====================================================
        grunt-contrib-concat concatenates styles and scripts
        =====================================================
      */
      options: {
        sourceMap: true,
        sourceMapStyle: "file",
        stripBanners: false,
        banner: "/*! <%= pkg.name %> - v<%= pkg.version %> - " +
          "<%= grunt.template.today('yyyy-mm-dd') %> */",
      },

      css: {
        src: [
          "<%= globalConfig.destDir %>/css/main.compiled.css"
        ],
        dest: "<%= globalConfig.destDir %>/css/concat.css",
      },

      js: {
        src: [
          "<%= globalConfig.destDir %>/js/modernizr-custom.js",
          "<%= globalConfig.srcDir %>/js/app.js"
        ],
        dest: "<%= globalConfig.destDir %>/js/concat.js"
      }
    },

    "postcss": {
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
          require("pixrem")(), // add fallbacks for rem units
          require("autoprefixer-core")({ // add vendor prefixes
            browsers: [
              "and_chr >41",
              "chrome >41",
              "and_uc >9.9",
              "firefox >38",
              "ie >9",
              "ie_mob >9",
              "edge >1",
              "ios_saf >6",
              "safari >7"
            ]
          }),
          require("csswring")({
            map: true
          })
          //                    require("cssnano")()
        ]
      },
      dist: {
        src: "<%= globalConfig.destDir %>/css/concat.css",
        dest: "<%= globalConfig.destDir %>/css/app.min.css"
      }
    },

    "uglify": {
      /* 
          =====================================================
          JavaScript minification and obfuscation
          =====================================================
      */
      js: {
        files: {
          "<%= globalConfig.destDir %>/js/app.min.js": "<%= globalConfig.destDir %>/js/concat.js"
        },
        options: {

          /* 
            this should allow minification of Angular code; if it doesn"t, try ngAnnotate grunt plugin. 
            https://www.reddit.com/r/angularjs/comments/2dvh97/why_exactly_cant_you_uglify_mangletrue_angular/
            https://www.reddit.com/r/angularjs/comments/2dvh97/why_exactly_cant_you_uglify_mangletrue_angular/
            http://www.sitepoint.com/5-minutes-to-min-safe-angular-code-with-grunt/
          */
          mangle: false,

          ASCIIOnly: true,

          sourceMap: true,
          sourceMapIn: "<%= globalConfig.destDir %>/js/concat.js.map"
        }
      }
    },

    "jsbeautifier": {
      /* 
          =====================================================
          Normalizes indentation in JS and HTML files
          =====================================================
      */
      build: {
        src: [
          "<%= globalConfig.srcDir %>/js/**/*.js",
          "<%= globalConfig.srcDir %>/**/*.json",
          "<%= globalConfig.srcDir %>/**/*.html",
          "!<%= globalConfig.srcDir %>/fonts/**"
        ],
        options: {
          config: ".jsbeautifyrc"
        }
      }
    },

    "stripJsonComments": {
      build: {
        files: [{
          expand: true,
          cwd: "<%= globalConfig.srcDir %>/",
          src: ["**/*.json","!fonts/**"],
          dest: "<%= globalConfig.destDir %>/"
        }]
      }
    },

    "imagemin": {
      build: {
        options: {
          optimizationLevel: 3,
          progressive: true
        },
        files: [{
          expand: true,
          cwd: "<%= globalConfig.srcDir %>/",
          src: ["**/*.{png,jpg,gif}"],
          dest: "<%= globalConfig.destDir %>/"
        }]
      }
    },

    "clean": {
      /* 
          =====================================================
          delete temporary or generated files 
          =====================================================
      */
      destDir: ["<%= globalConfig.destDir %>/**/*.*", "!*.gitignore"],

      css: [
        "<%= globalConfig.destDir %>/css/**/*.css",
        "!<%= globalConfig.destDir %>/css/**/*.min.css",
        "<%= globalConfig.destDir %>/css/**/*.map",
        "!<%= globalConfig.destDir %>/css/**/*.min.css.map",
      ],

      js: [
        "<%= globalConfig.destDir %>/js/**/*.js",
        "!<%= globalConfig.destDir %>/js/**/*.min.js",
        "<%= globalConfig.destDir %>/js/**/*.map",
        "!<%= globalConfig.destDir %>/js/**/*.min.js.map"
      ]
    },

    "cleanempty": {
      options: {
        folders: true,
        files: false,
        noJunk: true
      },
      src: ["build/**/*"]
    },

    "watch": {
      /* 
          =====================================================
          Run tasks whenever watched files change
          =====================================================
      */
      html: {
        files: ["<%= globalConfig.srcDir %>/**/*.html"],
        tasks: ["jsbeautifier", "htmlmin"]
      },
      css: {
        // We watch and compile sass files but don"t live reload here
        files: ["<%= globalConfig.srcDir %>/**/*.scss"],
        tasks: ["modernizr","stylesheets"]
      },
      js: {
        files: ["<%= globalConfig.srcDir %>/**/*.{js,json}"],
        tasks: ["modernizr","javascripts"]
      }
    },

    "browserSync": {
      /* 
          =====================================================
          Live reload the browser, synchs URLs, interactions 
          and code changes across multiple devices. 
          =====================================================
      */
      bsFiles: {
        src: ["<%= globalConfig.destDir %>/css/*.css",
          "<%= globalConfig.destDir %>/*.html"
        ]
      },
      options: {
        watchTask: true,
        server: {
          baseDir: "./<%= globalConfig.destDir %>/"
        }
      }
    }

  });



  grunt.registerTask("javascripts", [
    "jsbeautifier",
    "stripJsonComments",
    "concat:js",
    "uglify:js",
    "clean:js"
  ]);

  grunt.registerTask("stylesheets", [
    "prettysass",
    "sass",
    "scsslint",
    "concat:css",
    "replace",
    "postcss",
    "clean:css",
  ]);

  grunt.registerTask("default", [
    "clean:destDir",
    "cleanempty",
    "htmlmin",
    "imagemin",
    "copy",
    "modernizr",
    "stylesheets",
    "javascripts",
    "browserSync",
    "watch" /* must be after BrowserSync*/
  ]);


};


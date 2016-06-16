var prefixer = require('autoprefixer')({
  browsers: [ 'last 2 versions', '> 5%', 'Android >= 4', 'Chrome >= 40', 'Explorer >= 10', 'iOS >= 7', ],
  cascade: false
});
var sass = require('gulp-sass');
var postcss = require('gulp-postcss');
var mqpacker = require('css-mqpacker');
var cssmin = require('csswring');
var sass_settings = { outputStyle: 'expanded' };
var postcss_settings = [ prefixer, mqpacker ];

module.exports = function (gulp, $, globals) {
  return {
    default: function() {
     if(globals.options.production) {
       gulp.src([`./${globals.local_paths.lib}/**/*.{${globals.lib_included_files.css}}`])
         .pipe(sass(sass_settings).on('error', sass.logError)) // run the sass
         .pipe(postcss(postcss_settings)) // run all postcss processing
         .pipe(gulp.dest(globals.destination_paths.lib)) // push the expanded to the destination
         .pipe(postcss([ // minify the css
           cssmin({
             preserveHacks: true,
             removeAllComments: true
           })
         ]))
         .pipe($.rename({ suffix: '.min' })) // rename our file to .min.css
         .pipe(gulp.dest(globals.destination_paths.lib)); // write our minified sass file to it's destination
     }
     else {
       gulp.src([`./${globals.local_paths.lib}/**/*.{${globals.lib_included_files.css}}`])
         .pipe($.sourcemaps.init()) // create sourcemaps
         .pipe(sass(sass_settings)) // run the sass //.on('error', sass.logError)
         .pipe(postcss(postcss_settings)) // run all postcss processing
         .pipe($.rename({ suffix: '.min' })) // rename our file to .min.css
         .pipe($.sourcemaps.write()) // write our sourcemaps file to the destination
         .pipe(gulp.dest(globals.destination_paths.lib)); // write our sass file to it's destination
     }

    },
    watch: function() {
      gulp.watch(`./${globals.local_paths.lib}/**`, ['css']);
    }
  };
};
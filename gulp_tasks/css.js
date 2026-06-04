var prefixer = require('autoprefixer')({
  overrideBrowserslist: [ 'last 2 versions', '> 5%', 'Android >= 4', 'Chrome >= 40', 'Explorer >= 10', 'iOS >= 7', ],
  cascade: false
});
var sass = require('gulp-sass')(require('sass'));
var postcss = require('gulp-postcss');
var mqpacker = require('css-mqpacker');
var cssmin = require('csswring');
var sass_settings = { outputStyle: 'expanded' };
var postcss_settings = [ prefixer, mqpacker ];

module.exports = function (gulp, $, globals) {
  return {
    default: function() {
     if(globals.options.production) {
       return gulp.src([`./${globals.local_paths.lib}/**/*.{${globals.lib_included_files.css}}`])
         .pipe(sass(sass_settings).on('error', sass.logError))
         .pipe(postcss(postcss_settings))
         .pipe(gulp.dest(globals.destination_paths.lib))
         .pipe(postcss([
           cssmin({
             preserveHacks: true,
             removeAllComments: true
           })
         ]))
         .pipe($.rename({ suffix: '.min' }))
         .pipe(gulp.dest(globals.destination_paths.lib));
     }
     else {
       return gulp.src([`./${globals.local_paths.lib}/**/*.{${globals.lib_included_files.css}}`])
         .pipe($.sourcemaps.init())
         .pipe(sass(sass_settings))
         .pipe(postcss(postcss_settings))
         .pipe($.rename({ suffix: '.min' }))
         .pipe($.sourcemaps.write())
         .pipe(gulp.dest(globals.destination_paths.lib));
     }
    },
    watch: function() {
      gulp.watch(`./${globals.local_paths.lib}/**`, gulp.series('css'));
    }
  };
};
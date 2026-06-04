var prefixer = require('autoprefixer')({
  overrideBrowserslist: [ 'last 2 versions', '> 5%', 'Android >= 4', 'Chrome >= 40', 'Explorer >= 10', 'iOS >= 7', ],
  cascade: false
});
var babel_settings = {
  presets: ['es2015']
}
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');

module.exports = function (gulp, $, globals) {
  return {
    default: function() {
      if(globals.options.production) {
       return gulp.src([`./${globals.local_paths.lib}/**/*.{${globals.lib_included_files.js}}`])
         .pipe(babel(babel_settings))
         .pipe(gulp.dest(globals.destination_paths.lib))
         .pipe($.rename({ suffix: '.min' }))
         .pipe(uglify())
         .pipe(gulp.dest(globals.destination_paths.lib));
      }
      else {
       return gulp.src([`./${globals.local_paths.lib}/**/*.{${globals.lib_included_files.js}}`])
         .pipe($.sourcemaps.init())
         .pipe(babel(babel_settings))
         .pipe($.rename({ suffix: '.min' }))
         .pipe($.sourcemaps.write())
         .pipe(gulp.dest(globals.destination_paths.lib));
      }
    },
    watch: function() {
      gulp.watch(`./${globals.local_paths.lib}/**`, gulp.series('javascript'));
    }
  };
};

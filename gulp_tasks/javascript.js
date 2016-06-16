var prefixer = require('autoprefixer')({
  browsers: [ 'last 2 versions', '> 5%', 'Android >= 4', 'Chrome >= 40', 'Explorer >= 10', 'iOS >= 7', ],
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
       gulp.src([`./${globals.local_paths.lib}/**/*.{${globals.lib_included_files.js}}`])
         .pipe(babel(babel_settings))
         .pipe(gulp.dest(globals.destination_paths.lib)) // push the expanded to the destination
         .pipe($.rename({ suffix: '.min' })) // rename our file to .min.css
         .pipe(uglify()) // minify the javascript
         .pipe(gulp.dest(globals.destination_paths.lib)); // write our minified sass file to it's destination
      }
      else {
       gulp.src([`./${globals.local_paths.lib}/**/*.{${globals.lib_included_files.js}}`])
         .pipe($.sourcemaps.init()) // create sourcemaps
         .pipe(babel(babel_settings))
         .pipe($.rename({ suffix: '.min' })) // rename our file to .min.css
         .pipe($.sourcemaps.write()) // write our sourcemaps file to the destination
         .pipe(gulp.dest(globals.destination_paths.lib)); // write our sass file to it's destination
      }
    },
    watch: function() {
      gulp.watch(`./${globals.local_paths.lib}/**`, ['javascript']);
    }
  };
};

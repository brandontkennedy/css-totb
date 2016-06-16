var imagemin = require('gulp-imagemin');
var imagemin_settings = {
  progressive: true,
  svgoPlugins: [ { removeViewBox: false } ],
  interlaced: true
};

module.exports = function (gulp, $, globals) {
  return {
    default: function() {
     if(globals.options.production) {
       // non-svgs can be optimized
       gulp.src([`./${globals.local_paths.lib}/**/*.{${globals.lib_included_files.images}}`])
         .pipe(imagemin(imagemin_settings)) // minify what images we can
           .on('error', function(err) {
             console.log(err);
             this.emit('end'); // eslint-disable-line
           })
         .pipe(gulp.dest(globals.destination_paths.lib)); // write our images to the destination
     }
     else {
       gulp.src([`./${globals.local_paths.lib}/**/*.{${globals.lib_included_files.images}}`])
         .pipe(gulp.dest(globals.destination_paths.lib)); // write our images to the destination
     }

    },
    watch: function() {
      gulp.watch(`./${globals.local_paths.lib}/**`, ['images']);
    }
  };
};

var filter = require('gulp-filter');

module.exports = function (gulp, $, globals) {
  return {
    default: function() {
      var filter_on = `${globals.lib_included_files.js},${globals.lib_included_files.css},${globals.lib_included_files.images}`.split(',');
      var filters = [ '**/*.*' ];
      for(var i = 0; i < filter_on.length; i++){
        filters.push(`!**/*.${filter_on[i]}`);
      }
      // straight up copy over anything that didn't have special processing
      gulp.src([`./${globals.local_paths.lib}/**/`])
        .pipe(filter(filters)) // exclude :allthethings: we already process
        .pipe(gulp.dest(globals.destination_paths.lib));
    },
    clean: function() {
      $.del([ `${globals.destination_paths.lib}/*`], { dryRun: globals.dry_run, force: true }).then(paths => {
       console.log('Deleted lib files and folders:\n', paths.join('\n'));
      });
    },
    watch: function() {
      gulp.watch(`./${globals.local_paths.lib}/**`, ['lib']);
    }
  };
};

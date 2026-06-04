var filter = require('gulp-filter');

module.exports = function (gulp, $, globals) {
  return {
    default: function() {
      var filter_on = `${globals.lib_included_files.js},${globals.lib_included_files.css},${globals.lib_included_files.images}`.split(',');
      var filters = [ '**/*.*' ];
      for(var i = 0; i < filter_on.length; i++){
        filters.push(`!**/*.${filter_on[i]}`);
      }
      return gulp.src([`./${globals.local_paths.lib}/**/`])
        .pipe(filter(filters))
        .pipe(gulp.dest(globals.destination_paths.lib));
    },
    clean: function(done) {
      $.del([ `${globals.destination_paths.lib}/*`], { dryRun: globals.dry_run, force: true }).then(paths => {
       console.log('Deleted lib files and folders:\n', paths.join('\n'));
       done();
      });
    },
    watch: function() {
      gulp.watch(`./${globals.local_paths.lib}/**`, gulp.series('lib'));
    }
  };
};

var pug = require('gulp-pug');

module.exports = function (gulp, plugins, globals, subtask) {
  return {
    default: function() {
      gulp.src([`./${globals.local_paths.view}/**/*.pug`])
        .pipe(pug({pretty: true}))
        .pipe(gulp.dest(globals.destination_paths.view));

      gulp.src([`./${globals.local_paths.view}/**/*.html`])
        .pipe(gulp.dest(globals.destination_paths.view));
    },
    clean: function() {
      plugins.del([ `${globals.destination_paths.view}/*`], { dryRun: globals.dry_run, force: true }).then(paths => {
       console.log('Deleted view files and folders:\n', paths.join('\n'));
      });
    },
    watch: function() {
      gulp.watch(`./${globals.local_paths.view}/**`, ['view']);
    }
  };
};

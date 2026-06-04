'use strict';

const gulp = require('gulp');
const pkg = require('./package.json');
const minimist = require('minimist');
const connect = require('gulp-connect');

// set up our defaults and options
const options = minimist(process.argv.slice(2), {
  default: {
    production: false
  }
});

// these are used by our gulp tasks
const plugins = {
  spawn: require('child_process').spawnSync,
  chalk: require('chalk'),
  del: require('del'),
  rename: require('gulp-rename'),
  if: require('gulp-if'),
  sourcemaps: require('gulp-sourcemaps')
}
const globals = {
  options: options,
  dry_run: false,
  destination_paths: {
    view: `dist/view`,
    lib: `dist/lib`
  },
  local_paths: {
    view: `app/view`,
    lib: `app/lib`
  },
  lib_included_files: {
    js: `js,jsm`,
    css: `sass,scss,css`,
    images: `jpg,jpeg,png,gif,svg,io,ico`
  }
}

// get the abstracted gulp tasks so we can keep our logic for each thing separated out
function getTask(task, subtask) {
  let sub = subtask || 'default';
  let tasks = require('./gulp_tasks/' + task)(gulp, plugins, globals);
  if(tasks[sub]){
   return tasks[sub];
  }
  return tasks;
}

// Util tasks
gulp.task('default', getTask('init'));

// Main tasks
const files = [ 'view', 'lib'];
var tasks = {
  clean: [],
  watch: [],
  build: []
};

for(var file of files) {
  gulp.task(`${file}`, getTask(`${file}`, `default`));
  gulp.task(`${file}:clean`, getTask(`${file}`, `clean`));
  gulp.task(`${file}:watch`, gulp.series(`${file}`, getTask(`${file}`, `watch`)));

  tasks.clean.push(`${file}:clean`);
  tasks.watch.push(`${file}:watch`);
  tasks.build.push(`${file}`);
}

// lib-specific tasks
const libs = [ 'css', 'javascript', 'images' ];
for(var lib of libs) {
  gulp.task(`${lib}`, getTask(`${lib}`, `default`));
  gulp.task(`${lib}:watch`, gulp.series(`${lib}`, getTask(`${lib}`, `watch`)));

  tasks.watch.push(`${lib}:watch`);
  tasks.build.push(`${lib}`);
}

// create the default tasks, like `build` and `clean`
gulp.task('clean', gulp.parallel(...tasks.clean));
gulp.task('build', gulp.parallel(...tasks.build));

// override the `build` task if we detect `--production` build attempt
if(options.production) {
  gulp.task('build', gulp.series(...tasks.build));
}

// connect task must be defined before watch references it
gulp.task('startserver', function(done) {
  connect.server({
    port: 8888
  });
  done();
});

// override the `watch` task so we can add connect in
gulp.task('watch', gulp.series(
  'startserver',
  gulp.parallel(...tasks.watch)
));

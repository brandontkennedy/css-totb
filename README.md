# Site Boilerplate
Something to get started with for creating new sites.
All files are pushed to the `dist` folder.

## Quick Start
```js
$ npm install;
$ gulp watch;
```

## Gulp Tasks
There are a lot more gulp tasks, but these are the ones to be concerned with on a daily basis

- `gulp watch` - watches for changes (also issues clean & build commands)
- `gulp build --production` - builds a more optimized `dist` directory for deploying.

## What it does

### HTML
compiles `html` or `pug` templates (formerly `jade`)

### JS
- compiles `es6`
- sourcemaps added
- minifies
- renames to have `.min` in name
- installs `jQuery` because I just can't quit it.

### CSS
- compiles `stylus`
- adds sourcemaps
- autoprefixer
- mqpacker
- minifies
- renames to have `.min` in name

### Images
- auto-compresses images

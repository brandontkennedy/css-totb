# Site Boilerplate
Something to get started with for creating new sites.
All files are pushed to the `dist` folder.

## Requirements
Node 20

## Quick Start
```js
$ npm install;
$ gulp watch;
```

Then navigate to `http://localhost:8888/dist/view/#/`

The terminal is littered with deprecation warnings... it's fine

## Gulp Tasks
There are other gulp tasks, but these are the ones to be concerned with on a daily basis

- `gulp watch` - watches for changes (also issues clean & build commands)
- `gulp build --production` - builds a more optimized `dist` directory for deploying.

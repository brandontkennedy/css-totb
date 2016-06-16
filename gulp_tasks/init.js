const mkdirp = require('mkdirp');

module.exports = function (gulp, plugins, globals) {
  return function () {
    var bases = ['app', 'dist'];
    for(var i = 0; i < bases.length; i++) {
      mkdirp.sync(`${bases[i]}/view`, catchError);
      mkdirp.sync(`${bases[i]}/lib`, catchError);
      console.log(`created folders for ${bases[i]}`);
    }
  };
};

// yes. i am that lazy.
function catchError(err) {
  err && console.error(err);
}

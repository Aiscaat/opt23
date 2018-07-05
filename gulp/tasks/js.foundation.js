'use strict';

let uglify = require('gulp-uglify-es').default;

module.exports = function() {
  $.gulp.task('js:foundation', function() {
    return $.gulp.src($.path.jsFoundation)
      .pipe($.gp.concat('foundation.js'))
      .pipe(uglify())
      .pipe($.gulp.dest($.config.root + '/assets/js'))
  })
};

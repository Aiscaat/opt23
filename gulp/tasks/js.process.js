'use strict';

let uglify = require('gulp-uglify-es').default;
let babel = require('gulp-babel');

module.exports = () => {
    $.gulp.task('js:process', () => {
        return $.gulp.src($.path.app)
            .pipe($.gp.concat('app.js'))
            .pipe(babel({
                presets: ['env']
            }))
            .pipe(uglify())
            .pipe($.gulp.dest($.config.root + '/assets/js'))
    })
};
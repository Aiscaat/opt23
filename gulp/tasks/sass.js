'use strict';
let sassGlob = require('gulp-sass-glob');
let csso = require('gulp-csso');
let gulp = require('gulp');
let cssunit = require('gulp-css-unit');

module.exports = () => {
    $.gulp.task('sass', () => {
        return $.gulp.src('./source/style/style.sass')
            .pipe(sassGlob())
            .pipe($.gp.sass()).on('error', $.gp.notify.onError({ title: 'Style' }))
            .pipe($.gp.autoprefixer({ browsers: $.config.autoprefixerConfig }))
            .pipe(csso())
            .pipe($.gulp.dest($.config.root + '/assets/css'))
            .pipe($.browserSync.stream());
    })
};
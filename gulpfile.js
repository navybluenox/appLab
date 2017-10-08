var gulp = require('gulp'),
    del = require('del'),
    webpack = require('webpack'),
    webpackConfig = require('./webpack.config.js'),
    webpackStream = require('webpack-stream');


gulp.task('clean',()=>{
    del(['./dist/*'])
});

gulp.task('webpack',() => {
    return webpackStream(webpackConfig,webpack)
    .pipe(gulp.dest('./dist'));
});


gulp.task('default',['clean','webpack']);


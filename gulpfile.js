var gulp = require('gulp'),
    del = require('del'),
    webpack = require('webpack'),
    webpackConfig = require('./webpack.config.js'),
    webpackStream = require('webpack-stream')
    rename = require('gulp-rename'),
    header = require('gulp-header'),
    footer = require('gulp-footer'),
    runSequence = require('run-sequence');

gulp.task('clean',() => {
    return del(['./dist/*']);
});

gulp.task('webpack',() => {
    return webpackStream(webpackConfig,webpack)
        .pipe(gulp.dest('./dist'));
});

gulp.task('copyHtml',() => {
    return gulp.src('./src/html/*.html')
        .pipe(gulp.dest('./dist'))
});
gulp.task('copyCss',() => {
    return gulp.src('./src/css/*.css')
        .pipe(gulp.dest('./dist'));
});

gulp.task('addTagCss',() => {
    return gulp.src('./dist/*.css')
        .pipe(header('<style>\n'))
        .pipe(footer('\n</style>'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('addTagJs',() => {
    gulp.src('./dist/app-client.bundle.js')
        .pipe(header('<script>\n'))
        .pipe(footer('\n</script>'))
        .pipe(gulp.dest('./dist'));
});

gulp.task('renameHtml',() => {
    return gulp.src('./dist/*.html')
        .pipe(rename({prefix:'html_'}))
        .pipe(gulp.dest('./dist'));
});

gulp.task('renameCss',() => {
    return gulp.src('./dist/*.css')
        .pipe(rename({prefix:'css_',extname:'.html'}))
        .pipe(gulp.dest('./dist'));
});

gulp.task('renameJs',() => {
    return gulp.src('./dist/app-client.bundle.js')
        .pipe(rename({prefix:'js_',basename:'client',extname:'.html'}))
        .pipe(gulp.dest('./dist'));
});
gulp.task('renameGas',() => {
    return gulp.src('./dist/app-server.bundle.js')
        .pipe(rename({prefix:'gas_',basename:'server'}))
        .pipe(gulp.dest('./dist'));
});

gulp.task('remove',() => {
    del([
        './dist/*.html',
        './dist/*.js',
        './dist/*.css',
        './dist/*.map',
        '!./dist/html_*.html',
        '!./dist/css_*.html',
        '!./dist/js_*.html',
        '!./dist/gas_*.js'
    ]);
});

gulp.task('default',callback => {
    return runSequence(
        'clean','webpack',['copyHtml','copyCss'],['addTagCss','addTagJs'],['renameHtml','renameCss','renameJs','renameGas'],'remove',callback
    );
});


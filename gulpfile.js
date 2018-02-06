const gulp = require('gulp');
const uglifyes = require('uglify-es');
const composer = require('gulp-uglify/composer');
const uglify = composer(uglifyes, console);
const javascriptObfuscator = require('gulp-javascript-obfuscator');
const sass = require('gulp-sass');
const useref = require('gulp-useref');
const gulpIf = require('gulp-if');
const cleanCSS = require('gulp-clean-css');
const imagemin = require('gulp-imagemin');
const cache = require('gulp-cache');
const del = require('del');

gulp.task('watch', function() {
    gulp.watch('app/scss/**/*.scss', gulp.series('sass'));
});

gulp.task('sass', function(){
    return gulp.src('app/scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('app/css'))
});

gulp.task('useref', function(){
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.js', javascriptObfuscator()))
        .pipe(gulpIf('*.css', cleanCSS({
            inline: ['local', 'remote', 'fonts.googleapis.com']
        })))
        .pipe(gulp.dest('dist'))
});

gulp.task('images', function(){
    return gulp.src('app/images/**/*.+(png|jpg|jpeg|gif|svg)')
        .pipe(cache(imagemin({
            interlaced: true
        })))
        .pipe(gulp.dest('dist/images'))
});

gulp.task('fonts', function() {
    return gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'))
});

gulp.task('favicon', function () {
    return gulp.src('app/favicon.ico')
        .pipe(gulp.dest('dist'));
});

gulp.task('clean:dist', function(done) {
    del.sync('dist');
    done();
});

gulp.task('clean:cache', function (callback) {
    return cache.clearAll(callback)
});

gulp.task('build', gulp.series('clean:dist', 'sass', gulp.parallel('useref', 'images', 'fonts', 'favicon'), function(done) {
    done();
}));
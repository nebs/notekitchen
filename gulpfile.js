const gulp = require('gulp');
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglifyes = require('uglify-es');
const composer = require('gulp-uglify/composer');
const uglify = composer(uglifyes, console);
const javascriptObfuscator = require('gulp-javascript-obfuscator');
  
//script paths
var jsFiles = 'js/*.js',
    jsDest = 'dist';

gulp.task('dist', function() {
    return gulp.src(jsFiles)
        .pipe(concat('app.min.js'))
        .pipe(gulp.dest(jsDest))
        .pipe(uglify())
        .pipe(javascriptObfuscator())
        .pipe(gulp.dest(jsDest));
});

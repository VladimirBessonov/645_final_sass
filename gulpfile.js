// INCLUDE GULP
var gulp = require('gulp'); 
 
// INCLUDE GULP PLUGINS
var jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    uglifycss = require('gulp-uglifycss'),
    changed = require('gulp-changed'),
    imagemin = require('gulp-imagemin'),
    minifyHTML = require('gulp-minify-html'),
    autoprefixer = require('gulp-autoprefixer');

// GULP TASK AUTOMATOR
gulp.task('default', ['jshint', 
                      'uglify', 
                      'uglifycss', 
                      'minifyimages', 
                      'minifyhtml']);

// TASK: JS HINT
gulp.task('jshint', function() {
    gulp.src('./js/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// TASK: MINIFY JS
gulp.task('uglify', function() {
    return gulp.src('./js/*.js')
        .pipe(uglify())
        .pipe(gulp.dest('./dist/js'));
});

// TASK: MINIFY CSS
gulp.task('uglifycss', function () {
    gulp.src('./css/*.css')
        .pipe(autoprefixer('last 2 versions'))
        .pipe(uglifycss({maxLineLen: 80}))
        .pipe(gulp.dest('./dist/css'));
});

// TASK: MINIFY HTML
gulp.task('minifyimages', function() {
    var imgSrc = './images/**/*',
        imgDst = './dist/images';
    gulp.src(imgSrc)
        .pipe(changed(imgDst))
        .pipe(imagemin())
        .pipe(gulp.dest(imgDst));
});

// TASK: MINIFY HTML
gulp.task('minifyhtml', function() {
    var htmlSrc = './*.html',
        htmlDst = './dist';
    gulp.src(htmlSrc)
        .pipe(changed(htmlDst))
        .pipe(minifyHTML())
        .pipe(gulp.dest(htmlDst));
});

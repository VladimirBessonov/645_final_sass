// INCLUDE GULP
var {src, dest, watch, series } = require('gulp')
var sass = require('gulp-sass')
sass.compiler = require('node-sass')

const gulp = require("gulp")
 
// INCLUDE GULP PLUGINS
var jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    uglifycss = require('gulp-uglifycss'),
    changed = require('gulp-changed'),
    imagemin = require('gulp-imagemin'),
    minifyHTML = require('gulp-minify-html'),
    autoprefixer = require('gulp-autoprefixer'),
    concat = require('gulp-concat'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),
     concatCss = require('gulp-concat-css');

var sass = require('gulp-sass')
sass.compiler = require('node-sass')


// 1. TASK: SCSS COMPILER
function css () {
    return src('./css/*.scss')
        .pipe(sass())
        .pipe(rename('style.css'))
        .pipe(dest('./css'))
}

// 2. Concat JS

var jsFiles = './js/**/*.js',
    jsDest = './dist/js';

function doConcatjs (done) {
    src(jsFiles)
        .pipe(sourcemaps.init())
        .pipe(concat('scripts.js'))
        // .pipe(dest(jsDest))
        .pipe(rename('scripts.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(dest(jsDest));
        done()
}
// 3. Concat CSS

var cssFiles = './css/*.css',
    cssDest = './dist/css' ;

function doConcatcss (done) {

    src(cssFiles)
        .pipe(sourcemaps.init())
        .pipe(concatCss('styles.js'))
        // .pipe(dest(jsDest))
        .pipe(rename('styles.min.css'))
        .pipe(uglifycss())
        .pipe(sourcemaps.write())
        .pipe(dest(cssDest));
        done()
}


// 4. TASK: JS HINT

function  doJshint () {
        return src('./js/*.js')
            .pipe(jshint())
            .pipe(jshint.reporter('default'))
}

// 5. TASK: MINIFY JS

function doUglify () {

    return  src('./js/*.js')
        .pipe(uglify())
        .pipe(dest('./dist/js'));

}

// 6. TASK: MINIFY CSS

    function doUglifycss () {
    return src('./css/*.css')
        .pipe(autoprefixer('last 2 versions'))
        .pipe(uglifycss({maxLineLen: 80}))
        .pipe(dest('./dist/css'));
}

// 7. TASK: MINIFY HTML
function minifyimages () {
    var imgSrc = './images/**/*',
        imgDst = './dist/images';
    return src(imgSrc)
        .pipe(changed(imgDst))
        .pipe(imagemin())
        .pipe(dest(imgDst));
}

// 8. TASK: MINIFY HTML
function minifyhtml () {
    var htmlSrc = './*.html',
        htmlDst = './dist';
    return src(htmlSrc)
        .pipe(changed(htmlDst))
        .pipe(minifyHTML())
        .pipe(dest(htmlDst));
}

// GULP TASK AUTOMATOR
exports.css = css;
exports.doConcatjs = doConcatjs
exports.doConcatcss = doConcatcss
exports.doJshint = doJshint;
exports.doUglify = doUglify;
exports.doUglifycss = doUglifycss;
exports.minifyimages = minifyimages;
exports.minifyhtml = minifyhtml;

exports.default = series(css, doConcatjs, doConcatcss, doJshint, doUglify, doUglifycss, minifyimages, minifyhtml);

exports.watch = function () {
    watch('./css/*.*css', function(done) {
            css()
            doConcatcss()
            done()
        }
        )
    watch('index.html', minifyhtml)
    watch('./js/*.js', function(done) {
            doConcatjs()
            doUglify()
        done();
        }
    )
}

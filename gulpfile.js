// INCLUDE GULP
var {src, dest, watch, series } = require('gulp')

const gulp = require("gulp")
 
// INCLUDE GULP PLUGINS
var jshint = require('gulp-jshint'),
    uglify = require('gulp-uglify'),
    uglifycss = require('gulp-uglifycss'),
    changed = require('gulp-changed'),
    imagemin = require('gulp-imagemin'),
    minifyHTML = require('gulp-minify-html'),
    autoprefixer = require('gulp-autoprefixer');

var sass = require('gulp-sass')
sass.compiler = require('node-sass')

// 0. TASK: SCSS COMPILER
function css () {
    return src('css/base.scss')
            .pipe(sass())
         .pipe(dest('dist/css'))
}

// 1. TASK: JS HINT

function  doJshint () {
        return src('./js/*.js')
            .pipe(jshint())
            .pipe(jshint.reporter('default'))
}

// 2. TASK: MINIFY JS

function doUglify () {

    return  src('./js/*.js')
        .pipe(uglify())
        .pipe(dest('./dist/js'));

}

// 3 TASK: MINIFY CSS

    function doUglifycss () {
    return src('./css/*.css')
        .pipe(autoprefixer('last 2 versions'))
        .pipe(uglifycss({maxLineLen: 80}))
        .pipe(dest('./dist/css'));
}

// 4 TASK: MINIFY HTML
function minifyimages () {
    var imgSrc = './images/**/*',
        imgDst = './dist/images';
    return src(imgSrc)
        .pipe(changed(imgDst))
        .pipe(imagemin())
        .pipe(dest(imgDst));
}

// 5 TASK: MINIFY HTML
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
exports.doJshint = doJshint;
exports.doUglify = doUglify;
exports.doUglifycss = doUglifycss;
exports.minifyimages = minifyimages;
exports.minifyhtml = minifyhtml;

exports.default = series(css, doJshint, doUglify, doUglifycss, minifyimages, minifyhtml);
exports.watch = function () {
    watch('src/*.scss', css)
}
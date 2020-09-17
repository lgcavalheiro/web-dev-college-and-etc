const { exec } = require('child_process');
const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglifyCss =  require('gulp-uglifycss');
const terser = require('gulp-terser');
const babel = require('gulp-babel');
const series = gulp.series;
const parallel = gulp.parallel;

function purgePublic(){
    return exec('yarn purge', (err, stdout, stderr) => {
        if (err) {
          console.log('Error: ', err);
          return;
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
      });
}

//gulp sucks at js
function processJs() {
    return gulp.src('./public/*.js')
        //.pipe(babel({ comments: false, presets: ["@babel/preset-env"] }))
        //.pipe(terser())
        //.pipe(concat('index.js'))
        .pipe(gulp.dest('./public2'))
}

function processSass() {
    return gulp.src('./public/*.css')
        .pipe(sass().on('error', sass.logError))
        .pipe(uglifyCss({ "uglyComments": true }))
        .pipe(concat('index.css'))
        .pipe(gulp.dest('./public2'))
}

function copyHtml() {
    return gulp.src('./public/*.html')
        .pipe(gulp.dest('./public2'))
}

function copyAssets() {
    return gulp.src('./public/*.ico')
        .pipe(gulp.dest('./public2'))
}

exports.default = series(
        //purgePublic,
        parallel(processSass, copyHtml, processJs, copyAssets)
    )
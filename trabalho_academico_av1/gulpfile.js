const { exec } = require('child_process');
const gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const uglifyCss = require('gulp-uglifycss');
const replace = require('gulp-replace');
/* const terser = require('gulp-terser');
const babel = require('gulp-babel'); */
const series = gulp.series;
const parallel = gulp.parallel;

function purgeFolders() {
    return exec('yarn purge', (err, stdout, stderr) => {
        if (err) {
            console.log('Error: ', err);
            return;
        }
        console.log(`stdout: ${stdout}`);
        console.log(`stderr: ${stderr}`);
    });
}

function runParcel() {
    return exec('yarn build', (err, stdout, stderr) => {
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
    return gulp.src('./parceled/*.js')
        //.pipe(babel({ comments: false, presets: ["@babel/preset-env"] }))
        //.pipe(terser())
        //.pipe(concat('index.js'))
        .pipe(gulp.dest('./public'))
}

function processSass() {
    return gulp.src('./parceled/*.css')
        .pipe(sass().on('error', sass.logError))
        .pipe(uglifyCss({ "uglyComments": true }))
        .pipe(concat('index.css'))
        .pipe(gulp.dest('./public'))
}

function processHtml() {
    return gulp.src('./parceled/*.html')
        .pipe(replace(/href=\"\/(?!favicon)[a-zA-Z0-9-.]+\"/g, 'href="index.css"'))
        .pipe(gulp.dest('./public'))
}

function copyAssets() {
    return gulp.src('./parceled/*.ico')
        .pipe(gulp.dest('./public'))
}

exports.default = series(
    purgeFolders,
    runParcel,
    parallel(processSass, processHtml, processJs, copyAssets)
)
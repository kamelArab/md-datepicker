var gulp = require('gulp');

var jshint = require('gulp-jshint'),  
 minifyCSS = require('gulp-minify-css'),
 path   = require('path'),
 obfuscate = require('gulp-obfuscate'),
 uglify = require('gulp-uglify'),
 concat = require('gulp-concat'),
 rename = require("gulp-rename");


 var exclude =['new Date'];

var source = 'src/';  
var dist = 'dist/';
// Define tasks

// Lint Task
gulp.task('lint', function () {  
    gulp.src(source + '*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});
gulp.task('compress', function() {
  gulp.src(dist +'*.js')
    .pipe(uglify())
    .pipe(rename({
        suffix: "-min"
    }))
    .pipe(gulp.dest(dist))
});

gulp.task('obfuscate', function () {
    return gulp.src(source + 'datePicker.js')
        .pipe(obfuscate())
        .pipe(gulp.dest(dist));
});
gulp.task('scripts', function() {
  return gulp.src(dist +'*.js')
    .pipe(concat('all.js'))
    .pipe(gulp.dest('./dist/'));
});


 

gulp.task('kwick', function(){
	  return gulp.src(source + 'datePicker.js')
        //.pipe(obfuscate({exclude : exclude}))
        .pipe(uglify())
    	.pipe(rename({
        	suffix: "-min"
    		}))
    	.pipe(gulp.dest(dist))
});


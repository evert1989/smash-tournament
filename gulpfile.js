var gulp = require('gulp');

var sass = require('gulp-sass');
var sassLint = require('gulp-sass-lint');

var jshint = require('gulp-jshint');
var stylish = require('jshint-stylish');

gulp.task('default', ['sass']);

gulp.task('sass', function () {
	return gulp.src('dev/sass/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('dev/css'));
});

gulp.task('val:scss', function () {
	return gulp.src('dev/sass/**/*.scss')
		.pipe(sassLint({
			configFile: 'sass-lint.yml'
		}))
		.pipe(sassLint.format())
		.pipe(sassLint.failOnError());
});

gulp.task('val:js', function () {
	return gulp.src(['dev/js/app/**/*.js', 'dev/js/player/**/*.js', 'dev/js/server/**/*.js'])
		.pipe(jshint())
		.pipe(jshint.reporter(stylish));
});
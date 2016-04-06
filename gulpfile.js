var gulp = require('gulp'),
minify = require('gulp-minify'),
cleanCSS = require('gulp-clean-css'),
htmlmin = require('gulp-htmlmin'),
clean = require('gulp-clean')

gulp.task('default', ['minify-js', 'minify-css', 'minify-html'], function() {
});



gulp.task('minify-css', function() {
  return gulp.src(['assets/css/*.css','vendor/*.css'])
    .pipe(cleanCSS({compatibility: 'ie8'}))
    .pipe(gulp.dest('minified/css'));
})

gulp.task('minify-html', function() {
  return gulp.src('*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('minified'))
});

gulp.task('minify-js', function() {
  gulp.src(['vendor/*.js', '*.js', 'assets/js/*.js'])
    .pipe(minify({
        exclude: ['tasks'],
        ignoreFiles: ['.combo.js', '-min.js']
    }))
    .pipe(gulp.dest('minified/vendor'))
});

gulp.task('clean', function () {
	return gulp.src('minified/*', {read: false})
		.pipe(clean());
});

var ghPages = require('gulp-gh-pages');

gulp.task('deploy', function() {
  return gulp.src('./minified/**/*')
    .pipe(ghPages());
});
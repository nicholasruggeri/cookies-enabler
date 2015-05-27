var gulp = require('gulp'),
    uglify = require('gulp-uglify');

gulp.task('compress', function() {
  return gulp.src('cookies-enabler.js')
    .pipe(uglify())
    .pipe(gulp.dest('min'));
});

gulp.task('watch', function() {
    gulp.watch('cookies-enabler.js', ['compress']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', [
  'compress'
]);
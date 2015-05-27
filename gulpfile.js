var gulp = require('gulp'),
    uglify = require('gulp-uglify'),
    rename = require("gulp-rename");

gulp.task('compress', function() {
    gulp.src('cookies-enabler.js')
        .pipe(uglify())
        .pipe(rename({extname: '.min.js'}))
        .pipe(gulp.dest(''));
});

gulp.task('watch', function() {
    gulp.watch('cookies-enabler.js', ['compress']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', [
  'compress'
]);
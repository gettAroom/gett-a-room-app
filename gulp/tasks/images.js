'use strickt';

import config      from '../config';
import gulp        from 'gulp';
import gulpLoadPlugins 	 from 'gulp-load-plugins';
import browserSync  from 'browser-sync';

const $ = gulpLoadPlugins();

gulp.task('images', () => {

  return gulp.src(config.images.src)
    .pipe($.changed(config.images.temp)) // Ignore unchanged files
    .pipe($.if(global.isProd, $.imagemin())) // Optimize
    .pipe(gulp.dest(config.images.temp))
    .pipe(browserSync.stream());
});

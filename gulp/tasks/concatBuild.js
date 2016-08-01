'use strict';

import config from '../config';
import gulp from 'gulp';
import gulpLoadPlugins 	from 'gulp-load-plugins';

const $ = gulpLoadPlugins();

gulp.task('concat-js', [], () =>{

	return gulp.src([config.scripts.temp + '/main.mdl.js',config.scripts.temp + '/templates.js'])
		// .pipe($.uglify())
		.pipe($.concat('app.js'))
		.pipe(gulp.dest(config.scripts.dest));

});
'use strict';

import config 			from '../config';
import gulp 			from 'gulp';
import gulpLoadPlugins 	from 'gulp-load-plugins';

const $ = gulpLoadPlugins();

gulp.task('concat-extra-libs', [], () =>{

	return gulp.src([config.extraLibs.src,'./build/app.js'])
		.pipe($.concat('app.js'))
		.pipe(gulp.dest(config.build));

});
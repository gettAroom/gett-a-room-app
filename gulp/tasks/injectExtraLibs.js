'use strict';

import config			from '../config';
import gulp 			from 'gulp';
import gulpLoadPlugins 	from 'gulp-load-plugins';

const $ = gulpLoadPlugins();

gulp.task('inject-extra-libs', [], () => {
	return gulp.src(config.views.index)
		.pipe($.inject(gulp.src(config.extraLibs.src, {read: false}),{starttag: '<!-- inject:extraLibs:js -->'}))
		.pipe(gulp.dest(config.client));

});
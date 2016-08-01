'use strict';

import config 			from '../config';
import gulp 			from 'gulp';
import gulpLoadPlugins 	from 'gulp-load-plugins';

const $ = gulpLoadPlugins();

gulp.task('inject-html', [], () =>{

	let injectSrc = gulp.src(config.inject,{read:false});

	let injectOptions = {
		ignorePath: '/build'
	};

	
	return gulp.src(config.views.index)
		.pipe($.inject(injectSrc, injectOptions))
		.pipe(gulp.dest(config.build));
});



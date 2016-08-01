'use strict';

import config 			from '../config';
import gulp 			from 'gulp';
import gulpLoadPlugins 	from 'gulp-load-plugins';

const $ = gulpLoadPlugins();


gulp.task('bower-uglify', [], () =>{

	global.isProd = true;

	return gulp.src('./bower.json')
		.pipe($.mainBowerFiles(new RegExp('.*js$', 'i')))
      //   .pipe($.if(global.isProd, $.uglify({
	     //    compress: { drop_console: true }
	     // })))
        .pipe($.concat('lib.js'))
        .pipe(gulp.dest(config.scripts.dest));
});
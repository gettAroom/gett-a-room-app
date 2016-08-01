'use strict';

import config 			from '../config';
import gulp 			from 'gulp';
import gulpLoadPlugins 	from 'gulp-load-plugins';

const $ = gulpLoadPlugins();

gulp.task('bower-uglify-css', [], () =>{

	global.isProd = true;

	return gulp.src('./bower.json')
        .pipe($.mainBowerFiles(new RegExp('.*css$', 'i')))
        .pipe($.concat('lib.css'))
        .pipe($.if(global.isProd, $.csso()))
        .pipe(gulp.dest(config.styles.dest));
});
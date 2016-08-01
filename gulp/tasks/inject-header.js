'use strict';

import config 			from '../config';
import gulp 			from 'gulp';
import gulpLoadPlugins 	from 'gulp-load-plugins';
import pkg from '../../package';

const $ = gulpLoadPlugins();

gulp.task('inject-header', [], () => {
	let header = ['/**',
		' * <%= pkg.name %> - <%= pkg.description %>',
	  	' * @version v<%= pkg.version %>',
	  	' * @author <%= pkg.author %>',
	  	' */',
		''].join('\n');

	let msg = {
		title: 'Build @version' + pkg.version,
		subtitle: 'concat app & template & Extra Libs',
		message: 'Running Buld'
	};

	return gulp.src(['./build/js/lib.js','./build/js/app.js'])
		.pipe($.header(header, {pkg: pkg}))
		.pipe(gulp.dest('./build/js/'))
		.pipe(gulp.src(['./build/styles/app.css','./build/styles/lib.css']))
		.pipe($.header(header, {pkg: pkg}))
		.pipe(gulp.dest('./build/styles/'))
		.pipe($.notify(msg));
});
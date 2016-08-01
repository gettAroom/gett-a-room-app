'use strict';

import config       from '../config';
import gulp         from 'gulp';
import handleErrors from '../util/handleErrors';
import browserSync  from 'browser-sync';
import loadPlugins 	from 'gulp-load-plugins';

const $ = loadPlugins({lazy:true});

gulp.task('styles', () => {

	let dest = config.styles.temp;

	if(global.isProd){
		dest = config.styles.dest;
	}

	const createSourcemap = !global.isProd || config.styles.prodSourcemap;
	const AUTOPREFIXER_BROWSERS = [
	    'ie >= 10',
	    'ie_mob >= 10',
	    'ff >= 30',
	    'chrome >= 34',
	    'safari >= 7',
	    'opera >= 23',
	    'ios >= 7',
	    'android >= 4.4',
	    'bb >= 10'
	];

	return gulp.src(config.styles.src)
	    .pipe($.if(createSourcemap, $.sourcemaps.init()))
	    .pipe($.sass({
	      sourceComments: !global.isProd,
	      outputStyle: global.isProd ? 'nested' : 'nested',
	      includePaths: config.styles.sassIncludePaths
	    }))
	    .on('error', handleErrors)
	    .pipe($.autoprefixer(AUTOPREFIXER_BROWSERS))
	    .pipe($.if(
	      createSourcemap,
	      $.sourcemaps.write( global.isProd ? './' : null ))
	    )
	    .pipe($.concat('app.css'))
	    .pipe($.if(global.isProd, $.csso({
            restructure: false,
            sourceMap: true,
            debug: true
        })))
	    .pipe(gulp.dest(dest))
	    .pipe(browserSync.stream());
});
'use strict';

import gulp 		from 'gulp';
import runSequence 	from 'run-sequence';
import args 		from 'yargs';
import log 			from '../util/log';

const arg = args.argv;


gulp.task('serve-dev', ['clean','bower','replace-version'], (cb) => {

	global.isProd = false;
	runSequence(['styles','views','scripts','images'], 'watch', cb);
});

'use strict';

import gulp 		from 'gulp';
import runSequence 	from 'run-sequence';
import args 		from 'yargs';
import log 			from '../util/log';

const arg = args.argv;


gulp.task('serve-prod', ['clean','bower','replace-version'], (cb) => {

	global.isProd = true;
	runSequence(['styles','views','scripts'],'watch', cb);
});

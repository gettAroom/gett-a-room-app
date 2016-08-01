'use strict';

import gulp 		from 'gulp';
import runSequence from 'run-sequence';

gulp.task('build', ['clean','bower-uglify-css','bower-uglify','replace-version'], (cb) => {

	global.isProd = true;
	runSequence('unit-test',['scripts','styles'], 'concat-js', 'concat-extra-libs',['inject-html'], cb);

});

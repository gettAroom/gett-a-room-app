'use strict';

import config 	from '../config';
import gulp 	from 'gulp';
import wiredep 	from 'wiredep';

const wire = wiredep.stream;

gulp.task('bower', ['inject-extra-libs'], () => {

	return gulp
		.src(config.views.index)
		.pipe(wire(config.bowerOptions))
		.pipe(gulp.dest(config.client));

});

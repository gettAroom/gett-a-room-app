'use strict';

import gulp         	from 'gulp';
import gulpLoadPlugins 	from 'gulp-load-plugins';
import pkg 				from '../../package';
import log 				from '../util/log';

const $ = gulpLoadPlugins();

gulp.task('replace-version', [], () => {

	log(pkg.version);

	return gulp.src('client/main.mdl.js')
		.pipe($.replaceTask({
			patterns:[{
				match: new RegExp('.*VERSION.*\\)'),
				replacement: () => {
					return "	.constant('VERSION', '" + pkg.version + "')";
				}
			}]
		}))
		// .pipe($.replaceTask({
		// 	patterns:[{
		// 		match: /APP_VERSION/g,
		// 		replacement: () => {
		// 			return pkg.version;
		// 		}
		// 	}]
		// }))
		.pipe(gulp.dest('client/'));
});

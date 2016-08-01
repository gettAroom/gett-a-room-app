'use strict';

import config 		from '../config';
import gulp 		from 'gulp';
import loadPlugins 	from 'gulp-load-plugins';
import args 		from 'yargs';
import log 			from '../util/log';

const arg = args.argv;
const $ = loadPlugins({lazy:true});

// --type=pre   - > gulp bump --type=pre    = 0.0.0-*
// --type=patch - > gulp bump --type=patch  = 0.0.*
// --type=minor - > gulp bump --type=minor  = 0.*.0
// --type=major - > gulp bump --type=major  = *.0.0

gulp.task('bump', () => {
	let msg = 'Bumping versions';
    let type = arg.type;
    let version = arg.ver;
    let options = {};
    if (version) {
        options.version = version;
        msg += ' to ' + version;
    } else {
        options.type = type;
        msg += ' for a ' + type;
    }
    log(msg);

    return gulp
        .src(config.packages)
        .pipe($.print())
        .pipe($.bump(options))
        .pipe(gulp.dest(config.root));
});
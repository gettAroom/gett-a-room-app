'use strict';

import config 		from '../config';
import gulp 		from 'gulp';
import args 		from 'yargs';
import loadPlugins 	from 'gulp-load-plugins';
import log 			from '../util/log';

const arg = args.argv;
const $ = loadPlugins({lazy:true});

gulp.task('replace-dev-api', [], () => {

	return gulp.srv(config.mainMdl)
		.pipe($.replace({
            patterns:[
                {
                    match: new RegExp('.*BASE_API_URL.*\\)'),
                    replacement: ".constant('BASE_API_URL', 'base_api_url')"

                }
            ]
        }))
        .pipe($.replace({
            patterns: [
                {
                    match: /base_api_url/g,
                    replacement: function () {
                        return envList[args.env].api;
                    }
                }]
           }))
        .pipe(gulp.dest('client/'));
});

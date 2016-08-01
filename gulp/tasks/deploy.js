'use strict';

import gulp 		from 'gulp';
import runSequence from 'run-sequence';
import log 			from '../util/log';
import pkg from '../../package';
import artifactoryUpload from 'gulp-artifactory-upload';

gulp.task('deploy', (cb) => {

  let fileName = 'gettAroom-' + pkg.version + '.tar.gz';

  return gulp.src('./build/' + fileName)
        .pipe(artifactoryUpload( {
            url: 'http://artifactory.nam.nsroot.net/artifactory/citi-tlv-bower-releases/CORE',
            request: {
              headers: {
                'X-Api-Key': 'r3GAKp1t73t4Gr9nAolf6xViKod2g8FCjs0JlnR9N68='
              }
            }
        }))
        .on('error', function(error){
          log(error);
        });

});

'use strict';

import config   from '../config';
import path     from 'path';
import gulp     from 'gulp';
import {Server} from 'karma';

gulp.task('unit-test', ['views'], function(cb) {

  return new Server({
    configFile: path.resolve(__dirname, '../..', config.unitTest.config),
    port: '8080',
    singleRun: true
  }, cb).start();

});

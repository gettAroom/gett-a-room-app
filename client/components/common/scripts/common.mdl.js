// Providers & Services
import RestSrv 		from './services/rest.srv.js';

// Directives
import { scanSplash } from './directives/scanSplash.dir.js';


export default angular
	.module('Common',[])
	.config(($stateProvider) => {

	})
	.service('RestSrv', RestSrv)
	.component('scanSplash', scanSplash);

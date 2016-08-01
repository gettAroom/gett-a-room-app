// Providers & Services

// Controllers
import WelcomeCtrl 		from './controllers/welcome.ctrl.js';

// Directives

export default angular
	.module('Welcome',[])
	.config(($stateProvider) => {

		$stateProvider
			.state('welcome', {
				url: '/welcome',
				templateUrl: 'welcome/views/welcome.state.tpl.html',
				controller: 'WelcomeCtrl as weCtrl'
			});
	})
	.controller('WelcomeCtrl', WelcomeCtrl);

// Providers & Services

// Controllers
import NotAvailableCtrl 		from './controllers/notavailable.ctrl.js';

// Directives

export default angular
	.module('Notavailable',[])
	.config(($stateProvider) => {

		$stateProvider
			.state('notavailable', {
				url: '/notavailable',
				templateUrl: 'notavailable/views/notavailable.state.tpl.html',
				controller: 'NotAvailableCtrl as notavCtrl',
				params: {
		      room: null
		    }
			});
	})
	.controller('NotAvailableCtrl', NotAvailableCtrl);

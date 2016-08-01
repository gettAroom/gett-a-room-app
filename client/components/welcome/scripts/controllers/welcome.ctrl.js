/* @ngInject */
export default class WelcomeCtrl {
	/* @ngInject */
	constructor($scope, $log, RestSrv, $stateParams) {
		this.$scope = $scope;
		this.$log = $log;
		this.RestSrv = RestSrv;
		this.$stateParams = $stateParams;

		this.init();
	}



	init() {
		this.splashStatus = true;
	}


}

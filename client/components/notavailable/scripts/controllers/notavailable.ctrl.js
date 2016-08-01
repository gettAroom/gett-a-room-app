/* @ngInject */
export default class NotAvailableCtrl {
	/* @ngInject */
	constructor($scope, $log, RestSrv, $stateParams) {
		this.$scope = $scope;
		this.$log = $log;
		this.RestSrv = RestSrv;
		this.$stateParams = $stateParams;

		this.init();
	}



	init() {
		console.log('this.$stateParams',this.$stateParams);
	}


}

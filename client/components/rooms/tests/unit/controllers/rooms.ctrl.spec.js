'use strict';

describe('Controller: RoomsCtrl', function() {

	// load the controller's module
	beforeEach(angular.mock.module('gettAroom'));
	beforeEach(angular.mock.module('Rooms'));

	var RoomsCtrl,
		scope,
		$log,
		RestSrv,
		$stateParams,
		moment,
		$timeout,
		$mdDialog,
		$state,
		$mdMedia;

	// Initialize the controller
	beforeEach(inject(function($controller, $rootScope, _$log_, _RestSrv_, _$stateParams_, _moment_, _$timeout_, _$mdDialog_, _$state_, _$mdMedia_) {

		// Injections
		scope = $rootScope.$new();
		$log = _$log_;
		RestSrv = _RestSrv_;
		$stateParams = _$stateParams_;
		moment = _moment_;
		$timeout = _$timeout_;
		$mdDialog = _$mdDialog_;
		$state = _$state_;
		$mdMedia = _$mdMedia_;

		RoomsCtrl = $controller('RoomsCtrl', {
				$scope:scope,
				$log: $log,
				RestSrv: RestSrv,
				$stateParams: $stateParams,
				moment:moment,
				$timeout: $timeout,
				$mdDialog: $mdDialog,
				$state: $state,
				$mdMedia: $mdMedia
		});
	}));

	it('should be defined', function() {
		expect(RoomsCtrl).toBeDefined();
	});

});

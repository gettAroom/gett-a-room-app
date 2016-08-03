'use strict';

// Modules
import Common from './components/common/scripts/common.mdl.js';
import Rooms 	from './components/rooms/scripts/rooms.state.mdl.js';
import Notavailable from './components/notavailable/scripts/notavailable.state.mdl.js';
import Welcome from './components/welcome/scripts/welcome.state.mdl.js';

export default angular
	.module('gettAroom',[
		'ngAnimate',
		'ngSanitize',
		'ui.router',
		'angular-loading-bar',
		'ngMaterial',
		Common.name,
		Rooms.name,
		Notavailable.name,
		Welcome.name
	])
	.config(($stateProvider, $locationProvider, $urlRouterProvider, $httpProvider, $logProvider, cfpLoadingBarProvider, $mdThemingProvider) => {
		cfpLoadingBarProvider.includeBar = false;
		cfpLoadingBarProvider.includeSpinner = true;
		cfpLoadingBarProvider.latencyThreshold = 50;
		// cfpLoadingBarProvider.spinnerTemplate = '<div><span class="fa fa-spinner">Loading...</div>';

		$mdThemingProvider.theme('default')
    .primaryPalette('green')
    .accentPalette('orange');


		$logProvider.debugEnabled(true);

		$urlRouterProvider.otherwise(($injector, $location) => {
			$location.path('/welcome');
		});

		$locationProvider.html5Mode(true);

	})
	.run(($rootScope, $location, $state, $log, $window) => {
		// $rootScope.scanSplash = true;
		if($location.search().id){
			$state.transitionTo('rooms', {'id': $location.search().id});
		}

		$rootScope.$on('$stateChangeSuccess', function (event) {
       $window.ga('send', 'pageview', $location.path());
			 $log.info('google-send-pageview', $location.path());
    });


		$rootScope.safeApply = function(fn) {
			var phase = this.$root.$$phase;
			if (phase === '$apply' || phase === '$digest') {
				if (fn && (typeof(fn) === 'function')) {
					fn();
				}
			} else {
				this.$apply(fn);
			}
		};
	})
	.constant('CONFIG', {
		server: {
			url: (localStorage && localStorage.getItem('serverUrl')) || (window.location.protocol + '//' + window.location.host),
			timeout: 3000
			// http://52.34.124.68:9090
		}
	})
	.constant('moment', window.moment)
	.constant('_', window._);

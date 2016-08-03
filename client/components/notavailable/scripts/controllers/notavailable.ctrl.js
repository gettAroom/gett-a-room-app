/* @ngInject */
export default class NotAvailableCtrl {
	/* @ngInject */
	constructor($scope, $log, RestSrv, $stateParams, moment, $mdDialog, $mdMedia) {
		this.$scope = $scope;
		this.$log = $log;
		this.RestSrv = RestSrv;
		this.$stateParams = $stateParams;
		this.moment = moment;
		this.splashStatus = true;
		this.$mdDialog = $mdDialog;
		this.$mdMedia = $mdMedia;
		this.room = {
			id:"",
			name:"",
			steps:15,
			nextMeeting:{},
			available:true,
			fallbacks:[]
		};

		this.init();
	}



	init() {
		if(this.$stateParams.room){
			this.splashStatus = false;
			this.room = this.$stateParams.room;
			this.until = this.moment(this.room.nextMeeting.to).format('LT');
		}

	}

	nextMeetingInfo(ev) {
    var useFullScreen = this.$mdMedia('xs');
    this.$mdDialog.show({
      controller: class Ctrl {
		    /* @ngInject */
		    constructor($mdDialog){
					let infoCtrl = this;
					infoCtrl.$mdDialog = $mdDialog;
				}

				hide() {
			    this.$mdDialog.hide();
			  };
			  cancel() {
			    this.$mdDialog.cancel();
			  };
			  answer(answer) {
			    this.$mdDialog.hide(answer);
			  };

		  },
			locals: this.room,
			bindToController: true,
			controllerAs: 'infoCtrl',
      templateUrl: 'rooms/views/nextMeetingInfo.tpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: useFullScreen
    })
    .then(function(answer) {

    });
  }

	havFallbacks(){
		return this.room.fallbacks.length > 0 ;
	}


	fallbacks(ev){
		this.$mdDialog.show({
      controller: class Ctrl {
		    /* @ngInject */
		    constructor($mdDialog){
					let fallbackCtrl = this;
					fallbackCtrl.$mdDialog = $mdDialog;
				}

				hide() {
			    this.$mdDialog.hide();
			  };
			  cancel() {
			    this.$mdDialog.cancel();
			  };
			  answer(answer) {
			    this.$mdDialog.hide(answer);
			  };

		  },
			locals: this.room,
			bindToController: true,
			controllerAs: 'fallbackCtrl',
      templateUrl: 'notavailable/views/fallbacksModal.tpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:true,
      fullscreen: true
    })
    .then(function(answer) {

    });
	}


}

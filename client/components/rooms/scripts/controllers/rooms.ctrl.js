/* @ngInject */
export default class RoomsCtrl {
	/* @ngInject */
	constructor($scope, $log, RestSrv, $stateParams, moment, $timeout, $mdDialog, $state, $mdMedia) {
		this.$scope = $scope;
		this.$log = $log;
		this.RestSrv = RestSrv;
		this.$timeout = $timeout;
		this.$stateParams = $stateParams;
		this.$mdDialog = $mdDialog;
		this.$state = $state;
		this.$mdMedia = $mdMedia;
		this.moment = moment;


		this.roomId = '';
		this.splashStatus = true;
		this.room = {
			id:"",
			name:"",
			steps:15,
			nextMeeting:{},
			available:true
		};

		this.nextMeeting = {};
		this.currentTime = this.moment();
		this.currentTimeLTS = this.moment().format('LT');
		this.currentToTimeLTS = this.moment();

		this.total = '';
		this.nextMeetingFrom = '';
		this.nextMettingTo = '';
		this.steps = 5

		this.min = 0;
		this.max = 0;
		this.endTime = new Date();
		this.minStart = {};
		this.init();
	}

	init() {
		let current = (new Date(this.currentTime));
		let ceil = (Math.ceil(current.getMinutes()/this.steps))*this.steps;
		let addedMinutes = ceil - current.getMinutes();
		let rounded = (Math.floor(current.getTime()/60000) + addedMinutes)*60000;
		this.splashStatus = false;

		this.minStart = new Date(rounded);
		this.roomId = this.$stateParams.id;

		this.min = 0;
		this.max = 100;

		this.selectedTime = {
			value: 10
		};


		this.RestSrv.getRoom(this.roomId).then((data) => {
			this.room = data;

			if(data.available){
				this.steps = data.steps || 10;
				this.selectedTime.value = this.steps;

				if(this.room.nextMeeting.from === undefined){
					this.max = 120;
					this.room.nextMeeting.from = moment(current).add(2, 'hours');
					this.room.nextMeeting.to = moment(current).add(3, 'hours');
				} else {
					let diffBetween = this.diffBetweenTimes(this.room.nextMeeting.from,this.currentTime);
					let step = this.steps;
					this.max = Math.floor( diffBetween / step ) * step;
				}

				this.nextMeetingFrom = moment(this.room.nextMeeting.from).format('LT');
				this.nextMettingTo = moment(this.room.nextMeeting.to).format('LT');

				this.currentTimeLTS = moment(this.minStart).format('LT');

				this.$timeout(() => {
					this.splashStatus = false;
				},1000);

			} else {

				if(this.isHappeningNow(this.room.nextMeeting)){
					this.splashStatus = false;
					// this.roomNotAvilable();
					this.$state.transitionTo('notavailable', {'room': this.room, 'until': this.room.nextMeeting.to});
				} else {
					this.splashStatus = false;
					this.reserveCountdown();
				}

			}

		});

	}

	isHappeningNow(nextMeeting){
		if(nextMeeting === undefined) { return false; }

		let now = this.moment();
		return now.isAfter(nextMeeting.from) && now.isBefore(nextMeeting.to);
	}

	checkSelectedTime(){
		return this.selectedTime.value > 0 ? false : true;
	}

	currentTo(){
		let res = (Math.floor(this.minStart.getTime()/60000) + this.selectedTime.value)*60000;
		this.endTime = new Date(res);

		let total = (this.endTime.getTime() - this.minStart.getTime())/60000;
		this.total = Math.floor(total / 60) + ':' + total%60;

		return this.moment(this.endTime).format('LT');
	}

	diffBetweenTimes(_current, _start){
		let current = new Date(_current);
		let start = new Date(_start);
		let duration = current.getTime() - start.getTime();
		let diffInMinutes = duration / (1000*60);
		return diffInMinutes;
	}

	bookMeeting(){
			this.RestSrv.bookRoom(this.roomId, this.minStart.toISOString(), this.endTime.toISOString()).then((response) => {
			this.roomBookedSucess();
		});
	}

	roomBookedSucess(ev) {
    this.$mdDialog.show({
      controller: class Ctrl {
		    /* @ngInject */
		    constructor($mdDialog){
					let roomSuccessCtrl = this;
					roomSuccessCtrl.$mdDialog = $mdDialog;
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
			locals:{
				room: this.room,
				from: this.currentTimeLTS,
				to: this.currentTo(),
				totalMinutes: this.total
			},
			bindToController: true,
			controllerAs: 'roomSuccessCtrl',
      templateUrl: 'rooms/views/roomBookedSucess.tpl.html',
      parent: angular.element(document.body),
      targetEvent: ev,
      clickOutsideToClose:false,
			escapeToClose: false,
      fullscreen: true
    })
    .then(function(answer) {

    });
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

	haveInfo(){
		return this.room.nextMeeting.hasOwnProperty('orgenizer');
	}

	reserveCountdown(ev){
		this.$mdDialog.show({
      controller: class Ctrl {
		    /* @ngInject */
		    constructor($mdDialog, $state, moment){
					let reserveCtrl = this;
					reserveCtrl.$mdDialog = $mdDialog;
					reserveCtrl.$state = $state;
				}
		  },
			locals:{
				room: this.room
			},
			bindToController: true,
			controllerAs: 'reserveCtrl',
      templateUrl: 'rooms/views/reserveCountdown.tpl.html',
      parent: angular.element(document.body),
			clickOutsideToClose:false,
			escapeToClose: false,
      fullscreen: true
    })
    .then(function(answer) {

    });
	}

	roomNotAvilable(ev) {
    this.$mdDialog.show({
      controller: class Ctrl {
		    /* @ngInject */
		    constructor($mdDialog, $state, moment, $mdMedia){
					let notAvilableCtrl = this;
					notAvilableCtrl.$mdDialog = $mdDialog;
					notAvilableCtrl.$state = $state;
					notAvilableCtrl.$mdMedia = $mdMedia;

					this.moment = moment;
					notAvilableCtrl.until = this.moment(notAvilableCtrl.locals.until).format('LT');
				}

				goOptions(){
					this.$state.go('notavailable',{room:this.locals.room});
					this.$mdDialog.hide();
				}

		  },
			locals:{
				room: this.room,
				until: this.room.nextMeeting.to
			},
			bindToController: true,
			controllerAs: 'notAvilableCtrl',
      templateUrl: 'rooms/views/roomNotAvilable.tpl.html',
      parent: angular.element(document.body),
			clickOutsideToClose:false,
			escapeToClose: false,
      fullscreen: true
    })
    .then(function(answer) {

    });
  }
}

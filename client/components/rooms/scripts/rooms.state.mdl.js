// Providers & Services

// Controllers
import RoomsCtrl 		from './controllers/rooms.ctrl.js';

// Directives

export default angular
	.module('Rooms',[])
	.config(($stateProvider) => {

		function getRoomPromises($q, $stataParams, RestSrv){
			let promises = [getRoom($stateParams, RestSrv)];

			return $q.all(promises).then(resolve, rejected);
		}

		function resolve(data){
			return data[0];
		}

		function rejected(reason){
			return $q.reject();
		}

		function getRoom($stateParams, RestSrv){
			let roomId = $stateParams.id;
			return RestSrv.getRoom(roomId);
		}

		$stateProvider
			.state('rooms', {
				url: '/rooms/:id',
				templateUrl: 'rooms/views/rooms.state.tpl.html',
				controller: 'RoomsCtrl as roomsCtrl'
				// resolve:{
				// 	Room: getRoomPromises
				// }
			});
	})
	.controller('RoomsCtrl', RoomsCtrl);

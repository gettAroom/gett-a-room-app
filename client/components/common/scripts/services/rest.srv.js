/* @ngInject */
export default class RestSrv{
  /* @ngInject */
  constructor($http, $q, CONFIG){
    // Object.assign(this, { $http, $q, CONFIG });
    this.$http = $http;
    this.$q = $q;
    this.CONFIG = CONFIG;
  }

  getRoom(id){
    return this.$http.get(this.CONFIG.server.url + '/api/rooms/' + id).then((response) => {
      return response.data;
    }).catch(this.responseError);
  }

  bookRoom(id, fromDate, toDate){
    let req = {
      method: 'POST',
      url: this.CONFIG.server.url + '/api/actions/reserve/' + id + '?from=' + fromDate + '&to=' + toDate,
      headers:{
        'Content-Type':'application/json'
      },
      data: {
        from: fromDate,
        to: toDate
      }
    };

    return this.$http(req).then((response) => {
      return response;
    }).catch(this.responseError);
  }

  responseError(error){
    console.log(error);
  }
}

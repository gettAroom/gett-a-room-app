export const scanSplash = {
  template: `
      <div class="splash" ng-if="splashCtrl.status">
      <section class='pulse'>
        <img src='images/gettAroom.png'/>
        <div class='pulse1'></div>
        <div class='pulse2'></div>
      </section>
      <div class="geet-a-room-splash-logo"></div>
      <h2>{{:: splashCtrl.massage}}</h2>
    </div>
  `,
  bindings:{
    status: '<',
    massage: '@'
  },
  controllerAs: 'splashCtrl',
  controller: class Ctrl {
    /* @ngInject */
    constructor($log, RestSrv){
      let splashCtrl = this;
      splashCtrl.$log = $log;
      splashCtrl.RestSrv = RestSrv;

      splashCtrl.$onInit = () => {

      };

    }

  }
};

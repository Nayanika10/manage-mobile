 angular.module('uiGenApp')
  .controller('LogoutController',
    function LogoutController(URLS,$rootScope, $state, $q, Auth, AUTH_EVENTS, $window ,OAuthToken) {
      const vm = this;
      vm.init = function logout() {
        OAuthToken.removeToken();
        //Todo: Remove token not implemented in server
        $state.go('login')
      };
    });

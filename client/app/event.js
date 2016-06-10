angular.module('uiGenApp')
  .run(function handleEvents($rootScope, Auth, authService, AUTH_EVENTS, Session, $state, $window, URLS,OAuth) {
      /* eslint angular/on-watch: 0 */

       //In Future: assign to variable to destroy during the $destroy event
          //In Future: assign to variable to destroy during the $destroy event
    $rootScope.$on('$stateChangeStart', function handleStateChange(event, next) {
      if (!OAuth.isAuthenticated() && (next.name !== 'login')) {
        event.preventDefault();
        return $state.go('login');
      }

      if (Session.isAuthenticated() && (next.name === 'login')) {
        event.preventDefault();
        $state.go('login');
      }
    });

      $rootScope.$on(AUTH_EVENTS.loginSuccess, function loginSuccess(event, data) {
        angular.noop(event);
        angular.noop(data);
      });

      //$rootScope.$on(AUTH_EVENTS.loginRequired, function loginRequired() {
      //  if (Session.isAuthenticated()) {
      //    // Refresh token autimatically if token expires
      //    Auth.refreshToken().then(
      //      function gotRefreshToken() {
      //        authService.loginConfirmed('success', function updateConfig(config) {
      //          config.headers.Authorization = 'Bearer ' + Session.getAccessToken();
      //          return config;
      //        });
      //      },
      //
      //      function errRefreshToken(error) {
      //        angular.noop(error);
      //      }
      //    );
      //  }
      //});
    });

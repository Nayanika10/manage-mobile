
angular.module('qui.core')
  .factory('AuthInterceptor', function AuthIterceptor($rootScope, $q, AUTH_EVENTS, Session,$injector,URLS,$window) {
      return {
        request: function request(config) {
          console.log("access_token",localStorage.access_token)
          if (localStorage.access_token) {
            config.headers.Authorization = 'Bearer ' + localStorage.access_token;
          }

          return config;
        },
        // Todo: Improve security by enabling cookies
        // Todo: On access token expiry -> get refresh token
        // Intercept 401s and redirect you to logi
      };
    })
  // this configs to initiated using provider
  .config([
    '$httpProvider',
    function httpIntercept($httpProvider) {
      $httpProvider.interceptors.push('AuthInterceptor');
    },
  ]);
